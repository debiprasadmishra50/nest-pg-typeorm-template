import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";

/**
 * It is a feature module where we keep code related to database. we import the typeorm module and configure it to work with any database.
 */
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: "postgres",
          host: configService.get<string>("DB_HOST"),
          port: +configService.get<string>("DB_PORT"),
          username: configService.get<string>("DB_USER"),
          password: configService.get<string>("DB_PASSWORD"),
          database: configService.get<string>("DATABASE"),
          entities: [join(__dirname, "..", "**", "**", "*.entity{.ts,.js}")],
          autoLoadEntities: true,
          synchronize: true,
          // dropSchema: true,
          retryAttempts: 1,
          migrations: [join(__dirname, "database", "migrations", "*{.ts,.js}")],
          cli: {
            migrationsDir: join(__dirname, "database", "migrations"),
          },
          migrationsTableName: "migrations",
          migrationsRun: true,
          maxQueryExecutionTime: 1000,
          logging: true,
          logger: "file",
          // ssl: false,
          // extra: {
          //   ssl: {
          //     rejectUnauthorized: false,
          //   },
          // },
        };
      },
    }),
  ],
})
export class PostgreSQLDatabaseModule {}
