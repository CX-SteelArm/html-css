## 一些基础知识点记录
===================


---------------

1. float、absolute、flex、tablecell、grid布局(高度已知的三列布局)
  五种解决方案(建议)最好都要
  
  *延伸：A.五种方案的优缺点？ B. 高度未知怎么办？ C. 兼容性和最优选方案？
  
  A
  浮动：清除浮动（脱离文档流），局限性，但兼容性好
  绝对：快捷，不易出问题，但脱离文档流，其子元素也将脱离文档流，实用性较差
  flex：较完美（一般移动设备均使用）
  tablecell：兼容性好，单元格长度一直会同步增减
  grid：新技术
  
  B
  flex和tablecell可以通用，要说出为什么
  
  *C
  兼容性
  
  *再延伸：
  上下高度固定，中间自适应
  
  两栏：*左固定，右自适应；*上固定，下自适应。
  
2. css盒模型（深度逐渐递增）

  A 标准模型+IE模型

  B 标准模型和IE模型区别
  
  C css如何设置这两种模型
  (css3)box-sizing (IE6盒模型border-box & W3C盒模型content-box)
  
  D js如何设置获取盒模型对应的宽和高
  <dom>.style.width/height(只能获取内联样式的width和height)
  <dom>.currentStyle.width/height(只有IE支持)
  window.getComputedStyle(<dom>).width/height(兼容性可以)
  dom.getBoundingClientRect().width/height(拿到绝对位置)
  
  E 实例（根据盒模型解释外边距叠加）
  原理是触发了BFC
  
  F BFC（边距重叠解决方案）or IFC（内联元素格式化上下文）
  BFC的基本概念
  BFC的原理： I. 在BFC元素的垂直外边距发生重叠 II. BFC III. BFC是独立容器，不会影响外面，也不会被外面影响。 IV. BFC容器包含其中的float元素
  BFC的创建： overflow不为visible display: table ...
  使用场景：***（找到相关的资料，仔细研究一下）

3. DOM事件

  DOM事件类 基本概念：DOM事件的级别、DOM事件模型（捕获、冒泡）、DOM事件流、描述DOM事件捕获的具体流程
  Event对象的常见应用、自定义事件
  
  A DOM事件级别
  DOM0 element.onclick = function(){}
  DOM2 element.addEventListener('click', function(){}, false)
  DOM3 element.addEventListener('keyup', function(){}, false)
  
  B DOM事件模型
  捕获从外向里，冒泡从内向外
  
  C DOM事件流
  捕获阶段、目标阶段、冒泡阶段
  
  D 描述DOM事件捕获的具体流程
  window-document-html(document.documentElement)-body-...-destination
  
  E Event对象的常见应用
  event.preventDefault()//组织默认行为
  event.stopPropagation()//阻止冒泡,子父激发相关
  event.stopImmediatePropagation()//事件响应优先级
  event.currentTarget//父级元素（事件代理，事件委托，把子元素的事件都委托到父元素上，减少绑定次数）
  event.target//点击的元素
  
  F 自定义事件
  var eve = new Event('custom');
  eve.addEventListener('custom',function(){
    console.log('custom');
  });
  eve.dispatchEvent(eve);//触发事件
  
  Event和CustomEvent都可以自定义事件，但或者可以加参数
  
4. 类型装换

  Boolean，Null，Undefined，Number，String，Symbol（ES6），Object
  
  A 显式类型转换 Number，String，Boolean
  Number函数的输入：为字符串，如果不能解析为字符，转换为NaN，空转换为0；undefined：NaN；null： 0
  输入Obj的话，先调用obj.valueOf(), 再调用obj.toString()//"[object Object]"
  String的转换，比较简单，Boolean，undefined和null都转换为“XXX”
  输入obj的话，先调用obj.toString(), 再调用obj.valueOf()
  Boolean转换，undefined，null，-0，+0（0），NaN，''（空）,这几个转化为false，其他为true
  
  B 隐式类型转换
  四则运算
  判断语句
  Native调用（某些函数直接调用obj的toString函数等）
  
