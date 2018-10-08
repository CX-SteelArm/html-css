// commonjs规范的实践

function require (p) {
    var path = require.resolve(p);
    var mod = require.modules[path];
    if (!mod) {
        throw new Error('failed to require "' + p + '"');
    }
    // mod如果类似function (module, module.exports, require)型,则会执行以下代码
    if (!mod.exports) {
        mod.exports = {};

        mod.call(mod.exports, mod, mod.exports, require.relative(path));
    }
    return mod.exports;
}

// 模块池
require.modules = {};

// 从path中分三种情况解析出模块路径
require.resolve = function (path) {
    var orig = path;
    // 模块名字可以省略.js后缀
    var reg = path + '.js';
    // 模块可以是遵循commonjs定义的模块
    var index = path + '/index.js';
    // 如果按照'a.js'方式导入,则直接返回路径orig;如果按照'a'方式导入,如果是js文件则返回的是路径reg,而如果是类似nodejs中的模块,返回的是模块index.js的路径
    return require.modules[reg] && reg || require.modules[index] && index || orig;
}

// 注册模块
require.register = function (path, fn) {
    require.modules[path] = fn;
}

// 用于寻找相对路径的文件,例如在一个目录下的a.js引用b.js,就把a.js的路径作为parent参数传入,使用relative函数计算出b.js的路径.relative函数返回一个路径定制的函数,require函数*递归地*加载模块
require.relative = function (parent) {
    return function (p) {
        if ('.' != p.charAt(0)) {
            return require(p);
        }
        var path = parent.split('/');
        var segs = p.split('/');
        path.pop();

        for (var i = 0; i < segs.length; i++) {
            if ('..' == seg) {
                path.pop();
            } else if ('.' != seg) {
                path.push(seg);
            }
        }

        return require(path.join('/'));
    }
}
