// 2019-08-24
define(['df-lodash'], function(_) {
	const KEY = '6b0d03206e1b4d9f812be0b8c1a4475c';
	const URL = 'https://api.opencagedata.com/geocode/v1/json';
	const formatCity = function(v) {return v !== 'Palma' ? v : 'Palma de Mallorca';};
	const formatCountry = function(v) {return v !== 'PRC' ? v : 'China';};
	return async(lat, lng) => {return new Promise((resolve) => {return(
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
});