CSS记录
======================

注意事项
-------------

		-> css3属性的支持有的采用-浏览器-样式名的形式,具体使用以W3C手册为参考

背景属性
-------------

		-> (css3)background-clip 有三个值(border-box, padding-box, content-box, 默认是border-box, 即背景影响了content+padding+contend部分的内容)
		-> (css3)background-origin 背景图像相对于谁定位，也有上面那三个属性
		-> (css3)background-size 可以用length, 百分比, cover和contain赋值
		
边框属性
-------------

		-> (css2)outline 在border之外的边框, IE8以上才支持
		-> (css3)border-image
		-> (css3)border-radius
		-> (css3)box-shadow
		
内容生成
-------------

		-> (css2)content 属性与 :before 及 :after 伪元素配合使用，来插入生成内容 如h1:after: ... 一般生成行内元素，但可以通过display属性更改其值
		-> (css2)counter-increment 属性和counter-reset属性联合使用,实现标号的自动化
		-> (css2)quotos 属性,设置引用的格式
		
多列属性
-------------

		-> (css3)column-count, column-width, column-gap, column-rule 分别表示列的数目, 宽度, 间隔, 分割线的样式
	
-------------
定位属性

		-> (css2)clip 用于剪切绝对定位元素, 值为 rect (top, right, bottom, left), auto, inherit
		-> (css2)cursor 光标显示 可以赋值为url(./image/cur.png)等自定义光标
		-> (css1)display 属性规定元素应该生成的框的类型(inline-block 行内块元素,CSS2.1 新增的值)
		-> (css1)float 浮动元素会生成一个块级框，而不论它本身是何种元素
		-> (css2)visibility 即使不可见的元素也会占据页面上的空间。请使用"display"属性来创建不占据页面空间的不可见元素
		
-------------
表格属性

		-> border-collapse 可选择separate(default)和collapse(折叠)
		-> caption-side 可选top和bottom
		
文本属性
-------------

		-> (css2)direction 可选择rtl, ltr, inherit值, 表示文本方向
		-> (css1)letter-spacing 字符间距
		-> (css1)line-height 该属性会影响行框的布局。在应用到一个块级元素时，它定义了该元素中基线之间的最小距离而不是最大距离。line-height 与 font-size 的计算值之差（在 CSS 中成为“行间距”）分为两半，分别加到一个文本行内容的顶部和底部。可以包含这些内容的最小框就是行框。值: normal, number(字体的倍数), length, %(字体的百分比), inherit
		-> (css1)text-align 可选center, right, left, justify(两端对齐)等值
		-> (css1)text-decoration 设置各种装饰的线条
		-> (css1)text-indent 首行缩进
		-> (css1)text-transform 可选none, capitalize(每个单词均以大写字母开头), uppercase(仅大写), lowercase(仅小写), inherit等值
		-> (css1)white-space 如何控制空白字符, pre则保留换行符，相当于<pre>
		-> (css1)word-spacing 单词间距
		-> (css3)text-overflow 文本溢出包含元素时发生的事, 值为clip, ellipsis(省略号), inherit.
		-> (css3)text-shadow 酷炫的字体阴影(白色文本上的阴影2px 2px 4px #000000, 模糊效果2px 2px 8px #FF0000, 霓虹灯效果0 0 3px #FF0000)
		-> (css3)word-break 在恰当的位置进行换行 normal, break-all(允许在单词内换行), keep-all(只能在半角空格或连字符处换行)
		-> (css3)word-wrap 允许较长的单词和url换到下一行(可以和word-break连用实现连续效果)
		
过渡属性
-------------

		-> (css3)transition (include: transition-property; transition-duration; transition-timing-function; transition-delay;)一般设置在要发生变化的元素上,例如<a> a{width: 100px;} a:hover{width: 300px;}
		-> (css3)transition-timing-function 有linear, ease, ease-in, ease-out, ease-in-out, cubic-bezier(a, b, c, d)属性值
		
其他
-------------

		-> (css3)box-sizing (IE6盒模型border-box & W3C盒模型content-box)