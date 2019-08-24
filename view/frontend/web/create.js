// 2019-08-08
define([
	'df-lodash', 'jquery'
	// 2019-08-23
	// mappyplace.com uses the version 0.53.1 (2019-02-28) of the Mapbox GL JS library:
	// https://github.com/mapbox/mapbox-gl-js/tree/v0.53.1
	,'https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.js'
	,'domReady!'
], function(_, $, mapbox) {return (function() {
	// 2019-08-23 https://docs.mapbox.com/mapbox-gl-js/overview/#quickstart
	mapbox.accessToken = 'pk.eyJ1IjoiZG1pdHJ5LWZlZHl1ayIsImEiOiJjanpwM2xzMmQwODl0M2Rtc3pzN2xvcXE1In0.1WSzOsyJSEzIPxAI1s-Rug';
	const $editor = $('.ikf-editor');
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
	const $iH1 = $('input[name=h1]');
	const $iH2 = $('input[name=h2]');
	const $iH3 = $('input[name=h3]');
	(function() {
		const $label = $('article .ikf-label', $editor);
		const $h1 = $('h1', $label);
		const $h2 = $('h2', $label);
		const $h3 = $('h3', $label);
		$iH1.add($iH2).add($iH3).on('keyup paste', function() {$(this).change();});
		$iH1.on('change', function() {$h1.html($(this).val());});
		$iH2.change(function() {$h2.html($(this).val());});
		$iH3.change(function() {$h3.html($(this).val());});
	})();
	(function() {
		const KEY = '6b0d03206e1b4d9f812be0b8c1a4475c';
		const URL = 'https://api.opencagedata.com/geocode/v1/json';
		const formatCity = function(v) {return v !== 'Palma' ? v : 'Palma de Mallorca';};
		const formatCountry = function(v) {return v !== 'PRC' ? v : 'China';};
		const getGeocodeByCoords = async (lat, lng) => {return new Promise((resolve) => {return(
			// 2019-08-14
			// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
			// https://caniuse.com/#search=fetch
			fetch(`${URL}?q=${lat}+${lng}&key=${KEY}&language=en`).then((r) => r.json()).then((r) => {
				const c = _.get(r, 'results[0].components');
				if (c) {
					resolve({city: formatCity(c.city), country: formatCountry(c.country), state: c.state});
				}
			})
		);});};
		$('button.ikf-location').click(function(e) {
			e.preventDefault();
			navigator.geolocation.getCurrentPosition(function(r) {
				const lat = r.coords.latitude;
				const lng = r.coords.longitude;
				/**
				 * 2019-08-14
				 * Starting from Firefox 34 / Chrome 41 / Safari 9 / Microsoft Edge
				 * you can use an ES2015 / ES6 feature called Template Literals:
				 * https://stackoverflow.com/a/28088965
				 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
				 * https://caniuse.com/#search=Template%20Literals
				 * The plain JS code is:
				 * 		''.concat(Number(lat).toFixed(3), "\xb0N/").concat(Number(lng).toFixed(3), "\xb0E")
				 */
				var coord = `${Number(lat).toFixed(3)}°N/${Number(lng).toFixed(3)}°E`;
				// 2019-08-14 `.val()` does not trigger `change`: https://stackoverflow.com/a/3179392
				$iH3.val(coord).change();
				getGeocodeByCoords(lat, lng).then((r) => {
					$iH1.val(r.city).change();
					$iH2.val(r.country).change();
				});
			});
		});
	})();
});});