import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerMiddleware } from "./shared/middlewares/logger.middleware";
//   FIXME:
// import { validate } from "./env.validation";
import { envSchema } from "./utils/env.validation";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { PostgreSQLDatabaseModule } from "./database/postgresql.module";
import { UserModule } from "./user/user.module";
import { HealthModule } from "./health/health.module";
import { MongooseDatabaseModule } from "./database/mongoose.module";

/**
 * It is the root module for the application in we import all feature modules and configure modules and packages that are common in feature modules. Here we also configure the middlewares.
 *
 * Here, feature modules imported are - DatabaseModule, AuthModule, MailModule and UserModule.
 * other modules are :
 *      ConfigModule - enables us to access environment variables application wide.
 *      TypeOrmModule - it is an ORM and enables easy access to database.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      isGlobal: true,
      //   FIXME:
      //   validate, // For Approach 1 using Class Validator
      validationSchema: envSchema,
      //   validationOptions: { allowUnknown: false, abortEarly: true },
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: +config.get<string>("THROTTLE_TTL"),
          limit: +config.get<string>("THROTTLE_LIMIT"),
        },
      ],
    }),
    WinstonModule.forRoot({
      levels: winston.config.npm.levels,
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.splat(),
        winston.format.colorize(),
      ),
      transports: [
        new winston.transports.File({
          filename: `logs/application-errors/${new Date()
            .toISOString()
            .split("T")[0]
            .replace(/-/g, "/")}/error.log`,
          level: "error",
        }),
        new winston.transports.File({
          filename: `logs/${new Date().toISOString().split("T")[0].replace(/-/g, "/")}/application.log`,
          level: "log",
        }),
      ],
    }),
    // FIXME: Select Either of them
    PostgreSQLDatabaseModule,
    MongooseDatabaseModule,
    AuthModule,
    MailModule,
    UserModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("/**");
  }
}
