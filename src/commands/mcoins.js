const { MessageEmbed } = require("discord.js");
const { Op } = require("sequelize");

const User = require("../models/User");

module.exports = {
  name: "mcoins",
  description: "Отображает количество мафкоинов",
  async run(message, { args: [rawUser] }) {
  

    const userMatch = rawUser && rawUser.match(/<@!?(\d+)>/);
    if (rawUser && !userMatch) {
      return message.reply("Пользователь не указан или указан неверно!");
    }

    const user = !rawUser ? message.author : message.client.users.cache.get(userMatch[1]); 

    if (!user) {
        message.reply("Пользователь не найден!");
        return;
      }
      const [userData] = await User.findOrBuild({
        where: { id: user.id },
        defaults: { id: user.id }
      });

      const mcoins = userData.mcoins

      const mcoinsEmbed = new MessageEmbed()
      .setDescription(`Количество М-коинов пользователя ${user.tag} - ${mcoins}`)
      console.log(userData.mcoins)
      console.log(userData)

    message.channel.send({embeds: [mcoinsEmbed]});
  }
};
