const { Model, DataTypes } = require("sequelize");
const GameResult = require("../lib/game/GameResult");
const EndgameState = require("../lib/game/EndgameState");

module.exports = class ConcurrentGames extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
          primaryKey: true,
          defaultValue: 0
        },
        concurrentGameCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        }
      },
      {
        timestamps: false,
        sequelize
      }
    );
  }
};
