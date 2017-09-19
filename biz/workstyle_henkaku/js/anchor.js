$(function() {
	var offset;
	var wW;
	var pos;
	function init(){
		wW = $(window).width();
		if(wW < 769){
			pos = 60;
		}else{
			pos = 80;
		}
		
		if(location.hash=="#movie1"){
			offset = $('#movie1').offset().top-pos;	
		}else if(location.hash=="#movie2"){
			offset = $('#movie2').offset().top-pos;	
		}
		$("html,body").animate({scrollTop: offset}, 10);
	};
	init();
	$(window).load(function(){ init();});
});// JavaScript Document// JavaScript Document