<?php
use Magento\Catalog\Model\Product as P;
/**
 * 2019-09-04
 * @param P $p
 * @return string
 */
function ikf_map_price(P $p) {return df_trim_text_right(
	df_price_currency()->format($p->getFinalPrice(), false, 0), '.00'
);}

/**
 * 2019-09-03   
 * @used-by vendor/inkifi/map/view/frontend/templates/common/header.phtml
 * @used-by vendor/inkifi/map/view/frontend/templates/index/section/1.phtml
 * @used-by vendor/inkifi/map/view/frontend/templates/index/section/2.phtml
 * @used-by vendor/inkifi/map/view/frontend/templates/index/section/2/cities.phtml
 * @param array(string => mixed) $q [optional]
 * @return string
 */
function ikf_map_url_create($q = []) {return df_url(df_route('Inkifi_Map', 'create'), df_clean(['_query' => $q]));}