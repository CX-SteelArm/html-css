var http = require('http');

var httpServer = http.createServer(function(req, res) {
  if (req.url == "/"){
    res.writeHead(200, {
      'Content-Type': 'text/javascript;charset=UTF-8',
      // 禁用下一句就会报同源错误
      'Access-Control-Allow-Origin': '*'
    })
    res.end('CORS ready');
  }
})

httpServer.listen(3000, function() {
  console.log("server is running on port 3000");
});