# Amazonas Tech Mulheres — site + API REST

Projeto responsivo inspirado nas imagens fornecidas: identidade roxo/rosa, banner amazônico, navegação, comunidades, mulheres que inspiram, quiz de carreira, trilha, eventos, bem-estar, perfil e feed.

## Executar
1. Instale Node.js 18 ou superior.
2. Extraia o ZIP e abra um terminal nessa pasta.
3. Execute `npm install`.
4. Copie `.env.example` para `.env` e configure `JWT_SECRET` com uma chave longa e aleatória.
5. Execute `npm start`.
6. Acesse `http://localhost:3000`.

Na primeira execução, o servidor cria `data.json` com dados demonstrativos.

## Endpoints principais
- `GET /api/health`
- `GET /api/communities` e `GET /api/communities/:id`
- `POST /api/communities/:id/join` (JWT)
- `GET /api/events` e `POST /api/events/:id/register` (JWT)
- `GET /api/professionals`
- `GET /api/posts`, `POST /api/posts` (JWT), `POST /api/posts/:id/like` (JWT)
- `GET /api/posts/:id/comments`, `POST /api/posts/:id/comments` (JWT)
- `POST /api/auth/register`, `POST /api/auth/login`
- `GET /api/me`, `PATCH /api/me` (JWT)
- `GET /api/quiz/questions`, `POST /api/quiz/results`
- `GET /api/resources`, `GET /api/dashboard` (JWT)

## Funcionalidades
- Interface consulta a API REST do próprio projeto.
- Cadastro/login, hash de senha com bcrypt e JWT.
- Dados persistidos em arquivo JSON.
- Busca e filtros de comunidades/eventos.
- Participação em comunidades e interesse em eventos.
- Feed, publicações, curtidas e comentários.
- Quiz calculado com base nas respostas e trilha sugerida.
- Perfil editável e recursos externos.

## Antes de produção
Esta é uma base MVP para demonstração acadêmica. O JSON local não é adequado para tráfego concorrente; migre para PostgreSQL/Supabase, use HTTPS, segredo forte, rate limiting, validação e testes. Não há OAuth Google/LinkedIn implementado. Nomes, imagens, perfis, números e eventos são demonstrativos e devem ser verificados antes de divulgação. Imagens e fontes dependem de internet. A seção de bem-estar não oferece diagnóstico nem substitui atendimento profissional.
