angular.module('app')
	.factory('sites', ['$http', '$stateParams', function($http, $stateParams) {

		var s = {
			sites: [],
			site: {}
		};

		s.getAll = function(site) {
			return $http.get('/sites.json').success(function(data) {
				angular.copy(data, s.sites);
			});
		};

		s.getSite = function(site_id) {
			return $http.get('/sites/' + site_id + '.json').success(function(data) {
				s.site = data;
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

		s.destroy = function(site) {
			return $http.delete('/sites/' + site.id + '.json').success(function(data) {
				s.sites.splice(site.sites.indexOf(site), 1);
			});
		};

		return s;
}]);
