# NestJS Starter Template

This is a template that includes the authentication, authorisation, google-authentication, mailing functionality along with database communication

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository..

## Tech Stack

1. NestJS
2. TypeORM
3. MongooseODM
4. PostgreSQL
5. MongoDB
6. HealthCheck(terminus)
7. Joi
8. Swagger / OpenAPI
9. Mailer Client setup with Pug
10. Authentication (JWT, Passport Local, Oauth2.0)
11. Authorization (RBAC)
12. Throttler Setup
13. Server and security Config
14. Migrations

- All implemented for a generic User Schema
- signup, reset password, forget password etc are implemented too along with 2FA for emails

## Installation

```bash
$ npm install
```

## Pre-Configuration

1. Create your [MailTrap](https://mailtrap.io/) account to receive emails, get smtp username and password
2. Create your Google API Credentials for OAuth2.0 from [Google Developer Console](https://console.cloud.google.com/apis/credentials)
3. Put your preferred Database Credentials in environment file
4. To receive emails with contents, create your preferred templates with styles
5. Have `todohighlight` VsCode extension and execute VsCode command by pressing `Cmd + Shift + P`
   <br/><br/>`TODO-Highlight: List Highlighted Annotations`
6. Select for `FIXME:` annotations, and select which DB connection you prefer. update the same on the respective files

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# staging mode
$ npm run start:staging

# uat mode
$ npm run start:uat

# production mode
$ npm run start:prod
```

## Swagger Docs

[http://localhost:3000/api/](http://localhost:3000/api/)

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migration

      Avoid synchronizing with the database for every DB change, instead use a migration system to prevent loss of data or any unwanted behavior

1. Perform any schema change in any entity file
2. Run command `npm run migration:generate` to generate a new migration file with changes from your entities
3. Run `npm run migration:run` to apply OR restart the app to run the migration automatically and watch the change in database

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Debi Prasad Mishra](https://www.debiprasadmishra.net/)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
