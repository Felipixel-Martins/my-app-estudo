import { colaboradores, squads, type Colaborador } from '@/lib/data';
import type { ColaboradorFormData } from '@/lib/schemas/colaborador-schema';

const STORAGE_KEY = 'colaboradores-overrides';

export type ColaboradorDetail = Colaborador;

function getStoredOverrides(): Record<string, Colaborador> {
  if (typeof window === 'undefined') {
    return {};
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw) as Record<string, Colaborador>;
  } catch {
    return {};
  }
}

function saveStoredOverrides(overrides: Record<string, Colaborador>) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

function getBaseColaboradorById(id: string) {
  const colaboradorId = Number(id);

  if (!Number.isFinite(colaboradorId)) {
    return undefined;
  }

  return colaboradores.find((colaborador) => colaborador.id === colaboradorId);
}

function getResolvedColaborador(id: string): Colaborador | null {
  const baseColaborador = getBaseColaboradorById(id);

  if (!baseColaborador) {
    return null;
  }

  const overrides = getStoredOverrides();

  return overrides[id] ?? baseColaborador;
}

function normalizeColaboradorToFormData(colaborador: Colaborador): ColaboradorFormData {
  return {
    nome: colaborador.nome,
    cargo: colaborador.cargo,
    squadId: String(colaborador.squadId ?? ''),
    senioridade: colaborador.senioridade,
    localizacao: colaborador.localizacao ?? '',
    bio: colaborador.bio ?? '',
    skills: colaborador.skills,
    status: colaborador.status,
    githubUsername: colaborador.githubUsername ?? '',
  };
}

export async function getColaboradorById(id: string): Promise<ColaboradorDetail | null> {
  return getResolvedColaborador(id);
}

export async function getColaboradorFormDataById(
  id: string
): Promise<ColaboradorFormData | null> {
  const colaborador = getResolvedColaborador(id);

  if (!colaborador) {
    return null;
  }

  return normalizeColaboradorToFormData(colaborador);
}

export async function updateColaborador(id: string, data: ColaboradorFormData): Promise<void> {
  const baseColaborador = getBaseColaboradorById(id);

  if (!baseColaborador) {
    throw new Error('Colaborador nao encontrado');
  }

  const squadId = Number(data.squadId);
  const squadExists = squads.some((squad) => squad.id === squadId);
  const overrides = getStoredOverrides();

  overrides[id] = {
    ...baseColaborador,
    nome: data.nome,
    cargo: data.cargo,
    squadId: squadExists ? squadId : baseColaborador.squadId,
    senioridade: data.senioridade,
    localizacao: data.localizacao || undefined,
    bio: data.bio || '',
    skills: data.skills,
    status: data.status,
    githubUsername: data.githubUsername || undefined,
  };

  saveStoredOverrides(overrides);
}
