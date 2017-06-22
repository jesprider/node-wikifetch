const wikifetch = require('./src/index');

const cities = [
    {"id":3435910,"name":"Buenos Aires","asciiname":"Buenos Aires","lat":"-34.61315","lng":"-58.37723","countryCode":"AR","population":13076300,"elevation":null,"timeZone":"31"},
    {"id":2643743,"name":"London","asciiname":"London","lat":"51.50853","lng":"-0.12574","countryCode":"GB","population":7556900,"elevation":null,"timeZone":"25"},
    {"id":5128581,"name":"New York City","asciiname":"New York City","lat":"40.71427","lng":"-74.00597","countryCode":"US","population":8175133,"elevation":10,"timeZone":"57"}
];

//
// Object request example:
wikifetch({
    action: 'query',
    format: 'json',
    prop: 'extracts',
    exintro: 1,
    redirects: 1,
    titles: cities[0].asciiname
}, (err, data) => {
    for (const key in data.query.pages) {
        console.log('Object request:\n');
        console.log(data.query.pages[key].extract + '\n\n');
    }
    request();
});

//
// String request example:
wikifetch('action=query&format=json&prop=extracts&exintro=1&redirects=1&titles=' + cities[0].asciiname.split(' ').join('+'), (err, data) => {
    for (const key in data.query.pages) {
        console.log('String request:\n');
        console.log(data.query.pages[key].extract + '\n\n');
    }
    request();
});

//
// Recursion example:
const iterator = cities.entries();

const request = () => {
    const value = iterator.next().value;

    if (value) {
        const cityName = value[1].asciiname.split(' ').join('+');
        wikifetch('action=query&format=json&prop=extracts&exintro=1&redirects=1&titles=' + cityName, (err, data) => {
            for (const key in data.query.pages) {
                console.log(cityName + '\n');
                console.log(data.query.pages[key].extract + '\n\n');
            }
            request();
        });
    }
};

request();