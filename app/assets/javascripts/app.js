angular
	.module('app', ['ui.router', 'templates', 'ngAnimate', 'ui.bootstrap', 'Devise'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider

			.state('main', {
				url: '/main',
				templateUrl: 'main/_main.html',
				controller: 'MainCtrl'
			})

			.state('newSite', {
				url: '/sites/new',
				templateUrl: 'sites/_siteNew.html',
				controller: 'SitesCtrl'
			});

		$urlRouterProvider.otherwise('main');

	}])