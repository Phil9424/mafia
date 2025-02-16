const { MessageEmbed, MessageButton, Collection, ReactionCollector, MessageSelectMenu, MessageActionRow } = require("discord.js");
const User = require("../../models/User");
const GlobalStats = require("../../models/GlobalStats");
const shuffle = require("../../util/shuffle");
const GameState = require("./GameState");
const saveGame = require("./saveGame");
const saveLastGameResult = require("./saveLastGameResult");
const computeGameResult = require("./computeGameResult");
const saveGameResult = require("./saveGameResult");
const EndgameState = require("./EndgameState");
const getConcurrentGameCount = require("./getConcurrentGameCount");
const registerOngoingGame = require("./registerOngoingGame");
const removeOngoingGame = require("./removeOngoingGame");

const config = require("../../util/config").getConfig();
const gameModes = require("../../../data/modes.json");
const gameRoles = require("../../../data/roles.json");
const { error } = require("console");

let currentGame = undefined;

const isInProgress = () => !!currentGame;

const start = async (client, sortedMembers, mode, host, guild, treadd)  => {
  if (isInProgress()) {
    return;
  }
  await  client.guilds.create('Mafia chat', {
    channels: [{
        type: 0,
        name: 'Договорка',
        }],
     region: "russia"
 })
 
 let guilde = client.guilds.cache.find(guild => guild.name === "Mafia chat") 
await   guilde.channels.cache.first().permissionOverwrites.create(guilde.roles.everyone, { SEND_MESSAGES: false });
 let serv = await guilde.channels.cache.first().createInvite()
 const fhm = new MessageEmbed()
     .setDescription(`**Договорка недоступна, пока не зайдет вся черная команда и судья!**`)
     await  guilde.channels.cache.first().send({embeds: [fhm]})
  const totalGameCount = (await GlobalStats.get()).gameCount;
  const concurrentGameCount = await getConcurrentGameCount();
  const gameNumber = totalGameCount + concurrentGameCount + 1;

  registerOngoingGame();

  await client.channels.cache
    .get(config.gameChannel)
    .send(`**Сбор завершен. Начинаем игру #${gameNumber}!**`);

  const gameModeRoles = gameModes[mode].roles;

  const playerNicknames = new Map();
  const playerRoles = new Map();
  const playerNumbers = new Map();

  const roles = Object.entries(gameModeRoles).flatMap(([mode, count]) =>
    new Array(count).fill(mode)
  );

  while (roles.length < sortedMembers.size) {
    roles.push("mir");
  }

  const shuffledRoles = shuffle(roles);
  const shuffledPlayers = shuffle([...sortedMembers.values()]);

  let sborplayers = new Collection()
  module.exports = { sborplayers }

 
  

  const getGameEmbed = () =>
  new MessageEmbed()
    .setTitle(
      `**Раздача карт.**`
    )
    .setDescription(`**Прошу не выкрикивать идет раздача карт!**`)
    .addField("Список выбравших:", sborplayers.size >0 ? `${sborplayers
      .map(
        (player) =>

          `${player} -  <:vote:1094308504665337876>`
      )
      .join("\n")}`  : "\u200b")


   const gameMessage = await client.channels.cache.get(config.gameChannel).send({embeds: [getGameEmbed()]});
  for (let i = 0; i < shuffledPlayers.length; i++) {
    const player = shuffledPlayers[i];

    playerNicknames.set(player.id, player.nickname);
    playerNumbers.set(player.id, i + 1);

    const role = shuffledRoles[i];

    playerRoles.set(player.id, role);

    const nickname = (i + 1).toLocaleString(undefined, {
      minimumIntegerDigits: 2
    });

    const roleInfo = gameRoles[role];

    console.log(`Initializing player: ${player.user.tag}`);

    console.log(`Mentioning player . . .`);
 
const lowpriority = player.roles.cache.has(`975640085871591445`)
const highpriority = player.roles.cache.has(`938870226450268290`)

const priority = lowpriority ? `**Низкий приоритет**`: highpriority ?  `**Высокий приоритет**` : `**Обычный приоритет**`
sborplayers.set(player.id, player);
gameMessage.edit({embeds: [getGameEmbed()]})
console.log(sborplayers)
    

  
    const nicknamePromise = player
      .setNickname(nickname)
      .catch((player) =>
        console.log(player))
      ;
  
      const isActive = role != "mir" && role != "cop";
    
       const roleEmbed = new MessageEmbed()
      .setAuthor("G A N G  S T A R")
      .setTitle(`**Ваша роль - ${roleInfo.name}\nИгровой номер ${nickname}**`)
      .setDescription(isActive ? `Ссылка на серв **${serv}**` : ``)
      .setImage(roleInfo.image);

      /*const rolePromise = async () =>{ player.send({embeds: [roleEmbed]});}*/

      const { MessageActionRow, MessageSelectMenu} = require("discord.js");

      const cardEmbed = () => new MessageEmbed()
  .setTitle('Выбор карты')
  .setDescription('У Вас есть 10 секунд на выбор карты. Если не успеете, Ваша карта будет выдана автоматически!')
.addField(`<:333:994888188546007050>`,`Шериф`,true)
.addField(`<:455:994888190332776459>`,`Мафия`,true)
.addField(`<:111:996094869812559883>`,`Мирный`,true)
.addField(`<:hat:994888192178257930>`,`Дон`,true)
function getKey(map, input) {
  for (let [key, value] of map.entries()) {
     if (value === input) {
       return key;
     }
  }
  
  return "Not found";
}

const [usereData] = await User.findOrBuild({
  where: { id: `926165063482605608` },
  defaults: { id: `926165063482605608` },
})



      const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setCustomId(`one`)
        .setStyle(`PRIMARY`)
        
        .setDisabled(usereData.cardone == 0 ? false : true)
        .setEmoji(usereData.cardone == 0 ? `<:444:1073694086399271012>` : `✖️`)


      )
      .addComponents(
        new MessageButton()
        .setCustomId(`two`)
        .setStyle(`PRIMARY`)
        
        .setDisabled(usereData.cardtwo == 0 ? false : true)
        .setEmoji(usereData.cardtwo == 0 ? `<:444:1073694086399271012>` : `✖️`)
      )
      .addComponents(
        new MessageButton()
        .setCustomId(`three`)
        .setStyle(`PRIMARY`)
        
        .setDisabled(usereData.cardthree == 0 ? false : true)
        .setEmoji(usereData.cardthree == 0 ? `<:444:1073694086399271012>` : `✖️`)
      )
      .addComponents(
        new MessageButton()
        .setCustomId(`four`)
        .setStyle(`PRIMARY`)
        
        .setDisabled(usereData.cardfour == 0 ? false : true)
        .setEmoji(usereData.cardfour == 0 ? `<:444:1073694086399271012>` : `✖️`)
    
    
      )
      .addComponents(
        new MessageButton()
        .setCustomId(`five`)
        .setStyle(`PRIMARY`)
        
        .setDisabled(usereData.cardfive == 0 ? false : true)
        .setEmoji(usereData.cardfive == 0 ? `<:444:1073694086399271012>` : `✖️`)
    
    
      )
      const rowtwo = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setCustomId(`six`)
        .setStyle(`PRIMARY`)
        
        .setDisabled(usereData.cardsix == 0 ? false : true)
        .setEmoji(usereData.cardsix == 0 ? `<:444:1073694086399271012>` : `✖️`)
    
      )
      .addComponents(
        new MessageButton()
        .setCustomId(`seven`)
        .setStyle(`PRIMARY`)
        
        .setDisabled(usereData.cardseven == 0 ? false : true)
        .setEmoji(usereData.cardseven == 0 ? `<:444:1073694086399271012>` : `✖️`)
    
      )
      .addComponents(
        new MessageButton()
        .setCustomId(`eight`)
        .setStyle(`PRIMARY`)
        
        .setDisabled(usereData.cardeight == 0 ? false : true)
        .setEmoji(usereData.cardeight == 0 ? `<:444:1073694086399271012>` : `✖️`)
    
      )
      .addComponents(
        new MessageButton()
        .setCustomId(`nine`)
        .setStyle(`PRIMARY`)
        
        .setDisabled(usereData.cardnine == 0 ? false : true)
        .setEmoji(usereData.cardnine == 0 ? `<:444:1073694086399271012>` : `✖️`)
    
      )
      .addComponents(
        new MessageButton()
        .setCustomId(`ten`)
        .setStyle(`PRIMARY`)
        
        .setDisabled(usereData.cardten == 0 ? false : true)
        .setEmoji(usereData.cardten == 0 ? `<:444:1073694086399271012>` : `✖️`)
      )
const rowthree = new MessageActionRow()
.addComponents(
  new MessageButton()
  .setURL(`${serv}`)
  .setLabel(`Договорка`)
  .setStyle('LINK')
)

      const cardPromise = (async () => { try {
  const cardP = await player.send({embeds: [cardEmbed()], components: [row, rowtwo]}).catch((error) => console.log(error))
const filter = (interaction) => interaction.isButton() 

const oneCollector = cardP.createMessageComponentCollector({filter, time: 10000, errors: ["time"]})

oneCollector.on('collect', async interaction => {
  if (interaction.customId == "one") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
      
    }
    
    const maff = role != "mir" && role != "cop" && role != "don";
    const sherr = role != "mir" && role != "maf" && role != "don";
    const mirr = role != "cop" && role != "maf" && role != "don";
    const donn = role != "mir" && role != "maf" && role != "cop";

    if(maff) {
      row.components[0].setStyle(`SECONDARY`)
      row.components[0].setEmoji(`994888190332776459`)
      row.components[0].setDisabled(false)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
      interaction.update({components: [row, rowtwo, rowthree]})

    }
    if(sherr) {
      row.components[0].setStyle(`DANGER`)
      row.components[0].setEmoji(`994888188546007050`)
      row.components[0].setDisabled(false)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
      interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

    }
    if(donn) {
      row.components[0].setStyle(`SECONDARY`)
      row.components[0].setEmoji(`994888192178257930`)
      row.components[0].setDisabled(false)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
      interaction.update({components: [row, rowtwo, rowthree]})

    }
    if(mirr) {
      row.components[0].setStyle(`DANGER`)
      row.components[0].setEmoji(`996094869812559883`)
      row.components[0].setDisabled(false)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
      interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

    }
}
if (interaction.customId == "two") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  const maff = role != "mir" && role != "cop" && role != "don";
  const sherr = role != "mir" && role != "maf" && role != "don";
  const mirr = role != "cop" && role != "maf" && role != "don";
  const donn = role != "mir" && role != "maf" && role != "cop";

  if(maff) {
    row.components[1].setStyle(`SECONDARY`)
    row.components[1].setEmoji(`994888190332776459`)
    row.components[1].setDisabled(false)
    row.components[0].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo, rowthree]})

  }
  if(sherr) {
    row.components[1].setStyle(`DANGER`)
    row.components[1].setEmoji(`994888188546007050`)
    row.components[1].setDisabled(false)
    row.components[0].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

  }
  if(donn) {
    row.components[1].setStyle(`SECONDARY`)
    row.components[1].setEmoji(`994888192178257930`)
    row.components[1].setDisabled(false)
    row.components[0].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo, rowthree]})

  }
  if(mirr) {
    row.components[1].setStyle(`DANGER`)
    row.components[1].setEmoji(`996094869812559883`)
    row.components[1].setDisabled(false)
    row.components[0].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

  }
}
if (interaction.customId == "three") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  const maff = role != "mir" && role != "cop" && role != "don";
  const sherr = role != "mir" && role != "maf" && role != "don";
  const mirr = role != "cop" && role != "maf" && role != "don";
  const donn = role != "mir" && role != "maf" && role != "cop";

  if(maff) {
    row.components[2].setStyle(`SECONDARY`)
    row.components[2].setEmoji(`994888190332776459`)
    row.components[2].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[0].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo, rowthree]})

  }
  if(sherr) {
    row.components[2].setStyle(`DANGER`)
    row.components[2].setEmoji(`994888188546007050`)
    row.components[2].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[0].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

  }
  if(donn) {
    row.components[2].setStyle(`SECONDARY`)
    row.components[2].setEmoji(`994888192178257930`)
    row.components[2].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[0].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo, rowthree]})

  }
  if(mirr) {
    row.components[2].setStyle(`DANGER`)
    row.components[2].setEmoji(`996094869812559883`)
    row.components[2].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[0].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

  }
}
if (interaction.customId == "four") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  const maff = role != "mir" && role != "cop" && role != "don";
  const sherr = role != "mir" && role != "maf" && role != "don";
  const mirr = role != "cop" && role != "maf" && role != "don";
  const donn = role != "mir" && role != "maf" && role != "cop";

  if(maff) {
    row.components[3].setStyle(`SECONDARY`)
    row.components[3].setEmoji(`994888190332776459`)
    row.components[3].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[0].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo, rowthree]})

  }
  if(sherr) {
    row.components[3].setStyle(`DANGER`)
    row.components[3].setEmoji(`994888188546007050`)
    row.components[3].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[0].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

  }
  if(donn) {
    row.components[3].setStyle(`SECONDARY`)
    row.components[3].setEmoji(`994888192178257930`)
    row.components[3].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[0].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo, rowthree]})

  }
  if(mirr) {
    row.components[3].setStyle(`DANGER`)
    row.components[3].setEmoji(`996094869812559883`)
    row.components[3].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[0].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

  }
}
if (interaction.customId == "five") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  const maff = role != "mir" && role != "cop" && role != "don";
  const sherr = role != "mir" && role != "maf" && role != "don";
  const mirr = role != "cop" && role != "maf" && role != "don";
  const donn = role != "mir" && role != "maf" && role != "cop";

  if(maff) {
    row.components[4].setStyle(`SECONDARY`)
    row.components[4].setEmoji(`994888190332776459`)
    row.components[4].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[0].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo, rowthree]})

  }
  if(sherr) {
    row.components[4].setStyle(`DANGER`)
    row.components[4].setEmoji(`994888188546007050`)
    row.components[4].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[0].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

  }
  if(donn) {
    row.components[4].setStyle(`SECONDARY`)
    row.components[4].setEmoji(`994888192178257930`)
    row.components[4].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[0].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo, rowthree]})

  }
  if(mirr) {
    row.components[4].setStyle(`DANGER`)
    row.components[4].setEmoji(`996094869812559883`)
    row.components[4].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[0].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

  }
}
if (interaction.customId == "six") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  const maff = role != "mir" && role != "cop" && role != "don";
  const sherr = role != "mir" && role != "maf" && role != "don";
  const mirr = role != "cop" && role != "maf" && role != "don";
  const donn = role != "mir" && role != "maf" && role != "cop";

  if(maff) {
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setStyle(`SECONDARY`)
    rowtwo.components[0].setEmoji(`994888190332776459`)
    rowtwo.components[0].setDisabled(false)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo, rowthree]})

  }
  if(sherr) {
    rowtwo.components[0].setStyle(`DANGER`)
    rowtwo.components[0].setEmoji(`994888188546007050`)
    rowtwo.components[0].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    row.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

  }
  if(donn) {
    rowtwo.components[0].setStyle(`SECONDARY`)
    rowtwo.components[0].setEmoji(`994888192178257930`)
    rowtwo.components[0].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    row.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo, rowthree]})

  }
  if(mirr) {
    rowtwo.components[0].setStyle(`DANGER`)
    rowtwo.components[0].setEmoji(`996094869812559883`)
    rowtwo.components[0].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    row.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

  }
}
if (interaction.customId == "seven") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  const maff = role != "mir" && role != "cop" && role != "don";
  const sherr = role != "mir" && role != "maf" && role != "don";
  const mirr = role != "cop" && role != "maf" && role != "don";
  const donn = role != "mir" && role != "maf" && role != "cop";

  if(maff) {
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[1].setStyle(`SECONDARY`)
    rowtwo.components[1].setEmoji(`994888190332776459`)
    rowtwo.components[1].setDisabled(false)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo, rowthree]})

  }
  if(sherr) {
    rowtwo.components[1].setStyle(`DANGER`)
    rowtwo.components[1].setEmoji(`994888188546007050`)
    rowtwo.components[1].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    row.components[0].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

  }
  if(donn) {
    rowtwo.components[1].setStyle(`SECONDARY`)
    rowtwo.components[1].setEmoji(`994888192178257930`)
    rowtwo.components[1].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    row.components[0].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo, rowthree]})

  }
  if(mirr) {
    rowtwo.components[1].setStyle(`DANGER`)
    rowtwo.components[1].setEmoji(`996094869812559883`)
    rowtwo.components[1].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    row.components[0].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

  }
}
if (interaction.customId == "eight") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  const maff = role != "mir" && role != "cop" && role != "don";
  const sherr = role != "mir" && role != "maf" && role != "don";
  const mirr = role != "cop" && role != "maf" && role != "don";
  const donn = role != "mir" && role != "maf" && role != "cop";

  if(maff) {
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[2].setStyle(`SECONDARY`)
    rowtwo.components[2].setEmoji(`994888190332776459`)
    rowtwo.components[2].setDisabled(false)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo, rowthree]})

  }
  if(sherr) {
    rowtwo.components[2].setStyle(`DANGER`)
    rowtwo.components[2].setEmoji(`994888188546007050`)
    rowtwo.components[2].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    row.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

  }
  if(donn) {
    rowtwo.components[2].setStyle(`SECONDARY`)
    rowtwo.components[2].setEmoji(`994888192178257930`)
    rowtwo.components[2].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    row.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo, rowthree]})

  }
  if(mirr) {
    rowtwo.components[2].setStyle(`DANGER`)
    rowtwo.components[2].setEmoji(`996094869812559883`)
    rowtwo.components[2].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    row.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

  }
}
if (interaction.customId == "nine") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  const maff = role != "mir" && role != "cop" && role != "don";
  const sherr = role != "mir" && role != "maf" && role != "don";
  const mirr = role != "cop" && role != "maf" && role != "don";
  const donn = role != "mir" && role != "maf" && role != "cop";

  if(maff) {
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[3].setStyle(`SECONDARY`)
    rowtwo.components[3].setEmoji(`994888190332776459`)
    rowtwo.components[3].setDisabled(false)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo, rowthree]})

  }
  if(sherr) {
    rowtwo.components[3].setStyle(`DANGER`)
    rowtwo.components[3].setEmoji(`994888188546007050`)
    rowtwo.components[3].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    row.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

  }
  if(donn) {
    rowtwo.components[3].setStyle(`SECONDARY`)
    rowtwo.components[3].setEmoji(`994888192178257930`)
    rowtwo.components[3].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    row.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo, rowthree]})

  }
  if(mirr) {
    rowtwo.components[3].setStyle(`DANGER`)
    rowtwo.components[3].setEmoji(`996094869812559883`)
    rowtwo.components[3].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    row.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

  }
}
if (interaction.customId == "ten") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  const maff = role != "mir" && role != "cop" && role != "don";
  const sherr = role != "mir" && role != "maf" && role != "don";
  const mirr = role != "cop" && role != "maf" && role != "don";
  const donn = role != "mir" && role != "maf" && role != "cop";

  if(maff) {
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[4].setStyle(`SECONDARY`)
    rowtwo.components[4].setEmoji(`994888190332776459`)
    rowtwo.components[4].setDisabled(false)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo, rowthree]})

  }
  if(sherr) {
    rowtwo.components[4].setStyle(`DANGER`)
    rowtwo.components[4].setEmoji(`994888188546007050`)
    rowtwo.components[4].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    row.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

  }
  if(donn) {
    rowtwo.components[4].setStyle(`SECONDARY`)
    rowtwo.components[4].setEmoji(`994888192178257930`)
    rowtwo.components[4].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    row.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo, rowthree]})

  }
  if(mirr) {
    rowtwo.components[4].setStyle(`DANGER`)
    rowtwo.components[4].setEmoji(`996094869812559883`)
    rowtwo.components[4].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    row.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

  }
}
})
oneCollector.on(`end`, async collected => {
  console.log('SEEEEEEX',collected.size)
  if(collected.size < 1) {
    
    const isActive = role != "mir" && role != "cop";
    
    const roleEmbed = new MessageEmbed()
   .setAuthor("G A N G  S T A R")
   .setTitle(`**Ваша роль - ${roleInfo.name}\nИгровой номер ${nickname}**`)
   .setDescription(isActive ? `Ссылка на серв **${serv}**` : ``)
   .setImage(roleInfo.image);
     
    /*host.send(`Игрок ${player} не выбрал карту и ему пришла случайная`)*/

    setTimeout(() => cardP.delete(), 100);
    await player.send({embeds: [roleEmbed]})
console.log(usereData.cardone)
console.log(usereData.cardtwo)
console.log(usereData.cardthree)
console.log(usereData.cardfour)
console.log(usereData.cardfive)

if(usereData.cardone == 0){
  console.log('iiihaaaaa')
  usereData.cardone = 1
  await usereData.save()
  return
}
else if(usereData.cardone == 1 && usereData.cardtwo == 0){
  usereData.cardtwo = 1
  await usereData.save()
  return
}
else if(usereData.cardthree == 0){
  usereData.cardthree = 1
  await usereData.save()
  return
}else if(usereData.cardfour == 0)
{
  usereData.cardfour = 1
await usereData.save()
return
}else if(usereData.cardfive == 0)
{
  usereData.cardfive = 1
await usereData.save()
return
}
else if(usereData.cardsix == 0)
{
  usereData.cardsix = 1
await usereData.save()
  return
}else if(usereData.cardseven == 0)
{
  usereData.cardseven = 1
await usereData.save()
  return
}else if(usereData.cardeight == 0)
{
  usereData.cardeight = 1
await usereData.save()
  return
}else if(usereData.cardnine == 0)
{
  usereData.cardnine = 1
await usereData.save()
  return
}else if(usereData.cardten == 0)
{
  usereData.cardten = 1
  await usereData.save()  
  return
}

  }


  else{
if([...collected.values()][0].customId == 'one'){
  /*host.send(`Игрок ${player} выбрал карту .`)*/
usereData.cardone = 1
await usereData.save()

}
if([...collected.values()][0].customId == 'two'){
  /*host.send(`Игрок ${player} выбрал карту .`)*/
  usereData.cardtwo = 1
  await usereData.save()

}
  if([...collected.values()][0].customId == 'three'){
  /*host.send(`Игрок ${player} выбрал карту .`)*/
  usereData.cardthree = 1
  await usereData.save()

}
if([...collected.values()][0].customId == 'four'){
  /*host.send(`Игрок ${player} выбрал карту .`)*/
  usereData.cardfour = 1
  await usereData.save()

}
if([...collected.values()][0].customId == 'five'){
  /*host.send(`Игрок ${player} выбрал карту .`)*/
  usereData.cardfive = 1
  await usereData.save()

}
if([...collected.values()][0].customId == 'six'){
  /*host.send(`Игрок ${player} выбрал карту .`)*/
  usereData.cardsix = 1
  await usereData.save()

}
if([...collected.values()][0].customId == 'seven'){
  /*host.send(`Игрок ${player} выбрал карту .`)*/
  usereData.cardseven = 1
  await usereData.save()

}
if([...collected.values()][0].customId == 'eight'){
  /*host.send(`Игрок ${player} выбрал карту .`)*/
  usereData.cardeight = 1
  await usereData.save()

}
if([...collected.values()][0].customId == 'nine'){
  /*host.send(`Игрок ${player} выбрал карту .`)*/
  usereData.cardnine = 1
  await usereData.save()

}
if([...collected.values()][0].customId == 'ten'){
  /*host.send(`Игрок ${player} выбрал карту .`)*/
  usereData.cardten = 1
  await usereData.save()

}
  }
} )
  }
  catch (err){
    console.log(err)
  }
  


      })
      
      
     await cardPromise()
     const sleep = require('util').promisify(setTimeout)

     await sleep(15000)






    Promise.all([nicknamePromise])
     .catch(() =>
      client.channels.cache
        .get(config.logChannel)
        .send({content: `**Не удалось отправить сообщение игроку ${player}!**`})
    );

    console.log(`Setting role . . .`);
    
    await player.roles.add(config.gameRole);

    console.log(`Done!`);
  }


  client.channels.cache
    .get(config.gameChannel)
    .send({embeds: [ new MessageEmbed()
      .setTitle("День 0")
      .setDescription(
        "**Здравствуй, город! Утро не доброе, в городе завелась мафия, день знакомств!**"
      )]}
     
    );
   


  const playerInfoEmbed = new MessageEmbed()
    .setTitle("**InMafia**")
    .setDescription("**Список игроков**")
  
  shuffledPlayers
    .sort((a, b) => {
      const firstRole = gameRoles[playerRoles.get(a.id)];
      const secondRole = gameRoles[playerRoles.get(b.id)];

      return firstRole.order - secondRole.order;
    })
    .forEach((player) => {
      const role = playerRoles.get(player.id);
      const roleInfo = gameRoles[role];
      const isActive = role != "mir";
      
      playerInfoEmbed.addField(
        `#${playerNumbers.get(player.id)}: ${player.user.tag}`,
        isActive ? `**${roleInfo.name}**` : roleInfo.name
      );
    });
 
  await host.send({embeds: [playerInfoEmbed]});

     await host.send(`${serv}`)
     const playerInfoEmbedtwo = new MessageEmbed()
     .setTitle("**InMafia**")
     .setDescription("**Список игроков**")
   
   shuffledPlayers
     
     .forEach((player) => {
       const role = playerRoles.get(player.id);
       const roleInfo = gameRoles[role];
       const isActive = role != "mir" && role != "cop";
       if(isActive){
       playerInfoEmbedtwo.addField(
         `#${playerNumbers.get(player.id)}: ${player.user.tag}`,
         `**${roleInfo.name}**`
       )
       }
      
     });
    
     await  guilde.channels.cache.first().send({embeds: [playerInfoEmbedtwo]})



     shuffledPlayers.forEach((player) => {
     const role = playerRoles.get(player.id);
     const roleInfo = gameRoles[role];
     const isActive = role != "mir";
 const hint = new MessageEmbed()
.setTitle(`Подсказка`)
.setDescription(`Для того чтобы мигнуть игроку, необходимо прописать в лс с ботом "+m" и выбрать игрока.`)
.setFooter(`Внимание! Моргать можно только днем! Во время лх нельзя.`)
     if(isActive){
      player.send({embeds: [hint]})
     }
     }
     )


     
     
     const [usereData] = await User.findOrBuild({
      where: { id: client.user.id },
      defaults: { id: client.user.id },
    })
    

