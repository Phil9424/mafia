const { MessageEmbed } = require("discord.js");
const User = require("../models/User");
const ms = require('ms')
module.exports = {
    name: "hp",
    description: "Выдает или отбирает роль Высокого приоритета",
  async run(message, time) {

        if (!message.member.roles.cache.has(`975644323116900383`)) {
			return message
				.reply("❌ У Вас недостаточно прав для использования данной команды!")
		}

         
		const member = message.mentions.members.first() || message.guild.members.cache.get(mention);
          let lowpriorrole = '1131494456416288878'
          const [userData] = await User.findOrBuild({
            where: { id: member.id },
            defaults: { id: member.id },
        })
    if(!member){
		return message
				.reply("Пожалуйста линканите пользователя для выдачи приоритета.")

    }
    if(!time){
      return message
      .reply("Пожалуйста напишите время для выдачи приоритета.")
    }
  const kd = ms(`${time.args[1]}`)


    userData.highprior = (Number(kd) + (Date.now()))
    userData.highpriorcheck = true
  await userData.save()
  var date = new Date(userData.highprior);
member.roles.add(lowpriorrole).catch((error) => console.log(error))
 const embed = new MessageEmbed()
 .setTitle(`Выдача приоритета!`)
 .addField(`Высокий приоритет выдан:`, `**${member.user.tag}**`)
.addField(`Срок высокого приоритета:`, `**${date.toLocaleDateString()}**`)

message.channel.send({embeds: [embed]}).catch((error) => console.log(error))

const embedd = new MessageEmbed()
.setTitle('Высокий приоритет!')
.setDescription(`**Уважаемый ${member.user.username}, Поздравляем, Вы получили приоритет! Сроком до ${date.toLocaleDateString()}**`)
member.send({embeds: [embedd]}).catch((error) => console.log(error))


}
    }

