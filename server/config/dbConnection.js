const mongoose = require("mongoose");

// Connect to MongoDB
const connectDb = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

const db = connectDb();

module.exports = db;
