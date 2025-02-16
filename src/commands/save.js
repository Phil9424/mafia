const game = require("../lib/game/game");
const saveGame = require("../lib/game/saveGame");

module.exports = {
  name: "save",
  description: "Сохраняет игру",
  hostOnly: true,
  inGameOnly: true,
  async run(message) {
    await saveGame(game.getGameState());

    message.channel.send({content : "Игра сохранена!"});
  },
};
