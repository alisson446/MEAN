angular.module('mean', []);

angular.module('mean').controller('ClienteController', function($scope, $http) {

	$http.get('/usuariosessao').success(function(data) {
		$scope.usuario = data;
	});

	$http.get('/todos').success(function(retorno) {
		$scope.clientes = retorno.clientes;
	});

	$scope.show = function(view, id) {
		$scope.modal = true;
		$scope.cliente = null;

		if(view == 'novo') {
			$scope.tituloModal = 'Cadastro';
		}else {
			$scope.tituloModal = 'Edição';
			exibirEdicao(id);
		}
	};

	$scope.salvar = function(cliente) {
		$http.post('/salvar', cliente).success(function(retorno) {
			$scope.clientes.push(retorno.cliente);
			$scope.cliente = null;
		});
	};

	var exibirEdicao = function(id) {
		var idObject = {idObj: id};

		$http.post('/exibir', idObject).success(function(retorno) {
			$scope.cliente = retorno.cliente;
		});
	};

	$scope.editar = function(cliente) {
		$http.post('/editar', cliente).success(function() {
			for(var i in $scope.clientes) {
				if($scope.clientes[i]._id == cliente._id) {
					$scope.clientes[i].nome = cliente.nome;
					$scope.clientes[i].idade = cliente.idade;
				}
			}
		});
	};

	$scope.deletar = function(id) {
		var idObject = {idObj: id};

		$http.post('/deletar', idObject).success(function() {
			for(var i in $scope.clientes) {
				if($scope.clientes[i]._id == id) {
					$scope.clientes.splice(i, 1);
				}
			}
			$scope.modal = false;
		});
	};

	$scope.logout = function() {
		$http.get('/logout');
		window.location.href = '/';
	};
});