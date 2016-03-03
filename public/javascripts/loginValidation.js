angular.module('mean').controller('loginController', function ($scope, $http, $window, $location) {
	$scope.logar = function(login) {
		$http.post('/login', login).success(function() {
			var token = btoa("{usuario: "+login.usuario+", senha: "+login.senha+"}");

			$http.defaults.headers.common.Authorization = "Basic " + token; 
			sessionStorage.token = token;
			$http.get('/mean');
		});
	};

	$scope.cadastrar = function(cadastro) {
		$http.post('/cadastro', cadastro).success(function() {
			$scope.formLogin = true;
		});
	};
});	