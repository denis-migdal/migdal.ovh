<?php

/*********** IMAGES *******************/

$__SPRITE_ORDER = [
	'accounts' => [
		'Github' => 5,
		'Google Scholar' => 0,
		'HAL' => 4,
		'LinkedIn' => 3,
		'ORCID' => 6,
		'ResearchGate' => 1,
		'Twitter' => 2,
		'Youtube' => 7
	],
	'teachings' => [
		'3y-projects' => 0,
		'cpp' => 4,
		'l3-internships' => 1,
		'python' => 2,
		'soft-eng' => 3,
		'idn' => 5
	],
	'contacts' => [
		'address' => 1,
		'mail' => 0,
		'phone' => 2
	],
	'partners' => [
		'unknown' => 0,
		'cjohansen' => 2,
		'crosenberger' => 1,
		'greyc' => 4,
		'uio' => 3,
		'reg' => 5
	]
];

function image_exists($type, $name) {
	global $__SPRITE_ORDER;
	return isset($__SPRITE_ORDER[$type][$name]);
}

$__IMAGES_INITIATED = false;

function init_images($type) {

	global $__IMAGES_INITIATED; 
	if( ! $__IMAGES_INITIATED ) {
		css('optis');
		$__IMAGES_INITIATED = true;
	}
	
	$dir = IMAGE_DIR();
	?><img src='<?= $dir ?>/<?= $type ?>.jpg' class='invisible' /><?php
}

function image($type, $name) {
	global $__SPRITE_ORDER;
	$sprite_id = $__SPRITE_ORDER[$type][$name];
	?><div class='img img_<?= $type ?> sprite_<?= $sprite_id ?>'></div><?php
}
?>
