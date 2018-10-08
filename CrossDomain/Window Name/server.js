var http = require('http');
var fs = require('fs')
var url = require('url');

var server = http.createServer();

server.on('request', function(req, res) {
  var urlPath = url.parse(req.url).pathname;

  if (urlPath == '/domainB') {
    // 1.使用流
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    // fs.createReadStream('./main.html').pipe(res);

    // 2.异步读取
    res.writeHead(200, {
      'Content-Type': 'text/html;charset=UTF-8'
    })
    fs.readFile('./main.html', "utf-8", function (err, data) {
      if (err) {
        throw err;
      }
      res.end(data);
    })

    // 3.同步读取
    // var domainContentB = fs.readFileSync('./main.html', 'utf-8');
    // console.log(domainContentB);
    // res.writeHead(200, {
    //   'Content-Type': 'text/plain;charset=UTF-8'
    // })
    // res.end(domainContentB);
  } else {
    res.writeHead(200, {
      'Content-Type': 'text/plain;charset=UTF-8'
    })
    res.end("Hello");
  }
  
})

server.listen(3000, function() {
  console.log("Server is running on port 3000...");
})