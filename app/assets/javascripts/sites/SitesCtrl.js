function SitesCtrl($scope, $rootScope, $state, $stateParams, $uibModal, sites) {
	$scope.site = sites.site;

	$scope.authorize = function() {
		sites.getSite($stateParams.site_id).success(function(site) {
			if ($rootScope.current_user) {
				if (($rootScope.current_user.role == 'admin') || (site.user.id == $rootScope.current_user.id)) {
					return;
				}
			}
			$state.go('main');
		})
	}

};


angular
	.module('app')
	.controller("SitesCtrl", SitesCtrl);