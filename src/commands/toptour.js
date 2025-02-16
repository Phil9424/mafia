const { MessageEmbed } = require("discord.js");
const { Op } = require("sequelize");

const User = require("../models/User");

module.exports = {
  name: "toptour",
  description: "Отображает топ игроков по турнирному рейтингу",
  async run(message) {
    const users = await User.findAll({
      where: {
        ignore: false
      },
      order: [["tourRating", "desc"]],
      limit: 10
    });

    const topEmbed = new MessageEmbed().setTitle(
      `Топ ${users.length} игроков по турнирному рейтингу`
    );

    topEmbed.setDescription(
      users
        .map((userData, index) => {
          const number = (index + 1).toLocaleString(undefined, {
            minimumIntegerDigits: 2
          });

          const user = message.client.users.cache.get(userData.id);

          return `#${number} ${user} ${userData.tourRating}`;
        })
        .join("\n") || "\u200b"
    );

    message.channel.send({embeds: [topEmbed]});
  }
};
