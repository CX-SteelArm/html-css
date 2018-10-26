## webpack官方文档阅读笔记

### 起步

使用webpack

    使用webpack之前安装：
    > npm init -y
    > npm i --save-dev webpack webpack-cli

    源文件置于"/src"目录下,另加"/dist"目录作为输出文件的目录,入口js文件为"index.js",输出缺省为"main.js",这应该是webpack默认的配置

添加配置文件webpack.config.js

    // 配置文件使用的是commonJS规范
    const path = require('path');
    module.exports = {
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        }
    }

entry 和 output

    entry可以是一个字符串、一个数组或一个对象
    entry: ['./example1.js', './example1.js']
    官方比较推荐的写法：{别名:路径(js)?}
    entry: {
        'example1': './example1.js',
        'example2': './example2.js',
    }

    output一般是一个对象,包含filename和path
    占位符: [name], [hash], [chunkhash]
    例如: 
    entry: {
        'example1": './example1.js',
        'example2": './example2.js',
    },
    output: {
        filename: '[name]-[hash].js'
    }

    path: 输出路径,可以占位符,也可以使用path.resolve(__dirname)
    也可以结合entry的别名一起用:
    entry: {
        'example1': './src/example1.js',
        'hello/example2': './src/hello/example2.js',
    },
    output: {
        filename: '[name].js',
        path: './dist',
    }

    webpack使用46行的运行时代码加载所有的依赖模块(全部置于function中)

### 管理资源

webpack特征

    1. 像 webpack 这样的工具，将动态打包(dynamically bundle)所有依赖项（创建所谓的依赖图(dependency graph)）。这是极好的创举，因为现在每个模块都可以_明确表述它自身的依赖，我们将避免打包未使用的模块。
    2. webpack 最出色的功能之一就是，除了 JavaScript，还可以通过 loader 引入任何其他类型的文件。也就是说，以上列出的那些 JavaScript 的优点（例如显式依赖），同样可以用来构建网站或 web 应用程序中的所有非 JavaScript 内容。

