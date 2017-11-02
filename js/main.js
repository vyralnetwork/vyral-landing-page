test_mode = false;
test_inisec = 0


var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

readyBeforeDefinitions = [];
jQuery(document).ready(function(){

	for(i = 0; i<readyBeforeDefinitions.length;i++){
		(readyBeforeDefinitions[i])();
	}
	

	jQuery("#main_menu_link").click(function(){
		/*
		if(jQuery("body").hasClass("main_menu_open")){
			closeMainMenu();
		}else{
			openMainMenu();
		}
		
		*/
		
		animToSection(0)
	})
/*
	jQuery(".main_menu_close").click(function(){
		if(jQuery("body").hasClass("main_menu_open")){
			closeMainMenu();
		}
	})
	jQuery(".main_menu_panel_bg").click(function(){
		if(!jQuery("body").hasClass("main_menu_open")){
			openMainMenu();
		}
	})

	jQuery("#main_menu_block").swipe( {
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
			waitForFinalEvent(function(){
				if(jQuery("body").hasClass("main_menu_open")){
					closeMainMenu();
				}
			}, 50, "openMainMenu");
			
		},
		swipeRight:function(event, direction, distance, duration, fingerCount) {
			waitForFinalEvent(function(){
				if(!jQuery("body").hasClass("main_menu_open")){
					openMainMenu();
				}
			}, 50, "openMainMenu");
			
		},
		excludedElements: ""
	});
	
*/

	setActionsVideoHome()
	setUpPreloaderAnimation()
	
	if(test_mode){
		stopPreloader()
		setStartAppear()
	}
})
jQuery(window).on('load', function () {
	 setTimeout(function(){stopPreloaderFirst()}, 200)
});
pageHasLoad = false;
function stopPreloaderFirst(){
	pageHasLoad = true;
	jQuery("body").addClass("first_loaded_completed")

}
function stopPreloader(){
	jQuery("body").removeClass("ajax_loading")
	TweenMax.to("#site_preloader", .5, {autoAlpha:0})
}
function startPreloader(){
	jQuery("body").addClass("ajax_loading")
	TweenMax.to("#site_preloader", .5, {autoAlpha:1})
}



isNavOpen = false;
function openMainMenu(){
	isNavOpen = true;
	jQuery("body").addClass("main_menu_open")
	menu_block = jQuery("#main_menu_block")
	TweenMax.killTweensOf(menu_block)
	TweenMax.set(menu_block, {autoAlpha:0, left:-menu_block.width()})
	TweenMax.to(menu_block, .5, {autoAlpha:1,left:0, ease:Power3.easeOut})
	pieces_holder = menu_block.find(".main_menu_bg_pieces")
	pieces_holder.html("")
	totalPieces = 20+Math.random()*20
	for(i=0;i<totalPieces;i++){
		pieces_holder.append('<div class="main_menu_bg_piece"></div>')
	}
	bg_pieces = pieces_holder.find(".main_menu_bg_piece")
	bg_pieces.each(function(index){
		_this_piece = jQuery(this);
		new_h = jQuery(window).height() / bg_pieces.length
		TweenMax.set(_this_piece,{top:new_h*index - 1,height:new_h+2})
		TweenMax.from(_this_piece,.4,{width:0,height:0,top:"+="+(Math.ceil(Math.random()*70))+"px",ease:Power3.easeOut, delay:Math.random()*.4})
	})
	
	
	
	main_menu_link_bg = jQuery(".main_menu_link .main_menu_link_bg");
	
	TweenMax.set(main_menu_link_bg,{width:0,left:0})
	TweenMax.to(main_menu_link_bg,.3,{width:"100%",left:0,ease:Power3.easeOut})
	TweenMax.to(main_menu_link_bg,.3,{width:"0",left:"100%",ease:Power3.easeInOut, delay:.3})
	
	
	main_menu_items = jQuery("ul.main_nav_list li");
	
	//TweenMax.set("ul.main_nav_list",{perspective:400})
	TweenMax.set(main_menu_items,{left:"-100px",autoAlpha:0, position:"relative"})
	TweenMax.staggerTo(main_menu_items,.5,{delay:.4,left:0,autoAlpha:1,ease:Power3.easeOut,clearProps:"rotationY,opacity,visibility"},.1)

	jQuery("#main_menu_block .menu_item_deco_line").each(function(){
		_this_line = jQuery(this);
		TweenMax.killTweensOf(_this_line)
		TweenMax.set(_this_line,{left:((Math.random()*20-10)-40)+"%"})
		TweenMax.from(_this_line,1+Math.random()*2,{left:"-100%", ease:Power3.easeOut, delay:Math.random()*.3})
	})
	TweenMax.killTweensOf(".l-main")
	TweenMax.set(".l-main",{position:"relative"})
	TweenMax.to(".l-main",.7,{left:menu_block.width()+"px", ease:Power3.easeOut, delay:.3})
}

function closeMainMenu(){
	isNavOpen = false;
	jQuery("body").removeClass("main_menu_open")
	TweenMax.killTweensOf("#main_menu_block")
	TweenMax.to("#main_menu_block", .5, {autoAlpha:0, ease:Power3.easeInOut})
	
	menu_block = jQuery("#main_menu_block")
	pieces_holder = menu_block.find(".main_menu_bg_pieces")
	bg_pieces = pieces_holder.find(".main_menu_bg_piece")
	bg_pieces.each(function(index){
		_this_piece = jQuery(this);
		TweenMax.killTweensOf(_this_line)
		TweenMax.to(_this_piece,.3,{width:0,height:0,top:"+="+(Math.ceil(Math.random()*70))+"px",ease:Power3.easeOut, delay:Math.random()*.3})
	})
	
	
	main_menu_link_bg = jQuery(".main_menu_link .main_menu_link_bg");
	
	TweenMax.set(main_menu_link_bg,{width:0,left:"100%"})
	TweenMax.to(main_menu_link_bg,.3,{width:"100%",left:0,ease:Power3.easeOut})
	TweenMax.to(main_menu_link_bg,.3,{width:"0",left:0,ease:Power3.easeInOut, delay:.3})
	
	
	TweenMax.killTweensOf(".l-main")
	TweenMax.to(".l-main",.5,{left:0, ease:Power3.easeOut, clearProps:"position,left"})

}








var pcIniDate = new Date();
console.log(pcIniDate);
var offset = pcIniDate.getTimezoneOffset()*60*1000;
//var NYCtimeoffset = -400*60*1000;
//Coordinated with GMT Universal, which is 4 hours ahead NYC, so 15h GMT is 11am NYC
var countdownEndDate = new Date("December 1, 2017 15:00:00");
countdownEndDate.setTime(countdownEndDate.getTime() - offset);
var countdownEndDate_time = countdownEndDate.getTime();


var countdown_internval;

