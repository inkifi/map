// 2019-07-22
define(['jquery', 'domReady!'], function($) {return (
/**
 * @param {Object} c
 * @param {HTMLDivElement} e
 */
function(c, e) {
	(function() {
		var $menu = $('.ikf-menu');
		var $page = $('.page-wrapper');
		$('.ikf-burger > a').click(function() {
			$(this).toggleClass('ikf-active');
			$menu.toggleClass('ikf-active');
			$page.toggleClass('ikf-mobile-menu');
		});
	})();
	(function() {
		var $inputs = $('input', $('.inkifi-map-index-index, .inkifi-map-create-index'));
		var f = function() {var $e = $(this); $e.toggleClass('ikf-has-value', '' !== $e.val())};
		$inputs.each(f).on('change paste keyup', f);
	})();
});});