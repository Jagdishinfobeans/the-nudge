const express = require("express");
const router = express.Router();

const {
  startGame,
  getQuestion,
  submitQuestion,
  getUserAttempt,
  getVerb,
  exitGame,
} = require("../controllers/gameController");

router.post("/start", startGame);

router.get("/question", getQuestion);

router.post("/submit", submitQuestion);

router.get("/user-attempt", getUserAttempt);

router.get("/random-verb", getVerb);

router.post("/exit", exitGame);

module.exports = router;
