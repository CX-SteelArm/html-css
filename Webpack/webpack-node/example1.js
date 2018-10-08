var url = require('url');
var urlResult = url.parse('http://webpack.toobug.net/zh-cn/index.html');
console.log(urlResult);

var cookie = require('cookie');
var cookieResult = cookie.parse('name=toobug; subject=webpack;');
console.log(cookieResult);
