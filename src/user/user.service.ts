import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { MailService } from "../mail/mail.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectLogger } from "../shared/decorators/logger.decorator";

/**
 * This service contain contains methods and business logic related to user.
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectLogger() private readonly logger: Logger,
    private readonly mailService: MailService
  ) {}

  async getAllUsers(): Promise<User[]> {
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
