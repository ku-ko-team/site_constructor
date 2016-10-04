function PagesCtrl($scope, $rootScope, $state, $stateParams, $uibModal, pages, sites) {

	$scope.openPageLayoutsWindow = function() {
		$uibModal.open({
			animation: true,
			templateUrl: 'pages/_pageLayouts.html',
			controller: 'PageLayoutsCtrl',
			size: 'lg'
		}).result.then(function(page) {
			pages.create({
				name: page.name,
				layout_id: page.layout_id,
				site_id: $stateParams.site_id
			});
		});
	};

	$scope.getSitePages = function() {
		pages.getSitePages($stateParams.site_id).success(function() {
			$scope.pages = pages.pages;
		});
	};

	$scope.getPage = function() {
		pages.getPage($stateParams.page_id).success(function() {
			$scope.page = pages.page;
			if (!$scope.page.html) {
				switch ($scope.page.layout_id) {
					case 1: 
						document.getElementById("workspace").innerHTML = layout1;
						$("#block1").droppable({
							drop: function(event, ui) {
								$(this).append($(ui.draggable).clone());
							}
						});
						break;
					case 2:
						document.getElementById("workspace").innerHTML = "<div style='border: 10px dashed rgba(0,0,0,0.6);'><br><br><br><br><br><br></div><div style='display: flex; flex-direction: row; flex-wrap: nowrap;'><div style='flex: 1; border-right: 10px dashed rgba(0,0,0,0.6); border-left: 10px dashed rgba(0,0,0,0.6);'><br><br><br><br></div><div style='flex: 1; border-right: 10px dashed rgba(0,0,0,0.6);'><br><br><br><br></div><div style='flex: 1; border-right: 10px dashed rgba(0,0,0,0.6);'><br><br><br><br></div><div style='flex: 1; border-right: 10px dashed rgba(0,0,0,0.6);'><br><br><br><br></div></div><div style='display: flex; flex-direction: row; flex-wrap: nowrap;'><div style='border: 10px dashed rgba(0,0,0,0.5); border-right: 0; flex: 1;'><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div style='border: 10px dashed rgba(0,0,0,0.5); flex: 3;'><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div style='border: 10px dashed rgba(0,0,0,0.5); border-left: 0; flex: 1;'><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div></div>";
					break;
				}
			} else {
				document.getElementById("workspace").innerHTML = $scope.page.html;
				$("#block1").droppable({
					drop: function(event, ui) {
						$(this).append($(ui.draggable).clone());
					}
				});
			};
		});
		return true;
	};

	$scope.savePage = function() {
		pages.update({
			id: $stateParams.page_id,
			html: document.getElementById("workspace").innerHTML
		});
	};

	$scope.dropCallback = function(event, index, item) {
		pages.changePagePosition({
			id: item.id,
			position: index + 1
		}).success(function() {
			pages.getSitePages($stateParams.site_id);
		})
		return item;
	}




	layout1 =  "<div id='block1' style='border: 10px dashed rgba(0,0,0,0.6); height: 300px;'>" +
				"</div>" +
				"<div style='border: 10px dashed rgba(0,0,0,0.6); border-top: 0; display: flex; flex-direction: row; flex-wrap: nowrap;'>" +
					"<div style='border-right: 10px dashed rgba(0,0,0,0.6); flex: 1;'>" +
						"<br><br><br><br><br><br><br><br><br><br><br><br><br><br>" +
					"</div>" +
					"<div style='border-right: 10px dashed rgba(0,0,0,0.6); flex: 1;'>" +
						"<br><br><br><br><br><br><br><br><br><br><br><br><br><br>" +
					"</div>" +
					"<div style='flex: 1;'>" +
						"<br><br><br><br><br><br><br><br><br><br><br><br><br><br>" +
					"</div>" +
				"</div>";
};

angular
	.module('app')
	.controller("PagesCtrl", PagesCtrl);