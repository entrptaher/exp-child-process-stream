// worker.js
let subProcesses = [];

process.on('message', (message) => {
  console.log('Worker received:', message);
  
  if (message === 'START') {
    // Simulate some work
    process.send('Starting work...');
    
    // Simulate creating sub-processes
    for (let i = 0; i < 3; i++) {
      const subProcess = {
        id: i,
        timer: setTimeout(() => {
          process.send(`Sub-process ${i} completed`);
        }, 1000 * (i + 1))
      };
      subProcesses.push(subProcess);
    }

    // Simulate final completion
    setTimeout(() => {
      process.send('DONE');
    }, 5000);
  }
});

// Cleanup handler
process.on('SIGTERM', () => {
  console.log('Worker received termination signal');
  // Clean up any sub-processes
  subProcesses.forEach(subProcess => {
    clearTimeout(subProcess.timer);
  });
  process.exit(0);
});
