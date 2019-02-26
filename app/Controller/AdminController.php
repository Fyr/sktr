<?php
App::uses('AppController', 'Controller');
class AdminController extends AppController {
	public $name = 'Admin';
	public $layout = 'admin';
	public $uses = array();

	public function _beforeInit() {
	    // auto-add included modules - did not included if child controller extends AdminController
	    $this->components = array_merge(array('Core.PCAuth', 'Table.PCTableGrid'), $this->components);
	    $this->helpers = array_merge(array('Html', 'Table.PHTableGrid', 'Form.PHForm'), $this->helpers);
	    
		$this->aNavBar = array(
			'Page' => array('label' => __('Static Pages'), 'href' => array('controller' => 'AdminContent', 'action' => 'index', 'Page')),
			'News' => array('label' => __('News'), 'href' => array('controller' => 'AdminContent', 'action' => 'index', 'News')),
			'Products' => array('label' => __('Products'), 'href'=> '', 'submenu' => array(
				'Forms' => array('label' => __('Tech.params'), 'href' => array('controller' => 'AdminFields', 'action' => 'index')),
				'Categories' => array('label' => __('Categories'), 'href' => array('controller' => 'AdminContent', 'action' => 'index', 'Category')),
				'Products' => array('label' => __('Products catalogue'), 'href' => array('controller' => 'AdminProducts', 'action' => 'index')),
				'PDF' => array('label' => __('PDF Catalog'), 'href' => array('controller' => 'AdminPdf', 'action' => 'index'))
			)),
			'Slider' => array('label' => __('Slider'), 'href' => array('controller' => 'AdminSlider', 'action' => 'index')),
			'Settings' => array('label' => __('Settings'), 'href' => array('controller' => 'AdminSettings', 'action' => 'index'))
		);
		$this->aBottomLinks = $this->aNavBar;
	}
	
	public function beforeFilter() {
	    $this->currMenu = $this->_getCurrMenu();
	    $this->currLink = $this->currMenu;
	}

	public function index() {
	}
	
	protected function _getCurrMenu() {
		$curr_menu = str_ireplace('Admin', '', $this->request->controller); // By default curr.menu is the same as controller name
		foreach($this->aNavBar as $currMenu => $item) {
			if (isset($item['submenu'])) {
				foreach($item['submenu'] as $_currMenu => $_item) {
					// fdebug(strtolower($_currMenu) .'==='. strtolower($curr_menu)."\r\n");
					if (strtolower($_currMenu) === strtolower($curr_menu)) {
						return $currMenu;
					}
				}
			}
		}
		return $curr_menu;
	}

	public function delete($id) {
		$this->autoRender = false;

		$model = $this->request->query('model');
		if ($model) {
			$this->loadModel($model);
			if (strpos($model, '.') !== false) {
				list($plugin, $model) = explode('.',$model);
			}
			$this->{$model}->delete($id);
		}
		if ($backURL = $this->request->query('backURL')) {
			$this->redirect($backURL);
			return;
		}
		$this->redirect(array('controller' => 'Admin', 'action' => 'index'));
	}
	
}
