const { Sequelize } = require("sequelize");
const requireAll = require("require-all");
const { getDBConfig } = require("./util/config");

const { url, ...options } = getDBConfig();

module.exports = async function dbinit() {
  const sequelize =  new Sequelize('postgresql://postgres:rEgfjLvnOE3Sqae5@monstrously-teeming-mongoose.data-1.use1.tembo.io:5432/postgres',  {dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
sslmode: 'require',
      rejectUnauthorized: false // <<<<<< YOU NEED THIS
  }
  },
  logging: false
  })


  const models = requireAll({ dirname: `${__dirname}/models` });

  registerModels(models, sequelize);
  console.log(`0`)

  await sequelize.sync({logging:true}).catch(error => {
    console.error(error);
    console.log(`err`)

    process.exit();
  });
  console.log(`1`)

  console.log("Database synced.");

  return sequelize;
};

function registerModels(modelsObject, sequelize) {
  const models = Object.values(modelsObject);
  console.log(`2`)

  models
    .filter(model => typeof model == "function")
    .map(model => model.init(sequelize))
    .filter(model => model.associate)
    .map(model => model.associate());
    console.log(`3`)

    
  models
    .filter(model => typeof model != "function")
    .forEach(model => registerModels(model, sequelize));
    console.log(`4`)

}
