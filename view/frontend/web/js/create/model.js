// 2019-08-26
define([
	'df', 'df-lodash', 'ko'
	,'Df_Core/thirdParty/URI/URI', 'Inkifi_Map/js/create/lib/geocode'
], (df, _ , ko, URI, geocode) => ({
	_init() {
		const _this = this;
		this.h1 = ko.observable();
		this.h2 = ko.observable();
		this.h3 = ko.observable();
		this.pos = ko.observable();
		this.pos.subscribe(v => {
			_this.h3(`${v.lat.toFixed(3)}°N/${v.lng.toFixed(3)}°E`);
			geocode(v.lat, v.lng).then(r => {_this.h1(r.city); _this.h2(r.country);});
			// 2019-08-29 `_.round()` truncates trailing zeros in contrast to `toFixed()`
			_this.updateURL({latitude: _.round(v.lat, 3), longitude: _.round(v.lng, 3)});
		});
		this.pos((() => {
			const q = _this.q();
			// 2019-08-29 `parseFloat` vs `Number`: https://stackoverflow.com/a/13676265
			return _.zipObject(['lat', 'lng'],
				q.latitude && q.longitude ? [Number(q.latitude), Number(q.longitude)] : [51.488, -0.075])
			;
		})());
		this.zoom = ko.observable(this.q().zoom || 10); // 2019-08-28 tiles.mappyplace.com supports zooms < 15
		this.zoom.subscribe(v => _this.updateURL('zoom', v));
		return this;
	},
	/**
	 * 2019-08-27
	 * 1) `location.search`: https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/search
	 * It is an empty string if the URL does not contain the `?...` part.
	 * 2) `URI.parseQuery`:
	 * https://github.com/mage2pro/core/blob/5.0.5/Core/view/base/web/thirdParty/URI/URI.js#L633-L668
	 * It returns an object hash. The hash is empty if the URL does not contain the `?...` part.
	 * 2019-08-29 http://medialize.github.io/URI.js/docs.html#static-parseQuery
	 * @used-by _init()
	 * @returns {Object}
	 */
	q: _.memoize(() => URI.parseQuery(location.search), () => location.search),
	/**
	 * 2019-08-29
	 * @used-by _init()
	 * @param {String|Object} k
	 * @param {String?} v
	 */
	updateURL(k, v) {
		const u = URI(location.href);
		// 2019-08-29 http://medialize.github.io/URI.js/docs.html#search-remove
		const f = (v, k) => u.removeSearch(k).addSearch(k, v);
		!_.isObject(k) ? f(v, k) : _.map(k, f);
		// 2019-08-29 https://stackoverflow.com/questions/12832317
		history.replaceState({} , document.title, u.toString());
	}
})._init()); // 2019-08-26 https://stackoverflow.com/a/4616273