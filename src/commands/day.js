const game = require("../lib/game/game");

module.exports = {
  name: "d",
  description: "Устанавливает день в игре",
  hostOnly: true,
  inGameOnly: true,
  run(message, client) {
    if (game.getState() == "day") {
      message.reply("В игре уже день!");
      return;
    }

    message.channel.messages.fetch({}).then((messages) => { 
      const botMessages = [];
      messages.filter(m => m.author.id !== '926165063482605608').forEach(msg => botMessages.push(msg))
      
if(botMessages.length){
       message.channel.bulkDelete(botMessages).catch(e => console.log(e))
}
      });
  




    game.setDay();
  },
};
