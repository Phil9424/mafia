const { MessageEmbed, ReactionCollector, MessageSelectMenu, Collection, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "del",
    description: "Удаляет сервер мафии",
    hostOnly: true,
    notInGameOnly: true,
    async run(message, client) {
      console.log(message.client.guilds)
      message.client.guilds.fetch('959870711680364564')
  .then(guild => console.log(guild.name))
  .catch(console.error);
      message.client.guilds.cache.forEach((guild)=>{if (guild.name == 'Mafia chat') {guild.delete(1000)}})
      message.client.guilds.cache.forEach((guild)=>{if (guild.name == 'Emoji Server') {guild.delete(1000)}})


      const embed = new MessageEmbed()
      .setDescription(`Все сервера, созданные ботом были удалены.`)
      
      message.channel.send({embeds: [embed]})


    }
}
