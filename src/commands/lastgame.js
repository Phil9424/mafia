const { MessageEmbed } = require("discord.js");

const getLastGameResult = require("../lib/game/getLastGameResult");
const gameRoles = require("../../data/roles.json");

module.exports = {
  name: "lastgame",
  description: "Отображает информацию о последней проведённой игре",
  ownerOnly: true,
  async run(message) {
    const lastGameResult = await getLastGameResult();

    if (!lastGameResult) {
      return message.reply("Нет данных о последней игре!");
    }

    const { result, winner, updatedAt } = lastGameResult;

    const state = lastGameResult.getDeserializedState(message.client);

    const embed = new MessageEmbed();

    embed.setTitle("Последняя игра");

    embed.addField(
      "Игроки",
      state.players
        .map((player) => {
          const user = message.client.users.cache.get(player.id);

          const role = gameRoles[state.playerRoles.get(player.id)].name;

          return `${user} (${role})`;
        })
        .join("\n") || "Нет",
      true
    );

    embed.addField("Победитель", winner == "maf" ? "Мафия" : "Мирные");

    embed.addField("Ведущий", state.host);

    embed.setTimestamp(updatedAt);

    message.channel.send({embeds: [embed]});
  }
};
