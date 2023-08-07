const { randomBytes } = require("crypto");

const generateSessionId = () => randomBytes(16).toString("hex");

module.exports = {
    generateSessionId
}