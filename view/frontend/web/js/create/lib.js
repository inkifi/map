// 2019-08-29
define([], () => ({
	/**
	 * 2019-08-29
	 * «What is the maximum length of latitude and longitude?»: https://stackoverflow.com/a/16743805
	 * @param {Number?} a
	 * @param {Number?} b
	 * @returns {Number}
	 */
	dist(a, b) {return !a || !b ? 1000 : Math.sqrt(Math.pow(a.lat - b.lat, 2) + Math.pow(a.lng - b.lng, 2));}
}));