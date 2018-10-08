## Web前端之路 的一些笔记

来自简书的[文章](https://www.jianshu.com/c/5769e7b7c708),总共有15篇，看完需要一些时间

### 第十四篇 ES6基本使用技法

```javascript
```

bind只能作用于一层，第二层进不去
```javascript
    var div = document.querySelector('div');
    function foo() {
      var bar = this.con;
      div.onclick = function() {
        console.log(this.con);
        return function() {
          console.log(this.con);
        }()
      }.bind(this);
    }
    var bar = {con: 3}
    foo.call(bar);
```

实现一个bind函数,有一些缺陷
```javascript
    Function.prototype.fakeBind = function(that) {
      var _this = this; // 调用bind的函数
      var arg = Array.prototype.slice.call(arguments, 1);
      return function() {
        return _this.apply(that, arg);
      }
    }
```

一些关于call、bind的实践
```javascript
    function kuu(a, b, c){
      console.log(a + b + c);
    }
    kuu.call(null, 1, 2, 3, 4); // 4被忽略

    c = kuu.bind(null, 1, 2, 3, 4);
    console.log(c);
    c();

    var l = [1,2,3];
    console.log(Math.max.apply(null, l));
    console.log(Math.max(...l));
    [...l];
```

关于ES6的其他实践
```javascript

    // 箭头函数不要用this，另外箭头函数不能使用arguments
    const person = {
      name: 'tom',
      getName: () => console.log(this)
    }
    person.getName();

    person.com = () => console.log(this);

    person.com();

    // 模板字符串
    const str1 = "Hello";
    const str2 = "World";
    console.log(`${str1} + ${str2} = ${str1} ${str2}`);

    // 对象解构
    var qq = {
      name: "QAQ",
      number: 9999999,
      level: 89,
      date: "1999.01.03"
    }
    const { level = 0, date, gender = "male" } = qq;
    console.log(level, date, gender);

    // ES6函数参数默认值
    function add(x = 20, y = 30) {
      return x + y;
    }
    console.log(add());

    // 展开运算符
    const props = {
      size: 1,
      src: 'xxxx',
      mode: 'si'
    };
    const { size, ...others } = props;
    console.log(size, others); // 1 Object { src: "xxxx", mode: "si" }
    console.log({size}, {others}); // Object { size: 1 } Object { others: {…} } 这个{ }相当于包裹为对象的运算符
    console.log({...size}, {...others}); // Object {  } Object { src: "xxxx", mode: "si" }
    console.log(others === {...others}) // 相当于复制了一份
    // 报错 console.log(...others);

    const myfun1 = (a, b, ...more) => {
      console.log(more);
      console.log(...more);
    }
    myfun1(1, 0, 3, -1, 9, 4);
    myfun1(1, 0, {a: 1}, {b: 3});

    // 动态属性和方法
    const name = 'Jane';
    const age = 20

    const personn = {
      [name]: true,
      [age]: true
    }
    console.log(personn);
```

### 第九篇 面向对象类

New函数，模拟生成对象的new

    function New(func) {
      var res = {};
      if (func.prototype) {
        res.__proto__ = func.prototype;
      }
      // 传入res, 实现this.x = y;这种的赋值
      var ret = func.apply(res, Array.prototype.slice.call(arguments, 1));
      if ((typeof ret === 'object' || typeof ret === 'function') && object) {
        return ret; // 如果构造函数return一个obj或func
      } else {
        return res; // 否则返回res
      }
    }

继承的重点：Parent.call(this, a, b); & Child.prototype = new Parent(x, y);
Object.create的实现

    function create(proto, options) {
      var res = {};
      res.__proto__ = proto;
      // 注意这个，defineProperties中options中类似{name: {value: 'Jack', configurable: false}, age: {get: func, writable: true}}
      // 这里的options可能只是 {name: value1, age: value2} 之类的，也可以
      Object.defineProperties(res, options);
      return res;
    }

defineProperty & defineProperties

    Object.defineProperty(obj, 'attr', {
      value: 'xx',
      configurable: false,
      writable: true,
      enumberable: true,
      get: function() { },
      set: function(val) { },
    })

    Object.defineProperties(obj, {
      name: {value: "", configurable: true},
      age: {get: func, writable: true},
      ...
    })

### 第十篇 封装拖拽

合理地处置属性和方法的位置

    对于属性放置于什么位置有的时候很难做出正确的判断，因此我很难给出一个准确的定义告诉你什么属性一定要放在什么位置，
    这需要在实际开发中不断的总结经验。但是总的来说，仍然要结合这三个位置的特性来做出最合适的判断。
    1 如果方法需要私有不被外界访问，那么就放置在模块作用域中。
    2 如果属性值只能被实例单独拥有，比如person对象的name，只能属于某一个person实例，又比如这里拖拽对象中，某一个元素
    的初始位置，也仅仅只是这个元素的当前位置，这个属性，则适合放在构造函数中。
    3 而如果一个属性仅仅供内部方法访问，这个属性就适合放在模块作用域中。

模块化的注意：

    ; // 在requireJs和ES6模块中不需要加这个
    (function(){
      ...
      *这里放置内部方法*

      function Drag(selector) {
        this.x = x;
        ...
        *这里放置单例属性*
      }

      selector.prototype = {
        getPostion: function() {
          &&88&&^^^^
        }
        ...
        *这里放置暴露出的公有方法或属性*
      }

      window.Drag = Drag; 
    }){}

注意bind的作用

    // 如果 function() { }.bind() 则会报错
    // 这样其实是"var self = this, 利用self报错this"的一种另类写法
    setDrag: function () {
      var start = function(e) {
          startX = e.pageX;
          startY = e.pageY;

          var pos = this.getTargetPos(this.elem);

          sourceX = pos.x;
          sourceY = pos.y;
          // 触发时再加入move和up事件handler
          this.elem.addEventListener('mousemove', move, false);
          this.elem.addEventListener('mouseup', end, false);
        }.bind(this)
      ...
    }

### 第十二篇 Jquery对象封装

  //通过扩展方法将拖拽扩展为jQuery的一个实例方法
    (function ($) { 
      $.fn.extend({
        becomeDrag: function () {
          new Drag(this[0]);
          return this; // 注意：为了保证jQuery所有的方法都能够链式访问，每一个方法的最后都需要返回this，即返回jQuery实例
        }
      })
    })(jQuery);

$.extend 和 $.fn.extend

    $.extend将方法放在构造函数中, 如$.ajax(), $.isFunction(), $.each()等
    $.fn.extend将方法放在原型上, 如$('#test').css(), $('#test').attr(), $('div').each() 等等

### 第十二篇 事件循环机制

JS事件单线程，多队列

    macro-task中有
      script (整理代码任务)
      setTimeout setInterval
      setInmediate (node)
    micro-task中有
      process.nextTick (node)
      .then (Promise)

浏览器执行顺序

    首先执行script，然后执行所有的micro-task
    然后在setTimeout出队，执行所有的micro-task
    然后在setTimeout出队，执行所有的micro-task
    ...

视为立即执行的 (script中执行)

    -- (func)() 立即执行函数
    -- Promise的第一个函数参数