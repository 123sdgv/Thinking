# OC 宇宙作品站

以多个原创角色（OC）为核心的宇宙作品静态网站。

## 项目结构

```
content/          # 所有创作内容（角色、故事、世界观）
├── characters/   # OC 人物档案
├── stories/      # 故事及章节
├── world/        # 世界观设定
└── images/       # 图片展示

src/              # 网站模板和主题
├── _includes/    # Nunjucks 模板
│   ├── layouts/  # 页面布局
│   └── partials/ # 可复用组件
├── assets/       # 静态资源（CSS、JS）
└── _data/        # 全局数据

.eleventy.js      # 11ty 配置
package.json      # 依赖
```

## 快速开始

```bash
npm install
npm run serve    # 本地开发
npm run build    # 构建静态网站
```

## 内容管理

所有内容使用 Markdown + YAML 前置元数据保存，
AI 和人类均可轻松编辑。

### 添加新角色

在 `content/characters/` 下创建 `.md` 文件，
包含 YAML 前置元数据和 Markdown 正文。

### 添加新故事

在 `content/stories/` 下创建新文件夹，
包含 `index.md`（故事概览）和 `chapter-xx.md`（章节）。

## 主题切换

视觉主题集中在 `src/assets/css/` 中，
通过 CSS 自定义变量实现轻松更换。
