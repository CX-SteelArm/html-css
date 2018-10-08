3.2 生命周期钩子函数

3.3

{{ name + "Lee" }}
v-text="name + 'Lee'"
v-html="name + 'Lee'"

结果一样，v-html会解析dom，v-text不会

3.4 计算属性 方法 侦听器

computed 是一个可以直接用的属性this.computed,会被缓存,不会多次计算
methods 是一个方法，需要调用
watch 是一个根据属性生成的函数: firstName: funcition(val){ }, firstName属性变化后会调用这个函数

3.5 getter/setter

computed: {
    fullName: {
        get: func
        set: func
    }
}

3.6 样式绑定

:class="{active: isActive}" //class的对象绑定

:class="[activated, activatedOne]" //由data数值控制

:style="styleObj" //styleObj为一个对象

:style="[styleObj, {fontSize: '20px'}]" //styleObj为一个对象

3.7 条件渲染

<div v-if="show">{{ message }}</div>
show为false，dom节点不存在
<div v-show="show">{{ message }}</div>
show为false，dom节点存在，display: none，性能较高

<div v-if="show === 1"></div>
<div v-if-else="show === 2"></div>
<div v-else></div>

<div v-if="show === 1">
    username: <input key="un"/>
</div>
<div v-else>
    password: <input key="pw"/>
</div>

如果不设置key，vue默认复用dom元素，已经输入的内容不会消除

3.8 循环渲染

遍历数组方法：
<div v-for="item in或者of items"></div>
<div v-for="(item, index) in或者of items"></div>

通过vm.list[4] = {name: "goddss"} 这类方法无法实现数据绑定

使用push pop unshift shift splice reverse sort方法可改变

使用 vm.list = [
    anotherList
] 重新绑定也可以

<template v-for="(item, index) of items">
    <div>{{item.name}}</div>
    <span>{{index}}</span>
</template>

template是一个占位符，不会被渲染

对象(Object)也可以使用循环渲染，(value, key, index)
向该对象中添加内容使用

Vue.set(vm.userInfo, "address", "adds")或者
vm.$set(vm.userInfo, "address", "adds")

数组也可以用set方法，第二个参数是下标

4. 组件

4.1 组件的使用细节

使用is属性解决包裹bug

子组件定义的data必须为一个函数
data: function(){
    return {content: "I am a content."}
} //为了让子组件拥有各自的不同内容

组件的ref和emit，见demo2

4.2 父子组件传值问题

子组件不能更改父组件中的值，要用新变量接收，
$emit的第二个及以后的参数可以被传入接收函数
见demo3

4.3 非props特性

```javascript
<div id="root">
    <child content="hell"></child>
</div>

Vue.component('child', {
    props: {
        content: {
            type: String,
            required: true,
            default: "default value",
            validator: function(value){
                    return (value.length > 5)
                }
            }
        }
    }
})
```

如果没有props属性，content="hell"会出现在渲染后的div的属性里，称为非props属性

4.4 给组件绑定原生事件

原生事件： 定义在methods: {} 中的事件
自定义触发事件： 由this.$emit() 触发的事件

父组件的属性中@click="xxx", xxx只能表示自定义触发事件
父组件的属性中@click.native="xxx", xxx表示原生事件

4.5 非父子组件传值

vuex可以解决这个问题，也可以使用发布-订阅模式(监听者模式)

```javascript
Vue.prototype.bus = new Vue()
methods: {
    clickMe: function(){
        this.bus.$emit("change", this.content)
    }
},
mounted: function(){
    this.bus.$on("change", msg => {
        this.content = msg
    })
}
```
具体见demo4

4.6 在Vue中使用插槽

插槽是指自定义组件中可以由父组件决定的部分

```javascript
<body-content>
    <div class="header" slot="header"></div>
    <div class="footer" slot="footer"></div>
</body-content>

Vue.component('body-content', {
    template:  `<div>
                    <slot name="header"></slot>
                    <div>content</div>
                    <slot name="footer"></slot>
                </div>`
})
```

4.7 Vue中的作用域插槽

适用于：我想显示4个h1标签，标签中的数据都存储在list中的情形
slot需要暴露一个接口":item='item'", 父组件需要一个template元素包裹slot元素，需要设置slot-scope=xx,然后使用xx.item调用

具体见demo5


