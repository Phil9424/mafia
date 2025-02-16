const User = require("../../models/User");
const { Op } = require("sequelize");
const { MessageEmbed } = require("discord.js");


module.exports = async (client, member) => {

 client.guilds.cache.get('959870711680364564').channels.cache.get(`975452837230289056`).send({content: `Бот был перезапущен. Если запускался сбор, перезапустите командой **+start**. Если идет игра то **+load** Спасибо!`}) 



    let lowpriorrole = '975640085871591445'
    let highpriorrole = '1131494456416288878'

    async function  sorting() {
     let users = await User.findAll({
       where: {
         lowpriorcheck: { [Op.eq]: true },
         ignore: false
       }
         })
         const guild = '959870711680364564'            
     users.filter(user => (user.lowprior < Date.now() )).forEach(async user => {

   client.guilds.cache.get('959870711680364564').members.cache.get(user.id).roles.remove(lowpriorrole, `Низкий приоритет закончен`);
   const embed = new MessageEmbed()
   .setTitle('Низкий приоритет!')
   .setDescription(`**У пользователя ${ client.guilds.cache.get('959870711680364564').members.cache.get(user.id)}, закончился низкий приоритет!**`)
   client.guilds.cache.get('959870711680364564').channels.cache.get(`1086717776619638926`).send({embeds: [embed]}) 
   const embedd = new MessageEmbed()
   .setTitle('Низкий приоритет!')
   .setDescription(`**Уважаемый ${client.guilds.cache.get('959870711680364564').members.cache.get(user.id).user.username}, у Вас закончился низкий приоритет! Постарайтесь больше не попадать в него!**`)
   client.guilds.cache.get('959870711680364564').members.cache.get(user.id).send({embeds: [embedd]})
user.lowpriorcheck = false
await user.save()  
 
 

     }) 
     
   }


   setInterval(sorting, 120000)
    
   async function  sortinghigh() {
    let users = await User.findAll({
      where: {
        highpriorcheck: { [Op.eq]: true },
        ignore: false
      }
        })
        const guild = '959870711680364564'            
    users.filter(user => (user.highprior < Date.now() )).forEach(async user => {

  client.guilds.cache.get('959870711680364564').members.cache.get(user.id).roles.remove(highpriorrole, `Высокий приоритет закончен`);
  const embed = new MessageEmbed()
  .setTitle('Высокий приоритет!')
  .setDescription(`**У пользователя ${ client.guilds.cache.get('959870711680364564').members.cache.get(user.id)}, закончился Высокий приоритет!**`)
  client.guilds.cache.get('959870711680364564').channels.cache.get(`1086717776619638926`).send({embeds: [embed]}) 
  const embedd = new MessageEmbed()
  .setTitle('Высокий приоритет!')
  .setDescription(`**Уважаемый ${client.guilds.cache.get('959870711680364564').members.cache.get(user.id).user.username}, у Вас закончился Высокий приоритет! Постарайтесь лучше, чтобы его снова получить**`)
  client.guilds.cache.get('959870711680364564').members.cache.get(user.id).send({embeds: [embedd]})
user.highpriorcheck = false
await user.save()  



    }) 
    
  }


  setInterval(sortinghigh, 120000)
   
    

    }
