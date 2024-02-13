import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./entities/user.entity";
import { MailService } from "../mail/mail.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User as UserDoc } from "../user/entities/user.schema";

/**
 * This service contain contains methods and business logic related to user.
 */
@Injectable()
export class UserService {
  private readonly logger = new Logger("USER");

  constructor(
    // FIXME:
    @InjectRepository(User) private userRepository: Repository<User>,
    // @InjectModel(UserDoc.name) private userModel: Model<UserDoc>,
    private readonly mailService: MailService,
  ) {}
  // async getAllUsers(): Promise<UserDoc[]> {
  async getAllUsers(): Promise<User[]> {
    // const users = await this.userModel.find().exec();
    const users = await this.userRepository.find();

    return users;
  }

  /**
   * it updates the user information as per provided information.
   * @param updateUserDto user information that needs to be updated.
   * @param user user information of current logged in user.
   * @returns updated user information
   */
  async updateUserData(updateUserDto: UpdateUserDto, user: User) {
    const { fullName } = updateUserDto;

    const names = fullName.split(" ");

    const firstName = names.splice(0, 1)[0];
    const lastName = names.join(" ");

    this.logger.log(`Checking if user exists`);
    const currentUser = await this.userRepository.findOne({ where: { id: user.id } });

    if (!currentUser) throw new NotFoundException("User Not Found");

    this.logger.log(`Create Updated User`);
    if (firstName) currentUser.firstName = firstName;
    if (lastName) currentUser.lastName = lastName;

    if (currentUser.firstName === user.firstName && currentUser.lastName === user.lastName) {
      this.logger.log(`User didn't update any data`);
      return user;
    }

    this.logger.log(`Save Updated User`);
    await this.userRepository.save(currentUser);

    this.logger.log("Sending update Confirmation Mail");
    this.mailService.sendConfirmationOnUpdatingUser(user);

    return currentUser;
  }
}
