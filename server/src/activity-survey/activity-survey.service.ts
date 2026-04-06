import { Injectable } from '@nestjs/common';
import { getSupabaseClient } from '@/storage/database/supabase-client';

@Injectable()
export class ActivitySurveyService {
  private client = getSupabaseClient();

  // 生成6位查询码
  private generateQueryCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // ===== 活动管理 =====

  // 创建活动
  async createActivity(name: string, date?: string, description?: string, adminPassword?: string) {
    const { data, error } = await this.client
      .from('activities')
      .insert({
        name,
        date: date || null,
        description: description || null,
        is_active: true,
        admin_password: adminPassword || null,
      })
      .select()
      .single();

    if (error) throw new Error(`创建活动失败: ${error.message}`);
    return data;
  }

  // 获取所有活动
  async getActivities() {
    const { data, error } = await this.client
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(`获取活动列表失败: ${error.message}`);
    return data;
  }

  // 获取活跃活动列表（用于用户选择）
  async getActiveActivities() {
    const { data, error } = await this.client
      .from('activities')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`获取活跃活动失败: ${error.message}`);
    return data;
  }

  // 验证管理员密码
  async verifyAdminPassword(activityId: number, password: string): Promise<boolean> {
    const { data, error } = await this.client
      .from('activities')
      .select('admin_password')
      .eq('id', activityId)
      .maybeSingle();

    if (error) throw new Error(`验证失败: ${error.message}`);
    
    // 如果没有设置密码，任何密码都可以访问（兼容旧数据）
    if (!data?.admin_password) return true;
    
    return data.admin_password === password;
  }

  // 更新活动
  async updateActivity(id: number, updates: { name?: string; date?: string; description?: string; is_active?: boolean; admin_password?: string }) {
    const { data, error } = await this.client
      .from('activities')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`更新活动失败: ${error.message}`);
    return data;
  }

  // 删除活动
  async deleteActivity(id: number) {
    const { error } = await this.client
      .from('activities')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`删除活动失败: ${error.message}`);
    return { success: true };
  }

  // 设置活动管理密码
  async setActivityPassword(id: number, password: string) {
    const { error } = await this.client
      .from('activities')
      .update({ admin_password: password })
      .eq('id', id);

    if (error) throw new Error(`设置密码失败: ${error.message}`);
    return { success: true };
  }

  // ===== 问卷管理 =====

  // 为活动创建问卷
  async createSurvey(activityId: number, title: string, description?: string) {
    const existing = await this.client
      .from('activity_surveys')
      .select('id')
      .eq('activity_id', activityId)
      .maybeSingle();

    if (existing?.data) {
      throw new Error('该活动已存在问卷，请先删除现有问卷');
    }

    const { data, error } = await this.client
      .from('activity_surveys')
      .insert({
        activity_id: activityId,
        title,
        description: description || null,
      })
      .select()
      .single();

    if (error) throw new Error(`创建问卷失败: ${error.message}`);
    return data;
  }

  // 获取活动的问卷
  async getSurveyByActivityId(activityId: number) {
    const { data, error } = await this.client
      .from('activity_surveys')
      .select('*')
      .eq('activity_id', activityId)
      .maybeSingle();

    if (error) throw new Error(`查询问卷失败: ${error.message}`);
    return data;
  }

  // 获取问卷详情（含问题）
  async getSurveyWithQuestions(surveyId: number) {
    const survey = await this.client
      .from('activity_surveys')
      .select('*')
      .eq('id', surveyId)
      .maybeSingle();

    if (!survey) return null;

    const questions = await this.client
      .from('activity_survey_questions')
      .select('*')
      .eq('survey_id', surveyId)
      .order('order_index', { ascending: true });

    if (questions.error) throw new Error(`查询问题失败: ${questions.error.message}`);

    return {
      ...survey,
      questions: questions.data,
    };
  }

  // 获取活动问卷（含问题）
  async getActivitySurveyWithQuestions(activityId: number) {
    const survey = await this.getSurveyByActivityId(activityId);
    if (!survey) return null;
    return this.getSurveyWithQuestions(survey.id);
  }

  // 更新问卷
  async updateSurvey(id: number, updates: { title?: string; description?: string }) {
    const { data, error } = await this.client
      .from('activity_surveys')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`更新问卷失败: ${error.message}`);
    return data;
  }

  // 删除问卷
  async deleteSurvey(id: number) {
    const { error } = await this.client
      .from('activity_surveys')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`删除问卷失败: ${error.message}`);
    return { success: true };
  }

  // ===== 问题管理 =====

  async addQuestion(
    surveyId: number,
    questionText: string,
    questionType: string,
    options?: string[],
    required: boolean = true,
    orderIndex: number = 0
  ) {
    const { data, error } = await this.client
      .from('activity_survey_questions')
      .insert({
        survey_id: surveyId,
        question_text: questionText,
        question_type: questionType,
        options: options || null,
        required,
        order_index: orderIndex,
      })
      .select()
      .single();

    if (error) throw new Error(`添加问题失败: ${error.message}`);
    return data;
  }

  async updateQuestion(id: number, updates: { question_text?: string; question_type?: string; options?: string[]; required?: boolean; order_index?: number }) {
    const { data, error } = await this.client
      .from('activity_survey_questions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`更新问题失败: ${error.message}`);
    return data;
  }

  async deleteQuestion(id: number) {
    const { error } = await this.client
      .from('activity_survey_questions')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`删除问题失败: ${error.message}`);
    return { success: true };
  }

  async addQuestions(surveyId: number, questions: Array<{
    question_text: string;
    question_type: string;
    options?: string[];
    required?: boolean;
    order_index?: number;
  }>) {
    const records = questions.map((q, index) => ({
      survey_id: surveyId,
      question_text: q.question_text,
      question_type: q.question_type,
      options: q.options || null,
      required: q.required ?? true,
      order_index: q.order_index ?? index,
    }));

    const { data, error } = await this.client
      .from('activity_survey_questions')
      .insert(records)
      .select();

    if (error) throw new Error(`批量添加问题失败: ${error.message}`);
    return data;
  }

  // ===== 回答管理 =====

  // 提交回答（匿名，返回查询码）
  async submitResponse(surveyId: number, answers: Record<string, any>) {
    const queryCode = this.generateQueryCode();
    
    const { data, error } = await this.client
      .from('activity_survey_responses')
      .insert({
        survey_id: surveyId,
        answers,
        query_code: queryCode, // 添加查询码
      })
      .select()
      .single();

    if (error) throw new Error(`提交回答失败: ${error.message}`);
    return { ...data, query_code: queryCode };
  }

  // 通过查询码获取自己的回答
  async getResponseByCode(surveyId: number, queryCode: string) {
    const { data, error } = await this.client
      .from('activity_survey_responses')
      .select('*')
      .eq('survey_id', surveyId)
      .eq('query_code', queryCode)
      .maybeSingle();

    if (error) throw new Error(`查询回答失败: ${error.message}`);
    return data;
  }

  // 获取活动的所有回答（需要管理员密码）
  async getActivityResponses(activityId: number) {
    const survey = await this.getSurveyByActivityId(activityId);
    if (!survey) return [];

    const { data, error } = await this.client
      .from('activity_survey_responses')
      .select('*')
      .eq('survey_id', survey.id)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`查询回答失败: ${error.message}`);
    return data;
  }

  // 获取活动的统计数据
  async getActivityStats(activityId: number) {
    const survey = await this.getSurveyByActivityId(activityId);
    if (!survey) return null;

    const surveyWithQuestions = await this.getSurveyWithQuestions(survey.id);
    if (!surveyWithQuestions) return null;

    const { data, error } = await this.client
      .from('activity_survey_responses')
      .select('answers')
      .eq('survey_id', survey.id);

    if (error) throw new Error(`查询统计数据失败: ${error.message}`);

    const stats: Record<string, any> = {
      activity_id: activityId,
      activity_name: '',
      survey_title: survey.title,
      total_responses: data?.length || 0,
      question_stats: {},
    };

    const activityRes = await this.client
      .from('activities')
      .select('name')
      .eq('id', activityId)
      .maybeSingle();
    if (activityRes?.data) {
      stats.activity_name = activityRes.data.name;
    }

    // 辅助函数：从 answers 中提取指定问题的答案
    const extractAnswers = (answersField: any, questionId: string): any[] => {
      if (!answersField) return [];
      if (Array.isArray(answersField)) {
        // 数组格式: [{"questionId": 4, "value": "5"}, ...]
        return answersField
          .filter((a: any) => String(a.questionId) === questionId)
          .map((a: any) => a.value);
      }
      // 对象格式: {"4": "5", "5": "4", ...}
      const val = answersField[questionId];
      return val ? [val] : [];
    };

    for (const question of surveyWithQuestions.questions) {
      const questionId = String(question.id);
      const answers = data?.flatMap((r) => extractAnswers(r.answers, questionId)) || [];

      if (question.question_type === 'rating') {
        const numericAnswers = answers.map(Number).filter((n) => !isNaN(n));
        const avg = numericAnswers.length > 0
          ? (numericAnswers.reduce((a, b) => a + b, 0) / numericAnswers.length).toFixed(1)
          : 0;
        stats.question_stats[questionId] = {
          question_text: question.question_text,
          type: 'rating',
          average: parseFloat(avg as string),
          count: numericAnswers.length,
        };
      } else if (question.question_type === 'single_choice' || question.question_type === 'multi_choice') {
        const optionCounts: Record<string, number> = {};
        for (const answer of answers) {
          const options = Array.isArray(answer) ? answer : [answer];
          for (const opt of options) {
            optionCounts[opt] = (optionCounts[opt] || 0) + 1;
          }
        }
        stats.question_stats[questionId] = {
          question_text: question.question_text,
          type: question.question_type,
          options: optionCounts,
          total: answers.length,
        };
      } else {
        stats.question_stats[questionId] = {
          question_text: question.question_text,
          type: 'text',
          responses: answers,
          count: answers.length,
        };
      }
    }

    return stats;
  }
}
