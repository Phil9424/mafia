const game = require("../lib/game/game");


module.exports = {
  name: "m",
  description: "Маяк игроку",

  async run(message) {
const inf = game.isInProgress()
if (!inf) {
 return message.reply({content: `Игра не начата`})
}
    /* message.reply({content: `Данный функционал был отключен. Не просите вернуть!`})
      return;
      
    */
    
 game.mayak(message)
   }
   }
