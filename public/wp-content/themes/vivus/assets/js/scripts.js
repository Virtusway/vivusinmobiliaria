// Form validation
function valForm(data) {
	let isValid = true;

	const form = document.querySelector('form[id="'+data.id+'"]');
	if (!form || !data.fields || !data.fields.length) return false;

	const valEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const valPhone = /^\+?[0-9\s\-()]{5,20}$/;

	const esc = (str) => (window.CSS && CSS.escape)
		? CSS.escape(str)
		: String(str).replace(/([ #;?%&,.+*~':"!^$\[\]\(\)=><|\\\/@])/g, '\\$1');

	const normalize = (str) => String(str).toLowerCase().replace(/[^a-z0-9]+/g, '');

	const addError = (field, message) => {
		field.classList.add('is-invalid');
		let feedback = field.parentElement.querySelector('.invalid-feedback');
		if (!feedback) {
			feedback = document.createElement('div');
			feedback.className = 'invalid-feedback';
			field.parentElement.appendChild(feedback);
		}
		feedback.textContent = message || 'Invalid';
	};

	const removeError = (field) => {
		field.classList.remove('is-invalid');
		const feedback = field.parentElement.querySelector('.invalid-feedback');
		if (feedback) feedback.remove();
	};

	// Fields validation
	data.fields.forEach(fieldData => {
		const formKey  = normalize(data.id);        // 'contactForm' -> 'contactform'
		const fieldKey = normalize(fieldData.id);   // 'name' -> 'name'
		const nameKey  = normalize(fieldData.name || fieldData.id);

		const domId    = formKey + '_' + fieldKey;       // contactform_name
		const domName  = formKey + '[' + nameKey + ']';  // contactform[name]

		let field = form.querySelector('#' + esc(domId)) || form.querySelector('[name="' + esc(domName) + '"]');
		if (!field) return;

		let type = (field.type || field.tagName || '').toLowerCase();
		let radios = null;

		if (type==='radio'){ radios=[...form.querySelectorAll('input[type="radio"][name="'+field.name+'"]')]; if (radios.length) field=radios[0]; }

		const empty = {
			checkbox: () => !field.checked,
			radio:    () => !(radios && radios.some(function(r){ return r.checked; })),
			file:     () => !(field.files && field.files.length),
			select:   () => !field.value,
			'select-multiple':() => !field.value || (Array.isArray(field.value) && !field.value.length),
			textarea: () => !(field.value && String(field.value).trim()),
			default:  () => !(field.value && String(field.value).trim())
		};
		const isEmpty = (empty[type] || empty.default)();

		if (fieldData.required) {
			if (isEmpty) {
				addError(field, fieldData.required_message);
				isValid = false;
				return;
			} else {
				removeError(field);
			}

	    	// filtros
			if (fieldData.required_filter === 'phone') {
				const digits = (field.value || '').replace(/\D+/g, '').length;
				if (!valPhone.test(field.value) || digits < 5){
					addError(field, fieldData.required_filter_message);
					isValid = false;
					return;
				} else {
					removeError(field);
				}
			}

			if (fieldData.required_filter === 'email') {
				if (!valEmail.test(field.value)) {
					addError(field, fieldData.required_filter_message);
					isValid = false;
					return;
				} else {
					removeError(field);
				}
			}
		}
	});

	// Validate Captcha
	const captchaElement = form.querySelector('.captcha');
	const provider = (data.captcha && data.captcha.provider) ? data.captcha.provider : '';

	if (provider === 'google_captcha' && Number((data.captcha && data.captcha.gcaptcha && data.captcha.gcaptcha.version) ? data.captcha.gcaptcha.version : 0) === 2) {
		if (typeof grecaptcha==='undefined'){ console.error('reCAPTCHA v2 not loaded'); return false; }

		const response = grecaptcha.getResponse();
		if (!captchaElement) return isValid && response.length > 0;

		if (!response || response.length === 0) {
			captchaElement.classList.add('is-invalid');
			if (!captchaElement.querySelector('.invalid-feedback')) {
				const e = document.createElement('div');
				e.className = 'invalid-feedback';
      			e.innerText = data.captcha.message || 'Wrong captcha';
				captchaElement.appendChild(e);
			}
			isValid = false;
		} else {
	       captchaElement.classList.remove('is-invalid');
	       var fb = captchaElement.querySelector('.invalid-feedback'); if (fb) fb.remove();
		}
	} else if (provider === 'hcaptcha') {
		if (typeof hcaptcha==='undefined'){ console.error('hCaptcha not loaded'); return false; }

		const response = hcaptcha.getResponse();
		if (!captchaElement) return isValid && response.length > 0;

		if (!response || response.length === 0) {
			captchaElement.classList.add('is-invalid');
			if (!captchaElement.querySelector('.invalid-feedback')) {
				const e = document.createElement('div');
				e.className = 'invalid-feedback';
				e.innerText = data.captcha.message || 'Wrong captcha';
				captchaElement.appendChild(e);
			}
			isValid = false;
		} else {
			captchaElement.classList.remove('is-invalid');
			var fb = captchaElement.querySelector('.invalid-feedback'); if (fb) fb.remove();
		}
	}

	return isValid;
}

// Form
function contactForm(data){
	const form = document.querySelector('form[id="'+data.id+'"]');
	if (!form) return;

	let isSubmitting = false;


	// Captcha config (supports both legacy and new shapes)
	const captcha = (data && data.captcha) ? data.captcha : null;
	const captchaProvider = (captcha && captcha.provider)
		? captcha.provider
		: ((captcha && captcha.public) ? 'google_captcha' : '');
	const captchaVersion = (captcha && captcha.gcaptcha && captcha.gcaptcha.version)
		? Number(captcha.gcaptcha.version)
		: ((captchaProvider === 'google_captcha' && captcha && captcha.public) ? 3 : 0);
	const captchaSiteKey = (captcha && captcha.gcaptcha && captcha.gcaptcha.public)
		? captcha.gcaptcha.public
		: ((captcha && captcha.public) ? captcha.public : '');
	const captchaAction = (captcha && captcha.action) ? captcha.action : 'submit';

	const getCaptchaTokenV3 = () => new Promise((resolve) => {
		if (captchaProvider !== 'google_captcha' || captchaVersion !== 3 || !captchaSiteKey) return resolve('');
		if (typeof grecaptcha === 'undefined') return resolve('');
		grecaptcha.ready(function () {
			grecaptcha.execute(captchaSiteKey, { action: captchaAction })
				.then(function (token) {
					const el = form.querySelector('[name="g-recaptcha-response"]');
					if (el) el.value = token || '';
					resolve(token || '');
				})
				.catch(function () { resolve(''); });
		});
	});

	// Form submit
	form.addEventListener('submit', async (e) => {
		if (!valForm(data)){
			e.preventDefault();
			const firstInvalid = document.querySelector('.invalid-feedback');
			if (firstInvalid) window.scrollTo({ top: firstInvalid.getBoundingClientRect().top+window.scrollY-200, behavior: 'smooth' });
			return;
		}

		// Prevent double submit
		if (isSubmitting) { e.preventDefault(); return; }

		// Format form
	    const submitButton = form.querySelector('button[type="submit"]');
	    const setFormBusy = (busy) => {
	    	if (!submitButton) return;
	    	if (busy){
	    		submitButton.classList.add('btn-loading');
	    		submitButton.textContent = data.submit.sending || 'Sending...';
	    		submitButton.disabled = true;
	    		submitButton.setAttribute('aria-busy', 'true');
	    	} else {
	    		submitButton.classList.remove('btn-loading');
	    		submitButton.textContent = data.submit.label || 'Enviar';
	    		submitButton.disabled = false;
	    		submitButton.removeAttribute('aria-busy');
	    	}
	    }

	    // Form > External submit
	    if (data.external && data.external.enabled){
	    	isSubmitting = true;
	    	setFormBusy(true);
	    	return;
	    }

	    // Form > AJAX submit
	    e.preventDefault();
    	isSubmitting = true;
    	setFormBusy(true);

		// Ensure reCAPTCHA v3 token exists before sending
		const v3token = await getCaptchaTokenV3();
		if (captchaProvider === 'google_captcha' && captchaVersion === 3 && !v3token) {
			throw new Error('captcha_token_missing');
		}

		const formData = new FormData(form);
    	let actionUrl = form.getAttribute('action') || window.location.href;

	   	try {
		   	const formResponse = await fetch(actionUrl, {
			method: 'POST',
			body: formData,
			credentials: 'same-origin',
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Accept': 'application/json'
			}
		});

		let payload = null;
		try {
			const ct = (formResponse.headers && formResponse.headers.get) ? (formResponse.headers.get('content-type') || '') : '';
			if (ct.indexOf('application/json') !== -1) {
				payload = await formResponse.json();
			}
		} catch (e) {}

		if (!formResponse.ok) {
			const msg = (payload && payload.message) ? payload.message : ('Request failed: ' + formResponse.status);
			throw new Error(msg);
		}
		if (payload && payload.success === false) {
			throw new Error(payload.message || 'Error');
		}

	        if (data.file) window.open(data.file, '_blank');

		   	if (data.redirect){
        		if (typeof fbq === 'function') fbq('track', 'Lead');
		        window.location.href = data.redirect;
		        return;

		    } else{

		    	// Success
		        if (!form.querySelector('.text-success')){
		          const form_success = document.createElement('div');
		          form_success.className = 'col-12 mt-3 text-center text-success';
		          form_success.innerHTML = data.thanks || 'Thanks! You message was sent.';
		          form.appendChild(form_success);
		        }

				// Remove values
		        form.querySelectorAll('.form-control, .form-select').forEach(el => el.value = '');

		       const files = form.querySelector('.files');
				files && (files.textContent = '');
		    }

		} catch(err){
			var ts = form.querySelector('.text-success'); if (ts) ts.remove();
			console.error(err);
		} finally {
      		setFormBusy(false);
		    isSubmitting = false;

			if (captchaProvider === 'google_captcha' && captchaVersion === 3) {
				getCaptchaTokenV3();
			}
		}

	});

	// Form > files group
	form.querySelectorAll('.input-file-group input').forEach(input=>{
		input.addEventListener('change', function(){
			var sib = this.nextElementSibling; var box = (sib && sib.classList && sib.classList.contains('files')) ? sib : null;
			if (!box) return;
			box.innerHTML='';
			[...(this.files||[])].forEach(f=>{ const s=document.createElement('span'); s.textContent=f.name; box.appendChild(s); });
		});
	});
}

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

