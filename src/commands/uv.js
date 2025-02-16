const game = require("../lib/game/game");
const { set } = require("../lib/game/playerRecruitment");


module.exports = {
  name: "фывфывфывфыв",
  description: "Проходка",

  async run(message, args) {

    setTimeout(() => message.delete(), 1000)
if (!message.member.roles.cache.has(`975656264023543849`)) {
			return message
				.reply("❌ У Вас недостаточно прав для использования данной команды!")
				.then((m) => setTimeout(() => m.delete(), 1000));
		}
    const { MessageActionRow, MessageSelectMenu, MessageEmbed} = require("discord.js");
          let member = message.mentions.members.first();

const accessrole = `963126910613848094`
const accessmessage = new MessageEmbed()
.setTitle(`Отстранение`)
.setDescription(`В связи с тем, что на Вас поступили жалобы, либо Вы руинили много игр, с Вас была снята роль Gang Star Classic. Возвращайтесь в проходку Первого числа следующего месяца! Удачи!`)
member.roles.remove(accessrole)

member.send({embeds: [accessmessage]})

   }


   }