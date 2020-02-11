<?php

	const RES_PATH = "https://migdal.users.greyc.fr/";

/*********************************************/

	//TODO concat JSON

	$contacts	= json_decode(file_get_contents("json/contacts.json"),		true);

	$resources	= json_decode(file_get_contents("json/resources.json"),		true);
	$partners	= json_decode(file_get_contents("json/partners.json"),		true);
	$teachings	= json_decode(file_get_contents("json/teachings.json"),		true);
	$publications	= json_decode(file_get_contents("json/publications.json"),	true);
	$cv		= json_decode(file_get_contents("json/cv.json"),		true);

	unset($publications['@ignore']);
	foreach($publications as $id => &$pub) {

		$pub['id'] = $id;

		$pub['type'] = 'paper';

		$hal = getp($pub, 'content/hal');
		if( $hal != null ) {
			$hal_url = "https://hal.archives-ouvertes.fr/$hal/";
			$pub['content']['hal-url'] = $hal_url;
			$pub['content']['hal-cite'] = $hal_url.'bibtex';
			$pub['content']['hal-pdf'] = $hal_url.'document';
		}

		if( isset( $pub['conf'] ) ) {
			$pub['place'] = &$pub['conf']['place'];
			$pub['date'] = &$pub['conf']['date'];
		}

		if( getp($pub, 'content/pdf') == '@res') {
			$pub['content']['pdf'] = RES_PATH . 'pdf/' . $id . '-paper.pdf';
		}
	}

	unset($resources['@ignore']);
	foreach($resources as $id => &$res) {

		$res['id'] = $id;

		$parts = explode('-', $id);
		$type = $parts[2];
		$paper_id = $parts[0].'-'. $parts[1];

		$res['type'] = $type;

		if( isset( $publications[$paper_id] ) ) {

			$pub = &$publications[$paper_id];
			$res['paper'] = &$pub;
			$pub[$type] = &$resources[$id];

			$res['topic'] = &$pub['topic'];

			if( isset($pub['conf']) ) {
				$res['place'] = &$pub['conf']['place'];
				$res['date'] = &$pub['conf']['date'];
				$res['conf'] = &$pub['conf'];
			}
		}

		if( isset( $res['publisher'] ) ) {
			$res['place'] = &$res['publisher']['place'];
			$res['date'] = &$res['publisher']['date'];
		}

		if( getp($res, 'content/pdf') == '@res') {
			$res['content']['pdf'] = RES_PATH . 'pdf/' . $id . '.pdf';
		}

//		if($id == '2016-uio_2-TR')
//			echo $resources['2016-uio_2-TR']['id']."\n";
		
	}
	unset($res);

/******************************************/

function span_top($classes = "") {

	?><a href="#" class="glyphicon glyphicon-arrow-up scrolltop_btn <?= $classes ?>" title="Go to top"></a><?php

}

function title($name, $classes = "") {
?>
	<h2 class="title <?= $classes ?>"><?= span_top() ?> <?= $name ?></h2>
<?php
}

function show_partners_icons($partners) {
	?><div class="d-flex flex-row justify-content-center flex-wrap"><?php

		foreach($partners as $id => $partner) {

			if( $id[0] == "@" )
				continue;
			
			$img = image_exists('partners', $id) ? $id : 'unknown';

			?><a title="<?= $partner["name"]; ?>" href='/relations/<?= $id ?>' class="img-rounded logo big_logo partner_minilogo"><?= image('partners', $img); ?></a><?php
		}

	?></div><?php
}


function show_teachings_icons($teachings) {

	?><div class="d-flex flex-row justify-content-center flex-wrap"><?php

		foreach($teachings as $teaching) {
			?><a title="<?= $teaching["name"]; ?>" href='/teaching/<?= $teaching["id"]; ?>' class="img-rounded logo big_logo teaching_logo"><?= image('teachings', $teaching['id']); ?></a><?php
		}

	?></div><?php


}

foreach($publications as $key=>$value) {
	$publications[$key]["id"] = $key;
}


function pub_title($pub){

	$page = $pub['type'] == 'paper' ?  'publications' : 'resources';

	?><strong><a href='/<?= $page .'/'. $pub['id']; ?>' title="<?= get($pub, "abstract", ""); ?>"><?= $pub["title"]; ?></a></strong><?php
}