4.8 动态组件和v-once

    <component :is="type"></component>

type = "child-one" or "child-two"，则component可以表示不同的dom元素
但是相互切换会消耗性能

    child-one: {
        template: "<div v-once>childOne</div>"
        ...
    } // 这种写法可以使得切换时child-one依然留存在内存中，减少toggle消耗


5.1 Vue动画

注意点：需要transition标签; transition有name属性时，动画类为.name-enter等，没有则为.v-enter等;
.name-enter, .name-enter-active, .name-enter-to分别作用于第一帧，之后帧，所有帧，leave一样
见demo6

5.2 关键帧动画

使用@keyframes写动画

使用animate.css库，不用重复造轮子

```javascript
<transition name="chi" 
    enter-active-class="animated swing"
    leave-active-class="animated shake"
>
```
5.3 关键帧 + 过渡 结合使用
 
第一次内容显示没有动画
appear && appear-active-class

结合使用两种动画效果(在末尾添加transition-class)

自定义动画时长(:duration)

```
<transition
    name="chi"
    :duration="{enter: 5000, leave: 10000}" 
    appear
    enter-active-class="animated swing chi-enter-active"
    leave-active-class="animated shake chi-leave-active"
    appear-active-class="animated swing"
>
```

5.4 js动画

使用了vue提供的钩子函数

```
<transition
    name="fade"
    @before-enter="handleBeforeEnter"
    @enter="handleEnter"
    @after-enter="handleAfterEnter"
>
    <div v-show="show">Hello World</div>
</transition>

handleBeforeEnter传入el
handleEnter传入el和done，以done()结束执行
after-enter传入el
```

velocity.js

5.5 多个元素或组件的动画

使用场景：toggle显示两个元素

transition可以添加mode参数"out-in"使得先消失后显示

可以配合多组件、动态组件使用

5.6 列表过渡

```
<transition-group name="chi">
    <!-- key值最好不用列表循环的index值，可以使用元素自定义的id值 -->
    <div v-for="item of list" :key="item.id">{{item.content + " " + item.id}}</div>
</transition-group>

transition-group相当于在每个元素上增加了一个transition包裹元素
详见demo9
```

5.7 动画组件的封装

使用动画钩子函数，封装动画组件 (demo10)

5.8 


6.1 创建一个Vue项目

![创建项目](./img/createProject.jpg)

6.2 项目解析

在src目录下开发，其他的是配置文件

6.3 单文件组件和路由

路由：根据url不同，返回给用户不同的内容
router-view 显示当前路由对应的地址
单页应用：跳转响应快速，但SEO比较差，而且首屏时间长

6.4-6.6 部署开发环境，进行一系列初始化

移动端开发的重置：
1. meta标签
2. reset.css (初始化各个客户端，表现相同)
3. border.css 移动端1像素问题(css像素：实际像素 = 1：x)
4. click事件300ms延迟 (fastclick库) npm insall --save fastclick

7.1 首页header区域

* 安装stylus

    npm install stylus --save
    npm install stylus-loader --save

* 在home目录中建立components目录，构建局部组件

    引入：
    import HomeHeader from './components/Header'
    export default {
      name: 'Home',
      components: {
        HomeHeader
      }
    }

    使用stylus:
    `<style lang="stylus" scoped>`

    主要修改 Home.vue & Header.vue

7.2 引入图标 & 代码简化

* 引入图标

    在Iconfont网站寻找所需要的icon
    复制iconfont.css和对应的字体文件到styles文件夹
    修改iconfont.css中对应的东西
    在main.js中引入iconfont.css
    通过`<span class='iconfont'>&#xe632;</span> `方式引入图标

* stylus变量引入
    
    在Header.vue中引入
    @import '../../../assets/styles/variable.styl'
    在variable.styl中定义$bgColor = #00bcd4
    在Header.vue中使用变量值

* 优化路径写法

    @代表src目录
    在@import中~@代表src目录
    ./build/webpack.base.conf.js中alias中可以定义
    'styles': resolve('src/assets/styles')
    引入就很方便了，改变后需要重启npm
    注意@import中需要写'~styles/variable.styl'，要带上~号

7.3 轮播图

