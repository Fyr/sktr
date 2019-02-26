<?
	$this->Html->css('jquery.fancybox.css', array('inline' => false));
?>
<b>Категория: </b><?=$article['Category']['title']?><br />
<b>Подкатегория: </b><?=$article['Subcategory']['title']?><br />
<b>Цена: </b><?=$article['Product']['price']?><br />
<h3>Фото</h3>
<?
	if ($aMedia) {
		foreach($aMedia as $media) {
?>
	<a class="fancybox" href="<?=$this->Media->imageUrl($media, 'noresize')?>" rel="gallery">
		<img src="<?=$this->Media->imageUrl($media, '100x80')?>" alt="" />
	</a>
<?
		}
?>
<script type="text/javascript">
$(document).ready(function(){
	$('.fancybox').fancybox({
		padding: 5
	});
});
</script>
<?
	}
?>
<h3>Описание</h3>
<?=$article['Product']['body']?>
<?
	if ($techParams) {
?>
<h3>Технические характеристики</h3>
<table class="tech-params" border="0">
<thead>
	<th>Параметр</th>
	<th>Значение</th>
</thead>
<tbody>
<?
	foreach($techParams as $row) {
?>
<tr>
	<td><?=$row['FormField']['label']?></td>
	<td align="center"><?=$row['PMFormValue']['value']?></td>
</tr>
<?
	}
?>
</tbody>
</table>
<?
	}
?>