const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const { Op } = require("sequelize");
const Canvas = require('canvas');
const { registerFont, createCanvas } = require('canvas')
const User = require("../models/User");
const GlobalStats = require("../models/GlobalStats");
const { weirdToNormalChars } = require('weird-to-normal-chars');

const computeUserRating = require("../lib/game/computeUserRating");

const {
  statsChannels,
  calibrationGameCount,
  ratingRoles
} = require("../util/config").getConfig();

module.exports = {
  name: "score",
  description: "Отображает статистику игрока",
  format: "[@пользователь]",
  guildOnly: true,
  async run(message, { args: [rawUser] }) {
    if (!statsChannels.includes(message.channel.id)) {
      return;
    }

    const userMatch = rawUser && rawUser.match(/<@!?(\d+)>/);
    if (rawUser && !userMatch) {
      return message.reply("Пользователь не указан или указан неверно!");
    }

    const user = !rawUser ? message.author : message.client.users.cache.get(userMatch[1]);

    if (!user) {
      message.reply("Пользователь не найден!");
      return;
    }

    const globalStats = await GlobalStats.get();

    const [userData] = await User.findOrBuild({
      where: { id: user.id },
      defaults: { id: user.id }
    });
    const rating = userData.bonusScores
    const allUsers = await User.findAll({
      where: { ignore: false, gameCount: { [Op.gte]: calibrationGameCount } }
    });

    const rank =
      allUsers
        .map((userData) => computeUserRating(userData, globalStats))
        .filter((userRating) => userRating > rating).length + 1;
        const { gameCount } = userData;
        const redWins = userData.mirWins + userData.copWins;
        const blackWins = userData.mafWins + userData.donWins;
        const copWins = userData.copWins
        const copLose = userData.copLose
        const mirWins = userData.mirWins
        const mirLose = userData.mirLose
        const redWinRate = gameCount == 0 ? 0 : Math.floor((redWins / gameCount) * 100);
        const copcount = Math.floor(copWins + copLose)
        const mircount = Math.floor(mirWins + mirLose)
        
        const low = userData.lowcount
        const copWinRate = copcount == 0 ? 0 : Math.floor((copWins / copcount) * 100);
        const donWins = userData.donWins
        const donLose = userData.donLose
        const mafWins = userData.mafWins
        const mafLose = userData.mafLose
        const mafcount = Math.floor(mafWins + mafLose)
        const doncount = Math.floor(donWins + donLose)
        const donWinRate = doncount == 0 ? 0 : Math.floor((donWins / doncount) * 100);
        const mirWinRate = mircount == 0 ? 0 : Math.floor((mirWins / mircount) * 100);
        const mafWinRate = mafcount == 0 ? 0 : Math.floor((mafWins / mafcount) * 100);
        const blackWinRate = gameCount == 0 ? 0 : Math.floor((blackWins / gameCount) * 100);
        const totalWins = redWins + blackWins;
        const winRate = gameCount == 0 ? 0 : Math.floor((totalWins / gameCount) * 100);
        const [userData1] = await User.findOrBuild({
          where: { id: message.author.id },
          defaults: { id: message.author.id }
        });
    const canvas = Canvas.createCanvas(1600, 1200);
    const ctx = canvas.getContext('2d');
    registerFont('src/commands/neo.otf', { family: 'neo' })
    const background = await Canvas.loadImage('src/commands/222.png')
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#85d994';
    ctx.font = `40px neo`;
    ctx.textAlign = "center"
    if (user.username.length > 11) {
      ctx.fillText(`${weirdToNormalChars(user.username.substring(0,11))}...`, 262, 613);}
      else {    ctx.fillText(`${weirdToNormalChars(user.username)} `,  262, 613);
    }   
    const avatar = await Canvas.loadImage(user.avatarURL({ format: 'jpg' }))
console.log(avatar)
    ctx.drawImage(avatar, 103, 242, 310, 311)
    ctx.fillStyle = '#ffffff';
    ctx.font = `60px neo`;
    ctx.textAlign = "center"
    ctx.fillText(`${userData.gameCount}`, 1312, 318, 250, 0);

      ctx.fillStyle = '#ffffff';
    ctx.font = `60px neo`;
    ctx.textAlign = "left"
    ctx.fillText(`${userData.firstVictimCount}`, 220,725 );

   ctx.fillStyle = '#ffffff';
    ctx.font = `60px neo`;
    ctx.textAlign = "left"
    ctx.fillText(`${userData.bestMove2Count}`, 220,837 );

  ctx.fillStyle = '#ffffff';
    ctx.font = `60px neo`;
    ctx.textAlign = "left"
    ctx.fillText(`${userData.bestMove3Count}`, 220,950 );


    ctx.fillStyle = '#ffffff';
    ctx.font = `60px neo`;
    ctx.textAlign = "center"
    ctx.fillText(`${totalWins}`, 1312, 440, 250, 0);
    ctx.fillStyle = '#ffffff';
    ctx.font = `60px neo`;
    ctx.textAlign = "center"
    ctx.fillText(`${winRate}` , 1312, 562, 250, 0);
    ctx.textAlign = "left"
    ctx.fillStyle = '#85d994';
    ctx.font = `80px neo`;
    if (userData.gameCount < calibrationGameCount) {    ctx.fillText(`N/A`, 1220, 950, 170, 0);
  }
  else{
    
    ctx.fillText(`${rating.toFixed(0)}`, 1220, 950, 170, 0);}
    // draw a copWins line

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 20;

    ctx.beginPath();
    ctx.moveTo(500, 328);
    ctx.lineTo(1060, 328);
    ctx.stroke();
    
    let coppercent = (((1060-500)/100) * copWinRate) + 500
    ctx.strokeStyle = 'rgba(133, 217, 148, 0.6)';
    ctx.lineWidth = 20;

    ctx.beginPath();
    ctx.moveTo(500, 328);
    ctx.lineTo(coppercent, 328);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = `40px neo`;
    ctx.textAlign = "center"
    ctx.fillText(`${copWins}`, 1123, 345, 250, 0);


// fin

    // draw a redWins line

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 20;

    ctx.beginPath();
    ctx.moveTo(500, 414);
    ctx.lineTo(1060, 414);
    ctx.stroke();
    let redpercent = (((1060-500)/100) * mirWinRate) + 500
    ctx.strokeStyle = 'rgba(133, 217, 148, 0.6)';
    ctx.lineWidth = 20;

    ctx.beginPath();
    ctx.moveTo(500, 414);
    ctx.lineTo(redpercent, 414);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = `40px neo`;
    ctx.textAlign = "center"
    ctx.fillText(`${mirWins}`, 1123, 431, 250, 0);

// fin
    // draw a DonWins line

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 20;

    ctx.beginPath();
    ctx.moveTo(500, 500);
    ctx.lineTo(1060, 500);
    ctx.stroke();
    let donpercent = (((1060-500)/100) * donWinRate) + 500
    ctx.strokeStyle = 'rgba(133, 217, 148, 0.6)';
    ctx.lineWidth = 20;

    ctx.beginPath();
    ctx.moveTo(500, 500);
    ctx.lineTo(donpercent, 500);
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = `40px neo`;
    ctx.textAlign = "center"
    ctx.fillText(`${donWins}`, 1123, 517, 250, 0);

// fin
    // draw a mafwins line

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 20;

    ctx.beginPath();
    ctx.moveTo(500, 586);
    ctx.lineTo(1060, 586);
    ctx.stroke();
    let mafpercent = (((1060-500)/100) * mafWinRate) + 500
    ctx.strokeStyle = 'rgba(133, 217, 148, 0.6)';
    ctx.lineWidth = 20;

    ctx.beginPath();
    ctx.moveTo(500, 586);
    ctx.lineTo(mafpercent, 586);
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = `40px neo`;
    ctx.textAlign = "center"
    ctx.fillText(`${mafWins}`, 1123, 603, 250, 0);

// fin
    // draw a low line

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 20;

    ctx.beginPath();
    ctx.moveTo(500, 672);
    ctx.lineTo(1060, 672);
    ctx.stroke();
    let lp = (((1060-500)/100) * ((Date.now()*100)/userData.prior)) + 500
    ctx.strokeStyle = 'rgba(133, 217, 148, 0.6)';
    ctx.lineWidth = 20;

    ctx.beginPath();
    ctx.moveTo(500, 586);
    ctx.lineTo(lp, 586);
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = `40px neo`;
    ctx.textAlign = "center"
    ctx.fillText(`${low}`, 1123, 689, 250, 0);

// fin
    // draw a Bpass line

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 20;

    ctx.beginPath();
    ctx.moveTo(500, 758);
    ctx.lineTo(1060, 758);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(500, 586);
    ctx.lineTo(mafpercent, 586);
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = `40px neo`;
    ctx.textAlign = "center"
    ctx.fillText(`0`, 1123, 775, 250, 0);

// fin
console.log(userData.one)
    const one = userData.one == 0 ? ` ` : userData.one == 1 ? `W` : `L`
    const two = userData.two == 0 ? ` ` : userData.two == 1 ? `W` : `L`
    const three = userData.three == 0 ? ` ` : userData.three == 1 ? `W` : `L`
    const four = userData.four == 0 ? ` ` : userData.four == 1 ? `W` : `L`
    const five = userData.five == 0 ? ` ` : userData.five == 1 ? `W` : `L`
    const six = userData.six == 0 ? ` ` : userData.six == 1 ? `W` : `L`
    console.log(userData.one)
    const onecolor = userData.one == 0 ? `#85d994` : userData.one == 1 ? `#85d994` : `#CD3B40`
    const twocolor = userData.two == 0 ? `#85d994` : userData.two == 1 ? `#85d994` : `#CD3B40`
    const threecolor = userData.three == 0 ? `#85d994` : userData.three == 1 ? `#85d994` : `#CD3B40`
    const fourcolor = userData.four == 0 ? `#85d994` : userData.four == 1 ? `#85d994` : `#CD3B40`
    const fivecolor = userData.five == 0 ? `#85d994` : userData.five == 1 ? `#85d994` : `#CD3B40`
    const sixcolor = userData.six == 0 ? `#85d994` : userData.six == 1 ? `#85d994` : `#CD3B40`

    ctx.font = `50px neo`;
    ctx.textAlign = "center"
    ctx.fillStyle = `${onecolor}`;
    ctx.fillText(`${one}`, 1123, 950, 250, 0);



    ctx.font = `50px neo`;
    ctx.textAlign = "center"
    ctx.fillStyle = `${twocolor}`;
    ctx.fillText(`${two}`, 1005, 950, 250, 0);


    ctx.font = `50px neo`;
    ctx.textAlign = "center"
    ctx.fillStyle = `${threecolor}`;
    ctx.fillText(`${three}`, 887, 950, 250, 0);

    ctx.font = `50px neo`;
    ctx.textAlign = "center"
    ctx.fillStyle = `${fourcolor}`;
    ctx.fillText(`${four}`, 769, 950, 250, 0);

    ctx.font = `50px neo`;
    ctx.textAlign = "center"
    ctx.fillStyle = `${fivecolor}`;
    ctx.fillText(`${five}`, 651, 950, 250, 0);

    ctx.font = `50px neo`;
    ctx.textAlign = "center"
    ctx.fillStyle = `${sixcolor}`;
    ctx.fillText(`${six}`, 533, 950, 250, 0);

    console.log(userData.one)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'score.png');
console.log(attachment)
    message.channel.send({ files: [attachment] })

                                          }

  //user.avatarURL()


  }

   
  
