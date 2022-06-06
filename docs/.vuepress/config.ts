import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
// import { mixTheme } from "vuepress-theme-mix";
// import docsearchPlugin from "@vuepress/plugin-docsearch";
// const { searchPlugin } = require("@vuepress/plugin-search");
import { path } from "@vuepress/utils";
import { sidebar, navbar } from "./configs";

const fs = require("fs");
const { defaultTheme } = require('vuepress')
const myPlugin = require('../../plugins/myplugin/index')
const demoblockPlugin = require("../../plugins/vuepress-plugin-demoblock-plus/index");
const { shikiPlugin } = require('@vuepress/plugin-shiki')

export default defineUserConfig({
	base: "/docs/",
	// 站点配置
	title: "你好， VuePress ！",
	description: "这是我的第一个 VuePress 站点",
	head: [
		// 设置 favor.ico，docs/.vuepress/public 下
		// [
		//   'link', { rel: 'stylesheet', href: './styles/misty.css' }
		// ],
		// [
		//   'link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' }
		// ],
		// [
		//   'script', { type: 'text/javascript', src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js' }
		// ]
	],
	locales: {
		// 键名是该语言所属的子路径
		// 作为特例，默认语言可以使用 '/' 作为其路径。
		"/": {
			lang: "zh-CN",
			title: "VuePress",
			description: "Vue 驱动的静态网站生成器",
		},
	},
	bundler: viteBundler(),
	markdown: {
		extractHeaders: {
			level: [2, 3, 4],
		},
	},
	// 主题和它的配置
	// theme: "@vuepress/theme-default",
	// theme: path.resolve(__dirname, "./theme"),
	theme: defaultTheme({
		// ……
		logo: "images/33.jpg",
		// 我们会将它作为一个 GitHub 仓库
		repo: "https://305088020.github.io/docs/",
		repoLabel:"GitHub-Docs",
		sidebarDepth: 3,
		editLink: false,
		navbar: navbar,
		sidebar: sidebar,
		// navbar: [
		// 	// NavbarItem
		// 	{
		// 		text: "Fragment",
		// 		children: getNav("Fragment"),
		// 	},
		// 	{
		// 		text: "MyBlog",
		// 		children: getNav("MyBlog"),
		// 	},
		// 	{
		// 		text: "Java",
		// 		children: getNav("Java"),
		// 	},
		// 	{
		// 		text: "Node",
		// 		children: getNav("Node"),
		// 	},
		// 	{
		// 		text: "Work",
		// 		children: getNav("Work"),
		// 	},
		// ],
		// sidebar: { "/Fragment/": getSideBar("Fragment"), "/Java/": getSideBar("Java"), "/MyBlog/": getSideBar("MyBlog"), "/Node/": getSideBar("Node") },
	}),
	plugins: [
		myPlugin(),
		demoblockPlugin({theme: 'github-light',}),
		shikiPlugin({
			// 配置项
			// theme: 'slack-dark',
			theme: 'monokai',
		  }),
		// docsearchPlugin({
		// 	appId: "R2IYF7ETH7",
		// 	apiKey: "599cec31baffa4868cae4e79f180729b",
		// 	indexName: "docsearch",
		// 	locales: {
		// 		"/": {
		// 			placeholder: "Search Documentation",
		// 		},
		// 		"/zh/": {
		// 			placeholder: "搜索文档",
		// 		},
		// 	},
		// }),
		// searchPlugin({

		// 	// 排除首页
		// 	isSearchable: (page) => page.path !== '/',
		//   }),
		// [
		//   '@vuepress/docsearch',
		//   {
		//     appId: 'R2IYF7ETH7',
		//     apiKey: '599cec31baffa4868cae4e79f180729b',
		//     indexName: 'docsearch',
		//     locales: {
		//       '/': {
		//         placeholder: '搜索文档',
		//         translations: {
		//           button: {
		//             buttonText: '搜索文档',
		//           },
		//         },
		//       },
		//     },
		//   },
		// ],
	],
});
