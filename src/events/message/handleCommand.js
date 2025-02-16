const handleCommand = require("../../lib/commands/handleCommand");

module.exports = (client, message) => {
  handleCommand(message);
};
