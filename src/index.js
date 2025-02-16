require('dotenv').config();

if (process.env.NODE_ENV == "production") {
  process.on("unhandledRejection", (reason) => {
    console.error(`Unhandled promise rejection: ${reason}\nStack: ${reason.stack}`);
  });

  process.on("uncaughtException", (error) => {
    console.error(`Uncaught exception: ${error}\nStack: ${error.stack}`);
  });
}

const { Client, Intents } = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { getConfig } = require("./util/config");
const allowedRoleId = '1027830449332035675';

const { token } = getConfig();

const loadEventHandlers = require("./lib/events/loadEventHandlers");
const loadCommands = require("./lib/commands/loadCommands");

const dbinit = require("./dbinit");


(async () => {
  const client = new Client({ intents: ["GUILDS",
    "GUILD_MEMBERS",
    "GUILD_BANS",
    "GUILD_EMOJIS_AND_STICKERS",
    "GUILD_INTEGRATIONS",
    "GUILD_WEBHOOKS",
    "GUILD_INVITES",
    "GUILD_VOICE_STATES",
    "GUILD_PRESENCES",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING"], partials: ["CHANNEL", "MESSAGE"] });

 
    const commands = [
      {
        name: 'Сбросить никнейм',
        type: 2, // 2 - это тип для контекстного меню на пользователя (USER)
      },
    ];
    const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
const rest = new REST({ version: '9' }).setToken(token);

    await rest.put(
      Routes.applicationGuildCommands('926165063482605608', '959870711680364564'),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
client.on('interactionCreate', async interaction => {
  if (!interaction.isContextMenu()) return;

  // Проверяем, что команда это "Сбросить никнейм"
  if (interaction.commandName === 'Сбросить никнейм') {
    const member = await interaction.guild.members.fetch(interaction.targetId); // Получаем целевого пользователя
    const executor = interaction.member; // Получаем того, кто вызвал команду
    if (!executor.roles.cache.has(allowedRoleId)) {
      return interaction.reply({ content: 'У вас нет прав для использования этой команды.', ephemeral: true });
    }
    try {
      // Сбрасываем никнейм пользователя
      await member.setNickname(null);
      await interaction.reply({ content: `Никнейм пользователя ${member.user.username} был сброшен.`, ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: `Не удалось сбросить никнейм пользователя ${member.user.username}.`, ephemeral: true });
    }
  }
});

  client.commands = loadCommands(`${__dirname}/commands`);

  loadEventHandlers(`${__dirname}/events`, client);

  client.sequelize = await dbinit();

  client.emit("sync");


  client.login(token).then(() => console.log(`Logged in as ${client.user.tag}`));
})();
