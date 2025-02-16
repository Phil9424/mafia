const game = require("../lib/game/game");
const { MessageActionRow, MessageSelectMenu} = require("discord.js");


module.exports = {
  name: "point",
  description: "Допы",
  hostOnly: true,
  inGameOnly: true,
  async run(message, { args: [rawPlayer] }) {
    const playerMatch = rawPlayer && rawPlayer.match(/<@!?(\d+)>/);
    if (!playerMatch) {
      message.reply({content: "Игрок не указан или указан неверно!"}).catch((e) => console.log(e));
      return;
    }
    const player = message.client.users.cache.get(playerMatch[1]);


   const row = new MessageActionRow()
   .addComponents(
     new MessageSelectMenu()
     .setCustomId(`points`)
     .setPlaceholder(`Выберите качество игры`)
     .setMaxValues(1)
     .addOptions([
       {
         label: `Ужасно`,
         value: `21`

       },
       {
        label: `Плохо`,
        value: `16`

      },
      {
        label: `Нормально`,
        value: `0`

      },
      {
        label: `Хорошо`,
        value: `15`

      },
      {
        label: `Отлично`,
        value: `20`

      },

     ])
   )
   await message.channel.send({components: [row]}).catch((e) => console.log(e))
   const filter = (interaction) => interaction.isSelectMenu()

   const collector = message.channel.createMessageComponentCollector({
     filter,
     max: "1",
     time: 20000
     });
   
     collector.on(`collect`, async (collected) => {
      if(collected.values.length == 1){
        const value = collected.values[0]
          if(value == 21){
            game.addBons(player, Number(-20) + Number(Math.random()*10))
            message.channel.send({content: `Выданы Штрафные баллы игроку ${player}`, ephemeral: true})
          }
          if(value == 16){
            game.addBons(player, Number(-15) + Number(Math.random()*10))
            message.channel.send({content: `Выданы Штрафные баллы игроку ${player}`, ephemeral: true})
          }
          if(value == 0){
            game.addBons(player, Number(0))
            message.channel.send({content: `Выданы доп баллы игроку ${player}`, ephemeral: true})
          }
          if(value == 15){
            game.addBons(player, Number(15) + Number(Math.random()*10))
            message.channel.send({content: `Выданы доп баллы игроку ${player}`, ephemeral: true})
          }
          if(value == 20){
            game.addBons(player, Number(20) + Number(Math.random()*10))
            message.channel.send({content: `Выданы доп баллы игроку ${player}`, ephemeral: true})
          }
      }
    })
   }
   }
