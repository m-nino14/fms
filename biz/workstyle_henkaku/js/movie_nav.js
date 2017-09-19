$(function() {
	function init(){
		var arr=location.href.split("/");
		var directoryName = arr[arr.length -2];
		var fileName = arr[arr.length -1];

		$('section.tab.movie').html(
		'<ul class="tabList movie ver3">\
				<li class="sub"><a href="javascript:void(0);"><span>富士通の<br>ソリューション紹介</span></a>\
				<dl>\
				<dt></dt>\
				<dd><a href="/biz/workstyle_henkaku/movie/movie_14.html">スマートデバイス向け<br>画像認識ソリューションのご紹介</a></dd>\
				<dd><a href="/biz/workstyle_henkaku/movie/movie_9.html">情報流出のリスクから企業を守る<br>「手のひら静脈認証」のご紹介&#9312;</a></dd>\
				<dd><a href="/biz/workstyle_henkaku/movie/movie_10.html">高い認証精度を誇る<br>「手のひら静脈認証」のご紹介&#9313;</a></dd>\
				<dd><a href="/biz/workstyle_henkaku/movie/movie_13.html">アプライアンス認証サーバ<br>「Secure Login Box」のご紹介</a></dd>\
				<dd><a href="/biz/workstyle_henkaku/movie/movie_3.html">秘密情報を分散<br>「ZENMU for PC」のご紹介</a></dd>\
				<dd><a href="/biz/workstyle_henkaku/movie/movie_11.html">リモートデータ消去<br>「CLRARSURE」のご紹介</a></dd>\
				<dd><a href="/biz/workstyle_henkaku/movie/movie_12.html">仮想デスクトップ基盤<br>「VDI」のご紹介</a></dd>\
				</dl>\
				</li>\
				<li class="sub"><a href="javascript:void(0);"><span>富士通の<br>デバイス紹介</span></a>\
				<dl>\
				<dt></dt>\
				<dd><a href="/biz/workstyle_henkaku/movie/movie_5.html">LIFEBOOK U/UHシリーズ<br>製品品質評価試験</a></dd>\
				<dd><a href="/biz/workstyle_henkaku/movie/movie_6.html">ARROWS Tab Q737/P-PV</a></dd>\
				<dd><a href="/biz/workstyle_henkaku/movie/movie_7.html">LIFEBOOK P727/P</a></dd>\
				<dd><a href="/biz/workstyle_henkaku/movie/movie_8.html">ARROWS Tab V567/P</a></dd>\
				</dl>\
				</li>\
				<li><a href="/biz/workstyle_henkaku/movie/movie_1.html">富士通の一歩進んだ<br>ワークスタイル変革とは</a></li>\
				<li><a href="/biz/workstyle_henkaku/movie/movie_2.html">富士通デジタル・トランス<br>フォーメーション・センター</a></li>\
			</ul>'
		);
		
		var urlAry = new Array();
		var urlName;
		$('.tabList a').each(function(){
			urlAry = $(this).attr('href').split("/");
			urlName = urlAry[urlAry.length-1];
			if(fileName == urlName){
				$(this).addClass('current');
			}
    });
	};
	init();
	
});
