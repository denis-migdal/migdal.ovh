//const $ = require('jquery');
const $ = require('./jquery_base.js');

function go(page, anchor = "") {

	slide(page, anchor);

	history.pushState({}, null, "/"+page+"/" + anchor);
}

function slide(next, anchor = "") {

	// display content.
	$('ul#nav > *').removeClass("active");
	$('ul#nav > #menu_' + next).addClass("active");

	$('#pages > *').addClass('hidden');
	$('#pages > #content_' + next).removeClass('hidden');
	
	// some actions.
	if( $('#navbar').attr('aria-expanded') == "true" )
		$(".navbar-toggle").trigger( "click" );
	$('#page_footer').toggleClass('hidden_page', next == 'home');

	// handle anchors.
	$('.url_hash').removeClass("url_hash");

	if( anchor != "") {
		let elem = $(anchor);
		elem.addClass("url_hash");

		if(elem.size())
			elem.get(0).scrollIntoView();
	} else {
		window.scrollTo(0, 0);
	}

	document.documentElement.scrollTop -=60;
}

function update() {
	let [n, page, anchor] = window.location.pathname.split('/');
	slide(page, anchor);
}

$( () => {

	update();

	window.onpopstate = (event) => update();

	$('html').on('click', "a", (event) => {

		if( event.ctrlKey )
			return true;

		let dst = $(event.currentTarget).attr('href');

		if(dst[0] != '/' || $(event.currentTarget).attr('download') )
			return true;

		event.preventDefault();

		let [n, page, anchor] = dst.split('/');
		go(page, anchor);
	});

	$('html').on('click', ".scrolltop_btn", (event) => {

		event.preventDefault();
		document.documentElement.scrollTop = 0;
	});
});