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
	static function tabs($name, array $vv) {return df_tag('div', 'ikf-row', df_tag('div', [],
		df_tag('div', 'ikf-tabs', df_cc_n(df_map_k($vv, function($v, $l) use($name) {
			$v = is_int($v) ? $l : $v;
			return df_tag('div', [], df_tag('label', [], [
				df_tag('input', ['data-bind' => "checked: $name", 'name' => $name, 'type' => 'radio', 'value' => $v])
				,df_cc_n(df_map(df_array($l), function($l) {return df_tag('span', [], $l);}))
				,df_tag('div')
			]));
		})))
	));}

	/**
	 * 2019-08-08
	 * @used-by vendor/inkifi/map/view/frontend/templates/create/form.phtml
	 * @param string $type
	 * @param string[] $vv
	 * @param string $bind [optional]
	 * @return string
	 */
	static function tiles($type, array $vv, $bind = '') {return df_tag('div', 'ikf-row', df_tag('div', 'ikf-tiles',
		df_cc_n(df_map_k($vv, function($v, $l) use($bind, $type) {
			$v = is_int($v) ? $l : $v;
			$ul = ucfirst($l); $uv = ucfirst($v);
			return df_tag('div', [], df_tag('label', [], [
				df_tag('input', [
					'data-bind' => df_csv_pretty("checked: $type", $bind)
					,'name' => $type
					,'type' => 'radio'
					,'value' => $uv
				])
				,df_tag('div', [], [
					df_tag('div', [], df_block_output(null, "Inkifi_Map::i/create/form/$type/$v.phtml"))
					,df_tag('div', 'white' === $v ? [] : [
						'style' =>
							'black' === $v
							? 'background-color: rgb(44, 44, 44)'
							: df_cc('; ', [
								sprintf("background-image: url('%s')", df_asset_url(
									"Inkifi_Map::i/create/form/$type/$v.png"
								))
								,'natural' !== $v ? '' : 'background-color: rgb(136, 112, 85)'
							])
					])
				])
				,df_tag('span', [], $ul)
			]));
		}))
	));}
}