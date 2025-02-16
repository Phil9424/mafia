const { Op } = require("sequelize");
const { MessageEmbed, ReactionCollector, MessageSelectMenu, Collection, MessageActionRow, MessageButton } = require("discord.js");

const User = require("../models/User");

module.exports = {
  name: "topcoin",
  description: "Отображает топ игроков по монетам",
  async run(message) {
    const users = await User.findAll({
      where: {
        mcoins: {
          [Op.gte]: 1
        },
        ignore: false
      },
      order: [["mcoins", "desc"]],
      limit: 10
    });

    const topEmbed = new MessageEmbed().setTitle(
      `Топ ${users.length} игроков по количеству Мкоинов`
    );


       const topUsers = users
          .slice(0, Math.min(users.length, 10 + 1));
          
     topEmbed.setDescription(
  topUsers
  .map((user, index) => {


    const number = (index + 1).toLocaleString(undefined, {
      minimumIntegerDigits: 1
    })
   return `#${number}: ${message.client.users.cache.get(user.id)} - ${user.mcoins} 🪙`
  })
  .join("\n") || "\u200b"
    );


    
 
    message.channel.send({ embeds: [topEmbed] });
  }
};
