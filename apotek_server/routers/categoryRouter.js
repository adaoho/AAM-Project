const authentication = require("../middlewares/authentication");
const CategoryStatic = require("../controllers/categoryStatic");
const { authorizationRole } = require("../middlewares/authorization");
const router = require("express").Router();

router.use(authentication);
router.get("/", CategoryStatic.categoryGetAll);
router.post("/", CategoryStatic.categoryCreate);
router.get("/:categoryId", CategoryStatic.categoryGetDetail);
router.put("/:categoryId", CategoryStatic.categoryEdit);
router.delete("/:categoryId", CategoryStatic.categoryDelete);

module.exports = router;
