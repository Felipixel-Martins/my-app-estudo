import { NextResponse } from 'next/server';

import { fetchCompleteGitHubData } from '@/lib/github/github-api';

interface RouteContext {
  params: Promise<{
    username: string;
  }>;
}

export async function GET(_: Request, { params }: RouteContext) {
  const { username } = await params;

  if (!username) {
    return NextResponse.json({ message: 'Username do GitHub nao informado.' }, { status: 400 });
  }

  try {
    const data = await fetchCompleteGitHubData(username);

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Erro inesperado ao buscar dados do GitHub.';

    return NextResponse.json({ message }, { status: 500 });
  }
}
