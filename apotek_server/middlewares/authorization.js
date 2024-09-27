const { User, Article } = require("../models");

async function authorizationRole(req, res, next) {
  try {
    const { id } = req.user;

    const findRole = await User.findOne({
      where: {
        id: id,
        Role: "admin",
      },
    });

    if (!findRole) {
      throw { name: `InvalidRole` };
    }

    next();
  } catch (error) {
    next(error);
  }
}

async function authorizationArticle(req, res, next) {
  try {
    const UserId = req.user.id;
    const { articleId } = req.params;

    const findArticle = await Article.findByPk(articleId);
    if (!findArticle) throw { name: "NotFound" };

    const findUser = await User.findByPk(UserId);
    if (!findUser) throw { name: "NotFound" };

    if (findUser.role === "admin") {
      next();
    } else {
      const findArticle = await Article.findOne({
        where: {
          id: articleId,
          UserId,
        },
      });

      if (!findArticle) {
        throw { name: `InvalidUser` };
      }

      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { authorizationRole, authorizationArticle };
