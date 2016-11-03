"use strict";

// All exports here
module.exports.buildQueryString 	= buildQueryString;
module.exports.prettifyRawTweets 	= prettifyRawTweets;

/**
 *
 * @param queryParams Accepts the query parameters in JSON format.
 * key of json corresponds to the query parameter.
 * And corresponding value of that key is interpreted as the value of query parameter.
 * @returns {string} The URL encoded query string.
 */
function buildQueryString(queryParams) {
	let queryString = "?";
    // Iterate through each key-value pair and extend the query string 'queryString'
	for(let key in queryParams) {
		queryString += key + "=" + encodeURIComponent(queryParams[key]) + "&";
	}

	// Remove the unnecessary '&' char at the end of queryString
	queryString = queryString.slice(0, -1);
	return queryString;
}

/**
 * Convert the raw data received from twitter API search result to html code
 * that can be rendered in a browser.
 * Iterate through all the tweets and wrap them in a '<p></p>' html tag
 * so that it's readable in a web browser.
 * @param tweetsData {object} An object that contains the tweets search result.
 * @returns {string} The HTML code in a string.
 */
function prettifyRawTweets(tweetsData) {
    // Get the array of tweets.
	const tweets = tweetsData.statuses;
    // A new array to contain html code (as a string) for every tweet wrapped in a <p> tag
	const prettifiedTweets = [];
	for(let i=0; i<tweets.length; ++i) {

        // Also print the tweets on terminal.
		console.log(tweets[i].text + "\nRetweets: " + tweets[i].retweet_count + "\n\n");

        // Create html code to display the tweet in a browser.
		let tweet = "<p>";
		tweet += tweets[i].text + "<br>Retweets: " + tweets[i].retweet_count;
		const createdAt = new Date(tweets[i].created_at);
		tweet += " (Tweeted at: " + createdAt.toString() + ")";
		tweet += "</p>"
		prettifiedTweets.push(tweet);
	}

	// Each tweet separated by a new line.
    return prettifiedTweets.join('<br>');
}