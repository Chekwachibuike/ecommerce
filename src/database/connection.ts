import mongoose, { ConnectOptions } from "mongoose";


const url =
  process.env.NODE_ENV === "development"
    ? process.env.LOCAL_DB
    : process.env.DB;

export default async function connect() {
  if (!url) {
    throw new Error("Database connection URL is not defined");
  }
  try {
    await mongoose.connect(url || "");
    console.log("Database connected");
  } catch (error) {
    console.log(`could not connect to db ${error}`);
    process.exit(1);
  }
}

// const sequelize = new Sequelize('zart_db', 'postgres', '5103', {
//   host: 'localhost',
//   dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
// });
