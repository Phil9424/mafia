const EndgameState = require("./EndgameState");
const LastGameResult = require("../../models/LastGameResult");

module.exports = async function saveLastGameResult(gameResult, endgameState, winner) {
  await LastGameResult.upsert({
    id: Number(process.env.LAST_GAME_SLOT) || 0,
    result: gameResult,
    state: endgameState,
    winner
  });
};
