
### Install

    gem install sass
    gem install compass

    compass create learn-compass-init
    sass目录下有ie.scss print.scss srceen.scss

### sass

    sass-convert main.scss main.sass // 语法不同而已
    compass create learn-sass-syntax
    compass watch // 观察

- 声明变量 `$main-sec-ff: Arial, Verdana, sans-serif;`
- 引入文件 `@import "variables";` // 宿主文件
- css原生的import只能放在顶部，而且会造成阻塞 
- @import "compass/reset" // 重置样式
- 局部文件：不会编译出对应的css文件，名字以_开头
- 注释： //不显示在css中
- 父元素代替： &:hover { } 

- 变量操作：函数/变量表达式
- 内置函数functions, 可重用代码块mixin
- @mixin定义，@include调用 @extend继承
- >= <= > < == != ()求值表达式
- http://cdc.tencent.com/?p=3760 
- sass会把`color: hsl(270, 100%, 50%)`转化成#颜色
- http://sass-lang.com/documentation/Sass/Script/Function.html

mixins使用表示特征的名字，class使用表示文档关系的名字

    @mixin col-6 ($width: 50%默认参数) {
      width: $width;
      float: left;
    }
    
    .webdemo-sec {
      @include col-6();
    }

    .serious-error {
      @extend .error;
      border: 1px #f00;
    }

动手实验：

  1. @extend继承多个选择器
  2. 连续继承

extend不能继承选择器序列
使用%，用来构建只用来继承的选择器

使用media-query

    @mixin col ($width: 50%) {
      @media (min-width: 768px) {
        width: $width;
        float: left;
      }
    }

将结构中的元素放到根上

    .main-sec {
      @at-root {
        .main-sec-headline {

        }

        .main-sec-detail {

        }
      }
    }

控制输入

    @mixin col-sm ($width: 50%) {
      @if type-of($width) != number {
        @error "$width必须是一个数值类型，你输入的width是：#{$width}.";
      }

      @if not unitless($width) {
        @if unit($width) != "%" {
          @error "$width必须是一个百分值，你输入的width是：#{$width}."
        }
      } @else {
        @warn "$width必须是一个数值类型，你输入的width是：#{$width}."
        $width = (percentage($width) / 100);
      }
    }

其他属性

    each for while用得不多

四种输出样式：

    expended 手动书写类似
    nested 嵌套式缩进
    compact 当行模式
    compressed 压缩模式已占用最少空间

@include 和 @extend 的区别：

    - @include主要是用来调用@mixin定义的函数模块。在@mixin中可以定义一个相似功能样式，而且可以设置变量、定义参数和默认参数值；
    - @extend主要是用来调用.class或者%placeholders定义的属性模块；在.class或者%placeholders中可以定义一个相同样式，但这里面不能定义参数；
    - @include每次调用相同的@mixin时，编译出来的CSS相同样式不会进行合并；
    - @extend每次调用相同的 .class时，如果.class在样式出现多次，那么编译出来的CSS有可能不是您需要的样式；
    - @extend每次调用相同的%placeholders时，编译出来的CSS相同样式会进行合并。

使用Mixins和继承的细节

    - 不要使用没有设置参数的@mixin，他们应该是.class或者%placeholders;
    - 不要轻意（从不使用）@extend调用.class。会得到你意想不到的结果，特别是定义的.class出现在嵌套或其他的样式表中，你应该使用@extend调用%placeholders;
    - 不要使用太深的选择器嵌套。
    - 如果你能避免，不要使用标签名。这不是一个taxative规则，但比id或者类名的性能要更低；
    - 不要使用子选择器符号>，在SASS中很无效；
    - 不要使用同史选择器+，配合你当前的标记他是非常无效。
    - 不要太相信SASS的自动编译，你应该时时检查生成的CSS。在SASS中纠错能力比较差；



