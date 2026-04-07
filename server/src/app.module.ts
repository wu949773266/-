import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { SurveyModule } from './survey/survey.module';
import { ActivitySurveyModule } from './activity-survey/activity-survey.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [SurveyModule, ActivitySurveyModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
