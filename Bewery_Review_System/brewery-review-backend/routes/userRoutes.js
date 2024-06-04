const express = require("express");
const {
  loginUser,
  registerUser,
  refreshTokenHandler,
  userLogout,
} = require("../controllers/userController.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/refresh", refreshTokenHandler);
router.get("/logout", userLogout);

module.exports = router;
