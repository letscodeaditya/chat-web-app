const express = require("express");
const protect = require("../middlewares/authMiddleWare");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addPeopleFromGroup,
  removePeopleFromGroup,
} = require("../controllers/chatController");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/group/renamegroup").put(protect, renameGroup);
router.route("/group/addppl").put(protect, addPeopleFromGroup);
router.route("/group/removeppl").put(protect, removePeopleFromGroup);

module.exports = router;