loader

    webpack其实只能处理js文件，对于其他文件只有先经过处理，再require进来。从本质上，loader也是插件，但是webpack提供了plugin插件，二者仍是独立概念。

    loader用法：
    1. loader名字都是可以简写的， coffee-loader 和 coffee 是等价的， 这意味着 require('coffee!./a.coffee') 和 require('coffee-loader!./a.coffee'是等价的。
    2. 串联使用 require('style!css!./style.css'); 意思是将 style.css 文件内容先经过 css-loader 处理（ 路径处理、 import 处理等），然后经过style-loader 处理（ 包装成JS文件， 运行的时候直接将样式插入DOM中。
    3. 支持参数 require('coffee?literate=1!./a.coffee');
    4. 在webpack.config.js中使用loader
    尽可能使用 module.rules，因为这样可以减少源码中的代码量，并且可以在出错时，更快地调试和定位 loader 中的问题。 
    module: {
        rules: [
            {
                test: /.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /.(gif|ico|png)$/,
                use: 'file-loader'
            }
        ]
    }
    编译出的bundle中运行时部分仍然不变，但编译后的部分加入了loader的代码
    注意 use: ['css-loader', 'style-loader'] 会报错的，use中的loader存在顺序，由尾至头加载执行。

### 管理输出

plugin

    1. 插件是 webpack 的支柱功能。webpack 自身也是构建于你在 webpack 配置中用到的相同的插件系统之上！
    插件目的在于解决 loader 无法实现的其他事。
    2. 使用plugin:
    var HtmlWebpackPlugin = require('html-webpack-plugin');
    var CleanWebpackPlugin = require('clean-webpack-plugin');
    module.exports = {
        ...
        plugins: [
            new HtmlWebpackPlugin({
                title: 'output management'
            }),
            new CleanWebpackPlugin()
        ]
    }
    最后输出的bundle.js中不包含plugin的内容，可见其应该是编译的中间件，并不会像loader一样嵌入到打包后的文件中。

manifest

官方文档

    当编译器(compiler)开始执行、解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为 "Manifest"，当完成打包并发送到浏览器时，会在运行时通过 Manifest 来解析和加载模块。无论你选择哪种模块语法，那些 import 或 require 语句现在都已经转换为 __webpack_require__ 方法，此方法指向模块标识符(module identifier)。通过使用 manifest 中的数据，runtime 将能够查询模块标识符，检索出背后对应的模块。

理解

    Runtime对应于bundle.js的前46行，用来连接模块化应用程序中的代码
    Manifest的作用是解析打包后的文件，将模块标识符保存起来，供Runtime参考。

### 开发

sourcemap

    用于调试，提示和追踪错误
    引入方式:
    > webpack.config.js
    module.exports = {
        ...
        devtool: 'xxx',
        ...
    }
    注意:你可以直接使用 SourceMapDevToolPlugin/EvalSourceMapDevToolPlugin 来替代使用 devtool 选项，因为它有更多的选项。切勿同时使用 devtool 选项和 SourceMapDevToolPlugin/EvalSourceMapDevToolPlugin 插件。devtool 选项在内部添加过这些插件，所以你最终将应用两次插件。 

    devtool可选有一些选项，用于开发环境中：
    1. 环境
    原始源代码 ----- 转换过的代码 ----- 生成后的代码 ----- 打包后的代码
              loader                              bundle
     <源代码>  <例如使用babel转译后的> <模块彼此分离>    <视为彼此不分离>

    2. 开发环境选项
    'eval': 生成后的代码，构建快，不能映射源码行数
    'eval-source-map': 原始源代码，初次构建慢，更新快，可以生成行和列映射
    'cheap-eval-source-map': 转换过的代码，执行较快，可以生成行映射，忽略loader的source map
    'cheap-module-eval-source-map': 原始源代码，构建较快，生成行映射，包含loader的mapping

    3. 在生产环境中启用 source map，因为它们对调试源码(debug)和运行基准测试(benchmark tests)很有帮助。避免在生产中使用 inline-*** 和 eval-***，因为它们可以增加 bundle 大小，并降低整体性能。 

watch

    > webpack --watch 可以进入观察模式
    观察模式生成的index.html不会自动更新

webpack-dev-server

    > npm i -g webpack-dev-server
    > webpack-dev-server --open 在8080端口创建服务器，运行后会自动打开浏览器
    配置:
    module.exports = {
        ...
        devServer: {
            contentBase: './dist'
        }
        ...
    }

### 模块热替换

模块热替换(Hot Module Replacement 或 HMR)是 webpack 提供的最有用的功能之一。它允许在运行时更新各种模块，而无需进行完全刷新。
它的意义是如果工程很大，细微的更改就会导致重构整个project，这对于性能的消耗是不划算的，而webpack提供了局部更新方法，从而加快了这个过程。

webpack.config.js 需要的修改

    const webpack = require('webpack');
    module.exports = {
        ...
        devServer: {
            ...
            hot: true
        },
        plugins: [
            ...
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleRepalcementPlugin()
        ]
        ...
    }

index.js 的修改

    if (module.hot) {
        module.hot.accept('./print.js', function () {
            console.log('modify print.js');
            printMe();
        })
    }

存在的问题：若导入的方法绑定在DOM上，需先解绑dom方法，再重新绑定。

### Tree shaking

新的 webpack 4 正式版本，扩展了这个检测能力，通过 package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯的 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。
你可以将应用程序想象成一棵树。绿色表示实际用到的源码和 library，是树上活的树叶。灰色表示无用的代码，是秋天树上枯萎的树叶。为了除去死去的树叶，你必须摇动(shake)这棵树(tree)，使它们落下。

tree shaking

    > package.json
    "sideEffects": false
    生成的bundle.js总不包含未使用的模块
    Tree shaking会受到各种插件的影响

mode 

    mode = development/production(default)/none

uglify

    const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
    plugins: [
        ...
        new UglifyJSPlugin()
    ]

### 生产环境构建

配置

    可以将不同类的配置分开写,例如
    > webpack.common.js 包含entry, output, module, plugins
    > webpack.dev.js 包含开发环境的devtool, devServer
    > webpack.pord.js 包含生产环境的plugins
    相应的script配置中应加入 --config webpack.xxx.js

指定环境

    制定特定的环境
    > webpack.config.js
    const webpack = require('webpack');
    module.exports = {
        ...
        plugins: [
            ...
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development')
            }) 
        ]
    }

    > index.js
    ...
    if (process.env.NODE_ENV !== 'production') {
        // do something
    }

### 代码分离

代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。

入口起点

    设置多个entry和output以满足多对多的输出，但是存在模块重复问题，借助CommonChunksPlugin来分离和去重。
    注意：文档中的方法已失效。

动态导入

    使用ES2015规范定义的import()动态导入语法

    import('path/to/module') -> Promise

    动态地加载模块。调用 import() 之处，被作为分离的模块起点，意思是，被请求的模块和它引用的所有子模块，会分离到一个单独的 chunk 中。(import()特性依赖于内置的 Promise。如果想在低版本浏览器使用 import()，记得使用像 es6-promise 或者 promise-polyfill 这样 polyfill 库，来预先填充(shim) Promise 环境。)

    import 规范不允许控制模块的名称或其他属性，因为 "chunks" 只是 webpack 中的一个概念。幸运的是，webpack 中可以通过注释接收一些特殊的参数，而无须破坏规定：

    import(
        /* webpackChunkName: "my-chunk-name" */
        <!-- /* webpackMode: "lazy" */ -->
        'module'
    ).then(...)

    注意需要在output中加入类似 chunkFilename: '[name].chunk.js' 的配置
    使用ES2016 async/await 语法可以简化操作

bundle分析

### 懒加载

懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。

    将import()放在button.onclick = function (e) {
        import(/* webpackChunkName: "my-chunk-name" */ 'module').then(function () {
            <!-- do sth. -->
        })
    }

### Shimming

shim 是一个库(library)，它将一个新的 API 引入到一个旧的环境中，而且仅靠旧的环境中已有的手段实现。polyfill 就是一个用在浏览器 API 上的 shim。我们通常的做法是先检查当前浏览器是否支持某个 API，如果不支持的话就加载对应的 polyfill。然后新旧浏览器就都可以使用这个 API 了。

