<?php
namespace Inkifi\Map;
/**
 * 2019-08-30
 * @used-by \Inkifi\Pwinty\AvailableForDownload::_p()
 * @method static Settings s()
 */
final class Settings extends \Df\Config\Settings {
	/**
	 * 2019-08-30
	 * @return string
	 */
	function keyGoogle() {return $this->p();}

	/**
	 * 2019-08-30
	 * @return string
	 */
	function keyMapBox() {return $this->p();}

	/**
	 * 2019-08-30
	 * @return string
	 */
	function keyOpenCage() {return $this->p();}

	/**
	 * 2019-08-30
	 * @override
	 * @see \Df\Config\Settings::prefix()
	 * @used-by \Df\Config\Settings::v()
	 * @return string
	 */
	protected function prefix() {return 'api/map';}
}