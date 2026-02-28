# Guia de Deploy - Dots Memories

## Deploy no Vercel

### Opção 1: Deploy via GitHub (Recomendado)

1. **Crie um repositório no GitHub:**
```bash
cd /mnt/okcomputer/output/app
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/dots-memories.git
git push -u origin main
```

2. **No Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "Add New Project"
   - Importe o repositório do GitHub
   - O Vercel detectará automaticamente as configurações do Vite

3. **Configure as variáveis de ambiente:**
   - Vá em "Settings" > "Environment Variables"
   - Adicione:
     - `VITE_SUPABASE_URL` = URL do seu projeto Supabase
     - `VITE_SUPABASE_ANON_KEY` = Chave anônima do Supabase

4. **Deploy:**
   - Clique em "Deploy"
   - O Vercel fará o build automaticamente

### Opção 2: Deploy via CLI

```bash
# Instale o Vercel CLI
npm i -g vercel

# Faça login
vercel login

# Deploy
vercel
```

## Configuração do Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. No SQL Editor, execute:

```sql
create table memories (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  image_url text,
  category text not null check (category in ('couple', 'family', 'pet', 'special')),
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table memories enable row level security;

create policy "Allow public access" on memories
  for all using (true) with check (true);
```

3. Copie as credenciais em Project Settings > API

## Variáveis de Ambiente

| Nome | Descrição | Onde Obter |
|------|-----------|------------|
| `VITE_SUPABASE_URL` | URL do projeto Supabase | Supabase Dashboard > Settings > API |
| `VITE_SUPABASE_ANON_KEY` | Chave anônima pública | Supabase Dashboard > Settings > API |

## Estrutura do Projeto

```
dots-memories/
├── dist/                 # Build de produção
├── public/images/        # Imagens estáticas
├── src/
│   ├── components/       # Componentes UI (shadcn)
│   ├── lib/
│   │   └── supabase.ts   # Configuração do Supabase
│   ├── sections/         # Seções da página
│   │   ├── Hero.tsx
│   │   ├── Memories.tsx
│   │   ├── AddMemory.tsx
│   │   └── Footer.tsx
│   ├── types/            # Tipos TypeScript
│   ├── App.tsx           # Componente principal
│   └── main.tsx          # Ponto de entrada
├── .env.example          # Exemplo de variáveis
├── vercel.json           # Configuração do Vercel
└── README.md             # Documentação
```

## Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento local
npm run build    # Build de produção
npm run preview  # Preview do build
```

## Links Úteis

- [Site Demo](https://cu67wjxbvytys.ok.kimi.link)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Supabase Dashboard](https://supabase.com/dashboard)
