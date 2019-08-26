// 2019-08-26
define([
	'uiComponent', 'Inkifi_Map/js/create/model'
	,'jquery'
	,'Df_Core/thirdParty/URI/URI'
	,'Inkifi_Map/js/create/module/geocode'
	,'Inkifi_Map/js/create/module/mapbox'
	,'domReady!'
], function(_p, _m, $, URI) {return _p.extend(_m).extend({initialize: function() {this._super();
(function() {
	const $colors = $('input[name="color"]');
	const $frames = $('input[name="frame"]');
	const updateColors = function(v) {$colors.prop('disabled', 'frame' !== v);};
	$frames.change(function() {updateColors(this.value);});
	updateColors($frames.filter(':checked').val());
})();
(function() {
	const $sections = $('.ikf-sidebar-wide > section');
	const $aa = $('.ikf-sidebar-sticky nav > a');
	const c = 'ikf-active';
	$aa.click(function() {
		const $this = $(this);
		$aa.removeClass(c);
		$this.addClass(c);
		$sections.removeClass(c).eq($this.index()).addClass(c);
		if (1 === $aa.length - $this.index()) {
			$sections.last().addClass(c);
		}
	});
})();
(function() {
	// 2019-08-25
	// 1) `location.search`: https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/search
	// It is an empty string if the URL does not contain the `?...` part.
	// 2) `URI.parseQuery`:
	// https://github.com/mage2pro/core/blob/5.0.5/Core/view/base/web/thirdParty/URI/URI.js#L633-L668
	// It returns an object hash. The hash is empty if the URL does not contain the `?...` part.
	var q = URI.parseQuery(location.search);
	if (q.latitude && q.longitude) {
		_m.pos({lat: q.latitude, lng: q.longitude});
	}
})();
return this;}})});