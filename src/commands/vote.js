const { MessageEmbed } = require("discord.js");
const gameRoles = require("../../data/roles.json");

const game = require("../lib/game/game");

const MENTION_PATTERN = /<@!?(\d+)>/;

function wait(ms) {
  const start = Date.now();
  while (Date.now() - start < ms);
}

async function countdown(channel, time, { interval = 1000 } = {}) {
  let n = time / interval;

 console.log(`**${n}**`);

  for (let i = n - 1; i >= 0; i--) {
    wait(1030);

 console.log(`**${n}**`);

    
  }
}

const formatNumber = (number) =>
  number.toLocaleString(undefined, {
    minimumIntegerDigits: 2
  });

module.exports = {
  name: "vote",
  description: "Запускает голосование за исключение игроков",
  format: "<@пользователь> <@пользователь> ...",
  hostOnly: true,
  inGameOnly: false,
  async run(message, { args: rawPlayers }) {
    console.log(rawPlayers)
    if (rawPlayers.length < 2) {
      return message.reply("Вы должны указать как минимум 2х игроков!");
    }

    for (const rawPlayer of rawPlayers) {
      if (!MENTION_PATTERN.test(rawPlayer)) {
        return message.reply(`Неверный формат указания игрока: \`${rawPlayer}\``);
      }
    }

    const players = await Promise.all(
      rawPlayers.map(async (rawPlayer) =>
        message.client.users.cache.get(rawPlayer.match(MENTION_PATTERN)[1])
      )
    );

    for (let i = 0; i < players.length; i++) {
      const player = players[i];

      if (!player) {
        return message.reply(`Игрок ${rawPlayers[i]} не найден!`);
      }

      if (!game.getPlayers().has(player.id)) {
        return message.reply(`Игрок **${player.username}** не участвует в игре!`);
      }

      if (!game.getAlivePlayers().has(player.id)) {
        return message.reply(`Игрок **${player.username}** мёртв!`);
      }
    }

    const votes = new Map();
    const alivePlayers = game.getAlivePlayers();
console.log(`444`, alivePlayers)
console.log(`555`, [...alivePlayers.values()][0])
    const playerNumbers = game.getGameState().playerNumbers;

    const getNumber = (id) => formatNumber(playerNumbers.get(id));

    const startEmbed = new MessageEmbed()
      .setTitle("Голосование за исключение")
      .setDescription(
        `На голосование выставлены **${players.map((player) => `${getNumber(player.id)}`).join(", ")}.**`
      );

    await message.channel.send({embeds: [startEmbed]});

    await countdown(message.channel, 5000);

    for (let i = 0; i < players.length; i++) {
      const target = players[i];

      let time = 3;
    
      const createVoteEmbed = (remainingTime) =>
        new MessageEmbed()
          .setTitle(`Голосование за исключение игрока № ${getNumber(target.id)}`)
          .setDescription(`Осталось времени: **${remainingTime}**`);

      const embedMessage = await message.channel.send({embeds: [createVoteEmbed(time)]});
const filter = m => { return m.content.trim() == "+" && alivePlayers.has(m.author.id) && !votes.has(m.author.id)} 
      const collector = message.channel
        .createMessageCollector({filter})
        .on("collect", (m) => votes.set(m.author.id, target.id));

      while (time > 0) {
        wait(1010);
        time--;

        await embedMessage.edit({embeds: [createVoteEmbed(time)]});
      }
      console.log(votes)

      console.log(votes.has(`623563022128119848`))

      collector.stop();

      const votedPlayers = [...votes]
        .filter(([, id]) => id == target.id)
        .map((vote) => vote[0]);
 if(votes.size == alivePlayers.size){
   console.log("Голосование кончилься")
    i = players.length
     }
      if (i == players.length - 1) {
        alivePlayers
          .filter((player) => !votes.has(player.id))
          .forEach((player) => {
            votedPlayers.push(player.id);
            votes.set(player.id, target.id);
          });
      }

      const closingEmbed = new MessageEmbed()
        .setTitle("--------------------------------")
        .setDescription(
          `Проголосовавшие: **${
            votedPlayers.map((player) => getNumber(player)).join(", ") || "Нет"
          }**\nВсего голосов: **${votedPlayers.length}**`
        );
        console.log(votes)
        console.log(!votes.has(`623563022128119848`))

      await message.channel.send({embeds: [closingEmbed]});
      const logchan = message.client.guilds.cache.get(`959870711680364564`).channels.cache.get('1086718359741153280')
      if (i != players.length - 1) {
        await countdown(logchan, 4000);
      }
    }

    const voteCounts = alivePlayers.map((player) => {
      const voteCount = [...votes].filter((vote) => vote[1] == player.id).length;

      return [player, voteCount];
    });

    const [maxVotedPlayer, maxVotes] = voteCounts.sort((a, b) => b[1] - a[1])[0];

    const isDraw = voteCounts.filter((voteCount) => voteCount[1] == maxVotes).length > 1;

    const endEmbed = new MessageEmbed().setTitle("Голосование окончено");

    if (isDraw) {
      endEmbed.setDescription(
        `По итогам голосования в городе объявляется **автокатастрофа**!`
      );
    } else {
      endEmbed.setDescription(
        `По итогам голосования город покидает игрок **${getNumber(maxVotedPlayer.id)}**!`
      );
    }

    const finalVotes = new Map(votes);

    alivePlayers
      .filter((player) => !votes.has(player.id))
      .forEach((player) => finalVotes.set(player.id, players[players.length - 1].id));

    endEmbed.addField(
      "Голоса",
      [...finalVotes]
        .map(
          ([playerId, targetId]) => `\`Игрок ${getNumber(playerId)} голосовал в   ${getNumber(targetId)} \``
        )
        .join("\n") || "Нет"
    );


    await message.channel.send({embeds: [endEmbed]});
    
  }
};
