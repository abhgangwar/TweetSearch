"use strict";
// To fetch tweet search results.
const TwitterAPI 	= require('../libs/TwitterSearch');
// Common utility functions.
const utils 		= require('../Utils');

let isSearchAPIReady = false;
let errorMessage = "Please wait a few seconds while we authenticate with twitter. Retry after few seconds";

/**
 * Create an instance of TwitterAPI.
 * It takes a few seconds as it needs to authenticate with twitter.
 * If there is a request for search before the TwitterAPI finished it's
 * authentication ( Or the authentication failed for any reason ), send an
 * error in response of that request.
 * Variables 'isSearchAPIReady' and 'errorMessage' are used for this purpose.
 * Once TwitterAPI has successfully authenticated, 'isSearchAPIReady' is set to true.
 */
const twitterSearch = new TwitterAPI((err, success) => {
    // If any error while authenticating with twitter, store in 'errorMessage' var
    if(err) {
		errorMessage = err.message;
		return;
	}
	isSearchAPIReady = true;
});

function reqHandler(req, res){
	if(!isSearchAPIReady) {
		const response = {
			error: errorMessage
		}

        // Setting the required headers and status code here.
		res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        // Send the response.
		res.end(JSON.stringify(response));
		return;
	}

    // 'TwitterAPI' is ready to use. Search the tweets
	twitterSearch.searchTweets((err, data) => {
		if(err) {
			return res.end("error: " + err.message);
		}

		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        // Get an html code to render the search results in a browser.
		const htmlData = utils.prettifyRawTweets(JSON.parse(data));
		res.end(htmlData);
	});
}

module.exports = reqHandler