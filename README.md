# Amazonas Tech Mulheres

Site demonstrativo com identidade visual acolhedora (verde floresta, sálvia, creme, mostarda e terracota), frontend responsivo e API REST em Node.js/Express.

## Executar localmente

Requer Node.js 18 ou superior.

```bash
npm install
npm start
```

Abra http://localhost:3000

## Publicar no Railway

1. Envie todos os arquivos deste projeto para um repositório GitHub novo ou substitua os arquivos do repositório existente (mantenha uma cópia de segurança antes).
2. No Railway, crie um projeto e escolha Deploy from GitHub Repo.
3. Selecione o repositório. O Railway detecta Node.js pelo `package.json`.
4. Start command: `npm start` (geralmente detectado automaticamente).
5. Em Settings / Networking, gere um domínio público.
6. Verifique `https://SEU-DOMINIO/api/health` e depois abra o domínio raiz.

O servidor escuta em `0.0.0.0` e usa `process.env.PORT`.

## API

- `GET /api/health` — saúde do serviço
- `GET /api/communities?q=python` — lista/pesquisa comunidades
- `GET /api/communities/:id` — detalhes da comunidade
- `GET /api/professionals?q=design` — profissionais/mentoras demonstrativas
- `GET /api/events` — eventos
- `GET /api/posts` — publicações da comunidade
- `POST /api/posts` — criar publicação `{ "name": "Ana", "content": "Olá!" }`
- `POST /api/posts/:id/like` — curtir publicação
- `POST /api/registrations` — cadastro de interesse `{ "name": "Ana", "email": "ana@example.com", "interest": "Mentoria" }`

## Importante para demonstração

- Os perfis e eventos iniciais são dados ilustrativos, não representam necessariamente pessoas ou eventos reais.
- Os cadastros de interesse são armazenados em `data.json` quando gravável. O filesystem efêmero de uma implantação pode perder esses dados em novo deploy/reinício; para uso real, configure um banco de dados persistente.
- O formulário de entrada/cadastro é uma demonstração de interesse, não autenticação real. Não colete dados sensíveis.
- As fotos de referência são carregadas de URLs externas do Unsplash e exigem conexão com a internet.
