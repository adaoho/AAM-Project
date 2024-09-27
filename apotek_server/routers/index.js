const router = require("express").Router();
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const orderDetailRouter = require("./orderDetailRouter");
const orderRouter = require("./orderRouter");
const categoryRouter = require("./categoryRouter");

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use("/order-detail", orderDetailRouter);
router.use("/category", categoryRouter);

module.exports = router;
