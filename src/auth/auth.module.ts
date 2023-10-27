import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "../user/repositories/user.repository";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { MailModule } from "../mail/mail.module";
import { GoogleStrategy } from "./strategies/google.strategy";
import { MongooseModule } from "@nestjs/mongoose";
import { User } from "src/user/entities/user.entity";
import { User as UserDoc, UserSchema } from "src/user/entities/user.schema";

/**
 * It is a feature module where we keep the controller, service and other code related to authentication and  we import other modules and configure modules and packages that are being used in this module.
 *
 * Here, feature modules imported are - DatabaseModule, AuthModule, MailModule and UserModule.
 * other modules are :
 *      TypeOrmModule - it is an ORM and enables easy access to database.
 *      PassportModule - it enables us to setup multiple types of authentication.
 *      JwtModule - it is used for token creation for authentication.
 */
@Module({
  imports: [
    ConfigModule,
    // FIXME:
    TypeOrmModule.forFeature([User]),
    MongooseModule.forFeature([{ name: UserDoc.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>("JWT_SECRET"),
          signOptions: {
            expiresIn: configService.get<string>("EXPIRES_IN"),
          },
        };
      },
    }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
  exports: [AuthService, PassportModule, JwtStrategy],
})
export class AuthModule {}
