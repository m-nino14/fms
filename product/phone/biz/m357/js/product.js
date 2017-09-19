var productJs = {};

$(function() {
	productJs.spFixInfoTtl();
	
	if($("body").hasClass("product-top")) {
		productJs.productTopInit();
	}
	
	if($("body").hasClass("product-info")) {
		productJs.productInfoInit();
	}
	
	
});

productJs.productTopInit = function() {
	var that = {};
	
	var init = function() {
		moreShowSet();
	};
	
	var moreShowSet = function() {
		var $prodCts = $(".product-cts");
		var speed = 800;
		var easing = "easeOutExpo";
		
		if(uaInfo.oldIe) {
			$prodCts.find(".item-list .item-line:eq(0) .btn a").each(function(index, element) {
				PIE.attach(this);
			});
		}
		$prodCts.find(".item-list .item-line:gt(0)").appendTo($prodCts.find(".item-hide"));
		if($prodCts.find(".item-hide").find(".item-line").length) {
			$prodCts.find(".item-show").click(function() {
				var $hideCts = $prodCts.find(".item-hide");
				$hideCts.css("height","auto");
				var toH = $hideCts.height();
				$hideCts.css("height",0);
				$hideCts.animate({
					height: toH
				}, speed, easing, function(){
					$hideCts.css("height","auto");
					if(uaInfo.oldIe) {
						$hideCts.find(".btn a").each(function(index, element) {
							PIE.attach(this);
						});
					}
				});
				$prodCts.find(".item-show").animate({
					height: 0,
					padding: 0,
					opacity: 0,
					margin: 0
				}, speed, easing, function(){
					$prodCts.find(".item-show").css("display","none");
				});
			});
		}else {
			$prodCts.find(".item-show").css("display","none");
		}
	};
	
	init();
	return that;
};




productJs.productInfoInit = function() {
	var that = {};
	var $win = $(window);
	
	var init = function() {
		
		$win.resize(function(){
			winResize();
		}).trigger("resize");
	};
		
	var winResize = function() {
		$(".product-nav").css("padding-bottom",$(".product-sub-nav").outerHeight());
		//PC版用ヘッダーの固定
		$("header .pc-fix-nav-wrap").height($("header .pc-fix-nav").height());
	};
	
	init();
	return that;
};


productJs.spFixInfoTtl = function() {
	var that = {};
	var $win = $(window);
	var $fixInfoTtl;
	
	var init = function() {
		$fixInfoTtl = $('<div class="sp-fix-info-ttl"><p>' + $(".product-nav .product-nav-open p").text() + "</p></div>");
		$(".sp-fix-nav").append($fixInfoTtl);
		
		$win.resize(function(){
			winResize();
		}).scroll(function(){
			winScroll();
		}).trigger("resize");
	};
	
	var winScroll = function() {
		if($win.scrollTop() >= 120) {
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


//マウスオーバー画像切替
$(function(){
	$('.Category-nav a img').hover(function(){
		$(this).attr('src', $(this).attr('src').replace('-off', '-on'));
			}, function(){
			   if (!$(this).hasClass('current')) {
			   $(this).attr('src', $(this).attr('src').replace('-on', '-off'));
		}
	});
	
	//機種色表示枠用JS
	//画面幅によるレイアウト調整
	function lsScape(){
		var wsz = $(window).width();
		if (wsz<550){
			$('.tch-imgbox').addClass('s-scape');
		} else {
			$('.tch-imgbox').removeClass('s-scape');
		}
	}
	$(window).on('load resize',function(){
		lsScape();
	});
	
	//機種色変更
	$('.tch-img').on('click',function(){
		var idnm = $(this).attr('data-color'), dtrt = $(this).attr('data-right');
		$('.dsgn-clr').find('dl').addClass('dsp-non');
		$('.dsgn-clr dl#'+idnm).removeClass('dsp-non');
		$('.tch-imgbox').find('.tch-img').removeClass('current-img');
		$('.tch-imgbox').find('.tch-img').removeClass('fl-r');
		$('.tch-imgbox .'+idnm).addClass('current-img');
		$('.tch-imgbox .'+dtrt).addClass('fl-r');
	});
	
});