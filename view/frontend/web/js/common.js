// 2019-07-22
define(['jquery', 'domReady!'], function($) {return (function() {
	(() => {
		const $menu = $('.ikf-menu');
		const $page = $('.page-wrapper');
		// 2019-08-27
		// The arrow function syntax breaks `this` in jQuery event handlers:
		// https://stackoverflow.com/questions/27670401
		$('.ikf-burger > a').click(function() {
			const c = 'ikf-active';
			$(this).toggleClass(c);
			$menu.toggleClass(c);
			$page.toggleClass('ikf-mobile-menu');
		});
	})();
});});