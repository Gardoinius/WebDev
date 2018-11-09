const express = require("express");
const pdf = require("express-pdf");
const boleto = require("./boleto");
const app = express();
app.use(pdf);

const port = 3000;

const path = require("path");

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname+"/index.html"));
});

app.get("/codigoQR", function(req, res) {
	//res.set("Content-Type", "image/png");
	// res.send("prueba");
	var codigoQR = boleto.generaCodigoQr('Codigo Prueba');
	res.json(codigoQR);
});

// TODO: Dinamically generate route for dynamic pdf
app.use("/generaBoletoPdf", function(req, res){
    res.pdfFromHTML({
        filename: "boleto.pdf",
        // TODO: Inflate an HTML template file with the generated QR code
        htmlContent: "<html><body>Boleto</body></html>",
    });
});


app.listen(port, () => console.log(`App listening on port ${port}!`))
