import * as path from 'path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
	lang: 'zh',
	base: '/rspress-template/',
  root: path.join(__dirname, 'docs'),
  title: 'Rspress',
  description: 'Rspack-based Static Site Generator',
	icon: "https://lexmin0412.github.io/rspress-template/rspress-icon.png",
  logo: {
		light: "https://lexmin0412.github.io/rspress-template/rspress-light-logo.png",
		dark: "https://lexmin0412.github.io/rspress-template/rspress-dark-logo.png",
  },
  themeConfig: {
		locales: [
			{
				lang: 'en',
				label: 'English',
				outlineTitle: 'On This Page',
			},
			{
				lang: 'zh',
				label: '简体中文',
				outlineTitle: '大纲',
			},
		],
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/web-infra-dev/rspress' },
    ],
	},
	builderConfig: {
		output: {
			assetPrefix: 'https://lexmin0412.github.io/rspress-template/'
		}
	},
});
