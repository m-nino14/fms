var uaInfo = (function() {
	var that = {};
	var userAgent = window.navigator.userAgent;
	var appVersion = window.navigator.appVersion.toLowerCase();
	that.browser;
	that.os;
	that.ieVr = null;
	that.oldIe = false;
	that.terminal = false;
	that.fixedSupport = true;
	that.interface = "mouse";
	that.oldAndroid = false;
	
	that.translate3d = (window.matchMedia)? true: false;
	
	if (userAgent.indexOf('iPhone') > 0 || userAgent.indexOf('iPod') > 0) {
		that.os = "ios";
		that.terminal = "iPhone";
		that.interface = "touch";
		if (userAgent.indexOf("OS 4") != -1 || userAgent.indexOf("OS 3") != -1 || userAgent.indexOf("OS 2") != -1) {
				that.fixedSupport = false;
		}
	} else if(userAgent.indexOf('iPad') > 0) {
		that.os = "ios";
		that.terminal = "iPad";
		that.interface = "touch";
		if (userAgent.indexOf("OS 4") != -1 || userAgent.indexOf("OS 3") != -1 || userAgent.indexOf("OS 2") != -1) {
				that.fixedSupport = false;
		}
	} else if (userAgent.indexOf('Android') > 0) {
		that.os = "android";
		that.interface = "touch";
		if(userAgent.indexOf('Mobile') > 0) {
			that.terminal = "androidMob";
		}else {
			that.terminal = "androidTab";
		}
		if (userAgent.indexOf("Android 3.") != -1 || userAgent.indexOf("Android 2.") != -1 || userAgent.indexOf("Android 1.") != -1) {
				that.fixedSupport = false;
				that.oldAndroid = true;
		}
	} else if (userAgent.match(/Mac|PPC/)) {
		that.os = "mac";
	}else {
		that.os = "other";
	}
	
	var ua = userAgent.toLowerCase();
	
	if (ua.indexOf('msie') != -1 || ua.indexOf('trident') >= 0) {
	  that.browser = 'ie';
	  if (ua.indexOf("msie 6.") != -1) {
		that.ieVr = 6;
		that.fixedSupport = false;
		that.oldIe = true;
	  } else if (appVersion.indexOf("msie 7.") != -1) {
		that.ieVr = 7;
		that.oldIe = true;
	  } else if (appVersion.indexOf("msie 8.") != -1) {
		that.ieVr = 8;
		that.oldIe = true;
	  } else if (appVersion.indexOf("msie 9.") != -1) {
		that.ieVr = 9;
	  }
	} else if (ua.indexOf('chrome') != -1) {
	  that.browser = 'chrome';
	} else if (ua.indexOf('safari') != -1) {
	  that.browser = 'safari';
	} else if (ua.indexOf('firefox') != -1) {
	  that.browser = 'firefox';
	}
	
		
	if(that.os) {
		$("html").addClass("is_" + that.os);
	}
	if(that.browser) {
		$("html").addClass("is_" + that.browser);
	}
	if(that.ieVr) {
		$("html").addClass("is_" + that.browser + that.ieVr);
	}
	if(that.oldIe) {
		$("html").addClass("is_oldIe");
	}
	if(that.terminal) {
		$("html").addClass("is_" + that.terminal);
		if(that.oldAndroid) {
			//alert("old");
			document.write('<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0">');
		}else {
			if(that.terminal == "iPad" || that.terminal == "androidTab") {
				//alert("tab");
				//document.write('<meta name="viewport" content="width=device-width">');
				document.write('<meta name="viewport" content="width=1000">');
			}else {
				//alert("phone");
				document.write('<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0">');
			}
		}
	}else {
		//alert("other");
		document.write('<meta name="viewport" content="width=device-width">');
	}
	if(!that.fixedSupport) {
		$("html").addClass("is_no_fixedsupport");
	}else {
		$("html").addClass("is_fixedsupport");
	}
	if(that.interface) {
		$("html").addClass("is_" + that.interface);
	}
	if(that.translate3d) {
		$("html").addClass("is_translate3d");
	}
	if(that.oldAndroid) {
		$("html").addClass("is_oldAndroid");
	}
	
	return that;
}());