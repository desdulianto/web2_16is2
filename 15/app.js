const express = require('express');

const http = express();

http.get('/', (req, res) => {
	res.status(200).send({process: process.pid});
});

http.listen(process.env.PORT);
