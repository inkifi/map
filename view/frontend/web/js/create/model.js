// 2019-08-26
define(['ko'], function(ko) {return {
	_init: function() {
		this.posS = ko.computed(function() {
			var v = this.pos();
			return `${Number(v.lat).toFixed(3)}°N/${Number(v.lng).toFixed(3)}°E`;
		}, this);
		return this;
	}
	,pos: ko.observable({lat: 51.5, lng: -0.1})
}._init();}); // 2019-08-26 https://stackoverflow.com/a/4616273