* git分支 (0-3m)
* 轮播图组件 (3m-5m安装 5m-10m30s引入组件)
* 轮播图开发 (10m30-19m 基本轮播功能，移动端图片未加载时预先占位的解决)
* 细节 (19m-23m15s 轮播播放时的小点，以及把颜色改成白色
        23m15s-27m 代码优化，把src值放在value里，将轮播图改为循环
        27m-28m 提交并合并分支)

------------------
git分支：

    每开发一个功能，就设置一个分支，开发测试完毕合并到master分支
    线上创建分支，本地可以git pull得到该分支
    github 中 git branch index-swiper建立新分支
    git checkout index-swiper 切换到index-swiper分支

    npm install vue-awesome-swiper@2.6.7 --save

------------------
导入：

    import Vue from 'vue'
    import VueAwesomeSwiper from 'vue-awesome-swiper'

    // require styles
    import 'swiper/dist/css/swiper.css'

    Vue.use(VueAwesomeSwiper, { default global options }) 

------------------
轮播制作：

    加入图片src，style中设置width: 100%
    占位：使用一个div元素
    小白点：使用css穿透
    .wrapper >>> .swiper-pagination-bullet-active

    swiperOption: {
        // 加入图片下方小点
        pagination: '.swiper-pagination',
        // 循环播放
        loop: true
      }

------------------
合并分支：

    git add .   git commit -m ""  git push
    git checkout master  切换到master分支
    git merge origin/index-swiper  合并分支
    git push  主分支push

7.4 图标区域页面布局

* (0-4m) index-icons分支建立，HeaderIcon组件建立和引入
* (4-13m) 布局css样式，完成一个，然后复制八份，注意添加的辅助颜色

7.5 图标区域功能实现

* (0-4m) 给icons区域也加上轮播效果，并解决轮播拖动区域的问题
* (4m-16m30s) 数据项合并放置于data中，设置循环方式以实现轮播
* (16m30s-19m30s) 加入css样式，使得溢出的元素以...显示，并且加入styl函数中
* (19m30s-22m) 提交分支、合并分支

------------------
icons轮播

    加入swiper及相关的标签
    icons >>> .swiper-container
      height: 0
      padding-bottom: 50% 其实使用的还是css样式穿透，icons组件中未定义.swiper-xxx类

循环方式实现轮播
    
    iconList中定义各种数据项(id, imgUrl, desc)
    定义计算属性pages，是一个二维数组，第一维包含所有在一个页面内的数据
    -- Vue.js devtools （Chrome/Firefox浏览器组件）

溢出文字

    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis

    加入到mixins.styl中，定义为一个函数

7.6 推荐组件开发

* (0-4m) 建立分支和HomeRecommend
* (4-18m) 写css代码

CSS

    第一步：建立dom结构并取合适的class名字
    第二步：对应的class写style样式
    注意： .item-desc等class中的ellipsis()可能无法生效，在.item-info 中添加min-width:0即可

7.7 周末游组件

* (0-8m) 组件开发和提交

7.8 Ajax获取数据

* (0-4m) Axios安装
* (4m-12m) ajax传值试验

------------------
Axios

    npm install axios --save

------------------
传值实验

    在Home.vue中引入axios
    定义mounted生命周期函数，定义可以发送ajax请求的函数并调用之
    static/ 目录下的内容是页面可以访问到的，用于放置一些静态的文件
    static下新建mock目录保存index.json文件
    将mock目录加入.gitignore文件

    代码上线 -- /api/index.json 自动转发为 /static/mock/index.json
    config/index.js 中更改proxyTable (webpack提供了这种功能)
    proxyTable: {
        '/api': {
            target: 'http://localhost:8080',
            pathRewrite: {
                '^/api': '/static/mock'
            }
        }
    }

7.9 父子组件传值

    父组件通过 :pp = kk 传值进入子组件，子组件中使用 props: [pp]接收传入的参数

    需要注意的几点
    1. 轮播图小白点在最右边，解决方法：让swiper组件条件显示，等待list加载完后再显示
    2. icons自动轮播，在swiperOption中加入autoplay: false即可解决问题

8.1 城市选择组件开发

* (0-3m30s) 配置路由，新创建City组件
* (3m30s-5m10s) 路由跳转 `<router-link to="/city"></router-link>`
* (5m10s-11m) 新建components/Header.vue, 制作header部分，制作返回按钮 
* (11m-12m) 公认的变量由"~styles/variable.styl"托管

