// 2019-08-27 https://stackoverflow.com/a/25733267
require(['jquery', 'ko'], ($, ko) => {
	const c = 'ikf-has-value';
	const inputChange = e => {const $e = $(e); $e.toggleClass(c, '' !== $e.val());};
	(() => {
		// 2019-08-27 https://github.com/knockout/knockout/issues/1083#issuecomment-32794109
		var h = ko.bindingHandlers['textInput'];
		var init = h.init;
		h.init = function(e) {init.apply(h, arguments); inputChange(e);};
	})();
	ko.bindingHandlers.ikfChange = {init(e, nu, aF) {
		const a = aF(); const $e = $(e);
		// 2019-08-30 We work with the `value` and `textInput` bindings.
		(a.value || a.textInput).subscribe(v => $e.toggleClass(c, '' !== v));
	}};
	require(['domReady!'], () => {
		$('input', $('.inkifi-map-index-index, .inkifi-map-create-index'))
			.each((i, e) => inputChange(e)).on('change paste keyup', inputChange)
		;
	});
});