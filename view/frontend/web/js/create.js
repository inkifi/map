// 2019-08-26
define([
	'uiComponent', 'Inkifi_Map/js/create/model'
	,'jquery'
	,'Inkifi_Map/js/create/module/geocode'
	,'Inkifi_Map/js/create/module/mapbox'
	,'domReady!'
], function(_p, _m, $) {return _p.extend(_m).extend({initialize: function() {this._super();
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
return this;}})});