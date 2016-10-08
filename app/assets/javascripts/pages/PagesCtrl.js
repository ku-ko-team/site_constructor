function PagesCtrl($scope, $rootScope, $state, $stateParams, $uibModal, pages, sites) {
	var clicks = 1;

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
			$("#menu-vertical")[0].innerHTML += "<div class='nav navbar-text' style='margin-bottom: 10px;'>" + 
														"<a>" + 
															page.name + 
														"</a>" +
												   "</div>";
			$("#menu-horizontal")[0].innerHTML += "<div class='nav navbar-text'>" + 
														"<a>" + 
															page.name + 
														"</a>" +
												   "</div>";
		});
	};

	$scope.getSitePages = function() {
		pages.getSitePages($stateParams.site_id).success(function() {
			$scope.pages = pages.pages;
		});
	};

	var prepareBlocks = function() {
		$(".on-page").each(function() {
			$(this).draggable({
				revert: 'invalid',
				containment: 'parent',
				stop: function(event) {
						$(".on-page").each(function() {
							$(this).click(function(event) {
								event.stopPropagation();
								if (clicks == 1) {
									$(this).addClass("chosen");
									$(this).css({"boxShadow": '0px 0px 25px 10px rgba(245,8,8,0.8)', transition: '0.3s'});
									$(this).draggable("disable")
									clicks = 2;
								}  else {
									$(this).removeClass("chosen");
									$(this).css({"boxShadow": 'none', 'transitionProperty': 'none'});
									$(this).draggable("enable")
									clicks = 1;
								}
							})
						})
					}
			}).click(function(event) {
				event.stopPropagation();
				if (clicks == 1) {
					$(this).addClass("chosen");
					$(this).css({"boxShadow": '0px 0px 25px 10px rgba(245,8,8,0.8)', transition: '0.3s'});
					$(this).draggable("disable")
					clicks = 2;
				}  else {
					$(this).removeClass("chosen");
					$(this).css({"boxShadow": 'none', 'transitionProperty': 'none'});
					$(this).draggable("enable")
					clicks = 1;
				}
			})
			$(this).css({position: 'absolute'})
		});
		$(".block").droppable({
			accept: '.move-block',
			tolerance: 'pointer',
			drop: function(event, ui) {
					var check = true;
					if (!$(ui.draggable).hasClass("on-page")) {

						if ($(ui.draggable)[0].offsetHeight > $(this)[0].offsetHeight) {
							if ($(ui.draggable)[0].offsetWidth > $(this)[0].offsetWidth) {
								$(ui.draggable).clone().addClass("on-page").css({width : '99%', height: $(this)[0].offsetHeight - 10}).appendTo(this);
								check = false;
							} else {
								$(ui.draggable).clone().addClass("on-page").css({height : '99%'}).appendTo(this);
								check = false;
							}
						} else if ($(ui.draggable)[0].offsetWidth > $(this)[0].offsetWidth) {
							$(ui.draggable).clone().addClass("on-page").css({width : '99%', height: $(this)[0].offsetHeight - 10}).appendTo(this);
							check = false;
						}
						
				
						if ($(ui.draggable)[0].naturalWidth > $(this)[0].offsetWidth) {
							if ($(ui.draggable)[0].naturalHeight > $(this)[0].offsetHeight) {
								$(ui.draggable).clone().addClass("on-page").css({width: $(this)[0].offsetWidth - 10, height: $(this)[0].offsetHeight - 10}).appendTo(this);
								check = false;
							} else {
								console.log("width")
								$(ui.draggable).clone().addClass("on-page").css({width: '99%'}).appendTo(this);
								check = false;
							}
						} else if ($(ui.draggable)[0].naturalHeight > $(this)[0].offsetHeight) {
							console.log("height")
							$(ui.draggable).clone().addClass("on-page").css({height: $(this)[0].offsetHeight - 10}).appendTo(this);
							check = false;
						} 
						if (check == true) {
							$(ui.draggable).clone().addClass("on-page").appendTo(this);
						}
					}
					$(".on-page").each(function() {
						$(this).draggable({
							revert: 'invalid',
							containment: 'parent'
						}).click(function() {
							event.stopPropagation();
							if (clicks == 1) {
								$(this).addClass("chosen");
								$(this).css({"boxShadow": '0px 0px 25px 10px rgba(245,8,8,0.8)', transition: '0.3s'});
								$(this).draggable("disable");
								clicks = 2;
							}  else {
								$(this).removeClass("chosen");
								$(this).css({"boxShadow": 'none', 'transitionProperty': 'none'});
								$(this).draggable("enable")
								clicks = 1;
							}
						});
						$(this).css({position: 'absolute'});
					});
				}
			}
		);
	}

	var preparePage = function() {
		prepareBlocks();

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
						document.getElementById("workspace").innerHTML = layout2;
						preparePage();
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
		$(".on-page").each(function() {
			$(this).css({"boxShadow": 'none', 'transitionProperty': 'none'});
		})
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




	layout1 =   "<div id='menu-horizontal' style='margin-bottom: 0; display: none;' class='navbar navbar-default'></div>"+
				"<div style='display: table; width: 100%;'>" +
					"<div id='menu-vertical' style='margin-bottom: 0; display: none; max-width: 300px; word-wrap: break-all; vertical-align: top;' class='navbar navbar-default'></div>" +
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

	layout2 =	"<div id='menu-horizontal' style='margin-bottom: 0; display: none;' class='navbar navbar-default'></div>"+
				"<div style='display: table; width: 100%;'>" +
					"<div id='menu-vertical' style='margin-bottom: 0; display: none; max-width: 300px; word-wrap: break-all; vertical-align: top;' class='navbar navbar-default'></div>" +
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


	convertPagesToHTML = function() {
		var pages = "";
		$scope.pages.forEach(function(page) {
			if ($("#menu-vertical").css("display") == 'none') {
				pages += "<div class='nav navbar-text' style='margin-bottom: 10px;'>" + 
							"<a>" + 
								page.name + 
							"</a>" +
						 "</div>";
			} else {
				pages += "<div class='nav navbar-text'>" + 
							"<a>" + 
								page.name + 
							"</a>" +
						 "</div>";
			}
		});
		return pages;
	}

	$scope.addHorizontalMenu = function() {
		if ($("#menu-horizontal").css("display") == 'none') {
			$("#menu-horizontal")[0].innerHTML = convertPagesToHTML();
			$("#menu-horizontal").css({display: ''});
			$("#menu-vertical").css({display: 'none'});
		}
	}
	$scope.addVerticalMenu = function() {
		if ($("#menu-vertical").css("display") == 'none') {
			$("#menu-vertical")[0].innerHTML = convertPagesToHTML();
			$("#menu-horizontal").css({display: 'none'});
			$("#menu-vertical").css({display: 'table-cell'});
		}
	}
	$scope.removeMenu = function() {
		$("#menu-horizontal").css({display: 'none'});
		$("#menu-vertical").css({display: 'none'});
	}

	$("#remove-borders-btn").mousedown(function() {
		$(".block").css({"borderWidth": '0px'});
	});

	$("#remove-borders-btn").mouseup(function() {
		$(".block").css({border: '5px dashed rgba(0,0,0,0.6)'});
		$(".dividable").css({border: ''});
	});


	$scope.showPage = function() {
		pages.getPage($stateParams.page_id).success(function() {
			$scope.page = pages.page;
			document.getElementById("workspace").innerHTML = $scope.page.html;
			$(".block").css({"borderWidth": '0px'});
		});
	}

	$scope.deleteElements = function() {
		$(".chosen").each(function() {
			$(this).remove();
		})
	}
};

angular
	.module('app')
	.controller("PagesCtrl", PagesCtrl);