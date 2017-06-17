# node-wikifetch

A small utility which helps make wikipedia api requests easily.

* Node.js > 6.9
* No external dependencies

## How to use

```javascript
const wikifetch = require('wikifetch');

wikifetch('action=query&format=json&prop=extracts&exintro=1&titles=nodejs', (data) => {
    console.log(data);
});
```

Wikifetch takes 2 parameters:

* `query` _string_: query for mediawiki api [https://www.mediawiki.org/wiki/API:Main_page](https://www.mediawiki.org/wiki/API:Main_page)
* `cb` _function_: callback function with data received from wikipedia