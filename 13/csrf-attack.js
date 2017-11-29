const http = require('http');
const querystring = require('querystring');
const express = require('express');

const client = express();

client.get('/', (req, res) => {
    const post_data = querystring.stringify({
        name: 'China',
        capital: 'Beijing'
    });
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
      }
    };
    const post_req = http.request(options, (res) => {
        console.log(res);
    });

    post_req.write(post_data);
    post_req.end();
    res.end();
});

client.listen(3001, () => {
});
