const { parseCommand } = require("rich-commands");

const game = require("../game/game");

const { getConfig } = require("../../util/config");

module.exports = function handleCommand(message) {
  if (message.author.bot || message.system) {
    return;
  }

  const { prefix, owners, hostRole } = getConfig();

  if (!message.content.startsWith(prefix)) {
    return;
  }

  const parsedCommand = parseCommand(message.content.slice(prefix.length), {
    flagMarkers: [/-(?!\d)-?/]
  });

  if (!parsedCommand) {
    return;
  }

  const command = message.client.commands.get(parsedCommand.name);

  if (!command) {
    return;
  }

  if (command.guildOnly && !message.guild) {
    return message.reply({content:"Эту команду можно использовать только на сервере!"});
  }

  const isOwner = owners.includes(message.author.id);
  const isHost = message.guild && message.member.roles.cache.has(hostRole);

  if (command.ownerOnly && !isOwner) {
    return message.reply({content:"У вас недостаточно прав!"});
  }

  if (command.hostOnly && !isHost && !isOwner) {
    return message.reply({content:"У вас недостаточно прав!"});
  }

  if (command.inGameOnly) {
    if (!game.isInProgress()) {
      return message.reply({content:"Игра не начата!"});
    }

    if (message.author.id != game.getGameState().host.id && !isOwner) {
      return message.reply({content: "Не ты сейчас ведущий, пішов звідси розбійник!"});
    }
  }

  if (command.notInGameOnly && game.isInProgress()) {
    return message.reply({content:"Сначала необходимо закончить текущую игру!"});
  }

  if (command) command.run(message, parsedCommand);

  const keep = Boolean(parsedCommand.flags.k || parsedCommand.flags.keep);


};
