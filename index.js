var http = require("http")
var express = require("express")
var app = express()
var bodyParser = require("body-parser")

const port = process.env.PORT || 7000
const  cors = require('cors')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))

app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods: GET, POST, OPTIONS')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

var server = app.listen(port, function(){
	var host = server.address().address
	var port = server.address().port
	console.log("Escuchando en http://%s:%s", host, port)	
})

app.post("/sendEmail", function (req, res) {	
	
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Content-Type", "application/json");

	const nodemailer = require('nodemailer');
	const toAddress = req.body.toAddress;	
	const subject = req.body.subject;
	const text = req.body.text;
	
	console.log("\nNueva petición => "+ subject + " (to) => " + toAddress);
	const data = req.body.data;	
	
	var transporter = nodemailer.createTransport({
	    host: "smtp-mail.outlook.com", 
	    secure: false, 
	    port: 587, 
	    tls: { rejectUnauthorized: false },
	    auth: {
	        user: "umd-hash@outlook.com",
			pass: "Min2018*"
	    }	   
	});
	
	var mailOptions = {
	    from: '"Uniminuto hash generator " <umd-hash@outlook.com>', 
	    to: toAddress, 
	    subject: subject, 
	    text: text , 
	    attachments: [],
	    html: text + '<br><br>'+
	    	  '<b>Original Text/Archivo: </b>' + data.originalText + '<br>'+
	    	  '<b>Tipo Hash: </b>' + data.tipo + '<br>'+
	    	  '<b>Hash generado: </b>' + data.generatedHash + '<br>'+
              '<b>Hash esperado: </b>' + data.expectedHash + '<br>'+
              '<b>Respuesta: </b>' + data.res + '<br>' 
	};
	
	transporter.sendMail(mailOptions, function(error, info){
	    if (error) {
			console.log(error);
			res.end(JSON.stringify({"message":"Error al enviar el correo."}))
		} else {
			console.log('Email enviado');
			res.end(JSON.stringify({"message":"Email enviado correctamente."}))
		}
	});


})

