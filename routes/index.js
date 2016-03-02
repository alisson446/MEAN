var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('', function(req, res, next) {
	res.render('index', { title: 'mean' });
});

var db = mongoose.createConnection('mongodb://localhost/mean');
var Schema = mongoose.Schema;

var clienteSchema = new Schema({
	nome: {type: String, required: true},
	idade: {type: String, required: true}
});

var Cliente = db.model('Cliente', clienteSchema, 'clienteCollection');

router.todos = function(req, res) {
	Cliente.find({}, function(error, clientes) {
		if(error) {
			res.send(500);
 		}else {
			res.json({ clientes: clientes });
		}
	});
};

router.salvarCliente = function(req, res) {
	var cliente = new Cliente(req.body);
	cliente.save(function(error, clienteCadastrado) {
		if(error) {
			res.send(500);
		}else {
			res.json({cliente: clienteCadastrado});
		}
	});
};

router.exibir = function(req, res) {
	var id = req.body.idObj.toString();

	Cliente.findOne({_id: id}, function(error, cliente) {
		if(error) {
			res.send(500);
 		}else {
			res.json({cliente: cliente});
		}
	});
};

router.editar = function(req, res) {
	Cliente.findOneAndUpdate({_id: req.body._id}, req.body, function(error, cliente) {
		if(error) {
			res.send(500);
 		}else {
			res.send(201);
		}
	});
};

router.deletar = function(req, res) {
	var id = req.body.idObj.toString();

	Cliente.remove({_id: id}, function(error) {
		if(error) {
			res.send(500);
 		}else {
			res.send(201);
		}
	});
};

module.exports = router;