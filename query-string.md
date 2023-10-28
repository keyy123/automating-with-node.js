## Query String
Goal: Learn how to make a URL with a query string

- A query string looks like this: `param1=value1&param2=value2`
- Insert a picture of Query string and URl

### How to create a queryString using node?
- node has a `querystring` module that takes key-value pairs from an object using it's `stringify` method
- It reutrns arguments shaped as a query string
```js
const tempObj = {
    foo: 'bar',
    baz: 'qux',
    corge: 'xyz'
}
querystring.stringify(tempObj);
```


### How to build a query string? 
- load querystring module in the module via `require` method
- Create an object that holds the query string parameters as key-value pairs
- Make a variable to hold the results of urls and the querystring stringified 
- Print it to the console

```js
const querystring = require(querystring);

const apiHost = 'https://google.com?=';
const params = {
    user: 'kdp',
    maxResults: 100,
    startAt: 50
}
const url = `${apiHost}${querystring.stringify(params)}`;
console.log(url)
```

### How to parse query strings?
- We can also reveerse and make an object from a query string
- Using `querystring` module, we take the url and use `parse` method
- Pass in the url and use `substring` method and within it pass in the url and use `indexOf` method to find place of `?` and add 1
- This will allow us to see the parameters that come after the `?` aka the query parameters. 
- Now we can use the query parameters like a normal JS object prop

```js
const querystring = require('querystring');

const url = 'http://www.opencanvas.co.uk?myName=Shaun&myAge=28&comment=Yes+I+am+getting+old';

const parsedUrl = querystring.parse(url.substring(url.indexOf('?') + 1));

console.log(`Hi my name is ${parsedUrl.myName}`);
console.log(`I am ${parsedUrl.myAge}`);
console.log(`Oh and... ${parsedUrl.comment}`);
```