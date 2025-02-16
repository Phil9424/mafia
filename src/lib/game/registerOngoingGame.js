const ConcurrentGames = require("../../models/ConcurrentGames");

module.exports = async function registerOngoingGame() {
  const [concurrentGames] = await ConcurrentGames.findOrBuild({
    where: { id: 0 },
    defaults: { id: 0 }
  });

  concurrentGames.concurrentGameCount++;

  await concurrentGames.save();
};