8.2 搜索框布局

* (0-46s) 建立city-search分支
* (46s-3m) Search.vue建立
* (3m-6m) 写组件和css样式

8.3 列表组件 city-list

* () 

8.4 Better-Scroll的使用和字母表布局

* (0-3m30s) npm install better-scroll --save
  使用better-scroll组件，注意vue中有定义ref识别dom元素的功能
* (3m30s-) 制作Alphabet组件

8.5 Ajax的使用

8.6 父子组件联动

主要是父子组件的事件触发，以及触摸事件的传值方式

子 -- 父 传送状态：子触发click事件，发送一个change事件
父       监听change事件，触发函数
父 -- 子 通过props传送状态
子       通过watch监听更改

this.scroll.scrollToElement(dom) 可以直接移动到指定dom

注意不同的子组件也能触发change事件，从而实现相同的效果
触摸事件 e.touchstart() e.touchmove() e.touchend()
e.touches[0].clientY 获取点击处的Y值

8.7 列表优化

优化一： 将"A"的y值的计算放在生命周期函数updated()之中
因为一开始传入Alphabet.vue中的cities等参数值都是空的，当Ajax获取数据，
显示出页面时其实传入的数据项发生了改变，update生命周期函数被执行。

优化二： 设置一个timeout节流，使得滑动时间不需要保持太高的侦听频率，间隔16ms侦听即可。

8.8 实现搜索功能

使用v-model绑定input输入框与keyword
为keyword的变化添加侦听，搜索属性并添加到list中
v-for循环显示list.name的值

局部滚动：引入better-scroll
import Bscroll from better-scroll
*在mounted生命钩子中*
this.scroll = new Bscroll(this.$refs.search)

添加无法找到时的提示(额外的li标签，用v-show控制是否显示)
添加输入框为空时回到页面(在div-ul上添加v-show=keyword)

注意：
v-show表达式添加的最好是一个计算元素，最好不直接写表达式

8.9 Vuex
实现城市选择页面数据传入主页

* (8-11) 建立src/store/index.js，引入Vuex
* (11-15) 组件使用公用数据
* (15-22) 改变state，先改变action，然后mutation
* (22-23) 更改其他地方，使得城市列表和选择项也可以改变city
* (23-26) 利用vue-router跳转页面 

------------------
建立仓库

    export default new Vuex.Store({
        state: {
            city: "北京"
        }
    })
    <!-- 在main.js -->
    import store from './store', 在export中注入store

------------------
使用store：

    this.$store.state.city

------------------
改变city状态：

    <!-- in on-function -->
    this.$store.dispatch('changeCity', city)
    <!-- in store -->
    actions: {
        changeCity (ctx上下文, city) {
            ctx.commit('changeCity', city)
        }
    }
    <!-- create mutations -->
    mutations: {
        changeCity (state, city) {
            state.city = city
        }
    }

    <!-- 因为没有异步操作，所以可以直接在store中commit即可 -->
    this.$store.commit('changeCity', city)

------------------
vue-router跳转

    标签方式：
    <router-link to=""></router-link>

    js方式：
    this.$router.push('/')即可，非常简便

8.10 vuex高级应用和localStorage
优化代码

* (0-4.30) 将city存入localStorage中，并做好浏览器兼容(try catch)
* (4.30-6.20) 将state、mutation拆分为文件(使state这个包更完善)
* (6.20-12.30) mapState & mapMutations
* (12.30-17) getters,使得不需要定义冗余数据，相当于computed的功能 && mapGetters
            module，拆分模块，在大的工程有用

------------------
localStorage (让页面保留这个状态，不会因为刷新而重置)
    
    let defaultCity = "北京"
    try {
        if (localStorage.city) {
            localStorage.city = defaultCity
        }
    } catch(e) {}

    state.city = city //已有的代码
    try{
        localStorage.city = city
    } catch(e) {}
    
------------------
mapStates等

    import { mapState } from 'vuex'

    computed: {
        ...mapState(['city'])
        或者
        ...mapState({
            currentCity: 'city'
        })
    }
    <!-- 直接使用this.city -->

mapMutations

    methods: {
    ...mapMutations(['changeCity']),
    changeCity (city) {
      // this.$store.dispatch('changeCity', city)
      // 当没有异步操作时，可以直接commit
      this.$store.commit('changeCity', city)
      this.$router.push('/')
      // this.changeCity(city)
    }
  }

