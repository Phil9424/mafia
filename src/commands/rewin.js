const getLastGameResult = require("../lib/game/getLastGameResult");
const computeGameResult = require("../lib/game/computeGameResult");
const removeGameResult = require("../lib/game/removeGameResult");
const saveGameResult = require("../lib/game/saveGameResult");
const saveLastGameResult = require("../lib/game/saveLastGameResult");

module.exports = {
  name: "rewin",
  description:
    "Откатывает результат последней игры и пересчитывает его с учётом победы выбранной команды",
  format: "<mir|maf>",
  ownerOnly: true,
  async run(message, { args: [winner] }) {
    if (!["mir", "maf"].includes(winner)) {
      message.reply("Победитель указан неверно!");
      return;
    }

    const lastGameResult = await getLastGameResult();

    const { result } = lastGameResult;
    const state = lastGameResult.getDeserializedState(message.client);

    if (!lastGameResult) {
      return message.channel.send({content: "Нет данных о последней игре!"});
    }

    await removeGameResult(result)

    const newResult = await computeGameResult(state, winner)

    await saveGameResult(newResult)

    message.client.emit("ratingUpdate")

    await saveLastGameResult(newResult, state, winner)

    message.channel.send(
      {content: `Победитель успешно изменён на **${winner == "maf" ? "мафию" : "мирных"}**!`}
    )
  }
};
