import { Module } from '@nestjs/common';
import { ActivitySurveyController } from './activity-survey.controller';
import { ActivitySurveyService } from './activity-survey.service';

@Module({
  controllers: [ActivitySurveyController],
  providers: [ActivitySurveyService],
  exports: [ActivitySurveyService],
})
export class ActivitySurveyModule {}
