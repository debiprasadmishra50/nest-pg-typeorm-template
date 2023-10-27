import { Controller, Get } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiTags } from "@nestjs/swagger";
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  // FIXME: Select ORM
  TypeOrmHealthIndicator,
  // MongooseHealthIndicator,
} from "@nestjs/terminus";

@Controller("health")
@ApiTags("Health Check")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    // FIXME: Select ORM
    private dbSQL: TypeOrmHealthIndicator,
    // private dbNoSQL: MongooseHealthIndicator,
    private memory: MemoryHealthIndicator,
    private configService: ConfigService,
  ) {}

  @Get("database")
  @HealthCheck()
  checkDatabase() {
    return this.health.check([
      () => this.dbSQL.pingCheck(this.configService.get<string>("DATABASE")),
      // () => this.dbNoSQL.pingCheck(this.configService.get<string>("DATABASE")),
    ]);
  }

  @Get("memory")
  @HealthCheck()
  checkMemory() {
    const memSize = 150 * 1024 * 1024; // 150MB

    return this.health.check([
      () => this.memory.checkHeap("memory_heap", memSize),
      () => this.memory.checkRSS("memory_rss", memSize),
    ]);
  }
}
