const LastGameResult = require("../../models/LastGameResult");

module.exports = function getLastGameResult() {
  return LastGameResult.findByPk(Number(process.env.LAST_GAME_SLOT) || 0);
};
