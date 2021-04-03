//const resources = require('./../../json/resources.json');

//const PubUtils = require('../publication.js');

module.exports = (html, $) => {

	fill_summary(html.find('#res_summary'), $);

	fill_res( html.find('#ress_content'), $);

};


let res_types = {
	"demos": "Online demonstrations",
	"video": "Videos",
	"poster": "Posters",
	"slides": "Slides",
	"TR": "Technical Reports"
};

function fill_summary(target, $) {

	target.addClass('pub_sum');

	let list;
	let i = 0;

	for(let type_id in res_types) {
		let type_name = res_types[type_id];

		if(i++ % 2 == 0) {
			list = $('<ul></ul>');
			target.append(list);
		}

		let pubs = Object.keys(resources).filter( e => e.endsWith('-' + type_id) );
		let elem = $('<li><a href="/resources/'+ type_id +'">'+ type_name +':  '+ pubs.length +'</a></li>');

		list.append(elem);

	}

}




function fill_res(target, $) {

	for(let type_id in res_types) {
		let type_name = res_types[type_id];

		let div = $('<div></div>');
		div.addClass("img-rounded hrl1");
		div.attr('id', type_id);

		div.append('<hr class="hrtop"/>');

		let subdiv = $('<div></div>');
		subdiv.addClass('hrl2');

		subdiv.append('<h2 class="title"><a href="#" class="glyphicon glyphicon-arrow-up scrolltop_btn" title="Go to top"></a> '+ type_name +'</h2>');


		if(type_id == 'demos')
			PubUtils.show_demos(subdiv, resources, $);
		else		
			show_resources(subdiv, resources, type_id, $);

		div.append(subdiv);

		div.append('<hr class="hrbottom"/>');

		target.append(div);
	}
}


function show_resources(target, resources, type_id, $) {

	let pubs = Object.keys(resources).filter( e => e.endsWith('-' + type_id) );

	let list = $('<ul></ul>');

	for(let id of pubs) {

		let publication = resources[id];
		publication.id = id;

		let elem = $('<li></li>');
		elem.addClass('img-rounded resources_item');
		elem.attr('id', id);

		PubUtils.show_publication(elem, complete_resource(publication), $);
		list.append(elem);
	}

	target.append(list);

}


//const publications = require('./../../json/publications.json');

function complete_resource(res) {

	let paper_id = res.id.split('-').slice(0,-1).join('-');

	if( publications[paper_id] ) {

		let paper = publications[paper_id];
		res.paper = paper;

		if(paper.conf)
			res.conf = paper.conf;
	}

	return res;
}