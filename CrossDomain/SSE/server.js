// 未完工
var http = require('http');

var server = http.createServer();

server.on('request', function (req, res) {
  var data = 'data:Some Information\nid:1\n\n';
  res.writeHead(200, 'Content-Type:text/event-stream;charset=UTF-8');
  res.end(data);
});

server.listen(3000, function () {
  console.log("Running on port 3000...");
})