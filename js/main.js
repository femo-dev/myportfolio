(function($) {
    'use strict';
	
	const APP_MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibWF4MjI4IiwiYSI6ImNscTN4bGV3djAxNzIyaXVrOTl1cHVsMDcifQ.0qB6pxCGIinj_K9wTEzeWQ';
	const dialog = document.querySelector('dialog');
	const showBtn = document.querySelector('.show-map');
	const mapContainer = document.getElementById('map');
	const accuracy = {
		enabledHighAccuray: true
	};
	
	mapboxgl.accessToken = APP_MAPBOX_ACCESS_TOKEN;

	//const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/130%20Henlow%20Bay,%20Winnipeg,%20Manitoba.json?access_token=${APP_MAPBOX_ACCESS_TOKEN}`;
	let coord_longitude = -97.1927940184127;
	let coord_latitude = 49.81501168900633;

	// fetch(geocodeURL)
	// 	.then(response => response.json())
	// 	.then(data => {
	// 		coord_longitude = data.features[0].center.longitude;
	// 		coord_latitude = data.features[0].center.latitude;
	// 		console.log(`Corrected Coordinates: ${longitude}, ${latitude}`);

	// 		map.setCenter([coord_longitude, coord_latitude]);
	// 	})
	// 	.catch(error => console.error('Error in geocoding:', error));


	let map = new mapboxgl.Map({
		container: mapContainer,
		// style: 'mapbox://styles/mapbox/standard',
		style: 'mapbox://styles/mapbox/standard-satellite',
		center: [coord_longitude, coord_latitude],
		pitch: 25,
		zoom: 4
	});
	
	if (!mapboxgl.supported()) {
		console.log('Your browser does not support the WebGL.');
	}
	
	function setCenter(center) {
		map.easeTo({
			center: center,
			pitch: 50,
			zoom: 16,
			duration: 1000, 
		});
	}
		
	function track() {
		function getLocation(position) {
			let { latitude, longitude } = position.coords;

			const currentPosition = [longitude, latitude];
			setCenter(currentPosition);

			const marker = new mapboxgl.Marker({
				color: "#f95353",
				draggable: false,
			}).setLngLat(currentPosition).addTo(map);
		}

		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(getLocation, errorHandler, accuracy);
		} else {
			console.log('Your browser does not support the Geolocation API.');
		}
	}
	
	function errorHandler(error) {
		console.log(error.message);
	}
	
	showBtn.addEventListener('click', () => {
		dialog.showModal();
		map.resize();

		setTimeout(() => {
			track();
		}, 1800);
	});
	
	dialog.addEventListener('click', function(event) {
		const rect = this.getBoundingClientRect();
	
		if (event.clientY < rect.top || event.clientY > rect.bottom || 
			event.clientX < rect.left || event.clientX > rect.right) {
				dialog.close();
		}
	});	

	dialog.addEventListener('close', () => {
		map.jumpTo({
			center: [coord_longitude, coord_latitude],
			zoom: 4,
			pitch: 25
		});
	
		const markers = document.querySelectorAll('.mapboxgl-marker');
		markers.forEach(marker => marker.remove());
	});

	jQuery(document).ready(function(){
		
		/* START MENU-JS */	
			$('.nav a').on('click', function(e){
				var anchor = $(this);
				$('html, body').stop().animate({
					scrollTop: $(anchor.attr('href')).offset().top - 50
				}, 1500);
				e.preventDefault();
			});		

	
			$(window).scroll(function() {
			  if ($(this).scrollTop() > 100) {
				$('.menu-top').addClass('menu-shrink');
			  } else {
				$('.menu-top').removeClass('menu-shrink');
			  }
			});
			
			$(document).on('click','.navbar-collapse.in',function(e) {
			if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
				$(this).collapse('hide');
			}
			});				
		/* END MENU-JS */
		
		/* START RIPPLES JS */
			jQuery(document).ready(function(){
					var $home = $('#home');
					$home.ripples({
						resolution: 512,
						dropRadius: 20,
						perturbance: 0.04,
					});
				});	
		/* END RIPPLES JS */
		
		/* START MOBILE-MENU  */
			$('.main_menu').slicknav({
				prependTo:".mobile-nav",
			});
		/* START MOBILE-MENU  */
		 
		/* START ISOTOP JS */
			var $grid = $('.work_content_area').isotope({
			  // options
			});
			// filter items on button click
			$('.work_filter').on( 'click', 'li', function() {
			  var filterValue = $(this).attr('data-filter');
			  $grid.isotope({ filter: filterValue });
			});
			// filter items on button click
			$('.work_filter').on( 'click', 'li', function() {
				$(this).addClass('active').siblings().removeClass('active')
			});

			var $grid2 = $('.work_content_area2').isotope({
				// options
			  });
			  // filter items on button click
			  $('.work_filter2').on( 'click', 'li', function() {
				var filterValue = $(this).attr('data-filter');
				$grid2.isotope({ filter: filterValue });
			  });
			  // filter items on button click
			  $('.work_filter2').on( 'click', 'li', function() {
				  $(this).addClass('active').siblings().removeClass('active')
			  });			
		/* END ISOTOP JS */
		
		/* START LIGHTBOX */
		
			lightbox.option({
			  'resizeDuration': 200,
			  'wrapAround': true
			});
		
		/* END LIGHTBOX JS */
		
		/* START COUNDOWN JS */
			$('#counter_area').on('inview', function(event, visible, visiblePartX, visiblePartY) {
				if (visible) {
					$(this).find('.counter').each(function () {
						var $this = $(this);
						$({ Counter: 0 }).animate({ Counter: $this.text() }, {
							duration: 5000,
							easing: 'swing',
							step: function () {
								$this.text(Math.ceil(this.Counter));
							}
						});
					});
					$(this).unbind('inview');
				}
			});
		/* END COUNDOWN JS */
		
	});	
	
		/*PRELOADER JS*/
			$(window).on('load', function() {  
				$('.spinner').fadeOut();
				$('.preloader').delay(350).fadeOut('slow'); 

				/****TODO: TO IMPROVE ****/
				var $grid2 = $('.work_content_area2').isotope({
					// options
				  });
				  // filter items on button click
				  $('.work_filter2').on( 'click', 'li', function() {
					var filterValue = $(this).attr('data-filter');
					$grid2.isotope({ filter: filterValue });
				  });
				  // filter items on button click
				  $('.work_filter2').on( 'click', 'li', function() {
					  $(this).addClass('active').siblings().removeClass('active')
				  });				
			}); 
		/*END PRELOADER JS*/
		
		// Wow
			new WOW().init();
})(jQuery);