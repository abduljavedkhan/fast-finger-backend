module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "fastfinger@2021",
    DB: "fast_finger",
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  