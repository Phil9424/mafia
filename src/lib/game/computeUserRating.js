module.exports = function computeUserRating(userData, globalStats) {
  const totalRedWins = globalStats.redWins;
  const totalBlackWins = globalStats.blackWins;
  const totalGameCount = globalStats.gameCount;

  const redCoefficient =   1 + (0.5 * totalGameCount - totalRedWins)/(0.5 * totalGameCount)
  const blackCoefficient = 1 + (0.5 * totalGameCount - totalBlackWins)/(0.5 * totalGameCount)

  const redWins = userData.mirWins + userData.copWins;
  const blackWins = userData.mafWins + userData.donWins;

  const baseScores = (2 * redWins * redCoefficient) + (2 * blackWins * blackCoefficient);

  const additionalScores =
    userData.bestMoveScores +
    userData.firstVictimScores +
    userData.bonusScores -
    userData.fineScores 
    ;
    
  const scores = baseScores + additionalScores;

  const rating = 100 * scores / userData.gameCount + 0.25 * userData.gameCount

  return isNaN(rating) ? 0 : rating;
};

