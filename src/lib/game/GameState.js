/*
  GameState:
    client: Client
    guild: Guild
    players: Collection<Snowflake, GuildMember>
    alivePlayers: Collection<Snowflake, GuildMember>
    killedPlayers: Set<Snowflake>
    hangedPlayers: Set<Snowflake>
    mode: string
    playerNicknames: Map<Snowflake, string?>
    playerRoles: Map<Snowflake, string>
    playerNumbers: Map<Snowflake, number>
    firstVictim: User?
    ignoreBestMove: boolean
    bestMove: number?
    bestMoveHits: number
    bestMoveTargets: Snowflake[]?
    playerFauls: Map<Snowflake, number>
    playerWarns: Map<Snowflake, number>
    state: "day" | "night"
    day: number
    host: User
    number: number
*/

const { Collection } = require("discord.js");

module.exports = class GameState {
  constructor(data) {
    Object.assign(this, data);
  }

  toObject() {
    return {
      guild: this.guild.id,
      sortedMembers: this.sortedMembers.map((player) => player.id),
      alivePlayers: this.alivePlayers.map((player) => player.id),
      killedPlayers: [...this.killedPlayers],
      hangedPlayers: [...this.hangedPlayers],
      copchecks: [...this.copchecks],
      donchecks: [...this.donchecks],
      mode: this.mode,
      playerNicknames: [...this.playerNicknames],
      playerRoles: [...this.playerRoles],
      playerNumbers: [...this.playerNumbers],
      firstVictim: this.firstVictim && this.firstVictim.id,
      ignoreBestMove: this.ignoreBestMove,
      bestMove: this.bestMove,
      bestMoveHits: this.bestMoveHits,
      bestMoveTargets: this.bestMoveTargets,
      playerFauls: [...this.playerFauls],
      playerWarns: [...this.playerWarns],
      playerMayaks: [...this.playerMayaks],
      playerFins: [...this.playerFins],
      playerBons: [...this.playerBons],
      state: this.state,
      day: this.day,
      host: this.host.id,
      number: this.number,
    };
  }

  serialize() {
    return JSON.stringify(this.toObject());
  }

  static fromObject(client, object) {
    const guild = client.guilds.cache.get(object.guild);

    return new GameState({
      client,
      guild,
      sortedMembers: new Collection(
        object.sortedMembers
          .filter((id) => guild.members.cache.has(id))
          .map((id) => [id, guild.members.cache.get(id)])
      ),
      alivePlayers: new Collection(
        object.alivePlayers
          .filter((id) => guild.members.cache.has(id))
          .map((id) => [id, guild.members.cache.get(id)])
      ),
      killedPlayers: new Set(
        object.killedPlayers.filter((id) => guild.members.cache.has(id))
      ),
      hangedPlayers: new Set(
        object.hangedPlayers.filter((id) => guild.members.cache.has(id))
      ),
      copchecks: new Set(
        object.copchecks.filter((id) => guild.members.cache.has(id))
      ),
      donchecks: new Set(
        object.donchecks.filter((id) => guild.members.cache.has(id))
      ),
      mode: object.mode,
      playerNicknames: new Map(object.playerNicknames),
      playerRoles: new Map(object.playerRoles),
      playerNumbers: new Map(object.playerNumbers),
      firstVictim: object.firstVictim && client.users.cache.get(object.firstVictim),
      ignoreBestMove: object.ignoreBestMove,
      bestMove: object.bestMove,
      bestMoveHits: object.bestMoveHits,
      bestMoveTargets: object.bestMoveTargets,
      playerFauls: new Map(object.playerFauls),
      playerWarns: new Map(object.playerWarns),
      playerMayaks: new Map(object.playerMayaks),
      playerFins: new Map(object.playerFins),
      playerBons: new Map(object.playerBons),

      state: object.state,
      day: object.day,
      host: client.users.cache.get(object.host),
      number: object.number
    });
  }

  static deserialize(client, string) {
    return GameState.fromObject(client, JSON.parse(string));
  }
  
};
