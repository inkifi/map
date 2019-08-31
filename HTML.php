<?php
namespace Inkifi\Map;
// 2019-08-08
final class HTML {
	/**
	 * 2019-08-31
	 * @used-by vendor/inkifi/map/view/frontend/templates/create/form.phtml
	 * @param string $name
	 * @param string[] $vv
	 * @return string
	 */
	static function tabs($name, array $vv) {return df_tag('div', 'ikf-row',
		df_tag('div', [],
			df_tag('div', 'ikf-tabs',
				df_cc_n(df_map(function($v) use($name) {return
					df_tag('div', [],
						df_tag('label', [], [
							df_tag('input', [
								'data-bind' => "checked: $name", 'name' => $name, 'type' => 'radio', 'value' => $v
							])
							,df_tag('span', [], $v)
							,df_tag('div')
						])
					)
				;}, $vv))
			)
		)
	);}

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
							df_block_output(null, "Inkifi_Map::i/create/form/$type/$v.phtml")
						)
						,df_tag('div', 'white' === $v ? [] : [
							'style' =>
								'black' === $v
								? 'background-color: rgb(44, 44, 44)'
								: df_cc('; ', [
									sprintf("background-image: url('%s')",
										df_asset_url("Inkifi_Map::i/create/form/$type/$v.png")
									)
									,'natural' !== $v ? '' : 'background-color: rgb(136, 112, 85)'
								])
						])
					])
					,df_tag('span', [], $uc)
				])
			)
		;}, $vv))
	;}
}