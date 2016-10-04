function PageLayoutsCtrl($scope, $uibModalInstance) {

	$scope.page = {
		name: "",
		layout_id: undefined
	};

	$scope.closePageLayoutsWindow = function() {
		$uibModalInstance.dismiss();
	};

	$scope.createPage = function(page) {
		$uibModalInstance.close(page);
	};

};

angular
	.module('app')
	.controller("PageLayoutsCtrl", PageLayoutsCtrl);