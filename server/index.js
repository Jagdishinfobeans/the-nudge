require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/dbConnection");

const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

//register all routes
require('./src/routes')(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
