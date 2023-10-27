## Exercise 1 (show-process.js):

Make a basic node script to show the process ID of their current node application and show it to the console and run the application 3 times

What do you notice each time your app runs? (hint: look in the terminal)

## Exercise 2 (exit-process.js):

Make a node scrip tthat creates a script to exit a process when a specific condition is true. Like exit the application, if the user inputs a specific number or if a specific number is randomly generated. 

## Exercise 3 (custom-exit.js):

Make a node script that exits the current process with a custom exit code (don't worry about HTTP status codes yet)

## Exercise 4 (listen-exit.js)

Make a node script to listen for the `exit` event on process object amd do a specific thing before it closes like log to console or write a file to the system

## Exercise 5 (http-graceful-close.js):

Make a HTTP server in node with a response header of text/plain content and statusCode 200 and a end with a unique response

Listen for the server at a specific port

When the hears a 'Signal Interruption' event `SIGINT` fire, log to the console a message to let users know  a graceful shutdown is happening

Close the server and exit the process




NOTE: SIGINT event = an event from unix systems that fires when the user interrupts a process in terminal using 'Ctrl + C'. It will clean resources up and shoutdown (graceful shutdown)

SIGTERM event = an event from unix systems that fires when an external application or process requests that the process shutdown (process managers/task mgmers etc.). It iwll still clean up resources and exit gracefully

SIGKILL - abruptly end process and may be not be a graceful shutdown

## Exercise 6  (stdout and stdin)

Make a script to tell use to enter text using stdout and set characterEncoding to utf8

Listen for stdin 'readable' event and read the data chunk from terminal and based on a condition write an output to output stream and exit the program









What are common use cases for process.exit?

1. Graceful Shutdowns - gracefully shutdown node.js applications to clean up resources or do an action before exiting a process like close a db connection or write logs or 
other clean up tasks

```js
// Graceful shutdown example
server.close(() => {
  console.log('Server closed.');
  process.exit(0);
});
```

2. Error Handling - If there is a critical errors, It may be better to end the app rather than run in a unstable state. Ending with non-zero code to show an error happend
for error handling and monitoring 

```js
// Handling a fatal error
if (someCriticalError) {
  console.error('A critical error occurred.');
  process.exit(1); // Exit with a non-zero code to indicate an error.
}
```

3. Script Completion - sometimes, you just want the app to end after doing a certain task which process.exit does

```js
// A script that performs a task and exits
// ...
console.log('Task completed successfully.');
process.exit(0);

```

4. CLIs - you may want to exit app after doing tasks in CLI after processing arguments
```js
// Handling CLI input and exiting
const args = process.argv.slice(2); // Extract command-line arguments

if (args.includes('--version')) {
  console.log('My CLI Tool v1.0.0');
} else if (args.includes('--help')) {
  console.log('Usage: my-cli-tool [--version] [--help]');
}

process.exit(0);
```

5. Signals Handling - You may want app to end when it receives specific signals like `SIGINT` or `SIGTERM`. These signals are used to shutdown gracefully 
when done outside program. 
```js
process.on('SIGINT', () => {
  console.log('Received SIGINT. Exiting gracefully.');
  process.exit(0);
});

```

What are real-world contexts to use process.exit?

1. Server Shutdown - When making a node server app like an HTTP server, you may use process.exit() to gracefully end server. It can be used with `server` object's `close` method
to do clean up tasks before server ends

```js
const server = http.createServer((req, res) => {
  // Handle HTTP requests
});

server.listen(3000);

process.on('SIGINT', () => {
  console.log('Received SIGINT. Gracefully shutting down...');
  server.close(() => {
    console.log('Server closed. Exiting.');
    process.exit(0);
  });
});
```

2. Batch Processing - When you have a node script doing batch processing tasks, like data processing or file conversion, Process.exit can be used to exit after batch job is done. 

```js
// Perform batch processing
// ...

console.log('Batch processing completed.');
process.exit(0);
```

3. CLI Tools - end after arguments are processed and task is done

```js
// Handle command-line input
if (args.includes('--version')) {
  console.log('My CLI Tool v1.0.0');
} else if (args.includes('--help')) {
  console.log('Usage: my-cli-tool [--version] [--help]');
}

process.exit(0);
```

4. Error Handling - A critical error that makes the app state unstable and should end, we can use process.exit to end the app and show an error happended

```js
if (someCriticalError) {
  console.error('A critical error occurred.');
  process.exit(1); // Exit with a non-zero code to indicate an error.
}
```

5. Containerized Environments - In Docker, it can tell the continer orchestrator that the app is done or an error happened which helps. 

6. Integration with Process Managers - Process Managers like PM2 usually uses process.exit to gracefully manage lifecycle of node app. We can edit process managers to use process.exit when start, stop, reload node apps using process.exit under certain conditions. 

What should we be aware of when using process.exit?

Using it to suddenly exit a node app can cause resource leaks, or incomplete operations. 

How does process.exit work with different arguments and parameters are passed in?

## Exit with a 0 - exit code
```js
process.exit(0) or process.exit()
// means it successful exit
```

## Exiting with non-zero exit code (Error):
```js
process.exit(1); 
// It means there was an error and ends program 
```

## Exiting with Non-Integer Exit Code:
```js
process.exit(3.14); // equal to process.exit(3); since it will remove the extra places after decimal
```

## Not calling process.exit:
// some cases don't need it to exit but its nice to directly use it to show devs that you intend to exit


## Exiting with signals:
```js
process.on('SIGINT', () => {
  console.log('Received SIGINT. Exiting gracefully...');
  process.exit(0);
});
```
- Node apps can exit gracefully when signals like `SIGINT` and `SIGTERM` are fired to clean up before shutting down app.

## What are interesting and practical variations on common and real-world use cases of process.exit? What context would they be useful? 

1. Graceful Multi-Stage Shutdown:
Context: In apps with many components (API server, DBs, BG Workers), use a mult-stage shutdown process. 
Example: Close DB first, then close HTTP Server gracefully
Use Case: Ensures the resources are closed in the right order, and that the app exits gracefully, minimizing risk of data corruption

2. Exit with a custom error message:
Context: In apps wih extensive logging or user interactions, you can exit with a custom message to give more context about why the app is exiting. 
Use Case: Makes debugging and error tracking easier. 
Example: Include the reason for the exit, timestamp, and any relevant information. 
```js
console.log('Custom message: Shutting down due to database error.');
process.exit(1);
```

3. Dynamic Exit Codes:
Context: In apps with many error states, using dynamic exit codes to show the type or severity of error is useful. You can define a set of meaningful exit codes. 
Use Case: Allows for fine-grained error reporting and differentiation of error types. For instance, exit with code 2 for database errors, code 3 for authentication errors
and so on
```js
function handleDatabaseError() {
  console.error('Database error: Connection lost.');
  process.exit(2);
}
```

4. Event-Driven Cleanup:
Context: Use `EventEmitters` and custom events to start cleanup tasks before exiting. Fire a custom event that shows the need to cleanup when a critical error happens
Use Case: Ensure that certain clean up tasks are done before app exits like closing files, cleaning caches, or sending notifications
```js
const EventEmitter = require('events');
const customEmitter = new EventEmitter();

customeEmitter.on('cleanup', () => {
    //do cleanup tasks

    console.log('Performing cleanup before exiting...');
    process.exit(1);
})

if(someCriticalError) {
    console.error('A critical error occurred.');
    customEmitter.emit('cleanup')
}
```

5. Conditional Exit in Clustered Apps:
Context: In apps using node `cluster` module for multi-process execution, you cna conditional exit child processes based on certain criteria (load balancing. resource usage, etc.)
Use Case: Allows you to fine tune how chiid processes are managed in the cluster, Confirms that underperforming or problematic processes are exited while others keep running

6. Interactive Console Apps:
Context: For interactive console app, You can use `process.exit()` when certain user inputs are entered, causing users to gracefully exit app or return to main menu. 
Use Case: Provides a user-friendly way to exit console apps w/o abruptly terminating the program, improving the user experience. 
```js
if (userInput === 'exit') {
  console.log('Exiting the application...');
  process.exit(0);
}
```

7. Dynamic Retry Mechanism:
Context: In long-running scripts or apps, use process.exit as part of the retry mechanism, When a certain number of retries is used, exit the application with the right error code
Use Case: Helps manage automatic retry logic, ensuring that the app doesn't run forever if retries fails
```js
const maxRetries = 5;
let retries = 0;

function performTask() {
  // Task logic
  if (retries < maxRetries) {
    retries++;
  } else {
    console.log('Max retries reached. Exiting.');
    process.exit(1);
  }
}
```

Suggestion for last one: Add a time based lockout that persists for the same PC with the same IP address and works around VPN workarounds