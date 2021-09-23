'use strict';

const parseString = require('xml2js').parseString;

const body = document.querySelector('body');

async function fetchData(fetchTemplate) {
	const res = await fetch(fetchTemplate);
	const data = await res.text();
	return data;
}

function addLinkToBody(link, place) {
	const newdiv = document.createElement('div');
	const newLink = document.createElement('a');
	newLink.target = '_blank';
	newLink.href = link;
	newLink.innerText = formatLink(link);
	newdiv.append(newLink);
	place.append(newdiv);
}

function formatLink(link) {
	if (link.includes("shops")) {
		return '';
	} else {
		return link.slice(19).replace(/\/|\-/g, ' ');
	}
}

const data = fetchData('https://megatop.by/sitemap.xml');

data.then(
	function (result) {
		parseString(result, function (err, result) {

			const answer = result.urlset.url;

			const lastElemsArray = answer.slice(`${answer.length - 123}`, `${answer.length}`).reverse();

			lastElemsArray.forEach(el => {
				addLinkToBody(el.loc[0], body);
			});

		});
	});