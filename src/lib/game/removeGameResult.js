const User = require("../../models/User");
const GlobalStats = require("../../models/GlobalStats");
const gameRoles = require("../../../data/roles.json");

module.exports = async function removeGameResult(gameResult) {
  const [host] = await User.findOrBuild({
    where: { id: gameResult.host },
    defaults: { id: gameResult.host }
  });

  host.hostedGameCount--;

  await host.save();

  const users = new Map();

  await Promise.all(
    gameResult.sortedMembers.map(async (id) => {
      const [user] = await User.findOrBuild({ where: { id }, defaults: { id } });

      users.set(id, user);
    })
  );

  gameResult.sortedMembers.forEach((id) => {
    users.get(id).gameCount--;
  });

  gameResult.winnerRoles.forEach((role, id) => {
    const user = users.get(id);

    switch (role) {
      case "mir":
        user.mirWins--;
        user.last = 'Обнулено';
        user.lastrole = 'mir';
        user.streak = 0;

        break;
      case "maf":
        user.mafWins--;
        user.last = 'Обнулено';
        user.lastrole = 'maf';
        user.streak = 0;

        break;
        
      case "cop":
        user.copWins--;
        user.last = 'Обнулено';
        user.lastrole = 'cop';
        user.streak = 0;

        break;
      case "don":
        user.donWins--;
        user.last = 'Обнулено';
        user.lastrole = 'don';
        user.streak = 0;

        break;
    }
  });

  gameResult.looserRoles.forEach((role, id) => {
    const user = users.get(id);

    switch (role) {
      case "mir":
        user.last = 'Обнулено';
        user.lastrole = 'mir';
        user.streak = 0;
        break;
      case "maf":
        user.last = 'Обнулено';
        user.lastrole = 'maf';
        user.streak = 0;
        break;
      case "cop":
        user.last = 'Обнулено';
        user.lastrole = 'cop';
        user.streak = 0;
        break;
      case "don":
        user.last = 'Обнулено';
        user.lastrole = 'don';
        user.streak = 0;
        break;
    }
  })
  if (gameResult.bestMovePlayer) {
    const user = users.get(gameResult.bestMovePlayer);

    user.bestMoveScores -= gameResult.bestMoveScore;
    user.firstVictimCount--;

    if (gameResult.bestMoveHits == 2) {
      user.bestMove2Count--;
    }
    if (gameResult.bestMoveHits == 3) {
      user.bestMove3Count--;
    }

    if (!gameResult.winnerRoles.has(user.id)) {
      user.firstVictimScores -= Math.min(user.firstVictimCount / user.gameCount, 0.4);
    }
  }

  if (gameResult.bestPlayer) {
    users.get(gameResult.bestPlayer).bestPlayerCount--;
  }

  [...gameResult.bonusScores].forEach(([id, score]) => {
    const user = users.get(id);

    user.bonusScores -= score;
  });

  [...gameResult.fineScores].forEach(([id, score]) => {
    const user = users.get(id);

    user.fineScores -= score;
  });

  await Promise.all([...users.values()].map((user) => user.save()));

  const globalStats = await GlobalStats.get();

  globalStats.gameCount--;

  if (gameResult.winner == "mir") {
    globalStats.redWins--;
  } else {
    globalStats.blackWins--;
  }

  await globalStats.save();
};
