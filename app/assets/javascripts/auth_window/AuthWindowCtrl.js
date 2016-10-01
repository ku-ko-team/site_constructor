function AuthWindowCtrl($scope, $uibModalInstance, selectedAction, Auth, $rootScope) {

	if (selectedAction == 'Log In') {
		$scope.loginAction = true;
		$scope.registerAction = false;
	} else if (selectedAction == 'Register') {
		$scope.loginAction = false;
		$scope.registerAction = true;
	}

	$scope.login = function() {
		Auth.login($scope.user).then(function() {
			$uibModalInstance.close();
		})
	}

	$scope.register = function() {
		Auth.register($scope.user).then(function() {
			$uibModalInstance.close();
		})
	}

	$rootScope.$on('devise:new-registration', function(e, user) {
		$rootScope.current_user = user;
	})

	$rootScope.$on('devise:login', function(e, user) {
		$rootScope.current_user = user;
	})

	$scope.closeAuthWindow = function() {
		$uibModalInstance.close();
	}

}

angular
	.module('app')
	.controller('AuthWindowCtrl', AuthWindowCtrl)