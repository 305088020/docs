# Module使用

[阮一峰-Module 的加载实现](https://es6.ruanyifeng.com/#docs/module-loader)

> ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。

#### 1、变量导出

```js
// 报错
export 1;

// 报错
var m = 1;
export m;

```

> 上面两种写法都会报错，因为没有提供对外的接口。第一种写法直接输出 1，第二种写法通过变量`m`，还是直接输出 1。`1`只是一个值，不是接口。正确的写法是下面这样。

```javascript

// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};

```

#### 2、函数导出

```js
// 报错
function f() {}
export f;

// 正确
export function f() {};

// 正确
function f() {}
export {f};
```

### 2、import

```js
// 导入
import { myMethod } from 'util';

// 仅仅执行lodash模块，但是不输入任何值
import 'lodash';


// 逐一加载
import { area, circumference } from './circle';

// 整体加载
import * as circle from './circle';

```

### 3、export default 命令

> `epxort default` 的值，`import`的时候不带`大括号`，

```js
// 第一组
export default function crc32() { // 输出
  // ...
}

import crc32 from 'crc32'; // 输入

// 第二组
export function crc32() { // 输出
  // ...
};

import {crc32} from 'crc32'; // 输入
```

### 4、import()动态加载

> [ES2020提案](https://github.com/tc39/proposal-dynamic-import) 引入`import()`函数，支持动态加载模块。

`import()`返回一个 Promise 对象。下面是一个例子

>`import()`函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。

```js
const main = document.querySelector('main');

import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main);
  })
  .catch(err => {
    main.textContent = err.message;
  });
```

可以使用`await`命令：

```javascript
async function renderWidget() {
  const container = document.getElementById('widget');
  if (container !== null) {
    // 等同于
    // import("./widget").then(widget => {
    //   widget.render(container);
    // });
    const widget = await import('./widget.js');
    widget.render(container);
  }
}

renderWidget();
```

### 5、浏览器加载

> 加载ES6模块，也使用`<script>`标签，但是要加入`type="module"`属性。
>
> ```js
> <script type="module" src="./foo.js"></script>
> ```
>
> 浏览器对于带有`type="module"`的`<script>`，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了`<script>`标签的`defer`属性。
>
> 如果网页有多个`<script type="module">`，它们会按照在页面出现的顺序依次执行。
>
> `<script>`标签的`async`属性也可以打开，这时只要加载完成，渲染引擎就会中断渲染立即执行。执行完成后，再恢复渲染。

##### ES6内嵌在网页，语法行为与加载外部脚本完全一致。

```js
<script type="module">
  import utils from "./utils.js";

  // other code
</script>

<!-- 举例来说，jQuery 就支持模块加载。-->

<script type="module">
  import $ from "./jquery/src/jquery.js";
  $('#message').text('Hi from jQuery!');
</script>
```

> #####  注意：
>
> - 代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。
> - 模块脚本自动采用严格模式，不管有没有声明`use strict`。
> - 模块之中，可以使用`import`命令加载其他模块（`.js`后缀不可省略，需要提供绝对 URL 或相对 URL），也可以使用`export`命令输出对外接口。
> - 模块之中，顶层的`this`关键字返回`undefined`，而不是指向`window`。也就是说，在模块顶层使用`this`关键字，是无意义的。
> - 同一个模块如果加载多次，将只执行一次。

> ```javascript
> // 利用顶层的this等于undefined这个语法点，可以侦测当前代码是否在 ES6 模块之中。
> const isNotModuleScript = this !== undefined;
> ```

### 6、Node.js 的模块加载方法

> JavaScript 现在有两种模块。一种是 ES6 模块，简称 ESM；另一种是 CommonJS 模块，简称 CJS。
>
> CommonJS 模块是 Node.js 专用的，与 ES6 模块不兼容。
>
> CommonJS 模块使用`require()`和`module.exports`
>
> ES6 模块使用`import`和`export`

> Node.js 要求 ES6 模块采用`.mjs`后缀文件名。
>
> 也就是说，只要脚本文件里面使用`import`或者`export`命令，那么就必须采用`.mjs`后缀名。

>##### **总结为一句话：**
>
>`.mjs`文件总是以 ES6 模块加载，`.cjs`文件总是以 CommonJS 模块加载，`.js`文件的加载取决于`package.json`里面`type`字段的设置。

### 7、package.json 的 main 字段

> `package.json`文件有两个字段可以指定模块的入口文件：`main`和`exports`。比较简单的模块，可以只使用`main`字段，指定模块加载的入口文件。

```json
// ./node_modules/es-module-package/package.json
{
  "type": "module",
  "main": "./src/index.js"
}
```

> 上面代码指定项目的入口脚本为`./src/index.js`，它的格式为 ES6 模块。如果没有`type`字段，`index.js`就会被解释为 CommonJS 模块。
>
> 然后，`import`命令就可以加载这个模块。

```javascript
// ./my-app.mjs

import { something } from 'es-module-package';
// 实际加载的是 ./node_modules/es-module-package/src/index.js
```

### 8、package.json 的 exports 字段

> `export`的优先级要高于`main`

##### 条件加载：

```json
{
  "type": "module",
  "exports": {
    ".": {
      "require": "./main.cjs",
      "default": "./main.js"
    }
  }
}
```

### 9、CommonJS模块加载ES6模块

> CommonJS 的`require()`命令不能加载 ES6 模块，会报错，只能使用`import()`这个方法加载。

```javascript
(async () => {
  await import('./my-app.mjs');
})();
```

### 10、ES6模块加载CommonJS模块

```javascript
// 正确
import packageMain from 'commonjs-package';

// 报错
import { method } from 'commonjs-package';
```