import { Controller, Get, Post, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { SurveyService } from './survey.service';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  // 获取当前问卷（用户端）
  @Get()
  async getCurrentSurvey() {
    const survey = await this.surveyService.getActiveSurvey();
    if (!survey) {
      return { status: 'success', data: null };
    }

    const questions = await this.surveyService.getSurveyQuestions(survey.id);
    return {
      status: 'success',
      data: {
        ...survey,
        questions,
      },
    };
  }

  // 提交评价（用户端）
  @Post('response')
  @HttpCode(HttpStatus.OK)
  async submitResponse(
    @Body() body: { userName: string; answers: Record<string, any> }
  ) {
    const survey = await this.surveyService.getActiveSurvey();
    if (!survey) {
      return { status: 'error', message: '暂无有效问卷' };
    }

    const result = await this.surveyService.submitResponse(
      survey.id,
      body.userName,
      body.answers
    );

    return {
      status: 'success',
      data: result,
      message: '评价提交成功，感谢您的反馈！',
    };
  }

  // 获取评价列表（后台）
  @Get('responses')
  async getResponses(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '20'
  ) {
    const survey = await this.surveyService.getActiveSurvey();
    if (!survey) {
      return { status: 'success', data: [], total: 0 };
    }

    const data = await this.surveyService.getResponses(
      survey.id,
      parseInt(page),
      parseInt(pageSize)
    );

    return {
      status: 'success',
      data,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    };
  }

  // 获取评价统计（后台）
  @Get('stats')
  async getStats() {
    const survey = await this.surveyService.getActiveSurvey();
    if (!survey) {
      return { status: 'success', data: null };
    }

    const stats = await this.surveyService.getResponseStats(survey.id);
    return {
      status: 'success',
      data: stats,
    };
  }

  // 创建问卷（后台）
  @Post('create')
  async createSurvey(
    @Body() body: { title: string; description?: string }
  ) {
    const result = await this.surveyService.createSurvey(body.title, body.description);
    return {
      status: 'success',
      data: result,
    };
  }

  // 添加问题（后台）
  @Post('question')
  async addQuestion(
    @Body() body: {
      surveyId: number;
      questionText: string;
      questionType: string;
      options?: string[];
      required?: boolean;
      orderIndex?: number;
    }
  ) {
    const result = await this.surveyService.addQuestion(
      body.surveyId,
      body.questionText,
      body.questionType,
      body.options,
      body.required ?? true,
      body.orderIndex ?? 0
    );
    return {
      status: 'success',
      data: result,
    };
  }
}
