// 2019-07-22
define([
	'jquery', 'ko', 'Inkifi_Map/js/create/lib/updateInput', 'domReady!'
], function($, ko, updateInput) {return (function() {
	(() => {
		const $menu = $('.ikf-menu');
		const $page = $('.page-wrapper');
		// 2019-08-27
		// The arrow function syntax breaks `this` in jQuery event handlers:
		// https://stackoverflow.com/questions/27670401
		$('.ikf-burger > a').click(function() {
			$(this).toggleClass('ikf-active');
			$menu.toggleClass('ikf-active');
			$page.toggleClass('ikf-mobile-menu');
		});
	})();
	(() => {
		// 2019-08-27 https://github.com/knockout/knockout/issues/1083#issuecomment-32794109
		var h = ko.bindingHandlers['textInput'];
		var f = h.init;
		h.init = function(e) {f.apply(h, arguments); updateInput(e);};
	})();
	$('input', $('.inkifi-map-index-index, .inkifi-map-create-index'))
		.each((i, e) => updateInput(e)).on('change paste keyup', updateInput)
	;
});});