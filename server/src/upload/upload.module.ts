import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { HotelController } from './hotel.controller';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadController, HotelController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
