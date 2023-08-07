const mongoose = require("mongoose");

const QuestionBankSchema = new mongoose.Schema({
  verbId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Verb",
    required: true,
  },
  tenseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tense",
    required: true,
  },
  sentence: {
    type: String,
    required: true,
  },
  expectedAnswer: {
    type: String,
    required: true,
  },
  exception: {
    type: {
      type: String,
    },
    description: {
      type: String,
    },
  },
});

const QuestionBank = mongoose.model("QuestionBank", QuestionBankSchema);

module.exports = QuestionBank;
