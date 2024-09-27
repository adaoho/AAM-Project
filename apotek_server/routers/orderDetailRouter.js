const authentication = require("../middlewares/authentication");
const OrderDetailStatic = require("../controllers/orderDetailStatic");
const { authorizationRole } = require("../middlewares/authorization");
const router = require("express").Router();

router.use(authentication);
router.get("/", OrderDetailStatic.orderDetailGetAll);
router.post("/", OrderDetailStatic.orderDetailCreate);
router.get("/:orderDetailId", OrderDetailStatic.orderDetailGetDetail);
router.put("/:orderDetailId", OrderDetailStatic.orderDetailEdit);
router.delete("/:orderDetailId", OrderDetailStatic.orderDetailDelete);

module.exports = router;
