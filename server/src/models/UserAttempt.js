const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  uniqueRowID: {
    type: String,
  },
  tenseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tense',
  },
  expectedAnswer: {
    type: String,
  },
  userAnswer: {
    type: String,
  },
  isCorrectAnswer: {
    type: Boolean,
  },
});

const userAttemptSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
  },
  verbId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Verb',
    required: true,
  },
  successfullyCompleted: {
    type: String
  },
  abandoned: {
    type: String
  },
  attempts: [[attemptSchema]],
});

const UserAttempt = mongoose.model('UserAttempt', userAttemptSchema);

module.exports = UserAttempt;