usereData.cardone = 0
usereData.cardtwo = 0
usereData.cardthree = 0
usereData.cardfour = 0
usereData.cardfive = 0
usereData.cardsix = 0
usereData.cardseven = 0
usereData.cardeight = 0
usereData.cardnine = 0
usereData.cardten = 0
await usereData.save()
usereData.cardone = 0
usereData.cardtwo = 0
usereData.cardthree = 0
usereData.cardfour = 0
usereData.cardfive = 0
usereData.cardsix = 0
usereData.cardseven = 0
usereData.cardeight = 0
usereData.cardnine = 0
usereData.cardten = 0
await usereData.save()
usereData.cardone = 0
usereData.cardtwo = 0
usereData.cardthree = 0
usereData.cardfour = 0
usereData.cardfive = 0
usereData.cardsix = 0
usereData.cardseven = 0
usereData.cardeight = 0
usereData.cardnine = 0
usereData.cardten = 0
await usereData.save()
usereData.cardone = 0
usereData.cardtwo = 0
usereData.cardthree = 0
usereData.cardfour = 0
usereData.cardfive = 0
usereData.cardsix = 0
usereData.cardseven = 0
usereData.cardeight = 0
usereData.cardnine = 0
usereData.cardten = 0
await usereData.save()
usereData.cardone = 0
usereData.cardtwo = 0
usereData.cardthree = 0
usereData.cardfour = 0
usereData.cardfive = 0
usereData.cardsix = 0
usereData.cardseven = 0
usereData.cardeight = 0
usereData.cardnine = 0
usereData.cardten = 0
await usereData.save()





  

  currentGame = new GameState({
    client,
    treadd,
    guild,
    sortedMembers,
    sborplayers,
    alivePlayers: sortedMembers.clone(),
    killedPlayers: new Set(),
    hangedPlayers: new Set(),
    copchecks: new Set(),
    donchecks: new Set(),
    mode,
    playerNicknames,
    playerRoles,
    playerNumbers,
    playerFauls: new Map(),
    playerWarns: new Map(),
    playerMayaks: new Map(),
    playerStuks: new Map(),
    playerFins: new Map(),
    playerBons: new Map(),
    playerMessageMap: new Map(),
    state: "day",
    day: 0,
    host,
    number: gameNumber,
    mvp: null
  });
   
 

  await saveGame(currentGame);


  // Словарь для хранения идентификаторов сообщений игрока
  const playerMessageMap = currentGame.playerMessageMap
  
  // Функция отправки сообщения с кнопками всем игрокам
  async function sendButtonsToAllPlayers() {
      for (const [playerId, player] of currentGame.alivePlayers.entries()) {
          try {
              const role = gameRoles[currentGame.playerRoles.get(playerId)];
              
              const actionEmbed = new MessageEmbed()
                  .setTitle("Внеигровые вскрытия")
                  .setDescription("Мигать можно 1 раз, только днем, только активным ролям. Стучать можно всем, неограниченное количество раз, всем. ")
                  .setColor("BLUE");
              
              const row = new MessageActionRow()
                  .addComponents(
                      new MessageButton()
                          .setCustomId('mayak')
                          .setLabel('Мигнуть')
                          .setStyle('PRIMARY')
                          .setDisabled(role.name === "Мирный"), // Если игрок Мирный - кнопка неактивна
                      new MessageButton()
                          .setCustomId('stuk_left')
                          .setLabel('Стукнуть влево')
                          .setStyle('SECONDARY'),
                      new MessageButton()
                          .setCustomId('stuk_right')
                          .setLabel('Стукнуть вправо')
                          .setStyle('SECONDARY')
                  );
              
              const dmChannel = await player.createDM(); // Создаем канал DM для взаимодействия
              const sentMessage = await dmChannel.send({ embeds: [actionEmbed], components: [row] });
              
              // Сохраняем идентификатор сообщения
              playerMessageMap.set(playerId, sentMessage.id);
  
              // Добавление слушателей для кнопок
              const filter = i => ['mayak', 'stuk_left', 'stuk_right'].includes(i.customId);
              const collector = dmChannel.createMessageComponentCollector({ filter, time: 7200000 }); // 2 часа
              
              collector.on('collect', async interaction => {
                  if (interaction.customId === 'mayak') {
                      await handleMayak(interaction);
                  } else if (interaction.customId === 'stuk_left' || interaction.customId === 'stuk_right') {
                      await handleStuk(interaction, interaction.customId === 'stuk_left' ? 'l' : 'r');
                  }
              });
              
          } catch (err) {
              console.error(`Не удалось отправить сообщение игроку ${player.user.username}:`, err);
          }
      }
  }
 
  // Функция для удаления сообщений

 
  
  // Логика для "Мигнуть"
  const handleMayak = async (interaction) => {
      const playerId = interaction.user.id;
      if (!isInProgress()) return;
      if (!currentGame.alivePlayers.has(playerId)) return;
  
      const role = gameRoles[currentGame.playerRoles.get(playerId)];
      if (role.name === "Мирный") {
          return interaction.reply({ content: 'У Вас не активная роль!', ephemeral: true });
      }
  
      if (currentGame.state === "night" || currentGame.state === "dogovorka") {
          return interaction.reply({ content: 'Невозможно подмигивать ночью', ephemeral: true });
      }
  
      const mayaks = currentGame.playerMayaks.get(playerId);
      if (mayaks >= 1) {
          return interaction.reply({ content: 'Вы не можете больше подмигивать', ephemeral: true });
      }
  
      const players = [...currentGame.playerNumbers.entries()]
          .sort((a, b) => a[1] - b[1])
          .map((v) => currentGame.sortedMembers.get(v[0]));
  
      const row = new MessageActionRow()
          .addComponents(
              new MessageSelectMenu()
                  .setCustomId('select_mayak')
                  .setPlaceholder('Выберите игрока кому подмигнуть')
                  .setMaxValues(1)
                  .addOptions(players.map((p, i) => ({
                      description: p.user.username,
                      label: `${i + 1}`,
                      value: p.id,
                  })))
          );
  
      await interaction.reply({ content: 'Выберите игрока для мигов:', components: [row], ephemeral: true });
  
      const filter = i => i.customId === 'select_mayak';
      const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1, time: 20000 });
  
      collector.on('collect', async collected => {
          const targetPlayerId = collected.values[0];
          const targetPlayer = currentGame.sortedMembers.get(targetPlayerId);
  
          if (targetPlayer) {
              targetPlayer.send({ embeds: [new MessageEmbed().setDescription(`Вам подмигнул игрок под номером ${currentGame.playerNumbers.get(playerId)} 😉`)] });
              currentGame.playerMayaks.set(playerId, (mayaks || 0) + 1);
              interaction.user.send({ content: `Вы успешно подмигнули игроку ${currentGame.playerNumbers.get(targetPlayerId)}` });
              currentGame.host.send({ content: `Игрок под номером ${currentGame.playerNumbers.get(playerId)} подмигнул игроку номер ${currentGame.playerNumbers.get(targetPlayerId)}` });
          }
      });
  };
  
  // Логика для "Стукнуть"
  const handleStuk = async (interaction, direction) => {
      const playerId = interaction.user.id;
      if (!isInProgress()) return;
      if (!currentGame.alivePlayers.has(playerId)) return;
  
      const role = gameRoles[currentGame.playerRoles.get(playerId)];
      if (currentGame.state === "night" || currentGame.state === "dogovorka") {
          return interaction.reply({ content: 'Невозможно стучать ночью', ephemeral: true });
      }
  
      // Запрос выбора количества стуков
      const row = new MessageActionRow()
          .addComponents(
              new MessageSelectMenu()
                  .setCustomId('select_stuk')
                  .setPlaceholder('Выберите количество стуков')
                  .setMaxValues(1)
                  .addOptions([...Array(10).keys()].map(i => ({
                      label: (i + 1).toString(),
                      value: (i + 1).toString()
                  })))
          );
  
      await interaction.reply({ content: 'Выберите количество стуков:', components: [row], ephemeral: true });
  
      const filter = i => i.customId === 'select_stuk';
      const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1, time: 20000 });
  
      collector.on('collect', async collected => {
          const amount = parseInt(collected.values[0]);
          const playerNumber = currentGame.playerNumbers.get(playerId);
  
          // Определение ID игрока в зависимости от направления
          const targetPlayerNumber = direction === 'l' ? playerNumber + 1 : playerNumber - 1;
          const targetPlayerId = getKey(currentGame.playerNumbers, targetPlayerNumber);
  
          const targetPlayer = currentGame.sortedMembers.get(targetPlayerId);
  
          if (targetPlayer) {
              await interaction.followUp({ content: `Вы успешно отстучали игроку ${direction === 'l' ? 'слева' : 'справа'} ${amount} раз!`, ephemeral: true });
              targetPlayer.send({ embeds: [new MessageEmbed().setDescription(`Вам отстучал игрок **${direction === 'l' ? 'справа' : 'слева'}** ${amount} раз`)] });
  
              // Обновление количества стуков
              const stuks = (currentGame.playerStuks.get(playerId) || 0) + 1;
              currentGame.playerStuks.set(playerId, stuks);
  
              currentGame.host.send({ content: `Игрок под номером ${currentGame.playerNumbers.get(playerId)} отстучал ${direction === 'l' ? 'влево' : 'вправо'} ${amount} раз` });
          } else {
              await interaction.followUp({ content: `Игрока ${direction === 'l' ? 'слева' : 'справа'} нет!`, ephemeral: true });
          }
      });
  };
  
  // Вспомогательная функция для получения ключа из Map
  function getKey(map, input) {
      for (let [key, value] of map.entries()) {
          if (value === input) return key;
      }
      return null;
  }
  
  // Пример вызова функции
  sendButtonsToAllPlayers();

  
};
const hoss = () => {
  let hoss = 0
}
const getState = () => {
  if (!isInProgress()) {
    return;
  }

  return currentGame.state;
};
const deletePlayerMessages = async () => {
  for (const [playerId, messageId] of currentGame.playerMessageMap.entries()) {
      try {
          const player = await currentGame.client.users.fetch(playerId);
          const dmChannel = await player.createDM();
          const message = await dmChannel.messages.fetch(messageId);
          await message.delete();
      } catch (err) {
          console.error(`Не удалось удалить сообщение для игрока ${playerId}:`, err);
      }
  }
 return currentGame.playerMessageMap.clear(); // Очищаем карту после удаления
};


const setDay = () => {
  if (!isInProgress() || currentGame.state == "day") {
    return;
  }
  const guild = currentGame.client.guilds.cache.get(`959870711680364564`);

 currentGame.client.channels.cache.get(config.chan).guild.me.edit({mute:true}).catch((error) => console.log(error))
  currentGame.state = "day";

  currentGame.client.channels.cache
    .get(config.gameChannel)
    .send({embeds: [ 
      new MessageEmbed()
        .setTitle(`**В городе наступает день ${currentGame.day}**`)
        .setDescription("Чат открыт!")
    ]}
    );

  saveGame(currentGame);

  currentGame.alivePlayers.forEach(async (player) => {
    if (!player.roles.cache.has(config.gameRole)) {
      await player.roles.add(config.gameRole);
      await player.voice.setChannel(config.chan).catch(() => {});
    }
  });
};

const setNight = async ()  => {
  if (!isInProgress() || currentGame.state == "night") {
    return;
  }
  const guild = currentGame.client.guilds.cache.get(`959870711680364564`);

currentGame.client.channels.cache.get(config.chan).guild.me.edit({mute:false}).catch((error) => console.log(error))



  currentGame.state = "night";

  currentGame.day++;
  if (currentGame.day == 1 && currentGame.hangedPlayers.size >= 2) {
    currentGame.bestMoveIgnore = true;
  }

  currentGame.client.channels.cache
    .get(config.gameChannel)
    .send({embeds: [ 
      new MessageEmbed()
        .setTitle(`**В городе наступает ночь ${currentGame.day}**`)
        .setDescription("Активные роли - 1 минута!")
    ]}
    );

  saveGame(currentGame);
  currentGame.alivePlayers.forEach(async (player) => {
    if (player.roles.cache.has(config.gameRole)) {
      await player.roles.remove(config.gameRole).catch(() => {});
      await player.voice.setChannel(config.chan).catch(() => {});
    }
  });

  const players = [...currentGame.alivePlayers.entries()]
  .sort((a, b) => a[1] - b[1])
  .map((v) => currentGame.sortedMembers.get(v[0]));

  const teamFilter = (team) => (player) => 
  gameRoles[currentGame.playerRoles.get(player.id)].team == team;
  const mafPlayers = players.filter(teamFilter("maf"));



  const sleep = require('util').promisify(setTimeout)
 
  await nightkill();
  await sleep(20000)
  await nightdoncheck();
  await sleep(20000)
  await nightsheriffcheck();
  
  if (mafPlayers.length == 1){
    await sleep(20000)
    await nightresults();
  }
  else if(mafPlayers.length == 2)
  {  await sleep(20000)
    await nightresults();}
else if (mafPlayers.length == 3){
  await sleep(15000)
  await nightresults();
}



  


};
const gogletwo = async () => {
  const { GoogleSpreadsheet } = require('google-spreadsheet');

  const doc = new GoogleSpreadsheet('1VYp2tZ2iKEUz3ZL615_WbYLNUDqHI6A08bTy5hkQIUs');
     
  await doc.useServiceAccountAuth({
      client_email: `anskulainen@excel-317720.iam.gserviceaccount.com`,
      private_key: `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCw6aKqtgbq+mha\nPGTR2T/OGUeWrwu5zYZ0L7FhvBGHXYeXG7wWx4iRi2TtlwvGA9C3CllGFfwm3c8j\nntUTBewqFJaiV5C4IiGHZcrucDVtJUrEWP2V4elkLF7tr6eFpxgPOwn9iJa5yslO\nMimzghOfc7D5qz3QFDnqM+VtpkfAdmoZyRDdeuZsr+JgQK9OHm4LdgJ78xMVmigj\nbuP6cnJ3vjt9fVzKh4+ba7KUtHb7tJRWZv7LzltDg0G7JQijVgitAEp2yinzUyH3\njP5WynWj7FosG/S/GcQi/RhHSYvRE9P6EpdkzJiz1Zw/zgW3SkqZTEbRkCF7OyXw\ncwjLzkT3AgMBAAECggEAFVgNZuuGLc8J9v+7/ttnSMjLq8uGWSOJj2FPqnsjtuwF\nrKlNHzHHRslauGrVofgaNB3crnQpk1DbKbDYg9kzkyd1EwoIgkalOpjWi7+K7+uk\nt8gFdDyoyWFXD0shes0G6JOBaDlp9z7Bhxx4joPo39R3629fCkiJF49XpKEqnUwY\nlfy4Y5jY8EEoeWguqrG/ofYbF/s3EkABPAhDNyZlWpzPTh1PHAPubQXwg6zTUeCC\nizd4oO0LP/dzCPYgoSH9fXoQMN23Esjo744mpgH+sRxnK5KLXchxXcK+WO2b4j69\n6iXEu78ExJCj12sPzkayk/ewfwVesrHdUtKqZTMeGQKBgQDkBdh6bStI8dfGe31o\nf0PvRMEcdqtiRu2F8oG2HanhS9cNsNf0ARoNfvHtOyRGfPC+yT3RpqwLIYvFp4i3\nAz/RBD2RQvUW88ppbDkT3y+p7p6N/o8+NLMsf+U9ZXZMzj93GkNG6AXoXwBWTiHy\nGdMCS8OyUI63uHf/58GNW+Wo7wKBgQDGnm2a2RCQqR/B44AbpeNymz5WXF1ErKpJ\nZrc1mRW3URlWyox4w+PVBQG0axhfdlucDwDOomUxY+xTSM5nOSPa339qumkdaEvE\n8h9FA+qzhOWp8gR6TwcEDOtgUC8NTmNcl4LlydCH7XCgc8Qt8sNg7lo9KPXf2T8D\nBdxTfl1UeQKBgQC5EiWJ+GFRazj+1+wJjIHPCbbTK14e/gJ63UF6VskzGyMI8afV\nW6+RlJ83NPFUZMPhleSe7PBmeGvBmSDVqcV6GD8AT6AtaOG4fyY0gslk20/FX/9T\nNeLXE1c0Zc2GuT+5o49HVbq1x6W2ZuQWY+9nxaaoa8nqQ8bh5XCrExNr8QKBgFTW\nLOjcWKgBpU/y9bBZjipQxzKqJyiDPAU4O39IUS9JE7Kvt4qJ2ZIOnmjK6dE0w/KH\nsgeQ8/pBvRrh2U/b50XA+zLCRs3J07te1B5tit19IYASoPkBMnT3c75i4YYkemp9\nSOsP5eN5dwcCC8S4kd2gUakYCtW/fJu08CQ1sHW5AoGAXZKpphkTGCGU3GBb6zQ0\nrpmOl4nBn+XO+yWFZUUQLETvyFu4Ie1q2s+9LuKJdinh58JQrZbXAzp2QHcuew7/\nBpH8WA0b+ImOdyLzsTv28Ac3UEPFg+JIaelDCNyaFOFBOskQw7WeioDCvPnD1Qjq\nBznPPc6wXcsqgUCCveynAo8=\n-----END PRIVATE KEY-----\n`,
    });

    await doc.loadInfo(); // loads document properties and worksheets
await doc.updateProperties({ title: 'Соответствия ведущих' });

// adding / removing sheets

const sheet = doc.sheetsByIndex[0]
sheet.updateProperties({ title: 'Соответствия ведущих' });

await sheet.loadCells(); // loads a range of cells


const A5 = sheet.getCellByA1('A5')
const B5 = sheet.getCellByA1('B5')
const C5 = sheet.getCellByA1('C5')
const D5 = sheet.getCellByA1('D5')
const G5 = sheet.getCellByA1('G5')
const A6 = sheet.getCellByA1('A6')
const B6 = sheet.getCellByA1('B6')
const C6 = sheet.getCellByA1('C6')
const D6 = sheet.getCellByA1('D6')
const G6 = sheet.getCellByA1('G6')
const A7 = sheet.getCellByA1('A7')
  const B7 = sheet.getCellByA1('B7')
  const C7 = sheet.getCellByA1('C7')
  const D7 = sheet.getCellByA1('D7')
  const G7 = sheet.getCellByA1('G7')
  const A8 = sheet.getCellByA1('A8')
  const B8 = sheet.getCellByA1('B8')
  const C8 = sheet.getCellByA1('C8')
  const D8 = sheet.getCellByA1('D8')
  const G8 = sheet.getCellByA1('G8')
  const A9 = sheet.getCellByA1('A9')
  const B9 = sheet.getCellByA1('B9')
  const C9 = sheet.getCellByA1('C9')
  const D9 = sheet.getCellByA1('D9')
  const G9 = sheet.getCellByA1('G9')
  const A10 = sheet.getCellByA1('A10')
  const B10 = sheet.getCellByA1('B10')
  const C10 = sheet.getCellByA1('C10')
  const D10 = sheet.getCellByA1('D10')
  const G10 = sheet.getCellByA1('G10')
  const A11 = sheet.getCellByA1('A11')
  const B11 = sheet.getCellByA1('B11')
  const C11 = sheet.getCellByA1('C11')
  const D11 = sheet.getCellByA1('D11')
  const G11 = sheet.getCellByA1('G11')
  const A12 = sheet.getCellByA1('A12')
  const B12 = sheet.getCellByA1('B12')
  const C12 = sheet.getCellByA1('C12')
  const D12 = sheet.getCellByA1('D12')
  const G12 = sheet.getCellByA1('G12')
  const A13 = sheet.getCellByA1('A13')
  const B13 = sheet.getCellByA1('B13')
  const C13 = sheet.getCellByA1('C13')
  const D13 = sheet.getCellByA1('D13')
  const G13 = sheet.getCellByA1('G13')
  const A14 = sheet.getCellByA1('A14')
  const B14 = sheet.getCellByA1('B14')
  const C14 = sheet.getCellByA1('C14')
  const D14 = sheet.getCellByA1('D14')
  const G14 = sheet.getCellByA1('G14')
if(A5.value == currentGame.host.id ) {

G5.value += 1

return    await sheet.saveUpdatedCells(); // save all updates in one call


}
else if(A5.value == null) {
  A5.value = currentGame.host.id
  B5.value = currentGame.host.tag
  C5.value = 60;
  D5.value = 0;
  G5.value += 1

  return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A6.value == currentGame.host.id) {
  G6.value += 1

  return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A6.value == null) {
  A6.value = currentGame.host.id
  B6.value = currentGame.host.tag

  C6.value = 60;
  D6.value = 0;
  G6.value += 1

  return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A7.value == currentGame.host.id) {
  G7.value += 1

  return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A7.value == null) {
  A7.value = currentGame.host.id
  B7.value = currentGame.host.tag

  C7.value = 60;
  D7.value = 0;
  G7.value += 1

  return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A8.value == currentGame.host.id) {
  G8.value += 1

  return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A8.value == null) {
  A8.value = currentGame.host.id
  B8.value = currentGame.host.tag

  C8.value = 60;
  D8.value = 0;
  G8.value += 1

  return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A9.value == currentGame.host.id) {
  G9.value += 1

  return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A9.value == null) {
  A9.value = currentGame.host.id
  B9.value = currentGame.host.tag

  C9.value = 60;
  D9.value = 0;
  G9.value += 1

  return    await sheet.saveUpdatedCells(); // save all updates in one call

}  else if(A10.value == currentGame.host.id) {
  G10.value += 1

  return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A10.value == null) {
  A10.value = currentGame.host.id
  B10.value = currentGame.host.tag

  C10.value = 60;
  D10.value = 0;
  G10.value += 1

  return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A11.value == currentGame.host.id) {
G11.value += 1

return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A11.value == null) {
A11.value = currentGame.host.id
B11.value = currentGame.host.tag

C11.value = 60;
D11.value = 0;
G11.value += 1

return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A12.value == currentGame.host.id) {
G12.value += 1

return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A12.value == null) {
A12.value = currentGame.host.id
B12.value = currentGame.host.tag

C12.value = 60;
D12.value = 0;
G12.value += 1

return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A13.value == currentGame.host.id) {
  D13.value += 1;
  G13.value += 0

  return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A13.value == null) {
  A13.value = currentGame.host.id
  B13.value = currentGame.host.tag

  C13.value = 30;
  D13.value += 1;
  G13.value += 0

  return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A14.value == currentGame.host.id) {
  D14.value += 1;
  G14.value += 0

  return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A14.value == null) {
  A14.value = currentGame.host.id
  B14.value = currentGame.host.tag

  C14.value = 30;
  D14.value += 1;
  G14.value += 0

  return    await sheet.saveUpdatedCells(); // save all updates in one call

}
}
const stop = async () => {
  if (!isInProgress()) {
    return;
  }

  const [usereData] = await User.findOrBuild({
    where: { id: currentGame.client.user.id },
    defaults: { id: currentGame.client.user.id },
  })
  

usereData.cardone = 0
usereData.cardtwo = 0
usereData.cardthree = 0
usereData.cardfour = 0
usereData.cardfive = 0
usereData.cardsix = 0
usereData.cardseven = 0
usereData.cardeight = 0
usereData.cardnine = 0
usereData.cardten = 0
await usereData.save()

setTimeout(()=> currentGame.client.channels.cache
  .get(currentGame.treadd).delete(), 1000)
  currentGame.client.channels.cache.get(config.chan).guild.me.edit({mute:false}).catch((error) => console.log(error))
  await currentGame.client.channels.cache.get(config.chan).guild.me.edit({channel:null}).catch((error) => console.log(error))

  await gogletwo()

  await currentGame.alivePlayers.forEach((player) => remove(player.id));
  currentGame.sortedMembers.forEach(async (player) => {
    console.log(`Удаляем маяки игрока ${player.user.username}`)
    try {
      await deletePlayerMessages()
    }
      catch (error){
        console.log(error)
      }
    console.log('Успешно')
    console.log(`ggggggg`)
      await player.roles.remove(config.gameRole);
      await player.voice.setChannel(`1040251706862215249`).catch(() => {});
     

    
  });
  currentGame.client.channels.cache.get(config.gameChannel).send("**Игра остановлена!**");
  
  currentGame = undefined;
};

const remove = (id) => {
  currentGame.alivePlayers.delete(id);

  const playerMember = currentGame.sortedMembers.get(id);

  if (playerMember.roles.cache.has(config.gameRole)) {
    playerMember.roles.remove(config.gameRole);
  }

  playerMember.setNickname(currentGame.playerNicknames.get(id) || "").catch(() => {});
};

const resurrect = (id) => {
  if (!currentGame.sortedMembers.has(id)) {
    return;
  }

  const player = currentGame.sortedMembers.get(id);

  currentGame.alivePlayers.set(id, player);

  if (currentGame.hangedPlayers.has(id)) {
    currentGame.hangedPlayers.delete(id);
  }

  if (currentGame.killedPlayers.has(id)) {
    currentGame.killedPlayers.delete(id);
  }

  if (!player.roles.cache.has(config.gameRole)) {
    player.roles.add(config.gameRole);
  }
};

const updateNickname = (id) => {
  if (!currentGame.sortedMembers.has(id)) {
    return;
  }

  const player = currentGame.sortedMembers.get(id);

  const warns = currentGame.playerWarns.get(id);
  const fauls = currentGame.playerFauls.get(id);

  const nickname = currentGame.playerNumbers.get(id).toLocaleString(undefined, {
    minimumIntegerDigits: 2
  });

  player
    .setNickname(
      `${nickname} ${"П".repeat(warns)}${warns > 0 ? " " : ""}${"Ф".repeat(fauls)}`
    )
    .catch(() => {});
};

const kill = async (player) => {
  console.log(`Удаляем маяки игрока `)
  try {
    await deletePlayerMessages()
  }
    catch (error){
      console.log(error)
    }  console.log('Успешно')
  if (!isInProgress()) {
    return;
  }
try{
  if (!currentGame.alivePlayers.has(player.id)) {
    return;
  }

  if (!currentGame.firstVictim && currentGame.state == "night" && currentGame.day == 1) {
    currentGame.firstVictim = player;
  }

  remove(player.id);

  const member = currentGame.sortedMembers.get(player.id);

  if (member.voice.channel) {
    member.voice.setChannel(config.chan);
  }

  const { MessageActionRow, MessageSelectMenu} = require("discord.js");



  const gameChannel = currentGame.client.channels.cache.get(config.gameChannel);
 
    if (currentGame.state == "day") {
    await gameChannel.send(
      `**Игрок ${player} был повешен! В живых осталось ${currentGame.alivePlayers.size} игроков!**`
    );

    currentGame.hangedPlayers.add(player.id);
  } else {
    await gameChannel.send(
      `**Игрок ${player} был убит мафией! В живых осталось ${currentGame.alivePlayers.size} игроков!**`
    );

    currentGame.killedPlayers.add(player.id);

  }
  }
catch {
     currentGame.client.channels.cache.get(config.gameChannel).send({embeds: [
        new MessageEmbed()
        .setDescription(`В городе промах`)
      ]})
}
};

const getPlayers = () => {
  return currentGame.sortedMembers;
};

const getAlivePlayers = () => {
  return currentGame.alivePlayers;
};

const addWarn = (player) => {
  if (!isInProgress()) {
    return;
  }

  if (!currentGame.alivePlayers.has(player.id)) {
    return;
  }

  const warns = (currentGame.playerWarns.get(player.id) || 0) + 1;
  const fauls = currentGame.playerFauls.get(player.id) || 0;

  currentGame.playerWarns.set(player.id, warns);

  if (warns < 2) {
    const playerMember = currentGame.alivePlayers.get(player.id);

    const nickname = currentGame.playerNumbers.get(player.id).toLocaleString(undefined, {
      minimumIntegerDigits: 2
    });

    playerMember
      .setNickname(
        `${nickname} ${"П".repeat(warns)}${warns > 0 ? " " : ""}${"Ф".repeat(fauls)}`
      )
      .catch(() => {});
  }

  const warnEmbed = new MessageEmbed()
    .setTitle("**Предупреждение выдано!**")
    .setDescription(`Игрок: ${player}\nВсего предупреждений: **${warns}**`);

  currentGame.client.channels.cache.get(config.gameChannel).send({embeds: [ warnEmbed]});

  if (warns >= 2) {
    remove(player.id);

    currentGame.client.channels.cache
      .get(config.gameChannel)
      .send(
        `**Игрок ${player} исключён за превышение максимального числа предупреждений! В живых осталось ${currentGame.alivePlayers.size} игроков!**`
      );

  }
};

const removeWarn = (player) => {
  if (!isInProgress()) {
    return;
  }

  let warns = currentGame.playerWarns.get(player.id) || 0;
  const fauls = currentGame.playerFauls.get(player.id) || 0;

  if (warns == 0) {
    return;
  }

  warns--;

  currentGame.playerWarns.set(player.id, warns);

  if (warns == 1) {
    resurrect(player.id);

  }

  const playerMember = currentGame.alivePlayers.get(player.id);

  const nickname = currentGame.playerNumbers.get(player.id).toLocaleString(undefined, {
    minimumIntegerDigits: 2
  });

  playerMember
    .setNickname(
      `${nickname} ${"П".repeat(warns)}${warns > 0 ? " " : ""}${"Ф".repeat(fauls)}`
    )
    .catch(() => {});

  const warnEmbed = new MessageEmbed()
    .setTitle("**Предупреждение снято!**")
    .setDescription(`Игрок: ${player}\nВсего предупреждений: **${warns}**`);

  currentGame.client.channels.cache.get(config.gameChannel).send({embeds: [ warnEmbed]});

  if (warns == 1) {
    currentGame.client.channels.cache
      .get(config.gameChannel)
      .send(
        `**Игрок ${player} вернулся в игру! В живых теперь ${currentGame.alivePlayers.size} игроков!**`
      );
  }
};

const addFaul = (player) => {
  if (!isInProgress()) {
    return;
  }

  if (!currentGame.alivePlayers.has(player.id)) {
    return;
  }

  const fauls = (currentGame.playerFauls.get(player.id) || 0) + 1;
  const warns = currentGame.playerWarns.get(player.id) || 0;

  currentGame.playerFauls.set(player.id, fauls);

  if (fauls < 4) {
    const playerMember = currentGame.alivePlayers.get(player.id);

    const nickname = currentGame.playerNumbers.get(player.id).toLocaleString(undefined, {
      minimumIntegerDigits: 2
    });

    playerMember
      .setNickname(
        `${nickname} ${"П".repeat(warns)}${warns > 0 ? " " : ""}${"Ф".repeat(fauls)}`
      )
      .catch(() => {});
  }

  const faulEmbed = new MessageEmbed()
    .setTitle("**Фол выдан!**")
    .setDescription(`Игрок: ${player}\nВсего фолов: **${fauls}**`);

  currentGame.client.channels.cache.get(config.gameChannel).send({embeds: [ faulEmbed]});

  if (fauls >= 4) {
    remove(player.id);
    currentGame.client.channels.cache
      .get(config.gameChannel)
      .send(
        `**Игрок ${player} исключён за превышение максимального числа фолов! В живых осталось ${currentGame.alivePlayers.size} игроков!**`
      );
  }
};

  const addBons = (player, val) => {
  if (!isInProgress()) {
    return;
  }
  try{
  const bons = (currentGame.playerBons.get(player.id) || 0) + val;
  


  currentGame.playerBons.set(player.id, bons);
  }
  catch{
  currentGame.client.channels.cache.get(config.gameChannel).send({content: `Что - то пошло не так, попробуйте еще раз!`});
  }
 
  }
  const addFins = (player, val) => {
    if (!isInProgress()) {
      return;
    }
    try{
    const fins = (currentGame.playerFins.get(player.id) || 0) + val;
    
  
  
    currentGame.playerFins.set(player.id, fins);
    }
    catch{
    currentGame.client.channels.cache.get(config.gameChannel).send({content: `Что - то пошло не так, попробуйте еще раз!`});
    }
   
    }
const tesssst = (player) => {
  console.log(`Штрафы:`, currentGame.playerFins.get(player.id))
  console.log(`Допы:`, currentGame.playerBons.get(player.id))
  console.log(`asadasdad`, player)
  console.log(`hoss`, hoss.hoss)
  console.log(currentGame.mvp == null ? null : currentGame.mvp.user.id)
}


const removeFaul = (player) => {
  if (!isInProgress()) {
    return;
  }

  let fauls = currentGame.playerFauls.get(player.id) || 0;
  const warns = currentGame.playerWarns.get(player.id) || 0;

  if (fauls == 0) {
    return;
  }

  fauls--;

  currentGame.playerFauls.set(player.id, fauls);

  if (fauls == 3) {
    resurrect(player.id);
  

  }

  const playerMember = currentGame.alivePlayers.get(player.id);

  const nickname = currentGame.playerNumbers.get(player.id).toLocaleString(undefined, {
    minimumIntegerDigits: 2
  });

  playerMember
    .setNickname(
      `${nickname} ${"П".repeat(warns)}${warns > 0 ? " " : ""}${"Ф".repeat(fauls)}`
    )
    .catch(() => {});

  const faulEmbed = new MessageEmbed()
    .setTitle("**Фол снят!**")
    .setDescription(`Игрок: ${player}\nВсего фолов: **${fauls}**`);

  currentGame.client.channels.cache.get(config.gameChannel).send({embeds: [ faulEmbed]});

  if (fauls == 3) {
    currentGame.client.channels.cache
      .get(config.gameChannel)
      .send(
        `**Игрок ${player} вернулся в игру! В живых теперь ${currentGame.alivePlayers.size} игроков!**`
      );
  }
};

