import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { getConnectionManager } from "typeorm";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import csurf from "csurf";
import xssClean from "xss-clean";
import hpp from "hpp";
import * as express from "express";
import { ConfigService } from "@nestjs/config";

// FIXME:
import mongoSanitize from "express-mongo-sanitize";

import { AppModule } from "./app.module";

/**
 * function for bootstraping the nest application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
    logger: ["error", "fatal", "log", "verbose", "warn", "debug"],
  });
  const configService = app.get<ConfigService>(ConfigService);
  const expressApp = app.getHttpAdapter() as unknown as express.Application;

  app.setGlobalPrefix("/api");
  app.enableVersioning({
    defaultVersion: "1",
    type: VersioningType.URI,
  });
  app;

  app.enableCors();
  app.use(cookieParser());
  app.use(compression());

  // FIXME: Use only when use MongoDB
  // app.use(mongoSanitize());

  app.use(express.json({ limit: "50kb" }));
  app.use(express.urlencoded({ extended: true, limit: "50kb" }));

  expressApp.disable("x-powered-by"); // provide an extra layer of obsecurity to reduce server fingerprinting.
  expressApp.set("trust proxy", 1); // trust first proxy

  const ignoreMethods =
    configService.get<string>("STAGE") == "dev"
      ? ["GET", "HEAD", "OPTIONS", "DELETE", "POST", "PATCH", "PUT"] // for devlopment we ignoring all
      : ["GET", "HEAD", "OPTIONS", "DELETE"];
  app.use(
    csurf({
      cookie: { httpOnly: true, secure: true },
      ignoreMethods,
    }),
  );
  app.use(
    helmet({
      hsts: {
        includeSubDomains: true,
        preload: true,
        maxAge: 63072000,
      },
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          defaultSrc: [
            "'self'",
            // "data:",
            // "blob:",
            "https://polyfill.io",
            "https://*.cloudflare.com",
            "http://127.0.0.1:3000/",
            // "ws:",
          ],
          baseUri: ["'self'"],
          scriptSrc: [
            "'self'",
            "http://127.0.0.1:3000/",
            "https://*.cloudflare.com",
            "https://polyfill.io",
            // "http:",
            // "data:",
          ],
          styleSrc: ["'self'", "https:", "http:", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "blob:"],
          fontSrc: ["'self'", "https:", "data:"],
          childSrc: ["'self'", "blob:"],
          styleSrcAttr: ["'self'", "'unsafe-inline'", "http:"],
          frameSrc: ["'self'"],
        },
      },
    }),
  );
  app.use(xssClean());
  app.use(hpp());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  /* FIXME:
    ##########################
    ##### Set-up Swagger #####
    ##########################
  */
  if (!["prod", "production"].includes(configService.get<string>("STAGE").toLowerCase())) {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle(configService.get<string>("npm_package_name").replaceAll("-", " ").toUpperCase())
      .setDescription("DESCRIPTION")
      .setVersion(configService.get<string>("npm_package_version"))
      .build();

    const document = SwaggerModule.createDocument(app, config, { ignoreGlobalPrefix: false });
    SwaggerModule.setup("api", app, document, {
      swaggerOptions: {
        tagsSorter: "alpha",
      },
    });
  }

  /* FIXME:
    ##########################
    ####### Migrations #######
    ##########################
  */
  // const connectionManager = getConnectionManager();
  // console.log(connectionManager.connections);
  // const connection = connectionManager.get("default");
  // await connection.runMigrations();

  const port = configService.get<string>("PORT") || 3000;
  await app.listen(port, () => {
    console.log("Server started on port: " + port);
  });
}
bootstrap();
