# node-box-api

## Install

npm install node-box-api

## Setup
```javascript
var Box = require('node-box-api');
var box = new Box({
	client_id: 'APPLICATION_CLIENT_ID',
	client_secret: 'APPLICATION_CLIENT_SECRET',
	access_token: 'USER_ACCESS_TOKEN',
	refresh_token: 'USER_REFRESH_TOKEN
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