const finish = async (winner) => {
  if (!isInProgress()) {
    return;
  }

      setTimeout(()=> currentGame.client.channels.cache
  .get(currentGame.treadd).delete(), 1000)




  if (!["mir", "maf"].includes(winner)) {
    return;
  }
 await currentGame.client.channels.cache.get(config.chan).guild.me.edit({mute:false}).catch((error) => console.log(error))

 await currentGame.client.channels.cache.get(config.chan).guild.me.edit({channel:null}).catch((error) => console.log(error))


  currentGame.alivePlayers.forEach((player) => remove(player.id));
  console.log(`1234`,currentGame.sortedMembers)
  console.log(`333`,[currentGame.sortedMembers])
  console.log(`555`,[...currentGame.sortedMembers])
  
  const playerBonuses = currentGame.playerBons
  const playerFines = currentGame.playerFins
  
    
  const endgameState = EndgameState.fromGameState(currentGame, {
    bonusScores: playerBonuses,
    fineScores: playerFines,
  });
  console.log(endgameState.players)
  
  const users = endgameState.players

  const gameResult = await computeGameResult(endgameState, winner);
  const averageBoardRatings = new Map();
  const gameRoles = require("../../../data/roles.json");
  
  currentGame.sortedMembers.forEach(async (player) => {
    const [usere] = await User.findOrBuild({
      where: { id: player.id },
      defaults: { id: player.id }
    });
    console.log(`Удаляем маяки игрока ${player.user.username}`);
    
    try {
      await deletePlayerMessages();
    } catch (error) {
      console.log(error);
    }
  
    console.log('Успешно');
    
    player.roles.remove(config.gameRole);
    player.voice.setChannel(`1040251706862215249`).catch(() => {});
  
    const otherPlayers = currentGame.sortedMembers.filter((id) => id != player);
    const ratings = await Promise.all(otherPlayers.map(async (id) => {
      const otherUser = await User.findOne({ where: { id: id.id } });
      return otherUser.bonusScores;
    }));
  
    const averageRating = ratings.reduce((acc, e) => acc + e, 0) / ratings.length;
    averageBoardRatings.set(player.id, averageRating);
  
    const user = usere.get(player);
    const role = currentGame.playerRoles.get(player.id);
    const { team } = gameRoles[role];
  
    const ratingDifference = user.bonusScores - averageBoardRatings.get(player.id);
  
    // Функция для вычисления K-фактора, который зависит от разницы в рейтингах
    const computeKFactor = (difference) => {
      const baseK = 32;
      const dynamicK = baseK * (1 + Math.abs(difference) / 400);
      return Math.min(dynamicK, 40);
    };
  
    const K = computeKFactor(ratingDifference);
    const expectedScore = 1 / (1 + Math.pow(10, (averageBoardRatings.get(player.id) - user.bonusScores) / 400));
  
    const gameResult = team === winner ? 1 : 0;
  
    // Новый рейтинг по формуле Эло
    let ratingChange = Math.round(K * (gameResult - expectedScore));
  
    // Если рейтинг игрока больше среднего, уменьшаем его за победу и увеличиваем за поражение
    if (user.bonusScores > averageRating) {
      if (gameResult === 1) {
        ratingChange = Math.round(ratingChange * 0.8); // За победу — уменьшаем очки
      } else if (gameResult === 0) {
        ratingChange = Math.round(ratingChange * 1.2); // За поражение — увеличиваем очки
      }
    } else {
      if (gameResult === 1) {
        ratingChange = Math.round(ratingChange * 1.2); // За победу — увеличиваем очки
      } else if (gameResult === 0) {
        ratingChange = Math.round(ratingChange * 0.8); // За поражение — уменьшаем очки
      }
    }
  
    // Учитываем playerFins — на основе процентов
    const bonusPercent = currentGame.playerFins.get(player.id) || 0;
    let bonusAmount = 0;
    
    if (bonusPercent !== 0) {
      if (gameResult === 1) {
        bonusAmount = ratingChange * (bonusPercent / 100); // Уменьшаем бонус за победу в случае отрицательного финанса
      } else {
        bonusAmount = ratingChange * (bonusPercent / 100); // Увеличиваем штраф за поражение
      }
    }
  
    const finalRatingChange = ratingChange + bonusAmount; // Финальная корректировка рейтинга
  
    addBons(player, finalRatingChange);
  });
  
  
         

  





  const hasBestMove = currentGame.bestMove !== undefined;
  


  

  
  
    await saveLastGameResult(gameResult, endgameState, winner);
  
    await saveGameResult(gameResult);

    console.log(`444`,endgameState)




  const players = [...currentGame.playerNumbers.entries()]
    .sort((a, b) => a[1] - b[1])
    .map((v) => currentGame.sortedMembers.get(v[0]));

    console.log(players)

  

  const teamFilter = (team) => (player) =>
    gameRoles[currentGame.playerRoles.get(player.id)].team == team;

  const mafPlayers = players.filter(teamFilter("maf"));
  const mirPlayers = players.filter(teamFilter("mir"));

  const listMapper = (player) => {
    const number = (players.indexOf(player) + 1).toLocaleString(undefined, {
      minimumIntegerDigits: 2
    });

const result = hasBestMove ? currentGame.firstVictim.id == player.user.id ?   currentGame.bestMove + currentGame.playerBons.get(player.id)  : currentGame.playerBons.get(player.id) : currentGame.playerBons.get(player.id)
   


return `#${number} ${player} (${
      gameRoles[currentGame.playerRoles.get(player.id)].name
    }) ${result > 0 ? `(+${result.toFixed(0)})` : `(${result.toFixed(0)})` } `;
  };
  const alllist = players.map(listMapper).join("\n") || "Нет"
  const mafList = mafPlayers.map(listMapper).join("\n") || "Нет";
  const mirList = mirPlayers.map(listMapper).join("\n") || "Нет";
  console.log(mafList)
console.log(mirList)
console.log(alllist)

const Discord = require('discord.js');
const Canvas = require('canvas');
const { registerFont, createCanvas } = require('canvas');
const canvas = Canvas.createCanvas(1024, 1069);
const ctx = canvas.getContext('2d');
const { weirdToNormalChars } = require('weird-to-normal-chars');

registerFont('src/commands/EurostileRoundHeavy.ttf', { family: 'neo' })
const background = await Canvas.loadImage('src/commands/check.png');
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);




const isWinnerone = (winner === 'maf' && mafPlayers.includes(players[0])) || (winner === 'mir' && mirPlayers.includes(players[0]));
const isWinnertwo = (winner === 'maf' && mafPlayers.includes(players[1])) || (winner === 'mir' && mirPlayers.includes(players[1]));
const isWinnerthree = (winner === 'maf' && mafPlayers.includes(players[2])) || (winner === 'mir' && mirPlayers.includes(players[2]));
const isWinnerfour = (winner === 'maf' && mafPlayers.includes(players[3])) || (winner === 'mir' && mirPlayers.includes(players[3]));
const isWinnerfive= (winner === 'maf' && mafPlayers.includes(players[4])) || (winner === 'mir' && mirPlayers.includes(players[4]));
const isWinnersix = (winner === 'maf' && mafPlayers.includes(players[5])) || (winner === 'mir' && mirPlayers.includes(players[5]));
const isWinnerseven = (winner === 'maf' && mafPlayers.includes(players[6])) || (winner === 'mir' && mirPlayers.includes(players[6]));
const isWinnereight = (winner === 'maf' && mafPlayers.includes(players[7])) || (winner === 'mir' && mirPlayers.includes(players[7]));
const isWinnernine = (winner === 'maf' && mafPlayers.includes(players[8])) || (winner === 'mir' && mirPlayers.includes(players[8]));
const isWinnerten = (winner === 'maf' && mafPlayers.includes(players[9])) || (winner === 'mir' && mirPlayers.includes(players[9]));

function drawStraightBar(x, y, width, height, color) {
  ctx.fillStyle = color; // Установка цвета заливки
  ctx.fillRect(x, y, width, height); // Рисуем прямоугольную полоску
}
function drawPillShapedButton(x, y, width, height, color) {
  const radius = height / 2; // Радиус кругов на концах
  
  ctx.beginPath();
  
  // Левая сторона - закругление
  ctx.arc(x + radius, y + radius, radius, Math.PI / 2, Math.PI * 1.5);

  // Верхняя прямая линия
  ctx.lineTo(x + width - radius, y);

  // Правая сторона - закругление
  ctx.arc(x + width - radius, y + radius, radius, Math.PI * 1.5, Math.PI / 2);

  // Нижняя прямая линия
  ctx.lineTo(x + radius, y + height);

  // Закрываем контур
  ctx.closePath();

  // Цвет заливки
  ctx.fillStyle = color;
  ctx.fill();

  // Рисуем обводку (если нужна)
  ctx.strokeStyle = "green"; // Цвет обводки зеленый
  ctx.lineWidth = 2; // Толщина обводки
}
async function drawAvatarInCircle(ctx, avatarUrl, x, y, radius) {
  const avatar = await Canvas.loadImage(avatarUrl);
// Сначала рисуем белую обводку
ctx.save(); // Сохраняем текущее состояние контекста

ctx.beginPath();
ctx.arc(x, y, radius + 1 , 0, Math.PI * 2, true); // Обводка чуть больше радиуса
ctx.closePath();
ctx.strokeStyle = "white"; // Цвет обводки
ctx.lineWidth = 2; // Толщина обводки
ctx.stroke();
  // Определяем круг
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  // Рассчитываем соотношение сторон изображения
  const aspect = avatar.height / avatar.width;
  const hsx = radius * Math.max(1.0 / aspect, 1.0);
  const hsy = radius * Math.max(aspect, 1.0);

  // Рисуем аватар с учётом положения и размеров
  ctx.drawImage(avatar, x - hsx, y - hsy, hsx * 2, hsy * 2);
  ctx.restore(); // Восстанавливаем состояние контекста, чтобы сбросить clip

}
function writename(namee,x,y){
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `25px neo`;
  ctx.textAlign = "left"
  if (namee.length > 11) {
    ctx.fillText(`${weirdToNormalChars(namee.substring(0,11))}...`, x, y);}
    else {    ctx.fillText(`${weirdToNormalChars(namee)} `,  x, y);
  }   
}

function writerank(rank, x,y){
  ctx.restore(); // Восстанавливаем состояние контекста, чтобы сбросить clip

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `25px neo`;
  ctx.textAlign = "center"
  ctx.fillText(rank,  x, y);
  
}
function writechecks(mp, x,y){
  ctx.restore(); // Восстанавливаем состояние контекста, чтобы сбросить clip

  ctx.fillStyle = '#1e0930';
  ctx.font = `25px neo`;
  ctx.textAlign = "left"
  ctx.fillText(mp,  x, y);
  
}

async function drawwinner(winner){
  ctx.restore()
  ctx.fillStyle = '#1e0930';
    ctx.font = `80px neo`;
    ctx.textAlign = "left"
    ctx.fillText(winner + ' ' + 'Wins',  450, 150);
  }
  async function drawnumber(date){
    ctx.restore()
    ctx.fillStyle = '#ffffff';
      ctx.font = `70px neo`;
      ctx.textAlign = "center"
      ctx.fillText(date,  255, 130);
    }
    async function drawlh(lh, x,y){
      ctx.restore()
      ctx.fillStyle = '#1e0930';
        ctx.font = `25px neo`;
        ctx.textAlign = "center"
        ctx.fillText(lh,  x, y);
      }
      async function drawRole(role, x,y) {
        // Загрузка изображений
        const don = await Canvas.loadImage('src/commands/hat.png');
        const maf = await Canvas.loadImage('src/commands/pistol.png');
        const cop = await Canvas.loadImage('src/commands/sheriff.png');
        const mir = await Canvas.loadImage('src/commands/heart.png');
      
        // Условие для выбора изображения на основе роли
        if (role === 'don') {
          ctx.drawImage(don, x, y, 65, 65); // Рисуем шляпу для дона
        } else if (role === 'maf') {
          ctx.drawImage(maf, x, y, 50, 35); // Рисуем пистолет для мафии
        } else if (role === 'cop') {
          ctx.drawImage(cop, x, y, 57, 35); // Рисуем значок шерифа для полиции
        } else if (role === 'mir') {
          ctx.drawImage(mir, x, y, 32, 32); // Рисуем сердце для мирных
        } else {
          console.log("Unknown role: " + role); // Если передана неизвестная роль
        }
      }

const www = players
console.log(www)
function getKey(map, input) {
  for (let [key, value] of map.entries()) {
     if (value === input) {
       return key;
     }
  }
  
  return "Not found";
}
if(www[0] !== undefined){
  const result = currentGame.playerBons.get(www[0].id)

  isWinnerone ? drawStraightBar(671, 265, 147, 6, "green") : drawStraightBar(671, 265, 147, 6, "red"); 
  isWinnerone ? drawPillShapedButton(822, 248, 109, 40, "green") : drawPillShapedButton(822, 248, 109, 40, "red")
  const avatarUrl = currentGame.client.guilds.cache.get('959870711680364564').members.cache.get(`${www[0].id}`).user.avatarURL({ format: 'png', size : 128 });

    // Параметры для рисования аватара
    const avatarX = 253; // Задаем X-координату
    const avatarY = 268; // Задаем Y-координату
    const avatarRadius = 15; // Задаем радиус
    await drawAvatarInCircle(ctx, avatarUrl, 253, 267, avatarRadius);
    writename(`${currentGame.client.users.cache.get(www[0].id).username}`,278,277)
    writerank(`${isWinnerone ? '+' + result : '-' + result}`, 872, 277)
    const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 1))].name
if(rolll == 'Мирный'){
  await drawRole('mir', 596, 252)

}else if(rolll == 'Мафия'){
  await drawRole('maf', 582, 251)

}
else if(rolll == 'Шериф'){
  await drawRole('cop', 585, 249)

}
else if(rolll == 'Дон'){
  await drawRole('don', 579, 236)

}
}
if(www[1] !== undefined){
  const result = currentGame.playerBons.get(www[1].id)

  isWinnertwo ? drawStraightBar(671, 321, 147, 6, "green") : drawStraightBar(671, 321, 147, 6, "red") 
  isWinnertwo ? drawPillShapedButton(822, 304, 109, 40, "green") : drawPillShapedButton(822, 304, 109, 40, "red")
  const avatarUrl = currentGame.client.guilds.cache.get('959870711680364564').members.cache.get(`${www[1].id}`).user.avatarURL({ format: 'png', size : 128 });

    // Параметры для рисования аватара
    const avatarX = 253; // Задаем X-координату
    const avatarY = 268; // Задаем Y-координату
    const avatarRadius = 15; // Задаем радиус
    await drawAvatarInCircle(ctx, avatarUrl, 253, 323, avatarRadius);
    writename(`${currentGame.client.users.cache.get(www[1].id).username}`,278,334)
    writerank(`${isWinnertwo ? '+' + result : '-' + result}`, 872, 334)
    const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 2))].name
if(rolll == 'Мирный'){
  await drawRole('mir', 596, 308)

}else if(rolll == 'Мафия'){
  await drawRole('maf', 582, 307)

}
else if(rolll == 'Шериф'){
  await drawRole('cop', 585, 305)

}
else if(rolll == 'Дон'){
  await drawRole('don', 579, 292)

}
}
if(www[2] !== undefined){
  const result = currentGame.playerBons.get(www[2].id)

  isWinnerthree ? drawStraightBar(671, 377, 147, 6, "green") : drawStraightBar(671, 377, 147, 6, "red"); 
  isWinnerthree ? drawPillShapedButton(822, 360, 109, 40, "green") : drawPillShapedButton(822, 360, 109, 40, "red")
  const avatarUrl = currentGame.client.guilds.cache.get('959870711680364564').members.cache.get(`${www[2].id}`).user.avatarURL({ format: 'png', size : 128 });

    // Параметры для рисования аватара
    const avatarX = 253; // Задаем X-координату
    const avatarY = 268; // Задаем Y-координату
    const avatarRadius = 15; // Задаем радиус
    await drawAvatarInCircle(ctx, avatarUrl, 253, 380, avatarRadius);
    writename(`${currentGame.client.users.cache.get(www[2].id).username}`,278,388)
    writerank(`${isWinnerthree ? '+' + result : '-' + result}`, 872, 388)
    const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 3))].name
if(rolll == 'Мирный'){
  await drawRole('mir', 596, 364)

}else if(rolll == 'Мафия'){
  await drawRole('maf', 582, 363)

}
else if(rolll == 'Шериф'){
  await drawRole('cop', 585, 363)

}
else if(rolll == 'Дон'){
  await drawRole('don', 579, 348)

}
}
if(www[3] !== undefined){
  const result = currentGame.playerBons.get(www[3].id)

  isWinnerfour ? drawStraightBar(671, 433, 147, 6, "green") : drawStraightBar(671, 433, 147, 6, "red"); 
  isWinnerfour ? drawPillShapedButton(822, 416, 109, 40, "green") : drawPillShapedButton(822, 416, 109, 40, "red")
  const avatarUrl = currentGame.client.guilds.cache.get('959870711680364564').members.cache.get(`${www[3].id}`).user.avatarURL({ format: 'png', size : 128 });

    // Параметры для рисования аватара
    const avatarX = 253; // Задаем X-координату
    const avatarY = 268; // Задаем Y-координату
    const avatarRadius = 15; // Задаем радиус
    await drawAvatarInCircle(ctx, avatarUrl, 253, 436, avatarRadius);
    writename(`${currentGame.client.users.cache.get(www[3].id).username}`,278,444)
    writerank(`${isWinnerfour ? '+' + result : '-' + result}`, 872, 444)
    const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 4))].name
if(rolll == 'Мирный'){
  await drawRole('mir', 596, 420)

}else if(rolll == 'Мафия'){
  await drawRole('maf', 582, 419)

}
else if(rolll == 'Шериф'){
  await drawRole('cop', 585, 419)

}
else if(rolll == 'Дон'){
  await drawRole('don', 579, 404)

}
}
if(www[4] !== undefined){
  const result = currentGame.playerBons.get(www[4].id)

  isWinnerfive ? drawStraightBar(671, 489, 147, 6, "green") : drawStraightBar(671, 489, 147, 6, "red"); 
  isWinnerfive ? drawPillShapedButton(822, 472, 109, 40, "green") : drawPillShapedButton(822, 472, 109, 40, "red")
  const avatarUrl = currentGame.client.guilds.cache.get('959870711680364564').members.cache.get(`${www[4].id}`).user.avatarURL({ format: 'png', size : 128 });

    // Параметры для рисования аватара
    const avatarX = 253; // Задаем X-координату
    const avatarY = 268; // Задаем Y-координату
    const avatarRadius = 15; // Задаем радиус
    await drawAvatarInCircle(ctx, avatarUrl, 253, 492, avatarRadius);
    writename(`${currentGame.client.users.cache.get(www[4].id).username}`,278,501)
    writerank(`${isWinnerfive ? '+' + result : '-' + result}`, 872, 501)
    const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 5))].name
if(rolll == 'Мирный'){
  await drawRole('mir', 596, 476)

}else if(rolll == 'Мафия'){
  await drawRole('maf', 582, 475)

}
else if(rolll == 'Шериф'){
  await drawRole('cop', 585, 475)

}
else if(rolll == 'Дон'){
  await drawRole('don', 579, 460)

}
}
if(www[5] !== undefined){
  const result = currentGame.playerBons.get(www[5].id)

  isWinnersix ? drawStraightBar(671, 545, 147, 6, "green") : drawStraightBar(671, 545, 147, 6, "red"); 
  isWinnersix ? drawPillShapedButton(822, 528, 109, 40, "green") : drawPillShapedButton(822, 528, 109, 40, "red")
  const avatarUrl = currentGame.client.guilds.cache.get('959870711680364564').members.cache.get(`${www[5].id}`).user.avatarURL({ format: 'png', size : 128 });

    // Параметры для рисования аватара
    const avatarX = 253; // Задаем X-координату
    const avatarY = 268; // Задаем Y-координату
    const avatarRadius = 15; // Задаем радиус
    await drawAvatarInCircle(ctx, avatarUrl, 253, 549, avatarRadius);
    writename(`${currentGame.client.users.cache.get(www[5].id).username}`,278,557)
    writerank(`${isWinnersix ? '+' + result : '-' + result}`, 872, 557)
    const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 6))].name
if(rolll == 'Мирный'){
  await drawRole('mir', 596, 532)

}else if(rolll == 'Мафия'){
  await drawRole('maf', 582, 531)

}
else if(rolll == 'Шериф'){
  await drawRole('cop', 585, 531)

}
else if(rolll == 'Дон'){
  await drawRole('don', 579, 516)

}
}
if(www[6] !== undefined){
  const result = currentGame.playerBons.get(www[6].id)

  isWinnerseven ? drawStraightBar(671, 601, 147, 6, "green") : drawStraightBar(671, 601, 147, 6, "red"); 
  isWinnerseven ? drawPillShapedButton(822, 584, 109, 40, "green") : drawPillShapedButton(822, 584, 109, 40, "red")
  const avatarUrl = currentGame.client.guilds.cache.get('959870711680364564').members.cache.get(`${www[6].id}`).user.avatarURL({ format: 'png', size : 128 });

    // Параметры для рисования аватара
    const avatarX = 253; // Задаем X-координату
    const avatarY = 268; // Задаем Y-координату
    const avatarRadius = 15; // Задаем радиус
    await drawAvatarInCircle(ctx, avatarUrl, 253, 605, avatarRadius);
    writename(`${currentGame.client.users.cache.get(www[6].id).username}`,278,614)
    writerank(`${isWinnerseven ? '+' + result : '-' + result}`, 872, 614)
    const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 7))].name
if(rolll == 'Мирный'){
  await drawRole('mir', 596, 588)

}else if(rolll == 'Мафия'){
  await drawRole('maf', 582, 587)

}
else if(rolll == 'Шериф'){
  await drawRole('cop', 585, 587)

}
else if(rolll == 'Дон'){
  await drawRole('don', 579, 572)

}
}
if(www[7] !== undefined){
  const result = currentGame.playerBons.get(www[7].id)

  isWinnereight ? drawStraightBar(671, 657, 147, 6, "green") : drawStraightBar(671, 657, 147, 6, "red"); 
  isWinnereight ? drawPillShapedButton(822, 640, 109, 40, "green") : drawPillShapedButton(822, 640, 109, 40, "red")
  const avatarUrl = currentGame.client.guilds.cache.get('959870711680364564').members.cache.get(`${www[7].id}`).user.avatarURL({ format: 'png', size : 128 });

    // Параметры для рисования аватара
    const avatarX = 253; // Задаем X-координату
    const avatarY = 268; // Задаем Y-координату
    const avatarRadius = 15; // Задаем радиус
    await drawAvatarInCircle(ctx, avatarUrl, 253, 660, avatarRadius);
    writename(`${currentGame.client.users.cache.get(www[7].id).username}`,278,670)
    writerank(`${isWinnereight ? '+' + result : '-' + result}`, 872, 670)
    const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 8))].name
if(rolll == 'Мирный'){
  await drawRole('mir', 596, 644)

}else if(rolll == 'Мафия'){
  await drawRole('maf', 582, 643)

}
else if(rolll == 'Шериф'){
  await drawRole('cop', 585, 644)

}
else if(rolll == 'Дон'){
  await drawRole('don', 579, 628)

}
}
if(www[8] !== undefined){
  const result = currentGame.playerBons.get(www[8].id)

  isWinnernine ? drawStraightBar(671, 713, 147, 6, "green") : drawStraightBar(671, 713, 147, 6, "red"); 
  isWinnernine ? drawPillShapedButton(822, 696, 109, 40, "green") : drawPillShapedButton(822, 696, 109, 40, "red")
  const avatarUrl = currentGame.client.guilds.cache.get('959870711680364564').members.cache.get(`${www[8].id}`).user.avatarURL({ format: 'png', size : 128 });

    // Параметры для рисования аватара
    const avatarX = 253; // Задаем X-координату
    const avatarY = 268; // Задаем Y-координату
    const avatarRadius = 15; // Задаем радиус
    await drawAvatarInCircle(ctx, avatarUrl, 253, 717, avatarRadius);
    writename(`${currentGame.client.users.cache.get(www[8].id).username}`,278,726)
    writerank(`${isWinnernine ? '+' + result : '-' + result}`, 872, 726)
    const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 9))].name
if(rolll == 'Мирный'){
  await drawRole('mir', 596, 700)

}else if(rolll == 'Мафия'){
  await drawRole('maf', 582, 699)

}
else if(rolll == 'Шериф'){
  await drawRole('cop', 585, 699)

}
else if(rolll == 'Дон'){
  await drawRole('don', 579, 684)

}
}
if(www[9] !== undefined){
  const result = currentGame.playerBons.get(www[9].id)

  isWinnerten ? drawStraightBar(671, 769, 147, 6, "green") : drawStraightBar(671, 769, 147, 6, "red"); 
  isWinnerten ? drawPillShapedButton(822, 752, 109, 40, "green") : drawPillShapedButton(822, 752, 109, 40, "red")
  const avatarUrl = currentGame.client.guilds.cache.get('959870711680364564').members.cache.get(`${www[9].id}`).user.avatarURL({ format: 'png', size : 128 });

    // Параметры для рисования аватара
    const avatarX = 253; // Задаем X-координату
    const avatarY = 268; // Задаем Y-координату
    const avatarRadius = 15; // Задаем радиус
    await drawAvatarInCircle(ctx, avatarUrl, 253, 772, avatarRadius);
    writename(`${currentGame.client.users.cache.get(www[9].id).username}`,278,782)
    writerank(`${isWinnerten ? '+' + result : '-' + result}`, 872, 782)
    const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 10))].name
if(rolll == 'Мирный'){
  await drawRole('mir', 596, 756)

}else if(rolll == 'Мафия'){
  await drawRole('maf', 582, 755)

}
else if(rolll == 'Шериф'){
  await drawRole('cop', 585, 756)

}
else if(rolll == 'Дон'){
  await drawRole('don', 579, 740)

}
}

if(winner == 'mir'){
  await drawwinner('Heart')
}
else{
  await drawwinner('Mafia')

}
await drawnumber(`#${currentGame.number}`)
const killedPlayers = [...currentGame.killedPlayers].map((id) =>
  currentGame.playerNumbers.get(id)
);
const hangedPlayers = [...currentGame.hangedPlayers].map((id) =>
  currentGame.playerNumbers.get(id)
);
const copchecks = [...currentGame.copchecks].map((id) =>
currentGame.playerNumbers.get(id)
)
const donchecks = [...currentGame.donchecks].map((id) =>
currentGame.playerNumbers.get(id)
)

const numberFormatter = (number) =>
  number.toLocaleString(undefined, {
    minimumIntegerDigits: 2
  });
writechecks(`${killedPlayers.map(numberFormatter).join(",") || "Нет"}`, 237,840)
writechecks(`${hangedPlayers.map(numberFormatter).join(",") || "Нет"}`, 237,893)
writechecks(`${copchecks.map(numberFormatter).join(",") || "Нет"}`, 237,946)
writechecks(`${donchecks.map(numberFormatter).join(",") || "Нет"}`, 237,998)

if (hasBestMove) {
  const bestMovePlayer = currentGame.playerNumbers.get(currentGame.firstVictim.id);
  const bestMoveTargets = currentGame.bestMoveTargets.map((id) =>
    currentGame.playerNumbers.get(id)
  );
  const numberFormatter = (number) =>
    number.toLocaleString(undefined, {
      minimumIntegerDigits: 2
    });
if(numberFormatter(bestMovePlayer) == '01'){ 
  await drawlh(`${numberFormatter(bestMoveTargets)}`, 745, 262)
}
else if (numberFormatter(bestMovePlayer) == '02'){
  await drawlh(`${numberFormatter(bestMoveTargets)}`, 745, 318)
}
else if (numberFormatter(bestMovePlayer) == '03'){
  await drawlh(`${numberFormatter(bestMoveTargets)}`, 745, 375)
}
else if (numberFormatter(bestMovePlayer) == '04'){
  await drawlh(`${numberFormatter(bestMoveTargets)}`, 745, 431)
}
else if (numberFormatter(bestMovePlayer) == '05'){
  await drawlh(`${numberFormatter(bestMoveTargets)}`, 745, 487)
}
else if (numberFormatter(bestMovePlayer) == '06'){
  await drawlh(`${numberFormatter(bestMoveTargets)}`, 745, 543)
}
else if (numberFormatter(bestMovePlayer) == '07'){
  await drawlh(`${numberFormatter(bestMoveTargets)}`, 745, 599)
}else if (numberFormatter(bestMovePlayer) == '08'){
  await drawlh(`${numberFormatter(bestMoveTargets)}`, 745, 655)
}
else if (numberFormatter(bestMovePlayer) == '09'){
  await drawlh(`${numberFormatter(bestMoveTargets)}`, 745, 711)
}
else if (numberFormatter(bestMovePlayer) == '10'){
  await drawlh(`${numberFormatter(bestMoveTargets)}`, 745, 767)
}
}



// Пример использования для красной и зелёной полоски

const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'score.png');
    console.log(attachment);


    await currentGame.client.channels.cache.get(config.gameChannel).send({ files: [attachment] });
     await currentGame.client.channels.cache.get(`975453637608374323`).send({files: [attachment]});






  const gameChannel = currentGame.client.channels.resolve(config.gameChannel);

 
  {
    const playerListEmbed = new MessageEmbed().setTitle(winner == "mir" ? "**Победа мирных**" : "**Победа мафии**");

    if (winner == "maf") {


      playerListEmbed.addField("Мафия", mafList);
      playerListEmbed.addField("Мирные", mirList);
      playerListEmbed.setColor(`#23272A`)
    } else {
      playerListEmbed.addField("Мирные", mirList);
      playerListEmbed.addField("Мафия", mafList);
      playerListEmbed.setColor(`#F93A2F`)
    }
    var date = new Date(Date.now());

    playerListEmbed.setAuthor(`Игра от ${date.toLocaleDateString()}  ${date.toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow' })}`)
    const killedPlayers = [...currentGame.killedPlayers].map((id) =>
      currentGame.playerNumbers.get(id)
    );
    const hangedPlayers = [...currentGame.hangedPlayers].map((id) =>
      currentGame.playerNumbers.get(id)
    );
    const copchecks = [...currentGame.copchecks].map((id) =>
    currentGame.playerNumbers.get(id)
    )
    const donchecks = [...currentGame.donchecks].map((id) =>
    currentGame.playerNumbers.get(id)
    )
    const numberFormatter = (number) =>
      number.toLocaleString(undefined, {
        minimumIntegerDigits: 2
      });

    playerListEmbed.addField(
      "Убитые",
      `**${killedPlayers.map(numberFormatter).join(", ") || "Нет"}**`
    );
    playerListEmbed.addField(
      "Заголосованые",
      `**${hangedPlayers.map(numberFormatter).join(", ") || "Нет"}**`
    );
    playerListEmbed.addField(
      "Проверки Шерифа",
      `**${copchecks.map(numberFormatter).join(", ") || "Нет"}**`
    );
    playerListEmbed.addField(
      "Проверки Дона",
      `**${donchecks.map(numberFormatter).join(", ") || "Нет"}**`
    );
    if (hasBestMove) {
      const bestMovePlayer = currentGame.playerNumbers.get(currentGame.firstVictim.id);
      const bestMoveTargets = currentGame.bestMoveTargets.map((id) =>
        currentGame.playerNumbers.get(id)
      );

      playerListEmbed.addField(
        "Лучший ход",
        `**${bestMoveTargets.map(numberFormatter).join(", ")} от ${numberFormatter(
          bestMovePlayer
        )}**`
      );
    } else {
      playerListEmbed.addField("Лучший ход", "**Нет**");
    }

    playerListEmbed.setFooter(
      `Игра #${currentGame.number} проведена ${currentGame.host.username}!`
    );

    await currentGame.client.channels.cache.get(`975453637608374323`).send(`!save`);

  }