5. HTTP协议类

  HTTP协议的主要特点
  -简单快速，灵活，无连接，无状态
  -简单快速：每个资源的url是固定的，统一资源符；
  -灵活：通过一个HTTP协议能完成不同数据类型的传递
  -无连接: 连接一次会断掉，不会保持连接
  -无状态：客户端和服务端是两种身份，下次连接时客户端无法区分服务端的身份
  
  HTTP报文的组成部分
  请求报文：请求行+请求头+空行+请求体
  响应报文：状态行+响应头+空行+响应体
  
  HTTP方法
  GET获取资源 POST传输资源 PUT更新资源 DELETE删除资源 HEAD获得报文首部
  
  **POST和GET的区别**（说出3-4个点即可）说出1,3,5,6,9点即可
  
  HTTP状态码
  1xx：指示信息-已接受，继续处理
  2xx：成功-请求已被正常接收
  3xx：重定向-要完成请求必须进行更进一步的操作
  4xx：客户端错误-请求有语法错误或请求无法实现
  5xx：服务器错误-服务区未能实现合法的请求
  
  200 OK 客户端请求成功
  206 Partial Content 客户发送了一个带有Range头的GET请求，服务器完成了它
  用audio和video访问，文件大的时候会返回206
  301 
  
  什么是持久连接？
  当使用Keep-Alive模式时，Keep-Alive功能使客户端到服务器端的连接持续有效，当出现对服务器的后续请求时，Keep-Alive功能避免了建立和重新建立连接(HTTP1.1才有)
  
  什么是管线化？（简单工作原理：把请求打包回来）
  回答1,2,3,4即可
  
  当使用Keep-Alive模式时发生的


JS一些点：
----------------

1. 类型判断

typeof 关键字测试基本类型和function，null会失效(="object")

toString 方法对一些obj使用，检测内置对象和基元类型，null和undefined失效
形式为：Object.prototype.toString.apply(obj) 或者直接 x.toString()---null不行

isInstanceOf 适用于自定义对象

2. 错误检测和基本错误类型

try{throw "error";}
catch(er){}
finally{}

多层错误检测顺序：抛出的错误要有接收的catch，接到后不会继续抛，如果错误抛到外层，finally会被首先执行

基本错误类型：
SymtaxError
ReferenceError(引用了不存在的值)
RangeError(引用了超范围的值)
TypeError(方法不存在)
URLError(无法解析)
EvalError(eval表达式错误)

3. for...in... 循环，会循环enumerable不为false的属性，会遍历原型链
  x in y 可以检测x是否是y的属性
  
4. "use strict"
  I. 不允许使用"with"语句；
  II. 不允许未声明的变量被赋值;
  III. arguments变为参数的静态副本，但修改属性会生效;
  IV. delete参数和函数名会报错
  V. delete不可配置的属性报错
  VI. 对象重复属性名错误
  VII. 禁止八进制字面值
  VIII. eval, arguments 变为关键字
  IX. eval有独立作用域；
  
5. Object.getOwnPropertyDescriptor({pro: true;}, 'pro')
  // Object{value: true, writable: true, enumerable: true, configurable: true;}
  可写，可枚举，可配置(删除)
  Object.defineProperty(obj, 'pro', {value: 100, configurable: false;})
  此外，还有get和set方法，但是会与原型链产生冲突
  Object.isExtensible(obj)查看是否可扩展
  Object.preventExtensions(obj)禁止元素扩展
  
6. 序列化
  JSON.stringify(obj)
  {x:1, y:true, z:undefined, w:null, n:NaN} --- {"x":1, "y":true, "w":null, "n":null}
  会忽略值为undefined的值，值为null和NaN的值均变成null
  
