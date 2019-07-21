// 2019-07-22
define(['jquery', 'domReady!'], function($) {return (
/**
 * @param {Object} c
 * @param {HTMLDivElement} e
 */
function(c, e) {
	var $e = $(e);
	(function() {
		var $menu = $('.ikf-menu');
		var $page = $('.page-wrapper');
		$('.ikf-burger > a', $e).click(function() {
			$menu.toggleClass('ikf-active');
			$page.toggleClass('ikf-mobile-menu');
		});
	})();
});});