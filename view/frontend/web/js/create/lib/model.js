// 2019-08-25
define(['jquery', 'ko'], function($, ko) {return {
	pos: ko.observable({lat: 51.5, lng: -0.1})
	,posS: ko.computed(function() {
		var v = this.pos();
		return `${Number(v.lat).toFixed(3)}°N/${Number(v.lng).toFixed(3)}°E`;
	})
};});