(function() {
	var vari = {
		width: 1000,
		pics: document.getElementById("pics"),
		prev: document.getElementById("prev"),
		next: document.getElementById("next"),
		len: document.getElementById("pics").getElementsByTagName("li").length,
		intro: document.getElementById("pics").getElementsByTagName("p"),
		now: 1,
		step: 5,
		dir: null,
		span: null,
		span2: null,
		begin: null,
		begin2: null,
		end2: null,
		move: function() {
			if (parseInt(vari.pics.style.left, 10) > vari.dir * vari.now * vari.width && vari.dir == -1) {
				vari.step = (vari.step < 2) ? 1 : (parseInt(vari.pics.style.left, 10) - vari.dir * vari.now * vari.width) / 5;
				vari.pics.style.left = parseInt(vari.pics.style.left, 10) + vari.dir * vari.step + "px";
			} else if (parseInt(vari.pics.style.left, 10) < -vari.dir * (vari.now - 2) * vari.width && vari.dir == 1) {
				vari.step = (vari.step < 2) ? 1 : (-vari.dir * (vari.now - 2) * vari.width - parseInt(vari.pics.style.left, 10)) / 5;
				vari.pics.style.left = parseInt(vari.pics.style.left, 10) + vari.dir * vari.step + "px";
			} else {
				vari.now = vari.now - vari.dir;
				clearInterval(vari.begin);
				vari.begin = null;
				vari.step = 5;
				vari.width = 1000;
			}
		},
		scr: function() {
			if (parseInt(vari.span.style.top, 10) > -31) {
				vari.span.style.top = parseInt(vari.span.style.top, 10) - 5 + "px";
			} else {
				clearInterval(vari.begin2);
				vari.begin2 = null;
			}
		},
		stp: function() {
			if (parseInt(vari.span2.style.top, 10) < 0) {
				vari.span2.style.top = parseInt(vari.span2.style.top, 10) + 10 + "px";
			} else {
				clearInterval(vari.end2);
				vari.end2 = null;
			}
		}
	};
	vari.prev.onclick = function() {
		if (!vari.begin && vari.now != 1) {
			vari.dir = 1;
			vari.begin = setInterval(vari.move, 20);
		} else if (!vari.begin && vari.now == 1) {
			vari.dir = -1
			vari.width *= vari.len - 1;
			vari.begin = setInterval(vari.move, 20);
		};
	};
	vari.next.onclick = function() {
		if (!vari.begin && vari.now != vari.len) {
			vari.dir = -1;
			vari.begin = setInterval(vari.move, 20);
		} else if (!vari.begin && vari.now == vari.len) {
			vari.dir = 1
			vari.width *= vari.len - 1;
			vari.begin = setInterval(vari.move, 20);
		};
	};

})();