jQuery(document).ready(function(){
	// Update the count down every 1 second
	printDateCountdown()
	countdown_internval = setInterval(printDateCountdown, 1000);
})
function printDateCountdown(){


	  // Get todays date and time
	  var now = new Date();
	  now = now.getTime();

	  // Find the distance between now an the count down date
	  var distance = countdownEndDate_time - now;

	  // Time calculations for days, hours, minutes and seconds
	  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	  // Display the result in the element with id="demo"
	  
		printDateValue(jQuery("#value_days"), days)
		printDateValue(jQuery("#value_hours"), hours)
		printDateValue(jQuery("#value_mins"), minutes)
		printDateValue(jQuery("#value_secs"), seconds)


		if(days == 0){
			jQuery("#countdown_home").addClass("less_than_a_day");
		}else{
			jQuery("#countdown_home").removeClass("less_than_a_day");
		}
	  // If the count down is finished, write some text
	  if (distance < 1000) {
		clearInterval(countdown_internval);
		jQuery("#countdown_home").addClass("less_than_a_day");
		jQuery("#value_days").html(0);
		jQuery("#value_hours").html(0);
		jQuery("#value_mins").html(0);
		jQuery("#value_secs").html(0);
		jQuery("#countdown_home").addClass("finished");
		
	  }
	
}
function printDateValue(_target, _value){
	current_value = _target.html();
	if(current_value != _value && typeof _value == 'number' && _value > -1){
		_target.html(_value)
		TweenMax.killTweensOf(_target);
		TweenMax.set(_target,{scale:.7 });
		TweenMax.to(_target,.5,{scale:1,  ease:Power3.easeOut});
	}else if(typeof _value != 'number' && _value < 0){
		_target.html("0")
	}
}


jQuery(document).ready(function(){
	//setAnimatedLines()
	
})
color_pallete = [
"#7C6E91",
"#352458",
"#685C82",
"#594E70",
"#3F3357",
"#6C5E81"
]
function getRandColor(){
	return color_pallete[Math.floor(Math.random()*color_pallete.length)]
}
function setAnimatedLines(){
	for(i=0;i<10;i++){
		createNewAnimatedLine()
	}
	setTimeout(doGlitch, Math.round(Math.random()*3000)+3000)
}
function createNewAnimatedLine(){
	new_line = jQuery('<div class="background_animated_line"></div>')
	nH = Math.floor(Math.random()*4)+1
	nAlpha = Math.random()*.4+.2
	rand_color=getRandColor();
	gradient_color = "-webkit-linear-gradient(left, "+hexToRgbA(rand_color,0)+" 0%,"+hexToRgbA(rand_color,1)+" 10%,"+hexToRgbA(rand_color,1)+" 100%)";
	//gradient_color = rand_color;
	TweenMax.set(new_line,{top:(Math.random()*100)+"%", width:0,height:nH+"px",opacity:nAlpha, background:gradient_color});

	jQuery("#background_animated_lines").append(new_line);
	
	TweenMax.to(new_line,6+Math.random()*6,{width:"100%", ease:Power1.easeIn, delay:Math.random()*10, onComplete:selfCreateNewLine, onCompleteParams:[new_line]});
	
}
function hexToRgbA(hex, opacity){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+opacity+')';
    }
    throw new Error('Bad Hex');
}
function selfCreateNewLine(_self){
	TweenMax.to(_self,6+Math.random()*6,{width:"0",right:"100%", autoAlpha:0, ease:Power1.easeIn, onComplete:selfDestroyLine, onCompleteParams:[_self]});
	createNewAnimatedLine()
}
function selfDestroyLine(_self){
	_self.remove()
}

glitchCount = 0;
doingGlitch = false;
function doGlitch(){
	jQuery("#background_animated_lines .background_animated_line").each(function(){
		
		_self = jQuery(this)
		if(Math.random() > .8){
			TweenMax.set(_self,{top:(Math.random()*100)+"%"});
		}

	})
	glitchCount++;
	if(glitchCount > 10){
		glitchCount = 0;
		setTimeout(doGlitch, Math.round(Math.random()*3000)+3000)
	}else{
		glitchCount++;
		setTimeout(doGlitch, Math.round(Math.random()*20)+10)
	}
	
}






var tl_start = new TimelineMax();
function setStartAppear(){
		
		vyral_logo = jQuery(".vyral_logo")
		countdown_items = jQuery("#countdown_home .countdown_date_item")
		play_button = jQuery(".play_button_block")
		play_button_bg = jQuery(".play_button_block .play_button .block_button_bg")
		home_background_block = jQuery(".home_background_block")
		
		home_copy_text = jQuery(".home_copy_text_block")
		home_copy_title = jQuery(".home_copy_title_block")
		
		tl_start = new TimelineMax({
			onComplete:function(){}	
		
		});
			
		tl_start.set([home_copy_text,home_copy_title,vyral_logo],{position:"relative"})
				.set(countdown_items,{autoAlpha:0,top:100, position:"relative"})
				.set(play_button,{autoAlpha:0, scale:0})
				.set(play_button_bg,{transition:"none"})
				.from(home_background_block,.6,{autoAlpha:0,ease:Power3.easeOut,clearProps:"opacity,visibility"})
				.staggerTo(countdown_items,.4,{autoAlpha:1, scale:1,top:0, ease:Power3.easeOut},.1)
				.to(play_button,.4,{autoAlpha:1, scale:1, ease:Power3.easeOut},"=-.2")
				.to(play_button_bg,.4,{rotation:"+=180", ease:Power3.easeOut,clearProps:"scale,opacity,visibility"},"=-.4")
				.set(play_button_bg,{rotation:"-=180",clearProps:"transition,rotation"})
				.from(home_copy_text,.4,{autoAlpha:0, left:-200, ease:Power3.easeOut,clearProps:"scale,opacity,visibility,left"},"=-.4" )
				.from(home_copy_title,.4,{autoAlpha:0,  left:-200, ease:Power3.easeOut,clearProps:"scale,opacity,visibility,left"},"=-.3")
				.from(vyral_logo,.4,{autoAlpha:0, left:-200, ease:Power3.easeOut,clearProps:"scale,opacity,visibility,left"},"=-.3")
				
		
		
		
		tl_start.play(0)
}


