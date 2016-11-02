var http = require('http');
config = require('config');
var TwitterAPI = require('./routes/TwitterSearch.js');

var twitterSearch = new TwitterAPI();
var reqHandler = function(req, res){
	twitterSearch.searchTweets((err, data) => {
		if(err) {
			return res.send({"error": err.message});
		}
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(data));
	});
}
var server = http.createServer(reqHandler);
server.listen(3000);
