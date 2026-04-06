import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ActivitySurveyService } from './activity-survey.service';

@Controller('activity-survey')
export class ActivitySurveyController {
  constructor(private readonly service: ActivitySurveyService) {}

  // ===== 活动管理接口 =====

  // 创建活动
  @Post('activity')
  async createActivity(
    @Body() body: { name: string; date?: string; description?: string; adminPassword?: string }
  ) {
    const result = await this.service.createActivity(body.name, body.date, body.description, body.adminPassword);
    return { status: 'success', data: result };
  }

  // 获取所有活动
  @Get('activities')
  async getActivities() {
    const data = await this.service.getActivities();
    // 不返回密码
    const safeData = data?.map((a: any) => ({
      ...a,
      admin_password: undefined,
    }));
    return { status: 'success', data: safeData };
  }

  // 获取活跃活动（用户端用）
  @Get('activities/active')
  async getActiveActivities() {
    const data = await this.service.getActiveActivities();
    return { status: 'success', data };
  }

  // 验证管理员密码
  @Post('verify-password')
  @HttpCode(HttpStatus.OK)
  async verifyPassword(
    @Body() body: { activityId: number; password: string }
  ) {
    const isValid = await this.service.verifyAdminPassword(body.activityId, body.password);
    return { status: 'success', data: { isValid } };
  }

  // 更新活动
  @Put('activity/:id')
  async updateActivity(
    @Param('id') id: string,
    @Body() body: { name?: string; date?: string; description?: string; is_active?: boolean; admin_password?: string }
  ) {
    const result = await this.service.updateActivity(parseInt(id), body);
    return { status: 'success', data: result };
  }

  // 设置活动管理密码
  @Post('activity/:id/password')
  async setActivityPassword(
    @Param('id') id: string,
    @Body() body: { password: string }
  ) {
    await this.service.setActivityPassword(parseInt(id), body.password);
    return { status: 'success', message: '密码设置成功' };
  }

  // 删除活动
  @Delete('activity/:id')
  async deleteActivity(@Param('id') id: string) {
    await this.service.deleteActivity(parseInt(id));
    return { status: 'success', message: '删除成功' };
  }

  // ===== 问卷管理接口 =====

  @Post('survey')
  async createSurvey(
    @Body() body: { activityId: number; title: string; description?: string }
  ) {
    const result = await this.service.createSurvey(body.activityId, body.title, body.description);
    return { status: 'success', data: result };
  }

  @Get('survey/activity/:activityId')
  async getActivitySurvey(@Param('activityId') activityId: string) {
    const data = await this.service.getActivitySurveyWithQuestions(parseInt(activityId));
    return { status: 'success', data };
  }

  @Put('survey/:id')
  async updateSurvey(
    @Param('id') id: string,
    @Body() body: { title?: string; description?: string }
  ) {
    const result = await this.service.updateSurvey(parseInt(id), body);
    return { status: 'success', data: result };
  }

  @Delete('survey/:id')
  async deleteSurvey(@Param('id') id: string) {
    await this.service.deleteSurvey(parseInt(id));
    return { status: 'success', message: '删除成功' };
  }

  // ===== 问题管理接口 =====

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
    const result = await this.service.addQuestion(
      body.surveyId,
      body.questionText,
      body.questionType,
      body.options,
      body.required ?? true,
      body.orderIndex ?? 0
    );
    return { status: 'success', data: result };
  }

  @Post('questions')
  async addQuestions(
    @Body() body: {
      surveyId: number;
      questions: Array<{
        question_text: string;
        question_type: string;
        options?: string[];
        required?: boolean;
        order_index?: number;
      }>;
    }
  ) {
    const result = await this.service.addQuestions(body.surveyId, body.questions);
    return { status: 'success', data: result };
  }

  @Put('question/:id')
  async updateQuestion(
    @Param('id') id: string,
    @Body() body: { question_text?: string; question_type?: string; options?: string[]; required?: boolean; order_index?: number }
  ) {
    const result = await this.service.updateQuestion(parseInt(id), body);
    return { status: 'success', data: result };
  }

  @Delete('question/:id')
  async deleteQuestion(@Param('id') id: string) {
    await this.service.deleteQuestion(parseInt(id));
    return { status: 'success', message: '删除成功' };
  }

  // ===== 回答管理接口 =====

  // 提交回答（用户端用，匿名，返回查询码）
  @Post('response')
  @HttpCode(HttpStatus.OK)
  async submitResponse(
    @Body() body: { activityId: number; answers: Record<string, any> }
  ) {
    const survey = await this.service.getSurveyByActivityId(body.activityId);
    if (!survey) {
      return { status: 'error', message: '该活动暂无可用问卷' };
    }

    const result = await this.service.submitResponse(survey.id, body.answers);
    return {
      status: 'success',
      data: { query_code: result.query_code },
      message: '提交成功，感谢您的反馈！',
    };
  }

  // 通过查询码查看自己的回答
  @Get('my-response')
  async getMyResponse(
    @Query('activityId') activityId: string,
    @Query('code') code: string
  ) {
    const survey = await this.service.getSurveyByActivityId(parseInt(activityId));
    if (!survey) {
      return { status: 'error', message: '该活动暂无可用问卷' };
    }

    const data = await this.service.getResponseByCode(survey.id, code);
    if (!data) {
      return { status: 'error', message: '未找到对应的回答，请核对查询码' };
    }

    return { status: 'success', data };
  }

  // 获取活动的所有回答（后台用，需要密码）
  @Get('responses/activity/:activityId')
  async getActivityResponses(
    @Param('activityId') activityId: string,
    @Query('password') password: string
  ) {
    const isValid = await this.service.verifyAdminPassword(parseInt(activityId), password);
    if (!isValid) {
      return { status: 'error', message: '管理员密码错误' };
    }

    const data = await this.service.getActivityResponses(parseInt(activityId));
    return { status: 'success', data };
  }

  // 获取活动的统计数据（后台用，需要密码）
  @Get('stats/activity/:activityId')
  async getActivityStats(
    @Param('activityId') activityId: string,
    @Query('password') password: string
  ) {
    const isValid = await this.service.verifyAdminPassword(parseInt(activityId), password);
    if (!isValid) {
      return { status: 'error', message: '管理员密码错误' };
    }

    const data = await this.service.getActivityStats(parseInt(activityId));
    return { status: 'success', data };
  }
}
