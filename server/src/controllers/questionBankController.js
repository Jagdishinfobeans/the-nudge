const { ObjectId } = require("mongodb");
const QuestionBank = require("../models/QuestionBank");
const Verb = require("../models/Verb");
const Tense = require("../models/Tense");

const getQuestion = async (req, res) => {
  try {
    const questions = await QuestionBank.find();
    res.json(questions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the questions." });
  }
};

const saveQuestion = async (req, res) => {
  try {
    const { verbId, tenseId, sentence, expectedAnswer, id } = req.body;
    if (id) {
      await QuestionBank.updateOne(
        { _id: new ObjectId(id) },
        {
          verbId,
          tenseId,
          sentence,
          expectedAnswer,
        }
      );
      res.status(201).json({ message: "Question updated successfully!" });
    } else {
      await QuestionBank.insertMany([
        {
          verbId,
          tenseId,
          sentence,
          expectedAnswer,
        },
      ]);
      res.status(201).json({ message: "Question inserted successfully!" });
    }
  } catch (error) {
    console.log("error: ", error);
    res
      .status(500)
      .json({ error: "An error occurred while inserting the question." });
  }
};

const getTense = async (req, res) => {
  try {
    const tenses = await Tense.find();
    res.json(tenses);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "An error occurred while fetching tenses." });
  }
};

const getVerbs = async (req, res) => {
  try {
    const verbs = await Verb.find();
    res.json(verbs);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching base verbs." });
  }
};

module.exports = {
  getQuestion,
  saveQuestion,
  getTense,
  getVerbs,
};
