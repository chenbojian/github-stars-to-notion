# GitHub Stars to Notion

[![English](https://img.shields.io/badge/Language-English-blue)](README.md) [![中文](https://img.shields.io/badge/Language-中文-red)](README-zh.md)

[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)

A tool to automatically sync your GitHub starred repositories to a Notion database. This project supports both **full synchronization** (syncing all starred repositories) and **incremental synchronization** (syncing only newly starred repositories since the last sync).

---

## Features

- **Full Sync**: Syncs all your GitHub starred repositories to a Notion database.
- **Incremental Sync**: Only syncs newly starred repositories since the last sync, saving time and resources.
- **Automated Workflow**: Automatically runs sync tasks using GitHub Actions.
- **Customizable**: Easily configure the script to match your Notion database schema.
- **Progress Tracking**: Logs progress during the sync process for better visibility.

---

## Prerequisites

Before using this tool, ensure you have the following:

1. **GitHub Personal Access Token**:
   - Generate a token with the `repo` scope from [GitHub Developer Settings](https://github.com/settings/tokens).
2. **Notion Integration Token**:
   - Create a Notion integration and obtain the token from [Notion Developers](https://www.notion.so/my-integrations).
3. **Notion Database ID**:
   - Create a database in Notion and share it with your integration. Extract the database ID from the URL.
4. **Node.js**:
   - Ensure you have [Node.js](https://nodejs.org/) installed on your machine (v16 or higher recommended).

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/github-stars-to-notion.git
   cd github-stars-to-notion
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add the following:
     ```env
     TOKEN=your_github_personal_access_token
     NOTION_TOKEN=your_notion_integration_token
     NOTION_DATABASE_ID=your_notion_database_id
     ```
---

## Usage

### Manual Execution

1. **Full Sync**:
   Run the full sync script to sync all starred repositories:
   ```bash
   npm run full-sync
   ```

2. **Incremental Sync**:
   Run the incremental sync script to sync only new starred repositories:
   ```bash
   npm run incremental-sync
   ```

### Automated Execution with GitHub Actions

This project includes GitHub Actions workflows for automated syncing:

1. **Full Sync Workflow**:
   - Runs daily at 2 AM UTC by default.
   - You can manually trigger it from the GitHub Actions tab.

2. **Incremental Sync Workflow**:
   - Runs hourly by default.
   - You can manually trigger it from the GitHub Actions tab.

To set up GitHub Actions:
1. Go to your repository's **Settings > Secrets and variables > Actions**.
2. Add the following secrets:
   - `TOKEN`: Your GitHub Personal Access Token.
   - `NOTION_TOKEN`: Your Notion Integration Token.
   - `NOTION_DATABASE_ID`: Your Notion Database ID.

---

## Configuration

### Option 1: Use the Predefined Database Template

We provide a ready-to-use Notion database template that you can quickly duplicate and integrate into your workspace. Follow these steps:

1. **Duplicate the Template**:
   - Open the [Notion Database Template](https://evanescent-ballcap-fcf.notion.site/1bc54d7a9d5d804384e8f97a64f42f9d?v=1bc54d7a9d5d81229169000cd251dd11&pvs=4).
   - Click the "Duplicate" button in the top-right corner of the page.
   - The duplicated database will be added to your Notion workspace.

2. **Share with Your Integration**:
   - Share the duplicated database with your Notion integration.
   - Copy the database ID from the URL and paste it into your `.env` file as `NOTION_DATABASE_ID`.

3. **Start Syncing**:
   - Run the sync script as described in the [Usage](#usage) section.

### Option 2: Create Your Own Database

If you prefer to create your own database, ensure it has the following properties:

| Property Name   | Type           | Description                                      |
|------------------|----------------|--------------------------------------------------|
| Name             | Title          | Repository name                                  |
| Link             | URL            | Repository URL                                   |
| HomePage         | URL            | Repository homepage                              |
| Stars            | Number         | Number of stars                                  |
| Description      | Rich Text      | Repository description                           |
| Topics           | Multi-select   | Repository topics                                |
| Language         | Rich Text      | Primary programming language                     |
| License          | Rich Text      | Repository license                               |
| StarTime         | Date           | Time when the repository was starred            |
| LastUpdated      | Date           | Last updated time of the repository              |

After creating the database, share it with your Notion integration and extract the database ID to use in the `.env` file.

---

## How It Works

1. **Fetching Data**:
   - The script fetches your starred repositories from GitHub using the GitHub API.
   - For incremental sync, it compares the `starred_at` timestamp with the last sync time stored in `last-sync.json`.

2. **Pushing Data to Notion**:
   - The script creates new pages in your Notion database for each repository.
   - It maps repository details (e.g., name, description, topics) to the corresponding Notion properties.

3. **Tracking Last Sync**:
   - The `last-sync.json` file stores the timestamp of the last successful sync.
   - This file is persisted using GitHub Actions caching or remote storage (e.g., GitHub Gist).

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and open a pull request.
4. Ensure your code adheres to the project's coding standards.

For major changes, please open an issue first to discuss your ideas.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Support

If you encounter any issues or have questions, feel free to open an issue in the [GitHub Issues](https://github.com/OnlyTL/github-stars-to-notion/issues) section.

---

## Acknowledgments

- [GitHub REST API](https://docs.github.com/en/rest)
- [Notion API](https://developers.notion.com/)
- [GitHub Actions](https://docs.github.com/en/actions)

---

Happy syncing! 🚀