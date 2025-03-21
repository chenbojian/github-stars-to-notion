
---

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
- **进度跟踪**：在同步过程中记录详细的日志以便更好地查看同步状态。

---

## 前置条件

在使用此工具之前，请确保你已具备以下条件：

1. **GitHub 个人访问令牌**：
   - 在 [GitHub 开发者设置](https://github.com/settings/tokens) 中生成一个具有 `repo` 权限的令牌。
   - **生成 Token 的步骤**：
      1. 登录 GitHub，进入 [Personal Access Tokens](https://github.com/settings/tokens) 页面。
      2. 点击 **"Generate new token"** 按钮。
      3. 选择 `repo` 范围并生成 Token。
      4. 复制生成的 Token 并妥善保存，后续需要将其添加到环境变量中。

2. **Notion 集成令牌**：
   - 创建一个 Notion 集成并从 [Notion 开发者页面](https://www.notion.so/my-integrations) 获取令牌。
   - **创建 Notion 集成的步骤**：
      1. 登录 Notion，进入 [My Integrations](https://www.notion.so/my-integrations) 页面。
      2. 点击 **"New Integration"** 按钮，填写相关信息（如名称、工作区等）。
      3. 创建完成后，复制生成的 Integration Token。

3. **Notion 数据库 ID**：
   - 在 Notion 中创建一个数据库，并将其与你的集成共享。
   - **获取数据库 ID 的方法**：
      1. 打开你的 Notion 数据库页面。
      2. 查看 URL 地址，格式通常为 `https://www.notion.so/{workspace_name}/{database_id}?v={view_id}`。
      3. 提取 `{database_id}` 部分作为数据库 ID。

4. **Node.js**：
   - 确保你的机器上安装了 [Node.js](https://nodejs.org/)（推荐 v16 或更高版本）。
   - 如果尚未安装，可以从 [Node.js 官网](https://nodejs.org/) 下载并安装。

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
   - 在项目根目录下创建一个 `.env` 文件，并添加以下内容：
     ```env
     TOKEN=你的_github_个人访问令牌
     NOTION_TOKEN=你的_notion_集成令牌
     NOTION_DATABASE_ID=你的_notion_数据库_id
     ```
   - 替换上述占位符为你自己的 Token 和数据库 ID。

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

通过 GitHub Actions，你可以轻松实现自动化同步。以下是详细的配置和使用步骤：

---

#### **第一步：Fork 项目**

1. 访问本项目的 GitHub 页面: [github-stars-to-notion](https://github.com/OnlyTL/github-stars-to-notion)。
2. 点击右上角的 **"Fork"** 按钮，将项目复制到你的 GitHub 账户中。

---

#### **第二步：配置环境变量 (Settings 中添加 Secrets)**

1. 进入你 Fork 的项目页面。
2. 点击顶部导航栏中的 **"Settings"**。
3. 在左侧菜单中选择 **"Secrets and variables" > "Actions"**。
4. 点击 **"New repository secret"** 按钮，添加以下三个 Secrets：

   - `TOKEN`:
      - 填写你的 GitHub Personal Access Token（需包含 `repo` 权限）。
      - 如何生成 Token？请参考 [GitHub Developer Settings](https://github.com/settings/tokens)。

   - `NOTION_TOKEN`:
      - 填写你的 Notion Integration Token。
      - 如何生成 Token？请参考 [Notion Developers](https://www.notion.so/my-integrations)。

   - `NOTION_DATABASE_ID`:
      - 填写你的 Notion 数据库 ID。
      - 如果你使用的是预定义模板，请按照 [选项 1: 使用预定义的数据库模板](#选项-1-使用预定义的数据库模板) 配置数据库，并从 URL 中提取数据库 ID。

5. 确保所有 Secrets 都已正确添加并保存。

---

#### **第三步：创建或配置 Notion 数据库**

##### **选项 1：使用预定义的 Notion 数据库模板**
1. 打开 [Notion 数据库模板](https://evanescent-ballcap-fcf.notion.site/1bc54d7a9d5d804384e8f97a64f42f9d?v=1bc54d7a9d5d81229169000cd251dd11&pvs=4)。
2. 点击页面右上角的 **"Duplicate"** 按钮，将模板复制到你的 Notion 工作区。
3. 在 Notion 数据库页面中，点击 **"Share"** 按钮，确保将数据库与你的 Notion Integration 关联。
4. 从数据库 URL 中提取数据库 ID，并将其填写为 `NOTION_DATABASE_ID` Secret。

##### **选项 2：手动创建 Notion 数据库**
如果你希望自定义数据库结构，请确保数据库包含以下字段及其类型：

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

完成数据库创建后，同样需要将其与 Notion Integration 关联，并提取数据库 ID。

---

#### **第四步：触发 GitHub Actions 同步**

1. **查看默认工作流配置**：
   - 项目中已经预定义了两个 GitHub Actions 工作流文件：
      - `.github/workflows/full-sync.yml`: 全量同步，每天凌晨 2 点 UTC 触发。
      - `.github/workflows/incremental-sync.yml`: 增量同步，每小时触发一次。
   - 你可以根据需求修改这些文件的时间触发规则。

2. **手动触发同步**：
   - 进入你 Fork 的项目页面。
   - 点击顶部导航栏中的 **"Actions"**。
   - 在左侧选择对应的工作流（例如 `Full Sync` 或 `Incremental Sync`）。
   - 点击右侧的 **"Run workflow"** 按钮，手动触发同步任务。

3. **查看同步日志**：
   - 每次运行完成后，你可以在 GitHub Actions 页面查看详细的运行日志。
   - 如果同步失败，日志会显示错误信息，你可以根据提示进行排查。

---

#### **第五步：验证同步结果**

1. 打开你的 Notion 数据库页面，检查是否成功同步了 GitHub 星标仓库数据。
2. 如果是增量同步，仅新增的星标仓库会被同步到数据库中。

---

### 注意事项

- **Token 权限**: 确保你的 GitHub Token 和 Notion Token 具有足够的权限，否则可能导致同步失败。
- **数据库共享**: 确保你的 Notion 数据库已正确共享给 Notion Integration，否则脚本无法写入数据。
- **时间触发规则**: 如果你希望调整同步频率，可以编辑 `.github/workflows/*.yml` 文件中的 `schedule` 字段。例如：
  ```yaml
  schedule:
    - cron: '0 * * * *'  # 每小时触发一次
  ```
  更多关于 Cron 表达式的说明，请参考 [GitHub Actions 文档](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule)。

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
