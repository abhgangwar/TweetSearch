"use strict";
const fs = require('fs');

// NodeJs module for OAuth2 authentication.
const OAuth2 = require('simple-oauth2');

// To add extra functions to the prototype later
let method = initAuth.prototype;

/**
 * Used for authenticating with twitter and fetching tbe bearer access token.
 * @param credentials The required credentials to authenticate with twitter
 * Credentials contain consumer key and secret and the API endpoint from where
 * the access token is to be requested. See config/default.json.sample for exact details.
 */
function initAuth(credentials) {
	this._oauth2 = OAuth2.create(credentials);

	// Function to refresh the token, if the old token is expired.
	function _refreshToken(cb) {
		this._accessDetails.refresh((err, data) => {
			if(err) {
				throw err;
			}
			// Store the new token.
			this._accessDetails = data;
			cb();
		});
	}
}

method.getAccessDetails = function(cb) {
	/**
	 * If the token already exists then don't make the another 
	 * request for it as API will return the same token
	 * if the token wasn't invalidated earlier.
	 * Check if token is expired, then request for a new token.
	 */
	if(typeof(this._accessDetails) !== 'undefined') {
		// If expired. request a new token.
		if(this._accessDetails.expired()) {
			this._refreshToken(() => {
				return this._accessDetails.token;
			})
		}
		else {
			return this._accessDetails.token;
		}
	}

    /**
     * Authenticate with twitter and get the bearer access token.
     * The token is then store in data member name '_accessDetails'.
     */
    this._oauth2.clientCredentials.getToken({}, (err, data) => {
		if (err) {
			return cb(err, null);
		}

		this._accessDetails = this._oauth2.accessToken.create(data);
		return cb(null, this._accessDetails.token);
	});
}

module.exports = initAuth;