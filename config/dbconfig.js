module.exports = () => {
  const env = process.env.NODE_ENV || "development";

  const dbconfig = {
    development: {
      dialect: "sqlite",
      logQueryParameters: true
    },
    production: {
      url: process.env.DATABASE_URL,
      dialect: "postgres",
      logQueryParameters: true
    }
  };

  return dbconfig[env];
};
