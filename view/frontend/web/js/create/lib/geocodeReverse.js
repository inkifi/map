// 2019-08-24
define(['df-lodash'], _ => {
	const KEY = '6b0d03206e1b4d9f812be0b8c1a4475c';
	const URL = 'https://api.opencagedata.com/geocode/v1/json';
	// 2019-08-14
	// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
	// https://caniuse.com/#search=fetch	
	return async(lat, lng) => new Promise(resolve =>
		fetch(`${URL}?q=${lat}+${lng}&key=${KEY}&language=en&limit=1`).then(r => r.json()).then(r =>
			resolve(_.get(r, 'results[0].components'))
		)
	);
});