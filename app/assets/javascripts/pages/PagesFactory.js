angular.module('app')
	.factory('pages', ['$http', '$stateParams', function($http, $stateParams) {

		var p = {
			pages: [],
			page: {}
		}

		p.create = function(page) {
			return $http.post('/pages.json', page).success(function(data) {
				p.pages.push(data);
			});
		};

		p.getSitePages = function(site_id) {
			return $http.get('/sites/' + site_id + '/pages.json').success(function(data) {
				angular.copy(data, p.pages);
			});
		};

		p.getPage = function(page_id) {
			return $http.get('/pages/' + page_id + '.json').success(function(data) {
				p.page = data;
			});
		};

		p.update = function(page) {
			return $http.put('/pages/' + page.id + '.json', page).success(function(response) {
				return response.data;
			});
		};

		p.changePagePosition = function(page) {
			return $http.put('/sites/' + $stateParams.site_id + '/pages/' + page.id +'/change_page_position.json', page).success(function(response) {
				return response.data;
			});
		}

		return p;
}]);