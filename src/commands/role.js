const game = require("../lib/game/game");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "role",
    description: "Выдает или отбирает роль стола",
    format: "<@пользователь>",
    hostOnly: true,
    inGameOnly: true,
    run: async (message, args) => {
       setTimeout(() => message.delete(), 1000)



          let member = message.mentions.members.first();
  
  
          if (!member) {
              return message
                  .reply("Пожалуйста укажите пользователя для выдачи роли.")
                  .then((m) => m.delete({ timeout: 5000 }));
          }
  
      if(!member.roles.cache.has(`963126890393120848`)){
      member.roles.add(`963126890393120848`)
      const add = new MessageEmbed()
      .setDescription(`**Игроку ${member} была выдана роль стола**`)
      message.channel.send({embeds: [add]})
  }
  
  else{
      member.roles.remove(`963126890393120848`)
      const rem = new MessageEmbed()
      .setDescription(`**Игроку ${member} была снята роль стола**`)
      message.channel.send({embeds: [rem]})
  }
      }









    }

