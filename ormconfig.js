console.log('process.env.DATABASE_URL >>', process.env.DATABASE_URL);
console.log('process.env.DATABASE_URL >>', process.env.ENVIRONMENT);

module.exports = {
  "name": "default",
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": [
    process.env.ENVIRONMENT == "desenvolvimento" ?
    "./src/models/*.ts" :
    "./dist/models/*.js"
  ],
  "migrations": [
    process.env.ENVIRONMENT == "desenvolvimento" ?
    "./src/database/migrations/*.ts" :
    "./dist/database/migrations/*.js"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations",
    "entitiesDir":"./src/models",
  }
}
