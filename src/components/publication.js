
function show_demos(target, resources, $) {

	let keys = Object.keys(resources).filter( e => e.endsWith('-demos') );;

	let content = $('<div></div>');
	content.addClass('demo-lst');

	for(let key of keys) {
		let res = resources[key];

		content.append('<a href="'+ res.url +'">'+ res.title +'</a>');
	}


	target.append(content);
}


module.exports = {
	show_publication: show_publication,
	show_demos: show_demos,
	show_summary: show_summary
};


/***********************************************/


function show_icons(target, pub, $) {
	show_warning(target, pub, $);
	show_awards(target, pub, $);
}

function show_warning(target, pub, $) {

	if( ! pub.warning)
		return;

	target.append('<span class="glyphicon glyphicon-alert" title="'+ pub.warning +'"></span>');
}

function show_awards(target, pub, $) {

	if( pub.awards )
		target.append('<span class="glyphicon glyphicon-award" title="'+ pub.awards +'"></span>');
}

let related_ressources = ['slides', 'poster', 'demo', 'video', 'paper'];
let related_langs = ['en', 'fr', 'it', 'conf.', 'journal'];

function show_related(target, pub, $) {

	let list = $('<span></span>');
	list.addClass('pull-right');


	let childs = [];

	for(let rres of related_ressources) {

		let related = find_related(pub, rres);

		if(related)
			childs.push( build_link(rres, related.page, related.id, $) );
	}

	for(let rlang of related_langs) {

		let related = find_related(pub, rlang);
		if(related)
			childs.push( build_link(rlang, related.page, related.id, $) );
	}

	if(childs.length) {
		list.append('<i>see also</i> ');
		list.append(...childs);
	}

	target.append(list);
}


const resources = require('./../json/resources.json');
const publications = require('./../json/publications.json');

function find_related(pub, key) {

	let id = pub.id;

	if(pub.langs && pub.langs[key]) {
		let result = publications[pub.langs[key]];
		result.id = pub.langs[key];
		result.page = 'publications';
		return result;
	}

	if(key == 'paper') {

		id = id.split('-').slice(0, -1).join('-');

		let paper = publications[id];
		if(paper) {
			paper.id = id;
			paper.page = 'publications';
			return paper;
		}

		return null;
	}

	let res = resources[id + '-' + key];
	if(res) {

		res.id = id + '-' + key;
		res.page = 'resources';
		return res;
	}

	return null;
}


function build_link(name, page, id, $) {

	let link = $('<a></a>');

	link.attr('title', name);
	link.attr('href', '/' + page + '/' + id);
	link.append('<span class="logo vat_logo">['+ name +']</span>');

	return link;
}