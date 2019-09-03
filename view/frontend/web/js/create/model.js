// 2019-08-26
define([
	'df', 'df-lodash', 'jquery', 'ko'
	,'Df_Core/thirdParty/URI/URI'
	,'Inkifi_Map/js/create/lib'
	,'Inkifi_Map/js/create/lib/geocodeReverse'
	,`https://maps.googleapis.com/maps/api/js?key=${window.inkifiMap.keys.google}&libraries=places&language=en`
], (df, _ , $, ko, URI, lib, geocodeReverse) => ({
	_init() {
		const _this = this;
		this.h1 = ko.observable();
		this.h2 = ko.observable();
		this.h3 = ko.observable();
		/**
		 * 2019-08-30
		 * @used-by _init()
		 * @used-by Inkifi_Map::create/module/mapbox
		 */
		this.canGeoCode = ko.observable(true);
		this.pos = ko.observable();
		this.zoom = ko.observable(this.q().zoom || 10); // 2019-08-28 tiles.mappyplace.com supports zooms < 15
		var geoLocation;
		const updateH1ByZoom = () => {
			const l = geoLocation;
			const z = _this.zoom();
			if (l && z) {
				const fCity = v => v !== 'Palma' ? v : 'Palma de Mallorca';
				const h1 = z < 8 && l.state ? l.state : (
					z < 9.8 && l.county ? l.county : (
						l.city ? fCity(l.city) : l.town || l.village || l.suburb || l.hamlet || l.county || l.state
					)
				);
				h1 || console.log(JSON.stringify(l));
				_this.h1(h1);
			}
		};
		(() => {
			var vr, vg;
			_this.pos.subscribe(v => {
				if (0.01 < lib.dist(v, vr)) {
					vr = v;
					_this.h3(`${v.lat.toFixed(3)}°N/${v.lng.toFixed(3)}°E`);
					// 2019-08-29 `_.round()` truncates trailing zeros in contrast to `toFixed()`
					_this.updateURL({latitude: _.round(v.lat, 3), longitude: _.round(v.lng, 3)});
				}
				if (_this.canGeoCode()) {
					const vgd = lib.dist(v, vg);
					//console.log(vgd);
					if (0.01 < vgd) {
						console.log('geocode');
						vg = v;
						geocodeReverse(v.lat, v.lng).then(r => {
							geoLocation = r;
							updateH1ByZoom();
							_this.h2(r.country !== 'PRC' ? r.country : 'China');
						});
					}
				}
			});
		})();
		this.pos((() => {
			const q = _this.q();
			// 2019-08-29 `parseFloat` vs `Number`: https://stackoverflow.com/a/13676265
			return _.zipObject(['lat', 'lng'],
				q.latitude && q.longitude ? [Number(q.latitude), Number(q.longitude)] : [51.488, -0.075])
			;
		})());
		this.zoom.subscribe(v => {
			_this.updateURL('zoom', v);
			updateH1ByZoom();
		});
		(() => {
			const geocoder = new google.maps.Geocoder();
			_this.locationS = ko.observable();
			_this.locationS.subscribe(v => !v ? null : geocoder.geocode({address: v}, r => {
				if (r && r[0]) {
					//console.log(r[0]);
					const l = _.get(r[0], 'geometry.location');
					_this.pos({lat: l.lat(), lng: l.lng()});
				}
			}));
		})();
		(() => {
			var prev;
			_this.color = ko.observable();
			_this.color.subscribe(v => {
				_this.updateURL('color', v);
				if (v) {
					prev = v;
				}
			});
			_this.color(_this.q().color);
			_this.frame = ko.observable();
			_this.frame.subscribe(v => {
				_this.updateURL('frame', v);
				_this.color('Frame' === v ? prev : null);
			});
		})();
		this.frame(this.q().frame || 'Poster');
		(() => {
			const defaultOrientation = 'Portrait';
			_this.orientation = ko.observable();
			_this.orientation.subscribe(v => _this.updateURL('orientation', v));
			_this.orientation(_this.q().orientation || defaultOrientation);
			const classes = {'12×16in': '3x4', '18×24in': '3x4', '20×28in': '5x7', '24×36in': '2x3', '28×40in': '7x10'};
			_this.size = ko.observable();
			_this.size.subscribe(v => _this.updateURL('size', v));
			_this.size(_this.q().size || '12×16in');
			_this.mapC = ko.computed(() => [
				'ikf-map-1'
				,_this.orientation().toLowerCase()
				,`ikf-ratio-${classes[_this.size()]}`
				,!_this.color() ? null : `ikf-color-${_this.color().toLowerCase()}`
			].join(' '));
			_this.pencilC = ko.computed(() => [
				'ikf-pencil', `ikf-size-${_this.size().replace('in', '').replace('×', 'x')}`
			].join(' '));
			$('.ikf-map-1').removeAttr('style');
		})();
		this.style = ko.observable();
		this.style.subscribe(v => _this.updateURL('style', v));
		this.style(this.q().style || 'Contrast');
		this.labelC = ko.computed(() => ['ikf-label', _this.style().toLowerCase()].join(' '));
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
		const f = (v, k) => {
			u.removeSearch(k);
			if (v) {
				u.addSearch(k, v);
			}
		};
		!_.isObject(k) ? f(v, k) : _.map(k, f);
		// 2019-08-29 https://stackoverflow.com/questions/12832317
		history.replaceState({} , document.title, u.toString());
	}
})._init()); // 2019-08-26 https://stackoverflow.com/a/4616273