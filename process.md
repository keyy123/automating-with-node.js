## Process

Goal: Learn how to use stdin and stdout using the global object `process`

### What is the Process ID (pid)?

- When you rub a script, It is treated as a individual `process`
- You can have many process running at once on pc and each has it's own unique ID called a *Process ID* (`pid`)

#### How to output the process ID?

- We can log the `pid` property on the `process` object in JS

```js
```js
console.log(`This process is pid ${process.pid}`);
```
```

console.log(`This process is pid ${process.pid}`)

```html

#### How to log to the console when the current process ends?
```js
process.on('exit', (code) => {
    console.log(`The process has now finished, exiting with code: ${code}`);
});
```

### What is `stdin` and `stdout`?

- standard input (stdin) = When users type in terminal amd sends the data (press enter). This gives the `process` object chunks of data to be worked on
- This means the process (app/flie running) is reading data given by you
- standard output (stdout) = what information is given back to us by the terminal/process

### How do we output using standard output (stdout)?

- We use `process.stdout.write`
- This is a simplified `console.log` since it does not give us the extras like adding a newline in the output that console.log would
- `process.stdout.write("some text \n");`

#### What does the CWD method do?

- It returns the current directory of the process (folder of the running file)
- `process.cwd() => File Path`

#### What does Uptime method do?

- Returns the total time in seconds that the process is working
- `process.uptime() => time `

## How to use standard input (stdin)?
1. We start by asking the user to enter something via stdout

```html
process.stdout.write('Type something than hit enter: \n');
```

```html
2. Set the character encoding to UTF-8 to ensure user input is a string
```

```html
process.stdin.setEncoding('utf8');
```

3. To read from the user input, we listen to `process.stdin` AKA `stdin` *readable* event listener to run a callback when event fires

```html
process.stdin.on('readable', () => {});
```

4. When the event fires, use `stdin` `read` method to read the data chunk that user typed and assign it to a variable (save it) 

```html
const chunk = process.stdin.read();
```

5. Check if the chunk from user is not `null` and if it is, show it to user via `stdout` and exit the current process

```html
if(chunk !== null) {
    process.stdout.write(`You wrote: ${chunk}`);
    process.exit(0);
}
```

### Next Steps:

1. Checkout to the next branch: `git checkout 2-example-process-drills`

2. Complete the exercises and compare answers to the Github Gists as a reference 

3. Follow instructions in the next branch and make sure you take breaks as well