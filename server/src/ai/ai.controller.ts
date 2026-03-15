import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async chat(@Body() body: { message: string; history?: Array<{ role: string; content: string }> }) {
    return this.aiService.chat(body.message, body.history || []);
  }
}
