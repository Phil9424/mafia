const game = require("../lib/game/game");

module.exports = {
  name: "f",
  description: "Выдаёт фол игроку",
  format: "<@пользователь>",
  hostOnly: true,
  inGameOnly: true,
  run(message, { args: [rawPlayer] }) {
    const playerMatch = rawPlayer && rawPlayer.match(/<@!?(\d+)>/);

    if (!playerMatch) {
      message.channel.send({content: `Игрок не указан или указан неверно!`});
      return;
    }

    const player = message.client.users.cache.get(playerMatch[1]);

    if (!player) {
      message.channel.send({content: `Игрок не найден!`});
      return;
    }

    if (!game.getAlivePlayers().has(player.id)) {
      message.channel.send({content: `Игрок не участвует в игре или уже мёртв!`});
    }

    game.addFaul(player);
  },
};
