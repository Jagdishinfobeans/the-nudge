const express = require("express");
const router = express.Router();

const {
  getQuestion,
  saveQuestion,
  getTense,
  getVerbs,
} = require("../controllers/questionBankController");

router.get("/questions", getQuestion);

router.post("/questions", saveQuestion);

router.get("/tenses", getTense);

router.get("/verbs", getVerbs);

module.exports = router;
