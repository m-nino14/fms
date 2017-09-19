var phoneJs = {};

$(function() {
	phoneJs.init();
	phoneJs.spFixInfoTtl();
});

phoneJs.init = function() {
	var that = {};
	var $win = $(window);
	
	var tmpWinW = $win.width();
	
	var init = function() {
		
		$(".item-list .item").each(function(index, element) {
			$(".item-list ul").append($(this));
		});
		
		$(".main-slide .slide .item").each(function(index, element) {
			var pcPass = $(this).find("img").attr("data-pc");
			$(this).css("background-image","url(" + pcPass + ")");
		});
		scFlickSlider($(".main-slide .slide"),{
			autoPlay: true,
			waitTime: 6000,
			speed   : 800,
			easing  : "easeOutQuart"
		});
		
		pickupListSet();
		
		setInterval(function(){
			if(tmpWinW != $win.width()) {
				sameHeight();
				tmpWinW = $win.width();
			}
		}, 1000);
		sameHeight();
		
		
		setInterval(function(){
			if($("html").hasClass("js_is-sp")) {
				spSlideArwH();
			}
		},1000);
	};
	
	
	var pickupListSet = function() {
		var $wrap = $(".pickup-list-wrap");
		
		$wrap.find(".sp-slide .slider").append($wrap.find(".pc-bnr-list .item").clone());
		scFlickSlider($wrap.find(".sp-slide .slide"),{
			autoPlay: true,
			waitTime: 6000,
			speed   : 800,
			easing  : "easeOutQuart"
		});
		
		var $lineWrap = $(".item-line-wrap");
		var speed = 800;
		var easing = "easeOutExpo";
		
		$lineWrap.find(".item-line:gt(0)").appendTo($lineWrap.find(".item-hide"));
		if($lineWrap.find(".item-hide").find(".item-line").length) {
			$lineWrap.find(".item-show").click(function() {
				var $hideCts = $lineWrap.find(".item-hide");
				$hideCts.css("height","auto");
				var toH = $hideCts.height();
				$hideCts.css("height",0);
				$hideCts.animate({
					height: toH
				}, speed, easing, function(){
					$hideCts.css("height","auto");
				});
				$lineWrap.find(".item-show").animate({
					height: 0,
					padding: 0,
					opacity: 0,
					margin: 0
				}, speed, easing, function(){
					$lineWrap.find(".item-show").css("display","none");
				});
			});
		}else {
			$lineWrap.find(".item-show").css("display","none");
		}
	};
	
	
	//要素の高さを揃える
	var sameHeight = function() {
		if($("html").hasClass("js_is-pc")) {
			commonJs.sameHeightNum($(".new-mobile-col .item-list li .cat span"), 6);
			commonJs.sameHeightNum($(".new-mobile-col .item-list li .name"), 6);
			commonJs.sameHeightNum($(".pickup-col .pc-bnr-list .item .txt-col"), 3);
		}else {
			commonJs.sameHeight($(".new-mobile-col .item-list li .cat span"));
			commonJs.sameHeight($(".new-mobile-col .item-list li .name"));
			commonJs.sameHeightNum($(".pickup-col .item-line-wrap .item .txt-col"), 2);
		}
	};
	
	
	//sp用スライドのナビの位置を調整
	var spSlideArwH = function() {
		var $slide = $(".sp-slide");
		var $arw = $slide.find(".next, .prev");
		var $icn = $slide.find(".icn-nav");
		var bnrH = $slide.find(".bnr").height();
		$arw.css('top', bnrH / 2);
		$icn.css("top", bnrH)
	};
	
	init();
	return that;
};


phoneJs.spFixInfoTtl = function() {
	var that = {};
	var $win = $(window);
	var $fixInfoTtl;
	
	var flagObjAry = [{
			$elm: $(".new-mobile-col"),
			text: "最新機種"
		},{
			$elm: $(".pickup-col"),
			text: "ピックアップ"
		},{
			$elm: $(".news-col"),
			text: "お知らせ"
		}];
		
	var flagOffset = 106;
	
	var init = function() {
		$fixInfoTtl = $('<div class="sp-fix-info-ttl"><p></p></div>');
		$(".sp-fix-nav").append($fixInfoTtl);
		
		$win.resize(function(){
			winResize();
		}).scroll(function(){
			winScroll();
		}).trigger("resize");
	};
	
	var winScroll = function() {
		var winTop = $win.scrollTop();
		
		var tmpOffset = 0;
		for(var i = 0,len = flagObjAry.length; i < len; i++) {
			var $target = flagObjAry[i].$elm;
			var tgtTop = $target.offset().top;
			if(tmpOffset == 0) {
				tmpOffset = tgtTop;
				if($win.scrollTop() >= tmpOffset - flagOffset) {
					if(!$fixInfoTtl.hasClass("js_show")) {
						$fixInfoTtl.addClass("js_show");
						$fixInfoTtl.stop().animate({
							marginTop: 0
						}, 500, "easeOutCubic");
					}
				}else {
					if($fixInfoTtl.hasClass("js_show")) {
						$fixInfoTtl.removeClass("js_show");
						$fixInfoTtl.stop().animate({
							marginTop: -$fixInfoTtl.outerHeight()
						}, 500, "easeOutCubic");
					}
				}
			}
			
			if($win.scrollTop() >= tgtTop - flagOffset) {
				$fixInfoTtl.find("p").text(flagObjAry[i].text);
			}
		}
	};
	
	var winResize = function() {
		if($fixInfoTtl.hasClass("js_show")) {
			$fixInfoTtl.stop().css({
				marginTop: 0
			});
		}else {
			$fixInfoTtl.stop().css({
				marginTop: -$fixInfoTtl.outerHeight()
			});
		}
	};
	
	init();
	return that;
};