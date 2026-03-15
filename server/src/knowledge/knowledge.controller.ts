import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { KnowledgeService } from './knowledge.service';

@Controller('knowledge')
export class KnowledgeController {
  constructor(private readonly knowledgeService: KnowledgeService) {}

  /**
   * 搜索知识库
   * GET /api/knowledge/search?query=虎跳峡
   */
  @Get('search')
  async search(@Query('query') query: string) {
    const results = await this.knowledgeService.search(query, 3);
    return {
      code: 200,
      msg: 'success',
      data: results
    };
  }

  /**
   * 导入文本到知识库
   * POST /api/knowledge/add-text
   * Body: { title: "虎跳峡线路介绍", content: "..." }
   */
  @Post('add-text')
  async addText(@Body() body: { title: string; content: string }) {
    if (!body.title || !body.content) {
      return {
        code: 400,
        msg: '标题和内容不能为空',
        data: null
      };
    }

    const result = await this.knowledgeService.addText(body.title, body.content);
    return {
      code: result.success ? 200 : 500,
      msg: result.message,
      data: result.success ? { docIds: result.docIds } : null
    };
  }

  /**
   * 批量导入文档
   * POST /api/knowledge/add-documents
   * Body: { documents: [{ type: "text", content: "..." }] }
   */
  @Post('add-documents')
  async addDocuments(@Body() body: { documents: Array<{ type: 'text' | 'url'; content: string }> }) {
    if (!body.documents || body.documents.length === 0) {
      return {
        code: 400,
        msg: '文档列表不能为空',
        data: null
      };
    }

    const result = await this.knowledgeService.addDocuments(body.documents);
    return {
      code: result.success ? 200 : 500,
      msg: result.message,
      data: result.success ? { docIds: result.docIds } : null
    };
  }

  /**
   * 导入网页到知识库
   * POST /api/knowledge/add-url
   * Body: { url: "https://..." }
   */
  @Post('add-url')
  async addUrl(@Body() body: { url: string }) {
    if (!body.url) {
      return {
        code: 400,
        msg: 'URL 不能为空',
        data: null
      };
    }

    const result = await this.knowledgeService.addUrl(body.url);
    return {
      code: result.success ? 200 : 500,
      msg: result.message,
      data: result.success ? { docIds: result.docIds } : null
    };
  }
}
