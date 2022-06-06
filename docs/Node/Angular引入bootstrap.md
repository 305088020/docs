### 引入Jquery

> TS认识第三方js需要安装类型描述文件

#### 方法一

1、安装依赖

```bash
npm install --save jquery @types/jquery
```

2、页面使用

```js
// 实测可以不需要写
import * as $ from 'jquery';

// 直接使用
alert($('#tielu').html());

```

#### 方法二

```js
// 有过类型声明后，都不需要再引入了，
// 在 Angular.json 中添加引入：
"scripts": ["node_modules/jquery/dist/jquery.js"]
// 声明$  实测下，可以不用写，在jquery的type中已经声明过了
declare let $: any;

// 使用
alert($('#tielu').html());

```

#### 方式三

```js
// 直接在首页的index.html上引入
<script src="https://code.jquery.com/jquery-3.3.1.min.js" crossorigin="anonymous"></script>

// 可直接定义使用

```

