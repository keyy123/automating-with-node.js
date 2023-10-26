## Arguments

Goal: Use arguments in node and bash

### How to pass an argument to Bash vs Node?

*Bash Example*
- To run an argument in bash, you need need to make a file with extension `.sh` and to assign paramters from input using a dollar sign ($) followed by a non-zero positive integer to access it in the script.
- Use `bash` command to run bash files in the terminal 
```bash
name="$1"
echo "$name" 
#echo is equivalent to console.log()
#"$variable_name" = how to print variable value instead of a string
#name is noe - 'KDP'
```
```terminal
$ bash my-bash-script.sh 'KDP'
```

*Node example*

- To do the same thing in node, we can use Node's `process` object to get values linked to the process of the script. We'l use it to get arguments.

```js
node my-node-script.js 'KDP'
```

- When running a file in node, we create a new `process`. 
- In the `process` object, we have an array called `argv` which holds the path to node.exe, the path to the file we're running, and any arguments passed in from CLI will 
be added as third item and up

```js
const args = process.env;
/*
the args array is now
[ 
  '/usr/local/bin/node',
  '/usr/src/app/my-node-script.js', 
  'KDP'
]
*/
```

#### What is a common mistake when using process.argv?
- The CLI argument passed in will be the first element in process.argv array
- Correction: It will always be the third element (if one intake was entered) or higher

#### How to prevent the common mistake using process.argv?
- Slice or remove the first 2 arguments and make a new copy of the original array to use
```js
const args = process.argv.slice(2);
/*
args is now
[    
  'KDP'
]
*/
```

### How to make a node script to handle an argument?

```js
const args = process.argv.slice(2); // leaves 1 argument in argv array - our input
const [name] = args; // sets variable name to the first element of the array args

if (name === undefined) {
  console.error('Please pass a name, e.g. node hello.js Shaun'); // log error to console with message
  process.exit(0); // exit code with error 
}

console.log(`Good day to you, ${name}`); // templating our variable into the log 
```

```js
const name = args[0] === const [name] = args
```

- We run the code in node via the `node` command + files name  
- To add input to a node process, we ad argument after node + file name in the CLI

```bash
node hello.js 'My Name'
```


Exercise: 
1. Make a node app that will remove first 2 arguments from process.argv array
2. Check if the argument is undefined and log 'no arguments given' as an error and exit process
3. If all is good log the argument to console
4. Run the function 

Execise 2: 
Do the same as the above but make a bash script that just makes a variable that is assigned the input from cli and print to terminal


#### Is process.argv an array? T/F
True

#### If I pass in an argument to the node process, at what index is it in `process.argv?`
3rd index

#### If given the array `argv`:

```js
[ 
  '/bin/node',
  '/educative/quizzes/quiz.js', 
  'Q3'
]
```
What is the right way to remove all the elements, except "Q3" from the array?

process.argv.slice(2);


Solution to Exercise 1 + 2:

<a href="https://stackblitz.com/edit/node-9e86bs?ctl=1&embed=1&file=my-name.sh">
  <img
    alt="Open in StackBlitz"
    src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"
  />
</a>
