

function __PRESCRIPT__($, options, context = {}) {

	let menu = JSON.parse( fs.readFileSync(context.__dir__ + '/pages/meta.json', 'utf8') );

	let menu_target = $('ul#nav');
	let content_target = $('div#pages');

	for(let elem of menu) {
		let lelem = elem.toLowerCase();

		menu_target.append('<li><a href="/'+ lelem +'" id="menu_'+ lelem +'">'+ elem +'</a></li>');

		let div = $('<div class="hidden" id="content_'+ lelem +'"></div>');
		let content = $.parseHTML( fs.readFileSync( context.__dir__ + '/pages/' + lelem + '.html', 'utf8' ) );
		div.append( content );
		content_target.append(div);
	}

	return html;
}