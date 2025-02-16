const game = require("../lib/game/game");
module.exports = {
    name: "mvp",
    description: "mvp",
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

        game.mvp(player)
        message.channel.send({content: `Выбран лучший игрок!`})

    
    }
}