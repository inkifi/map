// 2019-07-22
require(['jquery', 'domReady!'], $ => {
	const $menu = $('.ikf-menu');
	const $page = $('.page-wrapper');
	// 2019-08-27
	// The arrow function syntax breaks `this` in jQuery event handlers:
	// https://stackoverflow.com/questions/27670401
	$('.ikf-burger > a').click(function() {
		$(this).add($menu).toggleClass('ikf-active');
		$page.toggleClass('ikf-mobile-menu');
	});
});