angular.module('main', ['ngRoute', 'components'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			template: '<timer></timer>'
		});
	}]);