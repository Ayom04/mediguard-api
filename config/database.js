require("dotenv").config();

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.DATABASE_HOST || "localhost",
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
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
    client: "mysql2",
    connection: {
      host: process.env.PROD_DATABASE_HOST,
      port: process.env.PROD_DATABASE_PORT,
      user: process.env.PROD_DATABASE_USER,
      password: process.env.PROD_DATABASE_PASSWORD,
      database: process.env.PROD_DATABASE_NAME,
      charset: "utf8",
    },
    logging: true,
    pool: { min: 0, max: 7 },
  },
};
