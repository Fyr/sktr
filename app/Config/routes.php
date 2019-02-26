<?php
Router::parseExtensions('html', 'json');
Router::connect('/', array('controller' => 'SitePages', 'action' => 'home'));

CakePlugin::routes();

require CAKE.'Config'.DS.'routes.php';
