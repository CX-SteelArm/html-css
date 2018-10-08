var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer();

server.on('request', function (req, res) {
  var urlPath = url.parse(req.url).pathname;
  if (urlPath == '/iframe') {
    res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
    fs.readFile('./iframe.html', 'utf-8', function (err, data) {
      if (err) {
        throw err;
      }
      res.end(data);
    })
  }
});

server.listen(3000, function () {
  console.log('Running on port 3000...');
})
