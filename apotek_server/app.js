// if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const router = require("./routers");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Let's Go Sailing On Port ${port}`);
});

// module.exports = app;
