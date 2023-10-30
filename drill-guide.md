## Exercise Instructions

- Given `url` and `apiHost` variables, parse the `url` and store the parsed object in `parsedUrl` variable
- Assign the value `myAge` from parsed url to `20`
- Using the parsedUrl object for queryString parameters, Create a new URL query string (`apiUrl`) based on the values in this object
- Run the code to if the URL is working

Solution: 
<a href="https://stackblitz.com/edit/stackblitz-starters-nbyjc9?file=parse-url.js">
  <img
    alt="Open in StackBlitz"
    src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"
  />
</a>

### Extra Credit Exercises

1. Parse a query string (parse-qs.js)

Given a url with a query string, write code using `querystring` module to parse query parameters. Output the parameters as individual key-value pairs

2. Make a query string (make-qs.js)

Make an object with key-value pairs and use `querystring` module to make a query string from it. Then add it to the base URL

3. Escape and Unescape a query string(escape-qs.js)
   Make a query string with special characters that need escaping, then see how the `querystring` module handles it when making a qs and parsing qs into object
4. Handling Arrays in Query Strings (array-qs.js)
   Create a query string with an array as a parameter and use the `querystring` module to handle and parse arrays from the queryString
5. URL Encoding and Decoding (url-coding.js)
   Use `querystring` module to give URLs with spaces and special characters to explicitly encode and decode them

- escape = make a escapable character like (\/, space, tab) into strings that are safe for URLs
- `escape` API - escapes the special characters and spaces in a string and turn them in values that are safe for urls
- `unescape` API - turns encoded special character and space codes back into regular characters and spaces that are not escaped

6. Interactive URL Builder (optional)
   Make a function or url building to enter key-value pairs and the program constructs a URL with a query string.

Try your best - There is a solution to check later:

### Futher Questions

#### How does querystring module methods work with different arguments and parameters are passed in?

- Main methods in `querystring` module are `stringify`, `parse`, `escape`, and `unescape`

1. `querystring.stringify(obj[, sep[, eq[, options]]])` => URL Query String

- The parameters are:

* `obj`(Object) - The object to turn to a query string
* `sep` (String, optional, default:'&') - The separator used between key-value pairs
* `eq` (String, optional default: '=') - The separator used between keys and values of pairs
* `options` (Object, optional) - An optional set of options for stringifying

```js
const querystring = require('querystring');

const params = {
    name: 'John',
    age: 30,
};

const queryString = querystring.stringify(params);
console.log(queryString); // Output: "name=John&age=30"
```

2. `querystring.parse(str[, sep[, eq[, options]]])` => object with parameters similar to `stringify`

* `str` (String): The query string to be parsed into an object.
* `sep` (String, optional, default: '&'): The separator used between key-value pairs.
* `eq` (String, optional, default: '='): The separator used between keys and values.
* `options` (Object, optional): An optional set of options for parsing.

```js
const querystring = require('querystring');

const queryString = 'name=John&age=30';

const params = querystring.parse(queryString);
console.log(params); // Output: { name: 'John', age: '30' }
```