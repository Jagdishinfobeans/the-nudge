const questionRoutes = require("./qustionBankRoutes");
const gameRoutes = require("./gameRoutes");


const initializeEndPoints = (app) => {
    app.use('/api/games/', gameRoutes);
    app.use('/api/question-bank/', questionRoutes);
}

module.exports = initializeEndPoints;