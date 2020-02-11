<center><?= show_teachings_icons($teachings); ?></center>
<center><div>Legend: <em>Year: School (level - course responsible) [courses;tutorials;practicals;projects;HETD]</em></div></center>
<div class="teaching_list"><?php
foreach($teachings as $key => $teaching) {
	?><div class="panel panel-default"><?php
		?><div id="<?= $teaching["id"]; ?>" class="panel-heading"> <strong><?= $teaching["name"]; ?> (<?= services_stats($teaching)['hetd'] ?>H)</strong> <?= span_top("pull-right") ?></div>
		<div class="panel-body"><?=
			$teaching["desc"];
			?><ul><?php
					foreach($teaching["services"] as $service){
						?><li><?= $service["year"].': '.$service["school"].' ('.$service["level"]." - ".$service["resp"].') ['. $service["courses"] . "h; " . $service["TD"] . "h; " . $service["TP"] . "h; " . $service["projects"] . "h; " . $service["hetd"] . "h]" ?><?php
					if($service["url"] != "") {
?> (<a <?= ext_href($service["url"]); ?>>Educational booklet <span class="glyphicon glyphicon-share"></span></a>)<?php
					}
	?></li><?php
					}
			?></ul></div></div><?php
	}
?></div>