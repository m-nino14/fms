
(function($) {
	$.fn.extend({
		getClassProp: function(prefix) {
			prefix = prefix || "js_prop_";
			var prop = {};
			var $target = $(this[0]);
			if (!$target.attr("class")) {
				return prop;
			}
			var classAry = $target.attr("class").split(" ");
			var i;
			for (i = 0; i < classAry.length; i++) {
				if (classAry[i].indexOf(prefix) >= 0) {
					var reg = new RegExp(prefix + "(.+)-(.+)");
					var matchResult = classAry[i].match(reg);
					prop[matchResult[1]] = matchResult[2];
				}
			}
			return prop;
		},
		afterSep: function(tagStr, addClassStr) {
			tagStr = tagStr || "div";
			addClassStr = addClassStr || "last";
			this.each(function() {
				$(this).addClass(addClassStr).after("<" + tagStr + " class='separate'> </" + tagStr + ">").next().css({
					clear: "both",
					height: "1px",
					overflow: "hidden",
					display: "block",
					width: "auto",
					border: "none",
					background: "none",
					"float": "none",
					lineHeight: "1px",
					margin: "0",
					padding: "0",
					fontSize: "1px"
				});
			});
			return this;
		}
	});
})(jQuery);

var commonJs = {};
var responseFlag;

$(function() {
	commonJs.loadInit();
});

commonJs.loadInit = function() {
	
	responseFlag = commonJs.responseFlag();
	
	commonJs.naviSetting();
	commonJs.pagetopShow();
	commonJs.setPageSns();
	/*
	$("a").focus(function() {
		this.blur();
	});
	*/
	if(uaInfo.oldIe && uaInfo.ieVr == 8) {
		$(".js_css3, #headsearch, .product-sub-nav a, .product-sub-nav span").each(function(index, element) {
			PIE.attach(this);
		});
	}

	//アンカースクロール
	$("a[href^='#']").click(function(e) {
		e.preventDefault();
		commonJs.ancScr($($(this).attr("href")));
	});
	
	
	//class="js_wrap-line js_prop_num-3"
	$(".js_wrap-line").each(function(index, element) {
		var num = $(this).getClassProp().num;
		commonJs.wrapNum({
			$parent      : $(this),
			itemSelector : ".item",
			wrapTagStr   : '<div class="item-line cf"></div>',
			num          : num
		});
	});
	
	//class="js_after-sep js_prop_num-3"
	$("ul.js_after-sep").each(function(index, element) {
		var num = $(this).getClassProp().num || 3;
		$(this).find("li:nth-child(" + num + "n)").afterSep("li");
	});
	
	if($("html").hasClass("is_mouse")) {
		$(".js_link-sp-only a").click(function(e) {
			e.preventDefault();
		});
	}
	
}


commonJs.responseFlag = function() {
	var that = {};
	var $flagElm = $('<div id="response-flag"> </div>');

	$("body").prepend($flagElm);
	
	var funcAry = [];
	var flag;

	that.init = function() {
		setInterval(function() {
			that.responseCheck();
		}, 500);
		that.responseCheck();
	};

	that.responseCheck = function() {
		var tmpFlag = flag;
		if ($("#response-flag").is(":visible")) {
			$("html").addClass("js_is-pc");
			$("html").removeClass("js_is-sp");
			flag = true;
		} else {
			$("html").removeClass("js_is-pc");
			$("html").addClass("js_is-sp");
			flag = false;
		}
		if(tmpFlag != flag) {
			that.changeAction();
		}
	}
	
	that.changeAction = function() {
		$.each(funcAry,function(idx) {
			funcAry[idx]();
		});
	};
	
	that.addFunc = function(func) {
		funcAry.push(func);
	};
	
	that.init();
	return that;
};