home_video_src = "";
function setActionsVideoHome(){
	
	home_video_src = jQuery(".video_lightbox .the_video iframe").attr("src")
	
	video_block = jQuery(".video_lightbox")
	
	TweenMax.set(video_block,{autoAlpha:0})
	
	jQuery(".video_lightbox .video_player_bg,.video_lightbox .video_button_back").click(function(){
		closeVideoHome();
	})
	jQuery(".play_button_block").click(function(){
		openVideoHome();
	})
}
function openVideoHome(){
	video_block = jQuery(".video_lightbox")
	video_player_bg = jQuery(".video_lightbox .video_player_bg ")
	video_player = jQuery(".video_lightbox .the_video")
	TweenMax.to(video_block,.2,{autoAlpha:1, ease:Power3.easeOut})
	TweenMax.set(video_player_bg,{width:0})
	TweenMax.to(video_player_bg,.6,{width:"100%", ease:Power3.easeOut})
	
	TweenMax.set(video_player.parent(),{perspective:1200})
	TweenMax.set(video_player,{scale:.8,top:100,autoAlpha:0, rotationX:-90,transformStyle:"preserve-3d"})
	TweenMax.to(video_player,.7,{scale:1,autoAlpha:1,top:0,rotationX:0, ease:Power3.easeOut,delay:.3, clearProps:"transform,top,opacity,visibility,scale"})
}
function closeVideoHome(){
	video_block = jQuery(".video_lightbox")
	video_player_bg = jQuery(".video_lightbox .video_player_bg ")
	video_player = jQuery(".video_lightbox .the_video")
	
	TweenMax.to(video_block,.4,{autoAlpha:0, ease:Power3.easeOut,delay:.3, onComplete:clearVideoPlayerHome })
	TweenMax.to(video_player_bg,.5,{width:0, ease:Power3.easeOut, delay:.1})
	
	TweenMax.to(video_player,.3,{scale:.8,autoAlpha:0, ease:Power3.easeOut})
}
function clearVideoPlayerHome(){
	video_player_iframe = jQuery(".video_lightbox .the_video iframe");
	video_player_iframe.attr("src", "")
	video_player_iframe.attr("src", home_video_src)
	
}

















var tl_intro = new TimelineMax()
function setUpPreloaderAnimation(){
	var logo_preloader = jQuery("#vyral_logo_svg_loading")
	var line_1 = logo_preloader.find(".logo_svg_linea_1")
	var line_2 = logo_preloader.find(".logo_svg_linea_2")
	var line_3 = logo_preloader.find(".logo_svg_linea_3")
	var line_4 = logo_preloader.find(".logo_svg_linea_4")
	var line_5 = logo_preloader.find(".logo_svg_linea_5")
	var pieces_white = logo_preloader.find(".logo_white")
	
	
	
		tl_intro = new TimelineMax({
			onComplete:function(){
				if(pageHasLoad){
					stopPreloader()
					setStartAppear()
					setUpLogoAnimation()
					waitForFinalEvent(function(){
						tl_logo_home.play(0);
					}, 750, "tl_logo_home");
				}else{
					this.play(0);
				}
				
			}	
		
		});
			
		tl_intro.set(line_2,{transformOrigin:"center bottom"})
				.set(line_3,{transformOrigin:"right center"})
				.set(pieces_white,{transformOrigin:"center center"})
				.from(line_1,.3,{scaleX:0})
				.from(line_2,.3,{scaleY:0}, "=-.05")
				.from(line_3,.4,{scaleX:0}, "=-.05")
				.from(line_4,.3,{scaleY:0}, "=-.05")
				.from(line_5,.3,{scaleX:0}, "=-.05")
				.staggerFrom(pieces_white,.2,{scale:0}, .03, "=-.2")
				.set(line_1,{transformOrigin:"right center"})
				.set(line_2,{transformOrigin:"center top"})
				.set(line_3,{transformOrigin:"left center"})
				.set(line_4,{transformOrigin:"center bottom"})
				.set(line_5,{transformOrigin:"right center"})
				.to(line_1,.2,{scaleX:0})
				.to(line_2,.2,{scaleY:0}, "=-.05")
				.to(line_3,.3,{scaleX:0}, "=-.05")
				.to(line_4,.2,{scaleY:0}, "=-.05")
				.to(line_5,.2,{scaleX:0}, "=-.05")
				.staggerTo(pieces_white,.3,{scale:0, ease:Power3.easeInOut}, .03, "=-.4")
				
		
	
	tl_intro.play(0);
	
	

}






var tl_logo_home = new TimelineMax()
function setUpLogoAnimation(){
	var logo_home = jQuery("#vyral_logo_svg")
	var line_1 = logo_home.find(".logo_svg_linea_1")
	var line_2 = logo_home.find(".logo_svg_linea_2")
	var line_3 = logo_home.find(".logo_svg_linea_3")
	var line_4 = logo_home.find(".logo_svg_linea_4")
	var line_5 = logo_home.find(".logo_svg_linea_5")
	var pieces_white = logo_home.find(".logo_white")
	TweenMax.set([line_1,line_2,line_3,line_4,line_5],{scaleX:1,scaleY:1, clearProps:"transformOrigin"})
	TweenMax.set(pieces_white,{scale:1,transformOrigin:"center center"})
	
	//pieces_white.attr("transform","")
	
	
	
	top_pieces = logo_home.find("#logo_svg_texto_top .logo_white")
	bottom_pieces = logo_home.find("#logo_svg_texto_bottom .logo_white")
	
		tl_logo_home = new TimelineMax({
			onComplete:function(){
				setUpLogoAnimation()
				tl_logo_home.play(0)
			}	
		
		});
			
		tl_logo_home.set(line_2,{transformOrigin:"center bottom"})
				.set(line_3,{transformOrigin:"right center"})
				.set(pieces_white,{transformOrigin:"center center"})
				.set(top_pieces,{x:-3})
				//.set(bottom_pieces,{x:0})
				.from(line_1,.3,{scaleX:0})
				.from(line_2,.3,{scaleY:0}, "=-.05")
				.from(line_3,.4,{scaleX:0}, "=-.05")
				.from(line_4,.3,{scaleY:0}, "=-.05")
				.from(line_5,.3,{scaleX:0}, "=-.05")

				.staggerFrom(pieces_white,.2,{scale:0, clearProps:"scale"}, .03, "=-.2")
			
				.staggerTo(top_pieces,.3,{x:0, ease:Power3.easeInOut, clearProps:"scale,x"}, .05, "=-.3")
				.set(pieces_white,{transformOrigin:"center center"})

				.set(line_1,{transformOrigin:"right center", delay:6})
				.set(line_2,{transformOrigin:"center top"})
				.set(line_3,{transformOrigin:"left center"})
				.set(line_4,{transformOrigin:"center bottom"})
				.set(line_5,{transformOrigin:"right center"})
				.to(line_1,.2,{scaleX:0})
				.to(line_2,.2,{scaleY:0}, "=-.05")
				.to(line_3,.3,{scaleX:0}, "=-.05")
				.to(line_4,.2,{scaleY:0}, "=-.05")
				.to(line_5,.2,{scaleX:0}, "=-.05")
				.set(pieces_white,{transformOrigin:"center center"})
				.staggerTo(pieces_white,.3,{scale:0, ease:Power3.easeInOut}, .03, "=-.4")
				
		
	
	

	

}




jQuery(window).resize(function(){
	resizeBgImages()
	waitForFinalEvent(function(){
		resizeBgImages();
	}, 30, "resizeBgImages");
})
jQuery(document).ready(function(){
	resizeBgImages()
	//startBgGlitch()
	setBgSlider()
})

