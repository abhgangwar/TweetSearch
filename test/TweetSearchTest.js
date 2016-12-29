const TwitterSearch	= require('../libs/TwitterSearch');

describe('Tweets search', function() {
	// Test whether an object of 'TwitterSearch' type is created successfully
	it('should instantiate the TwitterSearch object properly', function(done) {
		const twitterObj = new TwitterSearch(done);
	});

	// Test whether the tweets are searched properly without any error
    it('should search the tweets', function(done) {
		const twitterObj = new TwitterSearch(function(err, success) {
			if(err) done(err);
			twitterObj.searchTweets(done);
		});
	});
});