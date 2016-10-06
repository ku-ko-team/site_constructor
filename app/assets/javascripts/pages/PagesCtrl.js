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


	var preparePage = function() {
		$(".on-page").each(function() {
			$(this).draggable({
				revert: 'invalid'
			});
			$(this).css({position: 'absolute'});
		});
		for (i = 1; i <= 4; i++) {
			$("#block"+i).droppable({
				accept: '.move-block',
				tolerance: "fit",
				drop: function(event, ui) {
					if (!$(ui.draggable).hasClass("on-page")) {
						$(ui.draggable).clone().addClass("on-page").appendTo(this);
						$(".on-page").each(function() {
							$(this).draggable({
								revert: 'invalid'
							});
							$(this).css({position: 'absolute'});
						});
					}
				}
			});
		}

		$('#trash').droppable({
			accept: '.on-page',
			tolerance: 'pointer',
			drop: function(event, ui) {
				$(ui.draggable).remove();
			}
		})

		var markdownSettings, markdownTitle;
		markdownSettings = {
			markupSet: [
				{
					name: 'First Level Heading',
					key: '1',
					placeHolder: 'Your title here...',
					closeWith: function(markItUp) {
						return markdownTitle(markItUp, '=');
					}
      			}, {
					name: 'Second Level Heading',
					key: '2',
					placeHolder: 'Your title here...',
					closeWith: function(markItUp) {
						return markdownTitle(markItUp, '-');
					}
				}, {
					name: 'Heading 3',
					key: '3',
					openWith: '### ',
					placeHolder: 'Your title here...'
				}, {
					name: 'Heading 4',
					key: '4',
					openWith: '#### ',
					placeHolder: 'Your title here...'
				}, {
					name: 'Heading 5',
					key: '5',
					openWith: '##### ',
					placeHolder: 'Your title here...'
				}, {
					name: 'Heading 6',
					key: '6',
					openWith: '###### ',
					placeHolder: 'Your title here...'
				}, {
					separator: '---------------'
				}, {
					name: 'Quotes',
					className: 'markItUpButton markItUpButton7',
					openWith: '> '
				}, {
					separator: '---------------'
				}, {
					name: 'Bold',
					className: 'markItUpButton markItUpButton8', 
					key: 'B',
					openWith: '**',
					closeWith: '**'
				}, {
					name: 'Italic',
					className: 'markItUpButton markItUpButton9',
					key: 'I',
					openWith: '_',
					closeWith: '_'
				}, {
					separator: '---------------'
				}, {
					name: 'Bulleted List',
					className: 'markItUpButton markItUpButton11',
					openWith: '- '
				}, {
					name: 'Numeric List',
					className: 'markItUpButton markItUpButton12',
					openWith: function(markItUp) {
						return markItUp.line + '. ';
					}
				}, {
					separator: '---------------'
				}, {
					name: 'Link',
					className: 'markItUpButton markItUpButton15',
					key: 'L',
					openWith: '[',
					closeWith: ']([![Url:!:http://]!] "[![Title]!]")',
					placeHolder: 'Your text to link here...'
				}
			]
		};

		markdownTitle = function(markItUp, char) {
			var heading, i, j, n, ref;
				heading = '';
				n = $.trim(markItUp.selection || markItUp.placeHolder).length;
				for (i = j = 0, ref = n; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
					heading += char;
				}
				return '\n' + heading;
		};

		$('#text-block-input').markItUp(markdownSettings);
	}

	$scope.getPage = function() {
		pages.getPage($stateParams.page_id).success(function() {
			$scope.page = pages.page;
			if (!$scope.page.html) {
				switch ($scope.page.layout_id) {
					case 1: 
						document.getElementById("workspace").innerHTML = layout1;
						preparePage();
						break;
					case 2:
						document.getElementById("workspace").innerHTML = "<div style='border: 10px dashed rgba(0,0,0,0.6);'><br><br><br><br><br><br></div><div style='display: flex; flex-direction: row; flex-wrap: nowrap;'><div style='flex: 1; border-right: 10px dashed rgba(0,0,0,0.6); border-left: 10px dashed rgba(0,0,0,0.6);'><br><br><br><br></div><div style='flex: 1; border-right: 10px dashed rgba(0,0,0,0.6);'><br><br><br><br></div><div style='flex: 1; border-right: 10px dashed rgba(0,0,0,0.6);'><br><br><br><br></div><div style='flex: 1; border-right: 10px dashed rgba(0,0,0,0.6);'><br><br><br><br></div></div><div style='display: flex; flex-direction: row; flex-wrap: nowrap;'><div style='border: 10px dashed rgba(0,0,0,0.5); border-right: 0; flex: 1;'><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div style='border: 10px dashed rgba(0,0,0,0.5); flex: 3;'><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div style='border: 10px dashed rgba(0,0,0,0.5); border-left: 0; flex: 1;'><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div></div>";
					break;
				}
			} else {
				document.getElementById("workspace").innerHTML = $scope.page.html;
				preparePage();
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




	layout1 =  "<div id='block1' style='border: 10px dashed rgba(0,0,0,0.6); padding: 0; height: 300px;'>" +
				"</div>" +
				"<div style='display: flex; flex-direction: row;'>"+
					"<div id='block2' style='border: 10px dashed rgba(0,0,0,0.6); border-top: 0; height: 600px; flex: 1;'>" +
					"</div>" +
					"<div id='block3' style='border-bottom: 10px dashed rgba(0,0,0,0.6); height: 600px; flex: 1'>" +
					"</div>" +
					"<div id='block4' style='border: 10px dashed rgba(0,0,0,0.6); border-top: 0; height: 600px; flex: 1'>" +
					"</div>"+
				"</div>";

	$scope.clearTextArea = function() {
		$("#text-block-input").val('');
		$(".text-block").children(".move-block.thumbnail")[0].innerHTML = '';
		$("#text-block-size-input").val('');
	}

	$scope.setBlockSize = function() {
		if ($scope.textBlockSize <= 900) {
			$(".text-block").children(".move-block.thumbnail").css({width: $scope.textBlockSize+"px", "maxWidth": $scope.textBlockSize+"px"})
		}
	}
};

angular
	.module('app')
	.controller("PagesCtrl", PagesCtrl);