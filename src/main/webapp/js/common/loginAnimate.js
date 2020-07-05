$(function() {
	var len = $(".focus ul li").length;
	var width = 600;
	var indent = 50;
	var index = 0;
	var picTimer;
	var btn = "<div class='btnLogin'>";
	for(var i = 0; i < len; i++) {
		btn += "<span></span>";
	}
	btn += "</div>";
	$(".focus").append(btn);
	$(".focus .btnLogin span").mouseenter(function() {
		index = $(".focus .btnLogin span").index($(this));
		play(index);
	}).eq(0).trigger("mouseenter");
	$(".focus").hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			index++;
			if(index == len) {index = 0;}
			play(index);
		},5000);
	}).trigger("mouseleave");
	function play(index) {
		var $now = $(".focus ul li.on");
		if($now.length > 0) {
			$now.find("h5").stop(true,true).animate({left:"-" + (width - indent) + "px"},400,function() {
				$(this).animate({left:"-"+ (2*width) +"px"},400);
			});
			$now.find("a.button").stop(true,true).fadeTo(400,0);
			var hideDelay = setTimeout(function() {
				$now.find("p").stop(true,true).animate({left:"-" + (width - indent) + "px"},400,function() {
					$(this).animate({left:"-"+ (2*width) +"px"},400);
					$now.find("div.imgBox").stop(true,true).animate({left:"-"+ (2*width) +"px"},400);
				});
			},200);
			var showDelayA = setTimeout(function() {
				show(index);
			},700);
		} else {
			show(index);
		}
	}
	function show(index) {
		var $next = $(".focus ul li").eq(index);
		$next.find("h5").css({left:"0px"});
		$next.find("p").css({left:"0px"});
		$next.find("a.button").css({left:"0px"});
		$next.find("div.imgBox").css({left:"0px"});
		$next.find("h5").stop(true,true).animate({left:"-"+ width +"px"},400);
		var showDelayB = setTimeout(function() {
			$next.find("div.imgBox").stop(true,true).animate({left:"-"+ width +"px"},300);
			$next.find("p").stop(true,true).animate({left:"-"+ width +"px"},300,function() {
				$next.find("a.button").stop(true,true).animate({left:"-"+ width +"px"},300,function() {$(this).fadeTo(400,1);});
			});
		},300);
		$(".focus .btnLogin span").removeClass("on").eq(index).addClass("on");
		$(".focus ul li").removeClass("on").eq(index).addClass("on");
	}
});