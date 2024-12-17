import { Hono } from 'hono';
import { fork } from 'child_process';
import { serve } from '@hono/node-server';

const app = new Hono();

// Resource limits configuration
const RESOURCE_LIMITS = {
  maxRAMBytes: 512 * 1024 * 1024,
  maxCPUPercent: 50,
};

app.post('/process', async (c) => {
  const responses: string[] = [];
  
  return new Promise((resolve) => {
    try {
      const child = fork('worker.ts', [], {
        execArgv: [`--max-old-space-size=${RESOURCE_LIMITS.maxRAMBytes / (1024 * 1024)}`],
        stdio: ['pipe', 'pipe', 'pipe', 'ipc']
      });

      // Handle messages from child
      child.on('message', (message) => {
        responses.push(`${message}`);
        
        if (message === 'DONE') {
          child.kill('SIGTERM');
          resolve(c.json({ success: true, messages: responses }));
        }
      });

      // Handle child process errors
      child.on('error', (error) => {
        responses.push(`Error: ${error.message}`);
        child.kill('SIGTERM');
        resolve(c.json({ success: false, messages: responses }));
      });

      // Handle child process exit
      child.on('exit', (code) => {
        if (code !== 0) {
          responses.push(`Process exited with code ${code}`);
          resolve(c.json({ success: false, messages: responses }));
        }
      });

      // Send initial message to child
      child.send('START');

    } catch (error) {
      responses.push(`Server error: ${error.message}`);
      resolve(c.json({ success: false, messages: responses }));
    }
  });
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});
