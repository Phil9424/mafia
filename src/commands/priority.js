const { MessageEmbed } = require("discord.js");
const User = require("../models/User");
const ms = require('ms')
module.exports = {
    name: "prior",
    description: "Выдает или отбирает роль приоритета",
  async run(message, time) {

        if (!message.member.roles.cache.has(`975644323116900383`)) {
			return message
				.reply("❌ У Вас недостаточно прав для использования данной команды!")
		}

         
		const member = message.mentions.members.first() || message.guild.members.cache.get(mention);
          let lowpriorrole = '975640085871591445'
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


    userData.lowprior = (Number(kd) + (Date.now()))
    userData.lowpriorcheck = true
    userData.lowcount += 1
  await userData.save()
  var date = new Date(userData.lowprior);
member.roles.add(lowpriorrole).catch((error) => console.log(error))
 const embed = new MessageEmbed()
 .setTitle(`Выдача приоритета!`)
 .addField(`Низкий приоритет выдан:`, `**${member.user.tag}**`)
.addField(`Срок низкого приоритета:`, `**${date.toLocaleDateString()}**`)

message.channel.send({embeds: [embed]}).catch((error) => console.log(error))

const embedd = new MessageEmbed()
.setTitle('Низкий приоритет!')
.setDescription(`**Уважаемый ${member.user.username}, Вы попали в низкий приоритет! Сроком до ${date.toLocaleDateString()}**`)
member.send({embeds: [embedd]}).catch((error) => console.log(error))


}
    }

