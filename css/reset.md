# html-css
================

构造一个project:
----------------

		-> 做好reset工作,以及制作之前的分配工作:大致的布局、样式和字体信息这些
		
		-> 写出大致的css轮廓(以下元素需要设置: body, a及其各项伪元素,包含内容的块框,img等元素)
		
		-> header部分的制作: 1. 版顶nav 2. 标题logo和副标题 3. 搜索框
		
		-> main部分: 1. 图片交替部分 2. 主要的花絮介绍 3. 两则视频链接 4. 链接显示区 *5. 地图

		-> secondary部分: 

一些笔记:
----------------

		-> 先做好整体规划，哪里要做什么，用什么容器实现
		-> 各种容器的名字都有各自的用法，不要只是重复的使用毫无意义的div，然后加上不可重用的id
		-> 制作前的reset和全局属性之类的工作一定要做好，这样能够更快速更高效的完成任务
		-> 元素种类可以大致分为容器类型和内容类型，每种类型需要的样式设置格式不同
		-> 作为一般的内容类型的元素，可以依照一个固定的顺序来思考css编写时出现的次序：
		1. 定位属性，position， float， display， 再加上作为盒子模型的各项属性
		2. 字体属性，font类型，text类型
		3. 背景属性，background （使用URL、颜色等）
		-> 作为容器元素一般的考虑：
		1. 浮动+margin
		2. background
		3. font-size/line-height之类可以继承的属性
		-> 对于图片的定位问题：
		1. 若是需要在两个方向均有偏差值，可以将容器元素的position: relative，padding-left: xxx 然后img元素可以设置positioin: absolute，则img元素的相对位置为容器元素的padding及content区域
		2. 若是图片只是在水平有所偏差，可以设置display: inline, vertical-align: -xpx; 即可将图片偏离几个像素。
		-> display: inline-block 会出现几个像素的间距，这是由html元素见的空格造成的，可以用负值的margin或者设置font-size, letter-spacing等方式实现
		-> 不要害怕使用float之类的元素，同行的使用不必担心，不同行的使用之前先clear: both;即可，有的元素甚至可以{display: block; clear: both;}
		
