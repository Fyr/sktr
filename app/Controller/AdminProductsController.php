<?php
App::uses('AdminController', 'Controller');
class AdminProductsController extends AdminController {
    public $name = 'AdminProducts';
    public $components = array('Table.PCTableGrid', 'Article.PCArticle');
    public $uses = array('Category', 'Subcategory', 'Product', 'Form.PMForm', 'Form.PMFormValue');
    public $helpers = array('ObjectType', 'Form.PHFormFields');
    
    public function beforeRender() {
    	parent::beforeRender();
    	$this->set('objectType', $this->Product->objectType);
    }
    
    public function index() {
        $this->paginate = array(
           	'fields' => array('id', 'created', 'title', 'teaser', 'published')
        );
        $this->PCTableGrid->paginate('Product');
    }
    
	public function edit($id = 0) {
		$this->loadModel('Media.Media');
		
		$this->set('aCategories', $this->Category->getOptions('Category'));
		$this->set('aSubcategories', $this->Subcategory->find('all', array(
			'fields' => array('id', 'object_id', 'title', 'Category.id', 'Category.title'),
			'order' => 'object_id'
		)));
		
		if (!$id) {
			$this->request->data('Product.object_type', $this->Product->objectType);
		}
		if ($this->request->is(array('put', 'post'))) {
		    $form = $this->PMForm->getFields('Subcategory', $this->request->data('Product.subcat_id'));
		    $label = array();
		    foreach ($form as $formField) {
			$label[] = $formField['FormField']['label'];
		    }
		    $bodySearch = strip_tags($this->request->data('Product.body'));
		    $this->request->data('Product.body_search', $bodySearch."\n".implode(' | ', $label));
		}
		
		$this->PCArticle->setModel('Product')->edit(&$id, &$lSaved);
		if ($lSaved) {
			if ($this->request->is('put')) {
				// save product params only for updated product
				$form = $this->PMForm->getObject('Subcategory', $this->request->data('Subcategory.id'));
				if ($form && ($data = $this->request->data('PMFormValue'))) {
					$this->PMFormValue->saveForm('ProductParam', $id, $form['PMForm']['id'], $data);
				}
			}
			$baseRoute = array('action' => 'index');
			return $this->redirect(($this->request->data('apply')) ? $baseRoute : array($id));
		}
		
		$subcat_id = $this->request->data('Subcategory.id');
		$this->set('form', $this->PMForm->getFields('Subcategory', $subcat_id));
		$this->set('formValues', $this->PMFormValue->getValues('ProductParam', $id));
	}
}
