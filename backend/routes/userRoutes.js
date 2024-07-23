const express = require("express");
const {
  registerUser,
  authUser,
  allusers,
} = require("../controllers/userController");
const protect = require("../middlewares/authMiddleWare");

const router = express.Router();

router.route("/reg").post(registerUser);
router.route("/").get(protect, allusers);
router.post("/login", authUser);

module.exports = router;
