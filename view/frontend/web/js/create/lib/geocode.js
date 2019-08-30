// 2019-08-24
define(['df-lodash'], _ => {
	const fCity = v => v !== 'Palma' ? v : 'Palma de Mallorca';
	const fCountry = v => v !== 'PRC' ? v : 'China';
	const KEY = '6b0d03206e1b4d9f812be0b8c1a4475c';
	const URL = 'https://api.opencagedata.com/geocode/v1/json';
	// 2019-08-14
	// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
	// https://caniuse.com/#search=fetch	
	return async(lat, lng, zoom) => new Promise(resolve =>
		fetch(`${URL}?q=${lat}+${lng}&key=${KEY}&language=en&limit=1`).then(r => r.json()).then(r => {
			const c = _.get(r, 'results[0].components');
			if (c) {
				const h1 = zoom < 8 ? c.state : (
					zoom < 10 ? c.county : c.c.city || c.town || c.village || c.suburb || c.hamlet
				);
				h1 || console.log(JSON.stringify(c));
				resolve({h1: fCity(h1), h2: fCountry(c.country)});
			}
		})
	);
});