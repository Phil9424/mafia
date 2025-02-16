const { MessageEmbed } = require("discord.js");
const User = require("../models/User");
const ms = require('ms')
module.exports = {
    name: "unprior",
    description: "Отбирает роль приоритета",
  async run(message, mention) {

        if (!message.member.roles.cache.has(`975644323116900383`)) {
			return message
				.reply("❌ У Вас недостаточно прав для использования данной команды!")
		}

   
		const member = message.mentions.members.first() || message.guild.members.cache.get(mention);
                  if(!member){
		return message
				.reply("Пожалуйста линканите пользователя для снятия приоритета.")

    }
  

          let lowpriorrole = '975640085871591445'
          const [userData] = await User.findOrBuild({
            where: { id: member.id },
            defaults: { id: member.id },
        })


    userData.lowpriorcheck = false
  await userData.save()
member.roles.remove(lowpriorrole).catch((error) => console.log(error))
 const embed = new MessageEmbed()
 .setTitle(`Снятие приоритета!`)
 .addField(`Низкий приоритет снят:`, `**${member.user.tag}**`)
.addField(`Снял:`, `**${message.author}**`)

message.channel.send({embeds: [embed]}).catch((error) => console.log(error))

const embedd = new MessageEmbed()
.setTitle('Низкий приоритет!')
.setDescription(`**Уважаемый ${member.user.username}, Вам сняли низкий приоритет! Снял: ${message.author}.**`)
member.send({embeds: [embedd]}).catch((error) => console.log(error))


}
    }