if(currentGame.mvp == null){
  const bestPlayerEmbed = new MessageEmbed()
  .setTitle(`Лучший игрок матча`)
  .setDescription(`По итогам игры лучший игрок матча не был выбран`)


}
else {
  const bestPlayerEmbed = new MessageEmbed()
  .setTitle(`Лучший игрок матча`)
  .setDescription(`По итогам игры лучшим игроком матча становится ${currentGame.mvp}`)


}
  if (currentGame.mode == "tour") {
    currentGame = undefined;

    removeOngoingGame();

    return;
  }

  const gogle = async () => {
    const { GoogleSpreadsheet } = require('google-spreadsheet');

    const doc = new GoogleSpreadsheet('1VYp2tZ2iKEUz3ZL615_WbYLNUDqHI6A08bTy5hkQIUs');
       
    await doc.useServiceAccountAuth({
        client_email: `anskulainen@excel-317720.iam.gserviceaccount.com`,
        private_key: `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCw6aKqtgbq+mha\nPGTR2T/OGUeWrwu5zYZ0L7FhvBGHXYeXG7wWx4iRi2TtlwvGA9C3CllGFfwm3c8j\nntUTBewqFJaiV5C4IiGHZcrucDVtJUrEWP2V4elkLF7tr6eFpxgPOwn9iJa5yslO\nMimzghOfc7D5qz3QFDnqM+VtpkfAdmoZyRDdeuZsr+JgQK9OHm4LdgJ78xMVmigj\nbuP6cnJ3vjt9fVzKh4+ba7KUtHb7tJRWZv7LzltDg0G7JQijVgitAEp2yinzUyH3\njP5WynWj7FosG/S/GcQi/RhHSYvRE9P6EpdkzJiz1Zw/zgW3SkqZTEbRkCF7OyXw\ncwjLzkT3AgMBAAECggEAFVgNZuuGLc8J9v+7/ttnSMjLq8uGWSOJj2FPqnsjtuwF\nrKlNHzHHRslauGrVofgaNB3crnQpk1DbKbDYg9kzkyd1EwoIgkalOpjWi7+K7+uk\nt8gFdDyoyWFXD0shes0G6JOBaDlp9z7Bhxx4joPo39R3629fCkiJF49XpKEqnUwY\nlfy4Y5jY8EEoeWguqrG/ofYbF/s3EkABPAhDNyZlWpzPTh1PHAPubQXwg6zTUeCC\nizd4oO0LP/dzCPYgoSH9fXoQMN23Esjo744mpgH+sRxnK5KLXchxXcK+WO2b4j69\n6iXEu78ExJCj12sPzkayk/ewfwVesrHdUtKqZTMeGQKBgQDkBdh6bStI8dfGe31o\nf0PvRMEcdqtiRu2F8oG2HanhS9cNsNf0ARoNfvHtOyRGfPC+yT3RpqwLIYvFp4i3\nAz/RBD2RQvUW88ppbDkT3y+p7p6N/o8+NLMsf+U9ZXZMzj93GkNG6AXoXwBWTiHy\nGdMCS8OyUI63uHf/58GNW+Wo7wKBgQDGnm2a2RCQqR/B44AbpeNymz5WXF1ErKpJ\nZrc1mRW3URlWyox4w+PVBQG0axhfdlucDwDOomUxY+xTSM5nOSPa339qumkdaEvE\n8h9FA+qzhOWp8gR6TwcEDOtgUC8NTmNcl4LlydCH7XCgc8Qt8sNg7lo9KPXf2T8D\nBdxTfl1UeQKBgQC5EiWJ+GFRazj+1+wJjIHPCbbTK14e/gJ63UF6VskzGyMI8afV\nW6+RlJ83NPFUZMPhleSe7PBmeGvBmSDVqcV6GD8AT6AtaOG4fyY0gslk20/FX/9T\nNeLXE1c0Zc2GuT+5o49HVbq1x6W2ZuQWY+9nxaaoa8nqQ8bh5XCrExNr8QKBgFTW\nLOjcWKgBpU/y9bBZjipQxzKqJyiDPAU4O39IUS9JE7Kvt4qJ2ZIOnmjK6dE0w/KH\nsgeQ8/pBvRrh2U/b50XA+zLCRs3J07te1B5tit19IYASoPkBMnT3c75i4YYkemp9\nSOsP5eN5dwcCC8S4kd2gUakYCtW/fJu08CQ1sHW5AoGAXZKpphkTGCGU3GBb6zQ0\nrpmOl4nBn+XO+yWFZUUQLETvyFu4Ie1q2s+9LuKJdinh58JQrZbXAzp2QHcuew7/\nBpH8WA0b+ImOdyLzsTv28Ac3UEPFg+JIaelDCNyaFOFBOskQw7WeioDCvPnD1Qjq\nBznPPc6wXcsqgUCCveynAo8=\n-----END PRIVATE KEY-----\n`,
      });
  
      await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);
  await doc.updateProperties({ title: 'Соответствия ведущих' });
  
  // adding / removing sheets
  
  const sheet = doc.sheetsByIndex[0]
  sheet.updateProperties({ title: 'Соответствия ведущих' });
  
  await sheet.loadCells(); // loads a range of cells
  const A5 = sheet.getCellByA1('A5')
  const B5 = sheet.getCellByA1('B5')
  const C5 = sheet.getCellByA1('C5')
  const D5 = sheet.getCellByA1('D5')
  const G5 = sheet.getCellByA1('G5')
  const A6 = sheet.getCellByA1('A6')
  const B6 = sheet.getCellByA1('B6')
  const C6 = sheet.getCellByA1('C6')
  const D6 = sheet.getCellByA1('D6')
  const G6 = sheet.getCellByA1('G6')
  const A7 = sheet.getCellByA1('A7')
  const B7 = sheet.getCellByA1('B7')
  const C7 = sheet.getCellByA1('C7')
  const D7 = sheet.getCellByA1('D7')
  const G7 = sheet.getCellByA1('G7')
  const A8 = sheet.getCellByA1('A8')
  const B8 = sheet.getCellByA1('B8')
  const C8 = sheet.getCellByA1('C8')
  const D8 = sheet.getCellByA1('D8')
  const G8 = sheet.getCellByA1('G8')
  const A9 = sheet.getCellByA1('A9')
  const B9 = sheet.getCellByA1('B9')
  const C9 = sheet.getCellByA1('C9')
  const D9 = sheet.getCellByA1('D9')
  const G9 = sheet.getCellByA1('G9')
  const A10 = sheet.getCellByA1('A10')
  const B10 = sheet.getCellByA1('B10')
  const C10 = sheet.getCellByA1('C10')
  const D10 = sheet.getCellByA1('D10')
  const G10 = sheet.getCellByA1('G10')
  const A11 = sheet.getCellByA1('A11')
  const B11 = sheet.getCellByA1('B11')
  const C11 = sheet.getCellByA1('C11')
  const D11 = sheet.getCellByA1('D11')
  const G11 = sheet.getCellByA1('G11')
  const A12 = sheet.getCellByA1('A12')
  const B12 = sheet.getCellByA1('B12')
  const C12 = sheet.getCellByA1('C12')
  const D12 = sheet.getCellByA1('D12')
  const G12 = sheet.getCellByA1('G12')
  const A13 = sheet.getCellByA1('A13')
  const B13 = sheet.getCellByA1('B13')
  const C13 = sheet.getCellByA1('C13')
  const D13 = sheet.getCellByA1('D13')
  const G13 = sheet.getCellByA1('G13')
  const A14 = sheet.getCellByA1('A14')
  const B14 = sheet.getCellByA1('B14')
  const C14 = sheet.getCellByA1('C14')
  const D14 = sheet.getCellByA1('D14')
  const G14 = sheet.getCellByA1('G14')
  if(A5.value == currentGame.host.id ) {
  
  D5.value += 1;
  G5.value += 0
  
  return    await sheet.saveUpdatedCells(); // save all updates in one call
  
  
  }
  else if(A5.value == null) {
    A5.value = currentGame.host.id
    B5.value = currentGame.host.tag
    C5.value = 60;
    D5.value += 1;
    G5.value += 0
  
    return    await sheet.saveUpdatedCells(); // save all updates in one call
  
  }
  else if(A6.value == currentGame.host.id) {
    D6.value += 1;
    G6.value += 0
  
    return    await sheet.saveUpdatedCells(); // save all updates in one call
  
  }
  else if(A6.value == null) {
    A6.value = currentGame.host.id
    B6.value = currentGame.host.tag
  
    C6.value = 60;
    D6.value += 1;
    G6.value += 0
  
    return    await sheet.saveUpdatedCells(); // save all updates in one call
  
  }
  else if(A7.value == currentGame.host.id) {
    D7.value += 1;
    G7.value += 0
  
    return    await sheet.saveUpdatedCells(); // save all updates in one call
  
  }
  else if(A7.value == null) {
    A7.value = currentGame.host.id
    B7.value = currentGame.host.tag
  
    C7.value = 60;
    D7.value += 1;
    G7.value += 0
  
    return    await sheet.saveUpdatedCells(); // save all updates in one call
  
  }
  else if(A8.value == currentGame.host.id) {
    D8.value += 1;
    G8.value += 0
  
    return    await sheet.saveUpdatedCells(); // save all updates in one call
  
  }
  else if(A8.value == null) {
    A8.value = currentGame.host.id
    B8.value = currentGame.host.tag
  
    C8.value = 60;
    D8.value += 1;
    G8.value += 0
  
    return    await sheet.saveUpdatedCells(); // save all updates in one call
  
  }
  else if(A9.value == currentGame.host.id) {
    D9.value += 1;
    G9.value += 0
  
    return    await sheet.saveUpdatedCells(); // save all updates in one call
  
  }
  else if(A9.value == null) {
    A9.value = currentGame.host.id
    B9.value = currentGame.host.tag
  
    C9.value = 60;
    D9.value += 1;
    G9.value += 0
  
    return    await sheet.saveUpdatedCells(); // save all updates in one call
  
  }  else if(A10.value == currentGame.host.id) {
    D10.value += 1;
    G10.value += 0
  
    return    await sheet.saveUpdatedCells(); // save all updates in one call
  
  }
  else if(A10.value == null) {
    A10.value = currentGame.host.id
    B10.value = currentGame.host.tag
  
    C10.value = 60;
    D10.value += 1;
    G10.value += 0
  
    return    await sheet.saveUpdatedCells(); // save all updates in one call
  
  }
  else if(A11.value == currentGame.host.id) {
  D11.value += 1;
  G11.value += 0

  return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A11.value == null) {
  A11.value = currentGame.host.id
  B11.value = currentGame.host.tag

  C11.value = 60;
  D11.value += 1;
  G11.value += 0

  return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A12.value == currentGame.host.id) {
  D12.value += 1;
  G12.value += 0

  return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A12.value == null) {
  A12.value = currentGame.host.id
  B12.value = currentGame.host.tag

  C12.value = 60;
  D12.value += 1;
  G12.value += 0

  return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A13.value == currentGame.host.id) {
  D13.value += 1;
  G13.value += 0

  return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A13.value == null) {
  A13.value = currentGame.host.id
  B13.value = currentGame.host.tag

  C13.value = 30;
  D13.value += 1;
  G13.value += 0

  return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A14.value == currentGame.host.id) {
  D14.value += 1;
  G14.value += 0

  return    await sheet.saveUpdatedCells(); // save all updates in one call

}
else if(A14.value == null) {
  A14.value = currentGame.host.id
  B14.value = currentGame.host.tag

  C14.value = 30;
  D14.value += 1;
  G14.value += 0

  return    await sheet.saveUpdatedCells(); // save all updates in one call

}
  }
  
  currentGame.client.emit("ratingUpdate");
  await gogle()
  currentGame = undefined;

  removeOngoingGame();
  
};

const pause = () => {
  if (!isInProgress()) {
    return;
  }
  const guild = currentGame.client.guilds.cache.get(`889286310928465920`);

  currentGame.client.channels.cache.get(config.chan).guild.me.edit({mute:false}).catch((error) => console.log(error))
  currentGame.client.channels.cache
    .get(config.gameChannel)
    .send({embeds: [ 
      new MessageEmbed()
        .setTitle("**Игра приостановлена**")
        .setDescription("**Техническая пауза. Говорить запрещено!**")
    ]}
    );

  currentGame.alivePlayers.forEach(async (player) => {
    if (player.roles.cache.has(config.gameRole)) {
      await player.roles.remove(config.gameRole);
      await player.voice.setChannel(config.chan).catch(() => {});
     

    }
  });
};

const nightkill = async () => {
  const players = [...currentGame.alivePlayers.entries()]
  .sort((a, b) => a[1] - b[1])
  .map((v) => currentGame.sortedMembers.get(v[0]));

  const teamFilter = (team) => (player) => 
  gameRoles[currentGame.playerRoles.get(player.id)].team == team;
  const mafPlayers = players.filter(teamFilter("maf"));
console.log(mafPlayers[0])


"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
async function* asyncGenerator(num) {
    let i = 0;
    while (i < num) {
        yield i++;
    }
}

if(mafPlayers.length == 1){
  const killEmbed = () => new MessageEmbed()
  .setTitle(`Отстрел`)
  .setDescription(`У Вас есть 20 секунд на отстрел. Выберите цифру для отстрела от 1 до 10 `)
.addField(`<:666:1123151992706043924>`,`Отстрел принят`)
  var resultone = 0;
  const { MessageActionRow, MessageSelectMenu} = require("discord.js");
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  const row = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setCustomId(`one`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 1)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 1)) ? `1` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 1)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 1)) ? false : `🪦`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`two`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 2)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 2)) ? `2` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 2)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 2)) ? false : `🪦`)
  )
  .addComponents(
    new MessageButton()
    .setCustomId(`three`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 3)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 3)) ? `3` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 3)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 3)) ? false : `🪦`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`four`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 4)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 4)) ? `4` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 4)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 4)) ? false : `🪦`)


  )
  .addComponents(
    new MessageButton()
    .setCustomId(`five`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 5)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 5)) ? `5` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 5)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 5)) ? false : `🪦`)


  )
  const rowtwo = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setCustomId(`six`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 6)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 6)) ? `6` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 6)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 6)) ? false : `🪦`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`seven`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 7)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 7)) ? `7` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 7)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 7)) ? false : `🪦`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`eight`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 8)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 8)) ? `8` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 8)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 8)) ? false : `🪦`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`nine`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 9)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 9)) ? `9` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 9)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 9)) ? false : `🪦`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`ten`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 10)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 10)) ? `10` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 10)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 10)) ? false : `🪦`)

  )







  for await (const i of asyncGenerator(1)) {


  const mafone = await mafPlayers[0].send({embeds: [killEmbed()],components: [row, rowtwo] })
  const filter = (interaction) => interaction.isButton()
  const [userData] = await User.findOrBuild({
    where: { id: mafPlayers[0].id },
    defaults: { id: mafPlayers[0].id },
  })
  var shoot = userData.shoot

  
  const oneCollector = mafone.createMessageComponentCollector({filter, time: 20000, errors: ["time"]});
  oneCollector.on('collect', async interaction => {

    if (interaction.customId == "one") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }

      row.components[0].setStyle(`SECONDARY`)
      row.components[0].setEmoji(`1123151992706043924`)
      row.components[0]
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


    }
    if (interaction.customId == "two") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
  
      row.components[1].setStyle(`SECONDARY`)
      row.components[1].setEmoji(`1123151992706043924`)
      row.components[1]
      row.components[1].setDisabled(true)
      row.components[0].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  
    }
    if (interaction.customId == "three") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
  
      row.components[2].setStyle(`SECONDARY`)
      row.components[2].setEmoji(`1123151992706043924`)
      row.components[2]
      row.components[2].setDisabled(true)
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  
    }
    if (interaction.customId == "four") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
  
      row.components[3].setStyle(`SECONDARY`)
      row.components[3].setEmoji(`1123151992706043924`)
      row.components[3]
      row.components[3].setDisabled(true)
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  
    }
    if (interaction.customId == "five") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
  
      row.components[4].setStyle(`SECONDARY`)
      row.components[4].setEmoji(`1123151992706043924`)
      row.components[4]
      row.components[4].setDisabled(true)
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  
    }
     if (interaction.customId == "six") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

  
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setStyle(`SECONDARY`)
    rowtwo.components[0].setEmoji(`1123151992706043924`)
    rowtwo.components[0]
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "seven") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

  
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[1].setStyle(`SECONDARY`)
    rowtwo.components[1].setEmoji(`1123151992706043924`)
    rowtwo.components[1]
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "eight") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

  
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[2].setStyle(`SECONDARY`)
    rowtwo.components[2].setEmoji(`1123151992706043924`)
    rowtwo.components[2]
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "nine") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

  
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[3].setStyle(`SECONDARY`)
    rowtwo.components[3].setEmoji(`1123151992706043924`)
    rowtwo.components[3]
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "ten") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

  
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[4].setStyle(`SECONDARY`)
    rowtwo.components[4].setEmoji(`1123151992706043924`)
    rowtwo.components[4]
    rowtwo.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    oneCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  })
oneCollector.on(`end`, async collected => {
  if(collected.size < 1) {
    currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Никого не стрелял.`)
   mafPlayers[0].send(`Отстрела не было`)
   row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    oneCollector.stop();
 }
  else{
if([...collected.values()][0].customId == 'one'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 1.`)
  userData.shoot = Number(1)
    await userData.save()
}
if([...collected.values()][0].customId == 'two'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 2.`)
  userData.shoot = Number(2)
    await userData.save()
}
if([...collected.values()][0].customId == 'three'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 3.`)
  userData.shoot = Number(3)
    await userData.save()
}
if([...collected.values()][0].customId == 'four'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 4.`)
  userData.shoot = Number(4)
    await userData.save()
}
if([...collected.values()][0].customId == 'five'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 5.`)
  userData.shoot = Number(5)
    await userData.save()
}
if([...collected.values()][0].customId == 'six'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 6.`)
  userData.shoot = Number(6)
    await userData.save()
}
if([...collected.values()][0].customId == 'seven'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 7.`)
  userData.shoot = Number(7)
    await userData.save()
}
if([...collected.values()][0].customId == 'eight'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 8.`)
  userData.shoot = Number(8)
    await userData.save()
}
if([...collected.values()][0].customId == 'nine'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 9.`)
  userData.shoot = Number(9)
    await userData.save()
}
if([...collected.values()][0].customId == 'ten'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 10.`)
  userData.shoot = Number(10)
    await userData.save()
}
  }
} )



}
}

  if(mafPlayers.length == 2){

  const killEmbed = () => new MessageEmbed()
  .setTitle(`Отстрел`)
  .setDescription(`У Вас есть 20 секунд на отстрел. Выберите цифру для отстрела от 1 до 10 `)
.addField(`<:666:1123151992706043924>`,`Отстрел принят`)
  var resultone = 0;
  var resulttwo = 0;
  const { MessageActionRow, MessageSelectMenu} = require("discord.js");
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  const row = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setCustomId(`one`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 1)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 1)) ? `1` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 1)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 1)) ? false : `🪦`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`two`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 2)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 2)) ? `2` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 2)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 2)) ? false : `🪦`)
  )
  .addComponents(
    new MessageButton()
    .setCustomId(`three`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 3)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 3)) ? `3` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 3)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 3)) ? false : `🪦`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`four`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 4)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 4)) ? `4` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 4)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 4)) ? false : `🪦`)


  )
  .addComponents(
    new MessageButton()
    .setCustomId(`five`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 5)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 5)) ? `5` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 5)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 5)) ? false : `🪦`)


  )
  const rowtwo = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setCustomId(`six`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 6)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 6)) ? `6` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 6)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 6)) ? false : `🪦`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`seven`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 7)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 7)) ? `7` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 7)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 7)) ? false : `🪦`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`eight`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 8)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 8)) ? `8` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 8)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 8)) ? false : `🪦`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`nine`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 9)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 9)) ? `9` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 9)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 9)) ? false : `🪦`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`ten`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 10)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 10)) ? `10` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 10)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 10)) ? false : `🪦`)

  )







  for await (const i of asyncGenerator(1)) {


  const mafone = await mafPlayers[0].send({embeds: [killEmbed()],components: [row, rowtwo] })
  const maftwo = await mafPlayers[1].send({embeds: [killEmbed()],components: [row, rowtwo] })

  const filter = (interaction) => interaction.isButton()
  const [userData] = await User.findOrBuild({
    where: { id: mafPlayers[0].id },
    defaults: { id: mafPlayers[0].id },
  })
  const [userData2] = await User.findOrBuild({
    where: { id: mafPlayers[1].id },
    defaults: { id: mafPlayers[1].id },
  })
  var shoot = userData.shoot

  
  const oneCollector = mafone.createMessageComponentCollector({filter, time: 60000, errors: ["time"]});
  oneCollector.on('collect', async interaction => {

    if (interaction.customId == "one") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }

      row.components[0].setStyle(`SECONDARY`)
      row.components[0].setEmoji(`1123151992706043924`)
      row.components[0]
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


    }
    if (interaction.customId == "two") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
  
      row.components[1].setStyle(`SECONDARY`)
      row.components[1].setEmoji(`1123151992706043924`)
      row.components[1]
      row.components[1].setDisabled(true)
      row.components[0].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  
    }
    if (interaction.customId == "three") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
  
      row.components[2].setStyle(`SECONDARY`)
      row.components[2].setEmoji(`1123151992706043924`)
      row.components[2]
      row.components[2].setDisabled(true)
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  
    }
    if (interaction.customId == "four") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
  
      row.components[3].setStyle(`SECONDARY`)
      row.components[3].setEmoji(`1123151992706043924`)
      row.components[3]
      row.components[3].setDisabled(true)
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  
    }
    if (interaction.customId == "five") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
  
      row.components[4].setStyle(`SECONDARY`)
      row.components[4].setEmoji(`1123151992706043924`)
      row.components[4]
      row.components[4].setDisabled(true)
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  
    }
     if (interaction.customId == "six") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

  
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setStyle(`SECONDARY`)
    rowtwo.components[0].setEmoji(`1123151992706043924`)
    rowtwo.components[0]
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "seven") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

  
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[1].setStyle(`SECONDARY`)
    rowtwo.components[1].setEmoji(`1123151992706043924`)
    rowtwo.components[1]
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "eight") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

  
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[2].setStyle(`SECONDARY`)
    rowtwo.components[2].setEmoji(`1123151992706043924`)
    rowtwo.components[2]
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "nine") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

  
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[3].setStyle(`SECONDARY`)
    rowtwo.components[3].setEmoji(`1123151992706043924`)
    rowtwo.components[3]
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "ten") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

  
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[4].setStyle(`SECONDARY`)
    rowtwo.components[4].setEmoji(`1123151992706043924`)
    rowtwo.components[4]
    rowtwo.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    oneCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  })
oneCollector.on(`end`, async collected => {
  if(collected.size < 1) {
    currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Никого не стрелял.`)
   mafPlayers[0].send(`Отстрела не было`)
   row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    oneCollector.stop();
  }
  else{
if([...collected.values()][0].customId == 'one'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 1.`)
resultone = 1
userData.shoot = Number(1)
await userData.save()
}
if([...collected.values()][0].customId == 'two'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 2.`)
  resultone = 2
  userData.shoot = Number(2)
await userData.save()
}
if([...collected.values()][0].customId == 'three'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 3.`)
  resultone = 3
  userData.shoot = Number(3)
await userData.save()
}
if([...collected.values()][0].customId == 'four'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 4.`)
  resultone = 4
  userData.shoot = Number(4)
await userData.save()
}
if([...collected.values()][0].customId == 'five'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 5.`)
  resultone = 5
  userData.shoot = Number(5)
await userData.save()
}
if([...collected.values()][0].customId == 'six'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 6.`)
  resultone = 6
  userData.shoot = Number(6)
await userData.save()
}
if([...collected.values()][0].customId == 'seven'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 7.`)
  resultone = 7
  userData.shoot = Number(7)
await userData.save()
}
if([...collected.values()][0].customId == 'eight'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 8.`)
  resultone = 8
  userData.shoot = Number(8)
await userData.save()
}
if([...collected.values()][0].customId == 'nine'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 9.`)
  resultone = 9
  userData.shoot = Number(9)
await userData.save()
}
if([...collected.values()][0].customId == 'ten'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 10.`)
  resultone = 10
  userData.shoot = Number(10)
await userData.save()
}
  }
} )
const twoCollector = maftwo.createMessageComponentCollector({filter, time: 60000, errors: ["time"]});
twoCollector.on('collect', async interaction => {

  if (interaction.customId == "one") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

    row.components[0].setStyle(`SECONDARY`)
    row.components[0].setEmoji(`1123151992706043924`)
    row.components[0]
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    twoCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "two") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

    row.components[1].setStyle(`SECONDARY`)
    row.components[1].setEmoji(`1123151992706043924`)
    row.components[1]
    row.components[1].setDisabled(true)
    row.components[0].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    twoCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "three") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

    row.components[2].setStyle(`SECONDARY`)
    row.components[2].setEmoji(`1123151992706043924`)
    row.components[2]
    row.components[2].setDisabled(true)
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    twoCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "four") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

    row.components[3].setStyle(`SECONDARY`)
    row.components[3].setEmoji(`1123151992706043924`)
    row.components[3]
    row.components[3].setDisabled(true)
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    twoCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "five") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

    row.components[4].setStyle(`SECONDARY`)
    row.components[4].setEmoji(`1123151992706043924`)
    row.components[4]
    row.components[4].setDisabled(true)
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    twoCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
   if (interaction.customId == "six") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }


  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[0].setStyle(`SECONDARY`)
  rowtwo.components[0].setEmoji(`1123151992706043924`)
  rowtwo.components[0]
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  twoCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


}
if (interaction.customId == "seven") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }


  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[1].setStyle(`SECONDARY`)
  rowtwo.components[1].setEmoji(`1123151992706043924`)
  rowtwo.components[1]
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  twoCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


}
if (interaction.customId == "eight") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }


  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[2].setStyle(`SECONDARY`)
  rowtwo.components[2].setEmoji(`1123151992706043924`)
  rowtwo.components[2]
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  twoCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


}
if (interaction.customId == "nine") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }


  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[3].setStyle(`SECONDARY`)
  rowtwo.components[3].setEmoji(`1123151992706043924`)
  rowtwo.components[3]
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  twoCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


}
if (interaction.customId == "ten") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }


  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[4].setStyle(`SECONDARY`)
  rowtwo.components[4].setEmoji(`1123151992706043924`)
  rowtwo.components[4]
  rowtwo.components[4].setDisabled(true)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  twoCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


}
})
twoCollector.on(`end`, async collected => {
if(collected.size < 1) {
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[1].id)} Никого не стрелял.`)
 mafPlayers[1].send(`Отстрела не было`)
 row.components[0].setDisabled(true)
 row.components[1].setDisabled(true)
 row.components[2].setDisabled(true)
 row.components[3].setDisabled(true)
 row.components[4].setDisabled(true)
 rowtwo.components[4].setDisabled(true)
 rowtwo.components[0].setDisabled(true)
 rowtwo.components[1].setDisabled(true)
 rowtwo.components[2].setDisabled(true)
 rowtwo.components[3].setDisabled(true)
 twoCollector.stop();
}
else{
if([...collected.values()][0].customId == 'one'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[1].id)} Стрелял в игрока номер 1.`)
resulttwo = 1
userData2.shoot = Number(1)
await userData2.save()
}
if([...collected.values()][0].customId == 'two'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[1].id)} Стрелял в игрока номер 2.`)
resulttwo = 2
userData2.shoot = Number(2)
await userData2.save()
}
if([...collected.values()][0].customId == 'three'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[1].id)} Стрелял в игрока номер 3.`)
resulttwo = 3
userData2.shoot = Number(3)
await userData2.save()
}
if([...collected.values()][0].customId == 'four'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[1].id)} Стрелял в игрока номер 4.`)
resulttwo = 4
userData2.shoot = Number(4)
await userData2.save()
}
if([...collected.values()][0].customId == 'five'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[1].id)} Стрелял в игрока номер 5.`)
resulttwo = 5
userData2.shoot = Number(5)
await userData2.save()
}
if([...collected.values()][0].customId == 'six'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[1].id)} Стрелял в игрока номер 6.`)
resulttwo = 6
userData2.shoot = Number(6)
await userData2.save()
}
if([...collected.values()][0].customId == 'seven'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[1].id)} Стрелял в игрока номер 7.`)
resulttwo = 7
userData2.shoot = Number(7)
await userData2.save()
}
if([...collected.values()][0].customId == 'eight'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[1].id)} Стрелял в игрока номер 8.`)
resulttwo = 8
userData2.shoot = Number(8)
await userData2.save()
}
if([...collected.values()][0].customId == 'nine'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[1].id)} Стрелял в игрока номер 9.`)
resulttwo = 9
userData2.shoot = Number(9)
await userData2.save()
}
if([...collected.values()][0].customId == 'ten'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[1].id)} Стрелял в игрока номер 10.`)
resulttwo = 10
userData2.shoot = Number(10)
await userData2.save()
}
}
/*if (resultone === resulttwo){

  currentGame.host.send(`Они сострелялись.`)
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }

      if(resultone == 1){
        console.log(getKey(currentGame.playerNumbers, 1))
        if(!currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 1))) return
        userData.shoot = resultone
        await userData.save()
    
        }
        else if(resultone == 2){
          console.log(getKey(currentGame.playerNumbers, 2))
          userData.shoot = resultone
          await userData.save()
    
        }
    
        else if(resultone == 3){
          console.log(getKey(currentGame.playerNumbers, 3))
          userData.shoot = resultone
          await userData.save()
    
        }
        else if(resultone == 4){
          console.log(getKey(currentGame.playerNumbers, 4))
          userData.shoot = resultone
          await userData.save()
    
        }
        else if(resultone == 5){
          console.log(getKey(currentGame.playerNumbers, 5))
          userData.shoot = resultone
          await userData.save()
    
        }
        else if(resultone == 6){
          console.log(getKey(currentGame.playerNumbers, 6))
          userData.shoot = resultone
          await userData.save()
    
        }
        else if(resultone == 7){
          console.log(getKey(currentGame.playerNumbers, 7))
          userData.shoot = resultone
          await userData.save()
    
        }
        else if(resultone == 8){
          console.log(getKey(currentGame.playerNumbers, 8))
          userData.shoot = resultone
          await userData.save()
    
        }
        else if(resultone == 9){
          console.log(getKey(currentGame.playerNumbers, 9))
          userData.shoot = resultone
          await userData.save()
    
        }
        else if(resultone == 10){
          console.log(getKey(currentGame.playerNumbers, 10))
          userData.shoot = resultone
          await userData.save()
    
        }

}
else {
  currentGame.host.send(`Они промахнулись.`)

}*/
} )


}
    }
  
if(mafPlayers.length == 3){

  const killEmbed = () => new MessageEmbed()
  .setTitle(`Отстрел`)
  .setDescription(`У Вас есть 20 секунд на отстрел. Выберите цифру для отстрела от 1 до 10 `)
.addField(`<:666:1123151992706043924>`,`Отстрел принят`)
  var resultone = 0;
  var resulttwo = 0;
  var resultthree = 0;

  const { MessageActionRow, MessageSelectMenu} = require("discord.js");
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  const row = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setCustomId(`one`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 1)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 1)) ? `1` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 1)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 1)) ? false : `🪦`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`two`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 2)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 2)) ? `2` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 2)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 2)) ? false : `🪦`)
  )
  .addComponents(
    new MessageButton()
    .setCustomId(`three`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 3)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 3)) ? `3` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 3)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 3)) ? false : `🪦`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`four`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 4)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 4)) ? `4` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 4)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 4)) ? false : `🪦`)


  )
  .addComponents(
    new MessageButton()
    .setCustomId(`five`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 5)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 5)) ? `5` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 5)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 5)) ? false : `🪦`)


  )
  const rowtwo = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setCustomId(`six`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 6)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 6)) ? `6` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 6)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 6)) ? false : `🪦`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`seven`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 7)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 7)) ? `7` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 7)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 7)) ? false : `🪦`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`eight`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 8)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 8)) ? `8` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 8)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 8)) ? false : `🪦`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`nine`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 9)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 9)) ? `9` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 9)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 9)) ? false : `🪦`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`ten`)
    .setStyle(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 10)) ? `PRIMARY` : `SECONDARY`)
    .setLabel(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 10)) ? `10` : `\n`)
    .setDisabled(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 10)) ? false : true)
    .setEmoji(currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 10)) ? false : `🪦`)

  )







  for await (const i of asyncGenerator(1)) {


  const mafone = await mafPlayers[0].send({embeds: [killEmbed()],components: [row, rowtwo] })
  const maftwo = await mafPlayers[1].send({embeds: [killEmbed()],components: [row, rowtwo] })
  const mafthree = await mafPlayers[2].send({embeds: [killEmbed()], components: [row, rowtwo] })

  const filter = (interaction) => interaction.isButton()
  const [userData] = await User.findOrBuild({
    where: { id: mafPlayers[0].id },
    defaults: { id: mafPlayers[0].id },
  })
  const [userData2] = await User.findOrBuild({
    where: { id: mafPlayers[1].id },
    defaults: { id: mafPlayers[1].id },
  })
  const [userData3] = await User.findOrBuild({
    where: { id: mafPlayers[2].id },
    defaults: { id: mafPlayers[2].id },
  })
  var shoot = userData.shoot

  
  const oneCollector = mafone.createMessageComponentCollector({filter, time: 60000, errors: ["time"]});
  oneCollector.on('collect', async interaction => {

    if (interaction.customId == "one") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }

      row.components[0].setStyle(`SECONDARY`)
      row.components[0].setEmoji(`1123151992706043924`)
      row.components[0]
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


    }
    if (interaction.customId == "two") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
  
      row.components[1].setStyle(`SECONDARY`)
      row.components[1].setEmoji(`1123151992706043924`)
      row.components[1]
      row.components[1].setDisabled(true)
      row.components[0].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  
    }
    if (interaction.customId == "three") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
  
      row.components[2].setStyle(`SECONDARY`)
      row.components[2].setEmoji(`1123151992706043924`)
      row.components[2]
      row.components[2].setDisabled(true)
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  
    }
    if (interaction.customId == "four") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
  
      row.components[3].setStyle(`SECONDARY`)
      row.components[3].setEmoji(`1123151992706043924`)
      row.components[3]
      row.components[3].setDisabled(true)
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  
    }
    if (interaction.customId == "five") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
  
      row.components[4].setStyle(`SECONDARY`)
      row.components[4].setEmoji(`1123151992706043924`)
      row.components[4]
      row.components[4].setDisabled(true)
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  
    }
     if (interaction.customId == "six") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

  
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setStyle(`SECONDARY`)
    rowtwo.components[0].setEmoji(`1123151992706043924`)
    rowtwo.components[0]
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "seven") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

  
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[1].setStyle(`SECONDARY`)
    rowtwo.components[1].setEmoji(`1123151992706043924`)
    rowtwo.components[1]
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "eight") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

  
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[2].setStyle(`SECONDARY`)
    rowtwo.components[2].setEmoji(`1123151992706043924`)
    rowtwo.components[2]
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "nine") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

  
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[3].setStyle(`SECONDARY`)
    rowtwo.components[3].setEmoji(`1123151992706043924`)
    rowtwo.components[3]
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "ten") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

  
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[4].setStyle(`SECONDARY`)
    rowtwo.components[4].setEmoji(`1123151992706043924`)
    rowtwo.components[4]
    rowtwo.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    oneCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  })
oneCollector.on(`end`, async collected => {
  if(collected.size < 1) {
    currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Никого не стрелял.`)
   mafPlayers[0].send(`Отстрела не было`)
   row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    oneCollector.stop();
  }
  else{
console.log(collected)
if([...collected.values()][0].customId == 'one'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 1.`)
resultone = 1
userData.shoot = Number(1)
await userData.save()
}
if([...collected.values()][0].customId == 'two'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 2.`)
  resultone = 2
  userData.shoot = Number(2)
await userData.save()
}
if([...collected.values()][0].customId == 'three'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 3.`)
  resultone = 3
  userData.shoot = Number(3)
await userData.save()
}
if([...collected.values()][0].customId == 'four'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 4.`)
  resultone = 4
  userData.shoot = Number(4)
