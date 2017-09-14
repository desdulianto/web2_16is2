const express = require('express');
const app = express();

function helloHandler(request, response) {
	response.send("Hello World");
}

function helloNamaHandler(req, res) {
	res.send("Hello " + req.params.nama);
}

function isPrime(n) {
	var prime = true;
	for (var i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) { prime = false; break; }
	return prime;
}

function helloGetHandler(req, res) {
	var n = parseInt(req.query.nama)
	res.send("Hello " + (n*10) + ": " + isPrime(n));
}

app.get("/", helloHandler);
app.get("/hello", helloGetHandler);
app.get("/:nama", helloNamaHandler);
// mounting middleware static asset
app.use("/static", express.static("static"));

app.listen(3000, () => { console.log("listening on 3000") });
