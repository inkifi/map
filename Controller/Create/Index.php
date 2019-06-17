<?php
namespace Inkifi\Map\Controller\Create;
use Magento\Framework\App\Action\Action as _P;
use Magento\Framework\Controller\ResultFactory as F;
use Magento\Framework\View\Result\Page;
// 2019-06-17
class Index extends _P {
	/**
	 * 2019-06-17
	 * @override
	 * @see _P::execute()
	 * @used-by \Magento\Framework\App\Action\Action::dispatch():
	 * 		$result = $this->execute();
	 * https://github.com/magento/magento2/blob/2.2.1/lib/internal/Magento/Framework/App/Action/Action.php#L84-L125
	 * @return Page
	 */
	function execute() {
		$r = $this->resultFactory->create(F::TYPE_PAGE); /** @var Page $r */
		$r->addHandle('inkifi_map');
		return $r;
	}
}