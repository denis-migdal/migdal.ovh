{
	let req = require.context("../pages/", true, /^.*\.css$/);
	req.keys().forEach( (key) => {
		req(key);
	});
}

{
	let req = require.context("./css", true, /^.*\.css$/);
	req.keys().forEach( (key) => {
	    req(key);
	});
}

require('./js/nav.js');