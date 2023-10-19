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

### 5. 配置 Github Actions 实现自动化部署

前置条件：github 仓库必须为 public，如果是 private，请先切换后再进行下面的步骤。

#### 5.1 修改 GitHub Pages 部署方式

当前版本的 Github Pages 默认部署方式为根据分支部署，我们需要切换到 Github Actions。

![Github Pages 设置](./readme_assets/images/github_pages.jpg)

#### 5.2 添加配置文件

在根目录新建 .github/workflows/deploy.yml 文件，填入如下内容：

```shell
name: Deploy Rspress site to Pages

on:
  push:
    branches: [main]

  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0 # Not needed if lastUpdated is not enabled
      - uses: pnpm/action-setup@v2 # pnpm is optional but recommended, you can also use npm / yarn
        with:
          version: 7
          cache: pnpm
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: pnpm
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Install dependencies
        run: pnpm install
      - name: Build with Rspress
        run: |
          pnpm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: doc_build

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

#### 5.3 修改 rspress 配置

由于我们的部署环境是 Github Pages，而它只分配给每个 Repo 的只是一个域名下的二级路由，如仓库名为 rspress-template，则可访问的 pages 域名为 lexmin0412.github.io/rspress-template，所以我们需要调整 rspress 配置，以能够访问到部署目录下的静态资源文件(如 css/js 等)以及路由。

修改根目录下的 rspress.config.ts, 加入如下内容：

```ts
export default defineConfig({
	// history 路由前缀
	base: '/rspress-template/',
	builderConfig: {
		output: {
			// 给所有 static 目录下的静态文件引用添加前缀以便能够正确访问
			assetPrefix: '/rspress-template/'
		}
	},
})
```

推送代码，等待 Actions 执行完成后访问 https://lexmin0412.github.io/rspress-template 查看效果。

#### 5.4 修复图片

在上面的步骤中，我们已经成功地部署了静态站点，但会发现 logo 图片依然无法访问。

在 Rspress 构建后，docs/public 目录下的图片会被原封不动地移动到构建产物根目录下，所以我们修改 rspress.config.ts 文件：

```ts
export default defineConfig({
	icon: "https://lexmin0412.github.io/rspress-template/rspress-icon.png",
	logo: {
		light: "https://lexmin0412.github.io/rspress-template/rspress-light-logo.png",
		dark: "https://lexmin0412.github.io/rspress-template/rspress-dark-logo.png",
  },
	builderConfig: {
		output: {
			assetPrefix: 'https://lexmin0412.github.io/rspress-template/'
		}
	},
})
```

修改 docs/index.md，给图片加上路由前缀或改为完整的远程路径:

```markdown
---
pageType: home

hero:
  image:
    src: /rspress-template/rspress-icon.png
```

再次推送代码，actions 执行成功后，会发现所有的 css/js/图片都加上了 assetPrefix 对应的值，可以正常访问了。

