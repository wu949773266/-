# 山渡户外小程序 - 图片对象存储配置指南

## 问题说明

微信小程序分包大小限制为 2MB，原始分包包含图片资源后大小为 19.2MB，超出限制。

## 解决方案

将图片资源移至对象存储（阿里云 OSS、腾讯云 COS 等），使用外部 URL 引用图片。

当前已完成的修改：
1. 移除分包中的本地图片文件
2. 创建 `src/config/images.ts` 配置文件，存储图片 URL
3. 更新所有页面使用配置文件中的 URL
4. 暂时使用 Unsplash 图片作为占位符

## 如何替换为真实的对象存储 URL

### 步骤 1: 上传图片到对象存储

将以下图片文件上传到对象存储：
- `src/assets/images/DSCF5976.jpg` - 虎跳峡线路卡片图
- `src/assets/images/微信图片_20260312035527_5_87.jpg` - 雨崩线路卡片图
- `src/assets/images/IMG_8134.jpg` - 南极洛线路卡片图
- `src/package-detail/assets/images/DSCF6548.jpg` - 虎跳峡详情页背景图
- `src/package-detail/assets/images/微信图片_20260312004502.jpg` - 雨崩详情页海报 1
- `src/package-detail/assets/images/微信图片_20260312004510.jpg` - 雨崩详情页海报 2
- `src/package-detail/assets/images/微信图片_20260312004514.jpg` - 雨崩详情页海报 3
- `src/package-detail/assets/images/微信图片_20260312004518.jpg` - 雨崩详情页海报 4

### 步骤 2: 获取图片访问 URL

上传后，获取每张图片的访问 URL，格式示例：
```
https://your-bucket.oss-cn-hangzhou.aliyuncs.com/images/DSCF5976.jpg
```

### 步骤 3: 更新配置文件

编辑 `src/config/images.ts`，替换 URL：

```typescript
export const IMAGE_CONFIG = {
  // 线路页面图片
  HUTIAOXIA_CARD: 'https://your-bucket.oss-cn-hangzhou.aliyuncs.com/images/DSCF5976.jpg',
  YUBENG_CARD: 'https://your-bucket.oss-cn-hangzhou.aliyuncs.com/images/微信图片_20260312035527_5_87.jpg',
  NANLU_CARD: 'https://your-bucket.oss-cn-hangzhou.aliyuncs.com/images/IMG_8134.jpg',
  
  // 虎跳峡详情页图片
  HUTIAOXIA_DETAIL_BG: 'https://your-bucket.oss-cn-hangzhou.aliyuncs.com/images/DSCF6548.jpg',
  
  // 雨崩详情页图片（4张）
  YUBENG_POSTER_1: 'https://your-bucket.oss-cn-hangzhou.aliyuncs.com/images/微信图片_20260312004502.jpg',
  YUBENG_POSTER_2: 'https://your-bucket.oss-cn-hangzhou.aliyuncs.com/images/微信图片_20260312004510.jpg',
  YUBENG_POSTER_3: 'https://your-bucket.oss-cn-hangzhou.aliyuncs.com/images/微信图片_20260312004514.jpg',
  YUBENG_POSTER_4: 'https://your-bucket.oss-cn-hangzhou.aliyuncs.com/images/微信图片_20260312004518.jpg',
  
  // 南极洛详情页图片
  NANLU_IMAGE: 'https://your-bucket.oss-cn-hangzhou.aliyuncs.com/images/IMG_8134.jpg',
};
```

### 步骤 4: 重新编译

```bash
pnpm build:weapp
```

### 步骤 5: 预览小程序

使用微信开发者工具预览 `dist` 目录。

## 对象存储推荐

### 阿里云 OSS
- 访问地址: https://www.aliyun.com/product/oss
- 免费额度: 40GB 存储，免费 6 个月
- 优势: 稳定性好，CDN 加速快

### 腾讯云 COS
- 访问地址: https://cloud.tencent.com/product/cos
- 免费额度: 50GB 存储，免费 6 个月
- 优势: 微信生态集成好

### 七牛云
- 访问地址: https://www.qiniu.com
- 免费额度: 10GB 存储
- 优势: 价格便宜，API 易用

## 注意事项

1. 确保对象存储配置了正确的 CORS 策略，允许小程序访问
2. 建议使用 HTTPS 协议访问图片
3. 可以配置图片 CDN 加速，提升加载速度
4. 定期检查图片访问日志，避免流量费用过高

## 当前分包大小

```
dist (主包): 568KB
dist/package-detail (分包): 88KB
```

已满足微信小程序 2MB 限制要求。
