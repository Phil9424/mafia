const { MessageEmbed } = require("discord.js");
const User = require("../models/User");
const ms = require('ms')
module.exports = {
    name: "ыгврашгыврпыгшврпывгш",
    description: "Выдает или отбирает роль бана",
  async run(message, time) {

        if (!message.member.roles.cache.has(`975644323116900383`)) {
			return message
				.reply("❌ У Вас недостаточно прав для использования данной команды!")
				.then(setTimeout(() => m.delete(), 5000));
		}

         
		const member = message.mentions.members.first() || message.guild.members.cache.get(mention);
          let lowpriorrole = '975639281395712040'
          const [userData] = await User.findOrBuild({
            where: { id: member.id },
            defaults: { id: member.id },
        })
    if(!member){
		return message
				.reply("Пожалуйста линканите пользователя для выдачи Бана.")
				.then(setTimeout(() => m.delete(), 5000));

    }
    if(!time){
      return message
      .reply("Пожалуйста напишите время для выдачи Бана.")
      .then(setTimeout(() => m.delete(), 5000));
    }
  const kd = ms(`${time.args[1]}`)


    userData.ban = (Number(kd) + (Date.now()))
    userData.bancheck = true
  await userData.save()
  var date = new Date(userData.ban);
member.roles.add(lowpriorrole)
 const embed = new MessageEmbed()
 .setTitle(`Выдача игровой блокировки!`)
 .addField(`Игровая блокировка:`, `**${member.user.tag}**`)
.addField(`Срок игровой блокировки:`, `**${date.toLocaleDateString()}**`)

message.channel.send({embeds: [embed]})

const embedd = new MessageEmbed()
.setTitle('Игровая блокировка!')
.setDescription(`**Уважаемый ${member.user.username}, Вы попали в игровую блокировку! Сроком до ${date.toLocaleDateString()}**`)
member.send({embeds: [embedd]})


}
    }

