//const accounts = require('./../../json/accounts.json');
//const publications = require('./../../json/publications.json');

//const PubUtils = require('../publication.js');

const accounts = require('../home/accounts.json');

module.exports = {

	prerender: ($, options) => {

		// Links
		$('#pub_hal').attr('href', accounts.HAL.url);
		$('#pub_orcid').attr('href', accounts.ORCID.url);
		$('#pub_rg').attr('href', accounts.ResearchGate.url);

	}

}

//TODO + REWARDS...


/*
module.exports = (html, $) => {


	fill_last_pub(html.find('#recent ul'), $);
};*/


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