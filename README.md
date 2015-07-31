# node-box-api

Currently supporting basic Box Content API

Working towards full feature support of Box Content API & Box View API

https://box-content.readme.io/reference
https://box-view.readme.io/reference

## Install
```
npm install node-box-api
```

## Setup
```javascript
var Box = require('node-box-api');

var box = new Box({
	client_id: 'APPLICATION_CLIENT_ID',
	client_secret: 'APPLICATION_CLIENT_SECRET',
	access_token: 'USER_ACCESS_TOKEN',
	refresh_token: 'USER_REFRESH_TOKEN'
});
```

## Examples

### Folders API

After instantiating the Box class you can call API
resources by calling `box.folders`

#### Get Root Folder's Info
```javascript
box.folders.root(function(err, res) {
	console.log(res);
});
```

#### Get Folder's Info
```javascript
box.folders.info('FOLDER_ID', function(err, res) {
	console.log(res);
});
```

#### Get Folder's Items
```javascript
var params = {
	limit: 100,
	offset: 0,
	fields: 'name,etc'
};
box.folders.items('FOLDER_ID', params, function(err, res) {
	console.log(res);
});
```
The `params` argument is optional
```javascript
box.folders.items('FOLDER_ID', function(err, res) {
	console.log(res);
});
```

### Files API

After instantiating the Box class you can call API
resources by calling `box.files`

#### Get File's Info
```javascript
box.files.info('FILE_ID', function(err, res) {
	console.log(res);
});
```

#### Download File
```javascript
box.files.download('FILE_ID', function(err, res) {
	console.log(res);
});
```
The download function does accept `params`, however it is
not currently supported

#### Get Thumbnail
```javascript
var params = {
	min_height: 32,
	min_width: 32,
	max_height: 256,
	max_width: 256,
	extension: 'jpg'
};
box.files.thumbnail('FILE_ID', params, function(err, res) {
	console.log(res);
});
```
The `params` argument is optional
```javascript
box.files.thumbnail('FILE_ID', function(err, res) {
	console.log(res);
});
```