/*===========================================================================
↓ナビの設定↓
===========================================================================*/
commonJs.naviSetting = function() {
	var that = {};
	var $win = $(window);
	var $gnavOl = $('<div id="js_g-ol"> </div>');
	
	var $pcHeaderNavWrap = $("header .pc-fix-nav-wrap");
	var $pcHeaderNavFix = $("header .pc-fix-nav");
	
	var init = function() {
		$("body").append($gnavOl);
		$("header .hd-line").append($("header .gnav").clone());
		
		$win.on("scroll resize",function() {
			winScr();
		}).trigger("scroll");
		
		//SP版グローバルナビ
		$("#hd-nav-btn").click(function() {
			boxFlex($(this),$("header .hd-line .gnav"),true);
		});
		$gnavOl.click(function() {
			boxFlex($("#hd-nav-btn"),$("header .hd-line .gnav"),true);
		});
		
		//SP版用フッターナビ
		$("footer .ft-nav-list dl").each(function(index, element) {
			var $btn = $(this).find("dt");
			var $flex = $(this).find("dd");
			$btn.click(function() {
				boxFlex($btn,$flex);
			});
		});
		
		//SP版用製品ナビ
		$(".product-nav .product-nav-open").click(function() {
			boxFlex($(this),$(".product-nav .product-nav-flex"));
		});
	};
	
	var winScr = function() {
		//PC版用ヘッダーの固定
		$pcHeaderNavWrap.height($pcHeaderNavFix.height());
		var winTop = $win.scrollTop();
		var offsetTop = $pcHeaderNavWrap.offset().top;
		if(winTop >= offsetTop) {
			$pcHeaderNavFix.addClass("js_fix");
			$pcHeaderNavFix.css("left",-$win.scrollLeft());
		}else {
			$pcHeaderNavFix.removeClass("js_fix");
			$pcHeaderNavFix.css("left",0);
		}
		
		if(uaInfo.interface == "touch") {
			//ピンチズーム時に固定解除
			if(window.innerWidth != $(window).innerWidth()) {
				$pcHeaderNavFix.addClass("js_pinch-zoom");
				$("header .sp-fix-nav").addClass("js_pinch-zoom");
			}else {
				$("header .sp-fix-nav").removeClass("js_pinch-zoom");
			}
		}
	};
	
	
	
	var boxFlex = function($btn, $box, isGlobal) {
		var $this = $btn;
		var openClass = "js_open";
		var speed = 600;
		var easing = "easeOutQuart";
		var $flex = $box;
		$flex.stop();
		
		if($this.hasClass(openClass)) {
			$this.removeClass(openClass);
			$flex.animate({
				height: 0
			}, speed, easing);
			if(isGlobal) {
				$gnavOl.stop();
				$gnavOl.fadeTo(speed,0,function() {
					$gnavOl.css("display","none");
					});
			}
		}else {
			$this.addClass(openClass)
			var tmpH = $flex.height();
			$flex.css("height","auto");
			var toH = $flex.height();
			$flex.css("height",tmpH);
			$flex.animate({
				height: toH
			}, speed, easing, function() {
				$flex.css("height","auto");
			});
			if(isGlobal) {
				$gnavOl.stop();
				if(!$gnavOl.is(":visible")) {
					$gnavOl.css({
						display : "block",
						opacity : 0
					});
				}
				$gnavOl.fadeTo(speed,0.8);
			}
		}
	};
	
	var WW = $(window).width();
	
	if(WW > 750){
		$('.nav-col-wrap li').hover(function(){
			$(this).children('dl').show();
		},function(){
			$(this).children('dl').hide();
		});
		$('.nav-col-wrap li dd').hover(function(){
			$(this).children('dl').show();
		},function(){
			$(this).children('dl').hide();
		});
	}else{
		$('.nav-col-wrap li.sub a.head').click(function(){
			$(this).parent().parent().children('dl').slideToggle();
			$(this).parent().parent().toggleClass('active');
		});
		$('.nav-col-wrap li.sub dd').click(function(){
			$(this).parent('dl').show();
			$(this).children('dl').slideToggle();
			$(this).toggleClass('active');
		});
	}
	
	init();
	return that;
};


/*===========================================================================
↓スクロール移動↓
===========================================================================*/
commonJs.ancScr = function($ancTarget) {
	var position;
	var speed = 1200;
	var easing = "easeOutExpo";

	if (!$ancTarget.length) {
		return false;
	}

	position = $ancTarget.offset().top;

	$('body, html').stop().animate({
		scrollTop: position
	}, speed, easing);
};



