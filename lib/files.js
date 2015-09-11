'use strict';

var request = require('superagent');

function Files(options) {
	this.options = options;
	this.options.upload_url = "https://upload.box.com/api/2.0";

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


Files.prototype.upload = function(file, folder, done) {
	var attributes = {
		"name": Math.random() + "tigers.jpeg",
		"parent":{"id": folder}
	};
	request.post(this.options.upload_url + '/files/content')
		.set('Authorization', this.options.auth)
		.field('attributes', JSON.stringify(attributes))
		.attach('file', file)
		.end(function(err, res) {
			if(res.error) {
				return done('Error: ' + res.error.message);
			}
			done(null, res.body);
		});
};


Files.prototype.sharedLink = function(id, done) {
	var data= '{"shared_link": {"access": "open"}}';
	request.put(this.options.base_url + '/files/' + id)
		.set('Authorization', this.options.auth)
	    .send(data)
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