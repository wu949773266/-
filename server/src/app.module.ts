import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { SurveyModule } from './survey/survey.module';
import { ActivitySurveyModule } from './activity-survey/activity-survey.module';

@Module({
  imports: [SurveyModule, ActivitySurveyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
