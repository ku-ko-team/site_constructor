function NavbarCtrl($scope, $rootScope, $uibModal, Auth) {

	$scope.signedIn = Auth.isAuthenticated;

	$scope.authWindowOpen = function() {
		$uibModal.open({
			animation: true,
			templateUrl: 'auth_window/_authWindow.html',
			controller: 'AuthWindowCtrl',
			size: 'sm',
			resolve: {
				selectedAction: function() {
					return $scope.selectedAction;
				}
			}
		});
	};

	Auth.currentUser().then(function(user) {
		$rootScope.current_user = user;
	});

	$scope.logout = Auth.logout;

	$rootScope.$on('devise:logout', function (e, user){
		$rootScope.current_user = {};
	});
	
}

angular
	.module('app')
	.controller('NavbarCtrl', NavbarCtrl);