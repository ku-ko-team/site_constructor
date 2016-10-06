angular
	.module('app', ['ui.router', 'templates', 'ngAnimate', 'ui.bootstrap', 'Devise', 'dndLists', 'ngDragDrop', 'ngSanitize', 'btford.markdown'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider

			.state('main', {
				url: '/main',
				templateUrl: 'main/_main.html',
				controller: 'MainCtrl',
				resolve: {
					sitesPromise: ['sites', function(sites) {
						return sites.getAll();
					}]
				}
			})

			.state('siteEdit', {
				url: '/sites/:site_id/edit',
				templateUrl: 'sites/_siteEdit.html',
				controller: 'SitesCtrl'
			})

			.state('siteEdit.pageEdit', {
				url: '^/sites/:site_id/pages/:page_id/edit',
				templateUrl: 'pages/_pageEdit.html',
				controller: 'PagesCtrl'
			});

		$urlRouterProvider.otherwise('main');

	}])