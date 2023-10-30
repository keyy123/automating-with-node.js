## URL Segments
Goal: Learn how to break down URLs and extract specific segments from them.

* `url` module is great for breaking down a URL into it's components

## How to parse a URL?

1. Cheeck if rhe user passed in a URL as a argument from the CLI 
```js
const url = require('url');
const args = process.argv.slice(2);
const [urlEntered] = args;

if (urlEntered === undefined){
    console.error('Please enter a url i.e. https://www.google.com');
    process.exit(0);
}
```
2. Use `url.parse` method to turn URL string => URL obhect with each part as a prop
```js
const {protocol, slashes, host, query, href} = url.parse(urlEntered);

console.log(`Using protocol: ${protocol}`);
console.log(`Using slashes: ${slashes}`);
console.log(`Host: ${host}`);
console.log(`Query: ${query}`);
console.log(`HREF: ${href}`);
```

- After turning URL string into an object with each component of URL as it's props, we can use `querystring` module to turn to kv pairs