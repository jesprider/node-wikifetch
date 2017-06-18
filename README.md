# node-wikifetch

A small utility that helps make wikipedia api requests easily.

* Node.js > 6.9
* No external dependencies

## How to install
```bash
npm install node-wikifetch --save
```

## How to use
```javascript
const wikifetch = require('node-wikifetch');

wikifetch('action=query&format=json&prop=extracts&exintro=1&titles=nodejs', (err, data) => {
    if (err) {
        // handle an error here
    }
    console.log(data);
});
```

Wikifetch takes 2 parameters:

* `query` _string_: query for mediawiki api [https://www.mediawiki.org/wiki/API:Main_page](https://www.mediawiki.org/wiki/API:Main_page)
* `cb` _function_: callback function with error as the first argument and data received from wikipedia as the second