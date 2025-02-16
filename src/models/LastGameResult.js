const { Model, DataTypes } = require("sequelize");
const GameResult = require("../lib/game/GameResult");
const EndgameState = require("../lib/game/EndgameState");

module.exports = class LastGameResult extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
          primaryKey: true
        },
        result: {
          type: DataTypes.TEXT,
          allowNull: false,
          get() {
            const text = this.getDataValue("result");

            return text && GameResult.deserialize(text);
          },
          set(value) {
            const text = value.serialize();

            this.setDataValue("result", text);
          }
        },
        state: {
          type: DataTypes.TEXT,
          allowNull: false,
          set(value) {
            const text = value.serialize();

            this.setDataValue("state", text);
          }
        },
        winner: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        timestamps: true,
        sequelize
      }
    );
  }

  getDeserializedState(client) {
    const text = this.state;

    return text && EndgameState.deserialize(client, text);
  }
};
