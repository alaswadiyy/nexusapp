const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

const port = 3100;
const greeting = 'Hello from NexusApp';
const appPath = path.join(__dirname, '..', 'src', 'index.js');

const server = spawn(process.execPath, [appPath], {
  cwd: path.join(__dirname, '..'),
  env: { ...process.env, PORT: String(port), GREETING: greeting },
  stdio: ['ignore', 'pipe', 'pipe']
});

let output = '';
server.stdout.on('data', (chunk) => {
  output += chunk.toString();
});

server.stderr.on('data', (chunk) => {
  output += chunk.toString();
});

const timeoutMs = 20000;

function shutdown(code, message) {
  if (server && !server.killed) {
    server.kill('SIGTERM');
  }

  if (message) {
    console.error(message);
  }

  process.exit(code);
}

const request = http.get(`http://127.0.0.1:${port}/`, (response) => {
  let body = '';

  response.on('data', (chunk) => {
    body += chunk;
  });

  response.on('end', () => {
    try {
      const parsed = JSON.parse(body);

      if (response.statusCode !== 200) {
        throw new Error(`Unexpected status code: ${response.statusCode}`);
      }

      if (!parsed || parsed.message !== greeting) {
        throw new Error(`Unexpected response body: ${body}`);
      }

      console.log('Smoke test passed.');
      shutdown(0);
    } catch (error) {
      shutdown(1, `Smoke test failed: ${error.message}\nServer output:\n${output}`);
    }
  });
});

request.on('error', (error) => {
  shutdown(1, `HTTP request failed: ${error.message}\nServer output:\n${output}`);
});

setTimeout(() => {
  shutdown(1, `Smoke test timed out after ${timeoutMs}ms.\nServer output:\n${output}`);
}, timeoutMs);
