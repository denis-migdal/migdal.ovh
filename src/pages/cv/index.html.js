//const accounts = require('./../../json/accounts.json');
//const cv = require('./../../json/cv.json');

module.exports = (html, $) => {

	html.find('#cv_linkedin').attr('href', accounts.LinkedIn.url);


	fill_toc( html.find('.cv_toc'), $);


	fill_content( html.find('#cv_content'), $);

};


function fill_toc(elem, $) {

	let i = 0;
	let list;

	for(let type_id in cv.parts_names) {

		if(i++ % 3 == 0) {
			list = $('<ul></ul>');
			elem.append(list);
		}

		let li = $('<li></li>');
		let a = $('<a></a>');

		a.attr('href', '/cv/' + type_id);
		a.text( cv.parts_names[type_id] );

		li.append(a);
		list.append(li);

	}
}


function fill_content(target, $) {


	for(let type_id in cv.parts_names) {

		let type_name = cv.parts_names[type_id];
		// $show_elem = $show_cv_elems[$type_id];

		let container = $('<div></div>');
		container.addClass('img-rounded hrl1');
		container.attr('id', type_id);

		container.append('<hr class="hrtop"/>');

		let subcontainer = $('<div></div>');
		subcontainer.addClass('hrl2');


		subcontainer.append( title(type_name, $) );

		let list = $('<ul></ul>');

		for(let cv_item of cv[type_id] ) {

			let elem = $('<li></li>');

			show_cv_elems[type_id](elem, cv_item, $);

			list.append(elem);
		}

		subcontainer.append(list);

		container.append(subcontainer);

		container.append('<hr class="hrbottom"/>');

		target.append(container);
	}
}


function title(name, $) {

	let h2 = $('<h2></h2>');
	h2.addClass('title');

	h2.append('<a href="#" class="glyphicon glyphicon-arrow-up scrolltop_btn" title="Go to top"></a>');
	h2.append(' ' + name);

	return h2;
}


let show_cv_elems = {};

show_cv_elems["doc-form"] = (target, elem, $) => {

	let span = $('<span></span>');
	span.addClass('cv_span');
	span.text(elem.date);

	target.append(span);
	target.append(' <strong>'+ elem.name +'</strong> (<em>'+ elem.time +', by '+ elem.prof +'</em>)');
};

show_cv_elems.edu = (target, elem, $) => {


	let span = $('<span></span>');
	span.addClass('cv_date');
	span.text(elem.dates);

	target.append(span);
	target.append(' <strong>'+ elem.name +'</strong>, <em>'+ elem.school +'</em>, ' + elem.where);
};

show_cv_elems.resp = show_cv_elems.work = (target, elem, $) => {


	let span = $('<span></span>');
	span.addClass('cv_date');
	span.text(elem.dates);

	target.append(span);
	target.append(' <strong>'+ elem.name +'</strong>, <em>'+ elem.place +'</em>, ' + elem.where);
	
};


show_cv_elems.misc = show_cv_elems.vulg = show_cv_elems.certifs = (target, elem, $) => {

	let span = $('<span></span>');
	span.addClass('cv_date');
	span.text(elem.date);

	target.append(span);
	target.append(' <strong>'+ elem.name +'</strong> (<em>'+ elem.details +'</em>)');
};

show_cv_elems.rev = (target, elem, $) => {

	let span = $('<span></span>');
	span.addClass('cv_date');
	span.text(elem.date);

	target.append(span);
	target.append(' <strong>'+ elem.name +'</strong>');
};