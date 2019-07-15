// 2019-07-09
define(['jquery', 'domReady!', 'Inkifi_Map/carousel'], function($) {return (
/**
 * @param {Object} c
 * @param {HTMLDivElement} e
 */
function(c, e) {
	var $e = $(e);
	$('.ikf-cities', $e).slick({
		infinite: true
		,slidesToScroll: 3 // 2019-07-10 «# of slides to scroll at a time»
		,slidesToShow: 5.5  // 2019-07-10 «# of slides to show at a time»
		,centerMode: true
	});
});});