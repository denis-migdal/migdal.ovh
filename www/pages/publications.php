<h2>Publications summary</h2>

<?php pub_summary() ?>

<div class='ltoc pull-right'>
	<?php
		ext_link('View publications on HAL', $accounts['HAL']['url']);
		ext_link('View publications on ORCID', $accounts['ORCID']['url']);
		ext_link('View publications on ResearchGate', $accounts['ResearchGate']['url']);
	?>
</div><br/><br/><br/>

<hr class="hrbottom"/>

<div id="recent" class="img-rounded hrl1">
	<hr class="hrtop"/>
	<div class="hrl2">
		<?= title("Recent publications"); ?>
		<ul>
			<?php
				$flat_publications = array_values($publications);
				for($i=0; $i < 3; ++$i) {
					echo "<li class='publications_item'>";
					show_publication($flat_publications[$i]);
					echo "</li>";
				}	

			?>
		</ul>
	</div>
	<hr class="hrbottom"/>
</div>
<?php

	foreach( $types as $type_id => $type_name) {
		?>
			<div class="img-rounded hrl1" id="<?= $type_id; ?>">
			<hr class="hrtop"/>
			<div class="hrl2">
				<?= title($type_name); ?>
				<ul>
					<?php

						$pub_filters = $pub_types[$type_id];

						foreach($pub_filters as $name => $publication) {
							$id = $publication["id"];
						?>
							<li class='img-rounded publications_item'  id='<?= $id ?>'>
						<?php
							show_publication($publication);
							echo "</li>";
						}
					?>
				</ul>
			</div>
			<hr class="hrbottom"/>
			</div>
		<?php
	}
?>
<div class="img-rounded hrl1"><hr class="hrtop"/></div>
