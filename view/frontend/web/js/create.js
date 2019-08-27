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
			const updateColors = v => {$colors.prop('disabled', 'frame' !== v);};
			$frames.change(() => {updateColors(this.value);});
			updateColors($frames.filter(':checked').val());
		})();
		(() => {
			const $sections = $('.ikf-sidebar-wide > section');
			const $aa = $('.ikf-sidebar-sticky nav > a');
			const c = 'ikf-active';
			$aa.click(() => {
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
	locate() {navigator.geolocation.getCurrentPosition(_.bind(r => {
		this.pos({lat: r.coords.latitude, lng: r.coords.longitude});
		this.updateH3();
	}, this));}
}));