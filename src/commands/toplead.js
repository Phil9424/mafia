const { Op } = require("sequelize");
const { MessageEmbed, ReactionCollector, MessageSelectMenu, Collection, MessageActionRow, MessageButton } = require("discord.js");

const User = require("../models/User");

module.exports = {
  name: "toplead",
  description: "Отображает топ ведущих по проведенным играм",
  async run(message) {
    const users = await User.findAll({
      where: {
        hostedGameCount: {
          [Op.gte]: 1
        },
        ignore: false
      },
      order: [["hostedGameCount", "desc"]],
      limit: 10
    });

    const topEmbed = new MessageEmbed().setTitle(
      `Топ ${users.length} игроков по проведенным играм`
    );


       const topUsers = users
          .slice(0, Math.min(users.length, 10 + 1));
          
     topEmbed.setDescription(
  topUsers
  .map((user, index) => {


    const number = (index + 1).toLocaleString(undefined, {
      minimumIntegerDigits: 1
    })
   return `#${number}: ${message.client.users.cache.get(user.id)} - ${user.hostedGameCount} игр(ы)`
  })
  .join("\n") || "\u200b"
    );


    
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
       .setURL('https://docs.google.com/spreadsheets/d/1VYp2tZ2iKEUz3ZL615_WbYLNUDqHI6A08bTy5hkQIUs')
       .setLabel('Подробная таблица(Не обновлена)')
       .setStyle('LINK')
       .setDisabled(false),
    )
    message.channel.send({ embeds: [topEmbed], components: [row] });
  }
};
