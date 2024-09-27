const authentication = require("../middlewares/authentication");
const OrderStatic = require("../controllers/orderStatic");
const { authorizationRole } = require("../middlewares/authorization");
const router = require("express").Router();

router.use(authentication);
router.get("/", OrderStatic.orderGetAll);
router.post("/", OrderStatic.orderCreate);
router.get("/:orderId", OrderStatic.orderGetDetail);
router.put("/:orderId", OrderStatic.orderEdit);
router.patch(
  "/approved/:orderId",
  authorizationRole,
  OrderStatic.orderApproved
);
router.delete("/:orderId", OrderStatic.orderDelete);

module.exports = router;
