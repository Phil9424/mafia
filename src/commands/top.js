
const { MessageEmbed } = require("discord.js");
const { Op } = require("sequelize");
const Canvas = require('canvas');
const { registerFont, createCanvas } = require('canvas')
const Discord = require('discord.js');
const { weirdToNormalChars } = require('weird-to-normal-chars');

const User = require("../models/User");
const GlobalStats = require("../models/GlobalStats");

const computeUserRating = require("../lib/game/computeUserRating");

const { statsChannels, calibrationGameCount } = require("../util/config").getConfig();

module.exports = {
  name: "top",
  description: "Отображает топ пользователей по рейтингу",
  async run(message) {
    if (!statsChannels.includes(message.channel.id)) {
      return;
    }

    const globalStats = await GlobalStats.get();
    const allUsers = await User.findAll({
      where: { ignore: false, gameCount: { [Op.gte]: calibrationGameCount } }
    });

    const ratings = new Map();

    allUsers.forEach((userData) =>
      ratings.set(userData.id, userData.bonusScores)
    );

    const topUsers = allUsers
      .sort((a, b) => ratings.get(b.id) - ratings.get(a.id))
      .slice(0, Math.min(allUsers.length, 20 + 1));


      const canvas = Canvas.createCanvas(1600, 1200);
      const ctx = canvas.getContext('2d');
      registerFont('src/commands/neo.otf', { family: 'neo' })
      const background = await Canvas.loadImage('src/commands/444.png')
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
          const www = new Array(...topUsers);
       
        
if(www[0] !== undefined) {
  
  ctx.textAlign = "center"
  ctx.fillStyle = '#85d994';
  ctx.font = `48px neo`;
  ctx.fillText(`${weirdToNormalChars(message.client.users.cache.get(www[0].id).username)}`, 530, 260)
        
    
  ctx.textAlign = "Left"
  ctx.fillStyle = '#85d994';
  ctx.font = `48px neo`;
  ctx.fillText(`1st`, 150, 260)
       

          ctx.textAlign = "right"
          ctx.fillStyle = '#85d994';
          ctx.font = `48px neo`;
          ctx.fillText(`${ratings.get(www[0].id).toFixed(0)}`, 970, 260)
  
          ctx.textAlign = "center"
          ctx.fillStyle = '#85d994';
          ctx.font = `56px neo`;
          ctx.fillText(`${www[0].gameCount}`, 1340, 791)

          const totalWins = www[0].mirWins + www[0].mafWins + www[0].donWins + www[0].copWins
          const winRate = Math.floor((totalWins / www[0].gameCount) * 100)
          ctx.textAlign = "center"
          ctx.fillStyle = '#85d994';
          ctx.font = `56px neo`;
          ctx.fillText(`${winRate}%`, 1340, 957)
  
          ctx.textAlign = "center"
          ctx.fillStyle = '#85d994';
          ctx.font = `56px neo`;
          ctx.fillText(`${ratings.get(www[0].id).toFixed(0)}`, 1340, 1120)

          const ava = await Canvas.loadImage(message.client.guilds.cache.get('959870711680364564').members.cache.get(`${www[0].id}`).user.avatarURL({ format: 'png' }))

          ctx.drawImage(ava, 1186, 212, 307, 307)
          
}        
if(www[1] !== undefined) {
  
  ctx.textAlign = "center"
  ctx.fillStyle = '#ffffff';
  ctx.font = `48px neo`;
  ctx.fillText(`${weirdToNormalChars(message.client.users.cache.get(www[1].id).username)}`, 530, 355)
        
    
  ctx.textAlign = "Left"
  ctx.fillStyle = '#ffffff';
  ctx.font = `48px neo`;
  ctx.fillText(`2nd`, 150, 355)
       

          ctx.textAlign = "right"
          ctx.fillStyle = '#ffffff';
          ctx.font = `48px neo`;
          ctx.fillText(`${ratings.get(www[1].id).toFixed(0)}`, 970, 355)
}        
if(www[2] !== undefined) {
  
  ctx.textAlign = "center"
  ctx.fillStyle = '#ffffff';
  ctx.font = `48px neo`;
  ctx.fillText(`${weirdToNormalChars(message.client.users.cache.get(www[2].id).username)}`, 530, 448)
        
    
  ctx.textAlign = "Left"
  ctx.fillStyle = '#ffffff';
  ctx.font = `48px neo`;
  ctx.fillText(`3rd`, 150, 448)
       

          ctx.textAlign = "right"
          ctx.fillStyle = '#ffffff';
          ctx.font = `48px neo`;
          ctx.fillText(`${ratings.get(www[2].id).toFixed(0)}`, 970, 448)
}    
if(www[3] !== undefined) {
  
  ctx.textAlign = "center"
  ctx.fillStyle = '#ffffff';
  ctx.font = `48px neo`;
  ctx.fillText(`${weirdToNormalChars(message.client.users.cache.get(www[3].id).username)}`, 530, 542)
        
    
  ctx.textAlign = "Left"
  ctx.fillStyle = '#ffffff';
  ctx.font = `48px neo`;
  ctx.fillText(`4th`, 150, 542)
       

          ctx.textAlign = "right"
          ctx.fillStyle = '#ffffff';
          ctx.font = `48px neo`;
          ctx.fillText(`${ratings.get(www[3].id).toFixed(0)}`, 970, 542)
}  
if(www[4] !== undefined) {
  
  ctx.textAlign = "center"
  ctx.fillStyle = '#ffffff';
  ctx.font = `48px neo`;
  ctx.fillText(`${weirdToNormalChars(message.client.users.cache.get(www[4].id).username)}`, 530, 636)
        
    
  ctx.textAlign = "Left"
  ctx.fillStyle = '#ffffff';
  ctx.font = `48px neo`;
  ctx.fillText(`5th`, 150, 636)
       

          ctx.textAlign = "right"
          ctx.fillStyle = '#ffffff';
          ctx.font = `48px neo`;
          ctx.fillText(`${ratings.get(www[4].id).toFixed(0)}`, 970, 636)
}  
if(www[5] !== undefined) {
  
  ctx.textAlign = "center"
  ctx.fillStyle = '#ffffff';
  ctx.font = `48px neo`;
  ctx.fillText(`${weirdToNormalChars(message.client.users.cache.get(www[5].id).username)}`, 530, 727)
        
    
  ctx.textAlign = "Left"
  ctx.fillStyle = '#ffffff';
  ctx.font = `48px neo`;
  ctx.fillText(`6th`, 150, 727)
       

          ctx.textAlign = "right"
          ctx.fillStyle = '#ffffff';
          ctx.font = `48px neo`;
          ctx.fillText(`${ratings.get(www[5].id).toFixed(0)}`, 970, 727)
}
if(www[6] !== undefined) {
  
  ctx.textAlign = "center"
  ctx.fillStyle = '#ffffff';
  ctx.font = `48px neo`;
  ctx.fillText(`${weirdToNormalChars(message.client.users.cache.get(www[6].id).username)}`, 530, 820)
        
    
  ctx.textAlign = "Left"
  ctx.fillStyle = '#ffffff';
  ctx.font = `48px neo`;
  ctx.fillText(`7th`, 150, 820)
       

          ctx.textAlign = "right"
          ctx.fillStyle = '#ffffff';
          ctx.font = `48px neo`;
          ctx.fillText(`${ratings.get(www[6].id).toFixed(0)}`, 970, 820)
}  

if(www[7] !== undefined) {
  
  ctx.textAlign = "center"
  ctx.fillStyle = '#ffffff';
  ctx.font = `48px neo`;
  ctx.fillText(`${weirdToNormalChars(message.client.users.cache.get(www[7].id).username)}`, 530, 912)
        
    
  ctx.textAlign = "Left"
  ctx.fillStyle = '#ffffff';
  ctx.font = `48px neo`;
  ctx.fillText(`8th`, 150, 912)
       

          ctx.textAlign = "right"
          ctx.fillStyle = '#ffffff';
          ctx.font = `48px neo`;
          ctx.fillText(`${ratings.get(www[7].id).toFixed(0)}`, 970, 912)
} 
if(www[8] !== undefined) {
  
  
  ctx.textAlign = "center"
  ctx.fillStyle = '#ffffff';
  ctx.font = `48px neo`;
  ctx.fillText(`${weirdToNormalChars(message.client.users.cache.get(www[8].id).username)}`, 530, 1007)
        
    
  ctx.textAlign = "Left"
  ctx.fillStyle = '#ffffff';
  ctx.font = `48px neo`;
  ctx.fillText(`9th`, 150, 1007)
       

          ctx.textAlign = "right"
          ctx.fillStyle = '#ffffff';
          ctx.font = `48px neo`;
          ctx.fillText(`${ratings.get(www[8].id).toFixed(0)}`, 970, 1007)
} 
if(www[9] !== undefined) {
  
  ctx.textAlign = "center"
  ctx.fillStyle = '#ffffff';
  ctx.font = `48px neo`;
  ctx.fillText(`${weirdToNormalChars(message.client.users.cache.get(www[9].id).username)}`, 530, 1102)
        
    
  ctx.textAlign = "Left"
  ctx.fillStyle = '#ffffff';
  ctx.font = `48px neo`;
  ctx.fillText(`10th`, 150, 1102)
       

          ctx.textAlign = "right"
          ctx.fillStyle = '#ffffff';
          ctx.font = `48px neo`;
          ctx.fillText(`${ratings.get(www[9].id).toFixed(0)}`, 970, 1102)
} 



   
          
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'top.png');
      message.channel.send({ files: [attachment] });

  
  }
};