# Brev.ly — Backend

API REST para gerenciamento de URLs encurtadas, desenvolvida como parte do desafio Fase 1 da Rocketseat.

## Tecnologias

- Node.js + TypeScript
- Fastify
- Drizzle ORM + PostgreSQL
- Cloudflare R2 (S3-compatible)
- Docker

## Funcionalidades

- [x] Deve ser possível criar um link
  - [x] Não deve ser possível criar um link com URL encurtada mal formatada
  - [x] Não deve ser possível criar um link com URL encurtada já existente
- [x] Deve ser possível deletar um link
- [x] Deve ser possível obter a URL original por meio de uma URL encurtada
- [x] Deve ser possível listar todas as URL's cadastradas
- [x] Deve ser possível incrementar a quantidade de acessos de um link
- [x] Deve ser possível exportar os links criados em um CSV
  - [x] Deve ser possível acessar o CSV por meio de uma CDN (Cloudflare R2)
  - [x] Deve ser gerado um nome aleatório e único para o arquivo
  - [x] Deve ser possível realizar a listagem de forma performática
  - [x] O CSV deve ter campos como URL original, URL encurtada, contagem de acessos e data de criação

## Variáveis de ambiente

Copie o `.env.example` para `.env` e preencha os valores:

```bash
cp .env.example .env
```

```env
PORT=
DATABASE_URL=
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_ACCESS_KEY_ID=
CLOUDFLARE_SECRET_ACCESS_KEY=
CLOUDFLARE_BUCKET=
CLOUDFLARE_PUBLIC_URL=
```

## Como executar

```bash
# Instalar dependências
npm install

# Executar migrations
npm run db:migrate

# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start
```

## Docker

```bash
docker build -t brevly-server .
docker run -p 3333:3333 --env-file .env brevly-server
```