function resizeBgImages(){
	jQuery(".home_background_image_left_copy").each(function(){
		_this = jQuery(this);
		_original = _this.closest(".home_background_image").find(".home_background_image_left");
		TweenMax.set(_this, {width:_original.width(),height:_original.height()});
	})
	jQuery(".home_background_image_left_pieces").each(function(){
		_base = jQuery(this)
		_pieces = _base.find(".home_background_image_left_piece");
		_totalPieces = _pieces.length;
		_pieces.each(function(index){
			_this = jQuery(this);
			_image = _this.find(".home_background_image_left_piece_img");
			_original = _this.closest(".home_background_image").find(".home_background_image_left");
			newH = jQuery(window).height()/_totalPieces;
			newTop = newH * index;
			
			TweenMax.set(_this, {top:newTop,height:newH});
			TweenMax.set(_image, {width:_original.width(),height:_original.height(),top:-newTop});
		})
	})
}
function animateBgImages(_slide){
	
	_imageleft = _slide.find(".home_background_image_left")
	_imageright = _slide.find(".home_background_image_right")
	_pieces_container = _slide.find(".home_background_image_left_pieces");
	_pieces_container.html("")
	TweenMax.set(_imageleft,{autoAlpha:1})

	for(i = 0; i < Math.random()*10+10 ; i++){
		_pieces_container.append('<div class="home_background_image_left_piece"><div class="home_background_image_left_piece_img"></div></div>')
	}
	
	resizeBgImages()
	
	TweenMax.set(_slide,{autoAlpha:1})
	
	TweenMax.set(_imageright,{width:0})
	TweenMax.to(_imageright,1,{width:"50%",ease:Power3.easeInOut, clearProps:"width"})

	_pieces = _slide.find(".home_background_image_left_piece")
	TweenMax.set(_imageleft,{autoAlpha:0})
	_pieces.each(function(){
		TweenMax.from(jQuery(this),1,{width:0,height:0,top:"+="+(Math.ceil(Math.random()*70))+"px",ease:Power3.easeInOut, delay:Math.random()*.7,onComplete:resizeBgImagesDelay,onCompleteParams:[_slide]})
	})
}

function  resizeBgImagesDelay(_targetslide){
	waitForFinalEvent(function(){
		_imageleft = _targetslide.find(".home_background_image_left")
		TweenMax.to(_imageleft,.3,{autoAlpha:1})
		resizeBgImages();
		
		waitForFinalEvent(function(){
			showNextBgSlide();
		}, 7000, "showNextBgSlide");
		
	}, 500, "resizeBgImagesDelay");
}

currentBgSlide = -1;
function setBgSlider(){
	bg_slides = jQuery(".home_background_images .home_background_image")
	TweenMax.set(bg_slides,{autoAlpha:0})
	showNextBgSlide();
	
}
function showNextBgSlide(){
	bg_slides = jQuery(".home_background_images .home_background_image")
	
	if(currentBgSlide != -1){
		current_slide = bg_slides.eq(currentBgSlide)
		TweenMax.to(current_slide,.5,{autoAlpha:0,ease:Power1.easeIn,delay:1})
	}
	bg_slides.removeClass("current_bgslide")
	
	currentBgSlide++;
	if(currentBgSlide > bg_slides.length-1){
		currentBgSlide = 0;
	}
	current_slide = bg_slides.eq(currentBgSlide)
	current_slide.addClass("current_bgslide")
	animateBgImages(current_slide);
	/*
	waitForFinalEvent(function(){
		showNextBgSlide();
	}, 7000, "showNextBgSlide");*/
	
}











function startBgGlitch(){
	jQuery(".home_background_image_glitch").each(function(){
		_this = jQuery(this);
		TweenMax.set(_this, {autoAlpha:0});
	})
	waitForFinalEvent(function(){
		doBgGlitch();
	}, 3000, "doBgGlitch");
}

bgGlitchCount = 0;
bgGlitchTotalTimes = Math.ceil(Math.random()*5)+3;
function doBgGlitch(){
	
	jQuery(".home_background_image.current_bgslide home_background_image_glitch .home_background_image_glitch").each(function(){
		_this = jQuery(this);
		_inner_image = _this.find(".home_background_image_left_copy");
		randH = Math.random()*50+5; 
		randTop = Math.random()*jQuery(window).height(); 
	
		TweenMax.to(_this,.1, {top:randTop,height:randH, autoAlpha:1, ease:Power3.easeOut});
		TweenMax.to(_inner_image, .1,{top:-randTop+Math.random()*30-15, ease:Power3.easeOut});
	})
	if(bgGlitchCount < bgGlitchTotalTimes){
		waitForFinalEvent(function(){
			doBgGlitch();
		}, Math.random()*50+50, "doBgGlitch");
		bgGlitchCount++;
	}else{
		bgGlitchCount = 0;
		bgGlitchTotalTimes = Math.ceil(Math.random()*5)+3;
		jQuery(".home_background_image_glitch").each(function(){
			_this = jQuery(this);
			TweenMax.set(_this, {autoAlpha:0});
		})
		waitForFinalEvent(function(){
			doBgGlitch();
		}, Math.random()*3000+3000, "doBgGlitch");
		
	}
	
}
















/**************

Fullscreen sections actions

***************/




fullScreenSections = "";
jQuery(document).ready(function(){
	
	
	
	
	updateFullscreenSections()
	jQuery(".l-section-video video").each(function(){
		jQuery(this).get(0).pause();
	});
	
	setControls()
	setCurrentSec()
	jQuery("body").unmousewheel(mouseWheelWork);
	jQuery("body").mousewheel(mouseWheelWork);
	
	
	if(test_mode && test_inisec > -1){
		animToSection(test_inisec)
	}
})


function setControls(){
	cloneStepStr = jQuery("#portfolio_control_step_clone").html();
	stepsStr = "";
	jQuery("#portfolio_control_steps").html("");
	fullScreenSections.each(function(index){
		name = jQuery(this).attr("nav_name")
		if(name == undefined || name == "undefined") name = "";
		name = decodeURIComponent(name.replace(/\+/g, '%20'));
		thisstep = cloneStepStr;
		thisstep = thisstep.replace("%name%", name); 
		thisstep = thisstep.replace("%section_index%", index); 
		thisstep = jQuery(thisstep)
		if(name =="" ) thisstep.addClass("hiddenStep")
		//stepsStr += thisstep;
		jQuery("#portfolio_control_steps").append(thisstep)
	})
	if(fullScreenSections.length <= 1){
		jQuery("#site_portfolio_controls").fadeOut();
	}else{
		jQuery("#site_portfolio_controls").fadeIn();
	}
	
	jQuery(".portfolio_control_step").click(function(){
		animToSection(jQuery(this).attr("section_index"))
	})
	
	fixLabelPosition()

	
	jQuery(".portfolio_control_arrow_up").unbind("click").click(function(e){
		e.preventDefault();
		animToSectionPrev()
	})
	jQuery(".portfolio_control_arrow_down").unbind("click").click(function(e){
		e.preventDefault();
		animToSectionNext()
	})
	
	
}
function updateControls(){
	jQuery("#site_portfolio_controls .portfolio_control_step.current").removeClass("current")
	if(currentSection > -1)
	jQuery("#site_portfolio_controls .portfolio_control_step").eq(currentSection).addClass("current")
}
if(typeof secIntroFunctionQueue == 'undefined')
	secIntroFunctionQueue = []
