"use strict";

exports.buildQueryString = buildQueryString;

function buildQueryString(queryParams) {
	let queryString = "?";
	for(let key in queryParams) {
		queryString += key + "=" + encodeURIComponent(queryParams[key]) + "&";
	}

	// Remove the unnecessary '&' char at the end of queryString
	queryString = queryString.slice(0, -1);
	return queryString;
}