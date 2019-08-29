// 2019-08-26
define([
	'uiComponent', 'Inkifi_Map/js/create/model'
	,'jquery'
	,'Inkifi_Map/js/create/module/mapbox'
	,'domReady!'
], (_p, _m, $) => _p.extend(_m).extend({
	initialize() {
		this._super();
		(() => {
			const $colors = $('input[name="color"]');
			const $frames = $('input[name="frame"]');
			const f = v => {$colors.prop('disabled', 'frame' !== v);};
			// 2019-08-27
			// The arrow function syntax breaks `this` in jQuery event handlers:
			// https://stackoverflow.com/questions/27670401
			$frames.change(function() {f(this.value);});
			f($frames.filter(':checked').val());
		})();
		(() => {
			const $sections = $('.ikf-sidebar-wide > section');
			const $aa = $('.ikf-sidebar-sticky nav > a');
			const c = 'ikf-active';
			// 2019-08-27
			// The arrow function syntax breaks `this` in jQuery event handlers:
			// https://stackoverflow.com/questions/27670401
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
		return this;
	}, 
    /**
	 * 2019-08-27
	 * @used-by https://github.com/inkifi/map/blob/0.0.7/view/frontend/templates/create/form/location.phtml#L1
	 */
	locate() {navigator.geolocation.getCurrentPosition(_.bind(r =>
		this.pos({lat: r.coords.latitude, lng: r.coords.longitude})
	, this));},
    /**
	 * 2019-08-28
	 * @used-by https://github.com/inkifi/map/blob/0.0.9/view/frontend/templates/create/article.phtml#L4-L6
	 */
	zoomChange(view, ev) {this.zoom(_.round(_.clamp(
		this.zoom() - 0.3 * (2 * $(ev.currentTarget).index() - 1
	), 1, 14.999), 3));}
}));