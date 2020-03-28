const accounts = require('./../../json/accounts.json');
const publications = require('./../../json/publications.json');

const PubUtils = require('../publication.js');

module.exports = (html, $) => {

	html.find('#pub_hal').attr('href', accounts.HAL.url);
	html.find('#pub_orcid').attr('href', accounts.ORCID.url);
	html.find('#pub_rg').attr('href', accounts.ResearchGate.url);

	PubUtils.show_summary(html.find('#pub_summary'), publications, pub_types, $);

	fill_last_pub(html.find('#recent ul'), $);

	fill_pubs( html.find('#pubs_content'), $);
};


function fill_last_pub(target, $) {

	let keys = Object.keys(publications);

	for(let i = 0; i < 3; ++i) {
		let list = $('<li class="publications_item"></li>');
		let pub = publications[keys[i]];
		pub.id = keys[i];
		PubUtils.show_publication(list, pub, $);
		target.append(list);
	}
}

let pub_types = {
	"int.jrnl": "International Journals",
	"int.conf.": "International Conferences",
	"nat.jrnl": "National Journals",
	"nat.conf.": "National Conferences",
	"posters-demo":  "Posters & Demos"
};

function fill_pubs(target, $) {

	for(let type_id in pub_types) {
		let type_name = pub_types[type_id];

		let div = $('<div></div>');
		div.addClass("img-rounded hrl1");
		div.attr('id', type_id);

		div.append('<hr class="hrtop"/>');

		let subdiv = $('<div></div>');
		subdiv.addClass('hrl2');

		subdiv.append('<h2 class="title"><a href="#" class="glyphicon glyphicon-arrow-up scrolltop_btn" title="Go to top"></a> '+ type_name +'</h2>');

		let list = $('<ul></ul>');

		let pubs = Object.keys(publications).filter( e => publications[e].content.type == type_id);

		for(let id of pubs) {

			let publication = publications[id];
			publication.id = id;

			let elem = $('<li></li>');
			elem.addClass('img-rounded publications_item');
			elem.attr('id', id);

			PubUtils.show_publication(elem, publication, $);
			list.append(elem);
		}

		subdiv.append(list);
		div.append(subdiv);

		div.append('<hr class="hrbottom"/>');

		target.append(div);
	}

}