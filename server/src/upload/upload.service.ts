import { Injectable } from '@nestjs/common';
import { S3Storage } from 'coze-coding-dev-sdk';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  private storage: S3Storage;

  constructor() {
    this.storage = new S3Storage({
      endpointUrl: process.env.COZE_BUCKET_ENDPOINT_URL,
      accessKey: '',
      secretKey: '',
      bucketName: process.env.COZE_BUCKET_NAME,
      region: 'cn-beijing',
    });
  }

  /**
   * 上传本地文件到 TOS 对象存储
   * @param localFilePath 本地文件路径（如 assets/xxx.jpg）
   * @param destFileName 目标文件名（如 hotel/yubeng-1.jpg）
   */
  async uploadLocalFile(localFilePath: string, destFileName: string): Promise<string> {
    // 读取本地文件
    const fullPath = path.join(process.cwd(), localFilePath);
    const fileBuffer = fs.readFileSync(fullPath);

    // 获取文件类型
    const ext = path.extname(localFilePath).toLowerCase();
    const contentTypeMap: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
    };
    const contentType = contentTypeMap[ext] || 'application/octet-stream';

    // 上传到 TOS
    const key = await this.storage.uploadFile({
      fileContent: fileBuffer,
      fileName: destFileName,
      contentType,
    });

    return key;
  }

  /**
   * 批量上传文件并返回 URL 映射
   */
  async batchUploadFiles(files: Array<{ localPath: string; destName: string }>): Promise<Record<string, string>> {
    const result: Record<string, string> = {};

    for (const file of files) {
      try {
        const key = await this.uploadLocalFile(file.localPath, file.destName);
        // 生成签名 URL（有效期 30 天）
        const url = await this.storage.generatePresignedUrl({
          key,
          expireTime: 30 * 24 * 60 * 60,
        });
        result[file.destName] = url;
      } catch (error) {
        console.error(`Failed to upload ${file.destName}:`, error);
        result[file.destName] = '';
      }
    }

    return result;
  }
}
