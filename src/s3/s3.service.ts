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
    this.logger.log(`generating pre-signed-url for file ${fileName}`, S3Service.name);

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

  /**
   * Deletes an object from S3 bucket
   *
   * @param imageName - The key/path of the object to delete
   * @returns true if deletion was successful, false otherwise
   * @throws S3ServiceException if there's an error with the S3 service
   */
  async deleteObject(imageName: string): Promise<boolean> {
    this.logger.log(`Deleting file ${imageName}`, S3Service.name);

    try {
      const params: DeleteObjectCommandInput = {
        Bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
        Key: imageName,
      };

      const command = new DeleteObjectCommand(params);
      const result = await this.s3.send(command);

      // For versioned buckets, DeleteMarker will be true
      // For non-versioned buckets, a successful delete returns 204 No Content
      const isSuccess = result.DeleteMarker === true || result.$metadata?.httpStatusCode === 204;

      if (isSuccess) {
        this.logger.log(`Successfully deleted ${imageName}`, S3Service.name);
        return true;
      } else {
        this.logger.warn(`Deletion of ${imageName} may not have been successful`, S3Service.name);
        return false;
      }
    } catch (error) {
      // Log the error with proper context
      this.logger.error(
        `Failed to delete object ${imageName}: ${error.message}`,
        error.stack,
        S3Service.name,
      );

      // Throw a properly formatted exception
      throw new S3ServiceException({
        message: `Failed to delete file: ${error.message}`,
        name: 'S3DeleteObjectError',
        $fault: 'client',
        $metadata: error.$metadata || {},
      });
    }
}
