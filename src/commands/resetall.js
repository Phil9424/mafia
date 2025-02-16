const { MessageEmbed } = require("discord.js");

const User = require("../models/User");

module.exports = {
  name: "resetall",
  description: "Обнуляет статистику",
  format: "ывава",
  ownerOnly: true,
  async run(message ) {
   

    const user = message.author

    if (!user) {
      message.reply("Пользователь не найден!");
      return;
    }
   const embed = await message.channel.send({embeds: [
        new MessageEmbed()
         
        .setTitle(`Обнуление`)
        .setDescription(`Сезон Обнуляется`)
  
      ]})

    const allUsers = await User.findAll({
      });



      
        allUsers.forEach((userData) => {

            setTimeout(() => 
            {
            userData.gameCount = 0;
            userData.hostedGameCount = 0;
            userData.mafWins = 0;
            userData.mirWins = 0;
            userData.donWins = 0;
            userData.copWins = 0;
            userData.mafLose = 0;
            userData.mirLose = 0;
            userData.donLose = 0;
            userData.copLose = 0;
            userData.last = 0;
            userData.lastrole = 0;
            userData.record = 0;
            userData.streak = 0;
            userData.bestMoveScores = 0;
            userData.finescores = 0;
            userData.tourRating = 0;
            userData.bestMove2Count = 0;
            userData.bestMove3Count = 0;
            userData.firstVictimCount = 0;
            userData.lowprior = null;
            userData.lowpriorcheck = false;
            userData.lowcount = 0;
            userData.shoot = 0;
            userData.ban = null;
        
            userData.bancheck = false;
            userData.one = 0;
            userData.two = 0;
            userData.three = 0;
            userData.four = 0;
            userData.five = 0;
            userData.six = 0;
            userData.cardone = 0;
            userData.cardtwo = 0;
            userData.cardthree = 0;
            userData.cardfour = 0;
            userData.cardfive = 0;
            userData.cardsix = 0;
            userData.cardseven = 0;
            userData.cardeight = 0;
            userData.cardnine = 0;
            userData.cardten = 0;
        
            userData.onedop = 0;
            userData.twodop = 0;
            userData.threedop = 0;
            userData.fourdop = 0;
            userData.onepts = 0;
            userData.twopts = 0;
            userData.threepts = 0;
            userData.fourpts = 0;
        
            userData.lastpts = 0;
            userData.lastptse = 0;
        
            userData.bonusScores = 1500
            userData.save();
        }
           , 5000);

              }
              );
    

    

    await embed.edit({embeds: [
      new MessageEmbed()
       
      .setTitle(`Обнуление`)
      .setDescription(`Сезон обнулен`)

    ]}
    );
  }
};
