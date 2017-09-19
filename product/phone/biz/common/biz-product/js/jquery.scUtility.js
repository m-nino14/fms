/*global window, jQuery, location, setInterval*/
/*=================================
	更新 13/03/13
=================================*/
Array.prototype.max = function() {
	var max = this[0];
	var len = this.length;
	for (var i = 1; i < len; i++) {
		if (this[i] > max) {
			max = this[i];
		}
	}
	return max;
};
Array.prototype.min = function() {
	var min = this[0];
	var len = this.length;
	for (var i = 1; i < len; i++) {
		if (this[i] < min) {
			min = this[i];
		}
	}
	return min;
};
var URLArray = location.href.split("#");
var URL = URLArray[0];
(function($) {
	$.extend($.expr[':'], {
		//【Aタグのみ】リンク先（href）が画像の要素を選択
		hrefImage: function(elm) {
			if ($(elm).get(0).tagName == "A") {
				return ($(elm).attr("href").match(/\.(gif|png|jpg)$/i)) ? true : false;
			}
		},
		//【Aタグのみ】リンク先（href）がPDFの要素を選択
		hrefPdf: function(elm) {
			if ($(elm).get(0).tagName == "A") {
				return ($(elm).attr("href").match(/\.(pdf)$/i)) ? true : false;
			}
		},
		//【Aタグのみ】リンク先（href）がページのurlとmatchする要素を選択
		//引数に"end"で後方一致、defaultは全体一致
		urlHrefMatch: function(elm, index, m) {
			//matchType = all or end : default = all
			var matchTypeStr = m.join(",");
			var matchType = (matchTypeStr.indexOf("end") >= 0) ? "end" : "all";
			if ($(elm).get(0).tagName == "A") {
				var reg;
				var subSrc = $(elm).attr("href");
				if (matchType != "end") {
					reg = new RegExp(subSrc);
					return (URL.match(reg)) ? true : false;
				} else {
					reg = new RegExp(subSrc + "$");
					var reg02 = new RegExp(subSrc + "index.html$");
					return (URL.match(reg) || URL.match(reg02)) ? true : false;
				}
			}
		}
	});
	$.fn.extend({
		imgTrim: function(trimW, trimH, fitSize, smallFit, wrapTag) {
			//fitSize = true or false : default = false
			//wrapTag = parent tag string : default = "div"
			fitSize = fitSize || false;
			smallFit = smallFit || false;
			wrapTag = wrapTag || "div";
			this.each(function() {
				var $target = $(this);
				if (fitSize) {
					if (smallFit) {
						$target.fitSizeImg(trimW, trimH, "small");
					} else {
						$target.fitSizeImg(trimW, trimH);
					}
				}
				var parentTagName = $target.parent().get(0).tagName;
				var parentTag;
				if (parentTagName == "A") {
					parentTag = $target.parent("a");
				} else if (parentTagName == wrapTag.toUpperCase()) {
					parentTag = $target.parent(wrapTag);
				} else {
					$target.wrap("<" + wrapTag + "></" + wrapTag + ">");
					parentTag = $target.parent(wrapTag);
				}
				parentTag.css({
					width: trimW,
					height: trimH,
					overflow: "hidden",
					display: "block",
					position: "relative",
					zoom: "1"
				});
				var distW = Math.floor(($target.attr("width") - trimW) / 2);
				var distH = Math.floor(($target.attr("height") - trimH) / 2);
				$target.css({
					position: "absolute",
					top: "0",
					left: "0",
					marginTop: -distH,
					marginLeft: -distW
				});
			});
			return this;
		},
		idtBaseLine: function() {
			this.each(function() {
				var w = $(this).width();
				$(this).parent("*").css({
					textIndent: -w,
					marginLeft: w
				});
			});
			return this;
		},
		listIdtBaseLine: function() {
			var wList = [];
			this.each(function() {
				wList.push($(this).width());
			});
			var maxW = wList.max();
			this.each(function() {
				var gap = maxW - $(this).width();
				$(this).css("margin-right", gap);
				$(this).parent("*").css({
					textIndent: -maxW,
					marginLeft: maxW
				});
			});
			return this;
		},
		afterSep: function(tagStr, addClassStr) {
			tagStr = tagStr || "div";
			addClassStr = addClassStr || "last";
			this.each(function() {
				$(this).addClass(addClassStr).after("<" + tagStr + " class='separate'> </" + tagStr + ">").next().css({
					clear: "both",
					height: "1px",
					overflow: "hidden",
					display: "block",
					width: "auto",
					border: "none",
					background: "none",
					"float": "none",
					lineHeight: "1px",
					margin: "0",
					padding: "0",
					fontSize: "1px"
				});
			});
			return this;
		},
		unbindHover: function() {
			this.each(function() {
				$(this).unbind("mouseenter").unbind("mouseleave");
			});
			return this;
		},
		flatheightsSet: function(countNum) {
			if (!$.fn.flatHeights) {
				alert("flatHeights is undefined");
				return this;
			}
			var num = countNum;
			var sets = [],
				temp = [];
			this.each(function(i) {
				temp.push(this);
				if (i % num == num - 1) {
					sets.push(temp);
					temp = [];
				}
			});
			if (temp.length) {
				sets.push(temp);
			}
			$.each(sets, function() {
				$(this).flatHeights();
			});
			return this;
		},
		flatheightsSetEach: function(selectorStr, countNum) {
			this.each(function() {
				$(this).find(selectorStr).flatheightsSet(countNum);
			});
			return this;
		},
		reSizeChildImg: function(maxW, addLink) {
			//maxW = number or null
			//addLink = true or false : default = true
			if (addLink === undefined) {
				addLink = true;
			}
			maxW = maxW || $(this).width();
			this.each(function() {
				$(this).find("img").filter(function() {
					return $(this).attr("width") > maxW;
				}).removeAttr("height").attr("width", maxW).each(function() {
					if (addLink) {
						var parentTagName = $(this).parent().get(0).tagName;
						if (parentTagName != "A") {
							//$.fn.lightBox
							$(this).wrap("<a href='../../../../common/people/common/js/" + $(this).attr('src') + "'></a>").parent("a").addClass("lightbox").attr("target", "_blank");
						} else {
							//$(this).parent("a").addClass("lightbox").attr("href",$(this).attr('src'));
						}
					}
				});
			});
			return this;
		},
		fitSizeImg: function(fitW, fitH, fitType) {
			//fitType = large or small : default = "large"
			fitType = fitType || "large";
			this.each(function() {
				var $target = $(this);
				var baseW = $target.attr("width");
				var baseH = $target.attr("height");
				var baseRate = baseW / baseH;
				var fitRate = fitW / fitH;
				if (fitType == "large") {
					if (baseRate > fitRate) {
						$target.attr("height", fitH).attr("width", Math.floor(fitH * baseRate));
					} else {
						$target.attr("width", fitW).attr("height", Math.floor(fitW / baseRate));
					}
				} else if (fitType == "small") {
					if (baseRate > fitRate) {
						$target.attr("width", fitW).attr("height", Math.floor(fitW / baseRate));
					} else {
						$target.attr("height", fitH).attr("width", Math.floor(fitH * baseRate));
					}
				}

			});
			return this;
		},
		imageState: function(addOverImageEx, subOverImageExReg) {
			var baseReg = "_o|_d|_on|_hover|_over|_h";
			addOverImageEx = addOverImageEx || "";
			subOverImageExReg = baseReg + "|" + subOverImageExReg || baseReg;
			this.each(function() {
				var $target = $(this);
				var tagName = $target.get(0).tagName;
				var $imgTag;
				if (tagName == "IMG") {
					$imgTag = $target;
				} else {
					$imgTag = $target.find("img:first");
				}
				if ($imgTag) {
					var pass = $imgTag.attr("src");
					var reg = new RegExp("(.+)?(" + subOverImageExReg + ")(\.[a-z]{3})$");
					var matchResult = pass.match(reg);
					if (matchResult) {
						pass = RegExp.$1 + RegExp.$3;
					}
					pass = pass.replace(/(\.[a-z]{3})/g, addOverImageEx + "$1");
					$imgTag.attr("src", pass);
				}
			});
			return this;
		},
		//【Aタグのみ】要素をcurrent状態にする
		//dellink:boolean = リンクを削除するか:true;
		//optObj:object = {
		//	imageActive:boolean : 子要素の画像をカレント状態にするか:true
		//  currentClass:string : 親要素にclassを付記:"current"
		//  addOverImagEx:string : 子要素の画像名に付記:"_o"
		//}
		activeNavi: function(dellink, optObj) {
			this.each(function() {
				if (dellink === undefined || dellink === null) {
					dellink = true;
				}
				var opt = {};
				opt = optObj || opt;
				if (opt.imageActive === false) {
					opt.imageActive = false;
				} else {
					opt.imageActive = true;
				}
				opt.currentClass = opt.currentClass || "current";
				opt.addOverImageEx = opt.addOverImageEx || "_o";
				var $target = $(this);
				var tagName = $target.get(0).tagName;
				if (tagName == "A") {
					if (opt.imageActive) {
						if ($target.find("img").length) {
							$target.find("img").imageState(opt.addOverImageEx).unbindHover();
						}
					}
					if (dellink) {
						$target.parent().addClass(opt.currentClass);
						$target.replaceWith($target.html());
					} else {
						if ($target.find("img").length) {
							$target.parent().addClass(opt.currentClass);
						} else {
							$target.addClass(opt.currentClass);
						}
					}
				}
			});
			return this;
		},
		centerParent: function(parentTag, centerType) {
			//parentTag = parentTag string
			//centerType = "c"||"v"||"h"
			parentTag = parentTag || "*";
			centerType = centerType || "center";
			this.each(function() {
				var $target = $(this);
				var $parent;
				if (parentTag == "*") {
					$parent = $target.parent("*");
				} else {
					$parent = $target.parents(parentTag);
				}
				var tagName = $target.get(0).tagName;
				var targetW, targetH;
				if (tagName == "IMG") {
					targetW = $target.attr("width");
					targetH = $target.attr("height");
				} else {
					targetW = $target.width();
					targetH = $target.height();
				}
				if (centerType === "c") {
					$target.css({
						marginTop: Math.floor(($parent.height() - targetH) / 2),
						marginLeft: Math.floor(($parent.width() - targetW) / 2)
					});
				} else if (centerType === "v") {
					$target.css({
						marginTop: Math.floor(($parent.height() - targetH) / 2)
					});
				} else if (centerType === "h") {
					$target.css({
						marginLeft: Math.floor(($parent.width() - targetW) / 2)
					});
				}
			});
			return this;
		},
		blockLink: function(hoverClass, blockLinkClass) {
			hoverClass = hoverClass || "hover";
			blockLinkClass = blockLinkClass || "independent";
			this.each(function() {
				$(this).filter(":has(a)").hover(function() {
					$(this).addClass(hoverClass);
				}, function() {
					$(this).removeClass(hoverClass);
				}).click(function(e) {
					$(this).removeClass(hoverClass);
					var $target = $(e.target);
					var ancFlag = $target.parents("a").length;
					var $childAnchor;
					var tagName = $target.get(0).tagName;
					if (tagName != "INPUT" && tagName != "A" && ancFlag <= 0) {
						if ($(this).find("." + blockLinkClass).length) {
							$childAnchor = $(this).find("." + blockLinkClass);
						} else {
							$childAnchor = $(this).find("a:eq(0)");
						}
					} else {
						if (tagName == "IMG") {
							$childAnchor = $target.parents("a").eq(0);
						} else {
							$childAnchor = $target;
						}
					}
					if ($childAnchor.attr("target") == "_blank") {
						window.open($childAnchor.attr("href"));
					} else {
						window.location.href = $childAnchor.attr("href");
					}
				}).css("cursor", "pointer").find("a").click(function(e) {
					e.preventDefault();
				});
			});
			return this;
		},
		//要素をホバーでフェードアウトする
		//fadeAlpha:number = ホバー時のアルファ || null:0.7;
		//fadeSpeed:number = フェードアウト・インのスピード || null:500;
		//callbackFuncObj:func||object = 完了時の処理
		//funcまたは{startFunc:func , endFunc:func}
		fadeHover: function(fadeAlpha, fadeSpeed, callbackFuncObj) {
			fadeAlpha = fadeAlpha || 0.7;
			fadeSpeed = fadeSpeed || 500;
			var callbackObj = {};
			if (typeof callbackFuncObj == "function") {
				callbackObj.startFunc = callbackFuncObj;
				callbackObj.endFunc = callbackFuncObj;
			} else if (typeof callbackFuncObj == "object") {
				callbackObj.startFunc = callbackFuncObj.startFunc || null;
				callbackObj.endFunc = callbackFuncObj.endFunc || null;
			} else {
				callbackObj.startFunc = null;
				callbackObj.endFunc = null;
			}
			this.each(

				function() {
					$(this).hover(function() {
						$(this).stop().fadeTo(fadeSpeed, fadeAlpha, callbackObj.startFunc);
					}, function() {
						$(this).stop().fadeTo(fadeSpeed, 1, callbackObj.endFunc);
					}).addClass("nofilter").click(function() {
						$(this).stop().fadeTo(fadeSpeed, 1);
					});
				});
			return this;
		},
		//class名からプロパティを取得
		//class="prop_{プロパティ名}-{値}"
		getClassProp: function(prefix) {
			prefix = prefix || "prop_";
			var prop = {};
			var $target = $(this[0]);
			if (!$target.attr("class")) {
				return prop;
			}
			var classAry = $target.attr("class").split(" ");
			var i;
			for (i = 0; i < classAry.length; i++) {
				if (classAry[i].indexOf(prefix) >= 0) {
					var reg = new RegExp(prefix + "(.+)-(.+)");
					var matchResult = classAry[i].match(reg);
					prop[matchResult[1]] = matchResult[2];
				}
			}
			return prop;
		},
		//トグル表示
		toggleShow: function(option) {
			var opt = option || {};
			opt.showClass = opt.showClass || "show";
			opt.speed = opt.speed || 600;
			opt.easing = opt.easing || "swing";
			opt.action = opt.action || null;
			this.each(function() {
				var $this = $(this);
				if($this.hasClass(opt.showClass) || opt.action == "hide") {
					$this.removeClass(opt.showClass);
					$this.stop().animate({
						height: 0
					},opt.speed,opt.easing);
				}else if(!$this.hasClass(opt.showClass) || opt.action == "show") {
					$this.addClass(opt.showClass);
					var tmpH = $this.height();
					$this.css("height","auto");
					var toH = $this.height();
					$this.height(tmpH);
					$this.stop().animate({
						height: toH
					},opt.speed,opt.easing,function(){
						$this.css("height","auto");
					});
				}
			});
			return this;
		}
	});
})(jQuery);


function getQuerystring(key, default_) {
	if (default_ == null) {
		default_ = "";
	}
	key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
	var qs = regex.exec(window.location.href);
	if (qs == null) {
		return default_;
	} else {
		return qs[1];
	}
}


/*-------------------------------------------------------
 ランダム
-------------------------------------------------------*/
function getRandom(nMin, nMax) {
	var nRandomInt = Math.floor(Math.random() * (nMax - nMin + 1)) + nMin;
	return nRandomInt;
}


/*-------------------------------------------------------
 配列のシャッフル
-------------------------------------------------------*/
Array.prototype.shuffle = function() {
	var i = this.length;
	while (i) {
		var j = Math.floor(Math.random() * i);
		var t = this[--i];
		this[i] = this[j];
		this[j] = t;
	}
	return this;
}