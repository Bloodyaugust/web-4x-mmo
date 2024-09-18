# Web-4x-MMO

A lil browser-based 4x MMO game in space.

## Development

### Environment

- `touch .env`
- Set `COOKIE_SESSION_SECRET` with a randomly generated secret string to secure cookie sessions.
- Set `DATABASE_URL` with connection params. When using local docker compose, this is `postgresql://postgres:localpassword@localhost:5432/web_4x_mmo?schema=public`.
- Set `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`, and `GOOGLE_OAUTH_CALLBACK_URL` for oauth.

### DB Setup

- `cd prisma`
- `docker-compose up -d`
- `cd ../`
- `npx prisma db seed`

### Local web dev

- `npm install`
- `npm run dev`

### Prisma

To run Prisma Studio:
`npx prisma studio`

To update db after Prisma schema changes:
`npx prisma db push`

## Tools

### generate-galaxy

`prisma/tools/generate-galaxy.ts` is a CLI for generating new galaxies. It can be invoked with:

`node --loader ts-node/esm prisma/tools/generate-galaxy.ts generate-galaxy --systems 20 --worlds 4`

There is also a default invocation available in `package.json` as a script, which can be run with `npm run generate-galaxy`.

#### args

- `--systems`: Number of systems to generate
- `--worlds`: Number of worlds to generate per-system
