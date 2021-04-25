console.log('process.env.Host >>',process.env.Host);
module.exports = {
  "name": "default",
  "type": "postgres",
  "host": process.env.Host,
  "port": process.env.Port,
  "username": process.env.User,
  "password": process.env.Password,
  "database": process.env.Database,
  "entities": [
    process.env.Host == 'localhost' ?
    "./src/models/*.ts" :
    "./dist/models/*.js"
  ],
  "migrations": [
    process.env.Host === 'localhost' ?
    "./src/database/migrations/*.ts" :
    "./dist/database/migrations/*.js"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations",
    "entitiesDir":"./src/models",
  }
}