7. 数组
  稀疏数组：var arr = new Array(100), 会创建一个有100个空位的数组，arr.length == 100，索引不从0开始
  [] == Array.prototype
  方法：
  fill || 把所有元素都变为参数的值
  join || var arr=[1,2,3]; arr.join() // '1,2,3'; arr.join('-') // '1-2-3'
  reverse || 逆序，会改变数组
  sort || 排序，默认按照字母顺序，会发生奇怪的现象
  concat || 合并，原组未被修改
  slice || 返回部分（左闭右开区间）
  splice || 数组拼接，会修改原组 var arr = [1,2,3,4,5]; arr.splice(1,3,'a','b') // 返回[2,3,4], arr的值变为[1,'a','b',5]
  tostring || '1,2,3'
  ~~~~~ES5新增的操作~~~~~
  arr.forEach(function(x, index, arr){})
  
  arr.map(function(x){return x+2;}) // 映射：一对一操作
  arr.reduce(function(x,y){return x+y;}) // 逐步减少，二对二操作
  arr.filter() // 过滤器，滤出符合条件的目标
  arr.indexOf(x) or arr.indexOf(x, n) // 寻找x的位置，n制定了开始位置，可以为负值
  Array.isArray(arr)
  
  数组与一般对象的区别：
  I. Array有length属性，会自动更新；
  II. 按照索引访问属性更加快捷；
  III. Array.prototype上有大量的方法可以快速调用。
  
  数组与字符串：
  字符串是类数组，但不可改写，可以有：
  var s = 'abs'; Array.prototype.join.call(s, '-') // 'a-b-s'

Ajax相关
---------------

Ajax: 在同步处理的环境下出现的 请求-处理-响应-页面载入
XMLHttpRequest对象的出现，可以进行异步操作，用于后台和服务器交换数据，对网页进行部分更新

-- 运用HTML和CSS实现页面，表达信息；
-- 运用XMLHttpRequest和web服务器进行数据的异步交换；
-- 运用Js操作DOM，实现动态局部刷新；

var request = new XMLHttpRequest();

HTTP: 计算机通信规则，是一种无状态协议(简单快速，无连接，无状态)

七个步骤：
1. 建立TCP连接
2. Web浏览器向Web服务器发送请求命令；
3. Web浏览器发送请求头信息；
4. Web服务器应答；
5. Web服务器发送应答头信息；
6. Web服务器向浏览器发送数据；
7. Web服务器关闭TCP连接。

HTTP请求组成：
1. 动作 GET POST PUT DELETE HEAD
GET幂等 == 执行1次和执行1W次是一样的
2. URL（1和2在一行）
3. 请求头
空行（表示请求头结束）
4. 请求体

HTTP响应的组成：
1. 数字和文字组成的状态码
2. 响应头，有一些服务器信息，日期，请求类型等
空行
3. 响应体

XMLHttpRequest方法
request.open(method, url, async)
method不区分大小写，url请求地址，可使用相对地址，async同步false/异步true，默认true
request.setRequestHeader("Content-type", "...") 改变请求头信息
request.send(string)

获得响应：
responseText 获得字符串形式的相应数据
responseXML 获得XML形式的相应数据
status & statusText 以数字和文本形式返回HTTP状态码
getAllResponseHeader 获取所有的响应报头
getResponseHeader 查询响应中的某个字段的值

readyState属性
0：请求为初始化，open未调用
1：服务器连接已建立，open已经调用了
2：请求已接收，也就是接收到了头信息
3：请求处理中，也就是接收到响应主体了
4：请求已完成，且响应已就绪，也就是响应完成了
request.onreadystatechange = function(){
  if(request.readyState === 4 && request.status === 200){
    
  }
};


PHP 创建动态交互性站点的服务器端脚本语言
开源，免费 BLOG，facebook，入门简单，应用广泛
XAMMP软件包

document.getElementById("search").onclick = function(){
  var request = new XMLHttpRequest();
  request.open("GET", "service.php?number="+document.getElementById("bt").value);
  request.send();
  request.onreadystatechange = function(){
    if(request.readyState === 4){
      if(request.status === 200){
        document.getElementById("dd").innerHTML = request.responseText;
      }else{
        alert("error: "+request.status);
      }
    }
  }
}

$(document).ready(function(){
  $('search').click(function(){
    $.ajax({
      type: "GET", 
      url: "service.php?number=" + $("#bt").val(),
      dataType: "json",
      success: function(data){
        if(data.success){...},
        else{...}
      },
      error: function(jqXHR){
        alert("error: "+jqXHR.status);
      }
    })
  });
});

