// const { Sequelize, DataTypes, Op } = require("sequelize");
// const dotenv = require("dotenv");
// dotenv.config({});
// const cli = require("cli-color");
// let db = {};

// const sequelize = new Sequelize("ansormta", "ansor", "1234", {
//   host: "localhost",
//   dialect: "postgres",
// });
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log(cli.green("Database connected"));
//   })
//   .catch((err) => {
//     console.log(cli.red("Database not connected"));
//     console.log(err);
//   });

// db.sequelize = sequelize;
// db.Op = Op;

// db.user = require("./user")(sequelize, DataTypes);
// db.sequelize.sync({ force: true, alter: true });
// module.exports = db;

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({});

const connectDB = async () => {
  try {
    const db = process.env.DB;
    const pass = process.env.DB_PASS;
    const dbUrl = db.replace("<password>",pass);
    console.log(dbUrl)

    const conn = await mongoose.connect(dbUrl)

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
