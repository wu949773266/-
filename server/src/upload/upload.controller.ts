import { Controller, Post } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  /**
   * 上传雨崩住宿环境图片到 TOS
   * POST /api/upload/hotel-images
   */
  @Post('hotel-images')
  async uploadHotelImages() {
    // 定义需要上传的图片文件（相对 server 目录）
    const hotelFiles = [
      { localPath: '../assets/微信图片_20260408021401_340.jpg', destName: 'hotel/yubeng-1.jpg' },
      { localPath: '../assets/微信图片_20260408021401_342.jpg', destName: 'hotel/yubeng-2.jpg' },
      { localPath: '../assets/微信图片_20260408021401_344.jpg', destName: 'hotel/yubeng-3.jpg' },
      { localPath: '../assets/微信图片_20260408021633_401.jpg', destName: 'hotel/yubeng-4.jpg' },
      { localPath: '../assets/微信图片_20260408021723_414.jpg', destName: 'hotel/yubeng-5.jpg' },
      { localPath: '../assets/微信图片_20260408021633_395.jpg', destName: 'hotel/yubeng-6.jpg' },
      { localPath: '../assets/微信图片_20260408021401_350.jpg', destName: 'hotel/yubeng-7.jpg' },
      { localPath: '../assets/微信图片_20260408021401_352.jpg', destName: 'hotel/yubeng-8.jpg' },
      { localPath: '../assets/微信图片_20260408021401_354.jpg', destName: 'hotel/yubeng-9.jpg' },
    ];

    const urls = await this.uploadService.batchUploadFiles(hotelFiles);

    return {
      code: 200,
      msg: 'success',
      data: {
        hotelImages: Object.values(urls),
      },
    };
  }
}
