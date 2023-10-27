import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";
import { IsNotAdmin } from "src/shared/decorators/not-admin.decorator";

export class CreateUserDto {
  /**
   * FirstName of user
   */
  @ApiProperty({ required: true, description: "First Name of user" })
  @IsString({ message: "First name must be a string" })
  @IsNotEmpty({ message: "First name can not be empty" })
  @MaxLength(20, { message: "First Name exceeds given length" })
  @MinLength(1, { message: "First name has to be of length 1" })
  @IsNotAdmin()
  @IsAlpha()
  firstName: string;

  /**
   * FirstName of user
   */
  @ApiProperty({ required: true, description: "Last Name of user" })
  @IsString({ message: "Last name must be a string" })
  @IsNotEmpty({ message: "Last name can not be empty" })
  lastName: string;

  /**
   * Email of user
   */
  @ApiProperty({ required: true, description: "Email of user" })
  @IsEmail({}, { message: "Invalid Email" })
  @IsString({ message: "Email can not be only numbers" })
  @IsNotEmpty({ message: "email can not be empty" })
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string;

  /**
   * Password user wants provide
   */
  @ApiProperty({ required: true, description: "Password user wants provide" })
  @IsNotEmpty({ message: "Password can not be empty" })
  @MinLength(8, { message: "Password must contain minimum of 8 characters" })
  @MaxLength(32, { message: "Password must contain maximum of 32 characters" })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Weak Password",
  })
  password: string;
}