await userData.save()
}
if([...collected.values()][0].customId == 'five'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 5.`)
  resultone = 5
  userData.shoot = Number(5)
await userData.save()
}
if([...collected.values()][0].customId == 'six'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 6.`)
  resultone = 6
  userData.shoot = Number(6)
await userData.save()
}
if([...collected.values()][0].customId == 'seven'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 7.`)
  resultone = 7
  userData.shoot = Number(7)
await userData.save()
}
if([...collected.values()][0].customId == 'eight'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 8.`)
  resultone = 8
  userData.shoot = Number(8)
await userData.save()
}
if([...collected.values()][0].customId == 'nine'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 9.`)
  resultone = 9
  userData.shoot = Number(9)
await userData.save()
}
if([...collected.values()][0].customId == 'ten'){
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[0].id)} Стрелял в игрока номер 10.`)
  resultone = 10
  userData.shoot = Number(10)
await userData.save()
}
  }
} )
const twoCollector = maftwo.createMessageComponentCollector({filter, time: 60000, errors: ["time"]});
twoCollector.on('collect', async interaction => {

  if (interaction.customId == "one") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

    row.components[0].setStyle(`SECONDARY`)
    row.components[0].setEmoji(`1123151992706043924`)
    row.components[0]
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    twoCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "two") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

    row.components[1].setStyle(`SECONDARY`)
    row.components[1].setEmoji(`1123151992706043924`)
    row.components[1]
    row.components[1].setDisabled(true)
    row.components[0].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    twoCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "three") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

    row.components[2].setStyle(`SECONDARY`)
    row.components[2].setEmoji(`1123151992706043924`)
    row.components[2]
    row.components[2].setDisabled(true)
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    twoCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "four") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

    row.components[3].setStyle(`SECONDARY`)
    row.components[3].setEmoji(`1123151992706043924`)
    row.components[3]
    row.components[3].setDisabled(true)
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    twoCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "five") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

    row.components[4].setStyle(`SECONDARY`)
    row.components[4].setEmoji(`1123151992706043924`)
    row.components[4]
    row.components[4].setDisabled(true)
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    twoCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
   if (interaction.customId == "six") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }


  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[0].setStyle(`SECONDARY`)
  rowtwo.components[0].setEmoji(`1123151992706043924`)
  rowtwo.components[0]
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  twoCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


}
if (interaction.customId == "seven") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }


  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[1].setStyle(`SECONDARY`)
  rowtwo.components[1].setEmoji(`1123151992706043924`)
  rowtwo.components[1]
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  twoCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


}
if (interaction.customId == "eight") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }


  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[2].setStyle(`SECONDARY`)
  rowtwo.components[2].setEmoji(`1123151992706043924`)
  rowtwo.components[2]
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  twoCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


}
if (interaction.customId == "nine") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }


  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[3].setStyle(`SECONDARY`)
  rowtwo.components[3].setEmoji(`1123151992706043924`)
  rowtwo.components[3]
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  twoCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


}
if (interaction.customId == "ten") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }


  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[4].setStyle(`SECONDARY`)
  rowtwo.components[4].setEmoji(`1123151992706043924`)
  rowtwo.components[4]
  rowtwo.components[4].setDisabled(true)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  twoCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


}
})
twoCollector.on(`end`, async collected => {
if(collected.size < 1) {
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[1].id)} Никого не стрелял.`)
 mafPlayers[1].send(`Отстрела не было`)
 row.components[0].setDisabled(true)
 row.components[1].setDisabled(true)
 row.components[2].setDisabled(true)
 row.components[3].setDisabled(true)
 row.components[4].setDisabled(true)
 rowtwo.components[4].setDisabled(true)
 rowtwo.components[0].setDisabled(true)
 rowtwo.components[1].setDisabled(true)
 rowtwo.components[2].setDisabled(true)
 rowtwo.components[3].setDisabled(true)
 twoCollector.stop();
}
else{
if([...collected.values()][0].customId == 'one'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[1].id)} Стрелял в игрока номер 1.`)
resulttwo = 1
userData2.shoot = Number(1)
await userData2.save()

}
if([...collected.values()][0].customId == 'two'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[1].id)} Стрелял в игрока номер 2.`)
resulttwo = 2
userData2.shoot = Number(2)
await userData2.save()
}
if([...collected.values()][0].customId == 'three'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[1].id)} Стрелял в игрока номер 3.`)
resulttwo = 3
userData2.shoot = Number(3)
await userData2.save()
}
if([...collected.values()][0].customId == 'four'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[1].id)} Стрелял в игрока номер 4.`)
resulttwo = 4
userData2.shoot = Number(4)
await userData2.save()
}
if([...collected.values()][0].customId == 'five'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[1].id)} Стрелял в игрока номер 5.`)
resulttwo = 5
userData2.shoot = Number(5)
await userData2.save()
}
if([...collected.values()][0].customId == 'six'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[1].id)} Стрелял в игрока номер 6.`)
resulttwo = 6
userData2.shoot = Number(6)
await userData2.save()
}
if([...collected.values()][0].customId == 'seven'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[1].id)} Стрелял в игрока номер 7.`)
resulttwo = 7
userData2.shoot = Number(7)
await userData2.save()
}
if([...collected.values()][0].customId == 'eight'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[1].id)} Стрелял в игрока номер 8.`)
resulttwo = 8
userData2.shoot = Number(8)
await userData2.save()
}
if([...collected.values()][0].customId == 'nine'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[1].id)} Стрелял в игрока номер 9.`)
resulttwo = 9
userData2.shoot = Number(9)
await userData2.save()
}
if([...collected.values()][0].customId == 'ten'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[1].id)} Стрелял в игрока номер 10.`)
resulttwo = 10
userData2.shoot = Number(10)
await userData2.save()
}
}
} )
const threeCollector = mafthree.createMessageComponentCollector({filter, time: 60000, errors: ["time"]});

threeCollector.on('collect', async interaction => {

  if (interaction.customId == "one") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

    row.components[0].setStyle(`SECONDARY`)
    row.components[0].setEmoji(`1123151992706043924`)
    row.components[0]
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    threeCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "two") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

    row.components[1].setStyle(`SECONDARY`)
    row.components[1].setEmoji(`1123151992706043924`)
    row.components[1]
    row.components[1].setDisabled(true)
    row.components[0].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    threeCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "three") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

    row.components[2].setStyle(`SECONDARY`)
    row.components[2].setEmoji(`1123151992706043924`)
    row.components[2]
    row.components[2].setDisabled(true)
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    threeCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "four") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

    row.components[3].setStyle(`SECONDARY`)
    row.components[3].setEmoji(`1123151992706043924`)
    row.components[3]
    row.components[3].setDisabled(true)
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    threeCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
  if (interaction.customId == "five") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }

    row.components[4].setStyle(`SECONDARY`)
    row.components[4].setEmoji(`1123151992706043924`)
    row.components[4]
    row.components[4].setDisabled(true)
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    threeCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


  }
   if (interaction.customId == "six") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }


  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[0].setStyle(`SECONDARY`)
  rowtwo.components[0].setEmoji(`1123151992706043924`)
  rowtwo.components[0]
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  threeCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


}
if (interaction.customId == "seven") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }


  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[1].setStyle(`SECONDARY`)
  rowtwo.components[1].setEmoji(`1123151992706043924`)
  rowtwo.components[1]
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  threeCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


}
if (interaction.customId == "eight") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }


  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[2].setStyle(`SECONDARY`)
  rowtwo.components[2].setEmoji(`1123151992706043924`)
  rowtwo.components[2]
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  threeCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


}
if (interaction.customId == "nine") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }


  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[3].setStyle(`SECONDARY`)
  rowtwo.components[3].setEmoji(`1123151992706043924`)
  rowtwo.components[3]
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  threeCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


}
if (interaction.customId == "ten") {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }


  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[4].setStyle(`SECONDARY`)
  rowtwo.components[4].setEmoji(`1123151992706043924`)
  rowtwo.components[4]
  rowtwo.components[4].setDisabled(true)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  threeCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})


}
})
threeCollector.on(`end`, async collected => {
if(collected.size < 1) {
  currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[2].id)} Никого не стрелял.`)
 mafPlayers[2].send(`Отстрела не было`)
 row.components[0].setDisabled(true)
 row.components[1].setDisabled(true)
 row.components[2].setDisabled(true)
 row.components[3].setDisabled(true)
 row.components[4].setDisabled(true)
 rowtwo.components[4].setDisabled(true)
 rowtwo.components[0].setDisabled(true)
 rowtwo.components[1].setDisabled(true)
 rowtwo.components[2].setDisabled(true)
 rowtwo.components[3].setDisabled(true)
 oneCollector.stop();
}
else{
if([...collected.values()][0].customId == 'one'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[2].id)} Стрелял в игрока номер 1.`)
resultthree = 1
userData3.shoot = Number(1)
await userData3.save()
}
if([...collected.values()][0].customId == 'two'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[2].id)} Стрелял в игрока номер 2.`)
resultthree = 2
userData3.shoot = Number(2)
await userData3.save()
}
if([...collected.values()][0].customId == 'three'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[2].id)} Стрелял в игрока номер 3.`)
resultthree = 3
userData3.shoot = Number(3)
await userData3.save()
}
if([...collected.values()][0].customId == 'four'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[2].id)} Стрелял в игрока номер 4.`)
resultthree = 4
userData3.shoot = Number(4)
await userData3.save()
}
if([...collected.values()][0].customId == 'five'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[2].id)} Стрелял в игрока номер 5.`)
resultthree = 5
userData3.shoot = Number(5)
await userData3.save()
}
if([...collected.values()][0].customId == 'six'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[2].id)} Стрелял в игрока номер 6.`)
resultthree = 6
userData3.shoot = Number(6)
await userData3.save()
}
if([...collected.values()][0].customId == 'seven'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[2].id)} Стрелял в игрока номер 7.`)
resultthree = 7
userData3.shoot = Number(7)
await userData3.save()
}
if([...collected.values()][0].customId == 'eight'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[2].id)} Стрелял в игрока номер 8.`)
resultthree = 8
userData3.shoot = Number(8)
await userData3.save()
}
if([...collected.values()][0].customId == 'nine'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[2].id)} Стрелял в игрока номер 9.`)
resultthree = 9
userData3.shoot = Number(9)
await userData3.save()
}
if([...collected.values()][0].customId == 'ten'){
currentGame.host.send(`Мафия на ${currentGame.playerNumbers.get(mafPlayers[2].id)} Стрелял в игрока номер 10.`)
resultthree = 10
userData3.shoot = Number(10)
await userData3.save()
}
}/*
if (resultone === resulttwo && resultone === resultthree){

  currentGame.host.send(`Они сострелялись.`)
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }

      if(resultone == 1){
        console.log(getKey(currentGame.playerNumbers, 1))
        if(!currentGame.alivePlayers.has(getKey(currentGame.playerNumbers, 1))) return
        userData.shoot = resultone
        await userData.save()
    
        }
        else if(resultone == 2){
          console.log(getKey(currentGame.playerNumbers, 2))
          userData.shoot = resultone
          await userData.save()
    
        }
    
        else if(resultone == 3){
          console.log(getKey(currentGame.playerNumbers, 3))
          userData.shoot = resultone
          await userData.save()
    
        }
        else if(resultone == 4){
          console.log(getKey(currentGame.playerNumbers, 4))
          userData.shoot = resultone
          await userData.save()
    
        }
        else if(resultone == 5){
          console.log(getKey(currentGame.playerNumbers, 5))
          userData.shoot = resultone
          await userData.save()
    
        }
        else if(resultone == 6){
          console.log(getKey(currentGame.playerNumbers, 6))
          userData.shoot = resultone
          await userData.save()
    
        }
        else if(resultone == 7){
          console.log(getKey(currentGame.playerNumbers, 7))
          userData.shoot = resultone
          await userData.save()
    
        }
        else if(resultone == 8){
          console.log(getKey(currentGame.playerNumbers, 8))
          userData.shoot = resultone
          await userData.save()
    
        }
        else if(resultone == 9){
          console.log(getKey(currentGame.playerNumbers, 9))
          userData.shoot = resultone
          await userData.save()
    
        }
        else if(resultone == 10){
          console.log(getKey(currentGame.playerNumbers, 10))
          userData.shoot = resultone
          await userData.save()
    
        }

}
else {
  currentGame.host.send(`Они промахнулись.`)

}*/
} )

}
  }
  
}
const nightdoncheck = async () => {
  const players = [...currentGame.playerNumbers.entries()]
  .sort((a, b) => a[1] - b[1])
  .map((v) => currentGame.sortedMembers.get(v[0]));
 
  const teamFilter = (name) => (player) => 
  gameRoles[currentGame.playerRoles.get(player.id)].name == name;
  const don = players.filter(teamFilter("Дон мафии"));

  const { MessageActionRow, MessageSelectMenu} = require("discord.js");


"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
async function* asyncGenerator(num) {
    let i = 0;
    while (i < num) {
        yield i++;
    }
}


const row = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setCustomId(`one`)
    .setStyle(`PRIMARY`)
    .setLabel(`1`)
  )
  .addComponents(
    new MessageButton()
    .setCustomId(`two`)
    .setStyle(`PRIMARY`)
    .setLabel(`2`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`three`)
    .setStyle(`PRIMARY`)
    .setLabel(`3`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`four`)
    .setStyle(`PRIMARY`)
    .setLabel(`4`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`five`)
    .setStyle(`PRIMARY`)
    .setLabel(`5`)

  )
  const rowtwo = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setCustomId(`six`)
    .setStyle(`PRIMARY`)
    .setLabel(`6`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`seven`)
    .setStyle(`PRIMARY`)
    .setLabel(`7`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`eight`)
    .setStyle(`PRIMARY`)
    .setLabel(`8`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`nine`)
    .setStyle(`PRIMARY`)
    .setLabel(`9`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`ten`)
    .setStyle(`PRIMARY`)
    .setLabel(`10`)

  )



  const doncheck = () => new MessageEmbed()
  .setTitle(`Донская проверка`)
  .setDescription(`У Вас есть 20 секунд на проверку. Нажмите на цифру для чека от 1 до 10`)
  .addField(`<:333:994888188546007050>`,`Шериф`,true)
  .addField(`<:111:996094869812559883>`,`Не шериф`,true)

  var resultone = 0;

  if(!currentGame.alivePlayers.has(don[0].id)) return
  for await (const i of asyncGenerator(1)) {


  const donone = await don[0].send({embeds: [doncheck()], components: [row, rowtwo]})
  const filter = (interaction) => interaction.isButton()

  const hasHostPermissions = (user) =>
  user.id == don[0].id || owners.includes(user.id);




  const oneCollector = donone.createMessageComponentCollector({filter, time: 20000, errors: ["time"]})
  oneCollector.on('collect', async interaction => {

    if (interaction.customId == "one") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
      const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 1))].name
if(rolll == `Шериф` ){
      row.components[0].setStyle(`DANGER`)
      row.components[0].setEmoji(`994888188546007050`)
      row.components[0]
      row.components[0].setDisabled(false)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
}
else{
  row.components[0].setStyle(`DANGER`)
  row.components[0].setDisabled(false)
  row.components[0]
  row.components[0].setEmoji(`996094869812559883`)

  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  oneCollector.stop();
 interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

}
    }
    if (interaction.customId == "two") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
      const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 2))].name
  if(rolll == `Шериф` ){
      row.components[1].setStyle(`DANGER`)
      row.components[1].setEmoji(`994888188546007050`)
      row.components[1]
  
      row.components[1].setDisabled(false)
      row.components[0].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  }
  else{
  row.components[1].setStyle(`DANGER`)
  row.components[1].setDisabled(false)
  row.components[1]
  row.components[1].setEmoji(`996094869812559883`)

  row.components[0].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  }

    }
    if (interaction.customId == "three") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
      const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 3))].name
  if(rolll == `Шериф` ){
      row.components[2].setStyle(`DANGER`)
      row.components[2].setEmoji(`994888188546007050`)
      row.components[2].setDisabled(false)
      row.components[2]
  
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  }
  else{
    row.components[2]
    row.components[2].setEmoji(`996094869812559883`)

  row.components[2].setStyle(`DANGER`)
  row.components[2].setDisabled(false)
  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  }
    }
    if (interaction.customId == "four") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
      const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 4))].name
  if(rolll == `Шериф` ){
      row.components[3].setStyle(`DANGER`)
      row.components[3].setEmoji(`994888188546007050`)
      row.components[3]
  
      row.components[3].setDisabled(false)
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  }
  else{
  row.components[3].setStyle(`DANGER`)
  row.components[3]
  row.components[3].setEmoji(`996094869812559883`)

  row.components[3].setDisabled(false)
  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  }
    }
    if (interaction.customId == "five") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
      const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 5))].name
  if(rolll == `Шериф` ){
      row.components[4].setStyle(`DANGER`)
      row.components[4]
  
      row.components[4].setEmoji(`994888188546007050`)
      row.components[4].setDisabled(false)
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  }
  else{
  row.components[4].setStyle(`DANGER`)
  row.components[4].setDisabled(false)
  row.components[4]
  row.components[4].setEmoji(`996094869812559883`)

  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  }
    }
    if (interaction.customId == "six") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
      const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 6))].name
  if(rolll == `Шериф` ){
  
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0]
  
      rowtwo.components[0].setStyle(`DANGER`)
      rowtwo.components[0].setEmoji(`994888188546007050`)
      rowtwo.components[0].setDisabled(false)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  }
  else{
  
  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[0]
  rowtwo.components[0].setEmoji(`996094869812559883`)
  rowtwo.components[0].setStyle(`DANGER`)
  rowtwo.components[0].setDisabled(false)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  }
    }
    if (interaction.customId == "seven") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
      const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 7))].name
  if(rolll == `Шериф` ){
  
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[1]
  
      rowtwo.components[1].setStyle(`DANGER`)
      rowtwo.components[1].setEmoji(`994888188546007050`)
      rowtwo.components[1].setDisabled(false)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  }
  else{
  
  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[1]
  rowtwo.components[1].setEmoji(`996094869812559883`)

  rowtwo.components[1].setStyle(`DANGER`)
  rowtwo.components[1].setDisabled(false)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  }
    }
    if (interaction.customId == "nine") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
      const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 9))].name
  if(rolll == `Шериф` ){
  
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[3]
  
      rowtwo.components[3].setStyle(`DANGER`)
      rowtwo.components[3].setEmoji(`994888188546007050`)
      rowtwo.components[3].setDisabled(false)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  }
  else{
    rowtwo.components[3]
  
  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[3].setEmoji(`996094869812559883`)

  rowtwo.components[3].setStyle(`DANGER`)
  rowtwo.components[3].setDisabled(false)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  }
    }
    if (interaction.customId == "eight") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
      const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 8))].name
  if(rolll == `Шериф` ){
  
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[2]
  
      rowtwo.components[2].setStyle(`DANGER`)
      rowtwo.components[2].setEmoji(`994888188546007050`)
      rowtwo.components[2].setDisabled(false)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  }
  else{
  
  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[2]
  rowtwo.components[2].setEmoji(`996094869812559883`)

  rowtwo.components[2].setStyle(`DANGER`)
  rowtwo.components[2].setDisabled(false)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  oneCollector.stop();

  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  }
    }
    if (interaction.customId == "ten") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }
    const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 10))].name
if(rolll == `Шериф` ){

    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[4]

    rowtwo.components[4].setStyle(`DANGER`)
    rowtwo.components[4].setEmoji(`994888188546007050`)
    rowtwo.components[4].setDisabled(false)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
}
else{
  rowtwo.components[4]

row.components[0].setDisabled(true)
row.components[1].setDisabled(true)
row.components[2].setDisabled(true)
row.components[3].setDisabled(true)
row.components[4].setDisabled(true)
rowtwo.components[4].setEmoji(`996094869812559883`)

rowtwo.components[4].setStyle(`DANGER`)
rowtwo.components[4].setDisabled(false)
rowtwo.components[0].setDisabled(true)
rowtwo.components[1].setDisabled(true)
rowtwo.components[2].setDisabled(true)
rowtwo.components[3].setDisabled(true)
oneCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

}
  }
  })
oneCollector.on(`end`, collected => {
  if(collected.size < 1) {
    don[0].send(`Донской проверки не было`)
   currentGame.host.send(`Дон на ${currentGame.playerNumbers.get(don[0].id)} Никого не проверил.`)
    oneCollector.stop();
  }
  else{
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }
if([...collected.values()][0].customId == 'one'){
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  currentGame.donchecks.add(currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 1)).id);

 return currentGame.host.send(`Дон на ${currentGame.playerNumbers.get(don[0].id)} проверил игрока номер 1.`)

}
if([...collected.values()][0].customId == 'two'){
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  currentGame.donchecks.add(currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 2)).id);

  return currentGame.host.send(`Дон на ${currentGame.playerNumbers.get(don[0].id)} проверил игрока номер 2.`)
 
 }
 if([...collected.values()][0].customId == 'three'){
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  currentGame.donchecks.add(currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 3)).id);

  return currentGame.host.send(`Дон на ${currentGame.playerNumbers.get(don[0].id)} проверил игрока номер 3.`)
 
 }
 if([...collected.values()][0].customId == 'four'){
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  currentGame.donchecks.add(currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 4)).id);

  return currentGame.host.send(`Дон на ${currentGame.playerNumbers.get(don[0].id)} проверил игрока номер 4.`)
 
 }
 if([...collected.values()][0].customId == 'five'){
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  currentGame.donchecks.add(currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 5)).id);

  return currentGame.host.send(`Дон на ${currentGame.playerNumbers.get(don[0].id)} проверил игрока номер 5.`)
 
 }
 if([...collected.values()][0].customId == 'six'){
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  currentGame.donchecks.add(currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 6)).id);

  return currentGame.host.send(`Дон на ${currentGame.playerNumbers.get(don[0].id)} проверил игрока номер 6.`)
 
 }
 if([...collected.values()][0].customId == 'seven'){
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  currentGame.donchecks.add(currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 7)).id);

  return currentGame.host.send(`Дон на ${currentGame.playerNumbers.get(don[0].id)} проверил игрока номер 7.`)
 
 }
 if([...collected.values()][0].customId == 'eight'){
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  currentGame.donchecks.add(currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 8)).id);

  return currentGame.host.send(`Дон на ${currentGame.playerNumbers.get(don[0].id)} проверил игрока номер 8.`)
 
 }
 if([...collected.values()][0].customId == 'nine'){
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  currentGame.donchecks.add(currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 9)).id);

  return currentGame.host.send(`Дон на ${currentGame.playerNumbers.get(don[0].id)} проверил игрока номер 9.`)
 
 }
 if([...collected.values()][0].customId == 'ten'){
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
 currentGame.donchecks.add(currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 10)).id);

  return currentGame.host.send(`Дон на ${currentGame.playerNumbers.get(don[0].id)} проверил игрока номер 10.`)
 
 }

  }
} )















  }
}

const nightsheriffcheck = async () => {
  const players = [...currentGame.playerNumbers.entries()]
  .sort((a, b) => a[1] - b[1])
  .map((v) => currentGame.sortedMembers.get(v[0]));
 
  const teamFilter = (name) => (player) => 
  gameRoles[currentGame.playerRoles.get(player.id)].name == name;
  const sherrif = players.filter(teamFilter("Шериф"));

  const { MessageActionRow, MessageSelectMenu} = require("discord.js");


"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
async function* asyncGenerator(num) {
    let i = 0;
    while (i < num) {
        yield i++;
    }
}
const row = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setCustomId(`one`)
    .setStyle(`PRIMARY`)
    .setLabel(`1`)
  )
  .addComponents(
    new MessageButton()
    .setCustomId(`two`)
    .setStyle(`PRIMARY`)
    .setLabel(`2`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`three`)
    .setStyle(`PRIMARY`)
    .setLabel(`3`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`four`)
    .setStyle(`PRIMARY`)
    .setLabel(`4`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`five`)
    .setStyle(`PRIMARY`)
    .setLabel(`5`)

  )
  const rowtwo = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setCustomId(`six`)
    .setStyle(`PRIMARY`)
    .setLabel(`6`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`seven`)
    .setStyle(`PRIMARY`)
    .setLabel(`7`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`eight`)
    .setStyle(`PRIMARY`)
    .setLabel(`8`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`nine`)
    .setStyle(`PRIMARY`)
    .setLabel(`9`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`ten`)
    .setStyle(`PRIMARY`)
    .setLabel(`10`)

  )


  const sherrcheck = () => new MessageEmbed()
  .setTitle(`Шерифская проверка`)
  .setDescription(`У Вас есть 20 секунд на проверку. Нажмите на цифру для чека от 1 до 10`)
  .addField(`<:455:994888190332776459>`,`Мафия`,true)
  .addField(`<:111:996094869812559883>`,`Мирный`,true)

  var resultone = 0;

  if(!currentGame.alivePlayers.has(sherrif[0].id)) return
  for await (const i of asyncGenerator(1)) {


  const sherone = await sherrif[0].send({embeds: [sherrcheck()],components: [row, rowtwo]})
  const filter = (interaction) => interaction.isButton()
  const hasHostPermissions = (user) =>
  user.id == sherrif[0].id || owners.includes(user.id);
  const oneCollector = sherone.createMessageComponentCollector({filter, time: 20000, errors: ["time"]})
  
  oneCollector.on('collect', async interaction => {

    if (interaction.customId == "one") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
      const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 1))].team
if(rolll == `mir`){
  row.components[0]

      row.components[0].setStyle(`DANGER`)
      row.components[0].setEmoji(`996094869812559883`)
      row.components[0].setDisabled(false)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
}
else{
  row.components[0]

  row.components[0].setStyle(`SECONDARY`)
  row.components[0].setEmoji(`994888190332776459`)
  row.components[0].setDisabled(false)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  oneCollector.stop();
 interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

}
    }
    if (interaction.customId == "two") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
      const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 2))].team
  if(rolll == `mir`){
    row.components[1]
  
      row.components[1].setStyle(`DANGER`)
      row.components[1].setEmoji(`996094869812559883`)
      row.components[1].setDisabled(false)
      row.components[0].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  }
  else{
    row.components[1]
  
  row.components[1].setStyle(`SECONDARY`)
  row.components[1].setEmoji(`994888190332776459`)
  row.components[1].setDisabled(false)
  row.components[0].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  oneCollector.stop();

  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  }
    }
    if (interaction.customId == "three") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
      const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 3))].team
  if(rolll == `mir`){
    row.components[2]
  
      row.components[2].setStyle(`DANGER`)
      row.components[2].setEmoji(`996094869812559883`)
      row.components[2].setDisabled(false)
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  }
  else{
    row.components[2]
  
  row.components[2].setStyle(`SECONDARY`)
  row.components[2].setEmoji(`994888190332776459`)
  row.components[2].setDisabled(false)
  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  }
    }
    if (interaction.customId == "four") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
      const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 4))].team
  if(rolll == `mir`){
    row.components[3]
  
      row.components[3].setStyle(`DANGER`)
      row.components[3].setEmoji(`996094869812559883`)
      row.components[3].setDisabled(false)
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  }
  else{
    row.components[3]
  
  row.components[3].setStyle(`SECONDARY`)
  row.components[3].setEmoji(`994888190332776459`)
  row.components[3].setDisabled(false)
  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  }
    }
    if (interaction.customId == "five") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
      const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 5))].team
  if(rolll == `mir`){
    row.components[4]
  
      row.components[4].setStyle(`DANGER`)
      row.components[4].setEmoji(`996094869812559883`)
      row.components[4].setDisabled(false)
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  }
  else{
    row.components[4]
  
  row.components[4].setStyle(`SECONDARY`)
  row.components[4].setEmoji(`994888190332776459`)
  row.components[4].setDisabled(false)
  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  }
    }
    if (interaction.customId == "six") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
      const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 6))].team
  if(rolll == `mir`){
  
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[0]
  
      rowtwo.components[0].setStyle(`DANGER`)
      rowtwo.components[0].setEmoji(`996094869812559883`)
      rowtwo.components[0].setDisabled(false)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  }
  else{
  
  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[0]
  
  rowtwo.components[0].setStyle(`SECONDARY`)
  rowtwo.components[0].setEmoji(`994888190332776459`)
  rowtwo.components[0].setDisabled(false)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  }
    }
    if (interaction.customId == "seven") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
      const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 7))].team
  if(rolll == `mir`){
  
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[1]
  
      rowtwo.components[1].setStyle(`DANGER`)
      rowtwo.components[1].setEmoji(`996094869812559883`)
      rowtwo.components[1].setDisabled(false)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[2].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  }
  else{
  
  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  rowtwo.components[1]
  
  rowtwo.components[1].setStyle(`SECONDARY`)
  rowtwo.components[1].setEmoji(`994888190332776459`)
  rowtwo.components[1].setDisabled(false)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  }
    }
    if (interaction.customId == "eight") {
      function getKey(map, input) {
        for (let [key, value] of map.entries()) {
           if (value === input) {
             return key;
           }
        }
        
        return "Not found";
      }
      const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 8))].team
  if(rolll == `mir`){
  
      row.components[0].setDisabled(true)
      row.components[1].setDisabled(true)
      row.components[2].setDisabled(true)
      row.components[3].setDisabled(true)
      row.components[4].setDisabled(true)
      rowtwo.components[2]
  
      rowtwo.components[2].setStyle(`DANGER`)
      rowtwo.components[2].setEmoji(`996094869812559883`)
      rowtwo.components[2].setDisabled(false)
      rowtwo.components[0].setDisabled(true)
      rowtwo.components[1].setDisabled(true)
      rowtwo.components[3].setDisabled(true)
      rowtwo.components[4].setDisabled(true)
      oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  }
  else{
    rowtwo.components[2]
  
  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(true)
  
  rowtwo.components[2].setStyle(`SECONDARY`)
  rowtwo.components[2].setEmoji(`994888190332776459`)
  rowtwo.components[2].setDisabled(false)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  oneCollector.stop();
  interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  
  }
    }
    if (interaction.customId == "nine") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }
    const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 9))].team
if(rolll == `mir`){

    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[3]

    rowtwo.components[3].setStyle(`DANGER`)
    rowtwo.components[3].setEmoji(`996094869812559883`)
    rowtwo.components[3].setDisabled(false)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
}
else{

row.components[0].setDisabled(true)
row.components[1].setDisabled(true)
row.components[2].setDisabled(true)
row.components[3].setDisabled(true)
row.components[4].setDisabled(true)
rowtwo.components[3]

rowtwo.components[3].setStyle(`SECONDARY`)
rowtwo.components[3].setEmoji(`994888190332776459`)
rowtwo.components[3].setDisabled(false)
rowtwo.components[0].setDisabled(true)
rowtwo.components[1].setDisabled(true)
rowtwo.components[2].setDisabled(true)
rowtwo.components[4].setDisabled(true)
oneCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

}
  }
  if (interaction.customId == "ten") {
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }
    const rolll = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 10))].team
if(rolll == `mir`){

    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[4]

    rowtwo.components[4].setStyle(`DANGER`)
    rowtwo.components[4].setEmoji(`996094869812559883`)
    rowtwo.components[4].setDisabled(false)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    oneCollector.stop();
    interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
}
else{

row.components[0].setDisabled(true)
row.components[1].setDisabled(true)
row.components[2].setDisabled(true)
row.components[3].setDisabled(true)
row.components[4].setDisabled(true)
rowtwo.components[4]

rowtwo.components[4].setStyle(`SECONDARY`)
rowtwo.components[4].setEmoji(`994888190332776459`)
rowtwo.components[4].setDisabled(false)
rowtwo.components[0].setDisabled(true)
rowtwo.components[1].setDisabled(true)
rowtwo.components[2].setDisabled(true)
rowtwo.components[3].setDisabled(true)
oneCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})

}
  }
  })

oneCollector.on(`end`, collected => {
  if(collected.size < 1) {
    currentGame.host.send(`Шериф на ${currentGame.playerNumbers.get(sherrif[0].id)} Никого не проверил.`)
    sherrif[0].send(`Донской проверки не было`)

    oneCollector.stop();
  }
  else{

if([...collected.values()][0].customId == 'one'){
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  currentGame.host.send(`Шериф на ${currentGame.playerNumbers.get(sherrif[0].id)} проверил игрока номер 1.`)
  currentGame.copchecks.add(currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 1)).id);

}
if([...collected.values()][0].customId == 'two'){
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  currentGame.host.send(`Шериф на ${currentGame.playerNumbers.get(sherrif[0].id)} проверил игрока номер 2.`)
  currentGame.copchecks.add(currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 2)).id);

}
if([...collected.values()][0].customId == 'three'){
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  currentGame.host.send(`Шериф на ${currentGame.playerNumbers.get(sherrif[0].id)} проверил игрока номер 3.`)
  currentGame.copchecks.add(currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 3)).id);

}
if([...collected.values()][0].customId == 'four'){
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  currentGame.host.send(`Шериф на ${currentGame.playerNumbers.get(sherrif[0].id)} проверил игрока номер 4.`)
  currentGame.copchecks.add(currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 4)).id);

}
if([...collected.values()][0].customId == 'five'){
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  currentGame.host.send(`Шериф на ${currentGame.playerNumbers.get(sherrif[0].id)} проверил игрока номер 5.`)
  currentGame.copchecks.add(currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 5)).id);

}
if([...collected.values()][0].customId == 'six'){
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  currentGame.host.send(`Шериф на ${currentGame.playerNumbers.get(sherrif[0].id)} проверил игрока номер 6.`)
  currentGame.copchecks.add(currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 6)).id);

}
if([...collected.values()][0].customId == 'seven'){
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  currentGame.host.send(`Шериф на ${currentGame.playerNumbers.get(sherrif[0].id)} проверил игрока номер 7.`)
  currentGame.copchecks.add(currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 7)).id);

}
if([...collected.values()][0].customId == 'eight'){
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  currentGame.host.send(`Шериф на ${currentGame.playerNumbers.get(sherrif[0].id)} проверил игрока номер 8.`)
  currentGame.copchecks.add(currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 8)).id);

}
if([...collected.values()][0].customId == 'nine'){
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  currentGame.host.send(`Шериф на ${currentGame.playerNumbers.get(sherrif[0].id)} проверил игрока номер 9.`)
  currentGame.copchecks.add(currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 9)).id);

}
if([...collected.values()][0].customId == 'ten'){
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  currentGame.host.send(`Шериф на ${currentGame.playerNumbers.get(sherrif[0].id)} проверил игрока номер 10.`)
  currentGame.copchecks.add(currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 10)).id);

}
  }
} )

  }

}
const nightresults = async () => {
  function getKey(map, input) {
    for (let [key, value] of map.entries()) {
       if (value === input) {
         return key;
       }
    }
    
    return "Not found";
  }
  const players = [...currentGame.alivePlayers.entries()]
  .sort((a, b) => a[1] - b[1])
  .map((v) => currentGame.sortedMembers.get(v[0]));

  const teamFilter = (team) => (player) => 
  gameRoles[currentGame.playerRoles.get(player.id)].team == team;
  const mafPlayers = players.filter(teamFilter("maf"));
 
  
  
    if(mafPlayers.length == 1) {
      const [userData] = await User.findOrBuild({
        where: { id: mafPlayers[0].id },
        defaults: { id: mafPlayers[0].id },
      })
      var shoot = userData.shoot
    if(shoot == 1){
   
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 1)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        bestMove().catch((error) => {
  console.error(error);
});
        userData.shoot = 0
        await userData.save()
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()
      }
    }
    else if(shoot == 2){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 2)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()
      }
    }
    else if(shoot == 3){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 3)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()

      }
    }
    else if(shoot == 4){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 4)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
      }
      else{
        setDay()
       userData.shoot = 0
      
        await userData.save()

      }
    }
    else if(shoot == 5){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 5)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()
      }
    }
    else if(shoot == 6){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 6)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()
      }
    }
    else if(shoot == 7){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 7)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()
      }
    }
    else if(shoot == 8){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 8)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()

      }
    }
    else if(shoot == 9){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 9)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()
      }
    }
    else if(shoot == 10){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 10)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
      }
      else{
        setDay()
        userData.shoot = 0 
        await userData.save()
      }
    }

  




    else{
      currentGame.client.channels.cache.get(config.gameChannel).send({embeds: [
        new MessageEmbed()
        .setDescription(`В городе промах`)
      ]})
      setDay()
    }
    
    }
    if(mafPlayers.length == 2) {
      const [userData] = await User.findOrBuild({
        where: { id: mafPlayers[0].id },
        defaults: { id: mafPlayers[0].id },
      })
      const [userData2] = await User.findOrBuild({
        where: { id: mafPlayers[1].id },
        defaults: { id: mafPlayers[1].id },
      })
      var shoot = userData.shoot
      var shoot2 = userData2.shoot
      
      
      if (shoot == shoot2) {
    if(shoot == 1){
     
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 1)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        bestMove().catch((error) => {
  console.error(error);
});
        userData.shoot = 0
        await userData.save()
        const reomi = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 1))].name
        if(reomi == `Шериф`){
         
        }
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()
      }
    }
    else if(shoot == 2){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 2)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
       const reomi = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 2))].name
       if(reomi == `Шериф`){
        
       }
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()
      }
    }
    else if(shoot == 3){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 3)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
       const reomi = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 3))].name
       if(reomi == `Шериф`){
         
       }
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()

      }
    }
    else if(shoot == 4){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 4)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
       const reomi = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 4))].name
       if(reomi == `Шериф`){
        
       }
      }
      else{
        setDay()
       userData.shoot = 0
      
        await userData.save()

      }
    }
    else if(shoot == 5){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 5)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
       const reomi = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 5))].name
       if(reomi == `Шериф`){
         
       }
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()
      }
    }
    else if(shoot == 6){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 6)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
       const reomi = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 6))].name
       if(reomi == `Шериф`){
       
       }
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()
      }
    }
    else if(shoot == 7){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 7)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
       const reomi = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 7))].name
       if(reomi == `Шериф`){
        
       }
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()
      }
    }
    else if(shoot == 8){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 8)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
       const reomi = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 8))].name
       if(reomi == `Шериф`){
       
       }
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()

      }
    }
    else if(shoot == 9){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 9)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
       const reomi = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 9))].name
       if(reomi == `Шериф`){
       
       }
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()
      }
    }
    else if(shoot == 10){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 10)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
       const reomi = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 10))].name
       if(reomi == `Шериф`){
       
       }
      }
      else{
        setDay()
        userData.shoot = 0 
        await userData.save()
      }
    }

      }




    else{
      currentGame.client.channels.cache.get(config.gameChannel).send({embeds: [
        new MessageEmbed()
        .setDescription(`В городе промах`)
      ]})
    
      setDay()
    }
  
    }
    if(mafPlayers.length == 3) {
      const [userData] = await User.findOrBuild({
        where: { id: mafPlayers[0].id },
        defaults: { id: mafPlayers[0].id },
      })
      const [userData2] = await User.findOrBuild({
        where: { id: mafPlayers[1].id },
        defaults: { id: mafPlayers[1].id },
      })
      const [userData3] = await User.findOrBuild({
        where: { id: mafPlayers[2].id },
        defaults: { id: mafPlayers[2].id },
      })
      var shoot = userData.shoot
      var shoot2 = userData2.shoot
      var shoot3 = userData3.shoot
      console.log(shoot)
      console.log(shoot2)
      console.log(shoot3)
      console.log(userData.shoot)
      console.log(userData2.shoot)
      console.log(userData3.shoot)
      const teamFilter = (name) => (player) => 
      gameRoles[currentGame.playerRoles.get(player.id)].name == name;
      if (shoot == shoot2 && shoot == shoot3) {
    if(shoot == 1){
      console.log(getKey(currentGame.playerNumbers, 1))
      console.log(currentGame.alivePlayers)
      console.log(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers, 1)))
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 1)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        bestMove().catch((error) => {
  console.error(error);
});
        userData.shoot = 0
        await userData.save()
        const reomi = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 1))].name
        if(reomi == `Шериф`){
          
        }
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()
      }
    }
    else if(shoot == 2){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 2)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
       const reomi = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 2))].name
       if(reomi == `Шериф`){
       
       }
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()
      }
    }
    else if(shoot == 3){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 3)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
       const reomi = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 3))].name
       if(reomi == `Шериф`){
         
       }
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()

      }
    }
    else if(shoot == 4){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 4)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
       const reomi = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 4))].name
       if(reomi == `Шериф`){
        
       }
      }
      else{
        setDay()
       userData.shoot = 0
      
        await userData.save()

      }
    }
    else if(shoot == 5){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 5)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
       const reomi = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 5))].name
       if(reomi == `Шериф`){
         
       }
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()
      }
    }
    else if(shoot == 6){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 6)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
       const reomi = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 6))].name
       if(reomi == `Шериф`){
       
       }
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()
   
      }
    }
    else if(shoot == 7){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 7)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
       const reomi = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 7))].name
       if(reomi == `Шериф`){
        
       }
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()
      
      }
    }
    else if(shoot == 8){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 8)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
       const reomi = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 8))].name
       if(reomi == `Шериф`){
        
       }
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()
    

      }
    }
    else if(shoot == 9){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 9)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
       const reomi = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 9))].name
       if(reomi == `Шериф`){
       
       }
      }
      else{
        setDay()
        userData.shoot = 0
        await userData.save()
    
      }
    }
    else if(shoot == 10){
      await kill(currentGame.alivePlayers.get(getKey(currentGame.playerNumbers , 10)))
      userData.shoot = 0
      await userData.save()
      if(getFirstVictim() && currentGame.day == 1 && currentGame.hangedPlayers.size < 2){
        await bestMove().catch((error) => {
  console.error(error);
});
       userData.shoot = 0
       await userData.save()
       const reomi = gameRoles[currentGame.playerRoles.get(getKey(currentGame.playerNumbers, 10))].name
       if(reomi == `Шериф`){
      
       }
      }
      else{
        setDay()
        userData.shoot = 0 
        await userData.save()
      
      }
    }

      }




    else{
      currentGame.client.channels.cache.get(config.gameChannel).send({embeds: [
        new MessageEmbed()
        .setDescription(`В городе промах`)
      ]})
      if(shoot == shoot2 && shoot != shoot3){
      }
      else if(shoot == shoot3 && shoot != shoot2){

      }
      else if(shoot2 == shoot3 && shoot != shoot2){

      }
      else if(shoot != shoot3 && shoot != shoot2){
 

      }
      setDay()
    }
  
    }
}

const accord = async () => {
  if (!isInProgress()) {
    return;
  }
  currentGame.state = "dogovorka";




currentGame.client.channels.cache
    .get(config.gameChannel)
    .send({embeds:[ new MessageEmbed()
      .setTitle("**Жестикуляция запрещена**")
      .setDescription("**Договорка мафии. Жестикуляция и выкрики запрещены!**")] }
     
    );

  currentGame.alivePlayers.forEach(async (player) => {
  addBons(player, Number(0))
  if (player.roles.cache.has(config.gameRole)) {
      await player.roles.remove(config.gameRole);
      await player.voice.setChannel(config.chan).catch(() => {});
    }
  });
};
const unpause = () => {
  if (!isInProgress()) {
    return;
  }
  const guild = currentGame.client.guilds.cache.get(`843449740200509450`);

  currentGame.client.channels.cache.get(config.chan).guild.me.edit({mute:true}).catch((error) => console.log(error))

  currentGame.client.channels.cache
    .get(config.gameChannel)
    .send({embeds: [ new MessageEmbed().setTitle(`**Игра возобновлена**`)]});

  currentGame.alivePlayers.forEach(async (player) => {
    if (!player.roles.cache.has(config.gameRole)) {
      await player.roles.add(config.gameRole);
      await player.voice.setChannel(config.chan).catch(() => {});
    }
  });
};
const starting = () => {
  if (!isInProgress()) {
    return;
  }
  const guild = currentGame.client.guilds.cache.get(`843449740200509450`);

 currentGame.client.channels.cache.get(config.chan).guild.me.edit({mute:true}).catch((error) => console.log(error))
  currentGame.state = "day";

  currentGame.client.channels.cache
    .get(config.gameChannel)
    .send({embeds: [new MessageEmbed().setTitle(`**Игра началась**`)]});

  currentGame.alivePlayers.forEach(async (player) => {
    
    if (!player.roles.cache.has(config.gameRole)) {
      await player.roles.add(config.gameRole);
      await player.voice.setChannel(config.chan).catch(() => {});
    }
  });
};

const bestMove = async () => {
  if (!isInProgress()) {
    return;
  }
  if (!currentGame.firstVictim || currentGame.bestMoveIgnore) {
    return;
  }
  try{
  const players = [...currentGame.playerNumbers.entries()]
  .sort((a, b) => a[1] - b[1])
  .map((v) => currentGame.sortedMembers.get(v[0]));
  const { MessageActionRow, MessageSelectMenu} = require("discord.js");
 
                 
  const row = new MessageActionRow()

  .addComponents(
   new MessageSelectMenu()
     .setCustomId('bestmove')
     .setMinValues(1)
     .setMaxValues(3)
     .setPlaceholder('Выберите игроков для лучшего хода')
     .addOptions(
       
       
      {
         description: [...players.values()][0].user.username,
         label: `01`,
         value: [...players.values()][0].id,
       },
       
     
       
       {
        description: [...players.values()][1].user.username,
        label: `02`,

        value: [...players.values()][1].id,
      },
      {
        description: [...players.values()][2].user.username,
        label: `03`,

        value: [...players.values()][2].id,
      },
      {
        description: [...players.values()][3].user.username,
        label: `04`,

        value: [...players.values()][3].id,
      },
      {
        description: [...players.values()][4].user.username,
        label: `05`,

        value: [...players.values()][4].id,
      },
      {
        description: [...players.values()][5].user.username,
        label: `06`,

        value: [...players.values()][5].id,
      },
      {
        description: [...players.values()][6].user.username,
        label: `07`,

        value: [...players.values()][6].id,
      },
      {
        description: [...players.values()][7].user.username,
        label: `08`,

        value: [...players.values()][7].id,
      },
      {
        description: [...players.values()][8].user.username,
        label: `09`,

        value: [...players.values()][8].id,
      },
      {
        description: [...players.values()][9].user.username,
        label: `10`,

        value: [...players.values()][9].id,
      },
      
       ),
 );

  
  const firstVictimRoleInfo =
    gameRoles[currentGame.playerRoles.get(currentGame.firstVictim.id)];
var time = 22
const besemb = new MessageEmbed()
.setDescription(`**Лучший ход игрока ${currentGame.firstVictim}**\n\nНа лх примерно ${time} секунд`)
.setFooter(`Внимание, запрещено выкрикивать и писать в чате ДО стадии "ДЕНЬ", иначе карается удалением!`)
  const targ = await currentGame.client.channels.cache
    .get(config.gameChannel).send({ embeds: [besemb], components: [row]})
  
    const filter = (interaction) => interaction.isSelectMenu() && interaction.member.user.id == currentGame.firstVictim.id
    

    const collector = currentGame.client.channels.cache
    .get(config.gameChannel).createMessageComponentCollector({
      filter,
      max: "4",
      time: 22000
      });
      collector.on(`collect`, async (collected) => {
       
         const value = collected.values;
console.log(currentGame.playerNumbers.get(currentGame.firstVictim.id))
console.log(collected)
console.log(typeof value[0])
console.log(value[0])
if(collected.values.length == 1){
  const valplayers = players.filter( (player) => player.id == value[0])
 
      const move = new MessageEmbed()
      .setDescription(`**Лучший ход игрока ${currentGame.firstVictim}: \n ${[...valplayers.values()].join(`\n`)}**`)
/*      .setDescription(`${value.join(` `)}`)*/
      currentGame.client.channels.cache
    .get(config.gameChannel).send({ embeds: [move]})
    if (firstVictimRoleInfo.team == "maf") {
      currentGame.host.send({embeds: [ 
        new MessageEmbed()
          .setTitle("Лучший ход не засчитан потому что это мафия")
          .addField("Игрок", `${currentGame.firstVictim}`)
       ]} );
  
      return;
    }
   
    const matches = [...valplayers.values()]
    .map((player) => currentGame.playerRoles.get(player.id))
    .map((role) => gameRoles[role])
    .map((roleInfo) => roleInfo.team == "maf")
    .map(Number)
    .reduce((acc, e) => acc + e);

  const score = [0, 0, 0, 0, 0][matches];

  currentGame.bestMove = score;
  currentGame.bestMoveHits = matches;
  currentGame.bestMoveTargets = [...valplayers.values()].map((player) => player.id);
console.log(`Лх - ${currentGame.bestMove}, Лх хиты - ${currentGame.bestMoveHits}, Лх таргеты - ${currentGame.bestMoveTargets}`)

  currentGame.host.send(
    {embeds: [ 
    new MessageEmbed()
      .setDescription(`Лучший ход от игрока ${currentGame.firstVictim}`)
      .addField("Цели", [...valplayers.values()].join("\n"), true)
      .addField("Попадания", `${matches}`, true)
    ]}
    
  );}
  else if(collected.values.length == 2){
    const valplayers = players.filter( (player) => player.id == value[0] || player.id == value[1])



      const move = new MessageEmbed()
      .setDescription(`**Лучший ход игрока ${currentGame.firstVictim}: \n${[...valplayers.values()].join(`\n`)}**`)
/*      .setDescription(`${value.join(` `)}`)*/
      currentGame.client.channels.cache
    .get(config.gameChannel).send({ embeds: [move]})
    if (firstVictimRoleInfo.team == "maf") {
      currentGame.host.send({embeds: [ 
        new MessageEmbed()
        .setTitle("Лучший ход не засчитан потому что это мафия")
        .addField("Игрок", `${currentGame.firstVictim}`)
       ]} );
  
      return;
    }
   
    console.log(currentGame)
    const matches = [...valplayers.values()]
    .map((player) => currentGame.playerRoles.get(player.id))
    .map((role) => gameRoles[role])
    .map((roleInfo) => roleInfo.team == "maf")
    .map(Number)
    .reduce((acc, e) => acc + e);

    const score = [0, 0, 0, 0, 0][matches];
    console.log(score)
console.log(matches)
  currentGame.bestMove = score;
  currentGame.bestMoveHits = matches;
  currentGame.bestMoveTargets = [...valplayers.values()].map((player) => player.id);
  console.log(`Лх - ${currentGame.bestMove}, Лх хиты - ${currentGame.bestMoveHits}, Лх таргеты - ${currentGame.bestMoveTargets}`)

  currentGame.host.send(
    {embeds: [ 
    new MessageEmbed()
      .setDescription(`Лучший ход от игрока ${currentGame.firstVictim}`)
      .addField("Цели", [...valplayers.values()].join("\n"), true)
      .addField("Попадания", `${matches}`, true)
    ]}
  );
  }
  else if(collected.values.length == 3){

    
    const valplayers = players.filter( (player) => player.id == value[0] || player.id == value[1] || player.id == value[2])
  

  

console.log(valplayers)

      const move = new MessageEmbed()
      .setDescription(`**Лучший ход игрока ${currentGame.firstVictim}: \n${[...valplayers.values()].join(`\n`)}**`)
/*      .setDescription(`${value.join(` `)}`)*/
      currentGame.client.channels.cache
    .get(config.gameChannel).send({ embeds: [move]})
    
    if (firstVictimRoleInfo.team == "maf") {
      currentGame.host.send({embeds: [ 
        new MessageEmbed()
        .setTitle("Лучший ход не засчитан потому что это мафия")
        .addField("Игрок", `${currentGame.firstVictim}`)
       ]} );
  
      return;
    }
   
    const matches = [...valplayers.values()]
    .map((player) => currentGame.playerRoles.get(player.id))
    .map((role) => gameRoles[role])
    .map((roleInfo) => roleInfo.team == "maf")
    .map(Number)
    .reduce((acc, e) => acc + e);

    const score = [0, 0, 0, 0, 0][matches];
    console.log(score)
console.log(matches)
  currentGame.bestMove = score;
  currentGame.bestMoveHits = matches;
  currentGame.bestMoveTargets = [...valplayers.values()].map((player) => player.id);
  currentGame.host.send(
    {embeds: [ 
    new MessageEmbed()
      .setDescription(`Лучший ход от игрока ${currentGame.firstVictim}`)
      .addField("Цели", [...valplayers.values()].join("\n"), true)
      .addField("Попадания", `${matches}`, true)
    ]}
  );
  }
  else if(collected.values.length == 4){

    
    const valplayers = players.filter( (player) => player.id == value[0] || player.id == value[1] || player.id == value[2] || player.id == value[3])
  

  

console.log(valplayers)

      const move = new MessageEmbed()
      .setDescription(`**Лучший ход игрока ${currentGame.firstVictim}: \n${[...valplayers.values()].join(`\n`)}**`)
/*      .setDescription(`${value.join(` `)}`)*/
      currentGame.client.channels.cache
    .get(config.gameChannel).send({ embeds: [move]})
    
    if (firstVictimRoleInfo.team == "maf") {
      currentGame.host.send({embeds: [ 
        new MessageEmbed()
        .setTitle("Лучший ход не засчитан потому что это мафия")
        .addField("Игрок", `${currentGame.firstVictim}`)
       ]} );
  
      return;
    }
   
    const matches = [...valplayers.values()]
    .map((player) => currentGame.playerRoles.get(player.id))
    .map((role) => gameRoles[role])
    .map((roleInfo) => roleInfo.team == "maf")
    .map(Number)
    .reduce((acc, e) => acc + e);

    const score = [0, 0, 0, 0, 0][matches];
    console.log(score)
console.log(matches)
  currentGame.bestMove = score;
  currentGame.bestMoveHits = matches;
  currentGame.bestMoveTargets = [...valplayers.values()].map((player) => player.id);
  currentGame.host.send(
    {embeds: [ 
    new MessageEmbed()
      .setDescription(`Лучший ход от игрока ${currentGame.firstVictim}`)
      .addField("Цели", [...valplayers.values()].join("\n"), true)
      .addField("Попадания", `${matches}`, true)
    ]}
  );
  }
    })

      collector.on(`end`, async interaction => {
       
         setTimeout(() => targ.delete(), 500);
         setDay()

      /* setTimeout(() => targ.delete(), 1000)*/

      } )
  }
  catch{
    setDay()
  }

};
const te = async () => {
  const channel = currentGame.client.channels.cache
  .get(currentGame.treadd)
console.log(channel)  
}
const emoji = async () => {
  if (!isInProgress()) {
    return;
  }
  const { MessageEmbed, ReactionCollector, MessageSelectMenu, Collection, MessageActionRow, MessageButton } = require("discord.js");

  const channel = currentGame.client.channels.cache
  .get(currentGame.treadd)
  const ch = channel
console.log(channel)  

const rowone = new MessageActionRow()
.addComponents(
  new MessageButton()
  .setCustomId(`faul`)
  .setStyle(`PRIMARY`)
  .setLabel(`Фол`),
  new MessageButton()
  .setCustomId(`warn`)
  .setStyle(`PRIMARY`)
  .setLabel(`+Пред`),
  new MessageButton()
  .setCustomId(`kill`)
  .setStyle(`PRIMARY`)
  .setLabel(`Килл`),
  new MessageButton()
  .setCustomId(`day`)
  .setStyle(`PRIMARY`)
  .setLabel(`День`),
  new MessageButton()
  .setCustomId(`win`)
  .setStyle(`PRIMARY`)
  .setLabel(`Победа`)
)


  const rowtwo = new MessageActionRow()
  .addComponents(
  new MessageButton()
  .setCustomId(`rfaul`)
  .setStyle(`PRIMARY`)
  .setLabel(`-Фол`),
  new MessageButton()
  .setCustomId(`rwarn`)
  .setStyle(`PRIMARY`)
  .setLabel(`-Пред`),
  new MessageButton()
  .setCustomId(`revert`)
  .setStyle(`PRIMARY`)
  .setLabel(`Возр.`),
  new MessageButton()

  .setCustomId(`night`)
  .setStyle(`PRIMARY`)
  .setLabel(`Ночь`),
  
  new MessageButton()
  .setCustomId(`stop`)
  .setStyle(`PRIMARY`)
  .setLabel(`Стоп`),
)
const rowt = new MessageActionRow()
.addComponents(
  new MessageButton()
  .setCustomId(`pause`)
  .setStyle(`PRIMARY`)
  .setLabel(`Пауза`),
  new MessageButton()
  .setCustomId(`unpause`)
  .setStyle(`PRIMARY`)
  .setLabel(`Анпауза`),
)
const em = () => new MessageEmbed()
.setTitle(`Управление ботом`)
.setDescription(`${currentGame.state == 'day' ? `День ${currentGame.day}` : `Ночь ${currentGame.day}`} `)
.addField("Список игроков:", currentGame.sborplayers.size > 0 ? `${currentGame.sborplayers
  .map(
    (player) =>
    currentGame.alivePlayers.get(player.id) ? `${player} - ** Ф - ${currentGame.playerFauls.get(player.id) != undefined ? `${currentGame.playerFauls.get(player.id)}/4` : `0/4`} П - ${currentGame.playerWarns.get(player.id) != undefined ? `${currentGame.playerWarns.get(player.id)}/2` : `0/2`} ${currentGame.playerFauls.get(player.id) == 3 ? `Пропуск речи` : `Речь`}**` :
`~~${player} - **Убит**~~`
  )
  .join("\n")}`  : "\u200b")

const gameupr = await channel.send({embeds: [em()], components: [rowone , rowtwo, rowt]})

let mentions = []

const voting = () => new MessageEmbed()
.setTitle(`Голосование`)
.setDescription(`Выставленные игроки на голосование:\n\n${mentions}`)
const rowe = new MessageActionRow()
.addComponents(
  new MessageButton()
  .setCustomId(`one`)
  .setStyle(`PRIMARY`)
  .setLabel(`01`),
  new MessageButton()
  .setCustomId(`two`)
  .setStyle(`PRIMARY`)
  .setLabel(`02`),
  new MessageButton()
  .setCustomId(`three`)
  .setStyle(`PRIMARY`)
  .setLabel(`03`),
  new MessageButton()
  .setCustomId(`four`)
  .setStyle(`PRIMARY`)
  .setLabel(`04`),
  new MessageButton()
  .setCustomId(`five`)
  .setStyle(`PRIMARY`)
  .setLabel(`05`)
)
const rowetwo = new MessageActionRow()
.addComponents(
  new MessageButton()
  .setCustomId(`six`)
  .setStyle(`PRIMARY`)
  .setLabel(`06`),
  new MessageButton()
  .setCustomId(`seven`)
  .setStyle(`PRIMARY`)
  .setLabel(`07`),
  new MessageButton()
  .setCustomId(`eight`)
  .setStyle(`PRIMARY`)
  .setLabel(`08`),
  new MessageButton()
  .setCustomId(`nine`)
  .setStyle(`PRIMARY`)
  .setLabel(`09`),
  new MessageButton()
  .setCustomId(`ten`)
  .setStyle(`PRIMARY`)
  .setLabel(`10`)
)
const rowethree = new MessageActionRow()
.addComponents(
  new MessageButton()
  .setCustomId(`clear`)
  .setStyle(`DANGER`)
  .setLabel(`Очистить голосование`),
  new MessageButton()
  .setCustomId(`vote`)
  .setStyle(`SUCCESS`)
  .setLabel(`Начать голосование`),
  new MessageButton()
  .setCustomId(`votetwo`)
  .setStyle(`SECONDARY`)
  .setLabel(`Голосование за подъем`),
  new MessageButton()
  .setCustomId(`votethree`)
  .setStyle(`PRIMARY`)
  .setLabel(`Удалить Ласт Кандидата`),
)
const gamevoting = await channel.send({embeds: [voting()], components: [rowe , rowetwo, rowethree]})


const hasHostPermissions = (user) =>
user.id == currentGame.host.id || owners.includes(user.id);

const oneCollector = gamevoting.createMessageComponentCollector((i, u) =>
i.customId == 'one' && hasHostPermissions(u)
);
const twoCollector = gamevoting.createMessageComponentCollector((i, u) =>
i.customId == 'two' && hasHostPermissions(u)
);
const threeCollector = gamevoting.createMessageComponentCollector((i, u) =>
i.customId == 'three' && hasHostPermissions(u)
);
const fourCollector = gamevoting.createMessageComponentCollector((i, u) =>
i.customId == 'four' && hasHostPermissions(u)
);
const fiveCollector = gamevoting.createMessageComponentCollector((i, u) =>
i.customId == 'five' && hasHostPermissions(u)
);
const sixCollector = gamevoting.createMessageComponentCollector((i, u) =>
i.customId == 'six' && hasHostPermissions(u)
);
const sevenCollector = gamevoting.createMessageComponentCollector((i, u) =>
i.customId == 'seven' && hasHostPermissions(u)
);
const eightCollector = gamevoting.createMessageComponentCollector((i, u) =>
i.customId == 'eight' && hasHostPermissions(u)
);
const nineCollector = gamevoting.createMessageComponentCollector((i, u) =>
i.customId == 'nine' && hasHostPermissions(u)
);
const tenCollector = gamevoting.createMessageComponentCollector((i, u) =>
i.customId == 'ten' && hasHostPermissions(u)
);
const clearCollector = gamevoting.createMessageComponentCollector((i, u) =>
i.customId == 'clear' && hasHostPermissions(u)
);
const voteCollector = gamevoting.createMessageComponentCollector((i, u) =>
i.customId == 'vote' && hasHostPermissions(u)
);
const votetwoCollector = gamevoting.createMessageComponentCollector((i, u) =>
i.customId == 'votetwo' && hasHostPermissions(u)
);
const votethreeCollector = gamevoting.createMessageComponentCollector((i, u) =>
i.customId == 'votethree' && hasHostPermissions(u)
);




const faulCollector = gameupr.createMessageComponentCollector((i, u) =>
i.customId == 'faul' && hasHostPermissions(u)
);
const rfaulCollector = gameupr.createMessageComponentCollector((i, u) =>
i.customId == 'rfaul' && hasHostPermissions(u)
);
const warnCollector = gameupr.createMessageComponentCollector((i, u) =>
i.customId == 'warn' && hasHostPermissions(u)
);
const rwarnCollector = gameupr.createMessageComponentCollector((i, u) =>
i.customId == 'rwarn' && hasHostPermissions(u)
);
const killCollector = gameupr.createMessageComponentCollector((i, u) =>
i.customId == 'kill' && hasHostPermissions(u)
);
const revertCollector = gameupr.createMessageComponentCollector((i, u) =>
i.customId == 'revert' && hasHostPermissions(u)
);
const dayCollector = gameupr.createMessageComponentCollector((i, u) =>
i.customId == 'day' && hasHostPermissions(u)
);
const nightCollector = gameupr.createMessageComponentCollector((i, u) =>
i.customId == 'night' && hasHostPermissions(u)
);
const stopCollector = gameupr.createMessageComponentCollector((i, u) =>
i.customId == 'stop' && hasHostPermissions(u)
);
const winCollector = gameupr.createMessageComponentCollector((i, u) =>
i.customId == 'win' && hasHostPermissions(u)
);

const pauseCollector = gameupr.createMessageComponentCollector((i, u) =>
i.customId == 'pause' && hasHostPermissions(u)
);
const unpauseCollector = gameupr.createMessageComponentCollector((i, u) =>
i.customId == 'unpause' && hasHostPermissions(u)
);



faulCollector.on('collect', async interaction => {
 if (interaction.customId == "faul") {
  if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
console.log(currentGame)
function getKey(map, input) {
  for (let [key, value] of map.entries()) {
     if (value === input) {
       return key;
     }
  }
  
  return "Not found";
}
const roww = new MessageActionRow()
.addComponents(
  new MessageSelectMenu()
  .setCustomId('select')
  .setPlaceholder(`Кому выдать фол?`)
  .setMaxValues(1)
  .addOptions([
    {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 1)).user.username,
      label: `01`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 1)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 2)).user.username,
      label: `02`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 2)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 3)).user.username,
      label: `03`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 3)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 4)).user.username,
      label: `04`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 4)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 5)).user.username,
      label: `05`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 5)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 6)).user.username,
      label: `06`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 6)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 7)).user.username,
      label: `07`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 7)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 8)).user.username,
      label: `08`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 8)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 9)).user.username,
      label: `09`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 9)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 10)).user.username,
      label: `10`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 10)).id,
     },
  ])
)
await interaction.reply({ content: `Фолы`, components: [roww], ephemeral: true });

const filter = (interaction) =>
interaction.isSelectMenu()

const collector = ch.createMessageComponentCollector({
filter,
max: "1"
});
let val = 0 
collector.on(`collect`, async (collected) => {
  console.log(val)
  const value = collected.values[0];
  val = value
  console.log(val)

  if (!currentGame.alivePlayers.has(val)) {
    return;
  }
  const fauls = (currentGame.playerFauls.get(val) || 0) + 1;
  const warns = currentGame.playerWarns.get(val) || 0;
  
  currentGame.playerFauls.set(val, fauls);
  await gameupr.edit({embeds: [em()]})
  if (fauls < 4) {
    const playerMember = currentGame.alivePlayers.get(val);
  
    const nickname = currentGame.playerNumbers.get(val).toLocaleString(undefined, {
      minimumIntegerDigits: 2
    });
  
    playerMember
      .setNickname(
        `${nickname} ${"П".repeat(warns)}${warns > 0 ? " " : ""}${"Ф".repeat(fauls)}`
      )
      .catch(() => {})
  }
  console.log(currentGame.guild.members.cache.get(val))
  const faulEmbed = new MessageEmbed()
    .setTitle("**Фол выдан!**")
    .setDescription(`Игрок: ${currentGame.guild.members.cache.get(val)} \nВсего фолов: **${fauls}**`);
  
  currentGame.client.channels.cache.get(config.gameChannel).send({embeds: [ faulEmbed]});
  
  if (fauls >= 4) {
    remove(val);
  
    currentGame.client.channels.cache
      .get(config.gameChannel)
      .send(
        `**Игрок ${currentGame.guild.members.cache.get(val)} исключён за превышение максимального числа фолов! В живых осталось ${currentGame.alivePlayers.size} игроков!**`
      );
  }
})
console.log(val)

 }


}

})
rfaulCollector.on('collect', async interaction => {
  if (interaction.customId == "rfaul") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
 console.log(currentGame)
 function getKey(map, input) {
  for (let [key, value] of map.entries()) {
     if (value === input) {
       return key;
     }
  }
  
  return "Not found";
}
 const roww = new MessageActionRow()
 .addComponents(
   new MessageSelectMenu()
   .setCustomId('select')
   .setPlaceholder(`Кому снять фол?`)
   .setMaxValues(1)
   .addOptions([
    {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 1)).user.username,
      label: `01`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 1)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 2)).user.username,
      label: `02`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 2)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 3)).user.username,
      label: `03`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 3)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 4)).user.username,
      label: `04`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 4)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 5)).user.username,
      label: `05`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 5)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 6)).user.username,
      label: `06`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 6)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 7)).user.username,
      label: `07`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 7)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 8)).user.username,
      label: `08`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 8)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 9)).user.username,
      label: `09`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 9)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 10)).user.username,
      label: `10`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 10)).id,
     },
   ])
 )
 await interaction.reply({ content: `Фолы`, components: [roww], ephemeral: true });
 
 const filter = (interaction) =>
 interaction.isSelectMenu()
 
 const collector = ch.createMessageComponentCollector({
 filter,
 max: "1"
 });
 let val = 0 
 collector.on(`collect`, async (collected) => {
   console.log(val)
   const value = collected.values[0];
   val = value
   console.log(val)
 
   if (!currentGame.alivePlayers.has(val)) {
     return;
   }
   let fauls = currentGame.playerFauls.get(val) || 0 ;
   const warns = currentGame.playerWarns.get(val) || 0;
   
   if (fauls == 0) {
    return;
  }
  fauls--;


   currentGame.playerFauls.set(val, fauls);
   if (fauls == 3) {
    resurrect(val);
  }
   await gameupr.edit({embeds: [em()]})
   
     const playerMember = currentGame.alivePlayers.get(val);
   
     const nickname = currentGame.playerNumbers.get(val).toLocaleString(undefined, {
       minimumIntegerDigits: 2
     });
   
     playerMember
       .setNickname(
         `${nickname} ${"П".repeat(warns)}${warns > 0 ? " " : ""}${"Ф".repeat(fauls)}`
       )
       .catch(() => {})
   
   const faulEmbed = new MessageEmbed()
   .setTitle("**Фол снят!**")
   .setDescription(`Игрок: ${currentGame.guild.members.cache.get(val)} \nВсего фолов: **${fauls}**`);
   
   currentGame.client.channels.cache.get(config.gameChannel).send({embeds: [ faulEmbed]});
   
   if (fauls == 3) {
   
     currentGame.client.channels.cache
       .get(config.gameChannel)
       .send(
         `**Игрок ${currentGame.guild.members.cache.get(val)} вернулся в игру! В живых теперь ${currentGame.alivePlayers.size} игроков!**`
       );
   }
 })
 console.log(val)
 
  }
 
 
 }
 
})

warnCollector.on('collect', async interaction => {
  if (interaction.customId == "warn") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
 console.log(currentGame)
 function getKey(map, input) {
  for (let [key, value] of map.entries()) {
     if (value === input) {
       return key;
     }
  }
  
  return "Not found";
}
 const roww = new MessageActionRow()
 .addComponents(
   new MessageSelectMenu()
   .setCustomId('select')
   .setPlaceholder(`Кому выдать пред?`)
   .setMaxValues(1)
   .addOptions([
    {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 1)).user.username,
      label: `01`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 1)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 2)).user.username,
      label: `02`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 2)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 3)).user.username,
      label: `03`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 3)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 4)).user.username,
      label: `04`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 4)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 5)).user.username,
      label: `05`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 5)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 6)).user.username,
      label: `06`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 6)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 7)).user.username,
      label: `07`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 7)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 8)).user.username,
      label: `08`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 8)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 9)).user.username,
      label: `09`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 9)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 10)).user.username,
      label: `10`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 10)).id,
     },
   ])
 )
 await interaction.reply({ content: `Преды`, components: [roww], ephemeral: true });
 
 const filter = (interaction) =>
 interaction.isSelectMenu()
 
 const collector = ch.createMessageComponentCollector({
 filter,
 max: "1"
 });
 let val = 0 
 collector.on(`collect`, async (collected) => {
   console.log(val)
   const value = collected.values[0];
   val = value
   console.log(val)
 
   if (!currentGame.alivePlayers.has(val)) {
     return;
   }
   const fauls = currentGame.playerFauls.get(val) || 0;
   const warns = (currentGame.playerWarns.get(val) || 0 + 1);
   
   currentGame.playerWarns.set(val, warns);
   await gameupr.edit({embeds: [em()]})
   if (warns < 2) {
     const playerMember = currentGame.alivePlayers.get(val);
   
     const nickname = currentGame.playerNumbers.get(val).toLocaleString(undefined, {
       minimumIntegerDigits: 2
     });
   
     playerMember
       .setNickname(
         `${nickname} ${"П".repeat(warns)}${warns > 0 ? " " : ""}${"Ф".repeat(fauls)}`
       )
       .catch(() => {})
   }
   console.log(currentGame.guild.members.cache.get(val))
   const warnEmbed = new MessageEmbed()
   .setTitle("**Предупреждение выдано!**")
   .setDescription(`Игрок: ${currentGame.guild.members.cache.get(val)} \nВсего предупреждений: **${warns}**`);
   
   currentGame.client.channels.cache.get(config.gameChannel).send({embeds: [ warnEmbed]});
   
   if (warns >= 2) {
     remove(val);
   
     currentGame.client.channels.cache
       .get(config.gameChannel)
       .send(
         `**Игрок ${currentGame.guild.members.cache.get(val)} исключён за превышение максимального числа предупреждений! В живых осталось ${currentGame.alivePlayers.size} игроков!**`
       );
   }
 })
 console.log(val)
 
  }
 
 
 }
 
})

rwarnCollector.on('collect', async interaction => {
  if (interaction.customId == "rwarn") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
 console.log(currentGame)
 function getKey(map, input) {
  for (let [key, value] of map.entries()) {
     if (value === input) {
       return key;
     }
  }
  
  return "Not found";
}
 const roww = new MessageActionRow()
 .addComponents(
   new MessageSelectMenu()
   .setCustomId('select')
   .setPlaceholder(`Кому снять пред?`)
   .setMaxValues(1)
   .addOptions([
    {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 1)).user.username,
      label: `01`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 1)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 2)).user.username,
      label: `02`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 2)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 3)).user.username,
      label: `03`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 3)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 4)).user.username,
      label: `04`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 4)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 5)).user.username,
      label: `05`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 5)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 6)).user.username,
      label: `06`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 6)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 7)).user.username,
      label: `07`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 7)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 8)).user.username,
      label: `08`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 8)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 9)).user.username,
      label: `09`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 9)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 10)).user.username,
      label: `10`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 10)).id,
     },
   ])
 )
 await interaction.reply({ content: `Преды`, components: [roww], ephemeral: true });
 
 const filter = (interaction) =>
 interaction.isSelectMenu()
 
 const collector = ch.createMessageComponentCollector({
 filter,
 max: "1"
 });
 let val = 0 
 collector.on(`collect`, async (collected) => {
   console.log(val)
   const value = collected.values[0];
   val = value
   console.log(val)
 
  
   let warns = currentGame.playerWarns.get(val) || 0 ;
   const fauls = currentGame.playerFauls.get(val) || 0;
   
   if (warns == 0) {
    return;
  }
  warns--;


   currentGame.playerWarns.set(val, warns);
   if (warns == 1) {
    resurrect(val);
  }
   await gameupr.edit({embeds: [em()]})
   
     const playerMember = currentGame.alivePlayers.get(val);
   
     const nickname = currentGame.playerNumbers.get(val).toLocaleString(undefined, {
       minimumIntegerDigits: 2
     });
   
     playerMember
       .setNickname(
         `${nickname} ${"П".repeat(warns)}${warns > 0 ? " " : ""}${"Ф".repeat(fauls)}`
       )
       .catch(() => {})
   
   const warnEmbed = new MessageEmbed()
   .setTitle("**Предупреждение снято!**")
   .setDescription(`Игрок: ${currentGame.guild.members.cache.get(val)} \nВсего предов: **${fauls}**`);
   
   currentGame.client.channels.cache.get(config.gameChannel).send({embeds: [ warnEmbed]});
   
   if (warns == 1) {
   
     currentGame.client.channels.cache
       .get(config.gameChannel)
       .send(
         `**Игрок ${currentGame.guild.members.cache.get(val)} вернулся в игру! В живых теперь ${currentGame.alivePlayers.size} игроков!**`
       );
   }
 })
 console.log(val)
 
  }
 
 
 }
 
})
killCollector.on('collect', async interaction => {
  if (interaction.customId == "kill") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
 console.log(currentGame)
 function getKey(map, input) {
  for (let [key, value] of map.entries()) {
     if (value === input) {
       return key;
     }
  }
  
  return "Not found";
}
 const roww = new MessageActionRow()
 .addComponents(
   new MessageSelectMenu()
   .setCustomId('select')
   .setPlaceholder(`Кого убить?`)
   .setMaxValues(1)
   .addOptions([  {
    description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 1)).user.username,
    label: `01`,
    value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 1)).id,
   },
   {
    description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 2)).user.username,
    label: `02`,
    value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 2)).id,
   },
   {
    description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 3)).user.username,
    label: `03`,
    value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 3)).id,
   },
   {
    description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 4)).user.username,
    label: `04`,
    value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 4)).id,
   },
   {
    description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 5)).user.username,
    label: `05`,
    value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 5)).id,
   },
   {
    description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 6)).user.username,
    label: `06`,
    value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 6)).id,
   },
   {
    description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 7)).user.username,
    label: `07`,
    value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 7)).id,
   },
   {
    description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 8)).user.username,
    label: `08`,
    value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 8)).id,
   },
   {
    description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 9)).user.username,
    label: `09`,
    value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 9)).id,
   },
   {
    description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 10)).user.username,
    label: `10`,
    value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 10)).id,
   },
   ])
 )
 await interaction.reply({ content: `Убийства`, components: [roww], ephemeral: true });
 
 const filter = (interaction) =>
 interaction.isSelectMenu()
 
 const collector = ch.createMessageComponentCollector({
 filter,
 max: "1"
 });
 let val = 0 
 collector.on(`collect`, async (collected) => {
   console.log(val)
   const value = collected.values[0];
   val = value
   console.log(val)
 
   if (!currentGame.alivePlayers.has(val)) {
     return;
   }
   if (!currentGame.firstVictim && currentGame.state == "night" && currentGame.day == 1) {
    currentGame.firstVictim = currentGame.sortedMembers.get(val);
  }
  remove(val);

  const member = currentGame.sortedMembers.get(val);

  if (member.voice.channel) {
    member.voice.setChannel(config.chan);
  }
  const gameChannel = currentGame.client.channels.cache.get(config.gameChannel);

  if (currentGame.state == "day") {
    await gameChannel.send(
      `**Игрок ${currentGame.guild.members.cache.get(val)} был повешен! В живых осталось ${currentGame.alivePlayers.size} игроков!**`
    );
    currentGame.hangedPlayers.add(val);
    await gameupr.edit({embeds: [em()]})

  } 
  else {
    await gameChannel.send(
      `**Игрок ${currentGame.guild.members.cache.get(val)} был убит мафией! В живых осталось ${currentGame.alivePlayers.size} игроков!**`
    );

    currentGame.killedPlayers.add(val);
    await gameupr.edit({embeds: [em()]})

  }

 })

 console.log(val)
 
  }
 
 
 }
 
})
revertCollector.on('collect', async interaction => {
  if (interaction.customId == "revert") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
 console.log(currentGame)
 function getKey(map, input) {
  for (let [key, value] of map.entries()) {
     if (value === input) {
       return key;
     }
  }
  
  return "Not found";
}
 const roww = new MessageActionRow()
 .addComponents(
   new MessageSelectMenu()
   .setCustomId('select')
   .setPlaceholder(`Кого вернуть в игру?`)
   .setMaxValues(1)
   .addOptions([
    {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 1)).user.username,
      label: `01`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 1)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 2)).user.username,
      label: `02`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 2)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 3)).user.username,
      label: `03`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 3)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 4)).user.username,
      label: `04`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 4)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 5)).user.username,
      label: `05`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 5)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 6)).user.username,
      label: `06`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 6)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 7)).user.username,
      label: `07`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 7)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 8)).user.username,
      label: `08`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 8)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 9)).user.username,
      label: `09`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 9)).id,
     },
     {
      description: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 10)).user.username,
      label: `10`,
      value: currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 10)).id,
     },
   ])
 )
 await interaction.reply({ content: `Жыве`, components: [roww], ephemeral: true });
 
 const filter = (interaction) =>
 interaction.isSelectMenu()
 
 const collector = ch.createMessageComponentCollector({
 filter,
 max: "1"
 });
 let val = 0 
 collector.on(`collect`, async (collected) => {
   console.log(val)
   const value = collected.values[0];
   val = value
   console.log(val)
 
   if (!currentGame.sortedMembers.has(val)) {
     return;
   }
   const player = currentGame.sortedMembers.get(val);
   currentGame.alivePlayers.set(val, player);

   if (currentGame.hangedPlayers.has(val)) {
    currentGame.hangedPlayers.delete(val);
  }

  if (currentGame.killedPlayers.has(val)) {
    currentGame.killedPlayers.delete(val);
  }

  if (!player.roles.cache.has(config.gameRole)) {
    player.roles.add(config.gameRole);
  }
   await gameupr.edit({embeds: [em()]})
   updateNickname(val)
   const firstVictim = getFirstVictim();

   if (firstVictim && firstVictim.id == val) {
    game.getGameState().firstVictim = undefined;
  }
  const gameChannel = currentGame.client.channels.cache.get(config.gameChannel);

  
    gameChannel.send(
      `**Игрок ${currentGame.guild.members.cache.get(val)} был воскрешен! В живых осталось ${currentGame.alivePlayers.size} игроков!**`
    );
 })
 console.log(val)
 
  }
 
 
 }
 
})
dayCollector.on('collect', async interaction => {
  if (interaction.customId == "day") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
   
    setDay()

  }
  }
})
nightCollector.on('collect', async interaction => {
  if (interaction.customId == "night") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
    if (getState() == "night") {
      currentGame.client.channels.cache.get(config.gameChannel).send({content: "В игре уже ночь!"});
      return;
    }
    currentGame.client.channels.cache.get(config.gameChannel).messages.fetch({}).then((messages) => { 
      const botMessages = [];
      messages.filter(m => m.author.id !== '926165063482605608').forEach(msg => botMessages.push(msg))
      console.log(botMessages)
try {
       if (botMessages.length){
      setTimeout(() => currentGame.client.channels.cache.get(config.gameChannel).bulkDelete(botMessages), 1)
       }
      }
      catch(e) {console.log(e)}
     
      })
  
      const ytdl = require('youtube-dl-exec').raw
      const musicAll = require(`./music.json`)
      const { joinVoiceChannel, AudioPlayer } = require('@discordjs/voice');
      const { getVoiceConnection } = require('@discordjs/voice');
      const { createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');
      const { AudioPlayerStatus } = require('@discordjs/voice');
      const { createAudioResource, StreamType } = require('@discordjs/voice');
      const { MessageEmbed } = require("discord.js");
      const { VoiceConnectionStatus, entersState } = require('@discordjs/voice');
      const { YtdlCore } = require('@ybd-project/ytdl-core');
      const yt = require("@distube/ytdl-core");
      const NORMAL_OAUTH2 = new YtdlCore.OAuth2({
        accessToken: 'ya29.a0ARW5m75h-LztfUcxFH5Cbyr22JZ_Kj-K9ONBDp5Rb6uau9LINw9bIqNXhV86QnOA0858etAEPokIqu9QK3h6YTJQtG-MWD-wdg8eQK2j_JJpLlcQXePnJ-rDaRN2rAdPAJIHrtVxTKd-X-wwDDKzxo_2jTQdaWcUWKsC8Q8mLz7RlPk4GF7GaCgYKAfYSARMSFQHGX2Mi8te6zf1PiBYqgu80WUbX5w0187',
        refreshToken: '1//0coDtylV-M3UrCgYIARAAGAwSNwF-L9Irb67N0_NhZIYUy_bj0OxvT7vDoSyWuvpFUrnGvDPx6TeMwqauBfL8cdzXri9apvpORww',
        expiryDate: '2025-01-07T10:44:33.151Z',
       });

      let randomMusic = musicAll[Math.floor(Math.random() * musicAll.length)];
 
      const connection = joinVoiceChannel({
        channelId: `975452788559581224`,
        guildId: currentGame.client.channels.cache.get(config.gameChannel).guild.id,
        adapterCreator: currentGame.client.channels.cache.get(config.gameChannel).guild.voiceAdapterCreator
      })
       const stream = ytdl(randomMusic, {
         filter: "audioonly",
         fmt: "mp3",
         highWaterMark: 1 << 62,
         liveBuffer: 1 << 62,
         dlChunkSize: 0, //disabling chunking is recommended in discord bot
         bitrate: 128,
         quality: "lowestaudio",
       }, { stdio: ['ignore', 'pipe', 'ignore'] })
       
   
       connection.on('stateChange', (old_state, new_state) => {
               if (old_state.status === VoiceConnectionStatus.Ready && new_state.status === VoiceConnectionStatus.Connecting) {
                   connection.configureNetworking();
               }
           })
          
           
           const str = yt(randomMusic, {
            filter: "audioonly",
            fmt: "mp3",
            highWaterMark: 1 << 62,
            liveBuffer: 1 << 62,
            dlChunkSize: 0, //disabling chunking is recommended in discord bot
            bitrate: 128,
            quality: "lowestaudio",
            poToken: 'MnSh9VcTeU4jH6HNQMNMbJd_thIz1yypXpSEHsrbz8Cot-2vYx5oIhm4p5HmeJr67Har8SDzpl9lCumROyX2yn840R8FaCl45U-oq1wJpNjr0SmKW3YVK5uPWBXte93c5jJ8fEZgJ-XE9_2GRBNCgg3ALVyB6Q==',
            visitorData: 'CgsxUUxRcGpOUnNuTSiZgJK2BjIKCgJLWhIEGgAgIA%3D%3D'
                    })
       
       const player = createAudioPlayer()
       
   
              const resource = createAudioResource(str,{ inlineVolume: true, inputType: StreamType.OggOpus, });
              resource.volume.setVolume(0.5);
       
       connection.subscribe(player)
       player.play(resource, {
         type: "unknown",
         volume: 0.10
       })
       player.on(AudioPlayerStatus.Playing, () => {
         console.log('The audio player has started playing!');
       });
    player.on('error', error => {
     console.error(error);
   });
            
      
   let info = yt.getBasicInfo(stream.spawnargs[1]).then(inf => {
      const titerr = new MessageEmbed()
   
              .setDescription(`**Музыки нет, потому что youtube заблокировал видео**`)
   
   const tit = new MessageEmbed()
              .setDescription(`Сейчас проигрывается - **${inf.videoDetails.title}**`)
              currentGame.client.channels.cache.get(config.gameChannel).send({embeds: [tit]})
   }).catch((e) => {return console.log(e)})
  
  
  
  
    setNight()

  }
  }
})
stopCollector.on('collect', async interaction => {
  if (interaction.customId == "stop") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
    

    if (!isInProgress()) {
      return;
    }
    currentGame.client.channels.cache.get(config.chan).guild.me.edit({mute:false}).catch((error) => console.log(error))
    await currentGame.client.channels.cache.get(config.chan).guild.me.edit({channel:null}).catch((error) => console.log(error))
  
    await gogletwo()
  
    currentGame.alivePlayers.forEach((player) => remove(player.id));
  
    currentGame.client.channels.cache.get(config.gameChannel).send("**Игра остановлена!**");
    
    currentGame = undefined;
    setTimeout(()=> ch.delete(), 1000)


  

  }
  }
})

winCollector.on('collect', async interaction => {
  if (interaction.customId == "win") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
    

    if (!isInProgress()) {
      return;
    }
    const roww = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
      .setCustomId('select')
      .setPlaceholder(`Выбрать победителя`)
      .setMaxValues(1)
      .addOptions([
        {
         label: `Мирные`,
         value: "mir"
        },
        {
         label: `Мафия`,
         value: "maf"
        }
      ])
    )

    await interaction.reply({ content: `Победа`, components: [roww], ephemeral: true });

    const filter = (interaction) =>
    interaction.isSelectMenu()
    
    const collector = ch.createMessageComponentCollector({
    filter,
    max: "1"
    });
    let val = 0 
    collector.on(`collect`, async (collected) => {

      const value = collected.values[0];
      val = value

      setTimeout(()=> ch.delete(), 1000)
      await finish(val)


    })

  }
  }
})


pauseCollector.on('collect', async interaction => {
  if (interaction.customId == "pause") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
    const ytdl = require('youtube-dl-exec').raw
    const musicAll = require(`./music.json`)
    const { joinVoiceChannel, AudioPlayer } = require('@discordjs/voice');
    const { getVoiceConnection } = require('@discordjs/voice');
    const { createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');
    const { AudioPlayerStatus } = require('@discordjs/voice');
    const { createAudioResource, StreamType } = require('@discordjs/voice');
    const { MessageEmbed } = require("discord.js");
    const { VoiceConnectionStatus, entersState } = require('@discordjs/voice');
    const { YtdlCore } = require('@ybd-project/ytdl-core');
const yt = require("@distube/ytdl-core");
   const NORMAL_OAUTH2 = new YtdlCore.OAuth2({
 accessToken: 'ya29.a0ARW5m75h-LztfUcxFH5Cbyr22JZ_Kj-K9ONBDp5Rb6uau9LINw9bIqNXhV86QnOA0858etAEPokIqu9QK3h6YTJQtG-MWD-wdg8eQK2j_JJpLlcQXePnJ-rDaRN2rAdPAJIHrtVxTKd-X-wwDDKzxo_2jTQdaWcUWKsC8Q8mLz7RlPk4GF7GaCgYKAfYSARMSFQHGX2Mi8te6zf1PiBYqgu80WUbX5w0187',
 refreshToken: '1//0coDtylV-M3UrCgYIARAAGAwSNwF-L9Irb67N0_NhZIYUy_bj0OxvT7vDoSyWuvpFUrnGvDPx6TeMwqauBfL8cdzXri9apvpORww',
 expiryDate: '2025-01-07T10:44:33.151Z',
});

    let randomMusic = musicAll[Math.floor(Math.random() * musicAll.length)];

    const connection = joinVoiceChannel({
      channelId: `975452788559581224`,
      guildId: currentGame.client.channels.cache.get(config.gameChannel).guild.id,
      adapterCreator: currentGame.client.channels.cache.get(config.gameChannel).guild.voiceAdapterCreator
    })
     const stream = ytdl(randomMusic, {
       filter: "audioonly",
       fmt: "mp3",
       highWaterMark: 1 << 62,
       liveBuffer: 1 << 62,
       dlChunkSize: 0, //disabling chunking is recommended in discord bot
       bitrate: 128,
       quality: "lowestaudio",
     }, { stdio: ['ignore', 'pipe', 'ignore'] })
     
 
     connection.on('stateChange', (old_state, new_state) => {
             if (old_state.status === VoiceConnectionStatus.Ready && new_state.status === VoiceConnectionStatus.Connecting) {
                 connection.configureNetworking();
             }
         })
       
         
         const str = yt(randomMusic, {
          filter: "audioonly",
          fmt: "mp3",
          highWaterMark: 1 << 62,
          liveBuffer: 1 << 62,
          dlChunkSize: 0, //disabling chunking is recommended in discord bot
          bitrate: 128,
          quality: "lowestaudio",
          poToken: 'MnSh9VcTeU4jH6HNQMNMbJd_thIz1yypXpSEHsrbz8Cot-2vYx5oIhm4p5HmeJr67Har8SDzpl9lCumROyX2yn840R8FaCl45U-oq1wJpNjr0SmKW3YVK5uPWBXte93c5jJ8fEZgJ-XE9_2GRBNCgg3ALVyB6Q==',
          visitorData: 'CgsxUUxRcGpOUnNuTSiZgJK2BjIKCgJLWhIEGgAgIA%3D%3D'
                  })
     
     const player = createAudioPlayer()
     
 
            const resource = createAudioResource(str,{ inlineVolume: true, inputType: StreamType.OggOpus, });
            resource.volume.setVolume(0.5);
     
     connection.subscribe(player)
     player.play(resource, {
       type: "unknown",
       volume: 0.10
     })
     player.on(AudioPlayerStatus.Playing, () => {
       console.log('The audio player has started playing!');
     });
  player.on('error', error => {
   console.error(error);
 });
          
    
 let info = yt.getBasicInfo(stream.spawnargs[1]).then(inf => {
    const titerr = new MessageEmbed()
 
            .setDescription(`**Музыки нет, потому что youtube заблокировал видео**`)
 
 const tit = new MessageEmbed()
            .setDescription(`Сейчас проигрывается - **${inf.videoDetails.title}**`)
            currentGame.client.channels.cache.get(config.gameChannel).send({embeds: [tit]})
 }).catch((e) => {return console.log(e)})

   pause()


  }
  }
})

unpauseCollector.on('collect', async interaction => {
  if (interaction.customId == "unpause") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
   
unpause()
  }
  }
})





clearCollector.on('collect', async interaction => {
  if (interaction.customId == "clear") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
    

    if (!isInProgress()) {
      return;
    }
    
    mentions.length = 0
    gamevoting.edit({embeds: [voting()]})
  

  }
  }
})
votethreeCollector.on('collect', async interaction => {
  if (interaction.customId == "votethree") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
    

    if (!isInProgress()) {
      return;
    }
    
    mentions.pop()
    gamevoting.edit({embeds: [voting()]})
  

  }
  }
})
oneCollector.on('collect', async interaction => {
  if (interaction.customId == "one") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
    

    if (!isInProgress()) {
      return;
    }
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }
    const roul = currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 1))
    mentions.push(roul)
    console.log(roul)
    gamevoting.edit({embeds: [voting()]})
    const vt = new MessageEmbed()
    .setDescription('Кандидатура игрока номер **1** принята на голосование')
   currentGame.client.channels.cache.get(config.gameChannel).send({embeds:[vt]})
    

  }
  }
})
twoCollector.on('collect', async interaction => {
  if (interaction.customId == "two") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
    

    if (!isInProgress()) {
      return;
    }
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }
    const roul = currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 2))
    mentions.push(roul)
    console.log(roul)
    gamevoting.edit({embeds: [voting()]})
    const vt = new MessageEmbed()
    .setDescription('Кандидатура игрока номер **2** принята на голосование')
   currentGame.client.channels.cache.get(config.gameChannel).send({embeds:[vt]})


  }
  }
})
threeCollector.on('collect', async interaction => {
  if (interaction.customId == "three") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
    

    if (!isInProgress()) {
      return;
    }
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }
    const roul = currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 3))
    mentions.push(roul)
    console.log(roul)
    gamevoting.edit({embeds: [voting()]})
    const vt = new MessageEmbed()
    .setDescription('Кандидатура игрока номер **3** принята на голосование')
   currentGame.client.channels.cache.get(config.gameChannel).send({embeds:[vt]})


  }
  }
})
fourCollector.on('collect', async interaction => {
  if (interaction.customId == "four") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
    

    if (!isInProgress()) {
      return;
    }
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }
    const roul = currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 4))
    mentions.push(roul)
    console.log(roul)
    gamevoting.edit({embeds: [voting()]})
    const vt = new MessageEmbed()
    .setDescription('Кандидатура игрока номер **4** принята на голосование')
   currentGame.client.channels.cache.get(config.gameChannel).send({embeds:[vt]})


  }
  }
})
fiveCollector.on('collect', async interaction => {
  if (interaction.customId == "five") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
    

    if (!isInProgress()) {
      return;
    }
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }
    const roul = currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 5))
    mentions.push(roul)
    console.log(roul)
    gamevoting.edit({embeds: [voting()]})
    const vt = new MessageEmbed()
    .setDescription('Кандидатура игрока номер **5** принята на голосование')
   currentGame.client.channels.cache.get(config.gameChannel).send({embeds:[vt]})


  }
  }
})
sixCollector.on('collect', async interaction => {
  if (interaction.customId == "six") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
    

    if (!isInProgress()) {
      return;
    }
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }
    const roul = currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 6))
    mentions.push(roul)
    console.log(roul)
    gamevoting.edit({embeds: [voting()]})
    const vt = new MessageEmbed()
    .setDescription('Кандидатура игрока номер **6** принята на голосование')
   currentGame.client.channels.cache.get(config.gameChannel).send({embeds:[vt]})


  }
  }
})
sevenCollector.on('collect', async interaction => {
  if (interaction.customId == "seven") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
    

    if (!isInProgress()) {
      return;
    }
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }
    const roul = currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 7))
    mentions.push(roul)
    console.log(roul)
    gamevoting.edit({embeds: [voting()]})
    const vt = new MessageEmbed()
    .setDescription('Кандидатура игрока номер **7** принята на голосование')
   currentGame.client.channels.cache.get(config.gameChannel).send({embeds:[vt]})


  }
  }
})
eightCollector.on('collect', async interaction => {
  if (interaction.customId == "eight") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
    

    if (!isInProgress()) {
      return;
    }
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }
    const roul = currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 8))
    mentions.push(roul)
    console.log(roul)
    gamevoting.edit({embeds: [voting()]})
    const vt = new MessageEmbed()
    .setDescription('Кандидатура игрока номер **8** принята на голосование')
   currentGame.client.channels.cache.get(config.gameChannel).send({embeds:[vt]})


  }
  }
})
nineCollector.on('collect', async interaction => {
  if (interaction.customId == "nine") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
    

    if (!isInProgress()) {
      return;
    }
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }
    const roul = currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 9))
    mentions.push(roul)
    console.log(roul)
    gamevoting.edit({embeds: [voting()]})
    const vt = new MessageEmbed()
    .setDescription('Кандидатура игрока номер **9** принята на голосование')
   currentGame.client.channels.cache.get(config.gameChannel).send({embeds:[vt]})


  }
  }
})
tenCollector.on('collect', async interaction => {
  if (interaction.customId == "ten") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
    

    if (!isInProgress()) {
      return;
    }
    function getKey(map, input) {
      for (let [key, value] of map.entries()) {
         if (value === input) {
           return key;
         }
      }
      
      return "Not found";
    }
    const roul = currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, 10))
    mentions.push(roul)
    console.log(roul)
    gamevoting.edit({embeds: [voting()]})
    const vt = new MessageEmbed()
    .setDescription('Кандидатура игрока номер **10** принята на голосование')
   currentGame.client.channels.cache.get(config.gameChannel).send({embeds:[vt]})


  }
  }
})

voteCollector.on('collect', async interaction => {
  if (interaction.customId == "vote") {
   if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
    

    if (!isInProgress()) {
      return;
    }
    function wait(ms) {
      const start = Date.now();
      while (Date.now() - start < ms);
    }

    async function countdown(channel, time, { interval = 1000 } = {}) {
      let n = time / interval;
    
     console.log(`**${n}**`);
    
      for (let i = n - 1; i >= 0; i--) {
        wait(1030);
    
     console.log(`**${n}**`);
    
        
      }
    }
    const formatNumber = (number) =>
    number.toLocaleString(undefined, {
      minimumIntegerDigits: 2
    });

    for (let i = 0; i < mentions.length; i++) {
      const player = mentions[i];
      if (!getPlayers().has(player.id)) {
        return message.reply(`Игрок **${player.username}** не участвует в игре!`);
      }

      if (!getAlivePlayers().has(player.id)) {
        return message.reply(`Игрок **${player.username}** мёртв!`);
      }
    }

    const votes = new Map();
    const alivePlayers = getAlivePlayers();
    const playerNumbers = getGameState().playerNumbers;

    const getNumber = (id) => formatNumber(playerNumbers.get(id));

    const startEmbed = new MessageEmbed()
    .setTitle("Голосование за исключение")
    .setDescription(
      `На голосование выставлены **${mentions.map((player) => `${getNumber(player.id)}`).join(", ")}.**`
    );
    await currentGame.client.channels.cache.get(config.gameChannel).send({embeds: [startEmbed]});

    await countdown(currentGame.client.channels.cache.get(config.gameChannel), 5000);

    for (let i = 0; i < mentions.length; i++) {
      const target = mentions[i];

      let time = 3;
      const createVoteEmbed = (remainingTime) =>
      new MessageEmbed()
        .setTitle(`Голосование за исключение игрока № ${getNumber(target.id)}`)
        .setDescription(`Осталось времени: **${remainingTime}**`);

        const embedMessage = await currentGame.client.channels.cache.get(config.gameChannel).send({embeds: [createVoteEmbed(time)]});
        const filter = m => { return m.content.trim() == "+" && alivePlayers.has(m.author.id) && !votes.has(m.author.id)} 
        const collector = currentGame.client.channels.cache.get(config.gameChannel)
        .createMessageCollector({filter})
        .on("collect", (m) => votes.set(m.author.id, target.id));

        while (time > 0) {
          wait(1010);
          time--;
  
          await embedMessage.edit({embeds: [createVoteEmbed(time)]});
        }
        collector.stop();

        const votedPlayers = [...votes]
          .filter(([, id]) => id == target.id)
          .map((vote) => vote[0]);
   if(votes.size == alivePlayers.size){
     console.log("Голосование кончилься")
     i = mentions.length

   }
   if (i == mentions.length - 1) {
    alivePlayers
      .filter((player) => !votes.has(player.id))
      .forEach((player) => {
        votedPlayers.push(player.id);
        votes.set(player.id, target.id);
      });
  }
  const closingEmbed = new MessageEmbed()
        .setTitle("--------------------------------")
        .setDescription(
          `Проголосовавшие: **${
            votedPlayers.map((player) => getNumber(player)).join(", ") || "Нет"
          }**\nВсего голосов: **${votedPlayers.length}**`
        );

        await currentGame.client.channels.cache.get(config.gameChannel).send({embeds: [closingEmbed]});
        const logchan = currentGame.client.channels.cache.get('1086718359741153280')
        if (i != mentions.length - 1) {
          await countdown(logchan, 4000);
        }
      }
      const voteCounts = alivePlayers.map((player) => {
        const voteCount = [...votes].filter((vote) => vote[1] == player.id).length;
  
        return [player, voteCount];
      });

      const [maxVotedPlayer, maxVotes] = voteCounts.sort((a, b) => b[1] - a[1])[0];

      const isDraw = voteCounts.filter((voteCount) => voteCount[1] == maxVotes).length > 1;
  
      const endEmbed = new MessageEmbed().setTitle("Голосование окончено");
  
      if (isDraw) {
        endEmbed.setDescription(
          `По итогам голосования в городе объявляется **автокатастрофа**!`
        );
      } else {
        endEmbed.setDescription(
          `По итогам голосования город покидает игрок **${getNumber(maxVotedPlayer.id)}**!`
        );
      }
  
      const finalVotes = new Map(votes);
  
      alivePlayers
        .filter((player) => !votes.has(player.id))
        .forEach((player) => finalVotes.set(player.id, mentions[mentions.length - 1].id));
  
      endEmbed.addField(
        "Голоса",
        [...finalVotes]
          .map(
            ([playerId, targetId]) => `\`Игрок ${getNumber(playerId)} голосовал в   ${getNumber(targetId)} \``
          )
          .join("\n") || "Нет"
      );
  
  
      await currentGame.client.channels.cache.get(config.gameChannel).send({embeds: [endEmbed]});




    }
  }
  })
