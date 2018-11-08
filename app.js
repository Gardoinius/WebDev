const express = require("express");
const app = express();
var path    = require("path");
const port = 3000;
var boleto = require('./boleto');

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname+"/index.html"));
});

app.get('/codigoQR', function(req, res) {
	//res.set('Content-Type', 'image/png');
	// res.send("prueba");
	var codigoQR = boleto.generaCodigoQr('Codigo Prueba');
	res.json(codigoQR);
});


app.listen(port, () => console.log(`App listening on port ${port}!`))
