import { Injectable } from '@nestjs/common';
import { 
  KnowledgeClient, 
  Config, 
  KnowledgeDocument, 
  DataSourceType,
  ChunkConfig
} from 'coze-coding-dev-sdk';

@Injectable()
export class KnowledgeService {
  private client: KnowledgeClient;
  private readonly datasetName = 'shandu_hiking_knowledge';

  constructor() {
    const config = new Config();
    this.client = new KnowledgeClient(config);
  }

  /**
   * 搜索知识库
   * @param query 搜索关键词
   * @param topK 返回结果数量
   * @returns 搜索结果
   */
  async search(query: string, topK: number = 3) {
    try {
      const response = await this.client.search(
        query,
        undefined, // 搜索所有数据集
        topK,
        0.5 // 最小相似度阈值
      );

      if (response.code === 0 && response.chunks) {
        return response.chunks.map(chunk => ({
          content: chunk.content,
          score: chunk.score
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Knowledge search error:', error);
      return [];
    }
  }

  /**
   * 导入文档到知识库
   * @param documents 文档列表
   * @returns 导入结果
   */
  async addDocuments(documents: Array<{ type: 'text' | 'url'; content: string }>) {
    try {
      const docs: KnowledgeDocument[] = documents.map(doc => {
        if (doc.type === 'text') {
          return {
            source: DataSourceType.TEXT,
            raw_data: doc.content
          };
        } else {
          return {
            source: DataSourceType.URL,
            url: doc.content
          };
        }
      });

      const chunkConfig: ChunkConfig = {
        separator: '\n\n',
        max_tokens: 1000,
        remove_extra_spaces: true
      };

      const response = await this.client.addDocuments(
        docs,
        this.datasetName,
        chunkConfig
      );

      if (response.code === 0) {
        return {
          success: true,
          docIds: response.doc_ids,
          message: `成功导入 ${response.doc_ids?.length || 0} 个文档`
        };
      }

      return {
        success: false,
        message: response.msg || '导入失败'
      };
    } catch (error) {
      console.error('Add documents error:', error);
      return {
        success: false,
        message: '导入文档时发生错误'
      };
    }
  }

  /**
   * 导入单个文本
   * @param title 标题
   * @param content 内容
   */
  async addText(title: string, content: string) {
    const fullContent = `【${title}】\n\n${content}`;
    return this.addDocuments([{ type: 'text', content: fullContent }]);
  }

  /**
   * 导入网页
   * @param url 网页地址
   */
  async addUrl(url: string) {
    return this.addDocuments([{ type: 'url', content: url }]);
  }
}
