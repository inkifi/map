// 2019-07-22
define(['jquery', 'domReady!'], function($) {return (function() {
	(() => {
		const $menu = $('.ikf-menu');
		const $page = $('.page-wrapper');
		$('.ikf-burger > a').click(() => {
			$(this).toggleClass('ikf-active');
			$menu.toggleClass('ikf-active');
			$page.toggleClass('ikf-mobile-menu');
		});
	})();
	(() => {
		const f = () => {const $e = $(this); $e.toggleClass('ikf-has-value', '' !== $e.val())};
		$('input', $('.inkifi-map-index-index, .inkifi-map-create-index')).each(f).on('change paste keyup', f);
	})();
});});