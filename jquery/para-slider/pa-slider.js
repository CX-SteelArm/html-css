paraSlider = function(options){
	var opts = $.extend({}, paras_default, options),
		// the bgs
		$bg = $('.pa-bg').children(),
		// the images container
		$im_list = $('.im-list'),
		// the images
		$im_elems = $im_list.children(),
		// the image wrapper
		$im_wrapper = $(".im-wrapper"),
		// number of images
		total_num = $im_elems.length,
		// current shown image
		current = 0,
		// the setInterval() function handle
		slideshow,
		// window width
		win_w = $(window).width(),
		// the navs
		$nav_left = $('.left-nav'),
		$nav_right = $('.right-nav');
	
	var loaded = 0,
		$imgs = $im_wrapper.find('img');
		
	$imgs.each(function(){
		var $img = $(this);
		// create a new image
		
		$("<img/>").load(function(){
			
			++loaded;
			
			if(loaded == total_num){
				$im_list.show();
				var one_width = $img.width();
				
				setWidth(
					$im_list, $im_elems, total_num, one_width,
					$bg, $nav_left, $nav_right
				);
				
				$nav_left.bind('click', function(){
					--current;
					if(current < 0){
						if(opts.circle){
							current = total_num-1;
						}else{
							++current;
							return false;
						}
					}
					
					// showImage();
					slide(current, $im_list, $bg, opts.speed, opts.easing, opts.bgeasing);
				})
				
				$nav_right.bind('click', function(){
					++current;
					if(current > total_num-1){
						if(opts.circle){
							current = 0
						}else{
							--current;
							return false;
						}
					}
					// showImage();
					slide(current, $im_list, $bg, opts.speed, opts.easing, opts.bgeasing);
				})
				
				if(opts.auto != 0){
					opts.circle = true;
					slideshow = setInterval(function(){
						$nav_right.trigger('click');
					}, opt.auto);
				}
			}
		}).on('error', function(){
			console.log("something wrong here");
		}).attr('src', $img.attr('src'));
	})
	
	var setWidth = function(
		$im_list, $im_elems, total_num, one_width,
		$bg, $nav_left, $nav_right){
		
		var slider_w = win_w * total_num;
		$im_elems.width(win_w + 'px');
		$bg.width(slider_w + 'px');
		$im_list.width(slider_w + 'px');
		
		var pos_nav = (win_w - one_width)/2 +3;
		$nav_left.css('left', pos_nav);
		$nav_right.css('right', pos_nav);
	};
	
	var slide = function(current, $im_list, $bg, speed, easing, bgeasing){
		var slide_to = parseInt(-win_w * current);
		$im_list.stop().animate({left: slide_to + 'px'}, speed, easing);
		$bg.stop().animate({left: slide_to + 'px'}, speed, bgeasing);
	};
}

var paras_default = {
	auto: 0,
	speed: 1000,
	easing: 'jswing',
	bgeasing: 'jswing',
	circle: true,
}