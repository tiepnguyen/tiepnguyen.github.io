$(function() {

	var $window = $(window),
		body = $('html, body');
		cover = $('#cover'),
		masterNav = $('#master_nav');
		sections = $('section');

	$('a[rel=external]').on('click', function(e) {
		e.preventDefault();
		window.open(this.href);
	})

	$window.on('scroll', function() {
		var $this = $(this),
			offset = $this.scrollTop();
		cover.css('background-position-y', offset/2);
		if (offset > this.innerHeight - masterNav.height()) {
			masterNav.addClass('fixed');
		} else {
			masterNav.removeClass('fixed');
		}
	});

	masterNav.find('a').on('click', function(e) {
		e.preventDefault();
		var $this = $(this),
			anchor = $this.attr('href').substr(1),
			scrollTo = sections.filter('.' + anchor).position().top;
		location.hash = $this.attr('href');
		body.animate({'scrollTop': scrollTo}, 750);
	})

});