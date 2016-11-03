"use strict";

module.exports.buildQueryString 	= buildQueryString;
module.exports.prettifyRawTweets 	= prettifyRawTweets;

function buildQueryString(queryParams) {
	let queryString = "?";
	for(let key in queryParams) {
		queryString += key + "=" + encodeURIComponent(queryParams[key]) + "&";
	}

	// Remove the unnecessary '&' char at the end of queryString
	queryString = queryString.slice(0, -1);
	return queryString;
}

function prettifyRawTweets(tweetsData, cb) {
	const tweets = tweetsData.statuses;
	const prettifiedTweets = [];
	for(let i=0; i<tweets.length; ++i) {

		// Create html code to display the tweet in a browser.
		// Also print the tweets on terminal.
		console.log(tweets[i].text + "\nRetweets: " + tweets[i].retweet_count + "\n\n");
		let tweet = "<p>";
		tweet += tweets[i].text + "<br>Retweets: " + tweets[i].retweet_count;
		const createdAt = new Date(tweets[i].created_at);
		tweet += " (Tweeted at: " + createdAt.toString() + ")";
		tweet += "</p>"
		prettifiedTweets.push(tweet);
	}

	return prettifiedTweets.join('<br>');
}