function animateSecIntro(){
	console.log("Sec Intro "+currentSection)
	animateSecs = fullScreenSections.eq(currentSection).find(".animate_afb,.animate_afl,.animate_afr").not(".animate_start")
	TweenMax.killTweensOf(animateSecs);
	TweenMax.to(animateSecs, .01, {delay:+.2,className:"+=animate_start"});

	for(i = 0; i<secIntroFunctionQueue.length;i++){
		(secIntroFunctionQueue[i])(fullScreenSections.eq(currentSection));
	}
	

	
}
if(typeof secOutFunctionQueue == 'undefined')
	secOutFunctionQueue = []
function animateSecOut(index){
	animate_elements = fullScreenSections.eq(index).find(".animate_afb,.animate_afl,.animate_afr")
	TweenMax.killTweensOf(animate_elements);
	TweenMax.to(animate_elements, .01, {delay:.4, onComplete:checkIfCurrentSec,onCompleteParams:[index]});
	for(i = 0; i<secOutFunctionQueue.length;i++){
		(secOutFunctionQueue[i])(fullScreenSections.eq(index));
	}
}
function checkIfCurrentSec(index){
	if(index != currentSection){
		animate_elements = fullScreenSections.eq(index).find(".animate_afb,.animate_afl,.animate_afr")
		TweenMax.set(animate_elements, {className:"-=animate_start"});
	}
}


secScrollIsAnim = -1;
function unlockScroll(){
	setCurrentSec()
	waitForFinalEvent(function(){
      unlockScroll_fn()
    }, 500, "unlockScroll");
}
function unlockScroll_fn(){
	secScrollIsAnim = 0;
	
}

function updateFullscreenSections(){

	fullScreenSections = [];
	fullScreenSections = jQuery(".l-main .l-section.height_full");
	if(fullScreenSections.length > 1){
		jQuery("body").addClass("hasControls")
	}else{
		jQuery("body").removeClass("hasControls")
	}

}
minDif = 9999;
currentSection = -1
function setCurrentSec(){
	if(fullScreenSections.length > 0){
		currentScroll = jQuery(window).scrollTop();
		currentSec = -1;
		minDif = 9999;
		//console.log(currentSec)
		fullScreenSections.each(function(index){
			secpos = jQuery(this).offset().top
			if(secpos-currentScroll < minDif){
				currentSec = index;
				minDif = currentScroll-secpos;
			}
		})
		//console.log("currentSection: "+currentSection+" currentSec: "+currentSec)
		if(currentSec != -1){
			setCurrentSec_num(currentSec)
		}
	}
}
function setCurrentSec_num(new_sec){
	currentSec = new_sec
	if(currentSection != currentSec){
		if(currentSection != -1){
			fullScreenSections.eq(currentSection).removeClass("current_section")
			animateSecOut(currentSection)
		}
		currentSection = currentSec;
		fullScreenSections.eq(currentSection).addClass("current_section")
		
		if(fullScreenSections.eq(currentSection).hasClass("color_alternate")){
			jQuery("body").addClass("controls_light_color")
		}else{
			jQuery("body").removeClass("controls_light_color")
		}
		updateControls();
		animateSecIntro();
	}
}

function mouseWheelWork(event, delta){
	
		if(isNavOpen){
			event.preventDefault();
		}else if(secScrollIsAnim == 1){
			event.preventDefault();
		}else if(jQuery(window).width() < 800){
			
		}else if(fullScreenSections.length > 1){
			body = jQuery("html, body");
			currentScroll = jQuery(window).scrollTop();
			windowHeight = jQuery(window).height();
			setCurrentSec()
			currentSec = currentSection;
			
			if(delta > 0 && currentSec > 0){
				if(currentSec-1 >= 0 && minDif <= 0){
					event.preventDefault();
					animToSection_delay(currentSec-1)
				}
			}else if(delta < 0){
				if(currentSec+1 <= fullScreenSections.length-1 
					 && (fullScreenSections.eq(currentSec).height() + fullScreenSections.eq(currentSec).offset().top - currentScroll <= windowHeight )
					){
					event.preventDefault();
					animToSection_delay(currentSec+1)
					
				}
			}
		}
	
}
function animToSection_delay(index){
	waitForFinalEvent(function(){
		animToSection(index)
    }, 10, "animToSection");
}
function animToSection(index){
	console.log("animToSection:"+index)
	if(secScrollIsAnim != 1){
		
		setCurrentSec_num(index)
		body = jQuery("html, body");
		secScrollIsAnim = 1;
		TweenMax.killTweensOf(body);
		if(fullScreenSections.length == 0) to_scrollTop = 0
		else to_scrollTop = fullScreenSections.eq(index).offset().top;
		
		TweenMax.to(body, .7, {scrollTop:to_scrollTop, ease:Power3.easeInOut, onComplete:unlockScroll})
	}
}

function animToSectionNext(){
	index = currentSection+1;
	if( index <= fullScreenSections.length-1 )
		animToSection(index)
}
function animToSectionPrev(){
	index = currentSection-1;
	if( index >= 0 )
		animToSection(index)
}

jQuery(document).scroll(function (event) {
	if(secScrollIsAnim != 1)
    checkCurrentSection()
});
jQuery(window).resize(function (event) {
	resizeSections()
});
function checkCurrentSection(){
	waitForFinalEvent(function(){
		if(secScrollIsAnim != 1)
		checkCurrentSection_fn()
    }, 50, "checkCurrentSection");
}
function checkCurrentSection_fn(){
	if(secScrollIsAnim != 1)
	setCurrentSec()
}

function resizeSections(){
		waitForFinalEvent(function(){
		resizeSections_fn();
		}, 50, "resizeSections_fn");
}
function resizeSections_fn(){
	
	if(secScrollIsAnim != 1){
		currentSection_temp = currentSection
		waitForFinalEvent(function(){
			if(jQuery(window).width() > 800){
				animToSection(currentSection_temp);
			}
		
		}, 20, "animToSection");
		
	}

	fixLabelPosition()
}

function fixLabelPosition(){
	waitForFinalEvent(function(){
		fixLabelPosition_fn()
	}, 50, "fixLabelPosition");
}
function fixLabelPosition_fn(){

	jQuery(".portfolio_control_step").each(function(){
		_h = jQuery(this).height()
		_label = jQuery(this).find(".portfolio_control_step_label");
		TweenMax.set(_label, {transition:"none"})
		TweenMax.set(_label, {top:(_h/2-_label.height()/2)})
		waitForFinalEvent(function(){
			TweenMax.set(".portfolio_control_step_label", {clearProps:"transition"})
		}, 10, "fixLabelPositionTransitions");
		
	})

	
}




















