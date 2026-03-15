import { Injectable } from '@nestjs/common';
import { LLMClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';

@Injectable()
export class AiService {
  private client: LLMClient;
  private config: Config;

  constructor() {
    this.config = new Config();
    this.client = new LLMClient(this.config);
  }

  async chat(message: string, history: Array<{ role: string; content: string }> = []) {
    // 系统提示词 - 山渡户外徒步助手
    const systemPrompt = `你是山渡户外徒步俱乐部的智能助手，专注于为用户提供专业的户外徒步建议和服务。

你的职责：
1. 介绍山渡户外的徒步线路（虎跳峡、雨崩、南极洛等）
2. 解答徒步相关问题（装备、路线、难度、最佳季节等）
3. 帮助用户选择适合的徒步线路
4. 提供户外安全建议和注意事项
5. 回答关于私人订制徒步行程的问题

回答风格：
- 热情友好，像一位经验丰富的户外向导
- 回答简洁实用，突出重点
- 适时推荐山渡户外的线路和服务
- 对于复杂问题，给出详细的分步建议

山渡户外主要线路：
1. 虎跳峡徒步：2-3天，经典入门线路，风景壮观
2. 雨崩徒步：4-5天，梅里雪山神域，中等难度
3. 南极洛徒步：3-4天，高山湖泊群，进阶线路

如果用户问的问题与户外徒步无关，可以礼貌地引导回徒步话题。`;

    // 构建消息数组
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...history.map(h => ({
        role: h.role as 'user' | 'assistant',
        content: h.content
      })),
      { role: 'user' as const, content: message }
    ];

    try {
      // 使用 DeepSeek 模型
      const response = await this.client.invoke(messages, {
        model: 'deepseek-v3-2-251201',
        temperature: 0.7
      });

      return {
        code: 200,
        msg: 'success',
        data: {
          content: response.content
        }
      };
    } catch (error) {
      console.error('AI chat error:', error);
      return {
        code: 500,
        msg: 'AI 服务暂时不可用，请稍后再试',
        data: null
      };
    }
  }
}
