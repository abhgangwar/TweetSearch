"use strict";
// To fetch tweet search results.
const TwitterAPI 	= require('../libs/TwitterSearch');
const utils 		= require('../Utils');
const path          = require('path');

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
        };

        // Setting the required headers and status code here.
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        // Send the response.
        res.end(JSON.stringify(response));
        return;
    }

    const query = decodeURIComponent(req.query.q);
    if(query !== 'undefined') {
        twitterSearch.setSearchQuery(query);
    }
    // 'TwitterAPI' is ready to use. Search the tweets
    twitterSearch.searchTweets((err, data) => {
        if(err) {
            return res.end("error: " + err.message);
        }
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        // Get an html code to render the search results in a browser.
        data = JSON.parse(data);
        if(data.statuses.length) {
            utils.prettifyRawTweets(data, function (err, html) {
                if(err) {
                    res.end(JSON.stringify(data.statues));
                    return;
                }
                res.end(html);
                return;
            });
        }
        else {
            res.end("<h2>No tweets founds</h2>");
        }
    });
}

function homePage(req, res, next) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
}

module.exports.search = reqHandler;
module.exports.homePage = homePage;