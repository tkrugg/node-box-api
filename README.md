# node-box-api

## Install

`npm install node-box-api`

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
resources by call `box.folders`

#### Listing Root Folder Info
```javascript
box.folders.root(function(err, res) {
	console.log(res);
});
```

#### Listing Folder Info by ID
```javascript
box.folders.info('FOLDER_ID', function(err, res) {
	console.log(res);
});
```

#### Listing Items in Folder
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