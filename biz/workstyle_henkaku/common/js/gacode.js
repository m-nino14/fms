/*var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-15927419-1']);
_gaq.push(['_setDomainName', '.fmworld.net']);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true; ga.charset = 'utf-8';
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();*/

function recordOutboundLink(link, category, action, label, site_name, other_parameter ) {
  var result = true;
  try {
    var rd_url = '://azby.fmworld.net/cgi-bin/common/rd.cgi';
    var jump_url = link.href;
    if( jump_url.match( RegExp(rd_url,'i') ) == null )
    {
      jump_url.match( /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?/ );
      var protocol = RegExp.$2;
      var site = RegExp.$4;
      if( !site_name )
      {
        site_name = site.replace( /\./gi, '_' );
      };
      if( !other_parameter )
      {
        other_parameter='';
      }
      else if( other_parameter.match( /^&/ ) == null )
      {
        other_parameter = '&' + other_parameter;
      };
      jump_url = protocol + rd_url + '?site_name=' + site_name + other_parameter + '&url=' + jump_url;
    };
    if( !label )
    {
      label = link.href;
    };
    _gaq.push(['_trackEvent', category, action , label ]);
    var target_label=link.target;
    if( target_label == '_blank' )
    {
      link.href = jump_url;
      result = true;
    }
    else
    {
      setTimeout('document.location = "' + jump_url + '"', 100);
      result = false;
    }
  }catch(err){}
  return result;
}

$(document).ready(function(){
var domain = location.hostname;

if(domain.search("azby.fmworld") != -1) {
	var contact_bizpc = '<li><a href="http://www.fmworld.net/biz/fmv/contact/?fmwbfrom=foot">お問い合わせ（法人向けパソコン関連）</a></li>';
} else {
	var contact_bizpc = '<li><a href="/biz/fmv/contact/?fmwbfrom=foot">お問い合わせ（法人向けパソコン関連）</a></li>';
}

var contact_other = '<li><a href="http://jp.fujitsu.com/cgi-bin/refer?url=http://jp.fujitsu.com/contact/?dft=sp-contact">お問い合わせ（その他）</a></li>';
//var contact_other = '<li><a href="http://jp.fujitsu.com/cgi-bin/refer?url=http://jp.fujitsu.com/contact/#business?dft=sp-contact">お問い合わせ（その他）</a></li>';
$("#deepfooterinner div div:eq(2) ul li:eq(6)").replaceWith(contact_bizpc);
$("#deepfooterinner div div:eq(2) ul li:eq(6)").after(contact_other);
$("#permanentmenu ul li:nth-child(3)").replaceWith(contact_bizpc);
$("#permanentmenu ul li:nth-child(3)").after(contact_other);
});

