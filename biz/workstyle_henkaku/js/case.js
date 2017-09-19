$(function() {
	
	$('.target_tab li a').click(function(){
		var className = $(this).parent().attr('class');
		var ttlName = $(this).text();
		
		$('.target_tab li a').removeClass('current');
		$('.target_tab li.'+className+' a').addClass('current');
		
		$('.boxList h2 span').text(ttlName);
		$('.boxList ul').animate({'opacity':0},500,function(){
			$(this).animate({'opacity':1},500);
			$('.boxList li').hide();
			switch (className) {
				case "tele":
					$('.boxList .tele').show();
					$('.boxList .all').show();
				break;
				case "genba":
					$('.boxList .genba').show();
					$('.boxList .all').show();
				break;
				default:
					$('.boxList li').show();
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