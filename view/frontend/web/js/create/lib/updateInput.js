// 2019-08-27
define(['jquery'], function($) {return function(e) {
	const $e = $(e);
	$e.toggleClass('ikf-has-value', '' !== $e.val());
};});