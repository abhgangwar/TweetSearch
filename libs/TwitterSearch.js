"use strict";
const request 		= require('request');
const fs 			= require('fs')	;
const TwitterAuth 	= require('../libs/TwitterOAuth.js');
const utils 		= require('../Utils.js');

let method = twitterSearch.prototype;

function twitterSearch(cb) {

	fs.readFile('./config/default.json', (err, data) => {
		if(err) {
			console.log("Error while reading credentials: ", err.message);
		}
		// data is a buffer. Convert it to string and then parse the string to json
		data = JSON.parse(data.toString());

		// Store the config details
		this._twitterConfig = data.twitter;

		// Query Parameters. You can add extra parameter here.
		this._queryParams = {
		q: this._twitterConfig.searchQuery
			+ " min_retweets:" + this._twitterConfig.minRetweets
		}

		const credentials = {
			client: this._twitterConfig.client,
			auth: this._twitterConfig.auth
		}

		const auth = new TwitterAuth(credentials);
		auth.getAccessDetails((err, data) => {
			if(err) {
				console.log("Error while getting access details");
				return cb(err, null);
			}
			this._accessDetails = data;
			console.log("Search API is now ready");
			cb(null,"success");
		});
	});
}

method.searchTweets = function (cb) {
	let searchUrl = this._twitterConfig.searchUrl;
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
		method: this._twitterConfig.searchAPIMethod
	}

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