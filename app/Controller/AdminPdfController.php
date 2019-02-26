<?php
App::uses('AdminController', 'Controller');
class AdminPdfController extends AdminController {
    public $name = 'AdminPdf';
    
    public function index() {
        $this->set('object_type', 'PDFCatalog');
        $this->set('object_id', 1);
    }
}