document.getElementById("save").onclick = function(){
  var request = new XMLHttpRequest();
  request.open("POST", "service.php");
  var data = ...
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  request.send(data);
  request.onreadystatechange = function(){
    if(request.readyState === 4){
      if(request.status === 200){
        var data = JSON.parse(request.responseText);
        if(data.success){
          document.getElementById("searchResult").innerHTML = data.msg;
        }else{
          document.getElementById("searchResult").innerHTML = "Error:" + data.msg;
        }
      }else{
        alert("error: "+request.status)
      }
    }
  }
}

$(document).ready(function(){
  $("#save").click(function(){
    $.ajax({
    type: "POST",
    url: "service.php",
    dataType: "json",
    data:{
      name: "xiaoming",
      age: 16,
      go: true,
    },
    success: function(data){
      if(data.success){...}
      else(...)
    },
    error: function(jqXHR){
      
    }
  })
  })
  
})

JSON: Javascript Object Notation 是一种语法，类似XML，用键值对的方法组织，易于解析和阅读
JSON是独立于语言的，也不管什么语言，都有规则解析JSON

JSON的长度比xml短小很多
JSON的读写速度更快
JSON可以使用Js内建的方法进行解析

JSON的键要用""包裹
JSON的值是下列类型：
数字，字符串，逻辑值，数组[]，对象{}，null, JSON的值对中不能有func存在

jsonlint.com可以校验json字符串中的语法错误(JSONLint是一个非常好的校验工具)

用JQuery实现Ajax $.ajax({}) 包含有方法

----------------------

跨域：
一个域名地址的组成：
http://www.abc.com:8080/script/jquery.js
协议  子域名 主域名 端口   请求资源地址
(子域名，主域名，端口有一个不一样则为跨域请求)
javascript出于安全考虑禁止调用其他页面的对象

处理跨域的方法一---代理
前端A--后端A--后端B--后端A--前端A(实现A-B通信)

方法二---JSONP---只能应用于GET请求
JSON可以用于解决主流浏览器的跨域数据访问问题

方法三---XHR2
HTML5的XMLHttpRequest Level2可以提供这些功能
IE10以下都不支持

在服务端改造即可：
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");

H5新特征相关
---------------

1. 新增的结构元素

    -- section 表示页面中的一个内容区块，比如章节、页眉、页脚或页面中的其他部分。它可以与h1, h2, h3, h4, h5, h6等元素结合使用，标示文档结构
    -- article 标示页面中的一块玉上下文不相关的独立内容，譬如博客中的一篇文章或报纸中的一篇文章。
    -- aside 元素表示article元素的内容之外的，与article元素内容相关的辅助信息。
    -- header 元素表示页面中的一个内容区块或整个页面的标题
    -- hgroup 元素用于对整个页面或页面中第一个内容区块的标题进行组合。
    -- footer 元素用于表示整个页面或页面中第一个内容区块的脚注。
    -- nav 元素表示页面的导航链接部分
    -- figure 元素表示一段独立的流内容，一般表示文档主体流内容中的一个独立单元。使用figurecaption元素为figure元素组添加标题。

2. 新增的其他元素

    -- video, audio, embed(插入多种多媒体:Midi, Wav, MP3等),source(为媒介元素定义资源), canvas
    -- mark 突出需要高亮显示的内容 progress(<meter></meter>)比较耗时的函数进程 detail+summary 用户可以得到的细节信息，例如点击标题出现的细节提示。
    -- ruby+rb+rp 中文注音相关 
    -- datalist, datagrid 表示可选数据列表，grid用树形列表显示 menu 菜单 command 命令按钮，如按钮，单选框，复选框等
    -- time 时间 wbr 软换行，父级元素装不下时才换行 kegen 生成密匙 output脚本输出

3. 新增的input元素

    -- email, url, number, range(必须输入指定范围内的数值), Data Picker(输入时间和日期) 

4. 废除的

    frame, frameset, noframes均已废除，iframe仍可使用。

