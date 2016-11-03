"use strict";
const TwitterAPI 	= require('../libs/TwitterSearch');
const utils 		= require('../Utils');

let isSearchAPIReady = false;
let errorMessage = "Please wait a few seconds while we authenticate with twitter";
const twitterSearch = new TwitterAPI((err, success) => {
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
		res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
		res.end(JSON.stringify(response));
		return;
	}

	twitterSearch.searchTweets((err, data) => {
		if(err) {
			return res.send({"error": err.message});
		}
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		const htmlData = utils.prettifyRawTweets(JSON.parse(data));
		//res.end(htmlData);
		res.end(htmlData);
	});
}

module.exports = reqHandler