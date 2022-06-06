[[toc]]

# vuepress自定义主题

## 配置

### 站点配置

#### head

- 类型： `HeadConfig[]`

- 默认值： `[]`

- 详情：

    在最终渲染出的 HTML 的 `<head>` 标签内加入的额外标签。

    你可以通过 `[tagName, { attrName: attrValue }, innerHTML?]` 的格式来添加标签。

    它可以设置在不同语言的 locales 中。

- 示例：

    增加一个自定义的 favicon ：

```javascript
module.exports = {
  head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
}
```

渲染为：

```html
<head>
  <link rel="icon" href="/images/logo.png" />
</head>
```

-------

### 主题配置

### Markdown配置

## 生成路径

## 自定义侧边栏



> 可以直接放在config.js文件，也可以单独放到一个js文件中然后导入，我这里直接放到config.js里了。

```js
const fs = require('fs');

// 自动获取侧边栏
function getSideBar(folder) {
    // 只能用绝对路径
    path = 'D:/PersonalProject/vue_press/docs/pages/' + folder + '/';
    let file_list = fs.readdirSync(path);
    for (let i = 0; i < file_list.length; i++) {
        // 可根据需求定制文件名，但是不能有.md后缀
        file_list[i] = file_list[i].slice(0, -3);
    }
    return file_list;
}

function getNav(folder) {
	// 只能用绝对路径
	let filePath = path.resolve(__dirname, "../" + folder + "/");
	console.log(filePath);

	let file_list = fs.readdirSync(filePath);
	let nav_text = [];
	for (let i = 0; i < file_list.length; i++) {
		if (file_list[i].search("README") != -1) {
		} else {
			const fileLink = "/" + folder + "/" + file_list[i].slice(0, -3) + ".html";
			nav_text.push({
				// 这里也可以根据需求定制，同样不能有后缀
				text: file_list[i].slice(0, -3),
				link: fileLink,
			});
			console.log(fileLink);
		}
	}
	return nav_text;
}

```

在config.js文件中设置nav和sidebar

```js
module.exports = {
    ......
    themeConfig: {
        ......
        nav: [
            {
                text: 'Python',
                items: getNav('Python')
            },
        ],
        sidebar: {
            '/pages/Python/': getSideBar('Python'),
        }
    }
}


```