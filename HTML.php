<?php
namespace Inkifi\Map;
// 2019-08-08
final class HTML {
	/**
	 * 2019-08-08
	 * @used-by vendor/inkifi/map/view/frontend/templates/create/form.phtml
	 * @param string $type
	 * @param string[] $vv
	 * @return string
	 */
	static function tiles($type, array $vv) {return
		df_cc_n(df_map(function($v) use($type) {$uc = ucfirst($v); return
			df_tag('div', [],
				df_tag('label', [], [
					df_tag('input', ['name' => $type, 'type' => 'radio', 'value' => $v])
					,df_tag('div', [], [
						df_tag('div', [],
							df_block_output(null, "Inkifi_Map::create/i/form/$type/$v.phtml")
						)
						,df_tag('div', 'white' === $v ? [] : [
							'style' =>
								'black' === $v
								? 'background-color: rgb(44, 44, 44)'
								: sprintf("background-image: url('%s')",
									df_asset_url("Inkifi_Map::create/i/form/$type/$v.png")
								)
						])
					])
					,df_tag('span', [], $uc)
				])
			)
		;}, $vv))
	;}
}