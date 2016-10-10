function MainCtrl($scope, $rootScope, $state, sites, Auth) {

	$scope.sites = sites.sites;

	$scope.signedIn = Auth.isAuthenticated;

	$scope.createSite = function() {
		sites.create({
			name: $scope.name
		}).success(function() {
			$state.go('siteEdit', {site_id: sites.sites[sites.sites.length-1].id});
		});
	};

	$scope.showEditLink = function(site) {
		if ($rootScope.current_user) {
			if (($rootScope.current_user.role == 'admin') || (site.user.id == $rootScope.current_user.id)) {
				return true;
			} else {
				return false;
			}
		}
		return false;
	}

	$scope.siteDestroy = function(site) {
		if (confirm("Are you sure?")) {
			sites.destroy(site).success(function() {
				$scope.sites = sites.sites;
			});
		}
	}

};

angular
	.module('app')
	.controller('MainCtrl', MainCtrl);