const express = require("express");
const app = express();
var path    = require("path");
const port = 3000;

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname+"/index.html"));
});
var boleto = require('./boleto');

app.get('/codigoQR', function(req, res) { 
	//res.set('Content-Type', 'image/png');
	var codigoQR = boleto.generaCodigoQr('Codigo Prueba');
	res.send(codigoQR);
});


app.listen(port, () => console.log(`App listening on port ${port}!`))
