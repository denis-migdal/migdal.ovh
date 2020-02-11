<?php

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	include("php/functions.php");
	include("php/images.php");
	include("php/html.php");

$pages = [
	["title"=>"Home", "id"=>"home"],
	["title"=>"Topics", "id"=>"topics"],
	["title"=>"Publications", "id"=>"publications"],
	["title"=>"Resources", "id"=>"resources"],
	["title"=>"Relations", "id"=>"relations"],
	["title"=>"Teaching", "id"=>"teaching"],
	["title"=>"CV", "id"=>"cv"]
];

$default_page_id = 0;
$default_page_name = $pages[$default_page_id]["id"];


$page_id = $default_page_id;
$page_temp_name = null;

if( isset($_GET['p']) ) {
	$page_temp_name = $_GET['p'];
}
$parts = explode("/", $_SERVER['REQUEST_URI'] );
if( isset( $parts[1] ) )
	$page_temp_name = $parts[1];

if( $page_temp_name != null)
	foreach ($pages as $key=>$page)
		if( $page["id"] == $page_temp_name)
			$page_id = $key;


$p = $pages[$page_id]["id"];

?><!DOCTYPE html>
<html lang="en" xml:lang="en" dir="ltr">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge"/>		
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Denis Migdal</title>
		<meta name="description" content="Find my cv, reseach projects, publications, research relations, social networks, and more on my personal Website." />
		<link rel="canonical" href="https://migdal.ovh/" />
	</head>

	<body>
		<style><?php
			//include('bootstrap/css/bootstrap.min.css');
			include('css/main.bundle.css');
		?></style>
		<nav class="navbar navbar-default navbar-fixed-top">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-hover="dropdown"  data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<span class='img_icon navbar-brand' id='img_brand'></span>
					<a href='/<?= $default_page_name ?>' class="navbar-brand">Denis Migdal</a>
				</div>
				<div id="navbar" class="collapse navbar-collapse">
					<ul id='nav' class="nav navbar-nav">
						<?php
							foreach($pages as $page){
								?>
						<li><a href='/<?= $page["id"] ?>'><?= $page["title"]; ?></a></li>
								<?php
							}
						?>
					</ul>
				</div>
			</div>
		</nav>

		<div class="container theme-showcase" role="main">
			<div id='pages'>		
			<?php

				foreach($pages as $page){
					$active = $page["id"] == $p ? "" : "hidden_page";
					?><div class="<?= $active ?>"><?php

						include("pages/" . $page["id"] . ".php");
					?></div><?php
				}
				$active = $p == "home" ? "hidden_page" : "";			
			?>
			</div>
		</div>
		<footer class="footer">
			<div class="home_contact">
				<?php
					$json = $contacts;

					foreach ($json as $id => $contact) {

					switch( $contact['type'] ) {
						case 'mail':
							$icon = 'awesome-envelope-square';
							$url="mailto:".$contact["title"];
						break;
						case 'phone':
							$url="tel:".rawurlencode($contact["title"]);
							$icon = 'awesome-phone-square';
						break;
						case 'address':
							$icon = 'awesome-map-marker';
						break;
					}

					if( isset($contact["url"]) )
						$url="mailto:".$contact["url"];

					if( ! isset($contact["small-title"]) )
						$contact["small-title"] = $contact["title"];

					?><a title="<?= $contact['title'] ?>" class="contact_link" <?= ext_href($url); ?>><span class="img-rounded glyphicon <?= $icon ?> logo little_logo contact_logo"></span><?= str_replace("\n", "<br/>", $contact['small-title']) ?></a>
					<?php
					}

				?>
			</div>
		</footer>
		<script><?php
				$pages_id = [];
				$id_pages = [];
				foreach ($pages as $key=>$page) {
					$pages_id[$page["id"]] = $key;
					$id_pages[$key] = $page["id"];
				}
			?>
			pagename_to_id = <?= json_encode($pages_id); ?>;
			id_to_pagename = <?= json_encode($id_pages); ?>;
			let initial_page_name = window.location.pathname.split('/')[1];
			if(initial_page_name === undefined || initial_page_name == "")
				initial_page_name = "<?= $default_page_name ?>";
			initial_page = pagename_to_id[initial_page_name];
			<?php include('js/main.bundle.js'); ?>
		</script>
	</body>
</html>

