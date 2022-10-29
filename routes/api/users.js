const express = require("express");
const ctrl = require('../../controllers/users');
const { login } = require('../../middlewares');

const router = express.Router();
router.post("/signup", ctrl.signup);
router.post("/login", ctrl.login);
router.get("/current", login, ctrl.getCurrent);
router.get("/logout", login, ctrl.logout);

module.exports = router;