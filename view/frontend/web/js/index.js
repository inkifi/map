// 2019-07-09
define(['jquery', 'domReady!', 'Inkifi_Map/carousel'], function($) {return (
/**
 * @param {Object} c
 * @param {HTMLDivElement} e
 */
function(c, e) {
	var $e = $(e);
	(function() {
		var $e = $('.ikf-cities', $e);
		const slidesToShow = function() {
			var w = $(window).width();
			return (w > 1739 ? 5.7 : (w > 1469 ? 4.7 : (w > 1024 ? 3.8 : (w > 640 ? 3.3 : 1.9))));
		};
		$e.slick({
			// 2019-07-15
			// «Enables centered view with partial prev/next slides.
			// Use with odd numbered slidesToShow counts.»
			centerMode: true
			,infinite: true
			,slidesToScroll: 3 // 2019-07-10 «# of slides to scroll at a time»
			,slidesToShow: slidesToShow()  // 2019-07-10 «# of slides to show at a time»
		});
		$(window).resize(function() {$e.slick('slickSetOption', 'slidesToShow', slidesToShow(), false);});
	})();
});});