import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "../../auth/dto/create-user.dto";
import { User } from "../entities/user.entity";
import { argon2hash } from "../../utils/hashes/argon2";
import { sha256, tokenCreate } from "src/utils/hashes/hash";

/**
 * It contains all methods for user data manipulation in DB.
 */
@EntityRepository(User)

// export class UserRepository extends Repository<User> {
export class UserRepository extends Repository<User> {
  /**
   * it creates and saves new user object in database. it also handles password hashing.
   * @param createAuthDto dto object containing user details.
   * @returns newly created user object and activation token.
   */
  // async createUser(createAuthDto: CreateUserDto): Promise<{ user: User; activateToken: string }> {
  //   let { password, fullName, email } = createAuthDto;
  //   password = await argon2hash(password); // NOTE: Hash the password
  //   try {
  //     // NOTE: Generate user activating token
  //     const activateToken: string = tokenCreate();
  //     const names = fullName.split(" ");
  //     let user = new User();
  //     user.firstName = names.splice(0, 1)[0];
  //     user.lastName = names.join(" ");
  //     user.email = email;
  //     user.password = password;
  //     user.activeToken = sha256(activateToken);
  //     user = await this.save(user);
  //     return { user, activateToken };
  //   } catch (err) {
  //     if (err.code === "23505") throw new ConflictException("Email already exists");
  //     else throw new InternalServerErrorException();
  //   }
  // }
  // /**
  //  * it checks for user in DB and if not found, creates and saves new user object in database. it is used for google authentication
  //  * @param user user information provided by google.
  //  * @returns newly created user object and activation token
  //  */
  // async createOrFindUserGoogle(user: any) {
  //   const existingUser = await this.findOne({ where: { googleID: user.id } });
  //   if (existingUser) return { existingUser, sendMail: false };
  //   const activateToken: string = tokenCreate();
  //   let newUser = new User();
  //   newUser.googleID = user.id;
  //   newUser.firstName = user.firstName;
  //   newUser.lastName = user.lastName;
  //   newUser.email = user.email;
  //   newUser.activeToken = sha256(activateToken);
  //   try {
  //     newUser = await this.save(newUser);
  //   } catch (err) {
  //     if (err.code === "23505") throw new ConflictException("User already exists");
  //     else throw new InternalServerErrorException();
  //   }
  //   return { newUser, activateToken, sendMail: true };
  // }
  // /**
  //  * it creates password reset token and saves it in user object.
  //  * @param user user object containing user information.
  //  * @returns created password reset token.
  //  */
  // async createPasswordResetToken(user: User): Promise<string> {
  //   const resetToken: string = tokenCreate();
  //   user.passwordResetToken = sha256(resetToken);
  //   const timestamp = Date.now() + 10 * 60 * 1000; // NOTE: 10 mins to reset password
  //   user.passwordResetExpires = timestamp.toString();
  //   await this.save(user);
  //   return resetToken;
  // }
}
