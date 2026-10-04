# AC Greentech Energy

## Run locally

Install dependencies with `npm install`. Start the frontend and enquiry API
together:

```sh
npm run dev
```

The Vite development server proxies `/api` requests to the API on port 3001.
To run only one part, use `npm run dev:frontend` or `npm run dev:api`.

## Configure automatic WhatsApp enquiry delivery

The enquiry form submits to the server-side API. The server sends a WhatsApp
template message to the configured receiving number; the customer does not
need to open WhatsApp. The access token is only used by the server and must
never be added to frontend code.

1. Set up a WhatsApp Business Cloud API sender number, access token, and
   receiving WhatsApp number. The receiving number should be a team member's
   WhatsApp account, not the Cloud API sender number.
2. Create and get approval for a WhatsApp message template named
   `enquiry_notification` in the configured language. Its body must have four
   text placeholders in this order: customer name, address, requirement, and
   mobile number. For example:

   ```text
   New website enquiry
   Name: {{1}}
   Address: {{2}}
   Requirement: {{3}}
   Mobile: {{4}}
   ```

3. Copy `.env.example` to `.env` and fill in the WhatsApp configuration:

   ```text
   WHATSAPP_ACCESS_TOKEN=your_server_side_access_token
   WHATSAPP_PHONE_NUMBER_ID=your_cloud_api_phone_number_id
   WHATSAPP_RECIPIENT=receiving_number_in_international_digits
   WHATSAPP_TEMPLATE_NAME=enquiry_notification
   WHATSAPP_TEMPLATE_LANGUAGE=en_US
   WHATSAPP_API_VERSION=your_supported_graph_api_version
   ```

   Keep `.env` private; it is ignored by Git. Never paste access tokens into
   source code or the browser.

For production, deploy `server.js` as a Node.js service with these environment
variables set in the hosting provider's secret settings. Configure the web
host to proxy `/api/enquiries` to that service. WhatsApp delivery requires a
valid, approved template and working Cloud API credentials. If delivery
fails, the form displays an error and the API logs the provider response.
