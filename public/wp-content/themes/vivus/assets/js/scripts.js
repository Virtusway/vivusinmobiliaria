// Slides
function slides() {

		// Home Gallery
		var homeGallery = new Swiper(".page.home .gallery .swiper", {
		  effect: "coverflow",
		  //grabCursor: true,
		  centeredSlides: true,
		  slidesPerView: 1,
		  loop: true,
		  navigation: {
				nextEl: '.gallery .swiper-button-next',
				prevEl: '.gallery .swiper-button-prev',
			},

		  coverflowEffect: {
		    rotate: 50,
		    stretch: 0,
		    depth: 100,
		    modifier: 1,
		    slideShadows: true,
		  },

		  breakpoints: {
		    992: {
		      slidesPerView: 3,
		    }
		  },
		  
		});


    // Testimonial
    var sliderTestimonial = new Swiper(".page.about .testimonial .swiper", {     
      slidesPerView: 1,
      loop: true,    
      pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			}
    });


    // Gallery
	document.querySelectorAll(".property-item").forEach(function (galleryEl) {
	    const swiperEl = galleryEl.querySelector(".swiper");
	    const slidesCount = swiperEl.querySelectorAll(".swiper-slide").length;

	    new Swiper(swiperEl, {
	        slidesPerView: 1,
	        //effect: 'fade',
	        lazy: true,
	        autoplay: slidesCount > 1 ? { delay: 5000 } : false,
	        loop: slidesCount > 1,
	        navigation: {
	            nextEl: galleryEl.querySelector(".swiper-button-next"),
	            prevEl: galleryEl.querySelector(".swiper-button-prev"),
	        }
	    });
	});




    
}

// Scroll
function scroll() {

	width = $(window).width();
	scrollTop = $(window).scrollTop();

    // Fixed Header
	if(scrollTop > 300){
		$('.header, body').addClass('fixed');
	} else {
		$('.header, body').removeClass('fixed');
	}


	$('.section').each(function() {
		scrollTop = $(window).scrollTop();
		documentHeight = $(document).outerHeight() - $(window).outerHeight();

		$module = $(this).offset().top - 90;
		$module_bottom = $(this).offset().top + $(this).outerHeight() - 90;
		
		val = $(this).attr('id');

		if (scrollTop > $module && scrollTop < $module_bottom) {
			$('.header .navigation li a[href="#'+val+'"]').parent().addClass('active');
		} else {
			$('.header .navigation li a[href="#'+val+'"]').parent().removeClass('active');
		}

		if (scrollTop == documentHeight) {
			$('.header .navigation li a[href="#'+val+'"]').parent().removeClass('active');
			$('.header .navigation li a[href="#contact"]').parent().addClass('active');
		};
	});
}

// Number grow in stats
function moduleStats(){

	scrollTop = $(window).scrollTop();

	if ($('.module-stats').length > 0) {
	    stats = $('.module-stats').offset().top - $('.module-stats').outerHeight() - $('.module-stats').outerHeight();

	    if (scrollTop > stats) {
			$('.module-stats .counter').each(function () {
			    $(this).prop('Counter', 0).animate({
			        Counter: $(this).attr('data-number')
			    }, {
			        duration: 2000,
			        easing: 'swing',
			        step: function (now) {
			            $(this).text(Math.ceil(now));
			        }
			    });
			});
	    }
	}
}

// Parallax
function parallaxBackground() {

	scrollTop = $(window).scrollTop();

	$(".presentation .slide, .banner").css({
		'background-position': 'center '+ (scrollTop) * .2 + 'px'
	});
}

// Open
function dataOpen() {

	width = $(window).width();

	// Animate Scroll
	$('a[data-scroll="true"], .data-scroll a').on('click',function (e) {
		e.preventDefault();

		var target = this.hash,
		$target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top - 100
		}, 900, 'swing', function () {
			//window.location.hash = target;
		});
	});


    // Open Menu
    $('[data-open="menu"]').click(function(e){
        e.preventDefault();

        $(this).toggleClass('active');
        $(this).parents('.header').toggleClass('active');
        $(this).siblings('.navigation').toggleClass('active');
    });

    
}

// Modal Video
function modalVideo() {

	$('.video-player.allowed').click(function(e) {
		e.preventDefault();

		$(this).addClass('active');

		id = $(this).attr('data-id');
		type = $(this).attr('data-type');

		$('#modalVideo .player').html('');

		if (type == 'youtube') {
			$('#modalVideo .player').html('<iframe width="560" height="315" src="https://www.youtube.com/embed/'+id+'?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
		}

       	if (type == 'vimeo') {
            $('#modalVideo .player').html('<iframe src="https://player.vimeo.com/'+id+'?h=39c25e44a1&color=be9926&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>');
        }

		if (type == 'file') {
			$('#modalVideo .player').html('<video controls playsinline loop><source src="'+ id +'" type="video/mp4"></video>');
		}

		$('#modalVideo').modal('show');

	});


	$('#modalVideo').on('hidden.bs.modal', function (e){
		$('.video-player').removeClass('active');
		$('#modalVideo .player').html('');
	});
}

function initLenis() {
  if (window.lenis) return;

  window.lenis = new Lenis();
  requestAnimationFrame(function raf(time) {
    window.lenis.raf(time);
    requestAnimationFrame(raf);
  });
}


function initWow() {
  document.querySelectorAll('.wow').forEach(parent => {
    const animationClass = [...parent.classList].find(c => c.startsWith('fade'));
    if (!animationClass) return;

    if (parent.dataset.wowChildren === "1") return;
    parent.dataset.wowChildren = "1";

    parent.classList.remove('wow', animationClass, 'animated');
    parent.removeAttribute('data-wow-delay');
    parent.removeAttribute('data-wow-duration');

    parent.style.visibility = '';
    parent.style.animationName = '';
    parent.style.animationDelay = '';
    parent.style.animationDuration = '';

    [...parent.children].forEach((child, i) => {
      child.classList.add('wow', animationClass);
      child.setAttribute('data-wow-delay', `${(i + 1) * 0.1}s`);
    });
  });

  new WOW().init();
}

document.addEventListener("DOMContentLoaded",function(){

	initLenis();
	initWow();

	slides();
	scroll();
	//moduleStats();
	//parallaxBackground();
	dataOpen();
	//modalVideo();
	//loading();


	$(window).bind('scroll',function() {
		scroll();
		//moduleStats();
		//parallaxBackground();
	});

	// Close Menu
    $('.header .navigation .menu li a').click(function(e) {
        $('html').removeClass('overh');
        $('.header .navigation, .header .nav-menu').toggleClass('active');
        
    });

});

