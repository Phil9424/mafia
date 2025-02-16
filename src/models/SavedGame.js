const { Model, DataTypes } = require("sequelize");

module.exports = class SavedGame extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        state: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        timestamps: true,
        sequelize,
      }
    );
  }
};
