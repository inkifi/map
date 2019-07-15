// 2019-07-09
define(['jquery', 'domReady!', 'Inkifi_Map/carousel'], function($) {return (
/**
 * @param {Object} c
 * @param {HTMLDivElement} e
 */
function(c, e) {
	var $e = $(e);
	$('.ikf-cities', $e).slick({
		// 2019-07-15
		// «Enables centered view with partial prev/next slides.
		// Use with odd numbered slidesToShow counts.»
		centerMode: true
		,infinite: true
		,slidesToScroll: 3 // 2019-07-10 «# of slides to scroll at a time»
		,slidesToShow: 5.7  // 2019-07-10 «# of slides to show at a time»
	});
});});