function pub_authors($pub){

	global $partners;
	
	$first = true;

	foreach($pub["authors"] as $author) {

		if( ! $first )
			echo ", ";

		if( $author == "Denis Migdal") {
			echo "<em>$author</em>";
			$first = false;
			continue;
		}

		$auth_id = null;
		foreach( $partners as $name => $relation )
			if( $author === $name || $author === $relation['name']) {
				$auth_id = $name;
			}


		if( $auth_id != null ) {
			$auth = $partners[$auth_id];
			$name = $auth['name'];
			$title = isset( $auth['short-desc'] ) ? $auth['short-desc'] : $auth['desc'];
			?><a class='atext' title='<?= $title ?>' href='/relations/<?= $auth_id ?>'><?= $name ?></a><?php
		} else
			echo $author;

		$first = false;
	}
}

function pub_publisher($pub, $atext=false) {
	if( isset($pub['conf'] ) ) {
		pub_conf($pub['conf'], $atext);
		return;
	}

	global $partners;


	$publisher_id = null;
	$publisher = getp($pub, "publisher/name");
	foreach( $partners as $name => $relation )
		if( $publisher === $name || $publisher === $relation['name']) {
			$publisher_id = $name;
		}


	if( $publisher_id != null ) {
		$auth = $partners[$publisher_id];
		$name = $auth['name'];
		$title = isset( $auth['short-desc'] ) ? $auth['short-desc'] : '';
		?><a <?php if($atext) echo "class='atext'"; ?> title='<?= $title ?>' href='/relations/<?= $publisher_id ?>'><?= $name ?></a><?php
	}
	else
		echo $publisher;
}

function pub_conf($conf, $atext=false){
	?><a <?= ext_href($conf['url']) ?> title="<?= $conf['type'] . "\nRank: ".$conf['rank']."\nAccept. rate: " . $conf['accept-rate']; ?>" <?= $atext?'class="atext"':'';?>><?= $conf['name']; ?><?= $conf['rank'] != 'N/A' ? " (${conf['rank']})" : '' ?></a><?php
}


function pub_place($pub){
	echo $pub["date"];// . ", " . $pub["place"];
}

function pub_topic_part($topics, $i) {
	$isEnd = count($topics) == $i + 1;
	$topic = $topics[$i];
	?><a href='/topics/<?= $topic ?>'><?= $i==0?'[':''?><?= $topic ?><?= $isEnd?']':'/'?></a><?php
}

function pub_topic($pub){

	$topics = $pub['topic'];

	for($i = 0; $i < count($topics); ++$i)
		pub_topic_part($topics, $i);
}

function pub_print_link($name, $elem, $page = null) {

	if( $elem == null )
		return;


	?><a class="functions_mlr_1px" <?=

		$page != null
				? "href='/$page/$elem'"
				: ext_href($elem);

	?> title="<?= $name ?>"><span class='logo vat_logo'>[<?= $name ?>]</span></a><?php
}

function get($array, $key, $default_value = null) {
	if( $array === null)
		return null;

	return isset($array[$key]) ? $array[$key] : $default_value;
}

function getp($array, $path, $default_value = null) {
	return geta($array, explode('/', $path), $default_value);
}

function geta($array, $path_array, $default_value = null) {

	foreach( $path_array as $part) {
		$array = get($array, $part, $default_value);
	}
	return $array;
}

function issetp($array, $path) {
	return isseta($array, explode('/', $path) );
}

function isseta($array, $path_array) {

	foreach( $path_array as $part ) {

		if( ! isset($array[$part]) )
			return false;
		$array = $array[$part];
	}

	return true;
}


function pub_getlang($pub, $lang) {
	return geta($pub, ['langs', $lang]);
}

function pub_getcontent($pub, $content) {

	if( $content == 'hal' )
		$content = 'hal-url';

	$result = geta( $pub, ['content', $content] );

	if( $result != null)
		return $result;

	return $content == 'pdf' || $content == 'cite' ?
		  geta($pub, ['content', "hal-$content"])
		: null;
}

function pub_getrelated($pub, $content) {

	if( $content == $pub['type'] )
		return null;

	if( $content != 'paper' && $pub['type'] != 'paper' )
		$pub = get($pub, 'paper');

	return geta($pub, [$content, 'id']);
}


