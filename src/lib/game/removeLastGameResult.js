const EndgameState = require("./EndgameState");
const LastGameResult = require("../../models/LastGameResult");

module.exports = async function removeLastGameResult() {
  await LastGameResult.destroy({ where: { id: 0 } });
};
