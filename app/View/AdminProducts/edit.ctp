<div class="span8 offset2">
<?
    $id = $this->request->data('Product.id');
    $title = $this->ObjectType->getTitle(($id) ? 'edit' : 'create', $objectType);
?>
	<?=$this->element('admin_title', compact('title'))?>
<?
	if ($id) {
		echo $this->Html->link(
			'<i class="icon-search"></i> '.__('Preview'), 
			array('controller' => 'SiteProducts', 'action' => 'view', $id), 
			array('escape' => false, 'class' => 'pull-right btn btn-mini', 'target' => '_blank')
		);
	}
    echo $this->PHForm->create('Product');
    $aTabs = array(
        'General' => $this->element('/AdminContent/admin_edit_'.$objectType),
		'Text' => $this->element('Article.edit_body')
    );
    if ($id) {
    	$aTabs['Tech-params'] = $this->PHFormFields->render($form, $formValues);// $this->element('Form.show_form_fields', array('form' => $form));
        $aTabs['Media'] = $this->element('Media.edit', array('object_type' => $objectType, 'object_id' => $id));
    }
	echo $this->element('admin_tabs', compact('aTabs'));
	echo $this->element('Form.form_actions', array('backURL' => $this->Html->url(array('action' => 'index'))));
    echo $this->PHForm->end();
?>
</div>