$pub_content = ['pdf', 'doi', 'hal', 'src', 'cite'];

function pub_links($pub) {

	global $pub_content;

	foreach($pub_content as $content)
		pub_print_link( $content, pub_getcontent($pub, $content) );
}

$related_ressources = ['slides', 'poster', 'demo', 'video', 'paper'];
$related_langs = ['en', 'fr', 'it', 'conf.', 'journal'];

function has_related($pub) {

	global $related_ressources;
	global $related_langs;

	$has = false;

	foreach( $related_ressources as $res)
		if( pub_getrelated($pub, $res) != null )
			$has = true;

	foreach( $related_langs as $lang)
		if( pub_getlang($pub, $lang) != null )
			$has = true;

	return $has;
}

function pub_related_links($pub){

	global $related_ressources;
	global $related_langs;

	foreach( $related_ressources as $res)
		pub_print_link($res, pub_getrelated($pub, $res), $res == 'paper' ? 'publications' : 'resources');

	foreach( $related_langs as $lang)
		pub_print_link($lang, pub_getlang($pub, $lang), $pub['type'] == 'paper' ? 'publications': 'resources');
}

function pub_warning($pub) {
	if( ! isset($pub["warning"]) )
		return;

	?><span class="glyphicon glyphicon-alert" title='<?= $pub["warning"] ?>'></span><?php
}

function pub_awards($pub) {
	if( ! isset($pub["awards"]) )
		return;

	?><span class="glyphicon glyphicon-award" title='<?= $pub["awards"] ?>'></span><?php
}

function services_stats($teaching) {


	$hetd = 0;

	foreach($teaching['services'] as $service) {

		$serv_hetd = $service['hetd'];

		if( ! is_numeric($serv_hetd) ) {


			$serv_hetd = explode('*', $serv_hetd);
			if( $serv_hetd[0] == 'N/A' || $serv_hetd[1] == 'N/A')
				continue;
			$serv_hetd = floatval($serv_hetd[0]) * floatval($serv_hetd[1]);
		}

		$hetd += $serv_hetd;
	}

	$result = [
		'hetd' => $hetd
	];

	return $result;
}

function teaching_stats() {
	global $teachings;

	$hetd = 0;

	foreach($teachings as $teaching)
		$hetd += services_stats($teaching)['hetd'];

	$result = [
		'hetd' => $hetd
	];

	return $result;
}

function show_publication($pub) {
?>
	<?= pub_warning($pub) ?><?= pub_awards($pub) ?>
	<?= pub_title($pub) ?>, <?= pub_authors($pub) ?>, <strong><?= pub_publisher($pub); ?></strong>, <?= 	pub_place($pub); ?>
	<br/>
	<?php /* <strong><?= pub_topic($pub) ?></strong> */ ?>
	<?= pub_links($pub); ?>
	<span class='pull-right'>
		<?= has_related($pub) ? '<i>see also</i>' : '' ?> <?= pub_related_links($pub); ?>
	</span>
<?php
}

function show_publication_short($pub) {
?>
	<?= pub_warning($pub) ?>
	<?= pub_title($pub); ?>, <em><?= pub_publisher($pub, true); ?></em>, <?= pub_place($pub); ?>
<?php	
}

$accounts = json_decode(file_get_contents("json/accounts.json"), true);


function print_footer($contacts) {
	?>
	<div class="row flex-row">
		<div class="col-md-4">
			<h2>Contact me</h2>

			<div class="d-flex flex-row justify-content-center flex-wrap">
				<?php
					$json = $contacts;

					foreach ($json as $id => $contact) {

						$url="";
						$icon = null;

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

						?><a title="<?= $contact["title"]; ?>" <?= ext_href($url) ?> class="glyphicon img-rounded logo <?= $icon ?> logo_3em" ></a><?php
				}
				?>
			</div>
		</div>
		<div class="col-md-7">

			<h2>Follow me</h2>

			<div class="d-flex flex-row justify-content-center flex-wrap">
				<?php
					global $accounts;
					foreach ($accounts as $id => $account) {
						?><a class="img-rounded logo big_logo logo_3em" title="<?= $id; ?>" <?= ext_href($account["url"]); ?>><?= image('accounts', $id); ?></a><?php
				}
				?>
			</div>
		</div>
	</div>
	<?php
}


include('publications.php');
?>
