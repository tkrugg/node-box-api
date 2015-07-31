'use strict';

var request = require('superagent');

function Files(options) {
	this.options = options;
};

Files.prototype.info = function(id, done) {
	request.get(this.options.base_url + '/files/' + id)
		   .set('Authorization', this.options.auth)
		   .end(function(err, res) {
			   if(res.error) {
				   return done('Error: ' + res.error.message);
			   }
			   done(null, res.body);
		   });
};

Files.prototype.download = function(id, params, done) {
	if(typeof params === 'function') {
		done = params;
		params = {};
	}
	request.get(this.options.base_url + '/files/' + id + '/content')
		   .set('Authorization', this.options.auth)
		   .redirects(0)
		   .end(function(err, res) {
			   if(res.error) {
				   return done('Error: ' + res.error.message);
			   }
			   done(null, res.headers.location);
		   });
};

Files.prototype.thumbnail = function(id, params, done) {
	if(typeof params === 'function') {
		done = params;
		params = {};
		params.extension = 'png'
	}
	params = params || {};
	params.extension = params.extension || 'png';
	request.get(this.options.base_url + '/files/' + id + '/thumbnail.' + params.extension)
		   .query({min_height: params.min_height})
		   .query({min_width: params.min_width})
		   .query({max_height: params.max_height})
		   .query({max_width: params.max_width})
		   .set('Authorization', this.options.auth)
		   .end(function(err, res) {
			   if(res.error) {
				   return done('Error: ' + res.error.message);
			   }
			   done(null, res);
		   });
};

module.exports = Files;