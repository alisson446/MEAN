angular.module('mean').controller('loginController', function ($scope, $http, $window, $location) {
	$scope.logar = function(login) {
		$http.post('/login', login).success(function() {
			$http.get('/mean');
		});
	};

	$scope.cadastrar = function(cadastro) {
		$http.post('/cadastro', cadastro).success(function() {
			$scope.formLogin = true;
		});
	};
});	