-------------------------------------------------------

    1. 表单新增属性
    -- autofocus 使input type=text, select, textarea, button的元素获得焦点
    -- placeholder 使text, textarea元素提示输入信息
    -- required 使text, textarea在提交时进行检查，输入内一定要有某些属性
    -- autocomplete, min, max, multiple, pattern, step
    -- formaction, formmethod, formtarget, formenctype, formnovalidate改变form的相应属性。
    2. 其他
    -- reversed 使ol列表倒序显示
    -- type, label 定义menu的显示形式和标签
    -- async 使script代码异步执行
    -- the others

    <input type="text" name="greeting" list="greetings" />
    <datalist id="greetings" style="display: none;">
      <option value="Good Morning">Good Morning</option>
      <option value="Hello">Hello</option>
      <option value="Good Night">Good Night</option>
    </datalist>
    datalist也是新增元素

    3. 删除的属性
    可以用css样式描述的删除了很多

-------------------------------------------------------
HTML5全局属性

    1. contentEditable true/false, 表明元素是否可以编辑，只对能获得焦点的元素生效
    2. designMode on/off, 设为on时页面中所有具有contentEditable的元素全部可编辑
    3. hidden true/false 显示/隐藏
    4. spellcheck true/false
    5. tabindex 一般页面只有<a>和<form>会获得焦点，但定义tabindex的元素也能获得焦点，设为-1不获得
-------------------------------------------------------

input元素一览代码：

    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>简单表单实例</title>
    </head>
    <body>
      <form name="form1">
        <label for=username>Name</label>
        <input name=username id=username type=text required /><br />
        <label for=age>Age</label>
        <input name=age id=age type=number min=0 max=100 /><br />
        <label for=birthday>Birthday</label>
        <input name=birthday id=birthday type=date /><br />
        <label for=email>Email</label>
        <input name=email id=email type=email required /><br />
        <label for=url>Main page</label>
        <input name=url id=url type=url /><br />
        <label for=memo>Memo</label>
        <textarea name=memo id=memo required /><br />
        <input type=submit />
      </form>
    </body>
    </html>
-------------------------------------------------------

    output元素只能从属于某个表单，注意output元素是有关闭标签的。其基本使用如下：
    <input name=range1 type=range min=0 max=100 value=30 step=5 />
    <output onforminput="value=range1.value">30</output>
-------------------------------------------------------

表单验证功能

    -- required 此字段必须不能为空，提交则提示用户此信息必须填写
    -- pattern 要求输入内容符合一定的格式，值为一个正则表达式的字符串形式，如
    <input type=text required pattern="[0-9][A-Z]{3}" />提示用户输入一个数字和三个大写字母的组合
    -- min & max 属性，规定最大和最小值，结合step属性控制调幅

显式验证
-- form, input, select, textarea等元素都有checkValidity方法(此方法并未得以应用)，在js中调用该方法，可以显式验证字段

取消验证
若一个表单很长很大，希望分步保存，可以临时取消验证
-- form有novalidate属性，可以关闭整个表单的验证
-- input, submit等元素有formnovalidate属性，可使单个元素验证失效

自定义错误信息
input元素有setCustomValidity方法自定义错误信息(此方法并未得以应用)

    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>简单表单实例</title>
      <script type="text/javascript>
        var pass1 = document.getElementById("pass1");
        var pass2 = document.getElementById("pass2");
        if(pass2.value !== pass1.value){
          pass2.setCustomValidity("两次密码不一致，请重新键入");
        }
        var email = document.getElementById("email");
        if(!email.cheakValidity()){
          alert("请输入邮箱地址");
        }
      </script>
    </head>
    <body>
      <form name="form1" onsubmit="check()">
        <label for="pass1">Password:</label>
        <input type="password" id="pass1" /><br />
        <label for="pass2">Password again:</label>
        <input type="password" id="pass2" /><br />
        <label for="email">Email</label>
        <input type="email" id="email" name="email" />
      </form>
    </body>
    </html>
-------------------------------------------------------

-- figure和figcaption

    表示一种元素组合，figure元素表示网页上一块独立内容，将其从网页上移除也没有影响，一般内容是图片、音视频插件、统计图或代码示例等。1个figure元素只允许放置一个figcaption
    -- details
    局部伸缩，与summary配合使用，只有Chrome支持
    -- mark
    用于表示高亮显示的文本、引用原文时标注重点内容
    mark: 最主要目的是吸引读者注意，或者内容作为参考
    strong, em: strong是强调一段文字的重要性，如警告信息，错误信息等；em是为突出文章重点而使用的。
