import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ormconfig } from "../configs/ormconfig";

/**
 * It is a feature module where we keep code related to database. we import the typeorm module and configure it to work with any database.
 */
@Module({
  imports: [TypeOrmModule.forRoot(ormconfig)],
})
export class PostgreSQLDatabaseModule {}
