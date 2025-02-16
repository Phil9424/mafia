const getLastGameResult = require("../lib/game/getLastGameResult");
const removeGameResult = require("../lib/game/removeGameResult");
const removeLastGameResult = require("../lib/game/removeLastGameResult");

module.exports = {
  name: "rollback",
  description: "Откатывает последнюю игру",
  ownerOnly: true,
  async run(message) {
    const lastGameResult = await getLastGameResult();

    if (!lastGameResult) {
      return message.channel.send({content:"Нет данных о последней игре!"});
    }

    await removeGameResult(lastGameResult.result)


    await removeLastGameResult();

    message.channel.send({content: "Последняя игра была клирнута."});
  }
};
