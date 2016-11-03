"use strict";
const TwitterAPI = require('../libs/TwitterSearch.js');

const twitterSearch = new TwitterAPI();
function reqHandler(req, res){
	twitterSearch.searchTweets((err, data) => {
		if(err) {
			return res.send({"error": err.message});
		}
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(data));
	});
}

module.exports = reqHandler