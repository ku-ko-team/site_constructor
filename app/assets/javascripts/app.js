angular
	.module('app', ['ui.router', 'templates', 'ngAnimate', 'ui.bootstrap', 'Devise', 'dndLists', 'ngDragDrop', 'ngSanitize', 'btford.markdown', 'bootstrap.fileField'])
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
			})


			.state('siteShow', {
				url: '/sites/:site_id',
				templateUrl: 'sites/_siteShow.html',
				controller: 'SitesCtrl',
				resolve: {
					sitesPromise: ['sites', '$stateParams', function(sites, $stateParams) {
						return sites.getSite($stateParams.site_id);
					}]
				}
			})

			.state('siteShow.pageShow', {
				url: '^/sites/:site_id/pages/:page_id',
				templateUrl: 'pages/_pageShow.html',
				controller: 'PagesCtrl'
			});

		$urlRouterProvider.otherwise('main');

	}])