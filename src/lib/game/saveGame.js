const SavedGame = require("../../models/SavedGame");

module.exports = async function saveGame(state) {
  const text = state.serialize();

  await SavedGame.upsert({ id: Number(process.env.SAVE_SLOT) || 0, state: text });
};
