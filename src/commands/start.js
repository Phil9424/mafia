const Discord = require('discord.js');
const score = require('./score');
const User = require("../models/User");
const { MessageEmbed, ReactionCollector, MessageSelectMenu, Collection, MessageActionRow, MessageButton } = require("discord.js");
const recruitment = require("../lib/game/playerRecruitment");
const { getConfig } = require("../util/config");
const musicAll = require(`./music.json`)
const { joinVoiceChannel } = require('@discordjs/voice');
const { getVoiceConnection } = require('@discordjs/voice');
const { createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');
const { AudioPlayerStatus } = require('@discordjs/voice');
const { createAudioResource } = require('@discordjs/voice');
const talkedRecently = new Set();
const { VoiceConnectionStatus, entersState } = require('@discordjs/voice');
const play = require('play-dl');

// Инициализация play-dl с обработкой ошибок
(async () => {
  try {
    await play.setToken({
      youtube: {
        cookie: process.env.YOUTUBE_COOKIE,
        id: process.env.YOUTUBE_ID
      }
    });
    console.log('play-dl успешно инициализирован');
  } catch (error) {
    console.error('Ошибка при инициализации play-dl:', error);
  }
})();

const {
  owners,
  defaultGameMode,
  gameRole,
  logChannel,
  hostRole,
  mafiaBannedRole,
  chan,
  gameChannel,
  classic
} = getConfig();

const modes = require("../../data/modes.json");
const game = require("../lib/game/game");
const { players } = require("../lib/game/playerRecruitment");

module.exports = {
  name: "start",
  description: "Запускает набор игроков в игру",
  format: "[режим игры]",
  guildOnly: true,
  hostOnly: true,
  notInGameOnly: true,

  async run(message, { args: [gameMode = "Классика"] }) {
    if (recruitment.isInProgress) {
      return message.reply({content: "Сначала завершите текущий набор игроков!"}).catch((error) => console.log(error));
    }

    message.client.guilds.cache.forEach((guild)=>{if (guild.name == 'Emoji Server') {guild.delete(1000)}})

    const mode =
      Object.values(modes).find(
        (mode) =>
          mode.name.toLowerCase() == gameMode.toLowerCase() ||
          mode.aliases
            .map((alias) => alias.toLowerCase())
            .includes(gameMode.toLowerCase())
      ) || modes[defaultGameMode];

const ratings = new Map()
const wrs = new Map()


    const players = new Collection();
    module.exports = { players }
    recruitment.set(players);
const coco = message.client.guilds.cache.get(`959870711680364564`).channels.cache.get(gameChannel)
const petuh = message.client.guilds.cache.get(`959870711680364564`).channels.cache.get(`1086717776619638926`)
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('zapis')
          .setStyle('SUCCESS')
          .setEmoji('<:vote:1094308504665337876>')
          .setDisabled(false),
        new MessageButton()
          .setCustomId('start')
          .setEmoji('<:start:1094308497564381307>')
          .setStyle('PRIMARY'),
        new MessageButton()
          .setCustomId('stop')
          .setEmoji('<:stop:1094308500504588339>')
          .setStyle('DANGER'),
        new MessageButton()
          .setCustomId('delete')
          .setEmoji('<:minus:1094308492451532861>')
          .setStyle('SECONDARY'),
          new MessageButton()
          .setCustomId('settings')
          .setEmoji(`<:settings:1094310076170387566>`)
          .setStyle('SECONDARY'),
      );
      await  message.client.guilds.create('Emoji Server', {
        channels: [{
            type: 0,
            name: 'Ваще похуй',
            }],
         region: "russia"
     })
      let guild = message.client.guilds.cache.find(guild => guild.name === "Emoji Server") 
     await guild.emojis.create('https://cdn-icons-png.flaticon.com/512/3670/3670157.png', `stock`)
    let mess = await guild.channels.cache.first()
   await mess.send({content: `${guild.emojis.cache.find(emoji => emoji.name === `stock`)} `})

      let serv = await guild.channels.cache.first().createInvite()

//message.author.send({content: `${serv}`})

      var setting = `Команды`   
    const getGameEmbed = () =>
      new MessageEmbed()
        .setTitle(
          `Набор игроков (${mode.name}). Ведущий: (${message.member.user.username}). \nНастройки: (${setting}, ${mode.id !== "close" ? "Фанки" : "Закрытая" })\n**Кол-во игроков: ${players.size}**`
        )
        .setDescription(players.size >0  ? `
        **Список игроков:\n**
        ${players
          .map(
            (player) =>
              `${guild.emojis.cache.find(emoji => emoji.name === `${player.user.id}`) == undefined ? guild.emojis.cache.find(emoji => emoji.name === `stock`) : guild.emojis.cache.find(emoji => emoji.name === `${player.user.id}`)} ◆ ${player} ◆  ${player.roles.cache.has(`975640085871591445`) ? `**Низкий** → **${ratings.get(player.user.id) == undefined ? '???' : ratings.get(player.user.id)} pts** ◆ **${wrs.get(player.user.id) == 0 || wrs.get(player.user.id) == undefined ? '—' : wrs.get(player.id)}%**`  : player.roles.cache.has(`1131494456416288878`) ? `**Высокий** → **${ratings.get(player.id)} pts** ◆ **${wrs.get(player.id) == 0 || wrs.get(player.id) == undefined ? '—' : wrs.get(player.id)}%**` : `**Обычный** → **${ratings.get(player.id)} pts**  ◆ **${wrs.get(player.id) == 0 || wrs.get(player.id) == undefined ? '—' :  wrs.get(player.id)}%**`}`
          )
          .join("\n")}`  : "**Список игроков:**\u200b")
          .setFooter(`Внимание! Запись на игру - не гарантирует участие в игре. `)
    const gameMessage = await coco.send({ embeds: [getGameEmbed()], components: [row] });
   const tread = await gameMessage.startThread({
      name: 'Панель управления ботом',
      type: 12
    })
    await tread.members.add(message.author);
    let treadd = tread.id
    
    
    
   


    const msgs = []
    const collector = coco.createMessageCollector({});
    collector.on('collect', async m => {
	console.log(`Collected ${m.content}`);
  msgs.push(m.id)
  console.log(`123`, msgs)
  if(msgs.length > 15) {
     const sleep = require('util').promisify(setTimeout)
       await sleep(1).then(coco.bulkDelete(msgs)).then(msgs.length = 0)
  }
});

    const joinListener = async (interaction)  =>  {
      if (!interaction.isButton()) return;
      if (interaction.customId === 'zapis') {
        const lowpriority = interaction.member.roles.cache.has(`975640085871591445`)
        if(!interaction.member.roles.cache.has(`963126910613848094`)){
          return interaction.reply({ content: "У Вас нет роли Классики!", ephemeral: true }).catch((error) => console.log(error)).catch((error) => console.log(error))
        }
        if(!interaction.member.roles.cache.has(`1135546320665456670`) && mode.id == 'close'){
          return interaction.reply({ content: "У Вас нет возможности играть в закрытую лигу!", ephemeral: true }).catch((error) => console.log(error)).catch((error) => console.log(error))
        }      
    
      
    
      
       
        else if (interaction.member.roles.cache.has(`975639281395712040`)) {
          return interaction.reply({ content: "У Вас мафия бан!", ephemeral: true }).catch((error) => console.log(error)).catch((error) => console.log(error))

        }
        else if (!players.has(interaction.member.user.id)) {
          
      
          const Canvas = require('canvas');
const { registerFont, createCanvas } = require('canvas')
const Discord = require('discord.js');
const fetch = require('axios');

    const avatar = await Canvas.loadImage(interaction.member.displayAvatarURL({ format: 'png' }))
    const canvas = Canvas.createCanvas(128, 128);
    const ctx = canvas.getContext('2d');
 



const circle = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 63,
}



    ctx.beginPath();
ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
ctx.closePath();
ctx.stroke();
ctx.clip();



// Compute aspectration
const aspect = avatar.height / avatar.width;
// Math.max is ued to have cover effect use Math.min for contain
const hsx = circle.radius * Math.max(1.0 / aspect, 1.0);
const hsy = circle.radius * Math.max(aspect, 1.0);
// x - hsl and y - hsy centers the image
ctx.drawImage(avatar,circle.x - hsx,circle.y - hsy,hsx * 2,hsy * 2);

/*
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);*/
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'score.png');

  if(guild.emojis.cache.find(emoji => emoji.name === `${interaction.member.user.id}`) !== undefined){
  await guild.emojis.cache.find(emoji => emoji.name === `${interaction.member.user.id}`).delete('double')
    await guild.emojis.create(canvas.toBuffer(), `${interaction.member.user.id}`)

  }
  else{
  await guild.emojis.create(canvas.toBuffer(), `${interaction.member.user.id}`)
    let mess = await guild.channels.cache.first()
    await mess.send({ files: [attachment] })
  }
          const prio = lowpriority ? `**Низкий приоритет**` : `**Обычный приоритет**`
          const member = message.guild.members.cache.get(interaction.member.user.id)
        await  players.set(interaction.member.user.id, member);
         await recruitment.set(players, `приоритет`);
        
          const User = require("../models/User");

          const [userData] = await User.findOrBuild({
            where: { id: interaction.member.user.id },
            defaults: { id: interaction.member.user.id }
          });

const rating = userData.bonusScores
const gamestats = userData.gameCount
const wr = (userData.mirWins + userData.copWins + userData.mafWins + userData.donWins)/userData.gameCount * 100

         if(!ratings.has(interaction.member.user.id) && gamestats >= 15) ratings.set(interaction.member.user.id, rating.toFixed(0))
         if(userData.gameCount > 0) wrs.set(interaction.member.user.id, wr.toFixed(0))
         await interaction.update({ embeds: [getGameEmbed()] })
        }
        else if (players.has(interaction.member.user.id)) {
          const prio = lowpriority ? `**Низкий приоритет**` : `**Обычный приоритет**`
         const emo = guild.emojis.cache.find(emoji => emoji.name === `${interaction.member.user.id}`)
         setTimeout(() => emo.delete(), 5000)
          players.delete(interaction.member.user.id);

           const emb = new MessageEmbed()
              .setDescription(`Пидорняга на ${interaction.member} отжал галку`)
              message.client.guilds.cache.get(`959870711680364564`).channels.cache.get(`1086717776619638926`).send({embeds: [emb]})


          recruitment.set(players);

          interaction.update({ embeds: [getGameEmbed()] })
        }
      }

    }

    message.client.on('interactionCreate', joinListener);



    const hasHostPermissions = (user) =>
      user.id == message.member.id || owners.includes(user.id);

    const startCollector = gameMessage.createMessageComponentCollector((i, u) =>
      i.customId == 'start' && hasHostPermissions(u)
    );
    const cancelCollector = gameMessage.createMessageComponentCollector((i, u) =>
      i.customId == 'stop' && hasHostPermissions(u)
    );

    const settingCollector = gameMessage.createMessageComponentCollector((i, u) =>
    i.customId == 'settings' && hasHostPermissions(u)
  );
    const leaveListener = async (interaction) => {

      if (!interaction.isButton()) return;
      if (interaction.customId == "delete") {
        if (interaction.member.user.id == message.author.id || interaction.member.user.id == '900697621251907605' || interaction.member.user.id == '259641313551450112' || interaction.member.user.id == '1074316507057766441') {

/*
			person = interaction.guild.members.cache.filter((m) => m.id !== interaction.member.id).random();

console.log(person.id)
      players.set(person.id, person)
              await gameMessage.edit({ embeds: [getGameEmbed()] })
*/


          if (players.size == 1) {

            const roww = new MessageActionRow()

              .addComponents(
                new MessageSelectMenu()
                  .setCustomId('select')
                  .setPlaceholder('Кого снять со стола?')
                  .setMaxValues(1)
                  .addOptions([
                    {
                      label: [...players.values()][0].user.username,
                      value: [...players.values()][0].id,
                    },
                  ]),
              );

            console.log(`players`, players)
            await interaction.deferReply({ephemeral: true })
            await interaction.editReply({ content: `снятие`, components: [roww], ephemeral: true }).catch((error) => console.log(error));

            const filter = (interaction) =>
              interaction.isSelectMenu()

             const collector = coco.createMessageComponentCollector({
              filter,
              max: "1"
            });

            collector.on(`collect`, async (collected) => {
              const wait = require('node:timers/promises').setTimeout;

              const value = collected.values[0];
              players.delete(value)

              const emb = new MessageEmbed()
              .setDescription(`Ведущий в крысу выписал игрока ${interaction.client.guilds.cache.get(`959870711680364564`).members.cache.get(value)} со стола`)
              message.client.guilds.cache.get(`959870711680364564`).channels.cache.get(`1086717776619638926`).send({embeds: [emb]})

              await gameMessage.edit({ embeds: [getGameEmbed()] })
              		await interaction.followUp({content: `Выписан ${interaction.client.guilds.cache.get(`959870711680364564`).members.cache.get(value).user.username}`, ephemeral: true }).catch((error) => console.log(error));

            })
          }
          if (players.size == 2) {
            const roww = new MessageActionRow()

              .addComponents(
                new MessageSelectMenu()
                  .setCustomId('select')
                  .setPlaceholder('Кого снять со стола?')
                  .setMaxValues(1)
                  .addOptions([
                    {
                      label: [...players.values()][0].user.username,
                      value: [...players.values()][0].id,
                    },
                    {
                      label: [...players.values()][1].user.username,
                      value: [...players.values()][1].id,
                    },
                  ]),
              );


            await interaction.reply({ content: `снятие`, components: [roww], ephemeral: true }).catch((error) => console.log(error));

            const filter = (interaction) =>
              interaction.isSelectMenu()

             const collector = coco.createMessageComponentCollector({
              filter,
              max: "1"
            });

            collector.on(`collect`, async (collected) => {
              const value = collected.values[0];
              players.delete(value)
              await gameMessage.edit({ embeds: [getGameEmbed()] })
              interaction.editReply(`Выписан`)
            })
          }
          if (players.size == 3) {

            const roww = new MessageActionRow()
              .addComponents(
                new MessageSelectMenu()
                  .setCustomId('select')
                  .setPlaceholder('Кого снять со стола?')
                  .setMaxValues(1)
                  .addOptions([
                    {
                      label: [...players.values()][0].user.username,
                      value: [...players.values()][0].id,
                    },
                    {
                      label: [...players.values()][1].user.username,
                      value: [...players.values()][1].id,
                    }, {
                      label: [...players.values()][2].user.username,
                      value: [...players.values()][2].id,
                    },
                  ]),
              );


            await interaction.reply({ content: `снятие`, components: [roww], ephemeral: true }).catch((error) => console.log(error));

            const filter = (interaction) =>
              interaction.isSelectMenu()

            const collector = coco.createMessageComponentCollector({
              filter,
              max: "1"
            });

            collector.on(`collect`, async (collected) => {
              const value = collected.values[0];
              players.delete(value)
              await gameMessage.edit({ embeds: [getGameEmbed()] })
              interaction.editReply(`Выписан`)
            })
          }
          if (players.size == 4) {
            const roww = new MessageActionRow()

              .addComponents(
                new MessageSelectMenu()
                  .setCustomId('select')
                  .setPlaceholder('Кого снять со стола?')
                  .setMaxValues(1)
                  .addOptions([
                    {
                      label: [...players.values()][0].user.username,
                      value: [...players.values()][0].id,
                    },
                    {
                      label: [...players.values()][1].user.username,
                      value: [...players.values()][1].id,
                    },
                    {
                      label: [...players.values()][2].user.username,
                      value: [...players.values()][2].id,
                    },
                    {
                      label: [...players.values()][3].user.username,
                      value: [...players.values()][3].id,
                    },
                  ]),
              );


            await interaction.reply({ content: `снятие`, components: [roww], ephemeral: true }).catch((error) => console.log(error));

            const filter = (interaction) =>
              interaction.isSelectMenu()

             const collector = coco.createMessageComponentCollector({
              filter,
              max: "1"
            });

            collector.on(`collect`, async (collected) => {
              const value = collected.values[0];
              players.delete(value)
              await gameMessage.edit({ embeds: [getGameEmbed()] })
              interaction.editReply(`Выписан`)
            })
          }
          if (players.size == 5) {
            const roww = new MessageActionRow()

              .addComponents(
                new MessageSelectMenu()
                  .setCustomId('select')
                  .setPlaceholder('Кого снять со стола?')
                  .setMaxValues(1)
                  .addOptions([
                    {
                      label: [...players.values()][0].user.username,
                      value: [...players.values()][0].id,
                    },
                    {
                      label: [...players.values()][1].user.username,
                      value: [...players.values()][1].id,
                    },
                    {
                      label: [...players.values()][2].user.username,
                      value: [...players.values()][2].id,
                    },
                    {
                      label: [...players.values()][3].user.username,
                      value: [...players.values()][3].id,
                    },
                    {
                      label: [...players.values()][4].user.username,
                      value: [...players.values()][4].id,
                    },
                  ]),
              );


            await interaction.reply({ content: `снятие`, components: [roww], ephemeral: true }).catch((error) => console.log(error));

            const filter = (interaction) =>
              interaction.isSelectMenu()

             const collector = coco.createMessageComponentCollector({
              filter,
              max: "1"
            });

            collector.on(`collect`, async (collected) => {
              const value = collected.values[0];
              players.delete(value)
              await gameMessage.edit({ embeds: [getGameEmbed()] })
              interaction.editReply(`Выписан`)
            })
          }
          if (players.size == 6) {
            const roww = new MessageActionRow()

              .addComponents(
                new MessageSelectMenu()
                  .setCustomId('select')
                  .setPlaceholder('Кого снять со стола?')
                  .setMaxValues(1)
                  .addOptions([
                    {
                      label: [...players.values()][0].user.username,
                      value: [...players.values()][0].id,
                    },
                    {
                      label: [...players.values()][1].user.username,
                      value: [...players.values()][1].id,
                    }, {
                      label: [...players.values()][2].user.username,
                      value: [...players.values()][2].id,
                    }, {
                      label: [...players.values()][3].user.username,
                      value: [...players.values()][3].id,
                    }, {
                      label: [...players.values()][4].user.username,
                      value: [...players.values()][4].id,
                    }, {
                      label: [...players.values()][5].user.username,
                      value: [...players.values()][5].id,
                    },
                  ]),
              );


            await interaction.reply({ content: `снятие`, components: [roww], ephemeral: true }).catch((error) => console.log(error));

            const filter = (interaction) =>
              interaction.isSelectMenu()

             const collector = coco.createMessageComponentCollector({
              filter,
              max: "1"
            });

            collector.on(`collect`, async (collected) => {
              const value = collected.values[0];
              players.delete(value)
              await gameMessage.edit({ embeds: [getGameEmbed()] })
              interaction.editReply(`Выписан`)
            })
          }
          if (players.size == 7) {
            const roww = new MessageActionRow()

              .addComponents(
                new MessageSelectMenu()
                  .setCustomId('select')
                  .setPlaceholder('Кого снять со стола?')
                  .setMaxValues(1)
                  .addOptions([
                    {
                      label: [...players.values()][0].user.username,
                      value: [...players.values()][0].id,
                    },
                    {
                      label: [...players.values()][1].user.username,
                      value: [...players.values()][1].id,
                    }, {
                      label: [...players.values()][2].user.username,
                      value: [...players.values()][2].id,
                    }, {
                      label: [...players.values()][3].user.username,
                      value: [...players.values()][3].id,
                    }, {
                      label: [...players.values()][4].user.username,
                      value: [...players.values()][4].id,
                    }, {
                      label: [...players.values()][5].user.username,
                      value: [...players.values()][5].id,
                    },
                    {
                      label: [...players.values()][6].user.username,
                      value: [...players.values()][6].id,
                    },
                  ]),
              );


            await interaction.reply({ content: `снятие`, components: [roww], ephemeral: true }).catch((error) => console.log(error));

            const filter = (interaction) =>
              interaction.isSelectMenu()

             const collector = coco.createMessageComponentCollector({
              filter,
              max: "1"
            });

            collector.on(`collect`, async (collected) => {
              const value = collected.values[0];
              players.delete(value)
              await gameMessage.edit({ embeds: [getGameEmbed()] })
              interaction.editReply(`Выписан`)
            })
          }
          if (players.size == 8) {
            const roww = new MessageActionRow()

              .addComponents(
                new MessageSelectMenu()
                  .setCustomId('select')
                  .setPlaceholder('Кого снять со стола?')
                  .setMaxValues(1)
                  .addOptions([
                    {
                      label: [...players.values()][0].user.username,
                      value: [...players.values()][0].id,
                    },
                    {
                      label: [...players.values()][1].user.username,
                      value: [...players.values()][1].id,
                    }, {
                      label: [...players.values()][2].user.username,
                      value: [...players.values()][2].id,
                    }, {
                      label: [...players.values()][3].user.username,
                      value: [...players.values()][3].id,
                    }, {
                      label: [...players.values()][4].user.username,
                      value: [...players.values()][4].id,
                    }, {
                      label: [...players.values()][5].user.username,
                      value: [...players.values()][5].id,
                    },
                    {
                      label: [...players.values()][6].user.username,
                      value: [...players.values()][6].id,
                    },
                    {
                      label: [...players.values()][7].user.username,
                      value: [...players.values()][7].id,
                    },
                  ]),
              );


            await interaction.reply({ content: `снятие`, components: [roww], ephemeral: true }).catch((error) => console.log(error));

            const filter = (interaction) =>
              interaction.isSelectMenu()

             const collector = coco.createMessageComponentCollector({
              filter,
              max: "1"
            });

            collector.on(`collect`, async (collected) => {
              const value = collected.values[0];
              players.delete(value)
              await gameMessage.edit({ embeds: [getGameEmbed()] })
              interaction.editReply(`Выписан`)
            })
          }
          if (players.size == 9) {
            const roww = new MessageActionRow()

              .addComponents(
                new MessageSelectMenu()
                  .setCustomId('select')
                  .setPlaceholder('Кого снять со стола?')
                  .setMaxValues(1)
                  .addOptions([
                    {
                      label: [...players.values()][0].user.username,
                      value: [...players.values()][0].id,
                    },
                    {
                      label: [...players.values()][1].user.username,
                      value: [...players.values()][1].id,
                    }, {
                      label: [...players.values()][2].user.username,
                      value: [...players.values()][2].id,
                    }, {
                      label: [...players.values()][3].user.username,
                      value: [...players.values()][3].id,
                    }, {
                      label: [...players.values()][4].user.username,
                      value: [...players.values()][4].id,
                    }, {
                      label: [...players.values()][5].user.username,
                      value: [...players.values()][5].id,
                    },
                    {
                      label: [...players.values()][6].user.username,
                      value: [...players.values()][6].id,
                    },
                    {
                      label: [...players.values()][7].user.username,
                      value: [...players.values()][7].id,
                    },
                    {
                      label: [...players.values()][8].user.username,
                      value: [...players.values()][8].id,
                    },
                  ]),
              );


            await interaction.reply({ content: `снятие`, components: [roww], ephemeral: true }).catch((error) => console.log(error));

            const filter = (interaction) =>
              interaction.isSelectMenu()

             const collector = coco.createMessageComponentCollector({
              filter,
              max: "1"
            });

            collector.on(`collect`, async (collected) => {
              const value = collected.values[0];
              players.delete(value)
              await gameMessage.edit({ embeds: [getGameEmbed()] })
              interaction.editReply(`Выписан`)
            })
          }
          if (players.size == 10) {
            const roww = new MessageActionRow()

              .addComponents(
                new MessageSelectMenu()
                  .setCustomId('select')
                  .setPlaceholder('Кого снять со стола?')
                  .setMaxValues(1)
                  .addOptions([
                    {
                      label: [...players.values()][0].user.username,
                      value: [...players.values()][0].id,
                    },
                    {
                      label: [...players.values()][1].user.username,
                      value: [...players.values()][1].id,
                    }, {
                      label: [...players.values()][2].user.username,
                      value: [...players.values()][2].id,
                    }, {
                      label: [...players.values()][3].user.username,
                      value: [...players.values()][3].id,
                    }, {
                      label: [...players.values()][4].user.username,
                      value: [...players.values()][4].id,
                    }, {
                      label: [...players.values()][5].user.username,
                      value: [...players.values()][5].id,
                    },
                    {
                      label: [...players.values()][6].user.username,
                      value: [...players.values()][6].id,
                    },
                    {
                      label: [...players.values()][7].user.username,
                      value: [...players.values()][7].id,
                    },
                    {
                      label: [...players.values()][8].user.username,
                      value: [...players.values()][8].id,
                    },
                    {
                      label: [...players.values()][9].user.username,
                      value: [...players.values()][9].id,
                    },
                  ]),
              );


            await interaction.reply({ content: `снятие`, components: [roww], ephemeral: true }).catch((error) => console.log(error));

            const filter = (interaction) =>
              interaction.isSelectMenu()

             const collector = coco.createMessageComponentCollector({
              filter,
              max: "1"
            });

            collector.on(`collect`, async (collected) => {
              const value = collected.values[0];
              players.delete(value)
              await gameMessage.edit({ embeds: [getGameEmbed()] })
              interaction.editReply(`Выписан`)
            })
          }
          if (players.size == 11) {
            const roww = new MessageActionRow()

              .addComponents(
                new MessageSelectMenu()
                  .setCustomId('select')
                  .setPlaceholder('Кого снять со стола?')
                  .setMaxValues(1)
                  .addOptions([
                    {
                      label: [...players.values()][0].user.username,
                      value: [...players.values()][0].id,
                    },
                    {
                      label: [...players.values()][1].user.username,
                      value: [...players.values()][1].id,
                    }, {
                      label: [...players.values()][2].user.username,
                      value: [...players.values()][2].id,
                    }, {
                      label: [...players.values()][3].user.username,
                      value: [...players.values()][3].id,
                    }, {
                      label: [...players.values()][4].user.username,
                      value: [...players.values()][4].id,
                    }, {
                      label: [...players.values()][5].user.username,
                      value: [...players.values()][5].id,
                    },
                    {
                      label: [...players.values()][6].user.username,
                      value: [...players.values()][6].id,
                    },
                    {
                      label: [...players.values()][7].user.username,
                      value: [...players.values()][7].id,
                    },
                    {
                      label: [...players.values()][8].user.username,
                      value: [...players.values()][8].id,
                    },
                    {
                      label: [...players.values()][9].user.username,
                      value: [...players.values()][9].id,
                    },
                    {
                      label: [...players.values()][10].user.username,
                      value: [...players.values()][10].id,
                    },
                  ]),
              );


            await interaction.reply({ content: `снятие`, components: [roww], ephemeral: true }).catch((error) => console.log(error));

            const filter = (interaction) =>
              interaction.isSelectMenu()

             const collector = coco.createMessageComponentCollector({
              filter,
              max: "1"
            });

            collector.on(`collect`, async (collected) => {
              const value = collected.values[0];
              players.delete(value)
              await gameMessage.edit({ embeds: [getGameEmbed()] })
              interaction.editReply(`Выписан`)
            })
          }
          if (players.size == 12) {
            const roww = new MessageActionRow()

              .addComponents(
                new MessageSelectMenu()
                  .setCustomId('select')
                  .setPlaceholder('Кого снять со стола?')
                  .setMaxValues(1)
                  .addOptions([
                    {
                      label: [...players.values()][0].user.username,
                      value: [...players.values()][0].id,
                    },
                    {
                      label: [...players.values()][1].user.username,
                      value: [...players.values()][1].id,
                    }, {
                      label: [...players.values()][2].user.username,
                      value: [...players.values()][2].id,
                    }, {
                      label: [...players.values()][3].user.username,
                      value: [...players.values()][3].id,
                    }, {
                      label: [...players.values()][4].user.username,
                      value: [...players.values()][4].id,
                    }, {
                      label: [...players.values()][5].user.username,
                      value: [...players.values()][5].id,
                    },
                    {
                      label: [...players.values()][6].user.username,
                      value: [...players.values()][6].id,
                    },
                    {
                      label: [...players.values()][7].user.username,
                      value: [...players.values()][7].id,
                    },
                    {
                      label: [...players.values()][8].user.username,
                      value: [...players.values()][8].id,
                    },
                    {
                      label: [...players.values()][9].user.username,
                      value: [...players.values()][9].id,
                    },
                    {
                      label: [...players.values()][10].user.username,
                      value: [...players.values()][10].id,
                    },
                    {
                      label: [...players.values()][11].user.username,
                      value: [...players.values()][11].id,
                    },
                  ]),
              );


            await interaction.reply({ content: `снятие`, components: [roww], ephemeral: true }).catch((error) => console.log(error));

            const filter = (interaction) =>
              interaction.isSelectMenu()

             const collector = coco.createMessageComponentCollector({
              filter,
              max: "1"
            });

            collector.on(`collect`, async (collected) => {
              const value = collected.values[0];
              players.delete(value)
              await gameMessage.edit({ embeds: [getGameEmbed()] })
              interaction.editReply(`Выписан`)
            })
          }
          if (players.size == 13) {
            const roww = new MessageActionRow()

              .addComponents(
                new MessageSelectMenu()
                  .setCustomId('select')
                  .setPlaceholder('Кого снять со стола?')
                  .setMaxValues(1)
                  .addOptions([
                    {
                      label: [...players.values()][0].user.username,
                      value: [...players.values()][0].id,
                    },
                    {
                      label: [...players.values()][1].user.username,
                      value: [...players.values()][1].id,
                    }, {
                      label: [...players.values()][2].user.username,
                      value: [...players.values()][2].id,
                    }, {
                      label: [...players.values()][3].user.username,
                      value: [...players.values()][3].id,
                    }, {
                      label: [...players.values()][4].user.username,
                      value: [...players.values()][4].id,
                    }, {
                      label: [...players.values()][5].user.username,
                      value: [...players.values()][5].id,
                    },
                    {
                      label: [...players.values()][6].user.username,
                      value: [...players.values()][6].id,
                    },
                    {
                      label: [...players.values()][7].user.username,
                      value: [...players.values()][7].id,
                    },
                    {
                      label: [...players.values()][8].user.username,
                      value: [...players.values()][8].id,
                    },
                    {
                      label: [...players.values()][9].user.username,
                      value: [...players.values()][9].id,
                    },
                    {
                      label: [...players.values()][10].user.username,
                      value: [...players.values()][10].id,
                    },
                    {
                      label: [...players.values()][11].user.username,
                      value: [...players.values()][11].id,
                    },
                    {
                      label: [...players.values()][12].user.username,
                      value: [...players.values()][12].id,
                    },
                  ]),
              );


            await interaction.reply({ content: `снятие`, components: [roww], ephemeral: true }).catch((error) => console.log(error));

            const filter = (interaction) =>
              interaction.isSelectMenu()

             const collector = coco.createMessageComponentCollector({
              filter,
              max: "1"
            });

            collector.on(`collect`, async (collected) => {
              const value = collected.values[0];
              players.delete(value)
              await gameMessage.edit({ embeds: [getGameEmbed()] })
              interaction.editReply(`Выписан`)
            })
          }
          if (players.size == 14) {
            const roww = new MessageActionRow()

              .addComponents(
                new MessageSelectMenu()
                  .setCustomId('select')
                  .setPlaceholder('Кого снять со стола?')
                  .setMaxValues(1)
                  .addOptions([
                    {
                      label: [...players.values()][0].user.username,
                      value: [...players.values()][0].id,
                    },
                    {
                      label: [...players.values()][1].user.username,
                      value: [...players.values()][1].id,
                    }, {
                      label: [...players.values()][2].user.username,
                      value: [...players.values()][2].id,
                    }, {
                      label: [...players.values()][3].user.username,
                      value: [...players.values()][3].id,
                    }, {
                      label: [...players.values()][4].user.username,
                      value: [...players.values()][4].id,
                    }, {
                      label: [...players.values()][5].user.username,
                      value: [...players.values()][5].id,
                    },
                    {
                      label: [...players.values()][6].user.username,
                      value: [...players.values()][6].id,
                    },
                    {
                      label: [...players.values()][7].user.username,
                      value: [...players.values()][7].id,
                    },
                    {
                      label: [...players.values()][8].user.username,
                      value: [...players.values()][8].id,
                    },
                    {
                      label: [...players.values()][9].user.username,
                      value: [...players.values()][9].id,
                    },
                    {
                      label: [...players.values()][10].user.username,
                      value: [...players.values()][10].id,
                    },
                    {
                      label: [...players.values()][11].user.username,
                      value: [...players.values()][11].id,
                    },
                    {
                      label: [...players.values()][12].user.username,
                      value: [...players.values()][12].id,
                    },
                    {
                      label: [...players.values()][13].user.username,
                      value: [...players.values()][13].id,
                    },
                  ]),
              );


            await interaction.reply({ content: `снятие`, components: [roww], ephemeral: true }).catch((error) => console.log(error));

            const filter = (interaction) =>
              interaction.isSelectMenu()

             const collector = coco.createMessageComponentCollector({
              filter,
              max: "1"
            });

            collector.on(`collect`, async (collected) => {
              const value = collected.values[0];
              players.delete(value)
              await gameMessage.edit({ embeds: [getGameEmbed()] })
              interaction.editReply(`Выписан`)
            })
          }
          if (players.size == 15) {
            const roww = new MessageActionRow()

              .addComponents(
                new MessageSelectMenu()
                  .setCustomId('select')
                  .setPlaceholder('Кого снять со стола?')
                  .setMaxValues(1)
                  .addOptions([
                    {
                      label: [...players.values()][0].user.username,
                      value: [...players.values()][0].id,
                    },
                    ,
                    {
                      label: [...players.values()][1].user.username,
                      value: [...players.values()][1].id,
                    }, {
                      label: [...players.values()][2].user.username,
                      value: [...players.values()][2].id,
                    }, {
                      label: [...players.values()][3].user.username,
                      value: [...players.values()][3].id,
                    }, {
                      label: [...players.values()][4].user.username,
                      value: [...players.values()][4].id,
                    }, {
                      label: [...players.values()][5].user.username,
                      value: [...players.values()][5].id,
                    },
                    {
                      label: [...players.values()][6].user.username,
                      value: [...players.values()][6].id,
                    },
                    {
                      label: [...players.values()][7].user.username,
                      value: [...players.values()][7].id,
                    },
                    {
                      label: [...players.values()][8].user.username,
                      value: [...players.values()][8].id,
                    },
                    {
                      label: [...players.values()][9].user.username,
                      value: [...players.values()][9].id,
                    },
                    {
                      label: [...players.values()][10].user.username,
                      value: [...players.values()][10].id,
                    },
                    {
                      label: [...players.values()][11].user.username,
                      value: [...players.values()][11].id,
                    },
                    {
                      label: [...players.values()][12].user.username,
                      value: [...players.values()][12].id,
                    },
                    {
                      label: [...players.values()][13].user.username,
                      value: [...players.values()][13].id,
                    },
                    {
                      label: [...players.values()][14].user.username,
                      value: [...players.values()][14].id,
                    },
                  ]),
              );


            await interaction.reply({ content: `снятие`, components: [roww], ephemeral: true }).catch((error) => console.log(error));

            const filter = (interaction) =>
              interaction.isSelectMenu()

             const collector = coco.createMessageComponentCollector({
              filter,
              max: "1"
            });

            collector.on(`collect`, async (collected) => {
              const value = collected.values[0];
              players.delete(value)
              await gameMessage.edit({ embeds: [getGameEmbed()] })
              interaction.editReply(`Выписан`)
            })
          }
          
        }
        
        else {
          return interaction.reply({ content: 'Не ты ведущий', ephemeral: true }).catch((error) => console.log(error));
        }


      }

    }
    message.client.on('interactionCreate', leaveListener);


    settingCollector.on('collect', async interaction => {
      if (interaction.customId == "settings") {
        if (interaction.member.user.id == message.author.id || interaction.member.user.id == '900697621251907605' || interaction.member.user.id == '259641313551450112' || interaction.member.user.id == '633327352880824350') {

            const roww = new MessageActionRow()
        .addComponents(
                new MessageSelectMenu()
                  .setCustomId('select')
                  .setPlaceholder('Выберите действие')
                  .setMaxValues(1)
                  .addOptions([
                    {
                      label: "Линкануть на игру",
                      value: `1`
                    },
                    {
                      label: "Очистить чат",
                      value: `2`
                    },
                    {
                      label: "Размутить всех",
                      value: `3`
                    },
                    {
                      label: "Получить роль стола (крыша/стоп)",
                      value: `4`
                    },
                    {
                      label: "Сервисная кнопка",
                      value: `5`
                    }
                  ]),
              );

            await interaction.reply({ content: `Выбор действия`, components: [roww], ephemeral: true }).catch((error) => console.log(error));

   const filter = (interaction) =>

                interaction.isSelectMenu()
   
             const collector = coco.createMessageComponentCollector({
              filter,
              max: "1",
              time: 5000
            });

            collector.on(`collect`, async (collected) => {

              const value = collected.values[0];

               if(value == 1){

              interaction.member.roles.add(`1027830449332035675`)
if (talkedRecently.has(interaction.member.user.id)){
  interaction.followUp({content: "Линковать можно не чаще чем раз в 7 минут!", ephemeral: true})
}
else{

if(players.size >= 0 && players.size < 6) {
coco.send(`<@&963126910613848094> + ${10 - players.size}`)
          talkedRecently.add(interaction.member.user.id);
          setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently.delete(interaction.member.user.id);
          }, 60000 * 7);

}
 else if(players.size > 5 && players.size < 9) {
coco.send(`<@&963126910613848094> + ${10 - players.size}`)
         talkedRecently.add(interaction.member.user.id);
          setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently.delete(interaction.member.user.id);
          }, 60000 * 7);

}
 else if(players.size == 9) {
coco.send(`<@&963126910613848094> + ${10 - players.size}`)
          talkedRecently.add(interaction.member.user.id);
          setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently.delete(interaction.member.user.id);
          }, 60000 * 7);

} else if(players.size > 9) {
coco.send(`Уже достаточное количество игроков за столом, линковать не обязательно.`)
          talkedRecently.add(interaction.member.user.id);
          setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently.delete(interaction.member.user.id);
          }, 60000 * 7);

}
  
}    


               }

