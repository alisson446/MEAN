var express = require('express');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var router = express.Router();
var mongoose = require('mongoose');

router.get('', function(req, res) {
	res.render('login', {title:'login'});
});

var db = mongoose.connect('mongodb://localhost/mean');
var Schema = mongoose.Schema;

var loginSchema = new Schema({
	usuario: {type: String, required: true},
	senha: {type: String, required: true}
});

var Login = db.model('Login', loginSchema, 'loginCollection');

router.login = function(req, res) {
	var usuarioLogin = req.body.usuario;
	var senhaLogin = req.body.senha;

	Login.find({usuario: usuarioLogin, senha: senhaLogin}, function(error, login) {
		if(login.length==0) {
			res.send(500);
		}else {
			var user = {usuario: login.usuario, senha: login.senha};

			var token = jwt.sign(user, 'shhhhhhared-secret', { expiresInMinutes: 3600 });
  			res.json({ token: token });
		}
	});
};

router.cadastro = function(req, res) {
	var login = new Login(req.body);

	login.save(function(error) {
		if(error) {
			res.send(500);
		}else {
			res.send(201);
		}
	});
};

router.autenticacao = function(req, res) {
	var auth = req.headers['Authorization'];
	debugger;

	if(auth) {
		var b64 = new Buffer(auth.substring(6), 'base64');
		var objeto = JSON.parse(b64.toString());

		res.json(objeto);
	}else {
		res.send(401);
	}
};

module.exports = router;