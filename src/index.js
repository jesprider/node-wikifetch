const https = require('https');

const config = {
    host: 'en.wikipedia.org',
    path: '/w/api.php?',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

const makeRequest = (query, cb) => {
    if (!query || typeof query !== 'string') {
        throw new Error('Wrong parameter type for query: string expected.');
    }
    query = query.trim();

    if (query[0] === '?') {
        throw new Error('Question mark is not allowed in the query.');
    }

    config.path = config.path + query;
    const body = [];

    const req = https.request(config, (res) => {
        res.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            const parsedBody = JSON.parse(Buffer.concat(body).toString());
            cb(parsedBody);
        })
    });

    req.on('error', (err) => {
        throw new Error('Error occurred:', err);
    });

    req.end();
};

module.exports = makeRequest;
