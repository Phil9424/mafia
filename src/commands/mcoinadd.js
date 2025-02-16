const { MessageEmbed } = require("discord.js");

const User = require("../models/User");

module.exports = {
  name: "addcoin",
  description: "Добавляет Мкоины",
  format: "<@пользователь> <число>",
  ownerOnly: true,
  async run(message, { args: [rawUser, rawAmount] }) {
    const userMatch = rawUser && rawUser.match(/<@!?(\d+)>/);

    if (!userMatch) {
      message.reply("Пользователь не указан или указан неверно!");
      return;
    }

    const user = message.client.users.cache.get(userMatch[1]);

    if (!user) {
      message.reply("Пользователь не найден!");
      return;
    }

    const amount = Number(rawAmount);

    if (isNaN(amount)) {
      message.reply("Неверный формат числа!");
      return;
    }

    const [userData] = await User.findOrBuild({
      where: { id: user.id },
      defaults: { id: user.id }
    });

    userData.mcoins += amount;

    await userData.save();

    message.channel.send({embeds: [
      new MessageEmbed()
        .setTitle("**Mcoinы изменены**")
        .addField("**Пользователь**", `**${user}**`, true)
        .addField("**Значение**", `**${amount}**`, true)
        .addField("**Новое значение**", `**${userData.mcoins}**`)
    ]}
    );
  }
};
