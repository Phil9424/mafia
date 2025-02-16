const { Model, DataTypes } = require("sequelize");
const GameResult = require("../lib/game/GameResult");
const EndgameState = require("../lib/game/EndgameState");

module.exports = class GlobalStats extends Model {
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
        gameCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        redWins: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        blackWins: {
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

  static async get() {
    const [stats] = await GlobalStats.findOrBuild({
      where: { id: 0 },
      defaults: { id: 0 }
    });

    return stats;
  }
};
