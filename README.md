# Web-4x-MMO

A lil browser-based 4x MMO game in space.

## Development

### Environment

- `touch .env`
- Set `DATABASE_URL` with connection params. When using local docker compose, this is `postgresql://postgres:localpassword@localhost:5432/web_4x_mmo?schema=public`.

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
