// 2019-08-08
define(['df-lodash', 'jquery', 'domReady!'], function(_, $) {return (function() {
	(function() {
		var $colors = $('input[name="color"]');
		var $frames = $('input[name="frame"]');
		var updateColors = function(v) {$colors.prop('disabled', 'frame' !== v);};
		$frames.change(function() {updateColors(this.value);});
		updateColors($frames.filter(':checked').val());
	})();
	(function() {
		var $sections = $('.ikf-sidebar-wide > section');
		var $aa = $('.ikf-sidebar-sticky nav > a');
		var c = 'ikf-active';
		$aa.click(function() {
			var $this = $(this);
			$aa.removeClass(c);
			$this.addClass(c);
			$sections.removeClass(c).eq($this.index()).addClass(c);
			if (1 === $aa.length - $this.index()) {
				$sections.last().addClass(c);
			}
		});
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
				var lat = r.coords.latitude;
				var lng = r.coords.longitude;
				/**
				 * 2019-08-14
				 * Starting from Firefox 34 / Chrome 41 / Safari 9 / Microsoft Edge
				 * you can use an ES2015 / ES6 feature called Template Literals:
				 * https://stackoverflow.com/a/28088965
				 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
				 * https://caniuse.com/#search=Template%20Literals
				 * The plain JS code is:
				 * 		var coord = ''.concat(Number(lat).toFixed(3), "\xb0N/").concat(Number(lng).toFixed(3), "\xb0E");
				 */
				var coord = `${Number(lat).toFixed(3)}°N/${Number(lng).toFixed(3)}°E`;
				$('input[name=tagLine]').val(coord);
				getGeocodeByCoords(lat, lng).then((r) => {
					$('input[name=header]').val(r.city);
					$('input[name=divider]').val(r.country);
				});
			});
		});
	})();

});});