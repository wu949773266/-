import { Controller, Post, Body } from '@nestjs/common'
import { AiChatService } from './ai-chat.service'

interface ChatRequest {
  message: string
  history?: Array<{ role: string; content: string }>
}

@Controller('ai')
export class AiChatController {
  constructor(private readonly aiChatService: AiChatService) {}

  @Post('chat')
  async chat(@Body() body: ChatRequest) {
    const { message, history = [] } = body
    console.log('[AI Chat] Received request:', { message, historyLength: history.length })

    try {
      const response = await this.aiChatService.chat(message, history)
      return {
        code: 200,
        msg: 'success',
        data: response
      }
    } catch (error) {
      console.error('[AI Chat] Error:', error)
      return {
        code: 500,
        msg: error.message || 'AI 服务暂时不可用',
        data: null
      }
    }
  }
}
