import { colaboradores, squads, getResumoEstatisticas } from '@/lib/data';

function getUniqueSquads() {
  return squads.filter(
    (squad, index, list) => list.findIndex((item) => item.id === squad.id) === index
  );
}

function getTopSkills() {
  const skillCount = colaboradores.reduce<Record<string, number>>((acc, colaborador) => {
    colaborador.skills.forEach((skill) => {
      acc[skill] = (acc[skill] ?? 0) + 1;
    });

    return acc;
  }, {});

  return Object.entries(skillCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
}

export default function RelatoriosPage() {
  const resumo = getResumoEstatisticas();
  const uniqueSquads = getUniqueSquads();
  const topSkills = getTopSkills();

  const statusCards = [
    {
      label: 'Colaboradores ativos',
      value: resumo.colaboradoresAtivos,
      accent: 'bg-emerald-500',
      tone: 'text-emerald-700',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Colaboradores ausentes',
      value: resumo.colaboradoresAusentes,
      accent: 'bg-amber-500',
      tone: 'text-amber-700',
      bg: 'bg-amber-50',
    },
  ];

  const senioridadeItems = [
    { label: 'Junior', value: resumo.senioridade.junior, color: 'bg-sky-500' },
    { label: 'Pleno', value: resumo.senioridade.pleno, color: 'bg-violet-500' },
    { label: 'Senior', value: resumo.senioridade.senior, color: 'bg-rose-500' },
  ];

  const maxSenioridade = Math.max(...senioridadeItems.map((item) => item.value), 1);

  const squadRows = uniqueSquads.map((squad) => {
    const membros = colaboradores.filter((colaborador) => colaborador.squadId === squad.id);
    const percentual = Math.round((membros.length / Math.max(colaboradores.length, 1)) * 100);

    return {
      id: squad.id,
      nome: squad.nome,
      membros: membros.length,
      stack: squad.stack.slice(0, 3).join(' • '),
      percentual,
    };
  });

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-slate-900 p-8 text-white shadow-lg">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-slate-200">
              Visao geral da equipe
            </span>
            <h1 className="text-3xl font-bold tracking-tight">Relatorios operacionais</h1>
            <p className="text-sm leading-6 text-slate-300 md:text-base">
              Acompanhe a distribuicao do time, senioridade, ocupacao por squad e as
              tecnologias mais recorrentes no diretorio.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:w-[28rem] xl:flex-none">
            <div className="min-w-0 rounded-2xl bg-white/10 p-4 backdrop-blur">
              <p className="text-sm leading-5 text-slate-300">Colaboradores</p>
              <p className="mt-2 text-3xl font-semibold">{resumo.totalColaboradores}</p>
            </div>
            <div className="min-w-0 rounded-2xl bg-white/10 p-4 backdrop-blur">
              <p className="text-sm leading-5 text-slate-300">Squads</p>
              <p className="mt-2 text-3xl font-semibold">{uniqueSquads.length}</p>
            </div>
            <div className="min-w-0 rounded-2xl bg-white/10 p-4 backdrop-blur">
              <p className="text-sm leading-5 text-slate-300">Skills mapeadas</p>
              <p className="mt-2 text-3xl font-semibold">{topSkills.length}</p>
            </div>
            <div className="min-w-0 rounded-2xl bg-white/10 p-4 backdrop-blur">
              <p className="text-sm leading-5 text-slate-300">Presenca</p>
              <p className="mt-2 text-3xl font-semibold">
                {Math.round((resumo.colaboradoresAtivos / Math.max(resumo.totalColaboradores, 1)) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Senioridade do time</h2>
              <p className="text-sm text-slate-500">
                Distribuicao atual entre perfis de entrada, plenos e seniores.
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Atualizado pelos dados locais
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {senioridadeItems.map((item) => {
              const width = `${(item.value / maxSenioridade) * 100}%`;

              return (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{item.label}</span>
                    <span className="text-slate-500">{item.value} colaboradores</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100">
                    <div className={`h-3 rounded-full ${item.color}`} style={{ width }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6">
          {statusCards.map((card) => (
            <article
              key={card.label}
              className={`rounded-3xl p-6 shadow-sm ring-1 ring-slate-200 ${card.bg}`}
            >
              <div className="flex items-center gap-3">
                <span className={`h-3 w-3 rounded-full ${card.accent}`} />
                <p className="text-sm font-medium text-slate-600">{card.label}</p>
              </div>
              <p className={`mt-4 text-4xl font-bold ${card.tone}`}>{card.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Ocupacao por squad</h2>
              <p className="text-sm text-slate-500">
                Quantidade de membros vinculados em cada frente.
              </p>
            </div>
            <span className="text-xs text-slate-400">Base atual do diretorio</span>
          </div>

          <div className="mt-6 space-y-4">
            {squadRows.map((squad) => (
              <div key={squad.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">{squad.nome}</h3>
                    <p className="text-sm text-slate-500">{squad.stack}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-2xl font-bold text-slate-900">{squad.membros}</p>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      {squad.percentual}% da equipe
                    </p>
                  </div>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-slate-900"
                    style={{ width: `${Math.max(squad.percentual, 8)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Skills em destaque</h2>
          <p className="mt-1 text-sm text-slate-500">
            Tecnologias e competencias mais presentes entre os colaboradores.
          </p>

          <div className="mt-6 space-y-3">
            {topSkills.map(([skill, count], index) => (
              <div
                key={skill}
                className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="font-medium text-slate-800">{skill}</span>
                </div>
                <span className="text-sm text-slate-500">{count} perfis</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
