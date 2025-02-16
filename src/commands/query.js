const { inspect } = require("util");
const { MessageEmbed } = require("discord.js");

const config = require("../util/config").getConfig();

module.exports = {
  name: "query",
  description: "Выполняет запрос к базе данных",
  format: "<запрос>",
  ownerOnly: true,
  async run(message, { args: [query], flags: { "no-limit": noLimit } }) {
    if (!query) {
      message.reply(`запрос не указан!`);
    }

    const { sequelize } = message.client;

    try {
      const time = Date.now();
      const [result, dataOrStatement] = await sequelize.query(query);
      const elapsed = Date.now() - time;

      const embed = new MessageEmbed({
        title: `Запрос к базе данных (\`${sequelize.options.dialect}\`)`,
        fields: [
          {
            name: "Запрос",
            value: query
          }
        ],
        color: 0x00ff00
      });

      if (dataOrStatement.rowCount) {
        embed.addField("Кол-во рядов", dataOrStatement.rowCount, true);
      }

      embed.addField("Время выполнения", `${elapsed}мс`, true);

      await message.channel.send({embeds: [embed]});

      if (
        query
          .toLowerCase()
          .trimLeft()
          .startsWith("select")
      ) {
        const endIndex = noLimit || result.length <= 10 ? result.length : 10;

        for (const item of result.slice(0, endIndex)) {
          await message.channel.send({content: 
            `\`\`\`json\n${JSON.stringify(item, null, 4)}\`\`\``
          });
        }
      }
    } catch (error) {
      message.channel.send({content: `произошла ошибка!\`\`\`${error.stack}\`\`\``});
    }
  }
};
