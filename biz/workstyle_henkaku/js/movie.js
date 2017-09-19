$(function() {
	$('.boxList .textArea').matchHeight();
	
	var WW = $(window).width();
	
	if(WW > 750){
		$('.tab li.sub').hover(function(){
			$(this).children('dl').show();
			$(this).children('a').addClass('current');
		},function(){
			$(this).children('dl').hide();
			$(this).children('a').removeClass('current');
		});
	}else{
		$('.tab li.sub').click(function(){
			$(this).children('dl').slideToggle();
			$(this).children('a').toggleClass('current');
		});
	}
	
	$('.boxList li a').click(function(){
		var url = $(this).attr('href');
		$('#overlay').show();
		$('#modal').show();
		$('#modal .youtube').html('<iframe src="'+url+'" frameborder="0" allowfullscreen></iframe>');
		
		if($(this).hasClass('link')){
			$('#modal .linkArea').show();
		}
		return false;
	});
	
	$('.btnClose,#overlay').click(function(){
		$('#modal iframe').remove();
		$('#overlay').hide();
		$('#modal').hide();
		$('#modal .linkArea').hide();
	});
	
});// JavaScript Document