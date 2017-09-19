$(function() {
	var loc = location.href; //URL取得
	var head_h;
	var win_w = $(window).width(); //画面幅取得
	if (win_w > 750) { //ブレイクポイントで高さを取得するヘッダを変更する
		head_h = $('.pc-fix-nav').height();
	} else {
		head_h = $('.sp-fix-nav .hd-line').height() + $('.sp-fix-nav .sp-fix-info-ttl').height();
	}
	
	//位置調整が終わった後にアンカー移動する場合があるので、ページ読込が全て終わった後に調整動作を起動
	$(window).on('load',function(){
		if (loc.search(/#/) != -1) { //URLに「#」がある時だけ起動
			var anctxt = loc.split('#');
			var ancsll = $('#' + anctxt[1]).offset(); //アンカーの位置を取得
			ancsll = ancsll.top - head_h; //アンカーの位置からヘッダの高さをマイナス
			$('html,body').animate({scrollTop : ancsll}, 500); //上記の位置にスクロール
		}
	});
});