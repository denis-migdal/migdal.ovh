<?php

$types = [
	"int.jrnl" => "International Journals",
	"int.conf."=>"International Conferences",
	"nat.jrnl" => "National Journals",
	"nat.conf."=>"National Conferences",
	"posters-demo"=>"Posters & Demos"
];

$pub_types = null;

function pub_summary() {
	global $types;
	global $publications;
	global $pub_types;
?>
<div class='pub_sum'>
	<ul>
		<!-- <li><a href='/publications/recent'>Recent publications</a></li> -->
		<?php
			$pub_types = [];

			$i = 0;

			foreach( $types as $type_id => $type_name) {

				if( ++$i % 2 == 1 && $i > 1) {
					?></ul><ul><?php
				}

				$pub_types[$type_id] = array_filter($publications, function($elem) use ($type_id) {
					return getp($elem, "content/type") == $type_id;
				});

				?><li><a href='/publications/<?= $type_id ?>'><?= $type_name . ": " . count($pub_types[$type_id]); ?></a></li><?php
			}

		?>
	</ul>
</div><?php
}


$rtypes = [	"demos"=>"Online demonstrations",
		"video"=>"Videos",
		"poster"=>"Posters",
		"slides"=>"Slides",
		"TR"=>"Technical Reports",];
$res_types = null;

function res_summary() {
	global $res_types;
	global $resources;
	global $rtypes;
?>
<div class='pub_sum'>
	<ul>
		<!-- <li><a href='/publications/recent'>Recent publications</a></li> -->
		<?php
			$res_types = [];

			$i = 0;

			foreach( $rtypes as $type_id => $type_name) {

				if( ++$i % 2 == 1 && $i > 1) {
					?></ul><ul><?php
				}

				$res_types[$type_id] = array_filter($resources, function($elem) use ($type_id) {
					return  $elem["type"] == $type_id;
				});

				?><li><a href='/resources/<?= $type_id ?>'><?= $type_name . ": " . count($res_types[$type_id]); ?></a></li><?php
			}

		?>
	</ul>
</div><?php
}


function show_demo($resource) {
	?><a <?= ext_href($resource["url"]); ?>><?= $resource["title"] ?></a><?php
}

function show_demos() {
	global $resources;

?><div class='demo-lst' style='display:flex;justify-content: space-evenly'><?php
	
	$demos = array_filter($resources, function($elem) {
		return  $elem["type"] == 'demos';
	});

	foreach( $demos as $demo)
		show_demo($demo);

?></div><?php
}

?>