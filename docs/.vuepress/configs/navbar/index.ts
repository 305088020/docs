import type { NavbarConfig } from "vuepress-theme-mix";
import { path } from "@vuepress/utils";
const fs = require("fs");

// 自动获取导航栏
function getNav(folder) {
	// 只能用绝对路径
	let filePath = path.resolve(__dirname, "../../../" + folder + "/");

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
		}
	}
	return nav_text;
}

export const navbar: NavbarConfig = [
	{
		text: "首页",
		link: "/",
	},
	{
		text: "博客",
		link: "/MyBlog/",
		children: getNav("MyBlog"),
	},
	{
		text: "Java",
		children: [
			{
				text: "Spring",
				link: "/Java/",
				children: getNav("Java"),
			},
			{
				text: "Python",
				link: "/Node/",
				children: getNav("Node"),
			},
		],
	},
	{
		text: "前端",
		link: "/Node/",
		children: getNav("Node"),
	},
	{
		text: "工作",
		link: "/Work/",
		children: getNav("Work"),
	},
	{
		text: "软件架构",
		link: "/KaoShi/",
		children: getNav("KaoShi"),
	},
];
