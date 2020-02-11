<?php

	function ext_href($url) {
	?>target='_blank' rel='noreferrer noopener nofollow external' href='<?= $url ?>'<?php
	}

	function ext_link($value, $url, $gl = 'share-alt') {
	?><a <?= ext_href($url) ?>><?= $value ?> <span class="glyphicon glyphicon-<?= $gl ?>"></span></a><?php
	}
?>
