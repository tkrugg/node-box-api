'use strict';

var request = require('superagent');

function Folders(options) {
	this.options = options;
};

Folders.prototype.root = function(done) {
	request.get(this.options.base_url + '/folders/0')
		   .set('Authorization', this.options.auth)
		   .end(function(err, res) {
			   if(res.error) {
				   return done('Error: ' + res.error.message);
			   }
			   done(null, res.body);
		   });
};

Folders.prototype.info = function(id, done) {
	request.get(this.options.base_url + '/folders/' + id)
		   .set('Authorization', this.options.auth)
		   .end(function(err, res) {
			   if(res.error) {
				   return done('Error: ' + res.error.message);
			   }
			   done(null, res.body);
		   });
};

Folders.prototype.items = function(id, params, done) {
	if(typeof params === 'function') {
		done = params;
		params = {};
	}
	params = params || {};
	request.get(this.options.base_url + '/folders/' + id + '/items')
		   .query({limit: params.limit || 100})
		   .query({offset: params.offset || 0})
		   .query({fields: params.fields || ''})
		   .set('Authorization', this.options.auth)
		   .end(function(err, res) {
			   if(res.error) {
				   return done('Error: ' + res.error.message);
			   }
			   done(null, res.body);
		   });
};

module.exports = Folders;