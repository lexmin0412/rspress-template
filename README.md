# Rspress Template

基于 Rspress 构建的文档站点模板，集成了常用功能以达到开箱即用。

## 模板搭建步骤

### 1. 初始化模板

通过 Rspress 脚手架命令创建项目：

```shell
npm create rspress@latest
```

按照提示输入项目名称及描述等信息，即可创建一个 Rspress 项目。

然后进入项目目录，安装依赖：

```shell
# 进入项目目录
cd rspress-template
# 安装依赖
pnpm install
```

### 2. 新建 README 文件

在根目录新建 README.md 文件，填写基础信息：

```markdown
# Rspress Template

基于 Rspress 构建的文档站点模板，集成了常用功能以达到开箱即用。
```

### 3. 本地开发及构建

初始化模板后，Rspress 脚手架已经在 scripts 中注入了三个命令，分别是：

- dev 启动本地开发服务器
- build 生产环境构建
- preview 本地预览 build 命令构建出的产物

在终端运行以上命令，与预期结果一致，进入下一步。

### 4. 第一次提交

```shell
# 初始化 Git 工作区
git init
# 添加远程源
git remote add origin git@github.com:lexmin0412/rspress-template.git
# 设置当前工作区的 git 账号，防止使用错误账号进行提交
gcm use github
# 暂存
git add .
# 提交
git commit -m 'feat: 初始化模板'
# 推送
git push -u origin main
```