8.11 Keep-Alive优化性能

将keep-Alive增加到router上，减少页面跳转的请求数量

    <keep-alive>
        <router-view />
    </keep-alive>

变更axios请求

    axios.get('/api/index.json?city=' + city)

使用keep-alive后activated生命周期函数会变得有用，跳转页面会触发activated，mounted只会触发一次

    activated () {
        if (this.lastCity !== this.city) {
            <!-- 重新发送ajax请求 -->
        }
        this.lastCity = this.city
    }

9.1 详情页面和banner制作

detail-banner
(0-6m) 创建Detail组件，并将其加入路由 
(6m-9m30s) 显示banner图片
(9m30s-20m) 制作页面，写css样式 

    router-link会默认被变为a标签
    <router-link tag="li">会渲染成li标签

9.2 公用画廊组件开发

建立src/common/gallary/Gallary.vue
(3m-6m30s) 在Banner.vue中使用Gallary,在gallary中定义好显示的样式
(6m30s-10m20s) 加入轮播效果
(10m30s-15m30s) 加入下方分数进度表示，注意要识别拥有overflow: hidden样式生命的元素，避免溢出元素被隐藏掉。同时，swiper组件有不同的显示方法，具体要上官网去找
(20m-22m) 切换到轮播图时的问题，主要是显示前后swiper的尺寸不一致所致，解决方法是增加俩参数：
(22m-24m) 关闭Gallary的方法: 在Gallary组件中定义好关闭的方法，然后触发this.$emit('close')，父组件通过@close接收到事件，并定义相应的方法来处理。如果一开始直接在父组件的`<common-gallary>`中定义方法，无法触发common-gallary组件中的事件
    
    observeParents: true,
    observer: true (Swiper监听到dom结构发生变化时会自动刷新一次)

    pagination: '.swiper-pagination'
    paginationType: 'fraction'

9.3 实现header渐隐渐现效果

建立detail-header分支
(1m-7m) 建立Header.vue，引入圆形header-abs
(7m-12m30s) 引入header-fixed，景点详情组件的建立
(12m30s-16m) 实现60-140px拖动期间的渐隐渐现效果

------------------
    在activated生命周期中：
    window.addEventListener('scroll', this.handleScroll)
    获取点击处的位置：
    const top = document.documentElement.scrollTop

9.4 全局事件的解绑
    为何要解绑？

在其他单页也可触发"scroll"事件
解绑：
    
    在deactivated中：

9.5 使用递归组件实现详情页面

创建detail-list分支
(2m40s-8m) 创建List组件，传入list,dom为div.item>div.item-list>div.item-list-icon，从父组件传入list
(8m-15m) 利用name，递归调用组件

递归组件：
    
    <div v-if="item.children">
        <detail-list :list="item.children"></detail-list>
    </div>

    注意递归组件的使用：
    <div 循环>
        <div 包含块>
        </div>
        <递归体>
    </div>

9.6 使用Ajax

5m17s 使用axios获取ajax数据

注意获取id的方法，以及拼url的方法

    methods: {
      getDetailInfo () {
          axios.get('/api/detail.json', {
            params: {
              id: this.$route.params.id
            }
          }).then(this.getDetailInfoSucc)
        }
    }

排除keep-alive

    <keep-alive exclude="Detail">
    则Detail组件不会被加入keep-alive中，每次进入该组件对应的页面都会发送Ajax请求

防止滚动bug(滑动A页面，B页面也一起滑动)

    scrollBehavior(to, from, savedPosition){
        return {x: 0, y: 0}
    } // 加入index.js >> Router中

9.7 加入简单动画

创建common/fade/Fade.vue动画组件
建立一个动画模板

10.1 Vue项目的接口联调

将服务器部署在80端口，返回json数据即可
    
    proxyTable: {
        '/api': {
            target: 'http://localhost:80'
        }
    } // 即可

10.2 真机测试

webpack配置项默认不支持IP访问
修改package.json
    
    script - dev - webpack-dev-server --host 0.0.0.0

为touchstart事件添加prevent

    @touchstart.prevent=""

在手机上进行测试

    npm install babel-polyfill --save // ES6 Promise支持

10.3 上线

    npm run build
    生成dist目录 // 上线内容，扔到服务器项目目录根路径


