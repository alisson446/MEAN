angular.module('mean').controller('loginController', function ($scope, $http, $window) {
	$scope.logar = function(login) {
		$http.post('/login', login).success(function(data) {
			$http.defaults.headers.common.Authorization = "Bearer " + data.token; 
			$window.sessionStorage.token = data.token;
			window.location.href = '/mean';
		});
	};

	$scope.cadastrar = function(cadastro) {
		$http.post('/cadastro', cadastro).success(function() {
			$scope.formLogin = true;
		});
	};
});	