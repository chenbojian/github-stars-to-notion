# GitHub Stars to Notion

[![English](https://img.shields.io/badge/Language-English-blue)](README.md) [![中文](https://img.shields.io/badge/Language-中文-red)](README-zh.md)

[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)

一个工具，可以自动将你在 GitHub 上标星的仓库同步到 Notion 数据库。该项目支持 **全量同步**（同步所有标星仓库）和 **增量同步**（仅同步上次同步后新标星的仓库）。

---

## 功能特性

- **全量同步**：将你在 GitHub 上所有标星的仓库同步到 Notion 数据库。
- **增量同步**：仅同步自上次同步以来新标星的仓库，节省时间和资源。
- **自动化工作流**：通过 GitHub Actions 自动运行同步任务。
- **高度可配置**：轻松配置脚本以匹配你的 Notion 数据库结构。
- **进度跟踪**：在同步过程中记录进度以便更好地查看。

---

## 前置条件

在使用此工具之前，请确保你已具备以下条件：

1. **GitHub 个人访问令牌**：
    - 在 [GitHub 开发者设置](https://github.com/settings/tokens) 中生成一个具有 `repo` 权限的令牌。
2. **Notion 集成令牌**：
    - 创建一个 Notion 集成并从 [Notion 开发者页面](https://www.notion.so/my-integrations) 获取令牌。
3. **Notion 数据库 ID**：
    - 在 Notion 中创建一个数据库，并将其与你的集成共享。从 URL 中提取数据库 ID。
4. **Node.js**：
    - 确保你的机器上安装了 [Node.js](https://nodejs.org/)（推荐 v16 或更高版本）。

---

## 安装

1. 克隆仓库：
   ```bash
   git clone https://github.com/your-username/github-stars-to-notion.git
   cd github-stars-to-notion
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 设置环境变量：
    - 在根目录下创建一个 `.env` 文件，并添加以下内容：
      ```env
      TOKEN=你的_github_个人访问令牌
      NOTION_TOKEN=你的_notion_集成令牌
      NOTION_DATABASE_ID=你的_notion_数据库_id
      ```

---

## 使用方法

### 手动执行

1. **全量同步**：
   运行全量同步脚本以同步所有标星的仓库：
   ```bash
   npm run full-sync
   ```

2. **增量同步**：
   运行增量同步脚本以仅同步新标星的仓库：
   ```bash
   npm run incremental-sync
   ```

### 使用 GitHub Actions 自动执行

该项目包含用于自动同步的 GitHub Actions 工作流：

1. **全量同步工作流**：
    - 默认每天凌晨 2 点 UTC 运行。
    - 你可以从 GitHub Actions 标签页手动触发它。

2. **增量同步工作流**：
    - 默认每小时运行一次。
    - 你可以从 GitHub Actions 标签页手动触发它。

要设置 GitHub Actions：
1. 进入你的仓库 **Settings > Secrets and variables > Actions**。
2. 添加以下 secrets：
    - `TOKEN`: 你的 GitHub 个人访问令牌。
    - `NOTION_TOKEN`: 你的 Notion 集成令牌。
    - `NOTION_DATABASE_ID`: 你的 Notion 数据库 ID。

---

## 配置

### 选项 1：使用预定义的数据库模板

我们提供了一个现成的 Notion 数据库模板，你可以快速复制并集成到你的工作区。按照以下步骤操作：

1. **复制模板**：
    - 打开 [Notion 数据库模板](https://evanescent-ballcap-fcf.notion.site/1bc54d7a9d5d804384e8f97a64f42f9d?v=1bc54d7a9d5d81229169000cd251dd11&pvs=4)。
    - 点击页面右上角的 "Duplicate" 按钮。
    - 复制的数据库将被添加到你的 Notion 工作区。

2. **与你的集成共享**：
    - 将复制的数据库与你的 Notion 集成共享。
    - 从 URL 中复制数据库 ID 并将其粘贴到 `.env` 文件中作为 `NOTION_DATABASE_ID`。

3. **开始同步**：
    - 按照 [使用方法](#使用方法) 部分描述的步骤运行同步脚本。

### 选项 2：创建自己的数据库

如果你更喜欢创建自己的数据库，请确保它具有以下属性：

| 属性名称       | 类型           | 描述                                      |
|----------------|----------------|------------------------------------------|
| 名称           | 标题           | 仓库名称                                  |
| 链接           | URL            | 仓库链接                                  |
| 主页           | URL            | 仓库主页                                  |
| 星标数         | 数字           | 星标数量                                  |
| 描述           | 富文本         | 仓库描述                                  |
| 主题           | 多选           | 仓库主题                                  |
| 语言           | 富文本         | 主要编程语言                              |
| 许可证         | 富文本         | 仓库许可证                                |
| 标星时间       | 日期           | 标星时间                                  |
| 最后更新时间   | 日期           | 仓库最后更新时间                          |

创建数据库后，将其与你的 Notion 集成共享，并提取数据库 ID 以用于 `.env` 文件。

---

## 工作原理

1. **获取数据**：
    - 脚本通过 GitHub API 获取你在 GitHub 上标星的仓库。
    - 对于增量同步，它会将 `starred_at` 时间戳与存储在 `last-sync.json` 中的上次同步时间进行比较。

2. **推送数据到 Notion**：
    - 脚本在你的 Notion 数据库中为每个仓库创建新页面。
    - 它将仓库详情（如名称、描述、主题）映射到相应的 Notion 属性。

3. **跟踪上次同步**：
    - `last-sync.json` 文件存储最后一次成功同步的时间戳。
    - 该文件通过 GitHub Actions 缓存或远程存储（例如 GitHub Gist）持久化。

---

## 贡献

欢迎贡献！请遵循以下步骤：

1. Fork 仓库。
2. 为你的功能或修复创建一个新分支。
3. 提交更改并打开 Pull Request。
4. 确保你的代码符合项目的编码标准。

对于重大更改，请先在 [GitHub Issues](https://github.com/OnlyTL/github-stars-to-notion/issues) 中讨论你的想法。

---

## 许可证

本项目采用 [MIT 许可证](LICENSE)。

---

## 支持

如果你遇到任何问题或有任何疑问，请随时在 [GitHub Issues](https://github.com/OnlyTL/github-stars-to-notion/issues) 中提交问题。

---

## 致谢

- [GitHub REST API](https://docs.github.com/en/rest)
- [Notion API](https://developers.notion.com/)
- [GitHub Actions](https://docs.github.com/en/actions)

Happy syncing! 🚀