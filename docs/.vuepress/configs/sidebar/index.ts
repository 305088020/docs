import type { SidebarConfig } from "vuepress-theme-mix";
import { path } from "@vuepress/utils";

const fs = require("fs");

// 自动获取侧边栏
function getSideBar(folder) {
	// 只能用绝对路径
	let filePath = path.resolve(__dirname, "../../../" + folder + "/");
	let file_list = fs.readdirSync(filePath);
	let bar_list = [];
	for (let i = 0; i < file_list.length; i++) {
		if (file_list[i].search("README") != -1) {
		} else {
			// 可根据需求定制文件名，但是不能有.md后缀
			let text = file_list[i].slice(0, -3);

			let link = "/" + folder + "/" + text + ".html";
			file_list[i] = file_list[i].slice(0, -3) + ".html";
			const type = "link";
			bar_list.push({ type, text, link });
			// bar_list.push(link);
		}
	}
	return bar_list;
}

// sidebar: { "/Fragment/": getSideBar("Fragment"), "/Java/": getSideBar("Java"), "/MyBlog/": getSideBar("MyBlog"), "/Node/": getSideBar("Node") },

export const sidebar: SidebarConfig = {
	"/Java": [
		{
			type: "group",
			text: "Java",
			link: "",
			children: getSideBar("Java"),
		},
	],
	"/MyBlog": [
		{
			type: "group",
			text: "博客",
			link: "",
			children: getSideBar("MyBlog"),
		},
	],
	"/Node": [
		{
			type: "group",
			text: "前端",
			link: "",
			children: getSideBar("Node"),
		},
	],
	"/Work": [
		{
			type: "group",
			text: "工作",
			link: "",
			children: getSideBar("Work"),
		},
	],
	"/KaoShi": [
		{
			type: "group",
			text: "软件架构",
			link: "",
			children: getSideBar("KaoShi"),
		},
	],
};
