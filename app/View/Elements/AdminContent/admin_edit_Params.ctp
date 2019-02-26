<?=$this->element('Form.form_fields');?>
<script type="text/javascript">
$(document).ready(function(){
	var $grid = $('#grid_FormField');
	
	var vals = $('#FormKeyFieldId').val().split(',');
	for(var i = 0; i < vals.length; i++) {
		$('.grid-chbx-row[value=' + vals[i] + ']', $grid).click();
	}
	$('.form-3actions button[type=submit]').click(function(){
		var vals = [];
		$('.grid-chbx-row:checked', $grid).each(function(){
			vals.push($(this).val());
		});
		$('#FormKeyFieldId').val(vals.join(','));
	});
});
</script>
	