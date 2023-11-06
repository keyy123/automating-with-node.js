## Zipping Files
Goal: Learn how to zip files together with Node. 

### Installing dependencies
- WE can install other modules that increase what we can do in Node via `npm`
- npm.org
- Context:
    * A team member asks you to zip up a text and image file. We've decided to use `archiver` dependency (external) and install it into our project

    * *NOTE*: npm install [dependency name] will add the dependency into your `node_modules` and `package.json`. Remember, `npm install` looks at `package.json` and install all the dependencies in it
- After installing `archiver`, We have to import it into our module using `require` or `import` like the std modules


### How to zip many files?
- We need to add the archiver module in our file. If there's an error saying the module does not exist then install it and repeat.
`const archiver = require('archiver);`

- We need to add the `path` and `fs` modules into our file
`const path = require('path');
 const fs = require('fs');
`

- Now we will find the total size of the combined files in bytes of the 2 files we are zipping together using `stat` method on `fs` module
```js
const filePath1 = path.join(__dirname, 'copy.txt');
const filePath2 = path.join(__dirname, 'logo.jpg');
let prevBytes = 0;

// read the file stats of txt file
fs.stat(filePath1, (err, stat) => {
    if (err) {
        console.log(`File doesn't exist.`);
    } else {
        prevBytes = prevBytes + stat.size
    }
});

// read file stats for image
fs.stat(filePath2, (err, stat) => {
    if (err) {
        console.log(`File doesn't exist.`);
    } else {
        prevBytes = prevBytes + stat.size;

        console.log(`\nTotal bytes before archiving: ${prevBytes}`);
    }
});
```

- We need to make a path write our new file and create a write stream for our new file via `fs` module's `createWriteStream` method 
`js
const zipPath = path.join(__dirname, 'files.zip');
const output = fs.createWriteStream(zipPath);
`

- Use `archiver` and `zlib` to compress and zip files together
```js
const ZLIB_BEST_COMPRESSION = 8;
const archive = archiver('zip', {
    zlib: {level: Z_BEST_COMPRESSION}
})
```

*NOTE*: As much as I would like to stop taking notes and dive into archiver, and zip documentation plus streams, it'll be covered in another lesson


#### What is a stream analogy to better grasp streams?
A pattern that turns a big processes into smaller chunks. It's like eating your food bite by bite or cutting it into smaller portions instead of swallowing it whole.


- We need to listen for write stream to emit `close` evemt then we run a callback to log the bytes to console and tell user that the process is done
```js
output.on('close', () => {
    console.log(`Total bytes: ${archive.pointer()}`);
    console.log('archiving has finished');
});
```

- If the process runs into an error, listen for the `error` event on the `archive` variable then run a callback with `err` as a paramter that throw
```js
archive.on('error', (err) => {
    throw err;
})
```

- We pipe the filestream to the archiver 
`archive.pipe(output);`

- We add the filles we want to the archiver using `append` method on `archive`
- The `append` method takes 2 argument:  a readstream  of the desired file path, and an object that contains information about the file we can cahnge like the name
-We will give the read streams from the text and image so when we unzip it we see both files in the unzipped file

```js
// add files (read the copy.txt and logo.jpg and output with different names)
const textPath = path.join(__dirname, 'copy.txt');
const logoPath = path.join(__dirname, 'logo.jpg');

archive.append(fs.createReadStream(textPath), {name: 'content.txt'});
archive.append(fs.createReadStream(logoPath), {name: 'nobot.jpg'});

// finalize the archive (we done adding files but the stream is still running):
archive.finalize();
```


*NOTE*: When you run the app, look at the output. You'll see the benefits of compression and zipping files reduced the final file size. This is especially vital when sending scripts over email which has a 
file size limit.