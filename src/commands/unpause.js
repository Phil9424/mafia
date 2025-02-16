const game = require("../lib/game/game");

module.exports = {
  name: "up",
  description: "Снимает текущую игру с паузы",
  hostOnly: true,
  inGameOnly: true,
  run(message) {
    game.unpause();
  },
};
