function MainCtrl($scope, $state, sites) {

	$scope.sites = sites.sites;

	$scope.createSite = function() {
		sites.create({
			name: $scope.name
		}).success(function() {
			$state.go('siteEdit', {site_id: sites.sites[sites.sites.length-1].id});
		});
	};

};

angular
	.module('app')
	.controller('MainCtrl', MainCtrl);