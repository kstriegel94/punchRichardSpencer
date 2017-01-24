var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(process.env.PORT || 8585, function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
