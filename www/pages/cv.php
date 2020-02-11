<h2>CV summary</h2>

<div class='pub_sum cv_toc'>
	<ul>
		<?php

			$i = 0;

			foreach( $cv["parts_names"] as $type_id => $type_name) {

				if( ++$i % 3 == 1 && $i > 1) {
					?></ul><ul><?php
				}

				?><li><a href='/cv/<?= $type_id ?>'><?= $type_name ?></a></li><?php
			}

		?>
	</ul>
</div>
<div class='ltoc pull-right'>
	<?= ext_link('View CV on LinkedIn', $accounts["LinkedIn"]["url"]); ?>
	<a href="/img/migdal-cv.pdf" download="CV - Denis Migdal">Download CV in PDF format <span class="glyphicon glyphicon-download-alt"></span></a>
</div><br/><br/>
<?php
	function show_cv_work($elem) {
	?>
		<span class="cv_date"><?= $elem["dates"] ?></span> <strong><?= $elem["name"] ?></strong>, <em><?= $elem["place"] ?></em>, <?= $elem["where"] ?>;
	<?php
	}

	function show_cv_edu($elem) {
	?>
		<span class="cv_date"><?= $elem["dates"] ?></span> <strong><?= $elem["name"] ?></strong>, <em><?= $elem["school"] ?></em>, <?= $elem["where"] ?>;
	<?php
	}

	function show_cv_phd_training($elem) {
	?>
		<span class="cv_date"><?= $elem["date"] ?></span> <strong><?= $elem["name"] ?></strong> (<em><?= $elem["time"] ?>, by <?= $elem["prof"] ?></em>);
	<?php
	}

	function show_certifs($elem) {
	?>
		<span class="cv_date"><?= $elem["date"] ?></span> <strong><?= $elem["name"] ?></strong> (<em><?= $elem["details"] ?></em>);
	<?php
	}

	function show_review($elem) {
	?>
		<span class="cv_date"><?= $elem["date"] ?></span> <strong><?= $elem["name"] ?></strong></em>;
	<?php
	}

	$show_cv_elems = [
		"doc-form" 	=> function($elem){ show_cv_phd_training($elem); },
		"edu" 		=> function($elem){ show_cv_edu($elem); },
		"work" 		=> function($elem){ show_cv_work($elem); },
		"resp" 		=> function($elem){ show_cv_work($elem); },
		"certifs"	=> function($elem){ show_certifs($elem); },
		"vulg"		=> function($elem){ show_certifs($elem); },
		"misc"		=> function($elem){ show_certifs($elem); },
		"rev"		=> function($elem){ show_review($elem); }
	];
?>
<hr class="hrbottom"/>
<?php 
	foreach( $cv["parts_names"] as $type_id => $type_name) {
		$show_elem = $show_cv_elems[$type_id];
	?>
		<div id='<?= $type_id ?>' class="img-rounded hrl1">
			<hr class="hrtop"/>
			<div class="hrl2">
				<?= title($type_name) ?>
				<ul>
			<?php
				foreach( $cv[$type_id] as $id => $content) {
				?>
					<li><?= $show_elem($content); ?></li>
				<?php
				}
			?>
				</ul>
			</div>
			<hr class="hrbottom"/>
		</div>
	<?php
	}

?>
