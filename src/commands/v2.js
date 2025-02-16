const { MessageEmbed, Collection } = require("discord.js");

const game = require("../lib/game/game");
const gameRoles = require("../../data/roles.json");

const vote = require("./vote");

const MENTION_PATTERN = /<@!?(\d+)>/;

function wait(ms) {
  const start = Date.now();
  while (Date.now() - start < ms);
}

async function countdown(channel, time, { interval = 1000 } = {}) {
  let n = time / interval;

  const countdownMessage = await channel.send(`**${n}**`);

  for (let i = n - 1; i >= 0; i--) {
    wait(1030);

    await countdownMessage.edit(`**${i}**`);
  }
}

const formatNumber = (number) =>
  number.toLocaleString(undefined, {
    minimumIntegerDigits: 2
  });

module.exports = {
  name: "v2",
  description: "Запускает голосование за исключение игроков",
  format: "<@пользователь> <@пользователь> ...",
  hostOnly: true,
  inGameOnly: true,
  async run(message, { args: rawPlayers }) {
    if (rawPlayers.length < 2) {
      return message.reply("Вы должны указать как минимум 2х игроков!");
    }

    for (const rawPlayer of rawPlayers) {
      if (!MENTION_PATTERN.test(rawPlayer)) {
        return message.reply(`Неверный формат указания игрока: \`${rawPlayer}\``);
      }
    }

    const players = await Promise.all(
      rawPlayers.map(async (rawPlayer) =>
        message.client.users.cache.get(rawPlayer.match(MENTION_PATTERN)[1])
      )
    );

    for (let i = 0; i < players.length; i++) {
      const player = players[i];

      if (!player) {
        return message.reply(`Игрок ${rawPlayers[i]} не найден!`);
      }

      if (!game.getPlayers().has(player.id)) {
        return message.reply(`Игрок **${player.username}** не участвует в игре!`);
      }

      if (!game.getAlivePlayers().has(player.id)) {
        return message.reply(`Игрок **${player.username}** мёртв!`);
      }
    }

    const votes = new Map();
    const alivePlayers = game.getAlivePlayers();

    const playerNumbers = game.getGameState().playerNumbers;

    const getNumber = (id) => formatNumber(playerNumbers.get(id));

    const startEmbed = new MessageEmbed()
      .setTitle("Голосование за подъем")
      .setDescription(
        `Поднимаются игроки **${players.map((player) => `${getNumber(player.id)}`).join(", ")}.**`
      );

    await message.channel.send({embeds: [startEmbed]});

    await countdown(message.channel, 5000);

  
      const target = players.map((player) => `${getNumber(player.id)}`).join(", ")

      let time = 3;

      const createVoteEmbed = (remainingTime) =>
        new MessageEmbed()
          .setTitle(`Кто за то что бы стол покинули игроки № ${target}`)
          .setDescription(`Осталось времени: **${remainingTime}**`);

      const embedMessage = await message.channel.send({embeds: [createVoteEmbed(time)]});
      const filter = m => { return m.content.trim() == "+" && alivePlayers.has(m.author.id)} 
      const collector = message.channel
        .createMessageCollector({filter})
        .on("collect", (m) => votes.set(m.author.id));

      while (time > 0) {
        wait(1010);
        time--;

        await embedMessage.edit({embeds: [createVoteEmbed(time)]});
      }
      console.log(votes)


      collector.stop();

      const votedPlayers = [...votes]
        .filter(([, id]) => id == target.id)
        .map((vote) => vote[0]);

      const closingEmbed = new MessageEmbed()
        .setTitle("--------------------------------")
        .setDescription(
          `Проголосовавшие: **${
            votedPlayers.map((player) => getNumber(player)).join(", ") || "Нет"
          }**\nВсего голосов: **${votedPlayers.length}**`
        );
        console.log(votes)

      await message.channel.send({embeds: [closingEmbed]});
  

  

   



    const islow = votes.size <= (alivePlayers.size / 2)
    const ishigh = votes.size > (alivePlayers.size / 2)
console.log(votes.size)
console.log(alivePlayers.size / 2)
console.log(alivePlayers.size)
console.log(alivePlayers)
console.log(target)
console.log(`222`, votedPlayers)
    const endEmbed = new MessageEmbed().setTitle("Голосование окончено");

    if (ishigh) {
      endEmbed.setDescription(
        `По итогам голосования город покидают игроки **${target}**!`

      );
      /*
     const are = new Map()
           if(players.length == 2){
        const teamFilter = (team) => (player) =>
        gameRoles[game.getGameState().playerRoles.get(player.id)].team == team;

       alivePlayers.filter((player) => votedPlayers.includes(player.id))
       .forEach((player) => {
         are.set(player.id, player);
       });
console.log(`e34`, are)
console.log(Array.from(are.values()))
console.log(players)

        const mirpl = Array.from(are.values()).filter(teamFilter("mir"));
        const mafpl = Array.from(are.values()).filter(teamFilter("maf"));
      const rolll = gameRoles[game.getGameState().playerRoles.get(players[0].id)].team
      const rollll = gameRoles[game.getGameState().playerRoles.get(players[1].id)].team
      console.log(mirpl)
      console.log(game.getAlivePlayers().size)

      if(rolll == rollll && rolll == `mir`) {
        console.log(mirpl)
        const { MessageActionRow, MessageSelectMenu} = require("discord.js");
        const row = new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
          .setCustomId('vybor')
          .setPlaceholder('Выберите исход')
          .setMaxValues(1)
          .addOptions([
            {
              description: `Никто не агитировал за подъем`,
              label: `1`,
              value: `0.2`,
            },

 {
              description: `Два дауна закусились`,
              label: `2`,
              value: `0.4`,
            },
         
          ]))
          const dalbone = mirpl.filter((player) => player.id == players[0].id)
          const dalbtwo = mirpl.filter((player) => player.id == players[1].id)
console.log(dalbone)
console.log(dalbtwo)

       const rss = await game.getGameState().host.send({components: [row]})
console.log(rss.channel)

        const filter = (interaction) => interaction.isSelectMenu()
        const collector = rss.channel.createMessageComponentCollector({
          filter,
          max: "1",
          time: 60000
          });
          collector.on(`collect`, async (collected) => {
          
  
            const value = collected.values[0]
            console.log(`125`, value)
            
            if(value == 0.2){
              for (let i = 0; i < mirpl.length; i++) {

                game.addFin(mirpl[i], Number(value))


              }
              for (let i = 0; i < mafpl.length; i++) {
                game.addBons(mafpl[i], Number(0.1))


              }
      
            rss.channel.send({content:`Выбрано 1`})
          }
            else if(value == 0.4) {
              console.log(`123`, value)
              const dalbone = mirpl.filter((player) => player.id == players[0].id)
              const dalbtwo = mirpl.filter((player) => player.id == players[1].id)
              rss.channel.send({content:`Выбрано 2`})
              game.addFin(dalbone, Number(0.4))
              game.addFin(dalbtwo, Number(0.4))

console.log(dalbone[0])
console.log(dalbtwo[0])


            }
           


          })
    collector.on(`end`, async (reason) => {

       if(reason == `time`){
        for (let i = 0; i < mirpl.length; i++) {

          game.addFin(mirpl[i], Number(0.2))
        
        
        }
   
       }

      
    })
      

      }
      if(rolll == rollll && rolll == `maf` ) {
        console.log(mirpl)
        const { MessageActionRow, MessageSelectMenu} = require("discord.js");
        const row = new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
          .setCustomId('vybor')
          .setPlaceholder('Выберите исход')
          .setMaxValues(1)
          .addOptions([
            {
              description: `Никто не агитировал за подъем`,
              label: `1`,
              value: `0.2`,
            },

 {
              description: `Два дауна закусились`,
              label: `2`,
              value: `0.4`,
            },
         
          ]))
          const dalbone = mirpl.filter((player) => player.id == players[0].id)
          const dalbtwo = mirpl.filter((player) => player.id == players[1].id)
console.log(dalbone)
console.log(dalbtwo)

       const rss = await game.getGameState().host.send({components: [row]})
console.log(rss.channel)

        const filter = (interaction) => interaction.isSelectMenu()
        const collector = rss.channel.createMessageComponentCollector({
          filter,
          max: "1",
          time: 60000
          });
          collector.on(`collect`, async (collected) => {
          
  
            const value = collected.values[0]
            console.log(`125`, value)
            
            if(value == 0.2){
              for (let i = 0; i < mirpl.length; i++) {

                game.addBons(mirpl[i], Number(value))


              }
              for (let i = 0; i < mafpl.length; i++) {
                game.addFin(mafpl[i], Number(0.4))


              }
      
            rss.channel.send({content:`Выбрано 1`})
          }
            else if(value == 0.4) {
              console.log(`123`, value)
              const dalbone = mirpl.filter((player) => player.id == players[0].id)
              const dalbtwo = mirpl.filter((player) => player.id == players[1].id)
              rss.channel.send({content:`Выбрано 2`})
console.log(dalbone[0])
console.log(dalbtwo[0])

game.addFin(dalbone, Number(0.5))
game.addFin(dalbtwo, Number(0.5))
            }
           


          })
    collector.on(`end`, async (reason) => {

       if(reason == `time`){
        for (let i = 0; i < mafpl.length; i++) {

          game.addFin(mafpl[i], Number(0.2))
        
        
        }
   
       }

      
    })
      

      }
      
      }
      else if(players.length == 3){
        const teamFilter = (team) => (player) =>
        gameRoles[game.getGameState().playerRoles.get(player.id)].team == team;

       alivePlayers.filter((player) => votedPlayers.includes(player.id))
       .forEach((player) => {
         are.set(player.id, player);
       });
console.log(`e34`, are)
console.log(Array.from(are.values()))
console.log(players)

        const mirpl = Array.from(are.values()).filter(teamFilter("mir"));
        const mafpl = Array.from(are.values()).filter(teamFilter("maf"));
      const rolll = gameRoles[game.getGameState().playerRoles.get(players[0].id)].team
      const rollll = gameRoles[game.getGameState().playerRoles.get(players[1].id)].team
      const rolllll = gameRoles[game.getGameState().playerRoles.get(players[2].id)].team
    
      if(rolll == rollll && rolll == rolllll && rolll == `mir` ) {
        console.log(mirpl)
        const { MessageActionRow, MessageSelectMenu} = require("discord.js");
        const row = new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
          .setCustomId('vybor')
          .setPlaceholder('Выберите исход')
          .setMaxValues(1)
          .addOptions([
            {
              description: `Никто не агитировал за подъем`,
              label: `1`,
              value: `0.2`,
            },

 {
              description: `Два дауна закусились`,
              label: `2`,
              value: `0.4`,
            },
            ,
            {
              description: `Игроки Жестко агитировали подъем.`,
              label: `3`,
              value: `0.5`,
            },

         
          ]))
          const dalbone = mirpl.filter((player) => player.id == players[0].id)
          const dalbtwo = mirpl.filter((player) => player.id == players[1].id)
console.log(dalbone)
console.log(dalbtwo)

       const rss = await game.getGameState().host.send({components: [row]})
console.log(rss.channel)

        const filter = (interaction) => interaction.isSelectMenu()
        const collector = rss.channel.createMessageComponentCollector({
          filter,
          max: "1",
          time: 60000
          });
          collector.on(`collect`, async (collected) => {
          
  
            const value = collected.values[0]
            console.log(`125`, value)
            
            if(value == 0.2){
              for (let i = 0; i < mirpl.length; i++) {

                game.addFin(mirpl[i], Number(0.4))


              }
              for (let i = 0; i < mafpl.length; i++) {
                game.addBons(mafpl[i], Number(0.5))


              }
      
            rss.channel.send({content:`Выбрано 1`})
          }
            else if(value == 0.4) {
              console.log(`123`, value)
              const dalbone = mirpl.filter((player) => player.id == players[0].id)
              const dalbtwo = mirpl.filter((player) => player.id == players[1].id)
              const dalbthree = mirpl.filter((player) => player.id == players[2].id)

              rss.channel.send({content:`Выбрано 2`})
              game.addFin(dalbone, Number(0.5))
              game.addFin(dalbtwo, Number(0.5))
              game.addFin(dalbthree, Number(0.5))


console.log(dalbone[0])
console.log(dalbtwo[0])


            }
            else if(value == 0.5){
          
              const { MessageActionRow, MessageSelectMenu} = require("discord.js");
              console.log(`222`)
         let sd = []
              for (let i = 0; i < alivePlayers.size; i++){
         
         let Object = {
         description: `${i}`,
         label: [...alivePlayers.values()][i].user.username,
                     value: [...alivePlayers.values()][i].id,
         }
         sd.push(Object)
         const rowtwo = new MessageActionRow()
         
         
         .addComponents(
         new MessageSelectMenu()
         .setCustomId('vybor')
         .setPlaceholder('Выберите исход')
         .setMinValues(1)
         .setMaxValues(i+1)
         .addOptions(
         
           sd
         
         
         )
         )
         
         if(i + 1 == alivePlayers.size) {
         
         rss.channel.send({components: [rowtwo]})
         const collector = rss.channel.createMessageComponentCollector({
         filter,
         max: "1",
         time: 60000
         });
         collector.on(`collect`, async (collected) => {
         
         const values = collected.values
         console.log(values)
         
         
         if(collected.values.length > 1){
          console.log(`1`)
          console.log(`22`, alivePlayers)
          console.log(`22`, alivePlayers.has(values[i]))
          
          alivePlayers.filter((player) => alivePlayers.has(values[i])).forEach((player => {
  
            const teamFilter = (team) => (player) =>
            gameRoles[game.getGameState().playerRoles.get(player.id)].team == team;
            
          const vvv = gameRoles[game.getGameState().playerRoles.get(player.id)].team
     
      })
      )
         for (let i = 0; i < mafpl.length; i++) {
          game.addBons(mafpl[i], Number(0.7))
          console.log(`2`)


        }  
        for (let i = 0; i < mirpl.length; i++) {
          console.log(`3`)

          game.addFin(mirpl[i], Number(0.5))


        }
       
      
     
          rss.channel.send({content: `Соответствующие баллы выданы!`
})
collector.stop()
         }
         else if(collected.values.length == 1){
     console.log(mafpl)
     const teamFilter = (team) => (player) =>
     gameRoles[game.getGameState().playerRoles.get(player.id)].team == team;
const vvv = gameRoles[game.getGameState().playerRoles.get(collected.values[0])].team
if(vvv == `maf`){
             game.addBons(alivePlayers.get(`${values[0]}`), Number(0.4))
          rss.channel.send({content: `Соответствующие баллы выданы!`
        
        })
        collector.stop()


      }
      else if(vvv == `mir`){
        game.addFin(alivePlayers.get(`${values[0]}`), Number(0.4))
     rss.channel.send({content: `Соответствующие баллы выданы!`
   
   })
   collector.stop()


 }
           for (let i = 0; i < mafpl.length; i++) {
            game.addBons(mafpl[i], Number(0.7))


          }  
          for (let i = 0; i < mirpl.length; i++) {

            game.addFin(mirpl[i], Number(0.5))


          }
         }
        })
      }
    }
            }
          


          })
    collector.on(`end`, async (reason) => {

       if(reason == `time`){
        for (let i = 0; i < mirpl.length; i++) {

          game.addFin(mirpl[i], Number(0.2))
        
        
        }
   
       }

      
    })
      

      
  
  
  }
  else   if(rolll == rollll && rolll == rolllll && rolll == `maf` ) {
    console.log(mirpl)
    const { MessageActionRow, MessageSelectMenu} = require("discord.js");
    const row = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
      .setCustomId('vybor')
      .setPlaceholder('Выберите исход')
      .setMaxValues(1)
      .addOptions([
        {
          description: `Никто не агитировал за подъем`,
          label: `1`,
          value: `0.2`,
        },

{
          description: `Два дауна закусились`,
          label: `2`,
          value: `0.4`,
        },
        ,
        {
          description: `Игроки Жестко агитировали подъем.`,
          label: `3`,
          value: `0.5`,
        },

     
      ]))
      const dalbone = mirpl.filter((player) => player.id == players[0].id)
      const dalbtwo = mirpl.filter((player) => player.id == players[1].id)
console.log(dalbone)
console.log(dalbtwo)

   const rss = await game.getGameState().host.send({components: [row]})
console.log(rss.channel)

    const filter = (interaction) => interaction.isSelectMenu()
    const collector = rss.channel.createMessageComponentCollector({
      filter,
      max: "1",
      time: 60000
      });
      collector.on(`collect`, async (collected) => {
      

        const value = collected.values[0]
        console.log(`125`, value)
        
        if(value == 0.2){
          for (let i = 0; i < mirpl.length; i++) {

            game.addBons(mirpl[i], Number(0.4))


          }
          for (let i = 0; i < mafpl.length; i++) {
            game.addFin(mafpl[i], Number(0.6))


          }
  
        rss.channel.send({content:`Выбрано 1`})
      }
        else if(value == 0.4) {
          console.log(`123`, value)
          const dalbone = mirpl.filter((player) => player.id == players[0].id)
          const dalbtwo = mirpl.filter((player) => player.id == players[1].id)
          const dalbthree = mirpl.filter((player) => player.id == players[2].id)

          rss.channel.send({content:`Выбрано 2`})
          game.addFin(dalbone, Number(0.8))
          game.addFin(dalbtwo, Number(0.8))
          game.addFin(dalbthree, Number(0.8))


console.log(dalbone[0])
console.log(dalbtwo[0])


        }
        else if(value == 0.5){
      
          const { MessageActionRow, MessageSelectMenu} = require("discord.js");
          console.log(`222`)
     let sd = []
          for (let i = 0; i < alivePlayers.size; i++){
     
     let Object = {
     description: `${i}`,
     label: [...alivePlayers.values()][i].user.username,
                 value: [...alivePlayers.values()][i].id,
     }
     sd.push(Object)
     const rowtwo = new MessageActionRow()
     
     
     .addComponents(
     new MessageSelectMenu()
     .setCustomId('vybor')
     .setPlaceholder('Выберите исход')
     .setMinValues(1)
     .setMaxValues(i+1)
     .addOptions(
     
       sd
     
     
     )
     )
     
     if(i + 1 == alivePlayers.size) {
     
     rss.channel.send({components: [rowtwo]})
     const collector = rss.channel.createMessageComponentCollector({
     filter,
     max: "1",
     time: 60000
     });
     collector.on(`collect`, async (collected) => {
     
     const values = collected.values
     console.log(values)
     
     
     if(collected.values.length > 1){

      
     alivePlayers.filter((player) => alivePlayers.has(values[i])).forEach((player => {
      const teamFilter = (team) => (player) =>
      gameRoles[game.getGameState().playerRoles.get(player.id)].team == team;
      const vvv = gameRoles[game.getGameState().playerRoles.get(collected.values[i])].team
     
  
      for (let i = 0; i < mafpl.length; i++) {
        game.addFin(mafpl[i], Number(0.7))
        console.log(`2`)


      }  
      for (let i = 0; i < mirpl.length; i++) {
        console.log(`3`)

        game.addBons(mirpl[i], Number(0.9))


      }
     })
     
     )
     }
     else if(collected.values.length == 1){
 console.log(mafpl)
 const teamFilter = (team) => (player) =>
 gameRoles[game.getGameState().playerRoles.get(player.id)].team == team;
const vvv = gameRoles[game.getGameState().playerRoles.get(collected.values[0])].team
if(vvv == `maf`){
         game.addFin(alivePlayers.get(`${values[0]}`), Number(0.7))
      rss.channel.send({content: `Соответствующие баллы выданы!`
    
    })
    collector.stop()


  }
  else if(vvv == `mir`){
    game.addBons(alivePlayers.get(`${values[0]}`), Number(0.9))
 rss.channel.send({content: `Соответствующие баллы выданы!`

})
collector.stop()


}
       for (let i = 0; i < mafpl.length; i++) {
        game.addBons(mafpl[i], Number(0.3))


      }  
      for (let i = 0; i < mirpl.length; i++) {

        game.addFin(mirpl[i], Number(0.5))


      }
     }
    })
  }
}
        }
      


      })
collector.on(`end`, async (reason) => {

   if(reason == `time`){
    for (let i = 0; i < mirpl.length; i++) {

      game.addFin(mirpl[i], Number(0.2))
    
    
    }

   }

  
})
  

  


}
    }
      else if(players.length == 4){
        const teamFilter = (team) => (player) =>
        gameRoles[game.getGameState().playerRoles.get(player.id)].team == team;

       alivePlayers.filter((player) => votedPlayers.includes(player.id))
       .forEach((player) => {
         are.set(player.id, player);
       });
console.log(`e34`, are)
console.log(Array.from(are.values()))
console.log(players)

        const mirpl = Array.from(are.values()).filter(teamFilter("mir"));
        const mafpl = Array.from(are.values()).filter(teamFilter("maf"));
      const rolll = gameRoles[game.getGameState().playerRoles.get(players[0].id)].team
      const rollll = gameRoles[game.getGameState().playerRoles.get(players[1].id)].team
      const rolllll = gameRoles[game.getGameState().playerRoles.get(players[2].id)].team
      const rol = gameRoles[game.getGameState().playerRoles.get(players[2].id)].team

        if(rolll == rollll && rolll == rolllll && rolll == rol && rolll == `mir` ) {
          console.log(mirpl)
          const { MessageActionRow, MessageSelectMenu} = require("discord.js");
          const row = new MessageActionRow()
          .addComponents(
            new MessageSelectMenu()
            .setCustomId('vybor')
            .setPlaceholder('Выберите исход')
            .setMaxValues(1)
            .addOptions([
              {
                description: `Никто не агитировал за подъем`,
                label: `1`,
                value: `0.2`,
              },
  
   {
                description: `Дауны закусились`,
                label: `2`,
                value: `0.4`,
              },
           
            ]))
            const dalbone = mirpl.filter((player) => player.id == players[0].id)
            const dalbtwo = mirpl.filter((player) => player.id == players[1].id)
            const dalbthree = mirpl.filter((player) => player.id == players[2].id)
            const dalbfour = mirpl.filter((player) => player.id == players[3].id)

  console.log(dalbone)
  console.log(dalbtwo)
  
         const rss = await game.getGameState().host.send({components: [row]})
  console.log(rss.channel)
  
          const filter = (interaction) => interaction.isSelectMenu()
          const collector = rss.channel.createMessageComponentCollector({
            filter,
            max: "1",
            time: 60000
            });
            collector.on(`collect`, async (collected) => {
            
    
              const value = collected.values[0]
              console.log(`125`, value)
              
              if(value == 0.2){
                for (let i = 0; i < mirpl.length; i++) {
  
                  game.addFin(mirpl[i], Number(0.4))
  
  
                }
                for (let i = 0; i < mafpl.length; i++) {
                  game.addBons(mafpl[i], Number(0.5))
  
  
                }
        
              rss.channel.send({content:`Выбрано 1`})
            }
              else if(value == 0.4) {
                console.log(`123`, value)
                const dalbone = mirpl.filter((player) => player.id == players[0].id)
                const dalbtwo = mirpl.filter((player) => player.id == players[1].id)
                const dalbthree = mirpl.filter((player) => player.id == players[2].id)
                const dalbfour = mirpl.filter((player) => player.id == players[3].id)

                rss.channel.send({content:`Выбрано 2`})
                game.addFin(dalbone, Number(0.5))
                game.addFin(dalbtwo, Number(0.5))
                game.addFin(dalbthree, Number(0.5))
                game.addFin(dalbfour, Number(0.5))

  
  console.log(dalbone[0])
  console.log(dalbtwo[0])
  
  
              }
            
  
  
            })
      collector.on(`end`, async (reason) => {
  
         if(reason == `time`){
          for (let i = 0; i < mirpl.length; i++) {
  
            game.addFin(mirpl[i], Number(0.2))
          
          
          }
     
         }
  
        
      })
        
  
        }
      }
     */
    } else {
      endEmbed.setDescription(
        `По итогам голосования в городе **никто** не поднимается!`

      );
    }


    await message.channel.send({embeds: [endEmbed]});
  }
};
