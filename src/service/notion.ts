import { Client } from '@notionhq/client';
import { NotionPushOption } from '../types/index.js';
import {
  CreatePageParameters,
  PageObjectResponse,
  UpdatePageParameters,
} from '@notionhq/client/build/src/api-endpoints.js';
import path from 'path';
import fs from 'fs/promises';
import { printProgress } from '../utils/progress.js';

/**
 * Fully sync all starred repositories to Notion database
 * @param option - Notion push option
 */
export const fullSyncRepositoriesToNotion = async (
  option: NotionPushOption,
) => {
  const notion = new Client({ auth: option.notionToken });
  if (!option.repositories) {
    throw new Error('No repositories provided');
  }

  // Query Notion existing pages
  const existingPages = await notion.databases.query({
    database_id: option.notionDatabaseId,
    filter: {
      property: 'Link', // Use Link
      url: { is_not_empty: true },
    },
  });

  // Save Set to quick query
  const existingUrls = new Set(
    existingPages.results
      .filter((page): page is PageObjectResponse => 'properties' in page)
      .map((page) => (page.properties.Link as { url?: string })?.url),
  );

  let index = 0;
  for (const repository of option.repositories) {
    const topics = repository.topics?.map((item) => ({ name: item })) || [];
    const parameters: CreatePageParameters = {
      parent: { database_id: option.notionDatabaseId },
      properties: {
        Name: {
          title: [
            { text: { content: repository.name || 'Unnamed Repository' } },
          ],
        },
        Link: { url: repository.html_url || null },
        HomePage: { url: repository.homepage || null },
        Stars: { number: repository.stargazers_count || 0 },
        Description: {
          rich_text: [{ text: { content: repository.description || '' } }],
        },
        Topics: { multi_select: topics },
        Language: {
          rich_text: [{ text: { content: repository.language || 'Unknown' } }],
        },
        License: {
          rich_text: [{ text: { content: repository.license?.name || '' } }],
        },
        StarTime: {
          date: repository.starred_at ? { start: repository.starred_at } : null,
        },
        LastUpdated: {
          date: repository.updated_at ? { start: repository.updated_at } : null,
        },
      },
    };

    try {
      if (repository.html_url && existingUrls.has(repository.html_url)) {
        const pageToUpdate = existingPages.results
          .filter((page): page is PageObjectResponse => 'properties' in page)
          .find(
            (page) =>
              (page.properties.Link as { url?: string })?.url ===
              repository.html_url,
          );
        if (pageToUpdate) {
          const updateParameters: UpdatePageParameters = {
            page_id: pageToUpdate.id,
            properties: parameters.properties,
          };
          await notion.pages.update(updateParameters);
        }
      } else {
        await notion.pages.create(parameters);
      }
      index++;
      printProgress(index, option.repositories.length, '全量');
    } catch (error) {
      console.error('Error syncing repository:', repository.name, error);
    }
  }
};

const LAST_SYNC_FILE = path.resolve(process.cwd(), 'last-sync.json');
/**
 * Incrementally sync new starred repositories to Notion database
 * @param option - Notion push option
 */
export const incrementalSyncRepositoriesToNotion = async (
  option: NotionPushOption,
) => {
  const notion = new Client({ auth: option.notionToken });
  if (!option.repositories) {
    throw new Error('No repositories provided');
  }

  // Query Notion existing pages
  const existingPages = await notion.databases.query({
    database_id: option.notionDatabaseId,
    filter: {
      property: 'Link', // Use Link
      url: { is_not_empty: true },
    },
  });
  // Save Set to quick query
  const existingUrls = new Set(
    existingPages.results
      .filter((page): page is PageObjectResponse => 'properties' in page)
      .map((page) => (page.properties.Link as { url?: string })?.url),
  );

  // Read last sync time
  let lastSyncTime: string | null = null;
  try {
    const lastSyncData = await fs.readFile(LAST_SYNC_FILE, {
      encoding: 'utf-8',
    });
    lastSyncTime = JSON.parse(lastSyncData).lastSyncTime;
  } catch (error) {
    console.log('No previous sync time found, treating as first sync.', error);
  }

  const currentSyncTime = new Date().toISOString();
  const newRepositories = lastSyncTime
    ? option.repositories.filter(
        (repo) =>
          repo.starred_at && new Date(repo.starred_at) > new Date(lastSyncTime),
      )
    : option.repositories;

  if (newRepositories.length === 0) {
    console.log('No new repositories to sync.');
    return;
  }

  let index = 0;
  for (const repository of newRepositories) {
    const topics = repository.topics?.map((item) => ({ name: item })) || [];
    const parameters: CreatePageParameters = {
      parent: { database_id: option.notionDatabaseId },
      properties: {
        Name: {
          title: [
            { text: { content: repository.name || 'Unnamed Repository' } },
          ],
        },
        Link: { url: repository.html_url || null },
        HomePage: { url: repository.homepage || null },
        Stars: { number: repository.stargazers_count || 0 },
        Description: {
          rich_text: [{ text: { content: repository.description || '' } }],
        },
        Topics: { multi_select: topics },
        Language: {
          rich_text: [{ text: { content: repository.language || 'Unknown' } }],
        },
        License: {
          rich_text: [{ text: { content: repository.license?.name || '' } }],
        },
        StarTime: {
          date: repository.starred_at ? { start: repository.starred_at } : null,
        },
        LastUpdated: {
          date: repository.updated_at ? { start: repository.updated_at } : null,
        },
      },
    };

    try {
      if (repository.html_url && existingUrls.has(repository.html_url)) {
        const pageToUpdate = existingPages.results
          .filter((page): page is PageObjectResponse => 'properties' in page)
          .find(
            (page) =>
              (page.properties.Link as { url?: string })?.url ===
              repository.html_url,
          );
        if (pageToUpdate) {
          const updateParameters: UpdatePageParameters = {
            page_id: pageToUpdate.id,
            properties: parameters.properties,
          };
          await notion.pages.update(updateParameters);
        }
      } else {
        await notion.pages.create(parameters);
        console.log('Synced New Repository to Notion:', repository.name);
      }
      index++;
      printProgress(index, option.repositories.length, '增量');
    } catch (error) {
      console.error('Error syncing repository:', repository.name, error);
    }
  }

  // Update last sync time
  await fs.writeFile(
    LAST_SYNC_FILE,
    JSON.stringify({ lastSyncTime: currentSyncTime }, null, 2),
    { encoding: 'utf-8' },
  );
  console.log('Updated last sync time:', currentSyncTime);
};
