import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";

config({ path: `.env.stage.${process.env.STAGE || "dev"}` });

const configService = new ConfigService();

export const ormconfig: DataSourceOptions = {
  type: "postgres",
  host: configService.get<string>("DB_HOST"),
  port: +configService.get<string>("DB_PORT"),
  username: configService.get<string>("DB_USER"),
  password: configService.get<string>("DB_PASSWORD"),
  database: configService.get<string>("DATABASE"),
  entities: [join(__dirname, "..", "**", "**", "*.entity{.ts,.js}")],
  //   autoLoadEntities: true,
  synchronize: false,
  // dropSchema: true,
  // retryAttempts: 1,
  migrations: [join(__dirname, "database", "migrations", "*{.ts,.js}")],
  //   cli: {
  //     migrationsDir: join(__dirname, "migrations"),
  //   },
  migrationsTableName: "migrations",
  migrationsRun: true,
  maxQueryExecutionTime: 1000,
  logging: true,
  logger: "file",
  //   ssl: false,
  // extra: {
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // },
};

const dataSource = new DataSource(ormconfig);
export default dataSource;
