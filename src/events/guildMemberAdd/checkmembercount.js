const game = require("../../lib/game/game");

module.exports = async (client, member) => {
    const guilde = client.guilds.cache.find(guild => guild.name === "Mafia chat");
    if (!guilde) return
    if (!guilde.members.cache.has(member.id)) return
    const { MessageEmbed, MessageEmbedAuthor, MessageActionRow, MessageButton } = require("discord.js");
    const sleep = require('util').promisify(setTimeout)
    var chx = guilde.channels.cache.filter(chx => chx.type === 'GUILD_TEXT').find(x => x.position === 0);
    if(game.hoss.hoss === member.id){

      
      const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setCustomId(`start`)
        .setStyle(`SUCCESS`)
        .setLabel(`Начать договорку`)
        .setDisabled(false)
      )
      const startEmbed = new MessageEmbed()
      .setTitle(`Договорка`)
      .setDescription(`Когда все игроки будут готовы = нажмите кнопку ниже, для старта договорки`)
      await chx.send({embeds: [startEmbed], components: [row]})
      const startCollector = chx.createMessageComponentCollector((i, u) =>
      i.customId == 'start' && hasHostPermissions(u)
    );
    startCollector.on('collect', async interaction => {
      if (interaction.customId == "start") {
         if (interaction.member.user.id == game.hoss.hoss){
       row.components[0].setDisabled(true)
          interaction.update({ embeds: [startEmbed], components: [row] })

       dogovorka()
        
      }
      }
    })
  
    };
  async function dogovorka()  {

    const gjk = new MessageEmbed()
    .setDescription(`**Тройка мафов и судья на месте.**`)

       chx.send({embeds: [gjk]})
       await sleep(6500)

    const kkk = new MessageEmbed()
    .setDescription(`**1.5 минуты на договорку, время пошло.**`)
    await chx.send({embeds: [kkk]})
    await client.channels.cache
    .get(`975452837230289056`)
    .send({embeds: [kkk]});
    await   guilde.channels.cache.first().permissionOverwrites.edit(guilde.roles.everyone, { SEND_MESSAGES: true });


    const first = new MessageEmbed()
    .setDescription(`**Осталась 1 минута**`)
    const second = new MessageEmbed()
    .setDescription(`**Осталось 30 секунд**`)
    const third = new MessageEmbed()
    .setDescription(`**Осталось 10 секунд**`)
    const fourth = new MessageEmbed()
    .setDescription(`**Договорка окончена!**`)
      await sleep(30000)
      await chx.send({embeds: [first]})
       await client.channels.cache
    .get(`975452837230289056`)
    .send({embeds: [first]});
      await sleep(30000)
      await chx.send({embeds: [second]})
       await client.channels.cache
    .get(`975452837230289056`)
    .send({embeds: [second]});
      await sleep(20000)
      await chx.send({embeds: [third]}) 
 await client.channels.cache
    .get(`975452837230289056`)
    .send({embeds: [third]});
      await sleep(10000)
      
      await chx.send({embeds: [fourth]})
 await client.channels.cache
    .get(`975452837230289056`)
    .send({embeds: [fourth]});
await guilde.delete(1000);
await sleep(5000)
game.starting()
  }
    
}