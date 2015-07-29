jQuery(function($) {

	var $window = $(window);
	var htmlBody = $('html, body');
	var masterNav = $('#master_nav');
	var navItem = masterNav.find('a');
	var windowHeight = $window.height();
	var overlay = $('#overlay');
	var dialog = $('#dialog');
	var sections = {};

	function sectionPositions() {
		$('section').each(function() {
			sections[this.id] = parseInt($(this).position().top);
		});
	};

	$('a[rel=external]').on('click', function(e) {
		e.preventDefault();
		window.open(this.href);
	})

	$('#cover_scroll_btn').on('click', function() {
		htmlBody.animate({
			scrollTop: $('body').height()
		}, 750, 'easeInOutExpo');
	});

	navItem.on('click', function(e) {
		e.preventDefault();
		if ($(this).attr('rel') == 'external') {
			return;
		}
		var anchor = $(this).attr('href');
		var des = $(anchor);
		if (des.length) {
			htmlBody.animate({
				scrollTop: des.position().top
			}, 750, 'easeInOutExpo');
		}
	});

	$window.on('scroll', function() {
		var windowTop = $window.scrollTop();
		masterNav.toggleClass('fixed', windowTop > $('#profile').position().top);
		var active;
		for (var i in sections) {
			if (windowTop >= sections[i] - (windowHeight / 2)) {
				active = i;
			}
		}
		navItem.removeClass('active').filter('[href=#' + active + ']').addClass('active');
	}).on('resize', function() {
		windowHeight = $window.height();
		sectionPositions();
	}).trigger('resize');

	$('#contact_form').on('submit', function(e) {
		e.preventDefault();
		var form = $(this);
		var data = form.serialize();
		var fields = form.find('input, textarea, button').prop('disabled', true);
		var submitBtn = form.find(':submit').addClass('active');

		console.log('send contact', data);
		$.post('contact.php', data, function(response) {
			if (response.code == '1') {
				fields.val('').prop('disabled', false);
				submitBtn.removeClass('active');
				overlay.addClass('active');
				dialog.addClass('jelly');
			}
		});
	});

	$('#dialog .dialog-action a').on('click', function(e) {
		overlay.removeClass('active');
		dialog.removeClass('jelly');
	})

});
