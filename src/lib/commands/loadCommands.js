const requireAll = require("require-all");
const { Collection } = require("discord.js");

module.exports = function loadCommands(dirname) {
  const commands = Object.values(requireAll({ dirname }));

  const commandCollection = new Collection();

  commands.forEach(command => commandCollection.set(command.name, command));

  return commandCollection;
};
