
---

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

---

### Automated Execution with GitHub Actions

This project includes GitHub Actions workflows for automated syncing. Follow these steps to set it up:

---

#### **Step 1: Fork the Repository**

1. Visit the project's GitHub page: [github-stars-to-notion](https://github.com/OnlyTL/github-stars-to-notion).
2. Click the **"Fork"** button in the top-right corner to create a copy of the repository under your GitHub account.

---

#### **Step 2: Configure Secrets in GitHub Settings**

1. Go to your forked repository on GitHub.
2. Navigate to **Settings > Secrets and variables > Actions**.
3. Add the following secrets:
   - `TOKEN`:
      - Your GitHub Personal Access Token (requires `repo` scope).
      - Generate one from [GitHub Developer Settings](https://github.com/settings/tokens).

   - `NOTION_TOKEN`:
      - Your Notion Integration Token.
      - Generate one from [Notion Developers](https://www.notion.so/my-integrations).

   - `NOTION_DATABASE_ID`:
      - The ID of your Notion database.
      - If using the predefined template, follow the instructions below to extract the database ID.

---

#### **Step 3: Create or Configure the Notion Database**

##### **Option 1: Use the Predefined Database Template**
1. Open the [Notion Database Template](https://evanescent-ballcap-fcf.notion.site/1bc54d7a9d5d804384e8f97a64f42f9d?v=1bc54d7a9d5d81229169000cd251dd11&pvs=4).
2. Click the **"Duplicate"** button in the top-right corner to copy the template into your Notion workspace.
3. Share the duplicated database with your Notion integration by clicking the **"Share"** button and adding your integration.
4. Extract the database ID from the URL and use it as the value for `NOTION_DATABASE_ID`.

##### **Option 2: Create Your Own Database**
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

After creating the database, share it with your Notion integration and extract the database ID.

---

#### **Step 4: Trigger GitHub Actions Sync**

1. **Review Default Workflow Configuration**:
   - The project includes two predefined GitHub Actions workflow files:
      - `.github/workflows/full-sync.yml`: Full sync, triggered daily at 2 AM UTC.
      - `.github/workflows/incremental-sync.yml`: Incremental sync, triggered hourly.
   - You can modify these files to adjust the schedule if needed.

2. **Manually Trigger Sync**:
   - Go to the **Actions** tab in your forked repository.
   - Select the desired workflow (`Full Sync` or `Incremental Sync`) from the left-hand menu.
   - Click the **"Run workflow"** button to manually trigger the sync task.

3. **View Sync Logs**:
   - After each run, you can view detailed logs in the GitHub Actions tab.
   - If the sync fails, the logs will provide error messages to help troubleshoot.

---

#### **Step 5: Verify Sync Results**

1. Open your Notion database and verify that the GitHub starred repositories have been synced successfully.
2. For incremental sync, only newly starred repositories since the last sync will be added to the database.

---

### Important Notes

- **Token Permissions**: Ensure your GitHub Token and Notion Token have sufficient permissions; otherwise, the sync may fail.
- **Database Sharing**: Ensure your Notion database is shared with the Notion Integration; otherwise, the script cannot write data.
- **Cron Schedule**: If you want to adjust the sync frequency, edit the `schedule` field in `.github/workflows/*.yml`. For example:
  ```yaml
  schedule:
    - cron: '0 * * * *'  # Triggers every hour
  ```
  Refer to the [GitHub Actions Documentation](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule) for more details about Cron expressions.

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
