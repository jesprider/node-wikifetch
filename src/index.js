const https = require('https');

const config = {
    host: 'en.wikipedia.org',
    path: '/w/api.php?',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

const handleStringQuery = (query) => {
    const path = query.trim();
    if (path[0] === '?') {
        throw new Error('Question mark is not allowed in the query.');
    }
    return path;
};

const handleObjectQuery = (query) => {
    const path = [];
    if (query.titles) {
        query.titles = query.titles.split(' ').join('+');
    }
    Object.keys(query).forEach((key) => {
        path.push(`${key}=${query[key]}`);
    });
    return path.join('&');
};

const wikifetch = (query, cb) => {
    if (typeof cb !== 'function') {
        throw new Error('Wrong parameter type for callback: function expected.');
    }

    let path = null;

    if (typeof query === 'string') {
        path = handleStringQuery(query);
    } else if (typeof query === 'object') {
        path = handleObjectQuery(query);
    } else {
        throw new Error('Wrong parameter type for query: string or object expected.');
    }

    const partials = [];
    const req = https.request(Object.assign({}, config, { path: config.path + path }), (res) => {
        res.on('data', (chunk) => {
            partials.push(chunk);
        }).on('end', () => {
            const body = Buffer.concat(partials).toString();
            if (body.charAt(0) === '<') {
                cb(new Error(body), null);
                return;
            }
            cb(null, JSON.parse(body));
        })
    });

    req.on('error', (err) => {
        throw new Error('Error occurred:', err);
    });

    req.end();
};

module.exports = wikifetch;
