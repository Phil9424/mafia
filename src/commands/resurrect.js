const game = require("../lib/game/game");
const { getConfig } = require("../util/config");

const { gameChannel } = getConfig();

module.exports = {
  name: "r",
  description: "Воскрешает игрока",
  format: "<@пользователь>",
  hostOnly: true,
  inGameOnly: true,
  run(message, { args: [rawPlayer] }) {
    const playerMatch = rawPlayer && rawPlayer.match(/<@!?(\d+)>/);

    if (!playerMatch) {
      return message.reply("Игрок не указан или указан неверно!");
    }

    const player = message.client.users.cache.get(playerMatch[1]);

    if (!player) {
      return message.reply("Игрок не найден!");
    }

    if (!game.getPlayers().has(player.id)) {
      return message.reply("Игрок не участвует в игре!");
    }

    if (game.getAlivePlayers().has(player.id)) {
      return message.reply("Нельзя воскресить живого игрока!");
    }

    game.resurrect(player.id)
    game.updateNickname(player.id)

    const firstVictim = game.getFirstVictim();

    if (firstVictim && firstVictim.id == player.id) {
      game.getGameState().firstVictim = undefined;
    }

    message.client.channels.cache
      .get(gameChannel)
      .send(
        `**Игрок ${player} был воскрешён! В живых теперь ${
          game.getAlivePlayers().size
        } игроков!**`
      );
  }
};

