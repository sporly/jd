/* product-home/1.0.0 floor.js Date:2016-03-08 10:07:33 */
define("product/home/1.0.0/js/floor.js", ["jdf/1.0.0/ui/switchable/1.0.0/switchable.js", "jdf/1.0.0/ui/lazyload/1.0.0/lazyload.js"], function(require, a) {
	require("jdf/1.0.0/ui/switchable/1.0.0/switchable.js");
	require("jdf/1.0.0/ui/lazyload/1.0.0/lazyload.js");
	alert();
	var e = {
		clothes: 17,
		cosmetics: 18,
		electronics: 20,
		mobiles: 21,
		digitals: 22,
		digitalsfloorStyleA: 22,
		sports: 24,
		livings: 25,
		babys: 26,
		foods: 27,
		books: 29
	};
	pageConfig.floorImgagesSet = function(a, b) {
		return b ? b && b.match(/vclist/) ? pageConfig.FN_GetImageDomain(a) + b : pageConfig.FN_GetImageDomain(a) + "N3/" + b : ""
	}, pageConfig.floorReplaceHtmlTag = function(a) {
		return a ? a.replace(/<\/?[^>]*>/g, "") : a
	}, pageConfig.floorPrice = function(a) {
		return /\.00/.test(a) ? a.replace(".00", "") + ".<span>00</span>" : (a = a.split("."), 2 == a.length ? a[0] + ".<span>" + a[1] + "</span>" : a)
	}, pageConfig.floorClstag = function(a, b) {
		return "h|keycount|2015|" + e[a] + String.fromCharCode(99 + (b - 1))
	}, pageConfig.floorClstagExtend = function(a) {
		return String.fromCharCode(97 + (a - 1))
	};
	var f = {
		el: [],
		ui: []
	};
	var g = -1;
	var h = -1;
	$(window).bind("scroll", function() {
		clearTimeout(g), g = setTimeout(function() {
			i()
		}, 200)
	}), $(window).bind("resize", function() {
		clearTimeout(h), h = setTimeout(function() {
			i()
		}, 200)
	});

	function i() {                
		var a = j(f.el);
		$.each(f.ui, function(b, c) {
			a && c.el.get(0) == a.get(0) ? -1 == c.autoInterval && c.startPlay() : -1 != c.autoInterval && (c.stopPlay(), c.autoInterval = -1)
		})
	}

	function j(a) {
		var b = [];
		var c = $(window).height();
		var d = $("body").scrollTop() || $("html").scrollTop();
		var e = 0;
		var f = 0;
		var g = 0;
		var h = null;
		return $.each(a, function(a) {
			if (h = $(th is), !h.data("floorIsHover") && (e = h.offset().top, f = h.outerHeight(), g = e + f, g > d && d + c > e)) {
				var i = 0;
				d > e && (i = g - d), e > d && d + c > e && (i = d + c - e), b.push({
					node: h,
					ch: i,
					i: a
				})
			}
		}), b.length > 0 ? (b.sort(function(a, b) {
			return a.ch != b.ch ? a.ch < b.ch ? -1 : 1 : Math.round(Math.random()) ? -1 : 1
		}), b.pop().node) : null
	}

	function k(a, b, c, d) {
		var e = $("#" + a);
		if (c = "undefined" == typeof c ? 439 : c, d = "undefined" == typeof d ? [] : d, b) {
			var g = [];
			var h = '<div class="main hide" data-lazy-index="<%=index%>" data-lazy-id="<%=id%>">\u6570\u636e\u52a0\u8f7d\u4e2d...</div>';
			var j = '<%if(data){%>					<ul class="p-list">						<%for(var i = 0;i<dataSize+1;i++){%>							<%if(data[i]){%>							<li class="fore<%=i%>" clstag="<%=pageConfig.floorClstag("' + a + '",dataIndex)%><%if(i<10){%>0<%}%><%=i%>">								<div class="p-img">									<a target="_blank" href="http://item.jd.com/<%=data[i].a%>.html" title="<%=pageConfig.floorReplaceHtmlTag(data[i].b)%>">										<img width="130" height="130" alt="<%=pageConfig.floorReplaceHtmlTag(data[i].b)%>" src="<%=pageConfig.floorImgagesSet(data[i].a, data[i].d)%>">									</a>								</div>								<div class="p-name"><a target="_blank" href="http://item.jd.com/<%=data[i].a%>.html" title="<%=pageConfig.floorReplaceHtmlTag(data[i].b)%>"><%=pageConfig.floorReplaceHtmlTag(data[i].b)%></a></div>								<div class="p-price"><span>\uffe5</span><%=pageConfig.floorPrice(data[i].c)%></div>							</li>							<%}%>						<%}%>					</ul>				<%}%>				<%if(tabDataExtend){%>					<ul class="img-list">						<%for(var i = 0;i<tabDataSize+1;i++){%>							<%if(tabDataExtend[i]){%>							<li class="fore<%=i%>" clstag="<%=pageConfig.floorClstag("' + a + '",dataIndex)%><%=pageConfig.floorClstagExtend(i)%>">								<a target="_blank" href="<%=tabDataExtend[i].href%>">									<img width="<%=tabDataExtend[i].width%>" height="<%=tabDataExtend[i].height%>" src="<%=tabDataExtend[i].src%>">								</a>							</li>							<%}%>						<%}%>					</ul>				<%}%>';
			var k = function(a) {
				var c, b = 0;
				for (c in a) a.hasOwnProperty(c) && b++;
				return b
			};
			var l = 0;
			$.each(b, function(a) {
				g.push($.tpl(h, {
					index: l,
					id: a
				})), l++
			}), e.find(".mc").append(g.join(""))
		}
		b && (e.find(".tab").each(function() {
			var a = $(".tab-item:first", $(this));
			var b = a.find("a").outerWidth();
			a.css("width", b + "px"), $(".tab-item:last span", $(this)).css("background", "#fff")
		}), e.delegate(".tab .tab-item a", "mouseenter", function() {
			void 0 == $(this).parent().attr("style") && $(this).parent().width($(this).outerWidth())
		}), e.switchable({
			delay: 50,
			navItem: "tab-item",
			navSelectedClass: "tab-selected",
			mainClass: "main",
			mainSelectedClass: "main-selected",
			callback: function(a, b, c) {
				var d = c.attr("data-lazy-id");
				d && (c.html(n(c.attr("data-lazy-index"), d)), c.removeAttr("data-lazy-id").removeAttr("data-lazy-index")), c.find(".slider-panel-selected").lazyload({
					delay: 0
				})
			}
		}));
		var m = e.find(".slider");
		m.length && (m.each(function() {
			var a = $(this);
			var b = a.switchable({
				type: "slider",
				hasPage: !0,
				autoPlay: !0,
				stayTime: 4e3,
				width: c,
				mainSelectedClass: "slider-panel-selected",
				navSelectedClass: "slider-selected",
				seamlessLoop: !0,
				bodyClass: "slider-body",
				contentClass: "slider-main",
				navItem: "slider-item",
				mainClass: "slider-panel",
				prevClass: "slider-prev",
				nextClass: "slider-next",
				callback: function(a, b, c) {
					c.lazyload({
						delay: 0
					}), i()
				}
			});
			a.bind("mouseenter", function() {
				a.data("floorIsHover", !0), i()
			}), a.bind("mouseleave", function() {
				a.data("floorIsHover", !1), i()
			}), b.stopPlay(), b.autoInterval = -1, f.el.push(a), f.ui.push(b)
		}), m.bind("mouseenter", function() {
			m.find(".slider-panel").size() > 1 && $(this).find(".slider-page").show()
		}).bind("mouseleave", function() {
			$(this).find(".slider-page").hide()
		}), i());  

		function n(a, c) {
			var d = b[c];
			return d ? $.tpl(j, {
				dataIndex: 1 * a + 1,
				data: d.data,
				dataSize: k(d.data),
				tabDataExtend: d.dataExtend,
				tabDataSize: k(d.dataExtend)
			}) : ""
		}
		$("body").trigger("lazy-" + a + "-load-after")
	}
	a.init = k
});
})(jQuery);