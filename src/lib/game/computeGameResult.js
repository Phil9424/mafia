const GameResult = require("./GameResult");

const gameRoles = require("../../../data/roles.json");

module.exports = async function computeGameResult(endgameState, winner) {
  const winnerRoles = new Map(
    [...endgameState.playerRoles].filter(([, role]) => gameRoles[role].team == winner)
  );

  var looserRoles = new Map(
    [...endgameState.playerRoles].filter(([, role]) => gameRoles[role].team != winner)
  );

  const result = new GameResult({
    winner,
    host: endgameState.host.id,
    winnerRoles,
    looserRoles,
    sortedMembers: endgameState.sortedMembers.map((player) => player.id),
    bestMovePlayer:
      !endgameState.ignoreBestMove &&
      endgameState.firstVictim &&
      endgameState.firstVictim.id,
    bestMoveScore: !endgameState.ignoreBestMove && endgameState.bestMove,
    bestMoveHits: !endgameState.ignoreBestMove && endgameState.bestMoveHits,
    bonusScores: endgameState.playerBons,
    fineScores: endgameState.playerFins
  });

  return result;
};