votetwoCollector.on('collect', async interaction => {
    if (interaction.customId == "votetwo") {
     if (interaction.member.user.id == currentGame.host.id || interaction.member.user.id == '900697621251907605') {
      if (!isInProgress()) {
        return;
      }
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

  for (let i = 0; i < mentions.length; i++) {
    const player = mentions[i];

    if (!getPlayers().has(player.id)) {
      return message.reply(`Игрок **${player.username}** не участвует в игре!`);
    }

    if (!getAlivePlayers().has(player.id)) {
      return message.reply(`Игрок **${player.username}** мёртв!`);
    }
  }

  const votes = new Map();
    const alivePlayers = getAlivePlayers();

    const playerNumbers = getGameState().playerNumbers;

    const getNumber = (id) => formatNumber(playerNumbers.get(id));

    const startEmbed = new MessageEmbed()
    .setTitle("Голосование за подъем")
    .setDescription(
      `Поднимаются игроки **${mentions.map((player) => `${getNumber(player.id)}`).join(", ")}.**`
    );

    await currentGame.client.channels.cache.get(config.gameChannel).send({embeds: [startEmbed]});

    await countdown(currentGame.client.channels.cache.get(config.gameChannel), 5000);

    const target = mentions.map((player) => `${getNumber(player.id)}`).join(", ")

    let time = 3;

    const createVoteEmbed = (remainingTime) =>
      new MessageEmbed()
        .setTitle(`Кто за то что бы стол покинули игроки № ${target}`)
        .setDescription(`Осталось времени: **${remainingTime}**`);

        const embedMessage = await currentGame.client.channels.cache.get(config.gameChannel).send({embeds: [createVoteEmbed(time)]});
        const filter = m => { return m.content.trim() == "+" && alivePlayers.has(m.author.id)} 
        const collector = currentGame.client.channels.cache.get(config.gameChannel)
          .createMessageCollector({filter})
          .on("collect", (m) => votes.set(m.author.id));
  
        while (time > 0) {
          wait(1010);
          time--;
  
          await embedMessage.edit({embeds: [createVoteEmbed(time)]});
        }


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

          await currentGame.client.channels.cache.get(config.gameChannel).send({embeds: [closingEmbed]});

          const islow = votes.size <= (alivePlayers.size / 2)
          const ishigh = votes.size > (alivePlayers.size / 2)
          const endEmbed = new MessageEmbed().setTitle("Голосование окончено");

          if (ishigh) {
            endEmbed.setDescription(
              `По итогам голосования город покидают игроки **${target}**!`
      
            );

          } else {
            endEmbed.setDescription(
              `По итогам голосования в городе **никто** не поднимается!`
      
            );
          }

          await currentGame.client.channels.cache.get(config.gameChannel).send({embeds: [endEmbed]});



    
    }
    }
  })
  const rowwe = new MessageActionRow()
  .addComponents(
      new MessageButton()
          .setCustomId('starttimer')
          .setStyle('SUCCESS')
          .setLabel('Старт')
          .setDisabled(false),
      new MessageButton()
          .setCustomId('stoptimer')
          .setStyle('DANGER')
          .setLabel('Стоп'),
      new MessageButton()
          .setCustomId('resetTimer')
          .setStyle('SECONDARY')
          .setLabel('Сброс')
  );

