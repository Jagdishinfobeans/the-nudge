const mongoose = require("mongoose");

const tenseSchema = new mongoose.Schema({
  tenseName: {
    type: String,
    required: true,
  },
});

const Tense = mongoose.model("Tense", tenseSchema);

module.exports = Tense;
