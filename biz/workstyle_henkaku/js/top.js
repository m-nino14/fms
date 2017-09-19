$(function() {
	$('.boxList .textArea').matchHeight();
	/*var slider = $('.bxslider').bxSlider({
		mode: 'fade',
		auto: true,
		controls: false,
		onSlideAfter: function(){
			var current = slider.getCurrentSlide()+1;
			$('.thumList li img').css('opacity',0.5);
			$('.thumList li p.ttl').css('opacity',0.7);
			$('.thumList li:nth-child('+current+') img').css('opacity',1);
			$('.thumList li:nth-child('+current+') p.ttl').css('opacity',1); 
		}

	});
	
	var WW = $(window).width();
	
	if(WW > 750){
		$('.thumList li').mouseenter(function(){
			var index = $(this).index('.thumList li');
			slider.goToSlide(index);
			slider.stopAuto();
		});
		$('.thumList li').mouseleave(function(){
			slider.startAuto();
		});
		$('.slider').mouseenter(function(){
			slider.stopAuto();
		}).mouseleave(function(){
			slider.startAuto();
		});
		
	}else{
		$('.thumList li').click(function(){
			var index = $(this).index('.thumList li');
			slider.goToSlide(index);
			return false;
		});
	}*/
	
	
	/*------------------------------
			mv
	-------------------------------*/
	var currentNum = 1;
	var index;
	$('#mv_ver2 .btnArea li').mouseenter(function(){
		index = $(this).index('#mv_ver2 .btnArea li')+1;
		$('#mv_ver2 .btnArea li').removeClass('current');
		if(currentNum == index){
			
		}else{
			$('#mv_ver2 .pic li').css('z-index',1);
			$('#mv_ver2 li.pic'+index).css({'z-index':2,'opacity':0});
			$('#mv_ver2 li.pic'+index).animate({'opacity':1},300);
			//$('#mv_ver2 .pic'+index).addClass('on');
		}
	}).mouseleave(function(){
		currentNum = index;
		$('#mv_ver2 .btnArea li:nth-child('+currentNum+')').addClass('current');
	});
	
	
	
	/*------------------------------
			モーダル
	-------------------------------*/
	
	var current_scrollY;

	// OPEN MODAL
	$.fn.modalAct = function(){
	//function modalAct(){
		current_scrollY = $( window ).scrollTop(); 

		$( '#wrap' ).css( {
			position: 'fixed',
			width: '100%',
			top: -1 * current_scrollY
		} );
		$('.modal_top,#overlay_top').show();
	};
	
	$('.modalClose,.modal_top .btn').click(function(){
		$( '#wrap' ).attr( { style: '' } );
		$( 'html, body' ).prop( { scrollTop: current_scrollY } );
		$('.modal_top,#overlay_top').hide();
	});
	
	/*------------------------------
			タブ
	-------------------------------*/
		
	$('.target_tab li a').click(function(){
		if($(this).parent().hasClass('btnDl') == true){
			
		}else{
			var className = $(this).parent().attr('class');
			/*var ttlName = $(this).text();*/

			$('.target_tab li a').removeClass('current');
			$('.target_tab li.'+className+' a').addClass('current');

			/*$('.boxList h2 span').text(ttlName);*/
			$('.boxList .case_list ul').animate({'opacity':0},500,function(){
				$(this).animate({'opacity':1},500);
				$('.boxList .case_list li').hide();
				switch (className) {
					case "tele":
						$('.boxList .case_list .tele').show();
						$('.boxList .case_list .all').show();
					break;
					case "genba":
						$('.boxList .case_list .genba').show();
						$('.boxList .case_list .all').show();
					break;
					default:
						$('.boxList .case_list li').show();
					break;
				}
			});
			var margin;
			if($(window).scrollTop() >= 145 || $(window).width() <= 768){
				margin = 60;
			}else{
				margin = 33;
			}
			var HashOffset = $('.target_tab').offset().top-margin;		
			$("html,body").animate({scrollTop: HashOffset}, 500);
		}
	});
	
	
	/*------------------
			文字数制限
	------------------*/
	
	var $setElm = $('.boxList li .textArea p.txt');
	var cutFigure = '28'; // カットする文字数
	var afterTxt = ' …'; // 文字カット後に表示するテキスト

	$setElm.each(function(){
			var textInt = $.trim($(this).text());
			textInt = textInt.replace(/\s/g, "");
			var textLength = textInt.length;
			var textTrim = textInt.substr(0,(cutFigure));

			if(cutFigure < textLength) {
					$(this).html(textTrim + afterTxt).css({visibility:'visible'});
			} else if(cutFigure >= textLength) {
					$(this).css({visibility:'visible'});
			}
			$('.boxList .textArea div.ttl').matchHeight();
	});
});
