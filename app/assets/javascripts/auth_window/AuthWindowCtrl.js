function AuthWindowCtrl($scope, $rootScope, $uibModalInstance, Auth, selectedAction) {

	switch (selectedAction) {
		case "Log In":
			$scope.loginAction = true;
			$scope.registerAction = false;
			break;
		case "Register":
			$scope.loginAction = false;
			$scope.registerAction = true;
			break;
	};

	$scope.login = function() {
		Auth.login($scope.user).then(function() {
			$uibModalInstance.close();
		});
	};

	$scope.register = function() {
		Auth.register($scope.user).then(function() {
			$uibModalInstance.close();
		});
	};

	$rootScope.$on('devise:new-registration', function(e, user) {
		$rootScope.current_user = user;
	});

	$rootScope.$on('devise:login', function(e, user) {
		$rootScope.current_user = user;
	});

	$scope.closeAuthWindow = function() {
		$uibModalInstance.dismiss();
	};

};

angular
	.module('app')
	.controller('AuthWindowCtrl', AuthWindowCtrl);