/*===========================================================================
↓ページトップ↓
===========================================================================*/
commonJs.pagetopShow = function() {
	var that = {};
	var $win = $(window);
	var $pagetop = $("footer .ft-pagetop .pagetop");
	var showPt = 300;
	var speed = 500;
	var showClass = "js_show";
	
	var init = function() {
		$win.on("scroll resize",function() {
			winScr();
		}).trigger("scroll");
	};
	
	var winScr = function() {
		if($win.scrollTop() >= showPt) {
			if(!$pagetop.hasClass(showClass)) {
				$pagetop.addClass(showClass);
				$pagetop.stop();
				if(!uaInfo.oldIe) {
					if(!$pagetop.is(":visible")) {
						$pagetop.css({
							display : "block",
							opacity : 0
						});
					}
					$pagetop.fadeTo(speed,1);
				}else {
					$pagetop.animate({
						marginRight : 0
					},speed, "easeOutExpo");
				}
			}
		}else {
			if($pagetop.hasClass(showClass)) {
				$pagetop.removeClass(showClass);
				$pagetop.stop();
				if(!uaInfo.oldIe) {
					$pagetop.fadeTo(speed,0,function(){
						$pagetop.css("display","none");
					});
				}else {
					$pagetop.animate({
						marginRight : -65
					},speed, "easeOutExpo");
				}
			}
		}
	};
	
	init();
	return that;
};


//シェアボタンのリンク設定
commonJs.setPageSns = function() {
	var that = {};
	var $snsBtns;
	
	var init = function() {
		if(!$(".page-sns").length || !"shareUrl" in window || !"shareText" in window) {
			return false;
		};
		$snsBtns = $(".page-sns");
		
		//twitter
		var twHref = "https://twitter.com/share?url=" + encodeURI(shareUrl) + "&text=" + encodeURI(shareText) + "&hashtags=fujitsu_m";
		
		//facebook
		var fbHref = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURI(shareUrl);
		
		//google+
		var glHref = "https://plus.google.com/share?url=" + encodeURI(shareUrl);
		
		//line
		var lnHref = "http://line.me/R/msg/text/?" + encodeURI(shareText) + "%0d%0a" + encodeURI(shareUrl);
		
		
		$snsBtns.find(".btn-tw a").attr("href", twHref);
		$snsBtns.find(".btn-fb a").attr("href", fbHref);
		$snsBtns.find(".btn-gl a").attr("href", glHref);
		$snsBtns.find(".btn-ln a").attr("href", lnHref);
		
	};
	
	init();
	return that;
};


//要素を指定のタグで囲む
commonJs.wrapNum = function(paramObj) {
	var that = {};
	var param = paramObj || {};
	var $parent = param.$parent;
	var itemSelector = param.itemSelector;
	var wrapTagStr = param.wrapTagStr;
	var num = param.num;
	var $items = $parent.find(itemSelector);
	var $tmpWrap;
	
	var init = function() {
		$items.each(function(index, element) {
			if(index%num == 0) {
				$tmpWrap = $(wrapTagStr);
				$parent.append($tmpWrap);
				$(this).addClass("first-item");
			}
			$tmpWrap.append($(this));
		});
	};
	
	init();
};


//要素の高さを揃える
commonJs.sameHeight = function($target) {
	$target.css("height","auto");
	if($target.length > 1) {
		var maxH = 0;
		$target.each(function(index, element) {
			if(maxH < $(this).height()) {
				maxH = $(this).height();
			}
		});
		$target.height(maxH);
	}
};


//要素を数毎に高さを揃える
commonJs.sameHeightNum = function($target, num) {
	var tmpArySet = [];
	var $tmpSet = null;
	$target.each(function(index, element) {
		if(index%num == 0) {
			if($tmpSet) {
				tmpArySet.push($tmpSet);
			}
			$tmpSet = $(element);
		}else {
			$tmpSet = $tmpSet.add($(element));
		}
	});
	tmpArySet.push($tmpSet);	
	
	for(var i = 0, len = tmpArySet.length; i < len; i++ ) {
		commonJs.sameHeight(tmpArySet[i]);
	}
};
