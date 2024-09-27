require("dotenv").config(); // Load environment variables from .env file

module.exports = {
  development: {
    username: "postgres",
    password: "1234",
    database: "apotek_db",
    host: "localhost",
    dialect: "postgres",
    logging: false,
  },
  test: {
    username: process.env.DB_TEST_USERNAME,
    password: process.env.DB_TEST_PASSWORD,
    database: process.env.DB_TEST_NAME,
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_PROD_USERNAME,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_NAME,
    host: "localhost",
    dialect: "postgres",
    logging: false,
  },
};
