import { Injectable, Logger } from "@nestjs/common";
import { InjectLogger } from "../shared/decorators/logger.decorator";
import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
  S3ServiceException,
} from "@aws-sdk/client-s3";
import { ConfigService } from "@nestjs/config";
import { PrimaryPaths } from "./enums/primary-path.enum";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

@Injectable()
export class S3Service {
  private s3: S3Client;
  constructor(
    private readonly configService: ConfigService,
    @InjectLogger() private readonly logger: Logger
  ) {
    this.s3 = new S3Client({
      region: this.configService.get<string>("AWS_REGION"),
      credentials: {
        accessKeyId: this.configService.get<string>("AWS_ACCESS_KEY"),
        secretAccessKey: this.configService.get<string>("AWS_SECRET_ACCESS_KEY"),
      },
    });
  }

  /**
   * @description Generate S3 pre signed url
   * @param fileName orignal filename with extension
   * @param expiresIn pre signed url expiry in seconds
   * @param primaryPath {@link PrimaryPaths} parimary path denoting user operations
   * @returns {url, key, method, expiresIn}
   * @author Debi Prasad
   * @example The folder structure will be this
   * PrimaryPath/
   *           │
   *           └───2023/
   *                │
   *                └───04/
   *                    │
   *                    └───15/
   *                        │
   *                        ├─ Beach-1675000000.png
   *                        │
   *                        ├─ Family_Photo-1675000000.jpg
   *                        │
   *                        ├─ Concert_-1675000000.gif
   *                        │
   *                        ├─ My_Artwork-1675000000.jpeg
   *                        │
   *                        └─ Screenshot_Work-1675000000.bmp
   *
   */
  async getPreSignedUrl(fileName: string, primaryPath: PrimaryPaths, expiresIn: number = 300) {
    const date = new Date().toISOString().split("T")[0].replace(/-/g, "/");
    const fileNameArr = fileName.split(".");
    const originalFileName = fileNameArr[0].replace(/[^a-zA-Z0-9]/g, "_");
    const contentType = fileNameArr[fileNameArr.length - 1];
    const imageName = `${primaryPath}/${date}/${originalFileName}-${Date.now()}.${contentType}`;
    const params: PutObjectCommandInput = {
      Bucket: this.configService.get<string>("AWS_PUBLIC_BUCKET_NAME"),
      Key: imageName,
      ContentType: contentType,
    };

    const command = new PutObjectCommand(params);
    const url = await getSignedUrl(this.s3, command, { expiresIn });

    // console.log(url);

    return { url, key: imageName, method: "PUT", expiresIn: `${expiresIn}s` };
  }

  async deleteObject(imageName: string) {
    const params: DeleteObjectCommandInput = {
      Bucket: this.configService.get<string>("AWS_PUBLIC_BUCKET_NAME"),
      Key: imageName,
    };

    const command = new DeleteObjectCommand(params);
    const result = await this.s3.send(command);

    if (result.DeleteMarker) return true;
    else
      throw new S3ServiceException({
        message: "File not deleted",
        name: "File Not Deleted",
        $fault: "client",
        $metadata: {},
      });
  }
}
