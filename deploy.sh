#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

msg='deploy'
githubUrl=git@github.com:305088020/docs.git  # 按你的代码仓库信息进行修改

git add -A
git commit -m "${msg}"
git push -f $githubUrl # 推送到github

cd - # 退回开始所在目录
# rm -rf docs/.vuepress/dist
