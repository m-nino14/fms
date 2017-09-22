$(function() {
	function init(){
		var trackList = new Array();
		var num;
		trackList[1] = "slTrackEvent(['ms','mslink','foot_01_fws'])";
		trackList[2] = "slTrackEvent(['ms','mslink','foot_02_tp'])";
		trackList[3] = "slTrackEvent(['ms','mslink','foot_03_intel'])";
		trackList[4] = "slTrackEvent(['ms','mslink','foot_04_fsl'])";
		trackList[5] = "slTrackEvent(['ms','mslink','foot_05_fmw'])";
		
		/*$.fn.trackAct = function(num){
			trackList[num];	
		};*/
						
		$('main .btnList').html(
		'<div class="inner">\
			<ul>\
				<li><a href="http://www.fujitsu.com/jp/innovation/workstyle" target="_blank" onclick="$(this).trackAct(1);"><div class="change-border01"><div class="change-border01__inner"><img src="/biz/workstyle_henkaku/images/btn4.jpg" class="pc-only" alt="富士通のワークスタイル変革"></div></div><img src="/biz/workstyle_henkaku/images/sp/btn4.jpg" class="sp-only" alt="富士通のワークスタイル変革"><span>富士通の<br>ワークスタイル変革サイト</span></a></li>\
				<li><a href="http://transformation.ismedia.jp/" target="_blank" onclick="$(this).trackAct(2);"><div class="change-border01"><div class="change-border01__inner"><img src="/biz/workstyle_henkaku/images/btn3.jpg" class="pc-only" alt="新・働き方総合研究所"></div></div><img src="/biz/workstyle_henkaku/images/sp/btn3.jpg" class="sp-only" alt="新・働き方総合研究所"><span>ワークスタイル変革の<br>テーマポータルサイト</span></a></li>\
				<li><a href="https://www.intel.co.jp/content/www/jp/ja/small-business/pc-refresh.html" target="_blank" onclick="$(this).trackAct(3);"><div class="change-border01"><div class="change-border01__inner"><img src="/biz/workstyle_henkaku/images/btn5.jpg" class="pc-only" alt="intel ワークスタイル変革！従業員をオフィスから解放しませんか？"></div></div><img src="/biz/workstyle_henkaku/images/sp/btn5.jpg" class="sp-only" alt="intel ワークスタイル変革！従業員をオフィスから解放しませんか？"><span>インテルのテクノロジーで、<br>働き改革を実現</span></a></li>\
				<li><a href="http://www.fmworld.net/biz/security_lab/" target="_blank" onclick="$(this).trackAct(4);"><div class="change-border01"><div class="change-border01__inner"><img src="/biz/workstyle_henkaku/images/btn2.jpg" class="pc-only" alt="FUJITSU PC Security Lab."></div></div><img src="/biz/workstyle_henkaku/images/sp/btn2.jpg" class="sp-only" alt="FUJITSU PC Security Lab."><span>認証セキュリティなら富士通</span></a></li>\
				<li><a href="http://www.fmworld.net/biz/fmv/" target="_blank" onclick="$(this).trackAct(5);"><div class="change-border01"><div class="change-border01__inner"><img src="/biz/workstyle_henkaku/images/btn1.jpg" class="pc-only" alt="FMworld[法人]"></div></div><img src="/biz/workstyle_henkaku/images/sp/btn1.jpg" class="sp-only" alt="FMworld[法人]"><span>富士通製品のご紹介</span></a></li>\
			</ul>\
		</div>'
		);
		
		$('main .btnList li:nth-child(1) a').attr("onclick",trackList[1]);
		$('main .btnList li:nth-child(2) a').attr("onclick",trackList[2]);
		$('main .btnList li:nth-child(3) a').attr("onclick",trackList[3]);
		$('main .btnList li:nth-child(4) a').attr("onclick",trackList[4]);
		$('main .btnList li:nth-child(5) a').attr("onclick",trackList[5]);
		
		$('#fm_fund').html(
		'<div class="inner">\
			<h3><span>富士通で、一歩先をいく<br class="sp_br">ワークスタイル変革。</span></h3>\
			<p class="lead">モビリティ&amp;セキュリティで未来を切り拓く、<br class="sp_br">富士通の最先端デバイス。</p>\
			<ul class="productList">\
				<li><a href="http://www.fmworld.net/biz/fmv/lifebook/u937r/" target="_blank"><img src="/biz/workstyle_henkaku/images/fm_fund_1.jpg" alt="LIFEBOOK U937/R"></a>\
					<p>超軽量・極薄で多彩なセキュリティ機能を搭載。持ち歩きたくなる最高クラスのモビリティ。</p>\
				</li>\
				<li><a href="http://www.fmworld.net/biz/tablet/v567r/" target="_blank"><img src="/biz/workstyle_henkaku/images/fm_fund_2.jpg" alt="ARROWS Tab V567/R"></a>\
					<p>フルバージョンWindowsを搭載した、使う場所を選ばないセキュアなハンディタブレット。</p>\
				</li>\
				<li><a href="http://www.fmworld.net/biz/tablet/q507rb/" target="_blank"><img src="/biz/workstyle_henkaku/images/fm_fund_3.jpg" alt="ARROWS Tab Q507/RB"></a>\
					<p>さまざまなニーズに対応可能な2in1タブレット。</p>\
				</li>\
				<li><a href="http://www.fmworld.net/biz/fmv/lifebook/p727r/" target="_blank"><img src="/biz/workstyle_henkaku/images/fm_fund_4.jpg" alt="LIFEBOOK P727/R"></a>\
					<p>使い方自由自在の360度回転画面に、万全のセキュリティ機能を搭載。</p>\
				</li>\
			</ul>\
			</div>'
		);
		
		$('#intel_fund').html(
		'<div class="inner">\
				<h3><span>Intel Inside&reg; <br class="sp_br">飛躍的な生産性を</span></h3>\
				<ul>\
					<li>\
						<img src="/biz/workstyle_henkaku/images/intel_fund_2.jpg" width="180" alt="インテル&reg; Core&trade; i7 vPro&trade; プロセッサー">\
					</li>\
					<li>\
						<img src="/biz/workstyle_henkaku/images/intel_fund_1.jpg" width="180" alt="インテル&reg; Core&trade; i5 vPro&trade; プロセッサー">\
					</li>\
					<li>\
						<img src="/biz/workstyle_henkaku/images/intel_fund_3.jpg" width="180" alt="Intel Atom&reg; プロセッサー">\
					</li>\
				</ul>\
				<p class="note">Intel、インテル、Intel ロゴ、Intel Inside、Intel Inside ロゴ、Intel Atom、Intel Atom Inside、Intel Core、Core Inside、Intel vPro、vPro Inside、Celeron、Celeron Inside、Itanium、Itanium Inside、Pentium、Pentium Inside、Xeon、Xeon Phi、Xeon Inside、Ultrabook は、アメリカ合衆国および/またはその他の国における Intel Corporation の商標です。</p>\
			</div>'
		);
		
	};
	init();
});
