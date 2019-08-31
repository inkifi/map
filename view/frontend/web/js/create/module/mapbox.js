/**
 * 2019-08-25
 * 2019-08-31
 * This module is always executed after `model` because this module requires `model`.
 * This order is important because this module relies on the `model` proper initialization.
 */
require(['jquery', 'Inkifi_Map/js/create/model'
	// 2019-08-23
	// mappyplace.com uses the version 0.53.1 (2019-02-28) of the Mapbox GL JS library:
	// https://github.com/mapbox/mapbox-gl-js/tree/v0.53.1
	,'https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.js'
], ($, _m, mapbox) => {
	// 2019-08-23
	// https://docs.mapbox.com/mapbox-gl-js/overview/#quickstart
	// https://docs.mapbox.com/mapbox-gl-js/api/#accesstoken
	mapbox.accessToken = window.inkifiMap.keys.mapBox;
	const pos = _m.pos();
	const style = v => `https://tiles.mappyplace.com/styles/${v}/style.json`;
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
		,style: style(_m.style())
		,zoom: _m.zoom() // 2019-08-28 tiles.mappyplace.com supports zooms < 15
	});
	// 2019-08-31 https://docs.mapbox.com/mapbox-gl-js/api/#resize
	map.on('load', () => map.resize()); // 2019-08-31 It is needed for the landscape orientation.
	_m.orientation.subscribe(() => map.resize());
	_m.size.subscribe(() => map.resize());
	var dragging = false;
	var zooming = false;
	// 2019-08-25
	// https://docs.mapbox.com/mapbox-gl-js/api#setcenter
	// https://docs.mapbox.com/mapbox-gl-js/api#lnglatlike
	_m.pos.subscribe(v => dragging || map.setCenter([v.lng, v.lat]));
	_m.zoom.subscribe(v => zooming || map.setZoom(v)); // 2019-08-28 https://docs.mapbox.com/mapbox-gl-js/api#setzoom
	_m.style.subscribe(v => map.setStyle(style(v))); // 2019-08-31 https://docs.mapbox.com/mapbox-gl-js/api/#map#setstyle
	// 2019-08-30 https://docs.mapbox.com/mapbox-gl-js/api/#map.event:drag
	map.on('drag', v => {_m.canGeoCode(false); dragging = true; _m.pos(v.target.getCenter());});
	// 2019-08-30 https://docs.mapbox.com/mapbox-gl-js/api/#map.event:dragend
	map.on('dragend', v => {_m.canGeoCode(true); dragging = false; _m.pos(v.target.getCenter());});
	// 2019-08-30 https://docs.mapbox.com/mapbox-gl-js/api/#map.event:zoom
	map.on('zoom', v => {
		try {
			zooming = true;
			_m.zoom(_.round(v.target.getZoom(), 3));
		}
		finally {zooming = false;}
	});
});