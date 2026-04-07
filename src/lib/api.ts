import { colaboradores, squads, type Colaborador } from '@/lib/data';
import type { ColaboradorFormData } from '@/lib/schemas/colaborador-schema';

const STORAGE_KEY = 'colaboradores-overrides';

type StoredColaborador = Colaborador;

function normalizeColaborador(colaborador: Colaborador): ColaboradorFormData {
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

function getStoredOverrides(): Record<string, StoredColaborador> {
  if (typeof window === 'undefined') {
    return {};
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw) as Record<string, StoredColaborador>;
  } catch {
    return {};
  }
}

function saveStoredOverrides(overrides: Record<string, StoredColaborador>) {
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

export async function getColaboradorById(id: string): Promise<ColaboradorFormData | null> {
  const baseColaborador = getBaseColaboradorById(id);

  if (!baseColaborador) {
    return null;
  }

  const overrides = getStoredOverrides();
  const colaborador = overrides[id] ?? baseColaborador;

  return normalizeColaborador(colaborador);
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
