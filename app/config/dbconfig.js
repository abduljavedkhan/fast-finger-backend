module.exports = {
  HOST: process.env.DB_URL,
  USER: process.env.DBUSER,
  PASSWORD: process.env.DBPWD,
  DB: process.env.DBNAME,
  dialect: process.env.DIALECT, 
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  