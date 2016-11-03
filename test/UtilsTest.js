var assert 	= require('assert');
const utils = require('../Utils');

describe('Utils - Common utility functions', function() {

    describe('#buildQueryString()', function() {
        it('should return an URL encoded query string', function() {
            const queryParams = {
                q: '#custserv min_retweets:7'
            };
            const expected = '?q=%23custserv%20min_retweets%3A7';
            assert.equal(utils.buildQueryString(queryParams), expected);
        });
    });

    // Test whether the raw search results data is being converted to html code correctly.
    describe('#prettifyRawTweets()', function() {
        it('should return html code for containing tweet in a <p> tag', function() {
            const testData = {
                statuses: [
                    {
                        text: '#chatbots need to deliver economic and #customersat '
                            + 'benefits to the deploying enterprise says @VentureBeat '
                            + '#custserv https://t.co/HUqbObmYsl',
                        retweet_count: 1,
                        created_at: 'Thu Nov 03 12:27:53 +0000 2016'
                    }
                ]
            };
            const expected = '<p>#chatbots need to deliver economic and '
                + '#customersat benefits to the deploying enterprise says '
                + '@VentureBeat #custserv https://t.co/HUqbObmYsl<br>Retweets: 1 '
                + '(Tweeted at: Thu Nov 03 2016 17:57:53 GMT+0530 '
                + '(India Standard Time))</p>';
            assert.equal(utils.prettifyRawTweets(testData), expected);
        });
    });
});