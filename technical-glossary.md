## Technical Overview

### What is a CLI?

Command Line Interface = text based tool to work with a PC by taking text, process it and return an output. 


### What is Bsah? 

Bash = a tool that knows and runs shell commands in the CLI. When you type bash commands in them it will execute it for you. 

```sh
#!/bin/bash
#0.0.1

git checkout main
git pull origin main
git chcekout -b $1
```

This code example is a Bash Script that switches to the main branch then pulls changes from the main branch online then creates a new branch named sing hte first
argument to this script then switches to it

NOTE: I skipped NPM and Node b/c there are other resources that can do it justice


### What are mode modules?

- Modules are how we break code into smaller pieces that do one thing by putting it into another file
- `module.exports` is an object that we can assign our functions and other objects that we want to share 
- To get the function or object that was assigned to `module.exports` in another file, We use `require` in the file we want to share it in with the path to the file with the object/function 

```node
// a.js
const b = require('./b.js');

console.log('From a.js: running code in the file b.js'); 

b();
```

```node
//b.js
const arsenalFanChant = () => {
  console.log('We love you Arsenal, we do!');
}

module.exports = arsenalFanChant;

```

#### What does `require` do under the hood? 

1. It finds the path to the file you pass in.
2. It determines the type of the file (JavaScript/JSON etc.).
3. Applies wrapping of the code to give the file a private scope (variables inside this file are limited to the file, making the variables private, unless exported).
4. Evaluates the loaded code.
5. Caches the import so that we do not have to repeat these steps when requiring the same file somewhere else.

#### Why is `require` important?
It prevents scope conflicts and makes code more maintainable. 
[Add pictures here]

#### What is `require` similar to? How are the two functions differnet from each other?

#### What are common use cases for `require`?

#### What are some practical but unconventional use cases for `require`?

### What is ES6?

- ECMAScript 6 or ECMAScript 2015 is a major JS update that makes it easier to use and more powerful. 
- [Find more examples here](http://es6-features.org/)

```js
// examples of syntactic sugar from ES6
class Homer { static speak() {
   console.log("doh!");
 }
}
const obj = { x, y };
const odds = evens.map(v => v + 1);
```

### What is Chrome v8?

A JS engine made by google used by Chrome browser and node.js w/ other apps that is powered by C++/ It turns JS code to machine code then runs it. 

### What are benefits of Chrome v8?
1. Faster run times
2. Handles memory allocations for objects
3. Garbage collection for objects not held in memory (variables or functions or objects not referenced)


### What is ESLint?

- Eslint is a library that enforce coding style rules for JS we write based on the rules we add to it's config file (.eslintrc)
- It will warn us or even error our code b/c it does not follow rules 
- It can be added to a project via `npm install` 

#### Exercise: Install ESLint to project
```js
npm install lint
npm run lint
```

Here is the eslint file we will add to the config file at the root of your project:

```json
 "extends": "airbnb",
  "rules": {
    "no-console": 0,
    "linebreak-style": ["error", "unix"],
    "no-use-before-define": ["off"],
    "comma-dangle": ["error", "never"],
    "global-require": ["off"],
    "import/no-dynamic-require": ["off"]
  }, 
  "env": {
    "browser": false,
    "node": true 
  }
}
```

### What are JS Promises?

Let's say you give friend 10 dollars to buy pizza and he says, I promise

```js
function friendGetsPizza() {
  return new Promise((resolve, reject) => {
    // ... do things to get pizza
    // Scenario 1 - He got the pizza
    resolve({ name: 'Margherita' });
    // Scenario 2 - He did not get the pizza
    reject('cannot be trusted');
  });
}
```

When he gets the pizza, You'll eat it:

```js
friendGetsPizza()
    .then((pizza) => {
        console.log('now eating pizza', pizza.name);
    })
```

If he's a bad friend, does not come back and even eats your pizza? That means he did not complete his promise to you

```js
friendGetsPizza()
  .then((pizza) => {
    console.log('now eating pizza', pizza.name);
  })
  .catch((e) => {
    console.log(
      'take friend out of life and move on because he', e
    );
  });
```
If the promise is not fulfilled, The `catch()` function will be called instead of `then()` because the promise was rejected. 