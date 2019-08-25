// 2019-08-25
define(['df-lodash', 'jquery'
	,'Inkifi_Map/js/create/lib/model'
	// 2019-08-23
	// mappyplace.com uses the version 0.53.1 (2019-02-28) of the Mapbox GL JS library:
	// https://github.com/mapbox/mapbox-gl-js/tree/v0.53.1
	,'https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.js'
], function(_, $, model, mapbox) {return (function() {
	// 2019-08-23
	// https://docs.mapbox.com/mapbox-gl-js/overview/#quickstart
	// https://docs.mapbox.com/mapbox-gl-js/api/#accesstoken
	mapbox.accessToken = 'pk.eyJ1IjoiZG1pdHJ5LWZlZHl1ayIsImEiOiJjanpwM2xzMmQwODl0M2Rtc3pzN2xvcXE1In0.1WSzOsyJSEzIPxAI1s-Rug';
	var pos = model.pos();
	// 2019-08-23
	// https://docs.mapbox.com/mapbox-gl-js/api/#map
	// https://github.com/inkifi/mappyplace/blob/2019-07-02/src/components/pages/Editor.js#L111-L129
	// https://github.com/inkifi/mappyplace/blob/2019-07-02/src/components/pages/Editor.js#L269-L271
	var map = new mapbox.Map({
		container: $('.ikf-map-4').get(0)
		,center: [pos.lng, pos.lat]
		// 2019-08-23
		// https://github.com/inkifi/mappyplace/blob/2019-07-02/src/config.example.json#L8
		// https://github.com/inkifi/mappyplace/blob/2019-07-02/src/components/pages/Editor.js#L34-L35
		// https://github.com/inkifi/mappyplace/blob/2019-07-02/src/components/pages/Editor.js#L56-L62
		,style: 'https://tiles.mappyplace.com/styles/Contrast/style.json'
		,zoom: 10
	});
	model.pos.subscribe(function(v) {
		// 2019-08-25
		// https://docs.mapbox.com/mapbox-gl-js/api/#map#setcenter
		// https://docs.mapbox.com/mapbox-gl-js/api/#lnglatlike
		map.setCenter([v.lng, v.lat]);
	});
})();});