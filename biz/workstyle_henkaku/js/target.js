$(function() {
	$('.boxList .textArea').matchHeight();
	
	$('.target_tab li a').click(function(){
		var className = $(this).parent().attr('class');
		var ttlName = $(this).html();
		
		$('.target_tab li a').removeClass('current');
		$('.target_tab li.'+className+' a').addClass('current');
		
		$('.boxList h2 span').html(ttlName);
		$('.boxList .area').animate({'opacity':0},500,function(){
			$(this).animate({'opacity':1},500);
			$('.boxList .area').hide();
			switch (className) {
				case "idea":
					$('.boxList h3').hide();
					$('.boxList h2').addClass('mb');
					$('.boxList #idea').show();
					currentPos =2;
				break;
				case "case":
					$('.boxList h3').hide();
					$('.boxList h2').addClass('mb');
					$('.boxList #case').show();
					currentPos =3;
				break;
				case "understand":
					$('.boxList h3').hide();
					$('.boxList h2').addClass('mb');
					$('.boxList #understand').show();
					currentPos =4;
				break;
				default:
					$('.boxList h3').show();
					$('.boxList h2').removeClass('mb');
					$('.boxList .area').show();
					currentPos =1;
				break;
			}
			$('.target_tab .pop i').css('left',popPosAry[currentPos]);
			$('.target_tab .pop span').text(popTxtAry[currentPos]);	
			/*$.fn.matchHeight._apply('.boxList .textArea', {
				byRow: false,
				property: 'height'
			});*/
		});
		var margin;
		if($(window).scrollTop() >= 145 || $(window).width() <= 768){
			margin = 60;
		}else{
			margin = 33;
		}
		var HashOffset = $('.target_tab').offset().top-margin;		
		$("html,body").animate({scrollTop: HashOffset}, 500);
	});
	
	var index;
	var currentPos = 1;
	var firstAct = false;
	var popPosAry = new Array();
	var wW = $(window).width();
	popPosAry = [0,105,340,570,805];
	
	var popTxtAry = new Array();
	popTxtAry[1] = '';
	popTxtAry[2] = '富士通ならではのモビリティ＆セキュリティを活かした、一歩進んだワークスタイル変革';
	popTxtAry[3] = '金融から病院、教育まで、さまざまな業種に合ったモバイルソリューションを提案・構築';
	popTxtAry[4] = '時間と場所を選ばない最新のモバイルデバイスと最適なソリューションの導入・運用を解説';
	
	//$('.target_tab .pop').addClass('anime1');
	
	$('.target_tab li').mouseenter(function(){
		index = $(this).index('.target_tab li')+1;
		if(index == 1 || firstAct == true){
		}else{
			$('.target_tab .pop').delay(100).fadeIn('1000');
			firstAct = true;
		}
		if(index == 1){
			$('.target_tab .pop').css('opacity',0);
		}else{
			$('.target_tab .pop').css('opacity',1);
		}
		$('.target_tab .pop i').css('left',popPosAry[index]);
		$('.target_tab .pop span').text(popTxtAry[index]);
		/*if(index == currentPos){
			$('.target_tab .pop i').css('left',popPosAry[index]);
			$('.target_tab .pop span').text(popTxtAry[index]);
		}else{
			/*$('.target_tab .pop').addClass('anime1');
			$('.target_tab .pop').on('webkitAnimationEnd', function(){
				$('.target_tab .pop i').css('left',popPosAry[index]);
				$('.target_tab .pop span').text(popTxtAry[index]);
				$('.target_tab .pop').addClass('anime2');
			});
		}*/
	}).mouseleave(function(){
		$('.target_tab .pop i').css('left',popPosAry[currentPos]);
		$('.target_tab .pop span').text(popTxtAry[currentPos]);	
	}).click(function(){
		currentPos = index;
		if(wW <= 768){
			$('.target_tab .pop span').text(popTxtAry[index]);
		}
	});
	
	$('.target_tab').mouseleave(function(){
		if(currentPos == 1){
			$('.target_tab .pop').hide();
			firstAct = false;
		}else{
			$('.target_tab .pop').css('opacity',1);
		}
		if(index == currentPos){
		}else{
			$('.target_tab .pop i').css('left',popPosAry[currentPos]);
			$('.target_tab .pop span').text(popTxtAry[currentPos]);			
		}
	});
	
	/*------------------
			文字数制限
	------------------*/
	
	var $setElm = $('.boxList li .textArea p');
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
});