# Brev.ly — Frontend

Aplicação React SPA para gerenciamento de URLs encurtadas, desenvolvida como parte do desafio Fase 1 da Rocketseat.

## Tecnologias

- React 19 + TypeScript
- Vite
- TailwindCSS v4
- React Query v5
- React Hook Form v7 + Zod v4
- Axios

## Funcionalidades

- [x] Deve ser possível criar um link
  - [x] Não deve ser possível criar um link com encurtamento mal formatado
  - [x] Não deve ser possível criar um link com encurtamento já existente
- [x] Deve ser possível deletar um link
- [x] Deve ser possível obter a URL original por meio do encurtamento
- [x] Deve ser possível listar todas as URL's cadastradas
- [x] Deve ser possível incrementar a quantidade de acessos de um link
- [x] Deve ser possível baixar um CSV com o relatório dos links criados

## Páginas

- `/` — formulário de cadastro + listagem de links
- `/:url-encurtada` — redirecionamento para a URL original
- `/404` — página de recurso não encontrado

## Variáveis de ambiente

Copie o `.env.example` para `.env` e preencha os valores:

```bash
cp .env.example .env
```

```env
VITE_FRONTEND_URL=
VITE_BACKEND_URL=
```

## Como executar

```bash
npm install
npm run dev
```
