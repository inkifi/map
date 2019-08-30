// 2019-08-25
require(['jquery', 'Inkifi_Map/js/create/model'
	// 2019-08-23
	// mappyplace.com uses the version 0.53.1 (2019-02-28) of the Mapbox GL JS library:
	// https://github.com/mapbox/mapbox-gl-js/tree/v0.53.1
	,'https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.js'
], ($, _m, mapbox) => {
	// 2019-08-23
	// https://docs.mapbox.com/mapbox-gl-js/overview/#quickstart
	// https://docs.mapbox.com/mapbox-gl-js/api/#accesstoken
	mapbox.accessToken = 'pk.eyJ1IjoiZG1pdHJ5LWZlZHl1ayIsImEiOiJjanpwM2xzMmQwODl0M2Rtc3pzN2xvcXE1In0.1WSzOsyJSEzIPxAI1s-Rug';
	const pos = _m.pos();
	// 2019-08-23
	// https://docs.mapbox.com/mapbox-gl-js/api#map
	// https://github.com/dmitry-fedyuk/inkifi-mappyplace/blob/2019-07-02/src/components/pages/Editor.js#L111-L129
	// https://github.com/dmitry-fedyuk/inkifi-mappyplace/blob/2019-07-02/src/components/pages/Editor.js#L269-L271
	const map = new mapbox.Map({
		container: $('.ikf-map-4').get(0)
		,center: [pos.lng, pos.lat]
		// 2019-08-23
		// https://github.com/dmitry-fedyuk/inkifi-mappyplace/blob/2019-07-02/src/config.example.json#L8
		// https://github.com/dmitry-fedyuk/inkifi-mappyplace/blob/2019-07-02/src/components/pages/Editor.js#L34-L35
		// https://github.com/dmitry-fedyuk/inkifi-mappyplace/blob/2019-07-02/src/components/pages/Editor.js#L56-L62
		,style: 'https://tiles.mappyplace.com/styles/Contrast/style.json'
		,zoom: _m.zoom() // 2019-08-28 tiles.mappyplace.com supports zooms < 15
	});
	var moving = false;
	// 2019-08-25
	// https://docs.mapbox.com/mapbox-gl-js/api#setcenter
	// https://docs.mapbox.com/mapbox-gl-js/api#lnglatlike
	_m.pos.subscribe(v => moving || map.setCenter([v.lng, v.lat]));
	// 2019-08-28 https://docs.mapbox.com/mapbox-gl-js/api#setzoom
	_m.zoom.subscribe(v => map.setZoom(v));
	map.on('move', function(v) {
		/**
		 * 2019-08-30
		 * 1) https://github.com/mapbox/mapbox-gl-js/issues/6512#issuecomment-410586853
		 * 2) `_moving` is:
		 * 		`false` when the map is dragging my the mouse.
		 * 		`true` when	the dragging has been just ended.
		 */
		_m.canGeoCode(v.target._moving);
		try {
			moving = true;
			_m.pos(v.target.getCenter());
		}
		finally {moving = false;}
	});
});