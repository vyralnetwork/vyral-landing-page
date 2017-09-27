
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

jQuery(document).ready(function(){
	

	jQuery("#main_menu_link").click(function(){
		
		if(jQuery("body").hasClass("main_menu_open")){
			closeMainMenu();
		}else{
			openMainMenu();
		}
	})

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
	


	setActionsVideoHome()
	setActionsSignUp()
	setUpPreloaderAnimation()

})
jQuery(window).on('load', function () {
	 setTimeout(function(){stopPreloaderFirst()}, 200)
});
pageHasLoad = false;
function stopPreloaderFirst(){
	pageHasLoad = true;
	jQuery("body").addClass("first_loaded_completed")
	//stopPreloader()
	//setStartAppear()
}
function stopPreloader(){
	jQuery("body").removeClass("ajax_loading")
	TweenMax.to("#trama_preloader", .5, {autoAlpha:0})
}
function startPreloader(){
	jQuery("body").addClass("ajax_loading")
	TweenMax.to("#trama_preloader", .5, {autoAlpha:1})
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
var countdownEndDate = new Date("October 31, 2017 15:00:00");
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




function setActionsSignUp(){
	
	//home_video_src = jQuery(".video_lightbox .the_video iframe").attr("src")
	
	signup_block = jQuery(".signup_lightbox")
	
	TweenMax.set(signup_block,{autoAlpha:0})
	/*
	jQuery(".signup_lightbox .video_player_bg,.signup_lightbox .signup_button_back").click(function(){
		closeSignupBlock();
	})
	jQuery(".join_our_list").click(function(e){
		e.preventDefault();
		openSignupBlock();
	})*/
	jQuery(".join_our_list").click(function(e){
		waitForFinalEvent(function(){
			jQuery("div[data-leadbox-wrap-ignore='true']").addClass("join_us_auto_box")
		}, 200, "fix_join_list");
		
	})
	
	
}

function openSignupBlock(){
	signup_block = jQuery(".signup_lightbox")
	video_player_bg = jQuery(".signup_lightbox .video_player_bg ")
	content_block = jQuery(".signup_lightbox .signup_form_block")
	TweenMax.to(signup_block,.2,{autoAlpha:1, ease:Power3.easeOut})
	TweenMax.set(video_player_bg,{width:0})
	TweenMax.to(video_player_bg,.6,{width:"100%", ease:Power3.easeOut})
	
	TweenMax.set(content_block.parent(),{perspective:1200})
	TweenMax.set(content_block,{scale:.8,top:100,autoAlpha:0, rotationX:-90,transformStyle:"preserve-3d"})
	TweenMax.to(content_block,.7,{scale:1,autoAlpha:1,top:0,rotationX:0, ease:Power3.easeOut,delay:.3, clearProps:"transform,top,opacity,visibility,scale"})
}
function closeSignupBlock(){
	signup_block = jQuery(".signup_lightbox")
	video_player_bg = jQuery(".signup_lightbox .video_player_bg ")
	content_block = jQuery(".signup_lightbox .signup_form_block")
	TweenMax.to(signup_block,.4,{autoAlpha:0, ease:Power3.easeOut,delay:.3 })
	TweenMax.to(video_player_bg,.5,{width:0, ease:Power3.easeOut, delay:.1})
	
	TweenMax.to(content_block,.3,{scale:.8,autoAlpha:0, ease:Power3.easeOut})
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

