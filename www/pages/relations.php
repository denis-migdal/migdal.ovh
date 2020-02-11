<?php

function partner_img($id) {
		$img = image_exists('partners', $id) ? $id : 'unknown';
	?><div class='img-rounded logo big_logo partner_logo'><div><?= image('partners', $img); ?></div></div><?php
}

function print_list($type) {

	?><div class='flexbox'><?php

	global $partners;

	foreach($partners as $id => $partner) {

		if( $id[0] == "@" )
			continue;

		if( $partner['type'] != $type)
			continue;

		?><a title='<?= $partner["desc"] ?>' <?= ext_href($partner["url"]) ?> id="<?= $id; ?>"><div><?php
			partner_img($id);
		?><div style='text-align: center'><strong><?= $partner["name"] ?></strong></div></div></a><?php
	}

	?></div><?php
}

?>

<h2>Entities</h2>

<?= print_list('entity'); ?>

<h2>Main co-authors</h2>

<?= print_list('coauth'); ?>