const { MessageEmbed, ReactionCollector, MessageSelectMenu, Collection, MessageActionRow, MessageButton, Modal, TextInputComponent } = require("discord.js");

module.exports = {
    name: "result",
    description: "make result",
    inGameOnly: false,
    hostOnly: false,
    async  run(message) {



        if(message.member.roles.cache.has('975644323116900383')){




          


const choose = new MessageEmbed()
.setDescription(`Нажмите на галку, чтобы продолжить!`)

const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('vybor')
          .setStyle('SUCCESS')
          .setEmoji('<:vote:1094308504665337876>')
          .setDisabled(false),
      )
const musicMessage = await message.channel.send({embeds: [choose], components: [row]})

const musicCollector = await musicMessage.createMessageComponentCollector((i) =>
      i.customId == 'choose' && i.member.user.id == message.member.user.id
    );


    musicCollector.on('collect', async interaction => {
      if (interaction.customId == "vybor") {


const fields = {
   age: new TextInputComponent()
    .setCustomId(`age`)
    .setLabel(`Опишите, что случилось на игре.`)
    .setStyle(`PARAGRAPH`)
    .setRequired(true)
    .setPlaceholder(`youtu.be/Описание`)
}

		const modal = new Modal()
.setCustomId('myModal')
			.setTitle('Результат игры')
		.setComponents(
          new MessageActionRow().setComponents(fields.age)

    )

   
		await interaction.showModal(modal);


const submitted = await interaction.awaitModalSubmit({
  // Timeout after a minute of not receiving any valid Modals
  time: 15000,
  // Make sure we only accept Modals from the User who sent the original Interaction we're responding to
  filter: i => i.user.id === interaction.user.id,
}).catch(error => {
  // Catch any Errors that are thrown (e.g. if the awaitModalSubmit times out after 60000 ms)
  console.error(error)
  return null
})

console.log(submitted)
if (submitted) {
  const [ age ] = Object.keys(fields).map(key => submitted.fields.getTextInputValue(fields[key].customId))
 await message.client.guilds.cache.get(`959870711680364564`).channels.cache.get(`975453637608374323`).send(age)
 await message.channel.send(age)
}

      }

    })
        }

        else {
           return message.channel.send(`У Вас недостаточно прав!`)
        }
}
}