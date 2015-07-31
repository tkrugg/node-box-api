'use strict';

var request = require('superagent');

var Folders = require('./lib/folders');
var Files = require('./lib/files');

function merge(defaults, options) {
	if(options && typeof options === 'object') {
		var keys = Object.keys(options);
		for(var i = 0; i < keys.length; i++) {
			var k = keys[i];
			if(options[k] !== undefined) {
				defaults[k] = options[k];
			}
		}
	}
	return defaults;
};

function Box(options) {
	var defaults = {
		base_url: 'https://api.box.com/2.0',
		upload_url: 'https://upload.box.com/api/2.0',
		refresh_url: 'https://app.box.com/api'
	};
	this.options = merge(defaults, options);
	if(!this.options.access_token) {
		throw new Error('access_token required');
	}
	this.options.auth = 'Bearer ' + this.options.access_token;
	this.folders = new Folders(this.options);
	this.files = new Files(this.options);
	this.Box = Box;
};

Box.prototype.refreshAccessToken = function(done) {
	var self = this;
	if(!this.options.client_id || !this.options.client_secret) {
		throw new Error('client_id and client_secret required');
	} else {
		
		request.post(this.options.refresh_url + '/oauth2/token')
		   	   .field('grant_type', "refresh_token")
		   	   .field('client_id', this.options.client_id)
		   	   .field('client_secret', this.options.client_secret)
		   	   .field('refresh_token', this.options.refresh_token)
		   	   .end(function(err, res) {
			   	   if(res.error) {
				   	   return done('Error: ' + res.error.message);
			   	   }
			   	   self.updateAccessToken(res.body.access_token);
			   	   done(null, res.body.access_token, res.body.refresh_token);
			   });
		
	}
};

Box.prototype.updateAccessToken = function(access_token) {
	this.options.access_token = access_token;
	this.options.auth = 'Bearer ' + this.options.access_token;
};

module.exports = Box;