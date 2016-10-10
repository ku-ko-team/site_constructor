function PagesCtrl($scope, $rootScope, $state, $stateParams, $uibModal, pages, sites) {
	$scope.pages = pages.pages;
	$scope.page = pages.page;

	$scope.loadPage = function() {
			if (!$scope.page.html) {
				switch ($scope.page.layout_id) {
					case 1: 
						$("#workspace")[0].innerHTML = layout1;
						break;
					case 2:
						$("#workspace")[0].innerHTML = layout2;
						break;
				}
			} else {
				$("#workspace")[0].innerHTML = $scope.page.html;
			};
			prepareBlocks();
			createMenu();
	};

	var prepareBlocks = function() {
		$(".on-page").each(function() {
			$(this).draggable({
				revert: 'invalid',
				containment: 'parent'
			})
			$(this).click(function() {
				if ($(this).hasClass("chosen")) {
					$(this).removeClass("chosen");
					$(this).css({"boxShadow": 'none', transition: '0s'});
					$(this).draggable("enable");
				} else {
					$(this).addClass("chosen");
					$(this).css({"boxShadow": '0px 0px 25px 10px rgba(245,8,8,0.8)', transition: '0.3s'});
					$(this).draggable("disable");
				}
				
			})	
			$(this).css({position: 'absolute'})

		});
		$(".block").droppable({
			accept: '.move-block',
			tolerance: 'pointer',
			drop: function(event, ui) {
					var itemIsSuitableToBlock = true;
					if (!$(ui.draggable).hasClass("on-page")) {		// 1 Check if dragged item is NOT on the page
						$(this).css({position: 'relative'})
						if ($(ui.draggable).hasClass("image")) {	// 2 Check if dragged item is an image
							if ($(ui.draggable)[0].naturalHeight > $(this)[0].offsetHeight) {  							// 3 Check if image has bigger height than block, where it should be placed						
								if ($(ui.draggable)[0].naturalWidth > $(this)[0].offsetWidth) { 						// 4 Check if image also has bigger width than block, where it should be placed 
									item = $(ui.draggable)
														.clone()	//make duplicate of draggable item for allowing user to add same image more than once without reuploading it
														.addClass("on-page")	//now our image is on page
														.removeClass("image")
														.css({width: '100%', height: "auto", "maxWidth": '100%'})	// customizing width to match block, where image should be placed
														.appendTo(this);	// adding our image to page
									if (item[0].offsetHeight > $(this)[0].offsetHeight) {		// 5 Check if after chaning image width it's still has greater height than block
										item.css({height: '100%', width: "auto", "maxHeight": "100%"}); // Finally customizing image height
									}									
								} else { 																				// 4(else) If image has suitable width but not suitable height																							
									item = $(ui.draggable)
														.clone()
														.addClass("on-page")
														.removeClass("image")
														.css({height: '100%', width: "auto", "maxWidth": '100%', "maxHeight": "100%"})
														.appendTo(this);
								}
								itemIsSuitableToBlock = false;
							} else if ($(ui.draggable)[0].naturalWidth > $(this)[0].offsetWidth) {						// 3(else if) If not - check if image has bigger width than block(but height is suitable, because of 3rd IF statement)
								item = $(ui.draggable)
													.clone()
													.addClass("on-page")
													.removeClass("image")
													.css({width: "100%", height: "auto", "maxWidth": '100%', "maxHeight": "100%"})
													.appendTo(this);
								itemIsSuitableToBlock = false;
							} 
						} else {	// 2(else) If item is not the image(algorithm is the same as for the image, but here scrollbars needed sometimes)
							blockWidth = $(this)[0].offsetWidth - 10;
							blockHeight = $(this)[0].offsetHeight - 10;
							if ($(ui.draggable)[0].offsetHeight > blockHeight) {
								if ($(ui.draggable)[0].offsetWidth > blockHeight) {
									item = $(ui.draggable)
														.clone()
														.addClass("on-page")
														.css({width: blockWidth, height: blockHeight, overflow: "scroll", "overflowX": "hidden"})
														.appendTo(this);
									
								} else {
									item = $(ui.draggable)
														.clone()
														.addClass("on-page")
														.css({height: '100%', overflow: "scroll", "overflowX": "hidden"})
														.appendTo(this);
								}
								itemIsSuitableToBlock = false;
							} else if ($(ui.draggable)[0].offsetWidth > blockWidth) {
								item = $(ui.draggable)
													.clone()
													.addClass("on-page")
													.css({width: blockWidth})
													.appendTo(this);
								if (item[0].offsetHeight > blockHeight) {
									item.css({height: blockHeight, overflow: "scroll", "overflowX": "hidden"});
								}
								itemIsSuitableToBlock = false;
							}
						}

						if (itemIsSuitableToBlock == true) {  	//If all checks are successfull
							item = $(ui.draggable)						//just add item to the page without any changes
												.clone()
												.addClass("on-page")
												.removeClass("image")
												.appendTo(this);
						}

						item.css({position: 'absolute'})

						item.draggable({
							revert: 'invalid',
							containment: 'parent'
						});
						item.click(function() {
							if ($(this).hasClass("chosen")) {
								$(this).removeClass("chosen");
								$(this).css({"boxShadow": 'none', transition: '0s'});
								$(this).draggable("enable");
							} else {
								$(this).addClass("chosen");
								$(this).css({"boxShadow": '0px 0px 25px 10px rgba(245,8,8,0.8)', transition: '0.3s'});
								$(this).draggable("disable");
							}
							
						})					
					}
				}
			}
		);
	}

	$scope.configureMarkDown = function() {
		var markdownSettings = {
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

		var markdownTitle = function(markItUp, char) {
			var heading, i, j, n, ref;
				heading = '';
				n = $.trim(markItUp.selection || markItUp.placeHolder).length;
				for (i = j = 0, ref = n; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
					heading += char;
				}
				return '\n' + heading;
		};

		$('#markdown-editor').markItUp(markdownSettings);
	}

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


	createMenu = function() {
		var menu = "";
		pages.pages.forEach(function(page) {
			menu += "<div class='nav navbar-text' style='margin-bottom: 10px;'>" + 
						"<a>" + 
							page.name + 
						"</a>" +
					 "</div>";
	
		});
		$("#menu-horizontal")[0].innerHTML = menu;
		$("#menu-vertical")[0].innerHTML = menu;
	}

	$scope.addHorizontalMenu = function() {
		createMenu();
		if ($("#menu-horizontal").css("opacity") == '0') {
			$("#menu-horizontal").css({opacity: '1'});
			$("#menu-vertical").css({opacity: '0'});
		}
	}
	$scope.addVerticalMenu = function() {
		createMenu()
		if ($("#menu-vertical").css("opacity") == '0') {
			$("#menu-horizontal").css({opacity: '0'});
			$("#menu-vertical").css({opacity: '1'});
		}
	}
	$scope.removeMenu = function() {
		$("#menu-horizontal").css({opacity: '0'});
		$("#menu-vertical").css({opacity: '0'});
	}

	///////////// Hide/show borders
	$("#remove-borders-btn").mousedown(function() {
		$(".block").css({"borderWidth": '0px'});
	});

	$("#remove-borders-btn").mouseup(function() {
		$(".block").css({border: '5px dashed rgba(0,0,0,0.6)'});
	});
	/////////////

	$scope.clearMarkDownEditor = function() {
		$("#markdown-editor").val('');
		$(".move-block.thumbnail")[0].innerHTML = '';
		$("#markdown-editor-size-input").val('');
	}

	$scope.setMarkDownEditorSize = function() {
		if ($scope.markDownEditorSize <= 900) {
			$(".move-block.thumbnail").css({width: $scope.markDownEditorSize+"px", "maxWidth": $scope.markDownEditorSize+"px"})
		}
	}

	$scope.deleteElements = function() {
		$(".chosen").each(function() {
			$(this).remove();
		})
	}

	$scope.savePage = function() {
		$(".on-page").each(function() {
			$(this).css({"boxShadow": 'none', 'transitionProperty': 'none'});
		})
		pages.update({
			id: $stateParams.page_id,
			html: document.getElementById("workspace").innerHTML
		})
	};

	$scope.addImage = function() {
		pages.uploadImage($scope.previewImage).success(function(){
			$(".image").attr({src: pages.image.url})
		});
	}

	///////////// angular drag and drop lists
	$scope.changePagePosition = function(event, index, item) {
		pages.changePagePosition({
			id: item.id,
			position: index + 1
		}).success(function() {
			pages.getSitePages($stateParams.site_id);
		})
		return item;
	}
	/////////////

	$scope.pageDestroy = function(page) {
		if (confirm("Are you sure?")) {
			pages.destroy(page).success(function() {
				$scope.pages = pages.pages;
			});
		}
	}

	$scope.authorize = function() {
		var authorized = false;
		sites.getSite($stateParams.site_id).success(function(site) {
			if ($rootScope.current_user) {
				if (($rootScope.current_user.role == 'admin') || (site.user.id == $rootScope.current_user.id)) {
					site.pages.forEach(function(site_page) {
						if (site_page.id == $stateParams.page_id) {
							authorized = true;
							return;
						}
					})
				}
			}
			if (!authorized) {
				$state.go('main');
			}
		})
	}

	$scope.showPage = function() {
		pages.getPage($stateParams.page_id).success(function() {
			$scope.page = pages.page;
			document.getElementById("workspace").innerHTML = $scope.page.html;
			$(".block").css({"borderWidth": '0px'});
		});
	}

	layout1 =   "<div id='menu-horizontal' style='margin-bottom: 0; opacity: 0;' class='navbar navbar-default'></div>"+
				"<div style='display: table; width: 100%;'>" +
					"<div id='menu-vertical' style='display: table-cell; margin-bottom: 0; opacity: 0; max-width: 300px; word-wrap: break-all; vertical-align: top;' class='navbar navbar-default'></div>" +
					"<div style='display: table-cell; width: 100%; position: relative;'>" +
						"<div class='block' style='border: 5px dashed rgba(0,0,0,0.6); padding: 0; height: 300px; position: relative;'>" +
						"</div>" +
						"<div style='display: flex; flex-direction: row;'>"+
							"<div class='block' style='overflow: visible; border: 5px dashed rgba(0,0,0,0.6); height: 600px; flex: 1; padding: 0; position: relative;'>" +
							"</div>" +
							"<div class='block' style='border: 5px dashed rgba(0,0,0,0.6); height: 600px; flex: 1; padding: 0; position: relative;'>" +
							"</div>" +
							"<div class='block' style='border: 5px dashed rgba(0,0,0,0.6); height: 600px; flex: 1; padding: 0; position: relative;'>" +
							"</div>"+
						"</div>" +
					"</div>" +
				"</div>";

	layout2 =	"<div id='menu-horizontal' style='margin-bottom: 0; opacity: 0;' class='navbar navbar-default'></div>"+
				"<div style='display: table; width: 100%;'>" +
					"<div id='menu-vertical' style='display: table-cell; margin-bottom: 0; opacity: 0; max-width: 300px; word-wrap: break-all; vertical-align: top;' class='navbar navbar-default'></div>" +
					"<div style='display: table-cell; width: 100%; position: relative;'>" +
						"<div class='block' style='border: 5px dashed rgba(0,0,0,0.6); height: 250px;'>" +
						"</div>"+
						"<div style='display: flex; flex-direction: row; flex-wrap: nowrap;'>" +
							"<div class='block' style='flex: 1; border: 5px dashed rgba(0,0,0,0.6); height: 130px;'>"+
							"</div>" +
							"<div class='block' style='flex: 1; border: 5px dashed rgba(0,0,0,0.6); height: 130px;'>"+
							"</div>" +
							"<div class='block' style='flex: 1; border: 5px dashed rgba(0,0,0,0.6); height: 130px;'>"+
							"</div>" +
						"</div>"+
						"<div style='display: flex; flex-direction: row; flex-wrap: nowrap; height: 500px;'>" +
							"<div class='block' style='border: 5px dashed rgba(0,0,0,0.5); flex: 1;'>" +
							"</div>" +
							"<div class='block' style='border: 5px dashed rgba(0,0,0,0.5); flex: 3;'>" +
							"</div>" +
							"<div class='block' style='border: 5px dashed rgba(0,0,0,0.5); flex: 1;'>" +
							"</div>" +
						"</div>" +
					"</div>" +
				"</div>";
};

angular
	.module('app')
	.controller("PagesCtrl", PagesCtrl);