const createTimerEmbed = (elapsedSeconds = 0) => {
  return new MessageEmbed()
      .setTitle('Секундомер')
      .setDescription(`Прошло времени: **${elapsedSeconds}** секунд.`);
};

const initialEmbed = new MessageEmbed()
  .setTitle('Секундомер')
  .setDescription('Нажмите старт для начала секундомера.');

const timerr = await channel.send({ embeds: [initialEmbed], components: [rowwe] });

let startTime;
let interval;
let ti = false;
let elapsedSeconds = 0;

const timerCollector = timerr.createMessageComponentCollector((i,u) => i.customId === 'starttimer');
const timerStopCollector = timerr.createMessageComponentCollector((i,u) => i.customId === 'stoptimer');
const timerResetCollector = timerr.createMessageComponentCollector((i,u) => i.customId === 'resetTimer');

// Обработчик для кнопки старта
timerCollector.on('collect', async interaction => {
  if (interaction.customId === "starttimer") {
      if (interaction.member.user.id === currentGame.host.id || interaction.member.user.id === '900697621251907605') {
          await interaction.deferUpdate();

          if (!ti) {
              ti = true;
              startTime = Date.now();

              interval = setInterval(() => {
                  elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
                  timerr.edit({ embeds: [createTimerEmbed(elapsedSeconds)] }).catch((e) => {
                      console.log(e);
                      clearInterval(interval);
                      ti = false;
                  });

                  // Если прошло более 60 секунд, останавливаем таймер
                  if (elapsedSeconds >= 60) {
                      clearInterval(interval);
                      ti = false;
                      timerr.edit({ embeds: [createTimerEmbed(elapsedSeconds)] });
                  }
              }, 1000);
          }
      }
  }
});

