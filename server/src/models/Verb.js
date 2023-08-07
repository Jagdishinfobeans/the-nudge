const mongoose = require("mongoose");

const verbSchema = new mongoose.Schema({
  verb: {
    type: String,
    required: true,
  },
  exceptionType: {
    type: String,
    required: false,
  },
});

const Verb = mongoose.model('Verb', verbSchema);

module.exports = Verb;
