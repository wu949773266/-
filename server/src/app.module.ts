import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AiModule } from '@/ai/ai.module';
import { KnowledgeModule } from '@/knowledge/knowledge.module';

@Module({
  imports: [AiModule, KnowledgeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
