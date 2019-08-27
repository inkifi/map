// 2019-08-24
define(['df-lodash', 'jquery', 'Inkifi_Map/js/create/model', 'domReady!'], function(_, $, _m) {return (function() {
	(function() {
		const $editor = $('.ikf-editor');
		const $iH1 = $('input[name=h1]');
		const $iH2 = $('input[name=h2]');
		//const $iH3 = $('input[name=h3]');
		const $label = $('article .ikf-label', $editor);
		const $h1 = $('h1', $label);
		const $h2 = $('h2', $label);
		//const $h3 = $('h3', $label);
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
		$iH1.add($iH2)/*.add($iH3)*/.on('keyup paste', function() {$(this).change();});
		$iH1.on('change', function() {$h1.html($(this).val());});
		$iH2.change(function() {$h2.html($(this).val());});
		//$iH3.change(function() {$h3.html($(this).val());});
		_m.pos.subscribe(function(v) {
			/**
			 * 2019-08-14
			 * 1) Starting from Firefox 34 / Chrome 41 / Safari 9 / Microsoft Edge
			 * you can use an ES2015 / ES6 feature called Template Literals:
			 * https://stackoverflow.com/a/28088965
			 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
			 * https://caniuse.com/#search=Template%20Literals
			 * The plain JS code is:
			 * 		''.concat(Number(lat).toFixed(3), "\xb0N/").concat(Number(lng).toFixed(3), "\xb0E")
			 * 2) 2019-08-14 `.val()` does not trigger `change`: https://stackoverflow.com/a/3179392
			 */
			//$iH3.val(model.posS()).change();
			getGeocodeByCoords(v.lat, v.lng).then((r) => {
				$iH1.val(r.city).change();
				$iH2.val(r.country).change();
			});
		});
	})();
})();});