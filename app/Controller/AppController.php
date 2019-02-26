<?php
App::uses('Controller', 'Controller');
class AppController extends Controller {
    public $paginate;
	public $aNavBar = array(), $aBottomLinks = array(), $currMenu = '', $currLink = '', $pageTitle = '';
    
    public function __construct($request = null, $response = null) {
	    $this->_beforeInit();
	    parent::__construct($request, $response);
	    $this->_afterInit();
		fdebug("AppController.__construct\r\n");
	}
	
	protected function _beforeInit() {
	    // Add here components, models, helpers etc that will be also loaded while extending child class
	}

	protected function _afterInit() {
	    // after construct actions here
	}
	
    public function isAuthorized($user) {
    	$this->set('currUser', $user);
		return Hash::get($user, 'active');
	}
	
	public function beforeRender() {
		fdebug("AppController.beforeRender\r\n");
		$this->set('aNavBar', $this->aNavBar);
		$this->set('currMenu', $this->currMenu);
		$this->set('aBottomLinks', $this->aBottomLinks);
		$this->set('currLink', $this->currLink);
		$this->set('pageTitle', $this->pageTitle);
	}
}
