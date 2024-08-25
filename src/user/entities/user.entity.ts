import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserRoles } from "../enums/role.enum";

/**
 * It describes the schema for user table in database.
 */
@Entity({ name: "users" })
export class User {
  /**
   * auto-generated unique uuid primary key for the table.
   */
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty()
  id: string;

  /**
   * googleId of the user user for google auth.
   */
  @Column({ unique: true, default: null })
  @Exclude({ toPlainOnly: true })
  googleID: string;

  /**
   * firstName of user.
   */
  @Column({ length: 50 })
  @ApiProperty()
  firstName: string;

  /**
   * lastName of user.
   */
  @Column({ length: 50 })
  @ApiProperty()
  lastName: string;

  /**
   * email address of user.
   */
  @Column({ unique: true, length: 100 })
  @ApiProperty()
  email: string;

  /**
   * hashed password of user.
   */
  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  /**
   * password reset Token for password reset methods.
   */
  @Column({ default: null })
  @Exclude({ toPlainOnly: true })
  passwordResetToken: string;

  /**
   * password reset token Expiration time .
   */
  @Column({ default: null })
  @Exclude({ toPlainOnly: true })
  passwordResetExpires: string;

  /**
   * represents activation state of user.
   */
  @Column({ type: "boolean", default: false })
  @ApiProperty({ default: false })
  active: boolean;

  /**
   * account activation token for user.
   */
  @Column({ default: null })
  @Exclude({ toPlainOnly: true })
  activeToken: string;

  /**
   * role of user. default is UserRoles.USER.
   */
  @Column("enum", { array: true, enum: UserRoles, default: `{${UserRoles.USER}}` })
  @ApiProperty({
    enum: UserRoles,
    default: [UserRoles.USER],
    description: `String array, containing enum values, either ${UserRoles.USER} or ${UserRoles.ADMIN}`,
  })
  roles: UserRoles[1]; // NOTE: You can change the size to assign multiple roles to a single user.

  /**
   * timestamp for date of user creation.
   */
  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  /**
   * timestamp for date of user information updation.
   */
  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  /**
   * timestamp for date of user soft-delete
   */
  @DeleteDateColumn()
  @ApiProperty()
  deletedAt: Date;
}
