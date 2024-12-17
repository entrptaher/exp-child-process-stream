# Experiment of Node.js Child Process Manager with Hono

A robust Node.js application demonstrating process management, resource limiting, and inter-process communication using Hono server.

## Features

- Child process creation and management
- Inter-process communication (IPC)
- Memory usage limiting
- Process cleanup and error handling
- RESTful API endpoints
- Asynchronous process execution
- Comprehensive response collection

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd <project-directory>

# Install dependencies
npm install
```

## Dependencies

```json
{
  "dependencies": {
    "hono": "^4.6.14",
    "@hono/node-server": "^1.13.7",
    "tsx": "^4.7.0",
    "typescript": "^5.0.0"
  }
}
```

## Project Structure

```
.
├── server.ts        # Main server file
├── worker.js        # Worker process file
├── package.json     # Project configuration
└── README.md        # Documentation
```

## Usage

1. Start the server:
```bash
tsx server.ts
```

2. Make a request:
```bash
curl -X POST http://localhost:3000/process
```

## API Endpoints

### POST /process

Executes a child process and returns the collected output.

**Response Format:**
```json
{
  "success": boolean,
  "messages": string[]
}
```

## Configuration

Key configurations in `server.ts`:

```typescript
const RESOURCE_LIMITS = {
  maxRAMBytes: 512 * 1024 * 1024, // 512MB RAM limit
  maxCPUPercent: 50                // 50% CPU limit
};

const port = 3000;                 // Server port
```

## Worker Process

The worker process (`worker.js`) demonstrates:
- Message handling from parent process
- Simulated async operations
- Process termination handling
- IPC communication

## Error Handling

The application handles:
- Child process errors
- Abnormal terminations
- Server errors
- Process cleanup

## Response Structure

Successful response:
```json
{
  "success": true,
  "messages": [
    "Starting work...",
    "Step 1 completed",
    "Step 2 completed",
    "Step 3 completed",
    "DONE"
  ]
}
```

Error response:
```json
{
  "success": false,
  "messages": [
    "Error: <error message>"
  ]
}
```

## Development

1. Modify resource limits in `server.ts`
2. Customize worker logic in `worker.js`
3. Add new endpoints in `server.ts`

## Best Practices

- Always handle process cleanup
- Implement proper error handling
- Monitor resource usage
- Use appropriate timeout values
- Handle process termination signals

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request