// JSONP方式的限制：1. 只能使用GET方法；2.执行函数必须为全局函数
// 另外一种实现：使用document.createElement动态生成script标签，然后和JSONP调用相同

var http = require('http');
// 引入url模块解析url
var url = require('url');
// 引入querystring模块处理query字符串
var querystring = require('querystring');

var newServer = http.createServer();
var data = {"name": "duck"};

newServer.on('request', function(req, res) {
  var urlPath = url.parse(req.url).pathname;
  var qs = querystring.parse(req.url.split("?")[1]);

  if (urlPath === "/jsonp" && qs.callback) {
    res.writeHead(200, {
      'Content-Type': 'application/json;charset=UTF-8'
    });
    res.end(qs.callback + "(" + JSON.stringify(data) + ")");
  } else {
    res.writeHead(200, {
      "Content-Type": "application/json;charset=UTF-8"
    });
    console.log('two');
    // res.end("console.log(Running Normally ...)");
    // res.end("");
    res.end(qs.callback + "(" + JSON.stringify(data) + ")");
  }
})

newServer.listen(3000, function() {
  console.log("Server run on port 3000");
})