/* document ready: */
readyBeforeDefinitions.push(site_ready_before);
function site_ready_before(){

	fadeInElements = jQuery(".sequenced_fadein")
	TweenMax.killTweensOf(fadeInElements)
	TweenMax.set(fadeInElements,{autoAlpha:0,scale:.7})	
	
	bg_lights = jQuery.find(".background_light_filter_corners");
	TweenMax.killTweensOf(bg_lights)
	TweenMax.set(bg_lights,{autoAlpha:0})
	
	
}


secIntroFunctionQueue.push(site_secintro);
function site_secintro(_currentsec){
		
		
		
		fadeInDelay = .5;
		if(jQuery(window).width() < 1000){
			fadeInDelay = 0;
		}

		fadeInElements = _currentsec.find(".sequenced_fadein")
		TweenMax.killTweensOf(fadeInElements)
		TweenMax.staggerTo(fadeInElements,.5,{delay:fadeInDelay,autoAlpha:1,scale:1,ease:Power3.easeOut,clearProps:"opacity,visibility,transform,scale"},.1)
		
		bg_lights = _currentsec.find(".background_light_filter_corners");
		TweenMax.killTweensOf(bg_lights)
		TweenMax.to(bg_lights,1,{delay:fadeInDelay,autoAlpha:1,ease:Power1.easeInOut,clearProps:"opacity,visibility"})
		
		
		/* tokens intro animations: */
		lines_h = _currentsec.find(".ti_deco_line_h");
		lines_v = _currentsec.find(".ti_deco_line_v");
		token_icons = _currentsec.find(".token_item_icon");
		TweenMax.set(_currentsec.find(".token_item_content"), {perspective:600});
		TweenMax.killTweensOf(lines_h)
		TweenMax.killTweensOf(lines_v)
		TweenMax.killTweensOf(token_icons)
		TweenMax.set(lines_v, {clearProps:"height"})
		TweenMax.set(lines_h, {clearProps:"width"})
		TweenMax.set(token_icons, {clearProps:"scale,rotationY,transform,autoAlpha,opacity,visibility"})
		TweenMax.staggerFrom(lines_h,.3,{delay:fadeInDelay+.25,width:0,ease:Power1.easeOut,clearProps:"width"}, .5)
		TweenMax.staggerFrom(lines_v,.3,{delay:fadeInDelay,height:0,ease:Power1.easeOut,clearProps:"height"}, .5)
		TweenMax.staggerFrom(token_icons,1,{delay:fadeInDelay,scale:.7,autoAlpha:0,rotationY:-180,ease:Back.easeOut,clearProps:"scale,rotationY,transform,autoAlpha,opacity,visibility"}, .5)
		
		
		
		/* circle charts intro animations: */
		TweenMax.set(_currentsec.find(".circle_chart_item_content"), {perspective:600});
		circle_active = _currentsec.find(".circle_active");
		TweenMax.killTweensOf(circle_active)
		circle_active.each(function(){
			TweenMax.set(jQuery(this), {strokeDasharray:jQuery(this).attr("data-stroke-dasharray") })
		})
		TweenMax.staggerFrom(circle_active, 1, {delay: fadeInDelay,strokeDasharray:"0 566" }, .5)
		
		circle_clock = _currentsec.find(".circle_clock")
		TweenMax.killTweensOf(circle_clock)
		TweenMax.set(circle_clock, {strokeDasharray:circle_clock.attr("data-stroke-dasharray") })
		TweenMax.from(circle_clock, 1, {delay: fadeInDelay + 2,strokeDasharray:"1 566" })
		
		circle_data = _currentsec.find(".circle_chart_icon_data_block");
		TweenMax.killTweensOf(circle_data)
		TweenMax.set(circle_data, {clearProps:"all"})
		TweenMax.staggerFrom(circle_data, .5, {delay: fadeInDelay,autoAlpha:0, ease:Power3.easeOut, clearProps:"all"}, .5)
		
		circle_bg = _currentsec.find(".circle_chart_icon_bg_block");
		TweenMax.killTweensOf(circle_bg)
		TweenMax.set(circle_bg, {clearProps:"all"})
		TweenMax.staggerFrom(circle_bg, .7, {delay: fadeInDelay,rotationY:180,autoAlpha:0, ease:Back.easeOut, clearProps:"all"}, .5)
		
		circle_constelacion = _currentsec.find(".circle_chart_icon_bg_dots");
		TweenMax.killTweensOf(circle_constelacion)
		TweenMax.set(circle_constelacion, { transition:"none", clearProps:"width,height,left,top,opacity"})
		TweenMax.staggerFrom(circle_constelacion, 2, {delay:fadeInDelay ,width:"100%",height:"100%", opacity:0,left:"0%",top:"0%", ease:Power1.easeInOut, clearProps:"all"}, .5)
		
		
		roadm_hlines = _currentsec.find(".roadmap_hline .line_color_fill");
		TweenMax.killTweensOf(roadm_hlines)
		TweenMax.set(roadm_hlines, { transition:"none", clearProps:"width,height,left,top,opacity"})
		TweenMax.staggerFrom(roadm_hlines, .4, {delay:fadeInDelay ,width:0, ease:Linear.easeNone, clearProps:"all"}, .35)
		
		if(_currentsec.find(".roadmap_block").length > 0){
			roadMapAnimTo(0)
		}
		
		roadm_vlines = _currentsec.find(".roadmap_vline");
		TweenMax.killTweensOf(roadm_vlines)
		TweenMax.set(roadm_vlines, { transition:"none", clearProps:"scale,transform"})
		TweenMax.staggerFrom(roadm_vlines, .3, {delay:fadeInDelay ,scale:0, ease:Power3.easeOut, clearProps:"all"}, .2)
		

		roadm_numbs = _currentsec.find(".roadmap_topnumber");
		TweenMax.set(roadm_numbs.parent(), {perspective:600});
		TweenMax.killTweensOf(roadm_numbs)
		TweenMax.set(roadm_numbs, { transition:"none", clearProps:"scale,transform"})
		TweenMax.staggerFrom(roadm_numbs, .6, {delay:fadeInDelay ,rotationY:-90, ease:Power3.easeOut, clearProps:"all"}, .3)
		
		roadm_copy = _currentsec.find(".roadmap_copy");
		TweenMax.set(roadm_copy.parent(), {perspective:600});
		TweenMax.killTweensOf(roadm_copy)
		TweenMax.set(roadm_copy, { transition:"none", clearProps:"scale,transform,opacity,visibility"})
		TweenMax.staggerFrom(roadm_copy, .6, {delay:fadeInDelay ,scale:.7, autoAlpha:0, ease:Power3.easeOut, clearProps:"all"}, .4)
		
		
		nodes_block = _currentsec.find(".nodes_block");
		TweenMax.set(nodes_block, {perspective:600});
		nodes_bgs = _currentsec.find(".nodes_bg");
		TweenMax.killTweensOf(nodes_bgs)
		TweenMax.set(nodes_bgs, { clearProps:"all"})
		TweenMax.staggerFrom(nodes_bgs, 1.5, {delay:fadeInDelay ,scale:.7, autoAlpha:0, ease:Power3.easeOut, clearProps:"all"}, .1)

		
		nodes_copy = _currentsec.find(".nodes_textbox");
		TweenMax.killTweensOf(nodes_copy)
		TweenMax.set(nodes_copy, { clearProps:"all"})
		TweenMax.staggerFrom(nodes_copy, .7, {delay:fadeInDelay, rotationY:-90, autoAlpha:0,  ease:Power3.easeOut, clearProps:"all"}, .9)
		
		
		nodes_copylines1 = _currentsec.find(".nodes_textbox_decoline_h");
		TweenMax.killTweensOf(nodes_copylines1)
		TweenMax.set(nodes_copylines1, { clearProps:"all"})
		TweenMax.staggerFrom(nodes_copylines1, .2, {delay:fadeInDelay+.4, scaleX:0,  ease:Power1.easeOut, clearProps:"all"}, .4)
		
		
		nodes_copylines2 = _currentsec.find(".nodes_textbox_decoline_v");
		TweenMax.killTweensOf(nodes_copylines2)
		TweenMax.set(nodes_copylines2, { clearProps:"all"})
		TweenMax.staggerFrom(nodes_copylines2, .2, {delay:fadeInDelay+.6, scaleY:0,  ease:Power1.easeOut, clearProps:"all"}, .4)
		
		if( _currentsec.find(".team_block").length > 0){
			teamOpen(_current_memeber_index, 1)
		}
		
		
		if(jQuery(window).width() > 767){
		teamsquare_lines1 = _currentsec.find(".team_head_frame_line_v");
		TweenMax.killTweensOf(teamsquare_lines1)
		TweenMax.set(teamsquare_lines1, { clearProps:"all"})
		TweenMax.staggerFrom(teamsquare_lines1, .3, {delay:fadeInDelay+.3, height:0, ease:Linear.easeNone, clearProps:"all"}, .6)
		
		teamsquare_lines2 = _currentsec.find(".team_head_frame_line_h");
		TweenMax.killTweensOf(teamsquare_lines2)
		TweenMax.set(teamsquare_lines2, { clearProps:"all"})
		TweenMax.staggerFrom(teamsquare_lines2, .3, {delay:fadeInDelay+.6, width:0, ease:Linear.easeNone, clearProps:"all"}, .6)
		
		}
		
		_currentsec.find(".l-section-video video").each(function(){
			jQuery(this).get(0).play();
		});
		
		
		
		rewards_transition = _currentsec.find(".rewards_transition_zoom")
		TweenMax.killTweensOf(rewards_transition)
		TweenMax.set(rewards_transition, {position:"absolute", autoAlpha:0})
		
		rewards_block = _currentsec.find(".rewards_block_anim");
		
		if(_prevsec_memo != ""){
			ref_reward_element = _prevsec_memo.find(".nodes_bg_main")
			if(ref_reward_element.length > 0 && rewards_block.length > 0){
				
				if(jQuery(window).width() > 800){
					new_top = - jQuery(window).height()
					
					TweenMax.set(ref_reward_element, {autoAlpha:0})
					
					TweenMax.killTweensOf(rewards_block)
					TweenMax.set(rewards_block, {clearProps:"all"})
					TweenMax.set(rewards_block, {top:new_top+"px", scale:.5, autoAlpha:0})
					TweenMax.to(rewards_block, .5,{autoAlpha:1, ease:Power1.easeOut})
					TweenMax.to(rewards_block, .7,{ top:0,ease:Power3.easeInOut})
					TweenMax.to(rewards_block, 1.5,{scale:1, left:0,autoAlpha:1, ease:Power3.easeOut, clearProps:"all"})
				}
			}
		}

		

		
		_prevsec_memo = _currentsec;
		
}
_prevsec_memo = "";

