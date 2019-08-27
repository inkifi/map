// 2019-08-27 https://stackoverflow.com/a/25733267
require(['jquery', 'ko'], function($, ko) {
	ko.bindingHandlers.ikfChange = {
		init: function (e, valueAccessor, allBindingsAccessor) {
			const $e = $(e);
			allBindingsAccessor().textInput.subscribe(function(v) {
				$e.toggleClass('ikf-has-value', '' !== v);
			});
		}
	}
});