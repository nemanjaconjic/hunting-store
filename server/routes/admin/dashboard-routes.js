const express = require("express");

const {getAllUsers, getAllOrders, getAllProducts, getSummary, getOrderChartData} = require("../../controllers/admin/dashboard-controller");

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/orders", getAllOrders);
router.get("/products", getAllProducts);
router.get("/sum", getSummary);
router.get("/chart", getOrderChartData);

module.exports = router;