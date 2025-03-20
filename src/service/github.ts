import { Octokit } from '@octokit/rest';
import {
  StarredRepository,
  StarredRepositoryWithTime,
} from '../types/index.js';
import { GITHUB_API_VERSION } from '../constant/index.js';

/**
 * Get all repositories that the authenticated user has starred
 * @returns StarredRepository[] - All repositories that the authenticated user has starred
 */
export const getStaredRepositories = async (): Promise<StarredRepository[]> => {
  const octokit = new Octokit({
    auth: process.env.TOKEN,
  });
  return await octokit.paginate(
    octokit.rest.activity.listReposStarredByAuthenticatedUser,
    {
      per_page: 100,
      direction: 'asc',
      headers: {
        'X-GitHub-Api-Version': GITHUB_API_VERSION,
      },
    },
  );
};

/**
 * Get the starred repository star time
 */
export const getStarredRepositoriesStarTime = async () => {
  const octokit = new Octokit({
    auth: process.env.TOKEN,
  });
  return await octokit.paginate(
    octokit.rest.activity.listReposStarredByAuthenticatedUser,
    {
      per_page: 100,
      direction: 'asc',
      headers: {
        'X-GitHub-Api-Version': GITHUB_API_VERSION,
        Accept: 'application/vnd.github.v3.star+json',
      },
    },
  );
};

/**
 * Get starred repositories with star time merged
 * @returns StarredRepository[] - Merged repository data including starred_at times
 */
export const getStarredRepositoriesWithTimes = async (): Promise<
  StarredRepository[]
> => {
  // Fetch basic repository information
  const basicRepos = await getStaredRepositories();

  // Fetch repository information with star times
  const starredRepos =
    (await getStarredRepositoriesStarTime()) as unknown as StarredRepositoryWithTime[];

  // Create a Map to store star times, with repository id as the key
  const starTimeMap = new Map<number, string>();
  starredRepos.forEach((repo) => {
    if (repo.starred_at && repo.repo?.id) {
      starTimeMap.set(repo.repo.id, repo.starred_at);
    }
  });

  // Merge star times into the basic repository information
  return basicRepos.map((repo) => ({
    ...repo,
    starred_at: repo.id ? starTimeMap.get(repo.id) : undefined,
  })) as StarredRepository[];
};
