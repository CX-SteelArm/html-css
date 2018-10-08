// !function (f) {
//   if ('object' == typeof exports) {
//     module.exports = f();
//   } else if ('function' == typeof define && define.amd) {
//     define(f);
//   } else if (window != 'undefined') {
//     window.MyPromise = f();
//   }
// }(function () {
// return 
  function MyPromise(resolver) {
    var queue = [];
    resolver(resolve, reject);

    function next(i, val) {
      setTimeout(function() {
        while (queue.length) {
          var arr = queue.shift();
          if (typeof arr[i] == 'function') {
            try {
              var chain = arr[i](val);
            } catch (e) {
              return reject(e);
            }
            if (chain && typeof chain.then === 'function') {
              return chain.then(resolve, reject);
            } else {
              return MyPromise.resolved(chain).then(resolve, reject);
            }
          }
        }
      })
    }

    function resolve(x) {
      next(0, x);
    }

    function reject(x) {
      next(1, x);
    }

    this.chain = this.then = function(res, rej) {
      queue.push([res, rej]);
      return this;
    }

    this.catch = function(reject) {
      return this.then(undefined, reject);
    }
  }

  MyPromise.resolved = function (x) {
    return new MyPromise(function (resolve) {
      resolve(x);
    })
  }

  MyPromise.reject = function(reason) {
    return new MyPromise(function (resolve, reject) {
      reject(reason);
    })
  }

  
// 

  var mp = new MyPromise(function(a,b) {
    a(3);
  }).then(/*function () {
    return new Promise(function (a, b) { a(5) }).then(console.log)
  }*/function() {return 5;}).then(console.log)