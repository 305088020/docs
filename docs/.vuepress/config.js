module.exports = {
  base: '/docs/',
  // 站点配置
  lang: 'zh-CN',
  title: '你好， VuePress ！',
  description: '这是我的第一个 VuePress 站点',

  // 主题和它的配置
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    navbar: [
      // NavbarItem
      {
        text: 'Java',
        link: '/java/',
      },
      // NavbarGroup
      {
        text: 'Node',
        children: ['/node/vue.md', '/node/angular.md'],
      },
      // 字符串 - 页面文件路径
      'node/vue.md',
    ],
  },
}
