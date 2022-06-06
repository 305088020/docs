#### 1、安装依赖

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add mockjs
yarn add vite-plugin-mock -D
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install mockjs
npm install vite-plugin-mock -D
```

  </CodeGroupItem>
</CodeGroup>

#### 2、添加配置 vite.config.ts

<CodeGroup>

<CodeGroupItem title="vite.config.ts" active>

```ts
import { UserConfigExport, ConfigEnv } from 'vite'

import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        // default
        mockPath: 'mock',
        localEnabled: command === 'serve',
      }),
    ],
  }
}

```

</CodeGroupItem>

<CodeGroupItem title="createVitePlugins.ts">

```ts
import {viteMockServe} from 'vite-plugin-mock'

export default function createVitePlugins(viteEnv, isBuild = false) {
    const vitePlugins = [vue()]
    // 全局开启jquery
    // vitePlugins.push(createJqueryImport())
    vitePlugins.push(viteMockServe({
        // mock文件地址
        mockPath: './src/mock',
        // 开发打包开关
        // localEnabled: localEnabled,
        // 生产打包开关
        // prodEnabled: prodEnabled, 
        // 是否在控制台显示请求日志
        // logger: false, 
        // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
        // supportTs: false 
    }),)
    return vitePlugins
}
```

</CodeGroupItem>

</CodeGroup>

#### 3、数据接口

> 在mock下新建ts文件，会自动监测

```js
import { MockMethod } from 'vite-plugin-mock'
export default [
    {
        url: '/mock/base/equip-category/tree-list',
        method: 'get',
        response: ({ query }) => {
            return {
                code: 0,
                data: {
                    name: 'vben',
                },
            }
        },
    },
] as MockMethod[]
```

#### 4、调整代理

> `mock`的代理，地址要前端的本地址

```js
server: {
            port: 1100,
            host: true,
            open: true,
            proxy: {
                // mock的代理
                '/dev-api/mock': {
                    target: 'http://localhost:1100',
                    changeOrigin: true,
                    rewrite: (p) => p.replace(/^\/dev-api/, '')
                },
                // 正常的代理
                '/dev-api': {
                    target: 'http://localhost:8080',
                    changeOrigin: true,
                    rewrite: (p) => p.replace(/^\/dev-api/, '')
                },
            },
        },
```

#### 5、发送接口

> 改`url`和`api`中的`url`一样，使用正常接口的时候，将mock去掉即可。

```js
export function getCategoryTreeList() {
  return request({
    url: '/mock/base/equip-category/tree-list',
    method: 'get'
  })
}
```

#### 6、api接受参数

![image-20220525215519474](https://raw.githubusercontent.com/305088020/Pictures/main/202205252155279.png)

#### 7、src文件夹下，添加文件mockProdServer.js

```js
import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import testMock from "./server/mock/test";

export const mockModules = [...testMock];

export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
```

#### 8、package.json添加相关命令

```js
// package.json 
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "dev:mock": "cross-env USE_MOCK=true vite",
    "build:mock":"cross-env USE_CHUNK_MOCK=true vite build"
  },
```

