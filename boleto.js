var QRCode = require('qrcode')

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
	}
};
