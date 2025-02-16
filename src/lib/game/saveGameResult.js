const User = require("../../models/User");
const GlobalStats = require("../../models/GlobalStats");
const gameRoles = require("../../../data/roles.json");

module.exports = async function saveGameResult(gameResult) {
  const [host] = await User.findOrBuild({
    where: { id: gameResult.host },
    defaults: { id: gameResult.host }
  });

  host.hostedGameCount++;
  host.mcoins += 100


  await host.save();

  const users = new Map();

  await Promise.all(
    gameResult.sortedMembers.map(async (id) => {
      const [user] = await User.findOrBuild({ where: { id }, defaults: { id } });

      users.set(id, user);
    })
  );

  gameResult.sortedMembers.forEach((id) => {
    users.get(id).gameCount++;
    var today = new Date();
    const ny = new Date(today - (-180 * 60 * 1000));
        var date = today.getDate()+'-'+(today.getMonth()+1).toLocaleString(undefined, {
          minimumIntegerDigits: 2
        }) +'-'+today.getFullYear();
        var time = ny.getUTCHours().toLocaleString(undefined, {
          minimumIntegerDigits: 2
        }) + ":" + today.getUTCMinutes().toLocaleString(undefined, {
          minimumIntegerDigits: 2
        })
        var dateTime = time+' '+date;
    
    
    console.log(dateTime)
    
});

  gameResult.winnerRoles.forEach((role, id) => {
    const user = users.get(id);

    switch (role) {
      case "mir":
        user.mirWins++;
        user.last = 'win';
        user.lastrole = 'mir';
        user.six = user.five
    user.five = user.four
    user.four = user.three
    user.three = user.two
    user.two = user.one
    user.one = 1

    user.fourdop = user.threedop
    user.threedop = user.twodop
    user.twodop = user.onedop
    user.onedop = 1

    user.mcoins += 50

        if(user.streak >= user.record){
          user.streak++;
          user.record++;
        }
        else{
        user.streak++;
        }
        break;
      case "maf":
        user.mafWins++;
        user.last = 'win';
        user.lastrole = 'maf';
        user.six = user.five
        user.five = user.four
        user.four = user.three
        user.three = user.two
        user.two = user.one
        user.one = 1
        user.fourdop = user.threedop
        user.threedop = user.twodop
        user.twodop = user.onedop
        user.onedop = 2
        user.mcoins += 50

        if(user.streak >= user.record){
          user.streak++;
          user.record++;
        }
        else{
        user.streak++;
        }
        break;
        
      case "cop":
        user.copWins++;
        user.last = 'win';
        user.lastrole = 'cop';
        user.six = user.five
        user.five = user.four
        user.four = user.three
        user.three = user.two
        user.two = user.one
        user.one = 1
        user.fourdop = user.threedop
        user.threedop = user.twodop
        user.twodop = user.onedop
        user.onedop = 3
        user.mcoins += 60
        if(user.streak >= user.record){
          user.streak++;
          user.record++;
        }
        else{
        user.streak++;
        }
        break;
      case "don":
        user.donWins++;
        user.last = 'win';
        user.lastrole = 'don';
        user.six = user.five
        user.five = user.four
        user.four = user.three
        user.three = user.two
        user.two = user.one
        user.one = 1
        user.fourdop = user.threedop
        user.threedop = user.twodop
        user.twodop = user.onedop
        user.onedop = 4
        user.mcoins += 60

        if(user.streak >= user.record){
          user.streak++;
          user.record++;
        }
        else{
        user.streak++;
        }
        break;
    }
  });
  gameResult.looserRoles.forEach((role, id) => {
    const user = users.get(id);

    switch (role) {
      case "mir":
        user.mirLose++;
        user.last = 'lose';
        user.lastrole = 'mir';
        user.streak = 0;
        user.six = user.five
    user.five = user.four
    user.four = user.three
    user.three = user.two
    user.two = user.one
    user.one = 2
    user.fourdop = user.threedop
    user.threedop = user.twodop
    user.twodop = user.onedop
    user.onedop = 5
    user.mcoins -= 10
        break;
      case "maf":
        user.mafLose++;
        user.last = 'lose';
        user.lastrole = 'maf';
        user.streak = 0;
        user.six = user.five
        user.five = user.four
        user.four = user.three
        user.three = user.two
        user.two = user.one
        user.one = 2
        user.fourdop = user.threedop
        user.threedop = user.twodop
        user.twodop = user.onedop
        user.onedop = 6
        user.mcoins -= 10

        break;
      case "cop":
        user.copLose++;
        user.last = 'lose';
        user.lastrole = 'cop';
        user.streak = 0;
        user.six = user.five
        user.five = user.four
        user.four = user.three
        user.three = user.two
        user.two = user.one
        user.one = 2
        user.fourdop = user.threedop
        user.threedop = user.twodop
        user.twodop = user.onedop
        user.onedop = 7
        user.mcoins -= 15

        break;
      case "don":
        user.donLose++;
        user.last = 'lose';
        user.lastrole = 'don';
        user.streak = 0;
        user.six = user.five
        user.five = user.four
        user.four = user.three
        user.three = user.two
        user.two = user.one
        user.one = 2
        user.fourdop = user.threedop
        user.threedop = user.twodop
        user.twodop = user.onedop
        user.onedop = 8
        user.mcoins -= 15

        break;
    }

  });
  if (gameResult.bestMovePlayer) {
    const user = users.get(gameResult.bestMovePlayer);

    user.bestMoveScores += gameResult.bestMoveScore;
    user.firstVictimCount++;

    if (gameResult.bestMoveHits == 2) {
      user.bestMove2Count++;
    }
    if (gameResult.bestMoveHits == 3) {
      user.bestMove3Count++;
    }

    if (!gameResult.winnerRoles.has(user.id)) {
      user.firstVictimScores += Math.min(user.firstVictimCount / user.gameCount, 0.4);
    }
  }

  if (gameResult.bestPlayer) {
    users.get(gameResult.bestPlayer).bestPlayerCount++;
  }
try{
  [...gameResult.bonusScores].forEach(([id, score]) => {
    const user = users.get(id);

    user.bonusScores += Number(score)
    user.lastpts = Number(score)
    console.log(`Допы - ${score}`)

  }) }
  catch(e) {
    return console.log(e)
  }
try {
  [...gameResult.fineScores].forEach(([id, score]) => {
    const user = users.get(id);

    user.fineScores += Number(score)
    user.lastptse = Number(score)

    user.fourpts = user.threepts
    user.threepts = user.twopts
    user.twopts = user.onepts
    user.onepts = user.lastpts - user.lastptse 
    console.log(`Минус Допы - ${score}`)

  })
}
catch(e) {

      return console.log(e)

}


 

  await Promise.all([...users.values()].map((user) => user.save()));

  const globalStats = await GlobalStats.get();

  globalStats.gameCount++;

  if (gameResult.winner == "mir") {
    globalStats.redWins++;
  } else {
    globalStats.blackWins++;
  }

  await globalStats.save();
};
