const express = require("express");

const {getAllUsers, deleteUser} = require("../../controllers/admin/user-controller");

const router = express.Router();

router.get("/get", getAllUsers);
router.delete("/delete/:id", deleteUser);

module.exports = router;