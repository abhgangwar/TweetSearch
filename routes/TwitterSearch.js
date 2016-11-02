"use strict";
const TwitterAuth = require('../auth/TwitterOAuth.js');
const utils 		= require('../Utils.js');
const request 	= require('request');

let method = twitterSearch.prototype;

function twitterSearch() {
	// Query Parameters. You can add extra parameter here.
	this._queryParams = {
		q: config.get('twitter.searchQuery') 
			+ " min_retweets:" + config.get('twitter.minRetweets')
	}

	const credentials = {
		client: config.get('twitter.client'),
		auth: config.get('twitter.auth')
	}

	const auth = new TwitterAuth(credentials);
	auth.getAccessDetails((err, data) => {
		if(err) {
			console.log("Error while getting access details");
			return;
		}
		this._accessDetails = data;
	});
}

method.searchTweets = function (cb) {
	let searchUrl = config.get('twitter.searchUrl');
	let queryString = utils.buildQueryString(this._queryParams);
	searchUrl += queryString;

	// Set Authorization headers
	const reqHeaders = {
		"Authorization": "Bearer " + this._accessDetails.access_token
	}

	// Options for search API call 
	const options = {
		headers: reqHeaders,
		uri: searchUrl,
		method: config.get('twitter.searchAPIMethod')
	}
	//console.log("Options are: ", options);

	// Request the search API
	request(options, (err, res, body) => {
		if(err) {
			console.log("Error while seaching tweets", err.message);
			return cb(err, null);
		}
		cb(null, body);
	});
}

module.exports = twitterSearch;