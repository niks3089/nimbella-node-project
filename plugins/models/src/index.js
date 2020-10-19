
const Sequelize = require('sequelize');

console.log("Creating new sequelize instance");
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000
  },
  logging: false
});

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model.init(sequelize, Sequelize);
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
