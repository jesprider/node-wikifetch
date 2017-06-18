const https = require('https');

const makeRequest = (query, cb) => {
    const config = {
        host: 'en.wikipedia.org',
        path: '/w/api.php?',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

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
            if (Buffer.concat(body).toString().charAt(0) === '<') {
                cb(new Error(Buffer.concat(body).toString()), null);
                return;
            }
            const parsedBody = JSON.parse(Buffer.concat(body).toString());
            cb(null, parsedBody);
        })
    });

    req.on('error', (err) => {
        throw new Error('Error occurred:', err);
    });

    req.end();
};

module.exports = makeRequest;
