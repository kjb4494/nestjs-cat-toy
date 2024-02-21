# nestjs-cat-toy

NestJs 공부용 토이 프로젝트

## Env

- Versions

  - node v20.11.0
  - npm 10.2.4
  - yarn 1.22.21
  - typescript 5.3.3

- VSCode Settings

  ```json
  {
    "workbench.colorTheme": "Default Dark+",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll": "explicit"
    },
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
  ```

- Added eslintrc.js Settings

  ```js
  rules: {
  	<!-- [lf -> auto] Delete `␍` eslint (prettier/prettier) -->
  	'prettier/prettier': [
  		'error',
  		{
  			endOfLine: 'auto',
  		},
  	],
  	<!-- [error -> warn] 'A' is declared but its value is never read. ts(6133) -->
  	'@typescript-eslint/no-unused-vars': 'warn'
  }
  ```

- Added Modules

  - **[_mongoose_](https://mongoosejs.com/docs/index.html)**: `yarn add @nestjs/mongoose mongoose`
  - **nest-js/config**: `yarn add @nestjs/config`
  - **validation**: `yarn add class-validator class-transformer`
  - **bcrypt**: `yarn add bcrypt`, `yarn add --dev @types/bcrypt`
  - **[_swagger_](https://docs.nestjs.com/openapi/introduction#installation)**: `yarn add @nestjs/swagger`
  - **[_jwt_](https://docs.nestjs.com/security/authentication#jwt-token)**: `yarn add @nestjs/jwt`
  - **[_passport-jwt_](https://docs.nestjs.com/recipes/passport#jwt-functionality)**: `yarn add passport-jwt`, `yarn add --dev @types/passport-jwt`
  - **[_passport_](https://docs.nestjs.com/recipes/passport#authentication-requirements)**: `yarn add @nestjs/passport passport passport-local`, `yarn add --dev @types/passport-local`
  - **[_swagger security_](https://github.com/LionC/express-basic-auth?tab=readme-ov-file#how-to-use)**: `yarn add express-basic-auth`

- .env

```text
MONGO_URI=mongodb://localhost:27017
MONGO_USERNAME=admin
MONGO_PASSWORD=P@ssw0rd
MONGO_DBNAME=catdb

MODE='dev'

SWAGGER_USER=swagger
SWAGGER_PASSWORD=1q2w3e4r5t@#
```

## MongoDB

```shell
docker run --name mongo-db -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=P@ssw0rd -d -p 27017:27017 mongo
```

## Mysql

```shell
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=P@ssw0rd --name mysql-db mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Ref

- [_git code ref_](https://github.com/amamov/teaching-nestjs-a-to-z)
