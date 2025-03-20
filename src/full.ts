import dotenv from 'dotenv';
import { getStarredRepositoriesWithTimes } from './service/github.js';
import { fullSyncRepositoriesToNotion } from './service/notion.js';

dotenv.config();

const TOKEN = process.env.TOKEN;
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
if (!TOKEN || !NOTION_TOKEN || !NOTION_DATABASE_ID) {
  throw new Error('Missing environment variables');
}

/**
 * Bootstrap function to sync data
 */
const bootstrap = async () => {
  // Get All Repository
  const repositories = await getStarredRepositoriesWithTimes();
  // Push to Notion
  await fullSyncRepositoriesToNotion({
    repositories: repositories,
    notionToken: NOTION_TOKEN,
    notionDatabaseId: NOTION_DATABASE_ID,
  });
};

await bootstrap();
