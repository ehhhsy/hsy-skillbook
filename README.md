# HSY Skillbook：网页复刻工作台与 Codex Skills

这个仓库主要解决一件事：看到一个喜欢的网页后，把它的**可见设计和交互**做成可维护的前端代码，而不只是保存一张截图。你可以把公开 URL、截图、录屏、Figma 设计稿或已有源码交给 Codex，并用仓库中的 `recreate-webpage` Skill 约束采集、实现和验收流程。

仓库还包含一个 React 案例展厅，用真实页面验证这套流程。每个案例都保留独立路由，展厅提供复刻入口和原网站链接；`evidence/` 保存参考画面、实现截图和差异记录。**Skill 是工作方法，展厅是验证样例**：它不是通用爬虫，也不能仅凭一个 URL 自动保证任何网站都达到 1:1。

## 在线预览

[打开案例展厅](https://hsy-skillbook-showcase.vercel.app/)

![TRAE 首页复刻示例](./evidence/rendered/trae-route-1440x900.png)

| 案例 | 本地路由 | 复刻范围与重点 |
| --- | --- | --- |
| TRAE | `/trae/` | 首页视觉、流体像素背景与交互 |
| Jufcloud | `/jufcloud/` | 二次元角色横幅与鼠标视差 |
| New API | `/newapi/` | 产品首页、深浅主题与内容区 |
| Osty | `/osty/` | 作品集首页与筛选交互 |
| Heybike | `/heybike/` | 电商首页、轮播与四种演示风格 |
| Avada | `/avada/` | 首页横幅、动态标题与响应式布局 |

线上展厅是已发布版本；仓库中的最新改动以本地运行结果为准。案例只覆盖表中说明的范围，不包含参考网站的后端、账号、支付或全部子页面。

## 本地运行

需要 Node.js `^20.19.0` 或 `>=22.12.0`，以及 npm。克隆仓库后运行：

```bash
gh repo clone ehhhsy/hsy-skillbook
cd hsy-skillbook
npm ci
npm run dev
```

打开终端输出的本地地址（通常是 `http://127.0.0.1:5173/`）。首页是案例列表，表格中的路径可直接进入对应 Demo。若端口被占用，以 Vite 实际输出为准。

提交或修改代码前运行：

```bash
npm run lint
npm run build
```

前端使用 React、TypeScript、Vite 和原生 CSS；交互案例按需要使用 Three.js、Rive、Embla Carousel 等现有依赖。

## 使用网页复刻 Skill

[`recreate-webpage`](./skills/recreate-webpage/SKILL.md) 接受公开 URL、截图、录屏、Figma 或现有源码。它要求先锁定页面范围和视口，采集静态资源与交互状态，再按页面切片实现，并在相同视口、输入与时间点比较参考和结果。对动态页面，单张截图不足以证明交互还原度。

在 Codex 中可以直接从本仓库引用该 Skill，或将其链接到本机 Skill 目录：

```bash
mkdir -p ~/.codex/skills
ln -s "$PWD/skills/recreate-webpage" ~/.codex/skills/recreate-webpage
```

若目标路径已存在，先检查它是否指向当前仓库，不要覆盖已有 Skill。示例请求：

```text
使用 $recreate-webpage 复刻这个页面的首页横幅：https://example.com/
桌面按 1440×900、移动端按 390×844 验证；记录鼠标移动、菜单和定时动画的状态。
```

Skill 的具体采集、交互和验收规则按需放在 [`references/`](./skills/recreate-webpage/references/)；图片比较工具位于 [`scripts/compare_images.py`](./skills/recreate-webpage/scripts/compare_images.py)。

## 其他 Skills

| Skill | 用途 |
| --- | --- |
| [`redact-sensitive-content`](./skills/redact-sensitive-content/SKILL.md) | 对图片或网页截图做区域选择、预览确认和打码校验 |
| [`uglify-webpage`](./skills/uglify-webpage/SKILL.md) | 在保留功能的前提下制作可控、可复现的反设计页面 |
| [`design-language-learning-plan`](./skills/design-language-learning-plan/SKILL.md) | 诊断语言学习瓶颈，制定可执行的英语或雅思训练方案 |

## 仓库结构

```text
skills/              可安装的 Codex Skills、参考资料和脚本
src/                 展厅及各个 React 复刻页面
public/assets/       Demo 使用的本地静态资源
evidence/reference/  参考页面截图
evidence/rendered/   实现截图与视觉比较材料
evidence/*ledger.md  差异、交互及部署验收记录
deploy/              静态部署配置示例
AGENTS.md            本项目的开发与验收规范
```

复刻任务的验收不止看 `lint` 和构建。应在相同视口核对布局、字体、颜色、图片裁切、交互中间态和移动端，并在修改后重新截图。差异记录示例见 [Avada 横幅](./evidence/avada-fidelity-ledger.md) 和 [TRAE 首页](./evidence/trae-fidelity-ledger.md)。

## 使用与版权边界

本项目用于网页实现技术研究、授权复刻和视觉回归验证。只采集公开或有权使用的内容，不绕过登录、付费墙、验证码或访问控制。参考站的商标、文案、字体、图片及其他素材权利仍归其权利人；公开展示本仓库不代表这些素材可被自由二次分发或商用。

当前仓库未附统一的开源许可证。若计划复用代码或公开发布自己的复刻成果，请先确认代码授权与所用第三方素材的使用范围。
