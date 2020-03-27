const teachings = require('./../../json/teachings.json');
const sprites = require('./../../img/logos/sprites.json');

module.exports = (html, $) => {

	show_teaching_icons(html.find('#teaching_icons'), $);

	show_teachings(html.find('.teaching_list'), $);
};


function show_teaching_icons(target, $) {

	let content = $('<div></div>');
	content.addClass('d-flex flex-row justify-content-center flex-wrap');

	for(let teaching of teachings) {

		let link = $('<a></a>');
		link.attr('title', teaching.name);
		link.attr('href', '/teaching/' + teaching.id);
		link.addClass('img-rounded logo big_logo teaching_logo');

		let num = sprites.teachings[teaching.id] || 0;
		let img = $('<div class="img img_teachings sprite_'+ num +'"></div>');
		link.append(img);

		content.append(link);
	}

	target.append(content);

}


function show_teachings(target, $) {


	for(let teaching of teachings ) {

		let panel = $('<div></div>');
		panel.addClass("panel panel-default");

		let panel_header = $('<div><strong></strong> <a href="#" class="glyphicon glyphicon-arrow-up scrolltop_btn pull-right" title="Go to top"></a></div>');
		panel_header.addClass('panel-heading');
		panel_header.attr('id', teaching.id);

		let hetd = services_stats(teaching);
		panel_header.find('strong').text( teaching.name + ' (' + hetd + ' HETD)');

		let panel_body = $('<div><ul></ul></div>');
		panel_body.addClass('panel-body');

		let list = panel_body.find('ul');
		for(let service of teaching.services) {

			let elem = $('<li></li>');
			elem.text( service.year + ': ' + service.school + ' (' + service.level + ' - ' + service.resp + ') [' + service.courses + 'h; ' + service.TD + 'h; ' + service.TP + 'h; ' + service.projects + 'h; ' + service.hetd + 'h]');

			if(service.url) {
				let link = $('<a href="'+service.url +'">Educational booklet <span class="glyphicon glyphicon-share"></span></a>');
				elem.append(' (');
				elem.append(link);
				elem.append(')');
			}

			list.append(elem);
		}


		panel.append(panel_header);
		panel.append(panel_body);

		target.append(panel);
	}
}

/*
function teaching_stats() {
	global $teachings;

	$hetd = 0;

	foreach($teachings as $teaching)
		$hetd += services_stats($teaching)['hetd'];

	$result = [
		'hetd' => $hetd
	];

	return $result;
}*/

function services_stats(teaching) {

	let hetd = 0;

	for(let service of teaching.services) {
		
		let shetd = service.hetd;

		if( ! Number.isFinite(shetd) ) {

			shetd = shetd.split('*');

			if(shetd[0] == 'N/A' || shetd[1] == 'N/A')
				continue;

			shetd = Number(shetd[0]) * Number(shetd[1]);
		}

		hetd += shetd;
	}

	return hetd;
}