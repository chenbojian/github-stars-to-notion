import { Endpoints } from '@octokit/types';

export type StarredRepository =
  Endpoints['GET /user/starred']['response']['data'][0];
export type StarredRepositoryWithTime = {
  repo: StarredRepository;
  starred_at: string;
};

/**
 * NotionPushOption
 */
export interface StartedRepositoryWithTime {
  repo: StarredRepository;
  starred_at: string;
}

/**
 * NotionPushOption
 */
export interface NotionPushOption {
  notionToken: string;
  notionDatabaseId: string;
  repositories: StarredRepository[];
}
