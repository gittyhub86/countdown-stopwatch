var express = require('express'),
  app = express();

app.use(express.static('./'));

app.get('/servertime/:offset', function(req, res) {
	var nowServer = new Date();
	var nowServerUtc = new Date(nowServer.getUTCFullYear(),
		nowServer.getUTCMonth(), nowServer.getUTCDate(),
		nowServer.getUTCHours(), nowServer.getUTCMinutes(), nowServer.getUTCSeconds());
	var convertedTime = nowServerUtc.setHours(nowServerUtc.getHours() - req.params.offset); 
	res.send(new Date(convertedTime));
});

app.listen(3000);
console.log('Server listening on port 3000');