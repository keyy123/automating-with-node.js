## I tried to use `exec` to run vim editor in child process but I could not see editor. Why?

- `vim` needs an interactive terminal to work well, `exec` does not give the right environment to use `vim`
- Use `spawn` in this context, since we would be about to interact with the terminal created from it
- `spawn` makes a new process BUT unlike `exec`, the process will have an input and output stream that we can control and see


### How do I use `spawn` to make an interactive process for `vim` command?

1. import `spawn` method into app
```js
const {spawn} = require('child_process');
```

2. Call `spawn` and pass in the command you want to run and the command line arguments into an array
```js
const editor = spawn('vim', [], {

});
```

3. Use `stdio: inherit` to share the input and output and error streams of the parent (current) process we are using to see and work with `vim` editor in the terminal 
```js
const editor = spawn('vim', [], {
 stdio: inherit,
});
```
4. Add am event listener to listen for exit event so app knows user is done with it 
```js
editor.on('exit', () => {});
```