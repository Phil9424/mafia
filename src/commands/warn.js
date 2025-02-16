const game = require("../lib/game/game");

module.exports = {
  name: "w",
  description: "Выдаёт предупреждение игроку",
  format: "<@пользователь>",
  hostOnly: true,
  inGameOnly: true,
  run(message, { args: [rawPlayer] }) {
    const playerMatch = rawPlayer && rawPlayer.match(/<@!?(\d+)>/);

    if (!playerMatch) {
      message.reply("Игрок не указан или указан неверно!");
      return;
    }

    const player = message.client.users.cache.get(playerMatch[1]);

    if (!player) {
      message.reply("Игрок не найден!");
      return;
    }

    if (!game.getAlivePlayers().has(player.id)) {
      message.reply("Игрок не участвует в игре или уже мёртв!");
    }

    game.addWarn(player);
  },
};
