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
 
// Using sring query
wikifetch('action=query&format=json&prop=extracts&exintro=1&redirects=1&titles=nodejs', (err, data) => {
    if (err) {
        // handle an error here 
    }
    console.log(data);
});

// Using object query
wikifetch({
    action: 'query',
    format: 'json',
    prop: 'extract',
    exintro: '1',
    redirects: '1',
    titles: 'nodejs'
}, (err, data) => {
    if (err) {
        // handle an error here 
    }
    console.log(data);
});
```

## Wikifetch api

### wikifetch(query, callback)

* `query` \<String | Object\>
* `cb` \<Function\>

A query is either a string or an object that would be translated to a string for [mediawiki api](https://www.mediawiki.org/wiki/API:Main_page).
A callback is a function with an error as the first argument and the data received from wikipedia as the second.

## Example
To execute an example and to see a sample output type
```bash
node example.js
```

## Links
* [Mediawiki API](https://www.mediawiki.org/wiki/API:Main_page)
* [API Sandbox](https://www.mediawiki.org/wiki/Special:ApiSandbox)