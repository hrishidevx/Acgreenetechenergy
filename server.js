import { createServer } from "node:http";
import { Buffer } from "node:buffer";
import process from "node:process";

const PORT = Number(process.env.PORT || process.env.API_PORT || 3001);
const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const recentRequests = new Map();

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(body));
}

async function readJsonBody(request) {
  const chunks = [];
  let totalBytes = 0;

  for await (const chunk of request) {
    totalBytes += chunk.length;
    if (totalBytes > MAX_BODY_BYTES) {
      return { error: "The enquiry is too large.", statusCode: 413 };
    }
    chunks.push(chunk);
  }

  try {
    return { body: JSON.parse(Buffer.concat(chunks).toString("utf8")) };
  } catch {
    return { error: "Please submit a valid enquiry.", statusCode: 400 };
  }
}

function validateEnquiry(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return "Please provide the required enquiry details.";
  }

  const limits = {
    name: 100,
    address: 300,
    requirement: 1000,
  };

  for (const [field, maxLength] of Object.entries(limits)) {
    if (
      typeof body[field] !== "string" ||
      !body[field].trim() ||
      body[field].trim().length > maxLength
    ) {
      return `Please enter a valid ${field}.`;
    }
  }

  if (typeof body.mobile !== "string" || !/^[0-9]{10}$/.test(body.mobile)) {
    return "Please enter a valid 10-digit mobile number.";
  }

  return null;
}

function checkRateLimit(clientIp) {
  const now = Date.now();
  if (recentRequests.size > 1000) {
    for (const [ip, record] of recentRequests) {
      if (now - record.windowStart >= RATE_LIMIT_WINDOW_MS) {
        recentRequests.delete(ip);
      }
    }
  }
  const requestRecord = recentRequests.get(clientIp);

  if (!requestRecord || now - requestRecord.windowStart >= RATE_LIMIT_WINDOW_MS) {
    recentRequests.set(clientIp, { windowStart: now, count: 1 });
    return true;
  }

  if (requestRecord.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  requestRecord.count += 1;
  return true;
}

function getWhatsAppConfig() {
  const required = [
    "WHATSAPP_ACCESS_TOKEN",
    "WHATSAPP_PHONE_NUMBER_ID",
    "WHATSAPP_RECIPIENT",
    "WHATSAPP_TEMPLATE_NAME",
    "WHATSAPP_API_VERSION",
  ];
  const missing = required.filter((name) => !process.env[name]);
  if (missing.length) {
    return { error: `Missing server configuration: ${missing.join(", ")}.` };
  }

  if (!/^[1-9]\d{7,14}$/.test(process.env.WHATSAPP_RECIPIENT)) {
    return { error: "WHATSAPP_RECIPIENT must be a phone number in international digits." };
  }

  if (!/^v\d+\.\d+$/.test(process.env.WHATSAPP_API_VERSION)) {
    return { error: "WHATSAPP_API_VERSION must use the format vXX.X." };
  }

  return {
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
    recipient: process.env.WHATSAPP_RECIPIENT,
    templateName: process.env.WHATSAPP_TEMPLATE_NAME,
    templateLanguage: process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en_US",
    apiVersion: process.env.WHATSAPP_API_VERSION,
  };
}

async function sendEnquiry(config, enquiry) {
  const parameters = [
    enquiry.name.trim(),
    enquiry.address.trim(),
    enquiry.requirement.trim(),
    enquiry.mobile,
  ].map((text) => ({ type: "text", text }));

  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort(), 15000);

  try {
    const response = await fetch(
      `https://graph.facebook.com/${config.apiVersion}/${config.phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: config.recipient,
          type: "template",
          template: {
            name: config.templateName,
            language: { code: config.templateLanguage },
            components: [
              {
                type: "body",
                parameters,
              },
            ],
          },
        }),
        signal: abortController.signal,
      },
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `WhatsApp API request failed (${response.status}): ${errorBody}`,
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("WhatsApp API request failed:", error);
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);
  if (requestUrl.pathname !== "/api/enquiries") {
    sendJson(response, 404, { error: "Not found." });
    return;
  }

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    sendJson(response, 405, { error: "Method not allowed." });
    return;
  }

  if (!request.headers["content-type"]?.includes("application/json")) {
    sendJson(response, 415, { error: "Please submit the enquiry as JSON." });
    return;
  }

  const clientIp = request.socket.remoteAddress || "unknown";
  if (!checkRateLimit(clientIp)) {
    sendJson(response, 429, {
      error: "Too many enquiries. Please wait a few minutes and try again.",
    });
    return;
  }

  const parsed = await readJsonBody(request);
  if (parsed.error) {
    sendJson(response, parsed.statusCode, { error: parsed.error });
    return;
  }

  const validationError = validateEnquiry(parsed.body);
  if (validationError) {
    sendJson(response, 400, { error: validationError });
    return;
  }

  const config = getWhatsAppConfig();
  if (config.error) {
    console.error(config.error);
    sendJson(response, 503, {
      error: "Enquiry delivery is not configured. Please try again later.",
    });
    return;
  }

  if (!(await sendEnquiry(config, parsed.body))) {
    sendJson(response, 502, {
      error: "WhatsApp could not send your enquiry. Please try again later.",
    });
    return;
  }

  sendJson(response, 200, { success: true });
});

server.listen(PORT, () => {
  console.log(`Enquiry API listening on http://localhost:${PORT}`);
});
