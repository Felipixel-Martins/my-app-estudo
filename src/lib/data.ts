// Tipos TypeScript para nossos dados
export interface Colaborador {
    id: number;
    nome: string;
    cargo: string;
    avatarUrl: string;
    squadId: number | null;
    email: string;
    status: 'Ativo' | 'Ausente';
    senioridade: 'Junior' | 'Pleno' | 'Senior';
    bio: string;
    skills: string[];
    githubUsername?: string; // opcional, para integração futura
    localizacao?: string;
    dataAdmissao?: string;
    telefone?: string
  }
  
export interface Squad {
  id: number;
  nome: string;
  descricao: string;
  stack: string[];
  email?: string;
  liderId: number; // ID do colaborador que lidera
}
  
  // Dados de colaboradores
  export const colaboradores: Colaborador[] = [
    {
      id: 1,
      nome: "Ana Clara Souza",
      cargo: "Desenvolvedora Frontend Pleno",
      avatarUrl: "https://i.pravatar.cc/300?img=1",
      squadId: 1,
      email: "ana.souza@empresa.com",
      status: "Ativo",
      senioridade: "Pleno",
      bio: "Apaixonada por UI/UX e React. Trabalha para criar interfaces acessíveis e performáticas. Nos tempos livres, contribui para projetos open source.",
      skills: ["React", "TypeScript", "Tailwind CSS", "Figma", "Next.js"],
      githubUsername: "anaclarasouza",
      localizacao: "São Paulo, SP",
      dataAdmissao: "15/03/2022",
      telefone: "(11) 98765-4321",
    },
    {
      id: 2,
      nome: "Carlos Eduardo Lima",
      cargo: "Desenvolvedor Backend Sênior",
      avatarUrl: "https://i.pravatar.cc/300?img=8",
      squadId: 2,
      email: "carlos.lima@empresa.com",
      status: "Ativo",
      senioridade: "Senior",
      bio: "Especialista em arquitetura de microsserviços e bancos de dados. Mentor de novos desenvolvedores.",
      skills: ["Node.js", "Python", "PostgreSQL", "AWS", "Docker"],
      githubUsername: "carloseduardo",
      localizacao: "São Paulo, SP",
      dataAdmissao: "15/03/2020",
      telefone: "(11) 98765-1234",
    },
    {
      id: 3,
      nome: "Fernanda Oliveira",
      cargo: "UX/UI Designer",
      avatarUrl: "https://i.pravatar.cc/300?img=5",
      squadId: 1,
      email: "fernanda.oliveira@empresa.com",
      status: "Ativo",
      senioridade: "Pleno",
      bio: "Designer focada em criar experiências intuitivas e centradas no usuário. Especialista em pesquisa e prototipagem.",
      skills: ["Figma", "User Research", "Prototyping", "Design System", "Adobe XD"],
      githubUsername: "fernandaoliveira",
      localizacao: "Santa Catarina, SC",
      dataAdmissao: "15/01/2022",
      telefone: "(47) 98365-4321",
    },
    {
      id: 4,
      nome: "Roberto Alves",
      cargo: "DevOps Engineer",
      avatarUrl: "https://i.pravatar.cc/300?img=12",
      squadId: 3,
      email: "roberto.alves@empresa.com",
      status: "Ausente",
      senioridade: "Senior",
      bio: "Automatiza tudo que é possível. Especialista em CI/CD, infraestrutura como código e monitoramento.",
      skills: ["Kubernetes", "Terraform", "Jenkins", "AWS", "Prometheus"],
      githubUsername: "robertoalves",
      localizacao: "Minas Gerais, MG",
      dataAdmissao: "10/02/2022",
      telefone: "(11) 98765-4321",
    },
    {
      id: 5,
      nome: "Juliana Costa",
      cargo: "Desenvolvedora Mobile",
      avatarUrl: "https://i.pravatar.cc/300?img=10",
      squadId: 2,
      email: "juliana.costa@empresa.com",
      status: "Ativo",
      senioridade: "Pleno",
      bio: "Apaixonada por React Native e desenvolvimento mobile. Cria apps com foco em performance e experiência do usuário.",
      skills: ["React Native", "TypeScript", "Redux", "Firebase", "iOS", "Android"],
      githubUsername: "julianacosta",
      localizacao: "São Paulo, SP",
      dataAdmissao: "15/03/2022",
      telefone: "(11) 98765-4321",
    },
    {
      id: 6,
      nome: "Felipe Martins",
      cargo: "Desenvolvedor Front-End",
      avatarUrl: "/felipe.jpg",
      squadId: 1,
      email: "felipe.gios@hotmail.com",
      status: "Ausente",
      senioridade: "Pleno",
      bio: "Apaixonado por Front-End e desenvolvimento mobile. Criar apps com foco em performance e experiência do usuário.",
      skills: ["React", "TypeScript",],
      githubUsername: "Felipixel-Martins",
      localizacao: "Santa Catarina, SC",
      dataAdmissao: "15/03/2025",
      telefone: "(47) 99755-2205",
    },
    {
      id: 7,
      nome: "Matheus Neis",
      cargo: "Engenheiro de Software",
      avatarUrl: "https://avatars.githubusercontent.com/u/17797836?v=4",
      squadId: 4,
      email: "matheus@hotmail.com",
      status: "Ativo",
      senioridade: "Senior",
      bio: "Criar apps com foco em performance e experiência do usuário.",
      skills: ["React", "TypeScript"],
      githubUsername: "mneis",
      localizacao: "Santa Catarina, SC",
      dataAdmissao: "05/03/2022",
      telefone: "(47) 98765-4321",
    }
  ];
  
  // Dados de squads
  export const squads: Squad[] = [
    {
      id: 1,
      nome: "Fênix",
      descricao: "Squad responsável pelo frontend da plataforma principal. Trabalhamos com React, Next.js e tecnologias modernas para criar interfaces incríveis.",
      stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL"],
      email: "fenix@empresa.com",
      liderId: 1 // Ana Clara Souza
    },
    {
      id: 2,
      nome: "Orion",
      descricao: "Squad de backend e APIs. Construímos serviços robustos e escaláveis que alimentam toda a plataforma.",
      stack: ["Node.js", "Python", "PostgreSQL", "Redis", "RabbitMQ"],
      email: "orion@empresa.com",
      liderId: 2 // Carlos Eduardo Lima
    },
    {
      id: 3,
      nome: "Atlas",
      descricao: "Squad de infraestrutura e DevOps. Garantimos que tudo esteja funcionando com alta disponibilidade e performance.",
      stack: ["AWS", "Kubernetes", "Terraform", "Docker", "Prometheus"],
      email: "atlas@empresa.com",
      liderId: 4 // Roberto Alves
    },
    {
      id: 4,
      nome: "Aurora",
      descricao: "Squad focado em experiência mobile e iniciativas cross-platform. Trabalhamos na evolução dos aplicativos e integrações com serviços da plataforma.",
      stack: ["React Native", "TypeScript", "Expo", "Firebase", "Node.js"],
      email: "aurora@empresa.com",
      liderId: 6 // Felipe Martins
    },
    {
      id: 5,
      nome: "Nebula",
      descricao: "Squad de engenharia de plataforma e produtividade. Atua com arquitetura, qualidade e aceleracao do desenvolvimento interno.",
      stack: ["TypeScript", "Node.js", "CI/CD", "Observabilidade", "Arquitetura"],
      email: "nebula@empresa.com",
      liderId: 7 // Matheus
    }
  ];
  
  // Funções auxiliares para relacionar dados
  export function getColaboradoresBySquad(squadId: number): Colaborador[] {
    return colaboradores.filter(colab => colab.squadId === squadId);
  }
  
  export function getSquadByColaborador(colaboradorId: number): Squad | undefined {
    const colaborador = colaboradores.find(c => c.id === colaboradorId);
    if (!colaborador || !colaborador.squadId) return undefined;
    return squads.find(s => s.id === colaborador.squadId);
  }
  
  export function getLiderDoSquad(squadId: number): Colaborador | undefined {
    const squad = squads.find(s => s.id === squadId);
    if (!squad) return undefined;
    return colaboradores.find(c => c.id === squad.liderId);
  }
  
  export function getResumoEstatisticas() {
    return {
      totalColaboradores: colaboradores.length,
      totalSquads: squads.length,
      colaboradoresAtivos: colaboradores.filter(c => c.status === 'Ativo').length,
      colaboradoresAusentes: colaboradores.filter(c => c.status === 'Ausente').length,
      senioridade: {
        junior: colaboradores.filter(c => c.senioridade === 'Junior').length,
        pleno: colaboradores.filter(c => c.senioridade === 'Pleno').length,
        senior: colaboradores.filter(c => c.senioridade === 'Senior').length
      }
    };
  }
