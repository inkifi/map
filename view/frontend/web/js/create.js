// 2019-08-26
define([
	'uiComponent', 'Inkifi_Map/js/create/model', 'jquery', 'Inkifi_Map/js/create/module/mapbox'
], (_p, _m, $) => _p.extend(_m).extend({
	/** 2019-08-31 I defined a handler to prevent the form's submision on the `Enter` key press. */
	buy() {},
    /**
	 * 2019-08-27
	 * @used-by https://github.com/inkifi/map/blob/0.0.7/view/frontend/templates/create/form/location.phtml#L1
	 */
	locate() {navigator.geolocation.getCurrentPosition(_.bind(r => {
		this.locationS(null);
		this.pos({lat: r.coords.latitude, lng: r.coords.longitude});
	}, this));},
	/**
	 * 2019-08-30
	 * 1) The `scope` binding destroys all previously set jQuery event bindings:
	 * 		ko.utils.arrayForEach(el.childNodes, ko.cleanNode);
	 * https://github.com/magento/magento2/blob/2.3.2/app/code/Magento/Ui/view/base/web/js/lib/knockout/bindings/scope.js#L32
	 * So we can not bind jQuery event handlers in the compontent's `initialize()` method,
	 * and we use the `afterRender` function instead.
	 */
	onRender() {
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
	},
    /**
	 * 2019-08-28
	 * @used-by https://github.com/inkifi/map/blob/0.0.9/view/frontend/templates/create/article.phtml#L4-L6
	 */
	zoomChange(view, ev) {this.zoom(_.round(_.clamp(
		this.zoom() - 0.3 * (2 * $(ev.currentTarget).index() - 1
	), 1, 14.999), 3));}
}));