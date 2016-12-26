"use strict";
const fs    = require('fs');
const path  = require('path');
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
function prettifyRawTweets(tweetsData, cb) {
    // Get the array of tweets.
    const tweets = tweetsData.statuses;
    // A new array to contain html code (as a string) for every tweet wrapped in a <p> tag
    const prettifiedTweets = [];
    for(let i=0; i<tweets.length; ++i) {
        // Create html code to display the tweet in a browser.
        const createdAt = new Date(tweets[i].created_at);
        let filePath = path.parse(tweets[i].user.profile_image_url);
        const name = filePath.name.replace('_normal', '');
        filePath = filePath.dir + '/' + name + filePath.ext;
        let tweet = '<div class="clickable" data-href="https://twitter.com/statuses/' + tweets[i].id_str + '">';
        tweet += '<div class="row">';
        tweet += '<img class="col-sm-1 img-circle" src="' + filePath + '" />';
        tweet += '<h4 class="col-sm-11">' + tweets[i].text + '</h4>';
        tweet += '<p class="col-sm-11">' + 'Retweets: ' + tweets[i].retweet_count + ' (Tweeted at: ' + createdAt.toString() +')</p>';
        tweet += '</div>';
        tweet += '</div>';

        prettifiedTweets.push(tweet);
    }

    fs.readFile(path.join(__dirname + '/public/tweetsView.html'), function (err, data) {
        if(err) {
            console.log("Error while reading view template.", err);
            // Send simple html
            return cb(null, prettifiedTweets.join('<br>'));
        }
        data = data.toString();
        data = data.replace('{{tweets_data}}', prettifiedTweets.join('\n'));
        return cb(null, data);
    });
}