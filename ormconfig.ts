import { ConnectionOptions } from "typeorm";

export default {
  type: "postgres",
  host: "locahost",
  port: 5432,
  username: "dbadmin",
  password: "db1234",
  database: "dbstream",
  logging: false,
  migrations: ["./src/migrations/**.ts"],
  entities: ["src/entities/**.ts"],
  cli: {
    entitiesDir: "src/models",
    migrationsDir: "src/migrations"
  }
} as ConnectionOptions;
