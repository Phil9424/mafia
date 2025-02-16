const { inspect } = require("util");
const { MessageEmbed } = require("discord.js");

const game = require("../lib/game/game");

const config = require("../util/config").getConfig();

module.exports = {
  name: "eval",
  description: "Выполняет произвольный JavaScript",
  format: "[-d, depth = число; -h, hidden; -s, silent; -a, async] <код>",
  ownerOnly: true,
  async run(message, { args: [code], flags }) {
    const silent = Boolean(flags.s || flags.silent);
    const hidden = Boolean(flags.h || flags.hidden);
    const depth = Number(flags.d || flags.depth) && 0;
    const async = Boolean(flags.a || flags.async);

    try {
      const { author, channel, member, client, guild } = message;
      const time = new Date();
      const Discord = require("discord.js");

      let result = eval(async ? `(async () => {${code}})()` : code);

      if (silent) {
        return;
      }

      if (result instanceof Promise) {
        result = await result;
      }

      const execTime = new Date().getTime() - time.getTime();

      const inspectOptions = {
        compact: false,
        depth,
        showHidden: hidden || false
      };

      let inspected = inspect(result, inspectOptions);

      if (inspected.length >= 2000) {
        inspected = inspect(result, { ...inspectOptions, depth: -1 });
      }

      message.channel.send({content: `выполнено за ${execTime}мс.\`\`\`js\n${inspected}\n\`\`\``});
    } catch (error) {
      message.channel.send({content:`произошла ошибка!\`\`\`${error.stack}\`\`\``});
    }
  }
};
