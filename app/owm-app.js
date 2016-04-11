angular.module('OWMApp', ['ngRoute'])
		.value('ownCities', ['Calgary', 'New York', 'Chicago'])
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider.when('/', {
				templateUrl: 'home.html',
				controller: 'HomeCtrl'
			}).when('/cities/:city', {
				templateUrl: 'city.html',
				controller: 'CityCtrl',
				resolve: {
					city: function (ownCities, $route, $location) {
						var city = $route.current.params.city;
						if(ownCities.indexOf(city) === -1) {
							$location.path('/error');
							return;
						}
						return city;
					}
				}
			}).when('/error', {
				template: '<p>Error - Page not Found</p>'
			}).run(function($rootScope, $location) {
				$rootScope.$on('$routeChangeError', function() {
					$location.path('/error');
				});
			});
		}]).controller('HomeCtrl', function ($scope) {

}).controller('CityCtrl', function ($scope, city) {
	$scope.city = city;
});
