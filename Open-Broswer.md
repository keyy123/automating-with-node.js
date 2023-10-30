## Open URL In Browser

Goal: Learn how to support different OS when opening a browser with a URL

* We learn how to support both windows and mac when using `os` module to open a browser with a URL

* The new step here is we need to make a new `child process` to focus on executing the browser opening

* We need to have enough memory for both the child process and current process to run 

* process = node app we are currently running 

## What are child processes?

- A process is an instance (copy) of a PC program running on your OS. 
- A child process = a process made by a parent process
- There are 4 ways to make a child process in node: `spawn()`, `fork()`, `exec()`, and `execFile()`


### What is the difference between the child process methods? (simplify)
- `spawn` starts with a command and makes a new process that we can pass CLI args to. Unlike `exec`, It does not create a shell (CLI) to run the command so it's more efficient

- `exec` buffers the commands output and passes it to a callback function. We use `exec` only if you know the data return is small. Unlike `exec`, `spawn` will send the data back in chunks which can be time consuming for a small amount of data. 

- `execFile` is used to run a file w/o a shell (EXCEPT windows, where some file can't be ran)

- `fork` is a `spawn` variant. `Fork` will call a specific node file with a back-forth communication channel like service workers that let message between the parent and child be passed back and forth unlike `spawn`.

## How to open a URL from CLI?

1. Identify the OS we have to know which command to run 
2. The user can enter URL or write the url in code or prompt user at terminal
```js
const {platform} = require('os');
const {exec} = require('chile_process');

const WINDOW_PLATFORM - 'win32';

const osPlatform = platform();
const args = process.argv.slice(2);
const [url] = args;
```
3. Check if the argument from CLI is undefined, if it is then exit the process after leaving an error message as output
3b. Create a variable to save the command to use laters (initiailize it) 
```js
if(url === undefined){
    console.error("some helpful message. Try again");
    process.exit(1);
}

let command;
```
4. Check which the OS Platform is windows or not
5. If it's windows, set the command to start chrome in incognito mode with url
```js
if(osPlatform === WINDOW_PLATFORM){
    command = `google-chrome --profile-directory=\"Profile 8\" ${url}`
}
```
6. else set it to start chrome with the url 
```js
else{
    
}
```
7. output to user that the code is running the command entered
8. use `exec` to spawn a new child process to handle a little bit of data 