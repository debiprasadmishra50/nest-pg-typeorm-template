import { Controller, Delete, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { AccountActivatedGuard } from "../user/guards/account-activation.guard";
import { S3Service } from "./s3.service";
import { PreSignedUrlDTO } from "./dto/pre-signed-url.dto";

@ApiTags("S3")
@ApiBearerAuth()
@Controller("s3")
// @UseGuards(JwtAuthGuard, AccountActivatedGuard)
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Get("pre-signed-url")
  @ApiOkResponse({ description: "Get S3 pre signed url" })
  async getPreSignedUrl(@Query() preSignedUrlDto: PreSignedUrlDTO) {
    const { fileName, primaryPath, expiresIn } = preSignedUrlDto;

    const result = await this.s3Service.getPreSignedUrl(fileName, primaryPath, expiresIn);

    return { status: "success", data: result };
  }

  @Delete("delete/:key")
  @ApiOkResponse({ description: "Delete S3 object" })
  async delete(@Param("key") key: string) {
    const result = await this.s3Service.deleteObject(key);

    return result === true
      ? { status: "success", data: result }
      : { status: "failed", data: "File Not Deleted" };
  }
}
