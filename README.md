<h1>NestJS Boilerplate
  <a
    href="http://nestjs.com/"
    target="blank"
  >
    <img
      src="https://nestjs.com/img/logo_text.svg"
      width="65"
      alt="Nest Logo"
    />
  </a>
</h1>

## Description

[NestJS](https://github.com/nestjs/nest) Boilerplate made with ❤️ by [💡VivifyIdeas💡](https://www.vivifyideas.com).

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# incremental rebuild (webpack)
$ npm run webpack
$ npm run start:hmr

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Environment Configuration

Integrated Configuration Module so you can just inject `ConfigService`
and read all environment variables from `.env` file.
Don't forget to make your own `.env` file!

## Swagger

RESTful APIs you can describe with already integrated Swagger.
To see all available endpoints visit http://localhost:3000/api/docs

## Authentication - JWT

Already preconfigured JWT authentication. Just change `AuthService` with right
validation and you are good to go...

## License

NestJS Boilerplate is [MIT licensed](LICENSE).
