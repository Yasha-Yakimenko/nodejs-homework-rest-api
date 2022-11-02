const express = require("express");
const ctrl = require('../../controllers/users');
const { login, upload } = require('../../middlewares');

const router = express.Router();
router.post("/signup", ctrl.signup);
router.get("/verify/:verificationToken", ctrl.verifyEmail);
router.post("/verify", ctrl.resendVerifyEmail);
router.post("/login", ctrl.login);
router.get("/current", login, ctrl.getCurrent);
router.get("/logout", login, ctrl.logout);
router.patch("/avatars", login, upload.single('avatar'), ctrl.setAvatar);

module.exports = router;