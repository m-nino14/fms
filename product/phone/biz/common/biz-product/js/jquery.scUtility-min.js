Array.prototype.max=function(){var b=this[0];var a=this.length;for(var c=1;c<a;c++){if(this[c]>b){b=this[c]}}return b};Array.prototype.min=function(){var c=this[0];var a=this.length;for(var b=1;b<a;b++){if(this[b]<c){c=this[b]}}return c};var URLArray=location.href.split("#");var URL=URLArray[0];(function(a){a.extend(a.expr[":"],{hrefImage:function(b){if(a(b).get(0).tagName=="A"){return(a(b).attr("href").match(/\.(gif|png|jpg)$/i))?true:false}},hrefPdf:function(b){if(a(b).get(0).tagName=="A"){return(a(b).attr("href").match(/\.(pdf)$/i))?true:false}},urlHrefMatch:function(i,e,b){var h=b.join(",");var g=(h.indexOf("end")>=0)?"end":"all";if(a(i).get(0).tagName=="A"){var f;var d=a(i).attr("href");if(g!="end"){f=new RegExp(d);return(URL.match(f))?true:false}else{f=new RegExp(d+"$");var c=new RegExp(d+"index.html$");return(URL.match(f)||URL.match(c))?true:false}}}});a.fn.extend({imgTrim:function(f,c,b,e,d){b=b||false;e=e||false;d=d||"div";this.each(function(){var g=a(this);if(b){if(e){g.fitSizeImg(f,c,"small")}else{g.fitSizeImg(f,c)}}var h=g.parent().get(0).tagName;var k;if(h=="A"){k=g.parent("a")}else{if(h==d.toUpperCase()){k=g.parent(d)}else{g.wrap("<"+d+"></"+d+">");k=g.parent(d)}}k.css({width:f,height:c,overflow:"hidden",display:"block",position:"relative",zoom:"1"});var i=Math.floor((g.attr("width")-f)/2);var j=Math.floor((g.attr("height")-c)/2);g.css({position:"absolute",top:"0",left:"0",marginTop:-j,marginLeft:-i})});return this},idtBaseLine:function(){this.each(function(){var b=a(this).width();a(this).parent("*").css({textIndent:-b,marginLeft:b})});return this},listIdtBaseLine:function(){var b=[];this.each(function(){b.push(a(this).width())});var c=b.max();this.each(function(){var d=c-a(this).width();a(this).css("margin-right",d);a(this).parent("*").css({textIndent:-c,marginLeft:c})});return this},afterSep:function(c,b){c=c||"div";b=b||"last";this.each(function(){a(this).addClass(b).after("<"+c+" class='separate'> </"+c+">").next().css({clear:"both",height:"1px",overflow:"hidden",display:"block",width:"auto",border:"none",background:"none","float":"none",lineHeight:"1px",margin:"0",padding:"0",fontSize:"1px"})});return this},unbindHover:function(){this.each(function(){a(this).unbind("mouseenter").unbind("mouseleave")});return this},flatheightsSet:function(e){if(!a.fn.flatHeights){alert("flatHeights is undefined");return this}var c=e;var d=[],b=[];this.each(function(f){b.push(this);if(f%c==c-1){d.push(b);b=[]}});if(b.length){d.push(b)}a.each(d,function(){a(this).flatHeights()});return this},flatheightsSetEach:function(b,c){this.each(function(){a(this).find(b).flatheightsSet(c)});return this},reSizeChildImg:function(c,b){if(b===undefined){b=true}c=c||a(this).width();this.each(function(){a(this).find("img").filter(function(){return a(this).attr("width")>c}).removeAttr("height").attr("width",c).each(function(){if(b){var d=a(this).parent().get(0).tagName;if(d!="A"){a(this).wrap("<a href='../../../../common/people/common/js/"+a(this).attr("src")+"'></a>").parent("a").addClass("lightbox").attr("target","_blank")}else{}}})});return this},fitSizeImg:function(b,d,c){c=c||"large";this.each(function(){var e=a(this);var g=e.attr("width");var i=e.attr("height");var h=g/i;var f=b/d;if(c=="large"){if(h>f){e.attr("height",d).attr("width",Math.floor(d*h))}else{e.attr("width",b).attr("height",Math.floor(b/h))}}else{if(c=="small"){if(h>f){e.attr("width",b).attr("height",Math.floor(b/h))}else{e.attr("height",d).attr("width",Math.floor(d*h))}}}});return this},imageState:function(b,d){var c="_o|_d|_on|_hover|_over|_h";b=b||"";d=c+"|"+d||c;this.each(function(){var e=a(this);var g=e.get(0).tagName;var j;if(g=="IMG"){j=e}else{j=e.find("img:first")}if(j){var i=j.attr("src");var h=new RegExp("(.+)?("+d+")(.[a-z]{3})$");var f=i.match(h);if(f){i=RegExp.$1+RegExp.$3}i=i.replace(/(\.[a-z]{3})/g,b+"$1");j.attr("src",i)}});return this},activeNavi:function(b,c){this.each(function(){if(b===undefined||b===null){b=true}var f={};f=c||f;if(f.imageActive===false){f.imageActive=false}else{f.imageActive=true}f.currentClass=f.currentClass||"current";f.addOverImageEx=f.addOverImageEx||"_o";var d=a(this);var e=d.get(0).tagName;if(e=="A"){if(f.imageActive){if(d.find("img").length){d.find("img").imageState(f.addOverImageEx).unbindHover()}}if(b){d.parent().addClass(f.currentClass);d.replaceWith(d.html())}else{if(d.find("img").length){d.parent().addClass(f.currentClass)}else{d.addClass(f.currentClass)}}}});return this},centerParent:function(c,b){c=c||"*";b=b||"center";this.each(function(){var e=a(this);var h;if(c=="*"){h=e.parent("*")}else{h=e.parents(c)}var f=e.get(0).tagName;var g,d;if(f=="IMG"){g=e.attr("width");d=e.attr("height")}else{g=e.width();d=e.height()}if(b==="c"){e.css({marginTop:Math.floor((h.height()-d)/2),marginLeft:Math.floor((h.width()-g)/2)})}else{if(b==="v"){e.css({marginTop:Math.floor((h.height()-d)/2)})}else{if(b==="h"){e.css({marginLeft:Math.floor((h.width()-g)/2)})}}}});return this},blockLink:function(b,c){b=b||"hover";c=c||"independent";this.each(function(){a(this).filter(":has(a)").hover(function(){a(this).addClass(b)},function(){a(this).removeClass(b)}).click(function(h){a(this).removeClass(b);var d=a(h.target);var i=d.parents("a").length;var g;var f=d.get(0).tagName;if(f!="INPUT"&&f!="A"&&i<=0){if(a(this).find("."+c).length){g=a(this).find("."+c)}else{g=a(this).find("a:eq(0)")}}else{if(f=="IMG"){g=d.parents("a").eq(0)}else{g=d}}if(g.attr("target")=="_blank"){window.open(g.attr("href"))}else{window.location.href=g.attr("href")}}).css("cursor","pointer").find("a").click(function(d){d.preventDefault()})});return this},fadeHover:function(c,b,e){c=c||0.7;b=b||500;var d={};if(typeof e=="function"){d.startFunc=e;d.endFunc=e}else{if(typeof e=="object"){d.startFunc=e.startFunc||null;d.endFunc=e.endFunc||null}else{d.startFunc=null;d.endFunc=null}}this.each(function(){a(this).hover(function(){a(this).stop().fadeTo(b,c,d.startFunc)},function(){a(this).stop().fadeTo(b,1,d.endFunc)}).addClass("nofilter").click(function(){a(this).stop().fadeTo(b,1)})});return this},getClassProp:function(g){g=g||"prop_";var h={};var b=a(this[0]);if(!b.attr("class")){return h}var d=b.attr("class").split(" ");var e;for(e=0;e<d.length;e++){if(d[e].indexOf(g)>=0){var f=new RegExp(g+"(.+)-(.+)");var c=d[e].match(f);h[c[1]]=c[2]}}return h}})})(jQuery);function getQuerystring(b,d){if(d==null){d=""}b=b.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var c=new RegExp("[\\?&]"+b+"=([^&#]*)");var a=c.exec(window.location.href);if(a==null){return d}else{return a[1]}}(function(c,b,d){function a(h){for(var f=0,e=b.length,j=h.target,g;f<e;f++){g=b[f];if(g!==j&&!(g.contains?g.contains(j):g.compareDocumentPosition?g.compareDocumentPosition(j)&16:1)){c.event.trigger(d,h,g)}}}c.event.special[d]={setup:function(){var e=b.length;if(!e){c.event.add(document,"click",a)}if(c.inArray(this,b)<0){b[e]=this}},teardown:function(){var e=c.inArray(this,b);if(e>=0){b.splice(e,1);if(!b.length){c.event.remove(document,"click",a)}}}};c.fn[d]=function(e){return e?this.bind(d,e):this.trigger(d)}})(jQuery,[],"outerClick");