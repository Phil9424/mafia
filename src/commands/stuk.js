const game = require("../lib/game/game");


module.exports = {
  name: "s",
  description: "Стук игроку",

  async run(message, { args: [rawArrow, rawAmount] }) {
const inf = game.isInProgress()
if (!inf) {
  return message.reply({content: `Игра не начата`})
}
    /* message.reply({content: `Данный функционал был отключен. Не просите вернуть!`})
      return;
      
    */
    

      console.log(rawArrow)
      console.log(rawAmount)

if(rawArrow != 'L' && rawArrow != 'l' && rawArrow != 'R' && rawArrow != 'r') {

console.log(rawArrow)
    return message.reply({content: 'Направление стука выбирается как R,r = вправо, L,l = влево'})


}
const amount = Number(rawAmount);

if (isNaN(amount)) {
  message.reply("Неверный формат числа!");
  return;
}
if(amount > 10 || amount < 1){
    message.reply("Цифры могут быть от 1 до 10")
    return;
}

 game.stuk(message, rawArrow, amount)
   }
   }
