import { Injectable } from '@nestjs/common';
import { LLMClient, Config } from 'coze-coding-dev-sdk';
import { KnowledgeService } from '@/knowledge/knowledge.service';

@Injectable()
export class AiService {
  private client: LLMClient;
  private config: Config;

  constructor(private readonly knowledgeService: KnowledgeService) {
    this.config = new Config();
    this.client = new LLMClient(this.config);
  }

  async chat(message: string, history: Array<{ role: string; content: string }> = []) {
    // 1. 先搜索知识库获取相关内容
    const knowledgeResults = await this.knowledgeService.search(message, 3);
    
    // 2. 构建知识库上下文
    let knowledgeContext = '';
    if (knowledgeResults.length > 0) {
      knowledgeContext = '\n\n【知识库参考内容】\n' + 
        knowledgeResults.map((r, i) => `${i + 1}. ${r.content}`).join('\n\n');
    }

    // 3. 系统提示词
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
- 优先使用知识库中的信息来回答问题
- 如果知识库中有相关内容，请参考并结合你的理解给出回答
- 对于复杂问题，给出详细的分步建议

${knowledgeContext}

如果用户问的问题与户外徒步无关，可以礼貌地引导回徒步话题。如果知识库中没有相关信息，请基于你的一般知识回答，但要说明这些建议仅供参考。`;

    // 4. 构建消息数组
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...history.map(h => ({
        role: h.role as 'user' | 'assistant',
        content: h.content
      })),
      { role: 'user' as const, content: message }
    ];

    try {
      // 5. 调用 LLM 生成回复
      const response = await this.client.invoke(messages, {
        model: 'deepseek-v3-2-251201',
        temperature: 0.7
      });

      return {
        code: 200,
        msg: 'success',
        data: {
          content: response.content,
          knowledgeUsed: knowledgeResults.length > 0
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
