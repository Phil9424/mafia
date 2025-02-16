const SavedGame = require("../../models/SavedGame");

module.exports = function findSavedGame() {
  return SavedGame.findByPk(Number(process.env.SAVE_SLOT) || 0);
};
