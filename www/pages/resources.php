<h2>Resources summary</h2>

<?= res_summary() ?>

<hr class="hrbottom"/>
<?php

	function show_resource($resource){

		if($resource['type'] == 'demos')
			show_demo($resource);
		else
			show_publication($resource);
	}

	foreach( $rtypes as $type_id => $type_name) {
		?>
		<div class="img-rounded hrl1" id="<?= $type_id; ?>">
			<hr class="hrtop"/>
			<div class="hrl2">
				<?= title($type_name); ?>

				<?php if( $type_id == 'demos')
						show_demos();
						else {?>
				<ul>
					<?php

						$res_filters = $res_types[$type_id];

						foreach($res_filters as $name => $resource) {
							?><li class='img-rounded resources_item' id="<?= $name ?>"><?php
								show_resource($resource);
							?></li><?php
						}
					?>
				</ul><?php } ?>
			</div>
			<hr class="hrbottom"/>
		</div>
		<?php
	}
?>
<div class="img-rounded hrl1"><hr class="hrtop"/></div>
