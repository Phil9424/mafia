const { MessageEmbed } = require("discord.js");

const config = require("../util/config").getConfig();

module.exports = {
  name: "help",
  description: "Отображает справку о командах",
  run(message) {
    const helpEmbed = new MessageEmbed().setTitle("Доступные команды");

    message.client.commands.forEach((command) => {
      if (!config.owners.includes(message.author.id) && command.ownerOnly) {
        return;
      }

      if (
        command.hostOnly &&
        (!message.guild || !message.member.roles.cache.has(config.hostRole)) &&
        !config.owners.includes(message.author.id)
      ) {
        return;
      }

      helpEmbed.addField(
        `${config.prefix}${command.name} ${command.format || ""}`,
        command.description || "<Без описания>"
      );
    });

    message.channel.send(helpEmbed);
  },
};
