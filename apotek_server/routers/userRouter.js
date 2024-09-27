const authentication = require("../middlewares/authentication");
const UserStatic = require("../controllers/userStatic");
const { authorizationRole } = require("../middlewares/authorization");
const router = require("express").Router();

router.post("/login", UserStatic.userLogin);
router.post("/register", UserStatic.userRegister);

router.use(authentication);

router.get("/get-user-id", UserStatic.userGetById);
router.get("/get-user", UserStatic.userGetAll);
// router.delete("/delete-user/:UserId", authorizationRole, UserStatic.userDelete);

module.exports = router;
