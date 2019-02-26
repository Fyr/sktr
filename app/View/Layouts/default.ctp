<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="description" content="">
<meta name="viewport" content="width=device-width">
	<?=$this->Html->charset(); ?>
	<title><?=DOMAIN_TITLE?></title>
<?php
	echo $this->Html->meta('icon');

	echo $this->Html->css(array('normalize', 'main'));
	echo $this->Html->script(array(
		'vendor/modernizr-2.6.2.min',
		'vendor/jquery/jquery-1.10.2.min',
		'plugins',
		'main',
	));

	echo $this->fetch('meta');
	echo $this->fetch('css');
	echo $this->fetch('script');
?>
</head>
<body>
<div id="page">
	<div id="page_in">
	    <header id="header" class="clearfix">
	    	<div class="head_top">
				<a href="/" class="head_logo"><img src="/img/logo.jpg" alt=""></a>
				<address class="head_address">
					<span class="head_phone"><?=Configure::read('Settings.phone1')?></span>
					<span class="head_street"><?=Configure::read('Settings.office_address')?></span>
				</address>
	    	</div>
			<nav class="head_navi">
				<div class="head_navi_logo">
					<img src="/img/logo_tdm.png" alt="">
				</div>
				<?=$this->element('/SiteUI/site_menu')?>
			</nav>
		</header>

		<div id="content">
			<?=$this->element('/SiteUI/slider')?>
			<div class="content_2_cols clearfix">
				<div class="side_col">
					<div class="side_block">
						<div class="side_h">
							<div class="side_h_in">Каталог</div>
						</div>
						<div class="side_content">
							<nav class="side_navigation">
								<?=$this->element('/SiteUI/categories')?>
							</nav>
						</div>
					</div>
<?
	if ($pdf) {
?>
					<div class="side_block">
						<div class="side_h">
							<div class="side_h_in">Скачать каталог</div>
						</div>
						<div class="side_content">
							<?=$this->element('/SiteUI/download_pdf')?>
						</div>
					</div>	
<?
	}
?>
					<div class="side_block">
						<div class="side_h">
							<div class="side_h_in">поиск</div>
						</div>
						<div class="side_content">
							<?=$this->element('/SiteUI/search')?>
						</div>
					</div>							
					<div class="side_block">
						<div class="side_h">
							<div class="side_h_in">новости</div>
						</div>
						<div class="side_content">
							<?=$this->element('/SiteUI/randomNews')?>
						</div>
					</div>
				</div>

				<div class="main_col">
					<div class="main_col_block">
						<?=$this->element('/SiteUI/page_title')?>
						<div class="main_col_c">
							<div class="main_col_c_in">
								<?=$this->fetch('content')?>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>		
</div>
<footer id="footer">
	<div id="footer_in" class="clearfix">
		<div class="width_fix">
			<div class="footer_left">
				<div class="footer_address">
					<address class="footer_phone"><?=Configure::read('Settings.phone1')?></address>
					<address class="footer_street"><?=Configure::read('Settings.office_address')?></address>
				</div>
			</div>
			<div class="footer_right">
				<div class="footer_navi">
					<?=$this->element('/SiteUI/bottom_links')?>
				</div>
			</div>
		</div>
	</div>
	<div class="cpr">
		<!--div class="width_fix">Все права защищены, 2012</div-->
	</div>
</footer>
<?//$this->element('sql_dump'); ?>
</body>
</html>