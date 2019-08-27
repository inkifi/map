// 2019-08-26
define([
	'df', 'df-lodash', 'ko'
	,'Df_Core/thirdParty/URI/URI', 'Inkifi_Map/js/create/lib/geocode'
], (df, _ , ko, URI, geocode) => ({
	_init() {
		var _this = this;
		this.pos = ko.observable((() => {
			var q = _this.q();
			return q.latitude && q.longitude
				? {lat: q.latitude, lng: q.longitude}
				: {lat: 51.487971262617, lng: -0.074918480033487}
			;
		})());
		this.posS = ko.pureComputed(() => {
			var v = _this.pos();
			return `${Number(v.lat).toFixed(3)}°N/${Number(v.lng).toFixed(3)}°E`;
		});
		this.h1 = ko.observable();
		this.h2 = ko.observable();
		this.h3 = ko.observable();
		this.updateH3();
		this.pos.subscribe(v => {
			geocode(v.lat, v.lng).then(r => {_this.h1(r.city); _this.h2(r.country);});
		});
		return this;
	},
	/**
	 * 2019-08-27
	 * 1) `location.search`: https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/search
	 * It is an empty string if the URL does not contain the `?...` part.
	 * 2) `URI.parseQuery`:
	 * https://github.com/mage2pro/core/blob/5.0.5/Core/view/base/web/thirdParty/URI/URI.js#L633-L668
	 * It returns an object hash. The hash is empty if the URL does not contain the `?...` part.
	 * @returns {Object}
	 */
	q: _.once(() => URI.parseQuery(location.search)),
	/**
	 * 2019-08-27
	 * @used-by _init()
	 * @used-by Inkifi_Map/js/create::locate()
	 */
	updateH3() {this.h3(this.posS());}
})._init()); // 2019-08-26 https://stackoverflow.com/a/4616273