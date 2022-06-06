// const mdContainer = require('markdown-it-container')

// const barPlugin = (app) => {
//     return {
//         name: 'vuepress-plugin-bar',
//         async ready() {

//             console.log('Hello World!');

//         },
//         // 页面
//         // extendsPage: (page) => {
//         //     console.log(JSON.stringify(page))
//         // },
//         // Markdown 增强。
//         extendsMarkdown: (md) => {
//             md.use(mdContainer,'demo',{
//                 render(h) {
//                     return '自定义容器！'
//                 },
//             });

//         },
//     }
// }


// module.exports = barPlugin


module.exports = (options, ctx) => {

    let m = 0;
    return {

        name: 'vuepress-plugin-code-copy',
        // markdown
        extendsMarkdown: (md) => {
            md.options.highlight = (code, lang) => {
            };
        },
        // 页面
        extendsPage: (page) => {
            // console.log('page')
        },
        async ready() {

            console.log('Hello World!');

        }

    }

}