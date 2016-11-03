"use strict";
// For making http/https requests.
const request 		= require('request');
// For reading configuration file.
const fs 			= require('fs')	;
// To authenticate with twitter and get bearer token
const TwitterOAuth 	= require('../libs/TwitterOAuth.js');
// Common utility functions
const utils 		= require('../Utils.js');

// To add extra functions to the prototype later
let method = twitterSearch.prototype;

/**
 * A Twitter API which provides the method to search tweets.
 * Reads the config details ( required for authentication and search )
 * from config file.
 * Fetches the bearer access token from 'TwitterOAuth' and then
 * uses to search tweets using twiiter's pulic REST API in it's
 * method 'searchTweets'.
 * @param cb Callback. Inform the caller about success/failure
 * after the authentication with twitter has finished.
 */
function twitterSearch(cb) {
    // Read the config file.
	fs.readFile('./config/default.json', (err, data) => {
		if(err) {
            throw err;
		}
		// 'data' is a buffer. Convert it to string and then parse the json from that string.
		data = JSON.parse(data.toString());

		/*
         Store the config details in 'searchTweets' data member.
         This will be used for different purposes later.
		 */
		this._twitterConfig = data.twitter;

		/*
         Query Parameters in JSON format. You can add extra parameter here.
         The value of search parameters is currently being obtained from the config file.
         Store these in '_queryParams' data member, to be used later.
		 */
		this._queryParams = {
		q: this._twitterConfig.searchQuery
			+ " min_retweets:" + this._twitterConfig.minRetweets
		};

		/*
         Use the details we parsed above from json config file.
         These credentials contain consumer key and secret required
         to authenticate with twitter.
		 */
        const credentials = {
			client: this._twitterConfig.client,
			auth: this._twitterConfig.auth
		};

        // Create an 'TwitterOAuth' instance.
        const auth = new TwitterOAuth(credentials);

        // Request the bearer access token.
		auth.getAccessDetails((err, data) => {
			if(err) {
				throw err;
				return cb(err, null);
			}

            /*
             Store the access token details in '_accessDetails' data member.
             It will be used later to fetch search results from twitter.
             */
			this._accessDetails = data;
			cb(null,"success");
		});
	});
}

/**
 * This function calls the twitter's REST API for searching tweets.
 * If success, the callback returns with search results data. Otherwise,
 * callback returns with an error.
 * @param cb Callback to inform the caller of search results/failure
 * after requesting the search results from twitter.
 */
method.searchTweets = function (cb) {
    // Twitter's search API's endpoint, as specified in json config file
	let searchUrl = this._twitterConfig.searchUrl;
    // Build the query string in URL encoded form.
	let queryString = utils.buildQueryString(this._queryParams);
    // Complete search URL
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
        // If error, inform the caller of the error.
		if(err) {
			console.log("Error while seaching tweets", err.message);
			return cb(err, null);
		}
		cb(null, body);
	});
}

module.exports = twitterSearch;