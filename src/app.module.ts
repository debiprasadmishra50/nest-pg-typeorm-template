import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { WinstonModule } from "nest-winston";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerMiddleware } from "./shared/middlewares/logger.middleware";
import { envSchema } from "./utils/env.validation";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { PostgreSQLDatabaseModule } from "./database/postgresql.module";
import { UserModule } from "./user/user.module";
import { HealthModule } from "./health/health.module";
import { winstonLoggerConfig } from "./configs/winston.config";
import { S3Module } from './s3/s3.module';
import { SseModule } from './sse/sse.module';
// FIXME: Use AWS configuration use this function, else use the path only
// import configuration from "./configs/app.config";

/**
 * It is the root module for the application in we import all feature modules and configure modules and packages that are common in feature modules. Here we also configure the middlewares.
 *
 * Here, feature modules imported are - DatabaseModule, AuthModule, MailModule and UserModule.
 * other modules are :
 *      {@link ConfigModule} - enables us to access environment variables application wide.
 *      {@link TypeOrmModule} - it is an ORM and enables easy access to database.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      isGlobal: true,
      validationSchema: envSchema,
      // validationOptions: { allowUnknown: false, abortEarly: true },
      // FIXME: Use AWS configuration use this function, uncomment this option
      // load: [configuration],
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
    WinstonModule.forRoot(winstonLoggerConfig),
    PostgreSQLDatabaseModule,
    AuthModule,
    MailModule,
    UserModule,
    HealthModule,
    S3Module,
    SseModule,
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
