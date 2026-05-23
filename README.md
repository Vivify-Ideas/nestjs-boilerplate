<h1>NestJS Boilerplate
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="65" alt="Nest Logo" />
  </a>
</h1>

## Description

NestJS REST API boilerplate with TypeORM, MariaDB, JWT authentication, Swagger, Docker Compose, validation, and migrations.

## Requirements

- Node.js compatible with the versions in `package.json`
- Yarn
- Docker + Docker Compose for the containerized workflow

## Quick start with Docker

```bash
./init
```

The init script will:

1. copy `.env.example` to `.env` when `.env` is missing;
2. generate a strong `JWT_SECRET_KEY` when it is empty or still set to `changeme`;
3. build and start the Docker Compose stack;
4. wait for MariaDB to become ready;
5. run TypeORM migrations.

After startup:

- API through nginx: http://localhost:8080
- Swagger docs: http://localhost:8080/api/docs
- MariaDB: `localhost:3306`

For IDE autocompletion on the host machine, run:

```bash
yarn
```

## Local development without Docker

1. Install dependencies:

   ```bash
   yarn
   ```

2. Create and edit environment config:

   ```bash
   cp .env.example .env
   openssl rand -base64 32 # use this for JWT_SECRET_KEY
   ```

3. Make sure MariaDB is running and that `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, and `DB_DATABASE` match your local database.

4. Run migrations:

   ```bash
   yarn migration:run
   ```

5. Start the app:

   ```bash
   yarn start:dev
   ```

Local app URL: http://localhost:3000

## Environment variables

| Variable | Description |
| --- | --- |
| `APP_ENV` | Application environment. Use `dev` for local development. |
| `APP_URL` | Value returned by the authenticated root endpoint. |
| `JWT_SECRET_KEY` | Required JWT signing secret. Must be at least 32 characters. |
| `JWT_EXPIRATION_TIME` | Optional JWT expiration time in seconds. |
| `CORS_ALLOW_ORIGIN` | Comma-separated allowed origins. Required outside `dev`. |
| `DB_TYPE` | Database type. This project is configured for `mariadb`/`mysql`. |
| `DB_HOST` | Database host. In Docker Compose this is `db`. |
| `DB_PORT` | Database port. |
| `DB_USERNAME` | Database user. |
| `DB_PASSWORD` | Database password. |
| `DB_DATABASE` | Database name. |
| `DB_SYNC` | TypeORM synchronize flag. Keep `false` outside throwaway development. |

## API

Swagger is available at `/api/docs`.

Main routes:

- `POST /api/auth/register` — create a user
- `POST /api/auth/login` — receive a JWT access token
- `GET /api/auth/me` — return the authenticated user
- `GET /` — authenticated root endpoint

Use the returned JWT as a bearer token for protected routes.

## TypeORM and migrations

TypeORM configuration lives in `src/database/data-source.ts`. Entities are loaded from `src/**/*.entity.ts` in development and `dist/**/*.entity.js` after build.

Create a migration:

```bash
yarn migration:create src/migrations/MigrationName
```

Run migrations:

```bash
yarn migration:run
```

Revert the last migration:

```bash
yarn migration:revert
```

Inside Docker, prefix commands with `docker exec -it nest`, for example:

```bash
docker exec -it nest yarn migration:run
```

> `DB_SYNC=true` can be useful for throwaway local experiments, but do not use it in production because schema synchronization can cause data loss.

## Scripts

```bash
yarn start        # run src/main.ts with ts-node
yarn start:dev    # run with nodemon
yarn start:debug  # run with nodemon debug config
yarn start:prod   # run compiled dist/main.js
yarn test         # unit tests
yarn test:watch   # unit tests in watch mode
yarn test:cov     # coverage
yarn test:e2e     # e2e tests
yarn format       # prettier over src/**/*.ts
```

## Docker files

- `docker-compose.yml` — local development stack: NestJS app, nginx, MariaDB.
- `docker-compose-swarm.yml` — swarm-oriented deployment template.
- `Dockerfile` — development app image.
- `Dockerfile-prod` — production app image.
- `Dockerfile-nginx` — nginx reverse proxy image.

## Notes

- Passwords are hashed with `bcrypt` through a TypeORM value transformer.
- Validation is enabled globally with Nest `ValidationPipe` and a custom trim pipe.
- CORS is open only in `APP_ENV=dev` when `CORS_ALLOW_ORIGIN` is empty.
