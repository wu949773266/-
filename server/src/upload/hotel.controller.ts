import { Controller, Get } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('hotel')
export class HotelController {
  constructor(private readonly uploadService: UploadService) {}

  /**
   * 获取雨崩住宿环境图片 URL
   * GET /api/hotel/images
   */
  @Get('images')
  async getHotelImages() {
    // 定义已上传的图片 key
    const imageKeys = [
      'hotel/yubeng-1_ce2f7647.jpg',
      'hotel/yubeng-2_b05f149a.jpg',
      'hotel/yubeng-3_f64706a7.jpg',
      'hotel/yubeng-4_b55fa8b6.jpg',
      'hotel/yubeng-5_265bf4a3.jpg',
      'hotel/yubeng-6_689981cb.jpg',
      'hotel/yubeng-7_572cc2d8.jpg',
      'hotel/yubeng-8_43234894.jpg',
      'hotel/yubeng-9_03c2c983.jpg',
    ];

    // 生成新的签名 URL（有效期 30 天）
    const urls = await this.uploadService.generateImageUrls(imageKeys);

    return {
      code: 200,
      msg: 'success',
      data: {
        images: urls,
        expiresIn: 30 * 24 * 60 * 60, // 30 天秒数
      },
    };
  }
}
