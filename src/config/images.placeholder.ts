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

如果暂时无法使用对象存储，可以先使用占位图片测试：<tool_call>write_file<arg_key>content</arg_key><arg_value>// 图片配置文件
// 临时使用在线占位图片（仅用于测试）
// 后续请替换为对象存储 URL

export const IMAGE_CONFIG = {
  // 线路页面图片（使用 Unsplash 占位图）
  HUTIAOXIA_CARD: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  YUBENG_CARD: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  NANLU_CARD: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',

  // 虎跳峡详情页图片
  HUTIAOXIA_DETAIL_BG: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',

  // 雨崩详情页图片（4张）
  YUBENG_POSTER_1: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  YUBENG_POSTER_2: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  YUBENG_POSTER_3: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  YUBENG_POSTER_4: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',

  // 南极洛详情页图片
  NANLU_IMAGE: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
};
