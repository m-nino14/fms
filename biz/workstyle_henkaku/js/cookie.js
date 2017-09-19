$(function() {
	var visitCount;
	var preVisit;

	function getNowTime(){
		nowDate = new Date();
		nowTime = nowDate.getTime(); 
	}

	function courseDate(n){
		getNowTime();
		course = nowTime - n;
		courseTime = Math.floor(course/(1000*60*60*24)); 
	}
		
	function cookieFunc(){
		$.cookie('visitCount', 3, {expires: 365,path: "/biz/workstyle_henkaku/"});
	}
	$(function() {	

		cookieArr = $.cookie();

		if (cookieArr['visitCount'] == null) { 
			visitCount = 1;
			$.cookie('visitCount', visitCount, {expires: 365,path: "/biz/workstyle_henkaku/"});
			$(this).modalAct();
		}else if(cookieArr['visitCount'] >= 3){
			$('.floatBtn').hide();
		}else {  
			visitCount = $.cookie('visitCount');
			visitCount ++;
			$.cookie('visitCount', visitCount, {expires: 365,path: "/biz/workstyle_henkaku/"});
			$(this).modalAct();
		}
	});
	
	$('.modal_top .btn').click(function(){
		cookieFunc();
	});
	
	$('.floatBtn').click(function(){
		$(this).hide();
		cookieFunc();
	});
	
});