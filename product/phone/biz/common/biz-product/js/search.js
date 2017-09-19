//-------------------------------------------
// include headsearch
//-------------------------------------------
<!--
document.write(''

+'				<div id="headsearch">'
+'					<form name="search" id="search" method="get" action="http://azby.fmworld.net/app/customer/search/fmw_search.jsp">'
+'						<div>'
+'							<input type="hidden" name="whence" value="0" />'
+'							<input type="text" name="q" id="searchtop" class="q" size="30" value="サイト内検索" title="サイト内検索" onfocus="SearchFocus(this);" onblur="SearchBlur(this);" />'
+'							<input type="image" src="/images/common/fj/imgv4/common/search.gif" alt="検索" name="btnG" id="TopSubmit" class="TopSubmit" value="Search" onclick="return onButton();" />'
+'							<input type="hidden" name="as_sitesearch" value="www.fmworld.net/product/phone" />'
+'							<input type="hidden" name="sort" value="date:D:L:d1" />'
+'							<input type="hidden" name="entqr" value="3" />'
+'							<input type="hidden" name="num" value="10" />'
+'							<input type="hidden" name="inlang" value="ja" />'
+'							<input type="hidden" name="ie" value="UTF-8" />'
+'						</div>'
+'					</form>'
+'				</div>'

);
//-->

//-------------------------------------------
// search
//-------------------------------------------
var alertMsg="";  // CharCode Checker用警告メッセージ

function onButton(){
	// 入力内容チェック（空、またはデフォルト文字列の場合は何も実行しない）
	if(!SearchCheck()){
		return false;
	}

	// CharCode Checker
	var checker	= new CharCodeChecker();
	checker.setCustomAlert( customAlert );

	try{
		// 確認処理
		checker.checkInputObject(document.search.q);
	}catch( err ){}

	if (alertMsg != "") {
		var aName  = navigator.appName.toUpperCase();
		if ( aName.indexOf("MICROSOFT") >= 0 ) {
			// IE用の警告メッセージを表示
			showModalDialog("/common/charcode_checker/dialog.html",alertMsg,"status:false;dialogWidth:600px;dialogHeight:260px");
		} else {
			// その他のブラウザ用の警告メッセージを表示
			alert(alertMsg);
		}
		alertMsg = "";
		return false;
		
	} else {
		document.search.submit();
	}
}


function customAlert( name, str ) {
	var aName  = navigator.appName.toUpperCase();
	var newLine = "";
	
	if ( aName.indexOf("MICROSOFT") >= 0 ) {
		// IEの場合showModalWindowにてhtml形式にて出力するため
		newLine = "<br>";
	} else {
		// IE以外の場合dialogにて出力するため
		newLine = unescape("%0D%0A");
	}
	alertMsg = alertMsg + "使用できない文字 『" + str + "』が見つかりました" + newLine;
}

function SearchCheck(){
	var len = document.search.q.value.length;
	var src = document.search.q.value;
	if (len == 0){
		return false;
	}
	if (src == "サイト内検索"){
		return false;
	}
	for (var i=0;i < len;i++){
		if ((src.charAt(i) != " ") && (src.charAt(i) != " ")){
			return true;
		}
	}
	return false;
};

function SearchFocus(q){
	if (q.value == 'サイト内検索') {
		q.value='';
		q.style.color = "#000000";
	}
}

function SearchBlur(q){
	if (q.value == '') {
		q.value='サイト内検索';
		q.style.color = "#777";
	}
}
