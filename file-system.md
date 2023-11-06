## File System 
Goal: Learn file system to handle files 

- Using the `file system` module is a big aspect of many build tools so node gave us a module to use
- `fs` module let's us read data from files, write new or update existing files
- we will practice use `fs` module on a `JSON` file 

## Reading from a configuration file in JSON 
- When making a customizable templete for your project, using a separate `JSON` file that holds data outside of your code. 
- We can also use `require()` function to import `JSON` files into a file (module).
```js
const {projectId, startDate, emdDate} = require('./data/example-config');

console.log(`\nThe ID of the project is: ${projectId}`);
console.log(`The start date of the project is: ${startDate}`);
console.log(`The end date of the project is: ${endDate}\n`);
``` 
- A cool benefit of this is the JSON is automatically parsed (from JSON String to JS Object) and can be used immediately in the source code


Before continuing, copy the following code and save it as a JSON file:

```js
// config.json

{
    "projectId": 234789,
    "game": "january-2019-wheres-wallis",
    "startDate": "2019-01-01T00:00:00",
    "endDate": "2019-01-08T00:00:00"
}

```
Same but as a js file
```js
// read-json-bad-example.js
const fs = require('fs');

const readJson = file => new Promise((resolve, reject) => { 
  fs.readFile(file, { encoding: 'UTF-8' }, (err, data) => {
  if (err) {
      reject(err);
    }
    resolve(JSON.parse(data));
  });
});

// Usage
readJson(`${__dirname}/../data/example-config.json`)
  .then(config => console.log(`\nThe ID of the project is: ${config.projectId} \n`));
```

#### Why is the JS code snippet a bad example of read json files?
- It is not recommended to read JSON data in the way


## How to write/add text to a config file in JSON?
- Context: 
The values that you need to place into the configuration file actually exist in a Jira ticket. So instead of updating the values manually, 
you could pass a ticket/issue number to the script, and it would go, fetch the values, and use them to overwrite the values in the configuration file.

We are using data from a jira ticket, pass it into our node app to fetch other data then using the received data write it to the config file. 

*NOTE*: We use data from a mock json file but we normally make an HTTP request to a 3rd party API in a real-world example which we'll try later

*COPY THE CODE BELOW*
```json
// mock-jira-data.json
{
    "GS-1000": {
        "projectId": 9500,
        "game": "apple-orchards",
        "startDate": "2018-09-01T00:00:00",
        "endDate": "2018-09-20T00:00:00"
    },
    "GS-1005": {
        "projectId": 9501,
        "game": "blueberry-burst",
        "startDate": "2018-10-01T00:00:00",
        "endDate": "2018-10-04T00:00:00"
    },
    "GS-1007": {
        "projectId": 9502,
        "game": "cherry-chaser",
        "startDate": "2018-11-01T00:00:00",
        "endDate": "2018-11-12T00:00:00"
    },
    "GS-1020": {
        "projectId": 9510,
        "game": "damson-in-distress",
        "startDate": "2018-12-01T00:00:00",
        "endDate": "2018-12-25T00:00:00"
    }
}
```

- We will also make a helper function to get specific data from jira based on the Jira ticket number (`get-jira-data.js`) and another one to write the data to a JSON file (`write-json.js`). 

```js
// get-jira-data.js

const jiraData = require('../data/mock-jira-data');

// Imagine this data being retrieved from Jira and transformed
const fetchDataFromJira = ticketNumber => jiraData[ticketNumber]; // finds key that matches ticketNumber from jiraData fetched

module.exports = fetchDataFromJira;
```

```js
//write-json.js
const fs = require('fs'); 

const JSON_WHITESPACE = 4;

const writeJson = (file, contents) => new Promise((resolve, 
reject) => {
  fs.writeFile(file, JSON.stringify(contents, null, JSON_WHITESPACE), (err) => {
    if (err) {
      reject(err);
    }
    resolve(`${file} written`);
  });
});

module.exports = writeJson;
```

*NOTE*: When making a JS Object and writing it a file, we *MUST* turn it to a JSON string via `JSON.strinfigy()` method


## How to make a config file?
- import `path` module within the file 
`const path = require('path');`
- import the helper scripts (writeJSON, getJiraData)
```js
const writeJson = require('./helpers/write-json');
const getJiraData = require('./helpers/get-jira-data');
```
- Collect 1 CLI arguments from process object and destructure it into a variable called `ticket`
```js
const args = process.argv.slice(2);
const [ticket] = args;
```
- Make a variable to hold ticket from CLI and if available set to a generic answers
`const jiraTicket = ticket || 'GS-1000'`
- Fetch ticket data from JIRA using helper method `getJiraData`
`const jireData = getJiraData(jiraTicket)`
- Check if the jiraData is undefined and if it is output the message to user and end the current process
```js
if(jiraData === undefined){
    console.log(`Jira ticket ${jiraTicket} does not exist`);
    process.exit(0);
}
```
- Make a file path to save/edit a config.json file via `join()` method on `path` module 
```js
const CONFIG_FILE = 'config.json';

// current folder path + /'data' + /'config.json'
const newConfigFile = path.join(__dirname, 'data', CONFIG_FILE);
```
- Use other helper method and pass in the new config file path and the data from jiraData helper function as arguments and make sure you await the promise to complete to see data

```js


```

### Did You Know - Path is very helpful when making with different OS
- MacOS uses forward slashes (/) while windowsOS uses backwards slashes ("\")
- To avoid paths not resolving to correct oneL use `path.join()` function to connect URL segments 
- It takes in a comma-separated values for path segments to make a new URL string for OS 
- It is a good practice to use `path.join()` to make URL

#### How do we know our current directory path dynamically?
```__dirname``` is a global variable in node that will return a string of the current directory path which can be used with `path.join`
```__filename``` is another global aa well that return string of current file