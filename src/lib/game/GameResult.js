/*
  GameResult:
    winner: "mir" | "maf"
    host: Snowflake
    winnerRoles: Map<Snowflake, string>,
    looserRoles: Map<Snowflake, string>,
    players: Snowflake[],
    bestMovePlayer: Snowflake?
    bestMoveScore: number?
    bestMoveHits: number?
    bestPlayer: Snowflake
    bonusScores: Map<Snowflake, number>
    fineScores: Map<Snowflake, number>
*/

const { Collection } = require("discord.js");

module.exports = class GameResult {
  winnerRoles = new Map();
  looserRoles = new Map();
  sortedMembers = [];

  constructor(data) {
    if (data) {
      Object.assign(this, data);
    }
  }

  toObject() {
    return {
      winner: this.winner,
      looser: this.looser,
      host: this.host,
      winnerRoles: [...this.winnerRoles],
      looserRoles: [...this.looserRoles],
      sortedMembers: this.sortedMembers,
      bestMovePlayer: this.bestMovePlayer,
      bestMoveScore: this.bestMoveScore,
      bestMoveHits: this.bestMoveHits,
      bestPlayer: this.bestPlayer,
      bonusScores: [...this.bonusScores],
      fineScores: [...this.fineScores],
    };
  }

  serialize() {
    return JSON.stringify(this.toObject());
  }

  static fromObject(object) {
    return new GameResult({
      winner: object.winner,
      host: object.host,
      winnerRoles: new Map(object.winnerRoles),
      looserRoles: new Map(object.winnerRoles),
      sortedMembers: object.sortedMembers,
      bestMovePlayer: object.bestMovePlayer,
      bestMoveScore: object.bestMoveScore,
      bestMoveHits: object.bestMoveHits,
      bestPlayer: object.bestPlayer,
      bonusScores: new Map(object.bonusScores),
      fineScores: new Map(object.fineScores)
    });
  }

  
  static deserialize(string) {
    return GameResult.fromObject(JSON.parse(string));
  }

  
};
