//const sprites = require('./../../img/logos/sprites.json');
//const resources = require('./../../json/resources.json');
//const publications = require('./../../json/publications.json');
//const PubUtils = require('../publication.js');



module.exports = {

	prerender: ($, options) => {
		//PubUtils.show_summary(html.find('#home_publications'), publications, pub_types, $);
	},
	render: ($, options) => {}

};
/*
module.exports = (html, $) => {

	html.find('#home_teaching_stats').text( total_service(teachings) );

	show_partners_icons(html.find('#home_partners'), $);
	show_teaching_icons(html.find('#home_teachings'), $);

	PubUtils.show_demos(html.find('#home_demos'), resources, $);
	PubUtils.show_summary(html.find('#home_publications'), publications, pub_types, $);
};
*/


//const partners = require('./../../json/partners.json');

function show_partners_icons(target, $) {

	let div = $('<div class="d-flex flex-row justify-content-center flex-wrap"></div>');

	for(let id in partners) {

		let partner = partners[id];

		if(id[0] == "@")
			return;

		let num = sprites.partners[id] || 0;

		let img = $('<div class="img img_partners sprite_'+ num +'"></div>');
		img.addClass('img-rounded logo big_logo partner_logo');

		let link = $('<a></a>');
		link.attr('title', partner.name);
		link.attr('href', '/relations/' + id);
		link.addClass('img-rounded logo big_logo partner_minilogo');
		link.append(img);

		div.append(link);
	}

	target.append(div);
}


//const teachings = require('./../../json/teachings.json');

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

function total_service(teachings) {

	let sum = 0;

	for(let v of Array.from(Object.values(teachings), e => services_stats(e) ))
		sum += v;
	
	return sum;
}
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