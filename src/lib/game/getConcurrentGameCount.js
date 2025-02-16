const ConcurrentGames = require("../../models/ConcurrentGames");

module.exports = async function getConcurrentGameCount() {
  const [{ concurrentGameCount }] = await ConcurrentGames.findOrBuild({
    where: { id: 0 },
    defaults: { id: 0 }
  });

  return concurrentGameCount;
};
