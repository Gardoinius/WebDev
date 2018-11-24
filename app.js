var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pdf = require("express-pdf");

var index = require('./routes/index');
var users = require('./routes/users');
var boleto = require("./routes/boleto");

const mustacheExpress = require('mustache-express');

require('./firebase.config')
const database = require('firebase').database()

var app = express();
app.use(pdf);

const port = 3000;

// view engine setup

// app.engine('mst', mustache(VIEWS_PATH + '/partials', '.mst'));


app.engine('mst', mustacheExpress())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mst')


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/boleto', boleto);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
  
//   res.send('error')
//   // res.render('error');
// });

module.exports = app;

app.get("/codigoQR", function(req, res) {
	//res.set("Content-Type", "image/png");
	// res.send("prueba");
	var codigoQR = boleto.generaCodigoQr('Codigo Prueba');
	res.json(codigoQR);
});

app.get("/eventos/:id", (req, res) => {
	const ref = database.ref(`/events/${req.params.id}`)
	ref.on('value', snapshot => {
		const value = snapshot.val()
		if (value) {
			const { name, description, image, tickets } = value
			const flattenedTickets = []

			for (let ticketType of Object.keys(tickets)) {
				flattenedTickets.push({
					name: ticketType,
					...tickets[ticketType],
				})
			}
			return res.render('evento', { name, description, image, tickets: flattenedTickets })
		}	else {
			res.send('404')
		}	
	})  
})

app.get("/checkout", (req, res) => {	 
		const { price, type } = req.query
		console.log(req.query)
		return res.render('checkout', { price, type })
})


app.get('/', (req, res) => {
	const ref = database.ref(`/events`)
	ref.on('value', snapshot => {

		const value = snapshot.val()
		if (value) {			

			const events = []
			
			for (let name of Object.keys(value)) {
				events.push({
					id: name,
					...value[name],
				})
			}

			return res.render('index', { events })
		}	else {
			res.send('404')
		}	
	})  
})


app.listen(port, () => console.log(`App listening on port ${port}!`))
app.use('/js', express.static('js'));
app.use('/css', express.static('css'));
app.use('/img', express.static('img'));
app.use('/images', express.static('images'));
