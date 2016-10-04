angular.module('app')
	.factory('sites', ['$http', '$stateParams', function($http, $stateParams) {

		var s = {
			sites: []
		};

		s.getAll = function(site) {
			return $http.get('/sites.json').success(function(data) {
				angular.copy(data, s.sites);
			});
		};

		s.create = function(site) {
			return $http.post('/sites.json', site).success(function(data) {
				s.sites.push(data);
			});
		};

		s.update = function(site) {
			return $http.put('/sites/' + site.id + '.json', site).then(function(response) {
				return response.data;
			});
		};

		return s;
}]);
