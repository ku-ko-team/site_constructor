function SitesCtrl($scope, $rootScope, $state, $stateParams, $uibModal, sites) {
	$scope.site = sites.site;
};


angular
	.module('app')
	.controller("SitesCtrl", SitesCtrl);