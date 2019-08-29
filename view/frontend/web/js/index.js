// 2019-07-09
require(['jquery', 'Inkifi_Map/lib/carousel/main', 'domReady!'], $ => {
	const $e = $('.ikf-cities');
	const slidesToShow = () => {
		const w = $(window).width();
		return (w > 1739 ? 5.7 : (w > 1469 ? 4.7 : (w > 1024 ? 3.8 : (w > 640 ? 3.3 : 1.9))));
	};
	// 2019-08-27 I added `style='display:none'` to prevent images flickering before the carousel's initialization.
	$e.removeAttr('style');
	// 2019-08-28 http://kenwheeler.github.io/slick
	$e.slick({
		// 2019-07-15
		// «Enables centered view with partial prev/next slides.
		// Use with odd numbered slidesToShow counts.»
		centerMode: true
		,infinite: true
		,slidesToScroll: 3 // 2019-07-10 «# of slides to scroll at a time»
		,slidesToShow: slidesToShow()  // 2019-07-10 «# of slides to show at a time»
		// 2019-08-28
		// 1) «Allow users to drag or swipe directly to a slide irrespective of slidesToScroll».
		// 2) It allows us to drag a particular slide to a desired place by a mouse.
		,swipeToSlide: true
	});
	$(window).resize(() => {$e.slick('slickSetOption', 'slidesToShow', slidesToShow(), false);});
});