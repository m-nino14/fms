$(function() {
	function init(){
		var arr=location.href.split("/");
		var directoryName = arr[arr.length -2];
		var fileName = arr[arr.length -1];

		$('.product-nav-flex').html(
		'<div class="nav-col-wrap cf">\
			<div class="logo_link"><a href="/biz/workstyle_henkaku/"></a></div>\
			<ul class="nav-col cf">\
				<li><p><a href="/biz/workstyle_henkaku/concept.html">コンセプト</a></p></li>\
				<li class="line2 sub"><p><a href="javascript:void(0);" class="head"><i>ワークスタイル変革<br>・富士通の強み</i></a></p>\
				<dl>\
					<dt></dt>\
					<dd><p><a href="/biz/workstyle_henkaku/workstyle_tsuyomi/">富士通の強み</a></p></dd>\
					<dd><p><a href="/biz/workstyle_henkaku/workstyle_hakusho.html">ワークスタイル<br>変革白書</a></p></dd>\
					<dd><p><a href="/biz/workstyle_henkaku/workstyle_data.html">データでわかる<br>ワークスタイル変革</a></p></dd>\
					<dd class="sub2"><p><a href="javascript:void(0);">FROM MEDIA</a></p>\
						<dl>\
							<dt></dt>\
							<dd><p><a href="/biz/workstyle_henkaku/news/009.html"><span>なぜ朝日生命は顧客満足度向上に<br class="sp_br">タブレットPCが不可欠だと感じたのか？</span></a></p>\
							</dd>\
							<dd><p><a href="/biz/workstyle_henkaku/news/001.html"><span>富士通の<br class="sp_br">モビリティ&セキュリティが実現する<br class="sp_br">“一歩進んだワークスタイル変革”とは？</span></a></p>\
							</dd>\
							<dd><p><a href="/biz/workstyle_henkaku/news/002.html"><span>なぜ多くの企業が<br class="sp_br">ワークスタイル変革が進まないのか？</span></a></p>\
							</dd>\
							<dd><p><a href="/biz/workstyle_henkaku/news/003.html"><span>効果的な「働き方改革」実現には<br class="sp_br">適材適所でのICT活用</span></a></p>\
							</dd>\
							<dd><p><a href="/biz/workstyle_henkaku/news/004.html"><span>フルバーションWindows搭載の<br class="sp_br">6.0型タブレットがビジネス現場を<br class="sp_br">大きく変える！</span></a></p>\
							</dd>\
							<dd><p><a href="/biz/workstyle_henkaku/news/005.html"><span>「LIFEBOOK P727/P」を<br class="sp_br">ITmedia NEWS記者が使ってみた</span></a></p>\
							</dd>\
							<dd><p><a href="/biz/workstyle_henkaku/news/006.html"><span>「手のひら静脈認証センサー搭載<br class="sp_br">タブレット」は企業でどれだけ使えるか？</span></a></p>\
							</dd>\
							<dd><p><a href="/biz/workstyle_henkaku/news/007.html"><span>業務用PCに<br class="sp_br">富士通「LIFEBOOK U937/P」を<br class="sp_br">導入すべき5つの理由</span></a></p>\
							</dd>\
							<dd><p><a href="/biz/workstyle_henkaku/news/008.html"><span>700グラム台の“超軽量ノートPC”が<br class="sp_br">ビジネスシーンにもたらす「驚き」</span></a></p>\
							</dd>\
							<dd><p><a href="/biz/workstyle_henkaku/workstyle.html"><span>富士通の『一歩進んだワークスタイル変革』<br class="sp_br">それを実現するものとは？</span></a></p>\
							</dd>\
						</dl>\
					</dd>\
				</dl>\
				</li>\
				<li><p><a href="/biz/workstyle_henkaku/movie/index.html">動画</a></p></li>\
				<li class="line2 sub"><p><a href="javascript:void(0);" class="head"><i>デバイス&<br class="pc_br">ソリューション</i></a></p>\
				<dl>\
					<dt></dt>\
					<!--<dd><p><a href="/biz/workstyle_henkaku/device/administration.html">行政版セキュリティPC</a></p></dd>\
					<dd><p><a href="/biz/workstyle_henkaku/device/index.html">3ステップでご紹介<br>富士通のデバイス&amp;<br>ソリューション</a></p></dd>-->\
					<dd><p><a href="/biz/workstyle_henkaku/solutions_introduction/index.html">各ソリューションの<br>ご紹介</a></p></dd>\
					<!--<dd><p><a href="/biz/workstyle_henkaku/question/index.html">診断コンテンツ</a></p></dd>-->\
					<dd><p><a href="/biz/workstyle_henkaku/security_manga/index.html">マンガでわかる！<br>情報セキュリティ対策</a></p></dd>\
				</dl>\
				</li>\
				<li class="sub"><p><a href="javascript:void(0);" class="head">導入について</a></p>\
					<dl>\
					<dt></dt>\
					<dd><p><a href="/biz/workstyle_henkaku/case/">導入事例</a></p></dd>\
					<dd><p><a href="/biz/workstyle_henkaku/management_merit/germany.html">経営層向け<br>導入メリット</a></p></dd>\
					<dd><p><a href="/biz/workstyle_henkaku/info_system_merit/detective.html">情シス向け<br>導入メリット</a></p></dd>\
					</dl>\
				</li>\
				<li><p><a href="https://www.workstyle-henkaku.com/entry/" target="_blank"><small>ワークスタイル変革に役立つ</small>最新の導入事例資料<br>ダウンロード</a></p></li>\
			</ul>\
			<div class="floatBtn"><a href="/biz/workstyle_henkaku/question/index.html" target="_blank"><span><small>皆様により役立つサイトへ</small>アンケートのお願い</a></span></div>\
		</div>'
		);
		
		if(directoryName == 'workstyle_henkaku'){
			switch(fileName){
				/*case 'index.html' : $('.product-nav-flex li:nth-child(1)').addClass('stay'); break;*/
				case 'concept.html' : $('.product-nav-flex li:nth-child(1)').addClass('stay'); break;
				case 'concept_2.html' : $('.product-nav-flex li:nth-child(1)').addClass('stay'); break;	
				case 'workstyle.html' : $('.product-nav-flex li:nth-child(1)').addClass('stay'); break;
				case 'workstyle_hakusho.html' : $('.product-nav-flex li:nth-child(2)').addClass('stay'); break;
				case 'workstyle_data.html' : $('.product-nav-flex li:nth-child(2)').addClass('stay'); break;
				default :  break;
			}
		}else{
			switch(directoryName){
				case 'workstyle_tsuyomi' : $('.product-nav-flex li:nth-child(2)').addClass('stay'); break;
				case 'news' : $('.product-nav-flex li:nth-child(2)').addClass('stay'); break;
				case 'movie' : $('.product-nav-flex li:nth-child(3)').addClass('stay'); break;
				case 'device' : $('.product-nav-flex li:nth-child(4)').addClass('stay'); break;
				case 'solutions_introduction' : $('.product-nav-flex li:nth-child(4)').addClass('stay'); break;
				case 'question' : $('.product-nav-flex li:nth-child(4)').addClass('stay'); break;
				case 'security_manga' : $('.product-nav-flex li:nth-child(4)').addClass('stay'); break;
				case 'case' : $('.product-nav-flex li:nth-child(5)').addClass('stay'); break;
				case 'info_system_merit' : $('.product-nav-flex li:nth-child(5)').addClass('stay'); break;
				case 'management_merit' : $('.product-nav-flex li:nth-child(5)').addClass('stay'); break;
				default :  break;
			}
		}
		
		/*var WW = $(window).width();
	
		if(WW > 750){
			$('.nav-col-wrap li').hover(function(){
				$(this).children('dl').show();
			},function(){
				$(this).children('dl').hide();
			});
		}else{
			$('.nav-col-wrap li.sub').click(function(){
				$(this).children('dl').slideToggle();
				$(this).toggleClass('active');
			});
		}*/
	};
	init();
	
});
