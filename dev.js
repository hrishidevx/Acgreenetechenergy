import { spawn } from "node:child_process";
import process from "node:process";

const commands = [
  ["Enquiry API", ["--env-file-if-exists=.env", "server.js"]],
  ["Vite frontend", ["node_modules/vite/bin/vite.js"]],
];

const children = commands.map(([name, args]) => {
  const child = spawn(process.execPath, args, { stdio: "inherit" });

  child.on("error", (error) => {
    console.error(`Could not start ${name}:`, error);
    shutdown(1);
  });

  child.on("exit", (code) => {
    if (code !== 0 && code !== null) {
      console.error(`${name} exited with code ${code}.`);
      shutdown(code);
    }
  });

  return child;
});

let isShuttingDown = false;

function shutdown(exitCode = 0) {
  if (isShuttingDown) {
    return;
  }
  isShuttingDown = true;

  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }

  process.exitCode = exitCode;
}

process.on("SIGINT", () => shutdown());
process.on("SIGTERM", () => shutdown());
