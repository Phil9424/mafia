const game = require("../lib/game/game");
module.exports = {
    name: "host",
    description: "make host",
    inGameOnly: true,
    hostOnly: false,
    run(message) {


 game.hoss.hoss = message.author.id
 message.channel.send({content: `Хост назначен. ${game.hoss.hoss} = ${message.author.id}`})
    
    }
}