secOutFunctionQueue.push(site_secout);
function site_secout(_prevsec){
		if(jQuery(window).width() > 676){
			fadeInElements2 = _prevsec.find(".sequenced_fadein")
			TweenMax.killTweensOf(fadeInElements2)
			TweenMax.staggerTo(fadeInElements2,.5,{autoAlpha:0,scale:.7,ease:Power3.easeInOut},-.05)
			
		}
		
		
		bg_lights = _prevsec.find(".background_light_filter_corners");
		TweenMax.killTweensOf(bg_lights)
		TweenMax.to(bg_lights,.3,{autoAlpha:0,ease:Power3.easeInOut})
		
		
		nodes_bgs = _prevsec.find(".nodes_bg");
		TweenMax.killTweensOf(nodes_bgs)
	
		TweenMax.staggerTo(nodes_bgs, .2, {scale:.7, autoAlpha:0, ease:Power3.easeIn}, -.03)

		_prevsec.find(".l-section-video video").each(function(){
			jQuery(this).get(0).pause();
		});
		
}





jQuery(document).ready(function(){
	
	setRoadmap()
	
})

function setRoadmap(){
	jQuery(".roadmap_arrowcontrols .arrowcontrol_right").click(function(){
		roadMapAnimToNext(1);
	})
	jQuery(".roadmap_arrowcontrols .arrowcontrol_left").click(function(){
		roadMapAnimToNext(-1);
	})
	roadMapAnimTo(0)
	
	jQuery(".roadmap_list_maskblock").swipe( {
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
			roadMapAnimToNext(1);
		},
		swipeRight:function(event, direction, distance, duration, fingerCount) {
			roadMapAnimToNext(-1);
		}
	});
	
}
function roadMapAnimTo(index){
	

	
	roadmap_leftoffset = getRoadmapOffset();
	
	
	_currentsec = fullScreenSections.eq(currentSec);
	_roadmap_block = _currentsec.find(".roadmap_block")
	
	
	
	
	if(_roadmap_block.length > 0){
		
		_roadmap_blockanim = _roadmap_block.find(".roadmap_list_holder")
		_roadmap_items = _roadmap_block.find("ul.roadmap_list>li")
		
		min_to_show = getRoadmapMinToShow()
		
		if(index > _roadmap_items.length-min_to_show){
			index = _roadmap_items.length-min_to_show;
		}
		if(index < 0){
			index = 0;
		}
		
		
		_roadmap_item_to = _roadmap_items.eq(index);
		if(_roadmap_item_to.length == 0){
			_roadmap_item_to = _roadmap_items.eq(0);
		}
		
		if(index >= 2){
			_roadmap_block.addClass("hide_roadmap_title")
		}else{
			_roadmap_block.removeClass("hide_roadmap_title")
		}
		
		item_pos = _roadmap_item_to.position()
		TweenMax.killTweensOf(_roadmap_blockanim)
		current_x = _roadmap_blockanim.position().left
		TweenMax.set(_roadmap_blockanim, {left:-item_pos.left+roadmap_leftoffset})
		updateActiveRoadmapItems(_currentsec)
		TweenMax.from(_roadmap_blockanim, .7, {left:current_x, ease:Power3.easeOut})
		
	}
	
	
}
function updateActiveRoadmapItems(_currentsec){
	_leftoffset = getRoadmapOffset()
	_roadmap_items = _currentsec.find("ul.roadmap_list>li")
	container_x = _roadmap_items.closest(".roadmap_list_holder").position().left
	_previtem = "";
	_roadmap_items.each(function(ind){
		this_x = jQuery(this).position().left
		this_x_relative = this_x + container_x - _leftoffset;
		
		if(this_x_relative + 20 > 0){
			jQuery(this).removeClass("item_ofuscated")
		}else{
			jQuery(this).addClass("item_ofuscated")
		}
		if(_previtem != ""){
			if(Math.abs(this_x_relative) < 20){
				_previtem.addClass("item_ofuscated_border")
			}else{
				_previtem.removeClass("item_ofuscated_border")
			}
		}
		_previtem = jQuery(this)
	})
}


