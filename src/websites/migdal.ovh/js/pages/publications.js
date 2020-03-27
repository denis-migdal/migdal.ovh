const accounts = require('./../../json/accounts.json');

module.exports = (html, $) => {

	html.find('#pub_hal').attr('href', accounts.HAL.url);
	html.find('#pub_orcid').attr('href', accounts.ORCID.url);
	html.find('#pub_rg').attr('href', accounts.ResearchGate.url);

};