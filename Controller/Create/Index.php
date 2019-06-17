<?php
namespace Inkifi\Map\Controller\Create;
use Df\Framework\W\Result\Json;
use Magento\Framework\App\Action\Action as _P;
// 2019-06-17
class Index extends _P {
	/**    
	 * 2019-06-17
	 * @override
	 * @see _P::execute()    
	 * @used-by \Magento\Framework\App\Action\Action::dispatch():
	 * 		$result = $this->execute();
	 * https://github.com/magento/magento2/blob/2.2.1/lib/internal/Magento/Framework/App/Action/Action.php#L84-L125
	 * @return Json
	 */
	function execute() {return Json::i(__METHOD__);}
}