/*
  EndgameState extends GameState:
    bestPlayer: Snowflake?
    bonusScores: Map<Snowflake, number>
    fineScores: Map<Snowflake, number>
*/

const { Collection } = require("discord.js");

const GameState = require("./GameState");

module.exports = class EndgameState extends GameState {
  constructor(data) {
    super(data);
  }

  toObject() {
    const object = {
      bestPlayer: this.bestPlayer,
      bonusScores: [...this.bonusScores],
      fineScores: [...this.fineScores]
    };

    return { ...super.toObject(), ...object };
  }

  serialize() {
    return JSON.stringify(this.toObject());
  }

  static fromObject(client, object) {
    return new EndgameState({
      ...GameState.fromObject(client, object),
      bestPlayer: object.bestPlayer,
      bonusScores: new Map(object.bonusScores),
      fineScores: new Map(object.fineScores)
    });
  }

  static deserialize(client, string) {
    return EndgameState.fromObject(client, JSON.parse(string));
  }

  static fromGameState(gameState, data) {
    return new EndgameState({ ...gameState, ...data });
  }
};
