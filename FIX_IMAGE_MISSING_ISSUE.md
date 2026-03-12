# 真机预览图片丢失问题修复

## 问题分析

真机预览图片丢失的原因：

### 1. WebP 格式兼容性问题
- WebP 格式在某些微信小程序版本或设备上可能不被支持
- 需要基础库 2.9.0+ 版本才支持 WebP

### 2. 主包大小超限（当前问题）
- 改回 JPG 格式后，主包大小回到 20MB
- 超过微信小程序主包 2MB 限制
- 导致图片无法正常加载

## 当前状态

已改回 JPG 格式，确保兼容性：
```
dist 总大小: 20MB
├── 分包: 88KB
├── JPG 图片: 20MB
└── 主包代码: 480KB
```

## 解决方案

### ✅ 推荐方案：使用外部图片 URL（对象存储）

这是唯一能同时解决兼容性和大小限制的方案。

#### 步骤 1: 上传图片到对象存储

选择以下任一对象存储服务：
- 阿里云 OSS（推荐，免费 40GB，6 个月）
- 腾讯云 COS（推荐，免费 50GB，6 个月）
- 七牛云（免费 10GB）

上传以下 8 张 JPG 图片到对象存储：
```
DSCF5976.jpg
DSCF6548.jpg
IMG_8134.jpg
微信图片_20260312004502.jpg
微信图片_20260312004510.jpg
微信图片_20260312004514.jpg
微信图片_20260312004518.jpg
微信图片_20260312035527_5_87.jpg
```

#### 步骤 2: 获取图片访问 URL

上传后，获取每张图片的 HTTP/HTTPS 访问地址，格式示例：
```
https://your-bucket.oss-cn-hangzhou.aliyuncs.com/images/DSCF5976.jpg
```

#### 步骤 3: 更新配置文件

编辑 `src/config/images.ts`，替换为外部 URL：

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

#### 步骤 4: 移除本地图片复制

编辑 `config/index.ts`，删除图片复制配置：

```typescript
copy: {
  patterns: [
    {
      from: 'src/assets/tabbar',
      to: 'assets/tabbar',
    },
  ],
  options: {},
},
```

#### 步骤 5: 重新编译

```bash
pnpm build:weapp
```

#### 步骤 6: 验证

使用微信开发者工具真机预览，验证图片是否正常加载。

## 优化效果

使用对象存储后：
```
dist 总大小: ~500KB
├── 分包: 88KB
├── 主包代码: 480KB
└── 图片: 0KB（使用外部 URL）

✅ 符合主包 2MB 限制
✅ 图片正常加载
✅ 兼容性最好
```

## 临时方案（仅用于测试）

如果暂时无法使用对象存储，可以使用在线占位图片测试：

1. 备份当前配置：
```bash
cp src/config/images.ts src/config/images.local.jpg.ts
```

2. 使用占位图片配置：
```bash
cp src/config/images.placeholder.ts src/config/images.ts
```

3. 重新编译：
```bash
pnpm build:weapp
```

4. 真机预览测试

5. 测试完成后恢复本地配置：
```bash
cp src/config/images.local.jpg.ts src/config/images.ts
```

## 对象存储配置指南

### 阿里云 OSS

1. 访问 https://www.aliyun.com/product/oss
2. 创建 Bucket
3. 配置 CORS 策略：
```json
{
  "AllowedOrigins": ["*"],
  "AllowedMethods": ["GET"],
  "AllowedHeaders": ["*"],
  "ExposeHeaders": [],
  "MaxAgeSeconds": 3600
}
```
4. 上传图片
5. 获取访问 URL

### 腾讯云 COS

1. 访问 https://cloud.tencent.com/product/cos
2. 创建存储桶
3. 配置 CORS 策略：
```json
{
  "AllowedOrigins": ["*"],
  "AllowedMethods": ["GET"],
  "AllowedHeaders": ["*"],
  "ExposeHeaders": [],
  "MaxAgeSeconds": 3600
}
```
4. 上传图片
5. 获取访问 URL

## 注意事项

1. **CORS 配置必须正确**：否则小程序无法访问图片
2. **建议使用 HTTPS**：避免安全警告
3. **配置 CDN 加速**：提升图片加载速度
4. **监控流量费用**：避免超额产生费用
5. **定期检查访问日志**：及时发现异常访问

## 小结

✅ 已改回 JPG 格式，确保兼容性
⚠️ 当前主包大小 20MB，超过 2MB 限制
🔧 必须使用对象存储解决大小限制问题
📝 详细步骤请参考 `IMAGE_STORAGE_GUIDE.md`

使用对象存储是唯一能同时解决兼容性和大小限制的方案，请尽快配置。
