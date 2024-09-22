// if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const authentication = require("./middlewares/authentication");
const { comparePassword } = require("./helpers/bcrypt");
const { createToken, verifyToken } = require("./helpers/jwt");
const { User, Article } = require("./models");
const { authorization } = require("./middlewares/authorization");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register", async (req, res, next) => {
  try {
    const { phoneNumber, password, fullname } = req.body;

    if (!phoneNumber) throw { name: "emailEmpty" };
    if (!password) throw { name: "passwordEmpty" };
    if (!fullname) throw { name: "fullnameEmpty" };

    const createUser = await User.create(
      {
        phoneNumber,
        password,
        fullname,
        role: "customer",
      },
      { return: true }
    );

    res.status(201).json({
      createUser,
    });
  } catch (error) {
    next(error);
  }
});

app.post("/login", async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;

    // if (!email) throw { name: "emailEmpty" };
    // if (!password) throw { name: "passwordEmpty" };

    const findUser = await User.findOne({
      where: { phoneNumber },
    });

    const comparePass = comparePassword(password, findUser.password);

    if (!comparePass) throw { name: "InvalidEmailPassword" };

    const payload = {
      id: findUser.id,
      fullname: findUser.fullname,
      phoneNumber: findUser.phoneNumber,
    };

    const token = createToken(payload);

    res.status(200).json({
      access_token: token,
      data: {
        fullname: findUser.fullname,
        phoneNumber: findUser.phoneNumber,
      },
    });
  } catch (error) {
    next(error);
  }
});

app.use(authentication);

app.post("/article", async (req, res, next) => {
  try {
    const { id } = req.user;
    const { title, thumbnail, slug, body } = req.body;

    const createArticle = await Article.create(
      {
        userId: id,
        title,
        thumbnail,
        slug,
        body,
      },
      { return: true }
    );

    const findArticle = await Article.findOne({
      where: {
        slug: slug,
      },
    });

    if (findArticle) throw { name: "ArticleHasMade" };

    res.status(201).json({
      message: "Success Create Article",
    });
  } catch (error) {
    next(error);
  }
});

app.get("/article", authorization, async (req, res, next) => {
  try {
    const getArticle = await Article.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).json({
      getArticle,
    });
  } catch (error) {
    next(error);
  }
});

app.get("/article/:slug", async (req, res, next) => {
  try {
    const { slug } = req.params;
    const getArticleDetail = await Article.findOne({
      where: {
        slug: slug,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).json({
      getArticleDetail,
    });
  } catch (error) {
    next(error);
  }
});

app.get("/user/:userId/article", async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const getArticleFromUser = await Article.findOne({
      where: {
        userId: userId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).json({
      getArticleFromUser,
    });
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Let's Go Sailing On Port ${port}`);
});

// module.exports = app;
