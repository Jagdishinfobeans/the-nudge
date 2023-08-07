const { ObjectId } = require("mongodb");
const { generateSessionId } = require("../utils/helper");
const { checkWin, checkLose } = require("../utils/checkWinOrLose");

const Verb = require("../models/Verb");
const QuestionBank = require("../models/QuestionBank");
const UserAttempt = require("../models/UserAttempt");

const getRandomVerb = async () => {
  const verb = await Verb.aggregate([{ $sample: { size: 1 } }]);
  return verb[0];
};

const startGame = async (req, res) => {
  const { email, verb: oldVerb } = req.body;
  const sessionId = await generateSessionId();

  const verb = oldVerb ? oldVerb : await getRandomVerb();

  const UserAttemptData = {
    email,
    sessionId,
    verbId: verb._id,
    successfullyCompleted: "",
    abandoned: "",
    attempts: [
      [{ uniqueRowID: "0" }, { uniqueRowID: "0" }, { uniqueRowID: "0" }],
      [{ uniqueRowID: "1" }, { uniqueRowID: "1" }, { uniqueRowID: "1" }],
      [{ uniqueRowID: "2" }, { uniqueRowID: "2" }, { uniqueRowID: "2" }],
    ],
  };
  await UserAttempt.insertMany([UserAttemptData]);
  res.json({ email, sessionId, verb: verb });
};

const getQuestion = async (req, res) => {
  try {
    const { tenseId, verbId } = req.query;
    const question = await QuestionBank.findOne(
      {
        tenseId: new ObjectId(tenseId),
        verbId: new ObjectId(verbId),
      },
      { sentence: 1, _id: 1 }
    );
    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }
    res.json(question);
  } catch (error) {
    console.log("error: ", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching question." });
  }
};

const submitQuestion = async (req, res) => {
  try {
    const {
      tenseId,
      verbId,
      expectedAnswer,
      rowIndex,
      colIndex,
      email,
      sessionId,
    } = req.body;

    const question = await QuestionBank.findOne({
      tenseId: new ObjectId(tenseId),
      verbId: new ObjectId(verbId),
    });

    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }

    const isCorrectAnswer =
      expectedAnswer.toLowerCase() === question.expectedAnswer.toLowerCase();
    const correctAnswer = question.sentence.replace(
      "____",
      question.expectedAnswer
    );

    const userAttempt = await UserAttempt.findOne({ email, sessionId });

    userAttempt.attempts[rowIndex][colIndex] = {
      expectedAnswer: question.expectedAnswer,
      tenseId: new ObjectId(tenseId),
      userAnswer: expectedAnswer,
      isCorrectAnswer,
    };

    if (userAttempt.successfullyCompleted === "") {
      const win = checkWin(userAttempt.attempts);
      const lose = checkLose(userAttempt.attempts);
      if (win) {
        userAttempt.successfullyCompleted = "Y";
      }
      if (lose) {
        userAttempt.successfullyCompleted = "N";
      }
      if (win || lose) {
        userAttempt.abandoned = "N";
      }
    }

    await userAttempt.save();

    return res.json({
      isCorrectAnswer,
      correctAnswer,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while submit." });
  }
};

const getUserAttempt = async (req, res) => {
  try {
    const { email, sessionId } = req.query;
    const userAttempt = await UserAttempt.findOne({ email, sessionId });

    if (!userAttempt) {
      return res.status(404).json({ error: "User attempt data not found." });
    }

    const win = userAttempt.successfullyCompleted === "Y";
    const lose = userAttempt.successfullyCompleted === "N";
    res.json({ userAttempt, win, lose });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching user attempt data." });
  }
};

const getVerb = async (req, res) => {
  try {
    const verb = getRandomVerb();
    res.json(verb[0]);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching base verbs." });
  }
};

const exitGame = async (req, res) => {
  console.log("game exited.");

  try {
    const { email, sessionId } = req.query;
    console.log("email, sessionId: ", email, sessionId);
    const userAttempt = await UserAttempt.findOne({ email, sessionId });

    if (!userAttempt) {
      return res.status(404).json({ error: "User attempt data not found." });
    }
    if (userAttempt.successfullyCompleted === "") {
      userAttempt.abandoned = "Y";
      await userAttempt.save();
    }

    res.json({ message: "Game abandoned." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching user attempt data." });
  }
};

module.exports = {
  startGame,
  getQuestion,
  submitQuestion,
  getUserAttempt,
  getVerb,
  exitGame,
};