**********************
Vue文档补充

Vue事件修饰符

* .stop  e.preventPropagation()
* .prevent  e.preventDefault()
* .capture  在事件捕获阶段触发
* .self  只能点击该元素触发
* .once  只触发一次
* .passive  使得e.preventDefault()无效，不能与.prevent联用

Vue按键

    略

表单输入绑定

    使用v-model="var"来将控件状态和数据变量绑定
    var可以是数值、字符串、数组等各种状态的值

    <input v-model="searchText">其实是语法糖，它等价于：
    <input :value="searchText" @input="searchText = $event.target.value">

在组件中使用v-model

    子组件传到父组件的$event其实是参数值para ($emit("change", para))
    故在子组件的template中这么写：
    `<input :value="value" @input="$emit('input', $event.target.value)">`

自定义事件

    html对大小写不敏感，所以在自定义方法取名时用短横线式较好
    
10.6阅读问题：

1. computed如何实现的依赖缓存
2. computed、methods、watch的实际用途
3. 比较常用的style方法
```
<div :class="classObj"></div>

data: {
    isActive: true,
    error: null
},
computed: {
    classObj: function () {
        return {
            active: this.isActive && !this.error,
            'text-danger': this.error && this.error.type === 'fatal'
        }
    }
}
```
4. vue会自动添加css的浏览器前缀，或者使用类似的`<div :style="{display: ['flex', '-webkit-box', '-ms-flexbox']}"></div>`, vue只会渲染最后一个被浏览器支持的值

5. v-if 切换开销更大，在切换过程中包含事件监听器和子组件的销毁和重建
v-show 是简单的操作display值，有更高的初始渲染开销

6. 列表渲染

v-for中的顺序和实际顺序是反的
`<div v-for="(value, key, index) in object">
    {{index}} : {{key}} : {{value}}
</div>`

数组变异方法

    * 以下七种方法可以改变数组和渲染结果：
    pop, push, unshift, shift, reverse, splice, sort

    * 替换数组(返回新数组)：
    filter, concat, slice等，可以 example.items = example.items.filter(function (item) {
        retrn item.message.match(/foo/)
        })
    替换数组中的dom元素会最大范围的重用，是较为高效的操作

    * 以下方法应该避免：
    - vm.items[indexOfItem] = newValue
      + vm.splice(indexOfItem, 1, newValue)
      + vm.$set(vm.items, indexOfItem, newValue)
    - vm.items.length = newLength
      + vm.splice(newLength)

    * 为obj添加新属性：
      + Vue.set(vm, 'age', 24)
      + vm.usrfile = Object.assign({}, vm.usrfile, {
          age: 24,
          favoriteColor: 'cornflowerblue'
      })    

整数取值v-for, 显示1-10
`<div v-for="n in 10">{{ n }}</div>`

**不要将v-for和v-if联用,可以通过引入一个计算属性解决这个问题
**组件的:key属性是必需的

7. 事件处理

8. 输入绑定

v-model会忽略所有表单元素的value,checked和selected特征的初始值，总是以vue实例中的数据作为数据来源，应该在data中进行声明初始值。

选项元素的v-model绑定和v-bind:value联用，可以方便地改变selected的值
```javascript
<select v-model="selected"> (加入multiple可以变成多选框)
  <option v-for="option of options" :value="option.value">{{option.text}}</option>
</select>
// selected 和 option.value 关联起来了
```

修饰符

    .lazy 从input事件触发更新更改为change事件触发
    .number 将输入转换为数字返回，如果无法转换则返回原值
    .trim 忽略字符串前后的空白元素

9. 组件

因为组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。仅有的例外是像 el 这样根实例特有的选项。

component有props属性，也可以当做data来用，是从外部传入的值 (相当于组件的实例通过:title之类的方式向组件props: [title]传值)

**v-model='text' === v-bind:value='text' & v-on:input='text = $event.target.value'

**注意组件调用者的input绑定的方法由组件的$emit触发
  注意组件通过$emit('event', somevalue)的方式向调用者传入值(这个值为$event，和父级元素中的$event不是一个东西)
  可以简单理解为调用者和组件不是一个层次上的东西，最终和dom元素平级的是组件而不是调用者（调用者是临时性的）
  注意template中只会渲染第一个子级元素
  

