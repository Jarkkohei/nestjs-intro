## nestjs-intro

Basic CRUD example for products from Youtube Channel - Academind - Learn Nest.js from Scratch by building an API -course

## Install

```bash
$ npm install
```

## MongoDB setup

Login to [MongoDB Cloud Atlas](https://www.mongodb.com/cloud/atlas).

Create a new MongoDB Cloud Atlas project and connect into it to get the connection string.

Whitelist your IP address.

Create `config/keys.ts` folder and file to the `src/config` folder of your Nest.js -project.

Copy and paste the connection string as a `MONGODB_CONNECTION_STRING` into your Nest.js projects `src/config/keys.ts` -file.

Replace the `<username>` and `<password>` -part of the `MONGODB_CONNECTION_STRING` with the MongoDB Cloud Atlas project connection username and password.

You can also replace the text `test` in your `MONGO_CONNECTION_KEY` with the database name of your choice. It will be created if it does not already exist.

```typescript
export default {
    MONGODB_CONNECTION_STRING: '<YourMongoDBCloudAtlasConnectionStringHere>'
}
```
Just remember to add the `config/keys.ts` to your `.gitignore` -file if you're using Git.

---

## Run

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

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
