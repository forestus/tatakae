const SOURCE_PATH = process.env.NODE_ENV === "production" ? "dist" : "src";

module.exports = {
  type: "postgres",
  host: "54.232.142.229",
  port: 5432,
  username: "dbadmin",
  password: "db1234",
  database: "dbstream",
  logging: false,
  migrations: [`${SOURCE_PATH}/src/migrations/**{.ts,.js}`],
  entities: [`${SOURCE_PATH}/src/entities/**{.ts,.js}`],
  cli: {
    entitiesDir: "src/models",
    migrationsDir: "src/migrations"
  }
};
