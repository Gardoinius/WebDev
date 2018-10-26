var QRCode = require('qrcode')

module.exports = { 
	generaCodigoQr: function(folio) {
		QRCode.toDataURL(folio, function (err, url) {
  			console.log("Código QR generado")
			return url;
		})
	}
};
