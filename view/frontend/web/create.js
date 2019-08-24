// 2019-08-08
define([
	'df-lodash', 'jquery'
	// 2019-08-23
	// mappyplace.com uses the version 0.53.1 (2019-02-28) of the Mapbox GL JS library:
	// https://github.com/mapbox/mapbox-gl-js/tree/v0.53.1
	,'https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.js'
	,'domReady!'
	,'Inkifi_Map/create/geocode'
], function(_, $, mapbox) {return (function() {
	(function() {
		const $colors = $('input[name="color"]');
		const $frames = $('input[name="frame"]');
		const updateColors = function(v) {$colors.prop('disabled', 'frame' !== v);};
		$frames.change(function() {updateColors(this.value);});
		updateColors($frames.filter(':checked').val());
	})();
	(function() {
		const $sections = $('.ikf-sidebar-wide > section');
		const $aa = $('.ikf-sidebar-sticky nav > a');
		const c = 'ikf-active';
		$aa.click(function() {
			const $this = $(this);
			$aa.removeClass(c);
			$this.addClass(c);
			$sections.removeClass(c).eq($this.index()).addClass(c);
			if (1 === $aa.length - $this.index()) {
				$sections.last().addClass(c);
			}
		});
	})();
	(function() {
		// 2019-08-23
		// https://docs.mapbox.com/mapbox-gl-js/overview/#quickstart
		// https://docs.mapbox.com/mapbox-gl-js/api/#accesstoken
		mapbox.accessToken = 'pk.eyJ1IjoiZG1pdHJ5LWZlZHl1ayIsImEiOiJjanpwM2xzMmQwODl0M2Rtc3pzN2xvcXE1In0.1WSzOsyJSEzIPxAI1s-Rug';
		// 2019-08-23 https://docs.mapbox.com/mapbox-gl-js/api/#map
		var map = new mapbox.Map({
			container: $('.ikf-map-4').get(0)
			// 2019-08-23
			// https://github.com/inkifi/mappyplace/blob/2019-07-02/src/config.example.json#L8
			// https://github.com/inkifi/mappyplace/blob/2019-07-02/src/components/pages/Editor.js#L34-L35
			// https://github.com/inkifi/mappyplace/blob/2019-07-02/src/components/pages/Editor.js#L56-L62
			,style: 'https://tiles.mappyplace.com/styles/Contrast/style.json'
		});
	})();
});});