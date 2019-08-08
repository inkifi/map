// 2019-08-08
define(['jquery', 'domReady!'], function($) {return (
/**
 * @param {Object} c
 * @param {HTMLDivElement} e
 */
function(c, e) {
	var $e = $(e);
	(function() {
		var $colors = $('input[name="color"]');
		var $frames = $('input[name="frame"]');
		var updateColors = function(v) {$colors.prop('disabled', 'frame' !== v);};
		$frames.change(function() {updateColors(this.value);});
		updateColors($frames.filter(':checked').val());
	})();
});});