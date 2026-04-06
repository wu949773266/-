import { Injectable } from '@nestjs/common';
import { getSupabaseClient } from '@/storage/database/supabase-client';

@Injectable()
export class SurveyService {
  private client = getSupabaseClient();

  // 获取当前激活的问卷
  async getActiveSurvey() {
    const { data, error } = await this.client
      .from('surveys')
      .select('*')
      .eq('is_active', true)
      .maybeSingle();

    if (error) throw new Error(`查询问卷失败: ${error.message}`);
    return data;
  }

  // 获取问卷的问题列表
  async getSurveyQuestions(surveyId: number) {
    const { data, error } = await this.client
      .from('survey_questions')
      .select('*')
      .eq('survey_id', surveyId)
      .order('order_index', { ascending: true });

    if (error) throw new Error(`查询问题失败: ${error.message}`);
    return data;
  }

  // 提交评价
  async submitResponse(surveyId: number, userName: string, answers: Record<string, any>) {
    const { data, error } = await this.client
      .from('survey_responses')
      .insert({
        survey_id: surveyId,
        user_name: userName,
        answers: answers,
      })
      .select()
      .single();

    if (error) throw new Error(`提交评价失败: ${error.message}`);
    return data;
  }

  // 获取评价列表（后台查看）
  async getResponses(surveyId: number, page: number = 1, pageSize: number = 20) {
    const offset = (page - 1) * pageSize;

    const { data, error } = await this.client
      .from('survey_responses')
      .select('*', { count: 'exact' })
      .eq('survey_id', surveyId)
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) throw new Error(`查询评价列表失败: ${error.message}`);
    return data;
  }

  // 获取评价统计
  async getResponseStats(surveyId: number) {
    // 获取所有回答
    const { data, error } = await this.client
      .from('survey_responses')
      .select('answers')
      .eq('survey_id', surveyId);

    if (error) throw new Error(`查询统计数据失败: ${error.message}`);

    // 获取问题列表
    const questions = await this.getSurveyQuestions(surveyId);

    // 计算统计数据
    const stats: Record<string, any> = {
      total_responses: data?.length || 0,
      question_stats: {},
    };

    for (const question of questions) {
      const questionId = String(question.id);
      const answers = data?.map((r) => r.answers?.[questionId]).filter(Boolean) || [];

      if (question.question_type === 'rating') {
        // 打分题计算平均分
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
        // 选项题统计各选项数量
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
        // 文本题返回所有回答
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

  // 创建问卷
  async createSurvey(title: string, description?: string) {
    const { data, error } = await this.client
      .from('surveys')
      .insert({ title, description })
      .select()
      .single();

    if (error) throw new Error(`创建问卷失败: ${error.message}`);
    return data;
  }

  // 添加问题
  async addQuestion(
    surveyId: number,
    questionText: string,
    questionType: string,
    options?: string[],
    required: boolean = true,
    orderIndex: number = 0
  ) {
    const { data, error } = await this.client
      .from('survey_questions')
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
}
