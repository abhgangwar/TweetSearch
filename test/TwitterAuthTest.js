const fs 			= require('fs');
const TwitterOAuth 	= require('../libs/TwitterOAuth');

describe('Twitter Authenticate', function() {

	// Test whether authentication with twitter is done successfully.
	it('successfully authenticate and return access token', function(done) {
		fs.readFile('./config/default.json', function(err, data) {
			if(err) {
				throw err;
			}

			const config = JSON.parse(data.toString()).twitter;
			const credentials = {
				client: config.client,
				auth: config.auth
			};
			const auth = new TwitterOAuth(credentials);
			auth.getAccessDetails(done);
		});
	});
});