$(function() {
	$('.hd-rmenu li').mouseover(function() {
		var liw = $(this).width();
		$(this).find('.inner-pos,.sc-pos').css('display', 'block');
		$(this).find('.write-bar').width(liw).show();
	});
	$('.hd-rmenu li,.shop-cart').mouseout(function() {
		$(this).find('.inner-pos,.sc-pos').css('display', 'none');
		$(this).find('.write-bar').hide();
	});

	$('.area-inner .item a').click(function() {
		$('.area-inner .item a').removeClass('bg');
		$(this).addClass('bg');
	});
	$('.shop-cart').mouseover(function() {
		var liw = $(this).width();
		if ($('.ci-count').text() == 0) {
			$('.space').css('display', 'block');
			$('.shopping').css('display', 'none');
			$(this).find('.write-bar').width(liw).show();
		} else {
			$('.space').css('display', 'none');
			$('.shopping').css('display', 'block');
			$(this).find('.write-bar').width(liw).show();
		}
	});

	$('#swap_pic,.scroll').bind({
		mouseover: function() {
			$('.scroll').show();
		},
		mouseout: function() {
			$('.scroll').hide();
		}
	});
	/*轮播 S*/
	//slider
	var p = 0;
	var len = $("#imageShow li").length;

	$("#imageShow li").css({
		"z-index": 1,
		"opacity": 0
	});

	$("#imageShow li").eq(0).css({
		"z-index": 100,
		"opacity": 1
	});
	$("#scroll_dot span").click(
		function() {
			play($("#scroll_dot span").index(this));
		});

	function play(p) {
		$("#scroll_dot span").eq(p).addClass("sel").siblings().removeClass("sel");
		$("#imageShow li").eq(p).animate({
			'opacity': 1
		}, 800).css({
			'z-index': 100
		}).siblings().animate({
			'opacity': 0
		}, 800).css({
			'z-index': 1
		});
	}

	$("#imageShow .slide_prev").click(function() {
		p -= 1;
		if (p == -1) {
			p = len - 1;
		}
		showPics(p);
	});
	$("#imageShow .slide_next").click(function() {
		p += 1;
		if (p == len) {
			p = 0;
		}
		showPics(p);
	});

	function showPics(p) {
		$("#scroll_dot span").removeClass("sel").eq(p).addClass("sel");
		$("#imageShow li").stop(true, false).eq(p).animate({
			'opacity': 1
		}, 800).css({
			'z-index': 100
		}).siblings().animate({
			'opacity': 0
		}, 800).css({
			'z-index': 1
		});
	}

	function autoplay() {
		p = (p > $("#scroll_dot span").length - 2) ? 0 : (p + 1);
		play(p);
	}
	var auto = setInterval(function() {
		autoplay(p)
	}, 2000);
	$('.bannerbg_main img,.slide_btn').mouseover(function() {
		$('.qg-arrow-box').show();
	});
	$('.bannerbg_main img,.slide_btn').mouseout(function() {
		$('.qg-arrow-box').hide();
	});
	/*轮播 E*/

	/*主栏切换 S*/
	var $lis = $('.dd-inner li');
	var $boxs = $('.layer-item');

	$lis.mouseover(function() {
		var $this = $(this);
		var index = $this.index();

		$('.dropdown-layer').show();
		$lis.removeClass('itemp');
		$this.addClass('itemp');
		$boxs.hide();
		$boxs.eq(index).show();
	});
	$('.layer-item').mouseover(function() {
		var $this = $(this);
		var index = $this.index();

		$(this).show();
		$lis.eq(index).addClass('itemp');
	});
	$('.layer-item').mouseout(function() {
		$(this).hide();
		$('.dd-inner li').removeClass('itemp');
	});
	$('.dd').mouseout(function() {
		$('.layer-item').hide();
		$('.dd-inner li').removeClass('itemp');
	});
	/*主栏切换 E*/

	/*lifeserv  S*/
	var ilis = $('#lifeserv li:lt(4)');
	var idivs = $('.iframe-box iframe');

	$('#lifeserv li:lt(4)').mouseover(function() {
		var iindex = $(this).index();

		$('.iframe-pos').animate({
			top: "28px"
		});
		$('#lifeserv ul').addClass('menu-current');
		$(this).addClass('cur').siblings().removeClass('cur');
		idivs.eq(iindex).show().siblings().hide();
	});


	$('.close-btn').click(function() {
		$('.iframe-pos').animate({
			top: "228px"
		});
		/*$('#lifeserv ul').removeClass('menu-current');
		$('#lifeserv li:eq(4)').unbind();*/
	});

	/*lifeserv  E*/

	/*红线动  lazy-fn2 S*/
	$('.spacer span').bind({
		mouseover: function() {
			$('.spacer i').addClass('animation');
		},
		mouseout: function() {
			$('.spacer i').removeClass('animation');
		}
	});
	/*红线动  lazy-fn2 E*/


	/*elevator S*/

	$('.elevator li').mouseover(function() {
		$(this).addClass('hover').siblings().removeClass('hover');
	});
	$('.elevator li').mouseout(function() {
		$(this).removeClass('hover');
	});


	var h = $('.five').offset().top;
	var elis = $('.elevator li');
	var floor = $('.floor');
	var index = elis.index();

	$(window).scroll(function() {
		var ch = $(window).height(),
			fbh = $('.floor-box').offset().top;
		var bh = fbh - ch - 4;
		if ($(window).scrollTop() >= bh) {
			$('.elevator').css('display', 'block');
		} else {
			$('.elevator').css('display', 'none');
		}
	});

	/*elevator E*/

	/*toolbar S*/
	
	$(window).resize(function() {
		var wh = $(window).height();
		$('.j-global-toolbar,.pos-r,.inquiry-content').height(wh);
	});
    
    $(window).each(function() {
		var wh = $(window).height();
		$('.j-global-toolbar,.pos-r,.inquiry-content').height(wh);
	});


	$('.item-good').bind({
		mouseover: function() {
			$(this).find('.del-txt-btn').css('display', 'block');
		},
		mouseout: function() {
			$(this).find('.del-txt-btn').css('display', 'none');
		}
	});

	$('.college-menu li').mouseover(function() {
		$('.college-menu li').removeClass('cur');
		$(this).addClass('cur');
	});

	/*about-me 的切换 S*/
	var ali = $('.toolbar-tab .item');
	var adiv = $('.tb-content-item');


	ali.click(function() {
		var aindex = $(this).index();
		$('.j-global-toolbar').css('right', '270px');
		adiv.css('left', '270px');
		adiv.eq(aindex).css('left', '0');


		ali.removeClass('cur');
		$(this).addClass('cur');
		/*if($(this).hasClass('cur') && $('.j-global-toolbar').hasClass('flag')){
			$('.j-global-toolbar').css('right','0');
		}*/
	});
   
	ali.mouseover(function() {
		ali.removeClass('mouseover');
		$(this).addClass('mouseover');
		if ($(this).hasClass('cur')) {
			$(this).removeClass('mouseover');
		}
	});
	ali.mouseout(function() {
		ali.removeClass('mouseover');
	});

	/*about-me 的切换 E*/
	$('.close-btn').click(function() {
		$('.j-global-toolbar').css('right', '0');
	});
    
   /* $('body').not('.j-global-toolbar').click(function(){
   	       $('.j-global-toolbar').css('right', '0');
   });*/
	/*toolbar E*/
	/*floor S*/
	$('.floor .tab-menu li:last span').css('background', '#fff');
	$('.floor .tab-menu li').mouseover(function() {
		$(this).addClass('tab-selected').siblings().removeClass('tab-selected');
	});

	/*floor E*/

	/*clock S*/
	function clock() {
		var myDate = new Date();
		var h = myDate.getHours(); //获取当前小时数(0-23)  
		var m = myDate.getMinutes(); //获取当前分钟数(0-59)  
		var s = myDate.getSeconds(); //获取当前秒数(0-59)
		var count = h * 60 * 60 + m * 60 + s;
		var angle = (count * 36) / 4320;
		if (angle >= 360) {
			angle = angle - 360;
		}
		var a = angle + "deg";
		$("#jdClockHours").css({
			webkitTransform: "rotate(" + a + ")",
			mozTransform: "rotate(" + a + ")"
		});
	}
	clock();
	interval = setInterval(clock, 1000);  /*1.倒计定时器：timename=setTimeout("function();",delaytime);
                                            2.循环定时器：timename=setInterval("function();",delaytime);*/
	/*clock E*/

	$(window).bind("scroll", function() {
		 g = setTimeout(function() {
			var v=$('.floor');
			i(v)
		}, 200)
	});
	$(window).bind("resize", function() {
		clearTimeout(h), h = setTimeout(function() {
			i(v)
		}, 200)
	});
   
   function i(o) {           
		var a = j(o);
		
		$.each(f.ui, function(b, c) {
			a && c.el.get(0) == a.get(0) ? -1 == c.autoInterval && c.startPlay() : -1 != c.autoInterval && (c.stopPlay(), c.autoInterval = -1)
		})
		alert(o); 
	}

	/*function j(a) {
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
	}*/

})(jQuery);
 