function roadMapAnimToNext(direction){
	_leftoffset = getRoadmapOffset();
	_currentsec = fullScreenSections.eq(currentSec);
	_roadmap_blockanim = _currentsec.find(".roadmap_list_holder")
	_roadmap_items = _currentsec.find("ul.roadmap_list>li")
	
	container_x = _roadmap_items.closest(".roadmap_list_holder").position().left
	min_distance_x = 9999
	_roadmap_items.each(function(index){
		this_x = jQuery(this).position().left
		this_x_relative = this_x + container_x - _leftoffset;
		
		if(Math.abs(this_x_relative) < min_distance_x){
			min_distance_x = Math.abs(this_x_relative);
			current_index = index;
		}
	})
	
	itemsToMove = getRoadmapSteps();
	
	new_index = current_index+itemsToMove*direction;
	

	
	roadMapAnimTo(new_index)

	
}
function getRoadmapOffset(){
	win_w = jQuery(window).width();
	if(win_w > 767){
		return 150;
	}else {
		return 50;
	}
	
}
function getRoadmapSteps(){
	win_w = jQuery(window).width();
	if(win_w > 1350){
		return 3;
	}else if(win_w > 1000){
		return 2;
	}else{
		return 1;
	}
	
}
function getRoadmapMinToShow(){
	win_w = jQuery(window).width();
	if(win_w > 1500){
		return 4;
	}else if(win_w > 1000){
		return 3;
	}else{
		return 1;
	}
}








jQuery(document).ready(function(){
	
	setTeam()
	
})
_current_memeber_index = -1;
function setTeam(){
	jQuery(".team_controls .arrowcontrol_right").click(function(){
		teamOpenNext(1);
	})
	jQuery(".team_controls .arrowcontrol_left").click(function(){
		teamOpenNext(-1);
	})
	team_items = jQuery("ul.team_list li")

	TweenMax.set(team_items, {autoAlpha:0, position:"absolute", left:0, top:0})
	
	background_team_imgs = jQuery(".background_team_imgs")
	background_team_imgs.html("")
	team_control_dots = jQuery("ul.team_control_dots")
	team_control_dots.html("")
	team_items.each(function(index){
		team_control_dots.append('<li class="team_control_dot" data_index="'+index+'" >\
									<div class="menu_dot_item"></div>\
								</li>')
		bg_team_img = jQuery("<div class='background_team_img'></div>")
		TweenMax.set(bg_team_img, {autoAlpha:0,backgroundImage: 'url('+jQuery(this).find(".ref_img").attr("src")+')'})
		bg_team_img.attr("data_index",index)
		bg_team_img.addClass("background_team_img_"+index)
		background_team_imgs.append(bg_team_img)
	})
	
	jQuery(".team_control_dot").click(function(){
		teamOpen(parseInt(jQuery(this).attr("data_index")), 1)
	})

	jQuery(".team_block").closest("section").swipe( {
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
			teamOpenNext(1);
		},
		swipeRight:function(event, direction, distance, duration, fingerCount) {
			teamOpenNext(-1);
		}
	});
	teamOpen(0, 1)

}
function teamOpen(_index, direction){
	
	team_items = jQuery("ul.team_list li")
	if(_index < 0)
		_index = team_items.length-1
	else if(_index > team_items.length-1)
		_index = 0
	
	_prev_member = jQuery("ul.team_list li.current_team")
	team_items.removeClass("current_team")

	bg_images = jQuery(".background_team_imgs .background_team_img")
	_prev_bg_image = bg_images.eq(_current_memeber_index);
	_next_bg_image = bg_images.eq(_index);
	console.log("_next_bg_image "+_next_bg_image.length)
	if(_prev_bg_image.length > 0){
		TweenMax.killTweensOf(_prev_bg_image)
		if(direction == 1) newleft = 0; else newleft = 100;
		TweenMax.to(_prev_bg_image, 1, {width:0, left:newleft+"%",ease:Power3.easeInOut})
	}
	TweenMax.killTweensOf(_next_bg_image)
	if(direction == 1) newleft = 100; else newleft = 0;
	TweenMax.set(_next_bg_image, {width:0, left:newleft+"%", autoAlpha:0})
	TweenMax.to(_next_bg_image, 1, {width:"100%", left:0, autoAlpha:1,ease:Power3.easeInOut})
	
	
	
	TweenMax.set(_prev_member, {autoAlpha:0, position:"absolute",left:-100*direction+"px",scale:.9,rotationY:-30*direction, top:0})
	TweenMax.from(_prev_member,.3, {autoAlpha:1,left:0,scale:1,rotationY:0, ease:Power3.easeOut})
	
	TweenMax.set(".team_list", {perspective:600})
	
	_current_memeber_index = _index;
	_current_memeber = team_items.eq(_current_memeber_index);
	TweenMax.set(_current_memeber,{clearProps:"all"})
	
	TweenMax.from(_current_memeber,.5, {autoAlpha:0,left:100*direction+"px",scale:.9, rotationY:30*direction, ease:Power3.easeInOut})
	
	_current_memeber.addClass("current_team")
	

	
	
	updateTeamControlDots()
	
}
function teamOpenNext(direction){
	
	new_index = _current_memeber_index+direction;

	teamOpen(new_index, direction)
}

function updateTeamControlDots(){
	team_control_dots = jQuery(".team_control_dot");
	team_control_dots.removeClass("current_item");
	team_control_dots.eq(_current_memeber_index).addClass("current_item");
}
