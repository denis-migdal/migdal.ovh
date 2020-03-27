//const $ = require('jquery');
const $ = require('./jquery_base.js');

var index;
var last_anchor;
var last_anchor_elem = null;

let pages = null;


function next_slide() {

	if( index+1 < pages.length)
		goto_page(index+1);
}

function previous_slide() {
	if( index != 0)
		goto_page(index-1);
}

function goto_page(next, anchor) {

	slide(index, next, anchor);
	index = next;
	last_anchor = anchor;

	let name = id_to_pagename[next];
	var stateObj = { name: name, id: next };

	let uanchor = "";
	if( anchor != null) {
		uanchor = "/" + anchor;		
	}

	history.pushState(stateObj, name, "/"+name+uanchor);
}

function goto_pagename(next, anchor){

	next = pagename_to_id[next];
	goto_page(next, anchor);
}

function slide(old, index, anchor) {

	pages.eq(old).removeClass("active");
	pages.eq(index).addClass("active");

	if( $('#navbar').attr('aria-expanded') == "true" ){
		$(".navbar-toggle").trigger( "click" );
	}

	$('#pages > *').eq(old).addClass('hidden_page');
	$('#pages > *').eq(index).removeClass('hidden_page');

	$('#page_footer').toggleClass('hidden_page', index == 0);

	if( last_anchor_elem != null) {
		$(last_anchor_elem).removeClass("url_hash");
	}

	if( anchor != null) {
		let elem = document.getElementById(anchor);
		elem.scrollIntoView();
		$(elem).addClass("url_hash");
		last_anchor_elem = elem;
	} else {
		window.scrollTo(0, 0);
	}
}

let touch_x = null;
let touch_y = null;

function init_events() {

	$(document).on( 'keydown', (event) => {

		if(event.which == 37) {
			previous_slide();
			return false;
		}
		if(event.which == 39) {
			next_slide();
			return false;
		}
	} );

	$(document).on("touchstart", (event) => {
		let touch = event.changedTouches[0];
		touch_x = touch.pageX;
		touch_y = touch.pageY;
	});
	$(document).on("touchend", (event) => {
		let touch = event.changedTouches[0];
		let dx = touch.pageX - touch_x;
		let dy = touch.pageY - touch_y;

		if( Math.abs(dx) < Math.abs(dy) )
			return;

		if( Math.abs(dx) < 50 )
			return;

		if( dx < 0 )
			next_slide();
		else if(dx > 0)
			previous_slide();
	});
}

function init() {
	index = initial_page;

	let parts = window.location.pathname.split('/');
	let anchor = parts[2];

	if(anchor == "" || anchor === undefined)
		anchor = null;
	init_events();
	slide(index, index, anchor);
}

//TODO DOM event ? / Import JQuery ?
$( () => {
	pages = $('#nav > *');
	init();
	document.documentElement.scrollTop -=60;

	window.onpopstate = (event) => {
		let new_index = initial_page;		
		if( event.state != null)
			new_index = event.state.id;
		slide(index, new_index);
		index = new_index;
	};


	$('html').on('click', "a", (event) => {

		if( event.ctrlKey )
			return true;

		let dst = $(event.currentTarget).attr('href');

		if(dst[0] != '/' || $(event.currentTarget).attr('download') )
			return true;

		event.preventDefault();

		let [n, a, b] = dst.split('/');
		goto_pagename(a, b);

		document.documentElement.scrollTop -=60;

		return false;

	});

	$('html').on('click', ".scrolltop_btn", (event) => {

		event.preventDefault();

		document.documentElement.scrollTop = 0;

		return false;
	});
});