-- progress

    表示进度
    有value和max属性，value需要大于0，且小于等于max。语义化标签，配合js使用。
    <progress><span>0</span>%</progress> 表示百分比的语义化标签。
    -- meter
    <p>磁盘使用量：<meter value=40 min=0 max=160>40/160</meter>GB</p>
    <p><meter value=91 min=0 max=100 low=40 high=90 optimum=100>A+</meter></p>
    <meter>80%</meter>
    <meter>3/4</meter>
    -- ol
    增加start和reversed属性
    dl, dt, dd, dfn
    用于表示术语定义
    -- cite
    表示作品的标题，不用于其他
    -- small
    表示免责声明，法律规定，注意事项等，不用于其他
-------------------------------------------------------

-- <input type="file" />

    元素可以添加multiple属性，一次上传多个文件
    docuement.getElementById("file").files获取filelist对象
    file对象有name和lastModifiedDate属性
    文件Blob对象有size和type(文件类型)属性
    图片的type属性以"image/"开头，可以使用js检查上传的是否为图片文件
    accept属性：传入一个正则字符串，表明可以输入的文件type
-- FileReader接口

    读取方法：
    readAsBinaryString(file)
    readAsText(file,[encoding])
    readAsDataURL(file) 将小文件以一种特殊方式读入页面
    abort() 中断读取
    事件：
    onabort, onerror, onloadstart, onprogress, onload, onloadend(读取完成触发，不论成功与否)
--------------------------------------------------------
    <script>
      var result = document.getElementById("result");
      var file = document.getElementById("file");
      var thisfile = file.files[0];
      if(typeof FileReader == undefined){
        result.innerHTML = "你的浏览器不支持FileReader";
      }
      function readAsDataURL(){
        if(!/image\/\w+/.test(thisfile.type)){
          alert("请确保文件为图像类型");
          return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
          result.innerHTML = '<img src="'+ this.result +'" alt="" />';
        }
      }
      function readAsText(){
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(e){
          result.innerHTML = this.result;
        }
      }
      function readAsBinaryString(){
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function(e){
          result.innerHTML = this.result;
        }
      }
    </script>
    <p>
      <label>请选择一个文件:</label>
      <input type="file" id="file" />
      <input type="button" value="读取图像" onclick="readAsDataURL()" />
      <input type="button" value="读取二进制文件" onclick="readAsBinaryString()" />
      <input type="button" value="读取文本文件" onclick="readAsText()" />
    </p>
    <div id="result">
      <!-- 这里用以显示读取结果 -->
    </div>
--------------------------------------------------------
拖拽的原生API

    被拖动的源对象：ondragstart, ondrag, ondragend
    被进入上方的目标：ondragenter, ondragover, ondragleave(离开某对象), ondrop(释放，松手)
    事件数据传递：e.dataTransfer{} //数据传递对象
    保存：e.dataTransfer.setData(k, v); 读取：e.dataTransfer.getData(k);

    注意点：ondragover的默认行为会组织ondrop发生，故应先使用e.preventDefault()阻止默认行为
--------------------------------------------------------
Web Storage

    是什么？可以再客户端本地保存数据的功能。
    H4中的Cookie有如下限制：
    1. cookie大小被限制在4kb之内；
    2. cookie是随着http发送的，因此浪费了一部分带宽；
    3. cookie的操纵是很困难的。

    sessonStorage和localStorage
    sessonStorage可以存储浏览网页时保存的数据，关闭页面后消失，localStorage则可以存储在本地
    保存：sessonStorage.setItem(key, value);
    读取: v = sessonStorage.getItem(key);
    它们都是Storage对象，此对象会绑定一个length属性表示其尺寸，显式设置length属性不起作用不报错。

    **本地数据库SQLite, IndexDB**不支持
    创建一个访问数据库的对象：
    var db = openDatabase('mydb', '1.0', 'Test DB', 2*1024*1024);
    传入数据库名，版本号，数据库描述，大小，若不存在则创建数据库
    访问时需要调用transaction方法，用于事务处理，避免被同时访问
--------------------------------------------------------



