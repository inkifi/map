// 2019-07-22
define(['jquery', 'domReady!'], function($) {return (function() {
	(function() {
		const $menu = $('.ikf-menu');
		const $page = $('.page-wrapper');
		$('.ikf-burger > a').click(function() {
			$(this).toggleClass('ikf-active');
			$menu.toggleClass('ikf-active');
			$page.toggleClass('ikf-mobile-menu');
		});
	})();
	(function() {
		const $inputs = $('input', $('.inkifi-map-index-index, .inkifi-map-create-index'));
		const f = function() {const $e = $(this); $e.toggleClass('ikf-has-value', '' !== $e.val())};
		$inputs.each(f).on('change paste keyup', f);
	})();
});});