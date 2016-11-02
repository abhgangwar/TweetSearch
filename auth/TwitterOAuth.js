"use strict";

let method = initAuth.prototype;

function initAuth(credentials) {
	this._oauth2 = require('simple-oauth2').create(credentials);

	// Function to refresh the token, if the old token is expired.
	function _refreshToken(cb) {
		this._accessDetails.refresh((err, data) => {
			if(err) {
				console.log("Error while refreshing token: ", err.message);
				return cb(err, null);
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

	this._oauth2.clientCredentials.getToken({}, (err, data) => {
		if (err) {
			console.log('Access Token Error', err.message);
			return cb(err, null);
		}

		this._accessDetails = this._oauth2.accessToken.create(data);
		return cb(null, this._accessDetails.token);
	});
}

module.exports = initAuth;