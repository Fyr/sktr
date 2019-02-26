<?php
App::uses('AppController', 'Controller');
App::uses('SiteController', 'Controller');
class SiteProductsController extends SiteController {
	public $name = 'SiteProducts';
	public $uses = array('Product', 'Form.PMFormValue', 'Media.Media', 'Form.FormField', 'Form.PMForm');

	public function index() {
	    // Если в запросе есть фраза для поиска запишем ее в переменную
	    $searchText = false;
	    if (isset($this->params->query['data']['search_text'])) {
		$searchText = $this->params->query['data']['search_text'];
		$this->set('searchText', $searchText);
		unset($this->params->query['data']['search_text']);
	    }
	    // Поиск по всем категориям и подкатегориям
	    if (Hash::get($this->params->query, 'data.Product.cat_id') == 0) {
		unset($this->params->query['data']['Product']['cat_id']);
	    }
	    if (Hash::get($this->params->query, 'data.Product.subcat_id') == 0) {
		unset($this->params->query['data']['Product']['subcat_id']);
	    }

		$this->pageTitle = __('Products');
		$this->paginate = array(
			'conditions' => array('Product.published' => 1),
			'limit' => 10, 
			'order' => 'Product.created DESC',
		);
		$this->paginate['conditions'] = Hash::merge($this->paginate['conditions'], $this->postConditions(Hash::get($this->params->query, 'data')));
		
		if ($searchText) {
		    $this->set('searchText', $searchText);
		    $searchTextCondition = array(
			'OR' => array(
			    'Product.body_search LIKE \'%'.$searchText.'%\'',
			    'Product.title LIKE \'%'.$searchText.'%\''
			)
		    );
		    $this->paginate['conditions'] = array_merge($this->paginate['conditions'], $searchTextCondition);
		    $this->params->query['data']['search_text'] = $searchText;
		}
		
		$products = $this->paginate('Product');

		if (count($products) == 1) {
			$this->redirect(array('action' => 'view', Hash::get($products[0], 'Product.id')));
		}
		$this->set('products', $products);
	}
	
	public function view($id) {
		$article = $this->Product->findById($id);
		$this->pageTitle = $article['Product']['title'];
		$this->set('article', $article);
		$this->set('techParams', $this->PMFormValue->getValues('ProductParam', $id));
		$this->set('aMedia', $this->Media->getObjectList('Product', $id));
	}
	
	public function update() {
	    $this->autoRender = false;
	    $prod = $this->Product->find('all');
	    foreach ($prod as $pro) {
		$form = $this->PMForm->getFields('Subcategory', $pro['Product']['subcat_id']);
		
		    $label = array();
		    foreach ($form as $formField) {
			$label[] = $formField['FormField']['label'];
		    }
		    $bodySearch = strip_tags($pro['Product']['body'])."\n".implode(' | ', $label);
		    $this->Product->save(array('id' => $pro['Product']['id'], 'body_search' => $bodySearch));
			echo "\n";
		
	    }
	}
}
