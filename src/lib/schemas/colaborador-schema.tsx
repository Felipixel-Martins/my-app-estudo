import { z } from 'zod';

export const colaboradorSchema = z.object({
  nome: z.string()
    .min(3, 'Por favor, escreva seu nome completo!')
    .max(100, 'Nome muito longo'),
  
  cargo: z.string()
    .min(2, 'Cargo é obrigatório'),
  
  squadId: z.string()
    .min(1, 'Selecione uma squad'),
  
  senioridade: z.enum(['Junior', 'Pleno', 'Senior']),
  
  localizacao: z.string()
  .min(3, 'Obrigatório a localizacao!!')
    .optional(),
  
  bio: z.string()
    .max(500, 'Bio deve ter no máximo 500 caracteres')
    .optional(),
  
  skills: z.array(z.string())
    .min(1, 'Adicione pelo menos uma skill'),
  
  status: z.enum(['Ativo', 'Ausente']),
  
  githubUsername: z.string()
    .optional()
    .refine(val => !val || /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(val), {
      message: 'Username do GitHub inválido'
    })
});

export type ColaboradorFormData = z.infer<typeof colaboradorSchema>;

// Schema para validação específica do GitHub (para uso no formulário)
export const githubUsernameSchema = z.string()
  .optional()
  .refine(val => !val || /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(val), {
    message: 'Username do GitHub inválido'
  });
