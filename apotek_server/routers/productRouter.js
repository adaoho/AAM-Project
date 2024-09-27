const authentication = require("../middlewares/authentication");
const ProductStatic = require("../controllers/productStatic");
const { authorizationRole } = require("../middlewares/authorization");
const router = require("express").Router();

router.use(authentication);
router.get("/", ProductStatic.productGetAll);
router.post("/", ProductStatic.productCreate);
router.put("/:productId", ProductStatic.productEdit);
router.get("/:productId", ProductStatic.productGetDetail);
router.delete("/:productId", ProductStatic.productDelete);

module.exports = router;
