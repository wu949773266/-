import { Injectable } from '@nestjs/common'
import { LLMClient, Config } from 'coze-coding-dev-sdk'

@Injectable()
export class AiChatService {
  private client: LLMClient

  constructor() {
    // 初始化 LLM 客户端
    const config = new Config()
    this.client = new LLMClient(config)
  }

  async chat(message: string, history: Array<{ role: string; content: string }> = []) {
    console.log('[AI Chat Service] Processing message:', message)

    // 构建消息历史
    const messages = [
      {
        role: 'system' as const,
        content: '你是一个专业的户外徒步顾问，为山渡户外提供专业的徒步建议和路线推荐。请用友好、专业的语气回答用户关于户外徒步的问题，包括路线推荐、装备建议、安全注意事项等。'
      },
      ...history.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      })),
      {
        role: 'user' as const,
        content: message
      }
    ]

    try {
      // 调用 LLM 生成回复
      const response = await this.client.invoke(messages, {
        model: 'deepseek-v3-2-251201',
        temperature: 0.7
      })

      console.log('[AI Chat Service] Response received:', response?.content)

      // 返回 AI 回复内容
      return {
        role: 'assistant',
        content: response?.content || '抱歉，我暂时无法回答这个问题。'
      }
    } catch (error) {
      console.error('[AI Chat Service] LLM API Error:', error)

      // 如果是 API Key 未配置或无效，返回友好的错误提示
      if (error.message?.includes('API key') || error.message?.includes('Unauthorized')) {
        return {
          role: 'assistant',
          content: '抱歉，AI 服务未正确配置。请联系管理员配置 DeepSeek API 密钥。'
        }
      }

      // 其他错误
      return {
        role: 'assistant',
        content: '抱歉，AI 服务暂时不可用，请稍后再试。'
      }
    }
  }
}
