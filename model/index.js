const { Sequelize, DataTypes, Op } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config({});
const cli = require("cli-color");
let db = {};

const sequelize = new Sequelize("ansormta", "ansor", "1234", {
  host: "localhost",
  dialect: "postgres",
});
sequelize
  .authenticate()
  .then(() => {
    console.log(cli.green("Database connected"));
  })
  .catch((err) => {
    console.log(cli.red("Database not connected"));
    console.log(err);
  });

db.sequelize = sequelize;
db.Op = Op;

db.user = require("./user")(sequelize, DataTypes);
db.sequelize.sync({ force: true, alter: true });
module.exports = db;