自动化全局注册

    vue提供了一个[方法](https://cn.vuejs.org/v2/guide/components-registration.html#%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6%E7%9A%84%E8%87%AA%E5%8A%A8%E5%8C%96%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C)，可以全局注册非常常用的组件
    
10. 单向数据流

父级 prop 的更新会向下流动到子组件中，但是反过来则不行。

子组件的两种方法：1. 使用data接收；2.使用一个计算属性转换。

props定义最好用kebab-case方法，因为html不区分大小写，而且对于props，vue可以自动从camelCase转化到kebab-case

props验证：
```
propA: {
    type: String,
    default: 'a', //如果是对象的话则必须从一个工厂函数获取
    required: true,
    validator: function (value) {
        return ['a', 'b', 'c'].indexOf(value) !== -1
    }
}
```
**注意default和validator中不能使用data、computed中定义的值，因为prop会在一个组件实例化创建之前调用

11. 非prop特征

一个非 prop 特性是指传向一个组件，但是该组件并没有相应 prop 定义的特性。

一般父组件的 prop 会覆盖子组件的，class和style则合并

在组件中定义`inheritAttrs: false`可以避免根元素继承特征

通过`v-bind="$attrs"`获取父组件传入的东西，可以自行决定用哪个

12. 自定义事件

**推荐一直使用kebab-case 的事件名，因为vue对于事件名称不能从camelCase转换
原因是html在属性值上不区分大小写，因此 v-on:changeItem='xxx' 这类型的定义不会被触发

**自定义v-model

将原生事件绑定到组件(适用于要在组件调用者上监听原生事件)
`Object.assign({}, $listener, {input: function (e) {vm.emit('input', e.target.value)}})`

prop双向绑定
`this.$emit('update:title', newTitle)`
`v-bind:title="doc.title" v-on:update:title="doc.title=$event"`
可以直接写
`v-bind:title.sync="doc.title"`
或者
`v-bind.sync="doc"`则doc中的每个属性都作为独立的prop传进去

**`v-bind.sync="{ title: doc.title }"`是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。

13. 作用域插槽
**主要用于数据存在子组件中，然后父组件需要循环处理各个结果的场景
如果数据存在父组件中，则是不需要这个东西的，直接由父组件搞定就行

    
    仍然是组件提供<slot>，父组件使用<template>来实现
    子组件应该给slot传入所有必需的数据对象,然后设置template的slot-scope属性以代理这些数据

    例如在组件中定义：`... <slot :todo="todo">{{todo.text}}</slot> ...`
    在父组件中使用：`...<template slot-scope="slotProps"><span v-if="slotProps.todo.isReady">{{slotProps.todo.text}}</span></template>...`
    或者使用解构语法，写法更干净一些：
    `...<template slot-scope={todo}><span v-if="todo.isReady">{{todo.text}}</span></template>...`

14. 动态组件和异步组件

动态组件：缓存组件状态，使用keep-alive包裹

异步组件：等到要用时才加载
```
Vue.component({
    'async-webpack-example',
    () => import('./my-async-component')
})
或者采用如下方法
new Vue({
    el: ...
    ...
    components: {
        'my-component': () => import('./my-async-component')
    }
    ...
})
```

15. 其他访问方式

子组件访问父组件，不经过props

    在子组件中使用this.$root来访问根组件，使用this.$parent访问直接父组件

依赖注入: 避免重复嵌套$parent的访问

    父组件中定义：
    provide: function () {
        return {
            getMap: this.getMap
        }
    }
    子组件中注入：
    inject: ['getMap']
    则子组件可以使用这个函数

父组件访问特定子组件

    在子组件中定义ref属性，然后使用 this.$refs.xxx 访问

如果项目较复杂，使用vuex管理状态比较好，而不是使用这些方法

16. 程序事件侦听器

一方面，子组件通过 $emit('xxx', ...) 触发的事件可以被父组件以 v-on:xxx 的形式接收到

另一方面，vue实例有$on('click', handler), $once('hook:beforeDestroy', handler), $off('click', handler)等方法可以侦听事件

17. 循环引用

A引用了B，而B又引用了A,会导致webpack和browserify等报错
在A的beforeCreate钩子中调用`this.$options.components.B = require('./B.vue').default`
或者注册B时采用异步方法，均可解决问题。
