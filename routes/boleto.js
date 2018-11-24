var express = require('express');
var QRCode = require('qrcode')
var router = express.Router();



// router.app.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// TODO: Dinamically generate route for dynamic pdf
router.use("/generaBoletoPdf", function(req, res, next) {
    res.pdfFromHTML({
        filename: "boleto.pdf",
        // TODO: Inflate an HTML template file with the generated QR code
        htmlContent: "<html><body>Boleto</body></html>",
    });
});

module.exports = {
	generaCodigoQr: function(folio) {
		let code_url = QRCode.toDataURL(folio, function (err, url) {
		  		console.log("Código QR generado");
		});

		let json_object = JSON.stringify({
	       status: 1,
	       description: 'Success',
	       qr_data: code_url
		});

		return json_object;
	},
	// router
};
module.exports = router;

