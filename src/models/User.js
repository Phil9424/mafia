const { Model, DataTypes } = require("sequelize");

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        // Идентификатор
        id: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          primaryKey: true
        },

        // Кол-во сыгранных игр
        gameCount: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0
        },
        // Кол-во проведённых игр
        hostedGameCount: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0
        },

        // Кол-во побед за мафию
        mafWins: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0
        },
        // Кол-во побед за дона
        donWins: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0
        },
        // Кол-во побед за шерифа
        copWins: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0
        },
        // Кол-во побед за мирного
        mirWins: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0
        },
        mafLose: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0
        },
        // Кол-во побед за дона
        donLose: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0
        },
        // Кол-во побед за шерифа
        copLose: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0
        },
        last: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 0
        },
        lastrole: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 0
        },
        record: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0
        },
        streak: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0
        },
        // Кол-во побед за мирного
        mirLose: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0
        },
        // Дополнительные очки за лучшие ходы
        bestMoveScores: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0
        },
        // Дополнительные очки за отстрел
     
        // Дополнительные очки от ведущего
        bonusScores: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 1700
        },
        // Штрафные очки
        fineScores: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0
        },

        // Турнирный рейтинг
        tourRating: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0
        },

        // Флаг игнорирования
        ignore: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },

        // Кол-во лучших ходов в 2
        bestMove2Count: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0
        },
        // Кол-во лучших ходов в 3
        bestMove3Count: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0
        },

        // Кол-во отстрелов в 1 ночь
        firstVictimCount: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0
        },

        // Кол-во выборов лучшим игроком
      
        lowprior: {
          type: DataTypes.DOUBLE,
          allowNull: true,
        },
        lowpriorcheck: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        lowcount: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        shoot: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        ban: {
          type: DataTypes.DOUBLE,
          allowNull: true,
        },
        bancheck: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        one: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        two: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        three: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        four: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        five: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        six: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        cardone: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        cardtwo: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        cardthree: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        cardfour: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        cardfive: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        cardsix: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        cardseven: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        cardeight: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        cardnine: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        cardten: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        onedop: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        twodop: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        threedop: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        fourdop: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        onepts: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        twopts: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        threepts: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        fourpts: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        lastpts: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        lastptse: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        mcoins: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0

        },
        highprior: {
          type: DataTypes.DOUBLE,
          allowNull: true,
        },
        highpriorcheck: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
       
      },
      {
        timestamps: false,
        sequelize
      }
    );
  }
};
