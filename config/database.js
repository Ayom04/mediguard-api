require("dotenv").config();

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1" || "localhost",
      port: process.env.DATABASE_PORT || "8889",
      user: process.env.DATABASE_USERNAME || "root",
      password: process.env.DATABASE_PASSWORD || "root",
      database: process.env.DATABASE_NAME || "nova",
      timezone: "Z",
      charset: "utf8",
    },
    debug: true,
    logging: true,
    pool: {
      min: 0,
      max: 7,
      afterCreate: (conn, done) => {
        conn.query("SELECT NOW();", (err) => {
          if (err) {
            console.log(err);
          }
          done(err, conn);
        });
      },
    },

    migrations: {
      directory: "../migrations",
      tableName: "knex_migrations",
    },
  },
  production: {
    client: "mysql",
    connection: {
      host: process.env.HOST_2,
      port: process.env.DATABASE_PORT || "3306",
      user: process.env.DATABASE_USER_2,
      password: process.env.DATABASE_PASSWORD_2,
      database: process.env.DATABASE_NAME_2,
      charset: "utf8",
    },
    logging: true,
    pool: { min: 0, max: 7 },
  },
};
