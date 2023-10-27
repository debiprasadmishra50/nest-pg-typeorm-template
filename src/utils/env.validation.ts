// import { plainToInstance } from "class-transformer";
// import { IsEnum, IsNumber, IsString, IsUrl, validateSync } from "class-validator";
// import { ValidationError } from "./utils/errors/custom-validation.error";

// enum Environment {
//   DEVELOPMENT = "DEV",
//   STAGING = "STAGE",
//   UAT = "UAT",
//   PRODUCTION = "PROD",
//   TEST = "TEST",
// }

// class EnvironmentVariables {
//   @IsEnum(Environment)
//   NODE_ENV: Environment;

//   @IsUrl()
//   DB_HOST: string;

//   @IsNumber()
//   DB_PORT: string;

//   @IsString()
//   DB_USER: string;

//   @IsString()
//   DB_PASSWORD: string;

//   @IsString()
//   DATABASE: string;

//   @IsString()
//   JWT_SECRET: string;

//   @IsString()
//   EXPIRES_IN: string;

//   @IsString()
//   EMAIL_USERNAME: string;

//   @IsString()
//   EMAIL_PASSWORD: string;

//   @IsString()
//   EMAIL_HOST: string;

//   @IsNumber()
//   EMAIL_PORT: string;

//   @IsNumber()
//   THROTTLE_TTL: string;

//   @IsNumber()
//   THROTTLE_LIMIT: string;

//   @IsString()
//   GOOGLE_CLIENT_ID: string;

//   @IsString()
//   GOOGLE_CLIENT_SECRET: string;

//   @IsString()
//   FR_BASE_URL: string;
// }

// export function validate(config: Record<string, unknown>) {
//   const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
//   const errors = validateSync(validatedConfig, { skipMissingProperties: false });

//   if (errors.length > 0) {
//     throw new ValidationError(errors.toString());
//   }
//   return validatedConfig;
// }

/* 
    Another Way
*/

import * as Joi from "joi";

export const envSchema = Joi.object({
  NODE_ENV: Joi.string().required(),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DATABASE: Joi.string().required(),

  DB_MONGO_URI: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),
  EXPIRES_IN: Joi.string().required(),

  EMAIL_USERNAME: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),
  EMAIL_HOST: Joi.string().required(),
  EMAIL_PORT: Joi.number().required(),

  THROTTLE_TTL: Joi.number().required(),
  THROTTLE_LIMIT: Joi.number().required(),

  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),

  FR_BASE_URL: Joi.string().required(),
});