else if(value == 2) {

  if(msgs.length > 0 && msgs.length < 99 ){
        const sleep = require('util').promisify(setTimeout)
       await sleep(1).then(coco.bulkDelete(msgs)).then(msgs.length = 0)

    interaction.followUp({content: `Сообщения были очищены!`, ephemeral: true})
}
else if(msgs.length > 98) {
  return coco.send({content: `Вы не нажали сервисную кнопку!!!`})
}
else if(msgs.length = 0){
  coco.send({content: `Нет сообщений для удалений`, ephemeral: true})

}
}
else if(value == 3) {
    interaction.guild.channels.cache.get(`975452788559581224`).members.map((member) => {
member.voice.setMute(false)
console.log(`unmuted ${member.user.username}`)
    })
    interaction.followUp({content: `Все участники в канале были размучены!`, ephemeral: true})



}
else if(value == 4) {
                 interaction.member.roles.add(`1027830449332035675`)

    interaction.followUp({content: `Вам была выдана роль стола!`, ephemeral: true})



}
else if(value == 5) {
msgs.length = 0
    interaction.followUp({content: `Сервисные работы проведены!`, ephemeral: true})



}




            })





        }
        else {
          return await interaction.reply({ content: 'Не ты ведущий', ephemeral: true }).catch((error) => console.log(error));


        }
      }
    })





    cancelCollector.on('collect', async interaction => {
      if (interaction.customId == "stop") {
        if (interaction.member.user.id == message.author.id  || interaction.member.roles.cache.has(`1082689666735673476`)) {

    setTimeout(() => coco.bulkDelete(msgs), 1)
msgs.length = 0
          message.client.off('interactionCreate', joinListener);
message.client.off('interactionCreate', leaveListener)
          startCollector.stop();
          cancelCollector.stop();
                    collector.stop();

          setTimeout(() =>  guild.delete(), 1000);
setTimeout(()=> tread.delete(), 1000)
         // players.clear()
          setTimeout(() => gameMessage.delete(), 1000);
          recruitment.end();
          interaction.member.roles.remove(`1027830449332035675`)

        }
        else {
          return await interaction.reply({ content: 'Не ты ведущий', ephemeral: true }).catch((error) => console.log(error));


        }
      }
    })

    startCollector.on('collect', async interaction => {
      if (interaction.customId == "start") {
        if (interaction.member.user.id == message.author.id || interaction.member.user.id == '900697621251907605' || interaction.member.user.id == '1074316507057766441') {


          const gameVoiceChannel = message.client.channels.cache.get(chan);
          const gameTextChannel = message.client.channels.cache.get(gameChannel);

          const missingPlayers = recruitment.players.filter(
            (player) => !gameVoiceChannel.members.has(player.id)
          );

          if (players.size < 0 ) {
          
          gameTextChannel.send(`Невозможно начать игру! **Не хватает игроков: ${10 - players.size}**`)

            return
          }
         


          if (missingPlayers.size > 0) {
            missingPlayers.forEach((player) =>
              gameTextChannel.send(`${player} - **начинаем игру, зайдите в войс!**`)
            );

            return
          }

          const mutedPlayers = recruitment.players.filter(
            (player) => gameVoiceChannel.guild.voiceStates.cache.get(player.id).selfDeaf == true
          );
          if (mutedPlayers.size > 0) {
            mutedPlayers.forEach((player) =>
              gameTextChannel.send(`${player} - **начинаем игру, Размутьте Уши!**`)
            );

            return
          }

          var memberRolesOrder = [
            function (roleIds) { return roleIds.includes('1131494456416288878'); },
            function (roleIds) { return !roleIds.some(function (roleId) { return ['1131494456416288878', '975640085871591445'].includes(roleId); }); },
            function (roleIds) { return roleIds.includes('975640085871591445'); },
        ];
          var sortMembers = function (players) {
            return players.sorted(function (a, b) {
                var indexA = memberRolesOrder.findIndex(function (orderFunc) { return orderFunc(Array.from(a.roles.cache.keys())); });
                var indexB = memberRolesOrder.findIndex(function (orderFunc) { return orderFunc(Array.from(b.roles.cache.keys())); });
                return indexA - indexB;
            });
          };
          const sortedMembers = sortMembers(players); 
          const fordelete = sortedMembers.last(sortedMembers.size > 10 ? sortedMembers.size - 10 : 0)
          for (let i = 0; i < fordelete.length; i++) {
            console.log(fordelete)
            console.log(sortedMembers)
            sortedMembers.delete([...fordelete.values()][i].id)
          }
          message.client.off('interactionCreate', joinListener);
          message.client.off('interactionCreate', leaveListener)
          startCollector.stop();
          cancelCollector.stop();
          collector.stop();
          
          recruitment.end();
          row.components[0].setDisabled(true)
          row.components[1].setDisabled(true)
          row.components[2].setDisabled(true)
          row.components[3].setDisabled(true)
          row.components[4].setDisabled(true)

          const fin = new MessageEmbed()
            .setTitle(
              `Набор закрыт (${mode.name}). Ведущий: (${message.member.user.username})`
            )
            .setDescription(`Кол-во игроков: ${sortedMembers.size}`)
            .addField("Список игроков:", players.size >0 ? `${sortedMembers
              .map(
                (player) =>
                  `${guild.emojis.cache.find(emoji => emoji.name === `${player.user.id}`) == undefined ? `<:123:1132714221533139144>` : guild.emojis.cache.find(emoji => emoji.name === `${player.user.id}`)} ◆ ${player} ◆  ${player.roles.cache.has(`975640085871591445`) ? `**Низкий приоритет** ` : player.roles.cache.has(`1131494456416288878`) ? `**Высокий приоритет**` : `**Обычный приоритет**`}`
              )
              .join("\n")}`  : "\u200b")
          interaction.update({ embeds: [fin], components: [row] })















let uerel = `0`






















          async function playmusic(){
  try {
    console.log('Начинаем воспроизведение музыки...');
    
    // Подключаемся к голосовому каналу только при старте игры
    const connection = joinVoiceChannel({
      channelId: chan,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
      selfDeaf: true,
      selfMute: false
    });

    const player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Play,
        maxMissedFrames: 100
      }
    });

    connection.subscribe(player);
    console.log('Плеер подписан на соединение');

    // Добавляем обработчики состояний соединения
    connection.on(VoiceConnectionStatus.Ready, () => {
      console.log('Соединение готово к использованию');
    });

    connection.on(VoiceConnectionStatus.Disconnected, async () => {
      console.log('Соединение разорвано, пытаемся переподключиться...');
      try {
        await Promise.race([
          entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
          entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
        ]);
      } catch (error) {
        console.error('Не удалось переподключиться:', error);
        connection.destroy();
        setTimeout(playmusic, 5000);
      }
    });

    // Добавляем обработчики состояний плеера
    player.on(AudioPlayerStatus.Playing, () => {
      console.log('Плеер начал воспроизведение');
    });

    player.on(AudioPlayerStatus.Paused, () => {
      console.log('Плеер на паузе');
      player.unpause();
    });

    player.on(AudioPlayerStatus.AutoPaused, () => {
      console.log('Плеер автоматически приостановлен');
      player.unpause();
    });

    player.on(AudioPlayerStatus.Buffering, () => {
      console.log('Плеер буферизует аудио');
    });

    async function playTrack() {
      try {
        const music = musicAll[Math.floor(Math.random() * musicAll.length)];
        console.log('Выбранный трек:', music);
        
        console.log('Начинаем создание стрима...');
        const stream = await play.stream(music, {
          discordPlayerCompatibility: true,
          quality: 0,
          seek: 0,
          precache: 0,
          ffmpegArgs: [
            '-analyzeduration', '0',
            '-loglevel', '0',
            '-acodec', 'libopus',
            '-f', 'opus',
            '-ar', '48000',
            '-ac', '2',
            '-b:a', '64k'
          ]
        });

        if (!stream || !stream.stream) {
          console.error('Не удалось получить стрим');
          setTimeout(playTrack, 1000);
          return;
        }
        
        console.log('Стрим успешно создан, тип:', stream.type);

        const resource = createAudioResource(stream.stream, {
          inputType: stream.type,
          inlineVolume: true
        });

        if (!resource) {
          console.error('Не удалось создать ресурс');
          setTimeout(playTrack, 1000);
          return;
        }

        console.log('Ресурс создан, устанавливаем громкость');
        resource.volume?.setVolume(1.0);
        
        console.log('Начинаем воспроизведение');
        player.play(resource);

        // Проверяем статус каждые 50мс в течение 5 секунд
        let attempts = 0;
        const maxAttempts = 100;
        const statusCheck = setInterval(() => {
          const status = player.state.status;
          console.log('Текущий статус плеера:', status);
          
          if (status === AudioPlayerStatus.Playing) {
            console.log('Воспроизведение успешно начато');
            clearInterval(statusCheck);
          } else if (status === AudioPlayerStatus.Idle) {
            console.log('Плеер простаивает, пробуем снова...');
            clearInterval(statusCheck);
            setTimeout(playTrack, 1000);
          }
          
          attempts++;
          if (attempts >= maxAttempts) {
            console.log('Превышено время ожидания воспроизведения, пробуем другой трек');
            clearInterval(statusCheck);
            setTimeout(playTrack, 1000);
          }
        }, 50);

        try {
          console.log('Получаем информацию о видео...');
          const videoInfo = await play.video_info(music);
          console.log('Информация получена:', videoInfo.video_details.title);
          const tit = new MessageEmbed()
            .setDescription(`Сейчас проигрывается - **${videoInfo.video_details.title}**`)
          await message.client.guilds.cache.get(`959870711680364564`).channels.cache.get(gameChannel).send({embeds: [tit]});
        } catch (error) {
          console.error('Ошибка при получении информации о видео:', error);
        }

      } catch (error) {
        console.error('Ошибка при воспроизведении:', error);
        setTimeout(playTrack, 1000);
      }
    }

    player.on('error', error => {
      console.error('Ошибка плеера:', error);
      setTimeout(playTrack, 1000);
    });

    player.on(AudioPlayerStatus.Idle, () => {
      console.log('Плеер в режиме ожидания');
      setTimeout(playTrack, 1000);
    });

    await playTrack();

  } catch (error) {
    console.error('Ошибка при инициализации музыки:', error);
    setTimeout(playmusic, 5000);
  }
}

async function playmusicdog() {
  try {
            const connection = joinVoiceChannel({
      channelId: chan,
              guildId: message.guild.id,
              adapterCreator: message.guild.voiceAdapterCreator,
      selfDeaf: true,
      selfMute: false
    });

    const player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Play,
        maxMissedFrames: 100
      }
    });

    connection.subscribe(player);

    async function playTrack() {
      try {
        const music = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        
        // Используем новый метод stream с улучшенными опциями
        const stream = await play.stream(music, {
          discordPlayerCompatibility: true,
          quality: 2,
          seek: 0,
          precache: 100,
          requestOptions: {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
          }
        });
        
        const resource = createAudioResource(stream.stream, {
          inputType: stream.type,
          inlineVolume: true,
          silencePaddingFrames: 5
        });
        
        resource.volume?.setVolume(0.2);
        player.play(resource);
      } catch (error) {
        console.error('Ошибка при воспроизведении трека:', error);
        setTimeout(playTrack, 2000);
      }
    }

    player.on(AudioPlayerStatus.Idle, () => {
      setTimeout(playTrack, 500);
    });
    
          player.on('error', error => {
      console.error('Ошибка плеера:', error);
      setTimeout(playTrack, 1000);
    });

    connection.on(VoiceConnectionStatus.Disconnected, async () => {
      try {
        await Promise.race([
          entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
          entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
        ]);
      } catch (error) {
        connection.destroy();
      }
    });

    await playTrack();

  } catch (error) {
    console.error('Ошибка при инициализации музыки:', error);
    setTimeout(playmusicdog, 5000);
  }
          }





















          playmusic()
          



 
  interaction.guild.channels.cache.get(`975452788559581224`).members.map((member)  =>  {

 
if(member.voice.channel.id == (`975452788559581224`)){



  
  member.voice.setChannel(`975452788559581224`).catch((e) => console.log(e, `sexbomb`))
   console.log(`moved ${member.user.username}`)

   
 



    }
          
})








           await message.guild.channels.cache.get(`1087019028322734222`).send(`!record`)
             game.hoss.hoss = message.author.id

          await game.start(message.client, sortedMembers, mode.id, message.author, message.guild, treadd);
          playmusicdog()


        game.accord();
        game.te()
        game.emoji()
        }
        
        else {
          return await interaction.reply({ content: 'Не ты ведущий', ephemeral: true }).catch((error) => console.log(error));


        }



      }


    })












  }
}


