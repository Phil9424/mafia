const { MessageEmbed } = require("discord.js");

const game = require("../lib/game/game");
const findSavedGame = require("../lib/game/findSavedGame");
const GameState = require("../lib/game/GameState");

const LOAD_EMOJI = "✅";
const CANCEL_EMOJI = "❌";
const INFO_EMOJI = "ℹ️";

const gameRoles = require("../../data/roles.json");
const gameModes = require("../../data/modes.json");

const config = require("../util/config").getConfig();

module.exports = {
  name: "load",
  description: "Загружает сохранённую игру",
  hostOnly: true,
  notInGameOnly: true,
  async run(message) {
    const savedGame = await findSavedGame();

    if (!savedGame) {
      return message.channel.send({ content : 'Сохранение не найдено!' });
    }

    const { state, updatedAt: saveDate } = savedGame;

    const savedGameState = GameState.deserialize(message.client, state);

    const loadEmbed = new MessageEmbed();

    loadEmbed.setTitle("Сохранённая игра");
    loadEmbed.setDescription(
      `Информация о сохранённой игре. Нажмите ${LOAD_EMOJI} в течение минуты чтобы загрузить игру. Нажмите ${INFO_EMOJI} для того чтобы отправить игрокам и ведущему информацию о ролях.`
    );

    loadEmbed.addField("Режим игры", gameModes[savedGameState.mode].name, true);

    loadEmbed.addField(
      "Игроки",
      savedGameState.sortedMembers.map((player) => `${player}`).join("\n") || "Нет",
      true
    );

    loadEmbed.addField(
      "Живые игроки",
      savedGameState.alivePlayers.map((player) => `${player}`).join("\n") || "Нет",
      true
    );

    const gameProgress = `${savedGameState.state == "day" ? "День" : "Ночь"} ${
      savedGameState.day
    }`;

    loadEmbed.addField("Прогресс", gameProgress, true);

    loadEmbed.setTimestamp(saveDate);

    const loadMessage = await message.channel.send({embeds: [loadEmbed]});

    await loadMessage.react(LOAD_EMOJI);
    await loadMessage.react(CANCEL_EMOJI);
    await loadMessage.react(INFO_EMOJI);
const filter = (r, u) => [LOAD_EMOJI, CANCEL_EMOJI].includes(r.emoji.name) && u.id == message.author.id
    const loadCollector = await loadMessage.awaitReactions({filter,
       maxUsers: 1, 
       time: 60000 }
    );

    const loadReaction = loadCollector.find((r) => r.emoji.name == LOAD_EMOJI);
    const cancelReaction = loadCollector.find((r) => r.emoji.name == CANCEL_EMOJI);
    const infoReaction = loadMessage.reactions.cache.find(
      (r) => r.emoji.name == INFO_EMOJI && r.users.cache.has(message.author.id)
    );

    if (cancelReaction || !loadReaction) {
      return message.channel.send({content : "Загрузка отменена!"});
    }

    savedGameState.host = message.author;

    await message.author.send({content :`**Игра загружена!** (\`${gameProgress}\`)`});

    if (infoReaction) {
      const playerInfoEmbed = new MessageEmbed()
        .setTitle("**InMafia**")
        .setDescription("**Список игроков**");

      [...savedGameState.playerNumbers]
        .sort((a, b) => a[1] - b[1])
        .sort(([a], [b]) => {
          const firstRole = gameRoles[savedGameState.playerRoles.get(a)];
          const secondRole = gameRoles[savedGameState.playerRoles.get(b)];

          return firstRole.order - secondRole.order;
        })
        .forEach(([id, number]) => {
          const player = savedGameState.players.get(id);
          const deathMarker = savedGameState.alivePlayers.has(id) ? "✅" : "❌";

          const role = savedGameState.playerRoles.get(id);
          const roleInfo = gameRoles[role];
          const isActive = role != "mir";

          playerInfoEmbed.addField(
            `#${number}: ${player.user.tag} ${deathMarker}`,
            isActive ? `**${roleInfo.name}**` : roleInfo.name
          );
        });

      await message.author.send(playerInfoEmbed);

      await Promise.all(
        savedGameState.alivePlayers.map(async (player) => {
          const roleInfo = gameRoles[savedGameState.playerRoles.get(player.id)];

          const roleEmbed = new MessageEmbed()
            .setAuthor("**G A N G  S T A R**")
            .setTitle(`**Ваша роль - ${roleInfo.name}**`)
            .setImage(roleInfo.image);

          await player
            .send({embeds: [roleEmbed]})
            .catch(() =>
              message.client.channels.cache
                .get(config.logChannel)
                .send({content :`**Не удалось отправить сообщение игроку ${player}!**`})
            );
        })
      );
    }

    await Promise.all(
      savedGameState.alivePlayers.map(async (player) => {
        const nickname = savedGameState.playerNumbers
          .get(player.id)
          .toLocaleString(undefined, {
            minimumIntegerDigits: 2
          });

        const faulCount = savedGameState.playerFauls.get(player.id) || 0;
        const warnCount = savedGameState.playerWarns.get(player.id) || 0;

        player
          .setNickname(
            `${nickname} ${"П".repeat(warnCount)}${warnCount > 0 ? " " : ""}${"Ф".repeat(
              faulCount
            )}`
          )
          .catch(() => {
            if (infoReaction) {
              message.client.channels.cache
                .get(config.gameChannel)
                .send(
                  `Не удалось изменить ник игроку ${player}, его номер: **${nickname}** ${
                    (faulCount || warnCount) > 0 ? `(${warnCount}П, ${faulCount}Ф)` : ""
                  }`
                );
            }
          });

        if (savedGameState.state == "day" && !player.roles.cache.has(config.gameRole)) {
          await player.roles.add(config.gameRole);
        }

        if (savedGameState.state == "night" && player.roles.cache.has(config.gameRole)) {
          await player.roles.remove(config.gameRole);
        }
      })
    );

    game.setGameState(savedGameState);
    console.log([...savedGameState.alivePlayers])

    await message.client.channels.cache
      .get(config.gameChannel)
      .send({content :`**Игра загружена!** (\`${gameProgress}\`)`});

    for (const player of [...savedGameState.alivePlayers.values()]) {
      await message.client.channels.cache.get(config.gameChannel).send({content :`${player}`});
    }
  }
};
