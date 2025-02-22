// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
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
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