/* product-home/1.0.0 todays.js Date:2016-03-08 10:07:32 */
/*define("product/home/1.0.0/widget/todays/todays.js", ["jdf/1.0.0/unit/trimPath/1.0.0/trimPath.js", "jdf/1.0.0/ui/switchable/1.0.0/switchable.js", "jdf/1.0.0/ui/lazyload/1.0.0/lazyload.js"], function(require, a) {
	require("jdf/1.0.0/unit/trimPath/1.0.0/trimPath.js"), require("jdf/1.0.0/ui/switchable/1.0.0/switchable.js"), require("jdf/1.0.0/ui/lazyload/1.0.0/lazyload.js");
	var c = $("#todays");
	var d = "//diviner.jd.com/diviner?p=610010&uuid=994493768&sku=&skus=&ck=_pst,aview&c1=&c2=&c3=&lid=1&lim=8&sp=&hi=&fe=&fne=&ro=&ec=gbk";
	var e = "//mercury.jd.com/log.gif?t=rec.610010&v=src=rec$errorcode=";
	var f = null;
	var g = 0;
	var h = [
		[1, 2, 2, 2],
		[1, 1, 3, 3],
		[1, 1, 3, 3],
		[1, 1, 3, 3]
	];
	var i = [];
	var j = '<div class="jd-clock-wrap"><div class="jd-clock"><div class="jd-clock-h" id="jdClockHours"></div><div class="jd-clock-m"></div><div class="jd-clock-s"></div></div></div>';
	var k = document.documentElement.style;
	var l = void 0 != k.webkitTransform || void 0 != k.MozTransform;
	var m = [];
	var n = '<a href="${t}" target="_blank"><img data-lazy-img="${imgRoot}${img}" width="250" height="164"/> </a>';
	var o = '<a href="${t}" target="_blank" fclog="${clog}"><img data-lazy-img="${imgRoot}${img}" width="250" height="164"/> </a>';
	c.html('<div class="mt" clstag="h|keycount|2015|11a">' + (l ? j : "<h2>\u4eca\u65e5\u63a8\u8350</h2>") + '</div><div class="mc slider clearfix"><ul class="slider-main"></ul><div class="slider-page" style="display: none;"><a href="javascript:void(0)" class="slider-prev" clstag="h|keycount|2015|11b1">&lt;</a><a href="javascript:void(0)" class="slider-next" clstag="h|keycount|2015|11b2">&gt;</a></div></div>');
	var p = 4;
	var q = 0;
	var r = "";
	$.each(h, function(a, b) {
		var c = [];
		$.each(b, function(b, d) {
			q++, r = 0 == a && 2 > b ? '<div style="width: 100%;height: 152px;background: #eee;text-align: center;"><img style="margin-top: 60px;" src="//misc.360buyimg.com/product/home/1.0.0/css/i/loading.gif" width="32" height="32"/> </div>' : '<a><img width="250" height="164"/> </a>', c.push('<div class="fore' + (b + 1) + '" data-source="' + d + '" data-fill="0" clstag="h|keycount|2015|11c' + (9 >= q ? "0" + q : q) + '">' + r + "</div>")
		}), m.push('<li class="slider-panel fore' + (a + 1) + '">' + c.join("") + "</li>")
	}), $(".slider-main", c).html(m.join(""));
	var s = $(".slider", c).switchable({
		type: "slider",
		hasPage: !0,
		contentClass: "slider-main",
		navItem: "slider-item",
		mainClass: "slider-panel",
		prevClass: "slider-prev",
		nextClass: "slider-next",
		speed: 600,
		step: 1,
		visible: 1,
		seamlessLoop: !0,
		includeMargin: !0,
		onNext: function() {
			g++, g > 3 && (g = 0), x(2)
		},
		onPrev: function() {
			g--, 0 > g && (g = 3), x(4)
		},
		callback: function(a, b, c) {
			p > 1 ? p-- : c.lazyload({
				space: 0
			})
		}
	});
	$(".slider", c).hover(function() {
		$(".slider-page", c).show()
	}, function() {
		$(".slider-page", c).hide()
	}), window.tempTodayRecCallback = function(a) {
		if (clearTimeout(t), a && a.success && a.data) {
			if (w(a.data), f = a.impr) {
				u(a.impr);
				var b = a.impr.indexOf("$csku=");
				b > -1 && (f = a.impr.substring(0, b + 6) + "{j_csku}", f += a.impr.substring(a.impr.indexOf("$", b + 6))), setTimeout(function() {
					$("#todays").lazyload({
						type: "fn",
						source: $("#todays .slider-main"),
						space: -50,
						onchange: function() {
							x(2)
						}
					})
				}, 0)
			}
			a.data.length < 8 && w()
		} else w();
		v(a), window.tempTodayRecCallback = void 0
	};
	var t = setTimeout(function() {
		window.tempTodayRecCallback = function() {}, w(), v(null, "timeout"), setTimeout(function() {
			window.tempTodayRecCallback = void 0
		}, 1e4)
	}, 1e3);
	$.ajax({
		url: d,
		dataType: "jsonp",
		jsonpCallback: "tempTodayRecCallback"
	}), $(".slider-main", c).delegate(".slider-panel div[data-clk]", "click", function() {
		var a = $(this);
		u(a.data("clk"))
	});

	function u(a) {
		if (a) {
			var b = new Image;
			b.src = a + "&m=UA-J2011-1&ref=" + encodeURIComponent(document.referrer) + "&random=" + Math.random(), b = null
		}
	}

	function v(a, b) {
		var c = e;
		a ? a.success ? a.data && a.data.length || u(c + "2") : u(c + "1") : u("timeout" == b ? c + "3" : c + "4")
	}

	function w(a) {
		a ? s.update(function(b) {
			var c = b.find("div[data-source=1][data-fill=0]");
			$.each(a, function(a, b) {
				var d = c.eq(a);
				d.html(2 > a ? n.process($.extend({
					imgRoot: pageConfig.FN_GetImageDomain(b.sku)
				}, b)) : n.process($.extend({
					imgRoot: pageConfig.FN_GetImageDomain(b.sku)
				}, b))), d.attr("data-clk", b.clk), d.attr("data-sku", b.sku), d.removeAttr("data-fill")
			})
		}) : y(1, i)
	}

	function x(a) {
		if (f) {
			var b = [];
			if ($(".ui-switchable-panel-selected div[data-source=1][data-sku]", c).each(function() {
					var c = $(this).data("sku");
					$.trim(c) && b.push(c)
				}), b.length > 0) {
				var d = f.replace("action=0", "action=" + a + "$index=" + g).replace("{j_csku}", b.join(","));
				u(d)
			}
		}
	}

	function y(a, b) {
		b && b.length && s.update(function(c) {
			var d = c.find("div[data-source=" + a + "][data-fill=0]");
			$.each(b, function(c, e) {
				var f = d.eq(c);
				f.length > 0 && (f.html((1 == a || 2 == a) && 2 > c ? b[c].clog ? o.process($.extend({
					imgRoot: ""
				}, e)) : n.process($.extend({
					imgRoot: ""
				}, e)) : b[c].clog ? o.process($.extend({
					imgRoot: ""
				}, e)) : n.process($.extend({
					imgRoot: ""
				}, e))), f.removeAttr("data-fill"))
			})
		})
	}

	function z(a) {
		a && a.length && (i = a)
	}
	l && ! function() {
		var a = new Date;
		var b = a.getHours();
		var c = a.getMinutes();
		var d = b % 12 * 30;
		var e = c / 2;
		var f = d + e + "deg";
		$("#jdClockHours").css({
			webkitTransform: "rotate(" + f + ")",
			mozTransform: "rotate(" + f + ")"
		})
	}(), $("#todays .mt").css("cursor", "pointer").bind("click", function() {
		window.open("http://tuijian.jd.com")
	}), a.setDefaultRecData = z, a.updateAd = y, $("body").trigger("lazy-todays-load-after")
});*/


/*slider S*/