import { GitHubUser, GitHubRepo, GitHubError } from './types';

const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_ACCEPT = 'application/vnd.github+json';

export class GitHubAPIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'GitHubAPIError';
  }
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser | null> {
  if (!username || username.trim() === '') {
    return null;
  }

  try {
    const headers: HeadersInit = {
      Accept: GITHUB_ACCEPT,
      'X-GitHub-Api-Version': '2022-11-28',
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
      headers,
      next: {
        revalidate: 3600,
      },
    });

    if (response.status === 404) {
      return null; // Usuário não encontrado
    }

    if (!response.ok) {
      const error: GitHubError = await response.json();
      throw new GitHubAPIError(response.status, error.message);
    }

    const user: GitHubUser = await response.json();
    return user;
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new Error(`Erro ao buscar usuario do GitHub: ${error.message}`);
    }

    throw new Error('Erro ao buscar usuario do GitHub.');
  }
}

export async function fetchGitHubRepos(username: string, limit: number = 5): Promise<GitHubRepo[]> {
  if (!username || username.trim() === '') {
    return [];
  }

  try {
    const headers: HeadersInit = {
      Accept: GITHUB_ACCEPT,
      'X-GitHub-Api-Version': '2022-11-28',
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=${limit}`,
      {
        headers,
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {
      const error: GitHubError = await response.json();
      throw new GitHubAPIError(response.status, error.message);
    }

    const repos: GitHubRepo[] = await response.json();
    return repos;
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    console.error('Erro ao buscar repositórios:', error);
    return []; // Retorna array vazio em caso de erro, não quebra a página
  }
}

// Função para buscar dados completos (usuário + repositórios)
export async function fetchCompleteGitHubData(username: string) {
  if (!username || username.trim() === '') {
    return { user: null, repos: [] };
  }

  try {
    const [user, repos] = await Promise.all([
      fetchGitHubUser(username),
      fetchGitHubRepos(username)
    ]);

    return { user, repos };
  } catch (error) {
    console.error('Erro ao buscar dados do GitHub:', error);
    return { user: null, repos: [] };
  }
}

export async function fetchGitHubDataForClient(username: string) {
  if (!username || username.trim() === '') {
    return { user: null, repos: [] as GitHubRepo[] };
  }

  const response = await fetch(`/api/github/${encodeURIComponent(username)}`);
  const data = (await response.json()) as
    | { user: GitHubUser | null; repos: GitHubRepo[] }
    | { message?: string };

  if (!response.ok) {
    throw new Error('message' in data && data.message ? data.message : 'Erro ao buscar dados do GitHub.');
  }

  return data;
}