// Обработчик для кнопки остановки
timerStopCollector.on('collect', async interaction => {
  if (interaction.customId === "stoptimer") {
      if (interaction.member.user.id === currentGame.host.id || interaction.member.user.id === '900697621251907605') {
          clearInterval(interval);
          ti = false;
          await interaction.deferUpdate();
          timerr.edit({ embeds: [createTimerEmbed(elapsedSeconds)] });
      }
  }
});

// Обработчик для кнопки сброса
timerResetCollector.on('collect', async interaction => {
  if (interaction.customId === "resetTimer") {
      if (interaction.member.user.id === currentGame.host.id || interaction.member.user.id === '900697621251907605') {
          clearInterval(interval);
          ti = false;
          elapsedSeconds = 0;
          await interaction.deferUpdate();
          timerr.edit({ embeds: [initialEmbed] });
      }
  }
});



};

const mayak = async (message) => {
  if (!isInProgress()) {
    return;
  }
  console.log(currentGame.day)
  if(message.channel.type != "DM") return
  if (!currentGame.alivePlayers.has(message.author.id)) {
    return;
  }
  const tes = gameRoles[currentGame.playerRoles.get(message.author.id)];
  console.log(tes.name)
  if(tes.name === "Мирный"){


    return message.reply({content:`У Вас не активная роль!!!`})
  }
  if(currentGame.state == "night" || currentGame.state == "dogovorka"  ){
    return message.reply({content:`Невозможно подмигивать ночью`})
  }

const mayaks = currentGame.playerMayaks.get(message.author.id)
if(mayaks >= 1){
  return message.reply({content:`Вы не можете больше подмигивать`})
}
    const players = [...currentGame.playerNumbers.entries()]
    .sort((a, b) => a[1] - b[1])
    .map((v) => currentGame.sortedMembers.get(v[0]));
  console.log([...players.values()][0])
  const { MessageActionRow, MessageSelectMenu} = require("discord.js");
  const row = new MessageActionRow()
  .addComponents(
    new MessageSelectMenu()
      .setCustomId('mayak')
      .setPlaceholder('Выберите игрока кому подмигнуть')
      .setMaxValues(1)
      .addOptions([
        {
          description: [...players.values()][0].user.username,
          label: `01`,
          value: [...players.values()][0].id,
        },
        {
          description: [...players.values()][1].user.username,
          label: `02`,
          value: [...players.values()][1].id,
        },
        
        {
          description: [...players.values()][2].user.username,
          label: `03`,
          value: [...players.values()][2].id,
        },
        
        {
          description: [...players.values()][3].user.username,
          label: `04`,
          value: [...players.values()][3].id,
        },
        
        {
          description: [...players.values()][4].user.username,
          label: `05`,
          value: [...players.values()][4].id,
        },
        {
          description: [...players.values()][5].user.username,
          label: `06`,
          value: [...players.values()][5].id,
        },
        {
          description: [...players.values()][6].user.username,
          label: `07`,
          value: [...players.values()][6].id,
        },
        {
          description: [...players.values()][7].user.username,
          label: `08`,
          value: [...players.values()][7].id,
        },
        {
          description: [...players.values()][8].user.username,
          label: `09`,
          value: [...players.values()][8].id,
        },
        {
          description: [...players.values()][9].user.username,
          label: `10`,
          value: [...players.values()][9].id,
        },


      ]),
      );
      await message.channel.send({components: [row]})
      const filter = (interaction) => interaction.isSelectMenu()

const collector = message.channel.createMessageComponentCollector({
  filter,
  max: "1",
  time: 20000
  });

  collector.on(`collect`, async (collected) => {
    if(collected.values.length == 1){
      const value = collected.values[0]
     const val = currentGame.sortedMembers.get(value)
     console.log(message)
    val.send({embeds: [ new MessageEmbed()
      .setDescription(`Вам подмигнул игрок под номером ${currentGame.playerNumbers.get(message.author.id)} 😉`)
    ]})
    const mayaks = (currentGame.playerMayaks.get(message.author.id) || 0) + 1;
    currentGame.playerMayaks.set(message.author.id, mayaks);
    message.author.send({content:`Вы успешно подмигнули игроку ${currentGame.playerNumbers.get(value)}`})
    currentGame.host.send({content:`Игрок под номером ${currentGame.playerNumbers.get(message.author.id)} подмигнул игроку номер ${currentGame.playerNumbers.get(value)}`})
    }
  
  })

};
const stuk = async (message, rawArrow,amount) => {
  if (!isInProgress()) {
    return;
  }
  if(message.channel.type != "DM") return
  if (!currentGame.alivePlayers.has(message.author.id)) {
    return;
  }
  const tes = gameRoles[currentGame.playerRoles.get(message.author.id)];
  console.log(tes.name)
 
  if(currentGame.state == "night" || currentGame.state == "dogovorka"  ){
    return message.reply({content:`Невозможно стучать ночью`})
  }
 
const stuks = currentGame.playerStuks.get(message.author.id)

    const players = [...currentGame.playerNumbers.entries()]
    .sort((a, b) => a[1] - b[1])
    .map((v) => currentGame.sortedMembers.get(v[0]));
  console.log([...players.values()][0])

const arrow = rawArrow
const numb = currentGame.playerNumbers.get(message.author.id)
const startingvalue = numb - Number(1)
function getKey(map, input) {
  for (let [key, value] of map.entries()) {
     if (value === input) {
       return key;
     }
  }
  
  return "Not found";
}
const leftarr = currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, numb + Number(1)))
const rightarr = currentGame.sortedMembers.get(getKey(currentGame.playerNumbers, numb - Number(1)))
console.log(leftarr)
if(arrow == 'l' || arrow == 'L' ) {
  if(numb == 10) {
    return message.reply({content: 'Вы не можете стучать влево, сидя на 10 боксе'})
 }
  if(!currentGame.alivePlayers.has(leftarr.user.id)) {
    return message.reply({content: 'Слева нет игрока!'})
  }
  
  else{
    const val = currentGame.sortedMembers.get(leftarr.user.id)
    val.send({embeds: [ new MessageEmbed()
      .setDescription(`Вам отстучал игрок **справа** ${amount} раз`)
    ]})
    message.reply({content: 'Вы успешно отстучали игроку слева!'})

    const stuks = (currentGame.playerStuks.get(message.author.id) || 0) + 1;
    currentGame.playerStuks.set(message.author.id, stuks);

    currentGame.host.send({content:`Игрок под номером ${currentGame.playerNumbers.get(message.author.id)} отстучал влево ${amount} раз`})

  }
}
if(arrow == 'R' || arrow == 'r' ) {
  if(numb == 1) {
    return message.reply({content: 'Вы не можете стучать вправо, сидя на 1 боксе'})
 }
  if(!currentGame.alivePlayers.has(rightarr.user.id)) {
    return message.reply({content: 'Справа нет игрока!'})
  }
 
  else{
    const val = currentGame.sortedMembers.get(rightarr.user.id)
    val.send({embeds: [ new MessageEmbed()
      .setDescription(`Вам отстучал игрок **слева** ${amount} раз(а)`)
    ]})
    message.reply({content: 'Вы успешно отстучали игроку справа!'})

    const stuks = (currentGame.playerStuks.get(message.author.id) || 0) + 1;
    currentGame.playerStuks.set(message.author.id, stuks);


    currentGame.host.send({content:`Игрок под номером ${currentGame.playerNumbers.get(message.author.id)} отстучал вправо ${amount} раз`})

  }
}



};


const fixx = async () => {
  currentGame.bestMove = undefined
}

const mvp = async (player) => {
  currentGame.mvp = currentGame.guild.members.cache.get(player.id)
}


const give = async (player) =>{
  console.log(`33444555666`, currentGame.host)
  const pl = currentGame.guild.members.cache.get(player.id)
  const hos = currentGame.guild.members.cache.get(currentGame.host.id)
  hos.roles.remove(`1027830449332035675`)
  currentGame.host = player
  pl.roles.add(`1027830449332035675`)
  const giveEmbed = new MessageEmbed()
  .setTitle(`**Передача стола**`)
  .setDescription(`**Стол был передан новому ведущему ${player}`)

  currentGame.client.channels.cache.get(config.gameChannel).send({embeds: [giveEmbed]});

}


const fixxr = async (player) => {
  const member = currentGame.guild.members.cache.get(player.id)
  currentGame.sortedMembers.set(player.id, member)
}

const test = async (message) => {
  const { MessageActionRow, MessageSelectMenu} = require("discord.js");

  if(message.channel.type != "DM") return
  const row = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setCustomId(`one`)
    .setStyle(`PRIMARY`)
    .setLabel(`1`)
  )
  .addComponents(
    new MessageButton()
    .setCustomId(`two`)
    .setStyle(`PRIMARY`)
    .setLabel(`2`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`three`)
    .setStyle(`PRIMARY`)
    .setLabel(`3`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`four`)
    .setStyle(`PRIMARY`)
    .setLabel(`4`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`five`)
    .setStyle(`PRIMARY`)
    .setLabel(`5`)

  )
  const rowtwo = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setCustomId(`six`)
    .setStyle(`SECONDARY`)
    .setLabel(`6`)
    .setDisabled(true)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`seven`)
    .setStyle(`PRIMARY`)
    .setLabel(`7`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`eight`)
    .setStyle(`PRIMARY`)
    .setLabel(`8`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`nine`)
    .setStyle(`PRIMARY`)
    .setLabel(`9`)

  )
  .addComponents(
    new MessageButton()
    .setCustomId(`ten`)
    .setStyle(`PRIMARY`)
    .setLabel(`10`)

  )

  const testembed = () => new MessageEmbed()
  .setTitle(`Выберите карту`)
const mss = await message.channel.send({embeds: [testembed()], components: [row, rowtwo]})

const hasHostPermissions = (user) =>
user.id == message.member.id || owners.includes(user.id);
const oneCollector = mss.createMessageComponentCollector((i, u) =>
i.customId == 'one' && hasHostPermissions(u)
);
const twoCollector = mss.createMessageComponentCollector((i, u) =>
i.customId == 'two' && hasHostPermissions(u)
);
const threeCollector = mss.createMessageComponentCollector((i, u) =>
i.customId == 'three' && hasHostPermissions(u)
);
const fourCollector = mss.createMessageComponentCollector((i, u) =>
i.customId == 'four' && hasHostPermissions(u)
);

const fiveCollector = mss.createMessageComponentCollector((i, u) =>
i.customId == 'five' && hasHostPermissions(u)
);

oneCollector.on('collect', async interaction => {

  if (interaction.customId == "one") {

    row.components[0].setStyle(`SECONDARY`)
    row.components[0].setEmoji(`991262083641511966`)
    row.components[0].setDisabled(false)
    row.components[1].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  }
 
})
twoCollector.on('collect', async interaction => {

  if (interaction.customId == "two") {

    row.components[1].setStyle(`DANGER`)
    row.components[1].setEmoji(`996094869812559883`)

    row.components[1].setDisabled(false)
    row.components[0].setDisabled(true)
    row.components[2].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  }
 
})

threeCollector.on('collect', async interaction => {

  if (interaction.customId == "three") {
    row.components[2].setStyle(`SECONDARY`)
    row.components[2].setEmoji(`994888190332776459`)
    row.components[2].setDisabled(false)
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[3].setDisabled(true)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  }
 
})
fourCollector.on('collect', async interaction => {

  if (interaction.customId == "four") {

    row.components[3].setEmoji(`994888188546007050`)
    row.components[3].setStyle(`DANGER`)
    row.components[2].setDisabled(true)
    row.components[0].setDisabled(true)
    row.components[1].setDisabled(true)
    row.components[3].setDisabled(false)
    row.components[4].setDisabled(true)
    rowtwo.components[0].setDisabled(true)
    rowtwo.components[1].setDisabled(true)
    rowtwo.components[2].setDisabled(true)
    rowtwo.components[3].setDisabled(true)
    rowtwo.components[4].setDisabled(true)
    oneCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
  }
 
})
fiveCollector.on('collect', async interaction => {
if (interaction.customId == "five") {

  row.components[4].setStyle(`DANGER`)
  row.components[4].setEmoji(`991268575274872932`)
  row.components[0].setDisabled(true)
  row.components[1].setDisabled(true)
  row.components[2].setDisabled(true)
  row.components[3].setDisabled(true)
  row.components[4].setDisabled(false)
  rowtwo.components[0].setDisabled(true)
  rowtwo.components[1].setDisabled(true)
  rowtwo.components[2].setDisabled(true)
  rowtwo.components[3].setDisabled(true)
  rowtwo.components[4].setDisabled(true)
  oneCollector.stop();
interaction.update({components: [row, rowtwo]}).catch((e) => {console.log(e)})
}
})

}
/*const member = message.guild.members.cache.get(interaction.member.user.id)
players.set(interaction.member.user.id, member);*/

const getFirstVictim = () => currentGame && currentGame.firstVictim;

const getGameState = () => currentGame;

const setGameState = (gameState) => (currentGame = gameState);

module.exports = {
  isInProgress,
  start,
  getState,
  setDay,
  setNight,
  stop,
  finish,
  kill,
  getPlayers,
  getAlivePlayers,
  addFaul,
  addBons,
  removeFaul,
  pause,
  unpause,
  accord,
  starting,
  getFirstVictim,
  bestMove,
  fixx,
  fixxr,
  getGameState,
  setGameState,
  addWarn,
  removeWarn,
  resurrect,
  updateNickname,
  emoji,
  mayak,
  tesssst,
  give,
  hoss,
  mvp,
  te,
  stuk,
  deletePlayerMessages,
};
