# 微信云开发配置指南

## 微信云开发免费额度
```
存储容量：5GB（永久免费）
每月下行流量：5GB（永久免费）
CDN 流量：5GB/月（永久免费）
读取次数：50万次/月（永久免费）
写入次数：30万次/月（永久免费）
```

你的图片总大小约 20-30MB，完全在免费额度内！

---

## 步骤 1: 开通云开发（2分钟）

### 1.1 打开微信开发者工具
```
打开微信开发者工具 → 打开你的小程序项目
```

### 1.2 开通云开发
```
点击顶部菜单栏「云开发」按钮
→ 选择「开通」
→ 填写环境名称（例如：shandu-outdoor）
→ 选择「基础版」（免费）
→ 点击「开通」
```

### 1.3 等待初始化
```
等待云开发环境初始化（约 30 秒）
初始化完成后会自动打开云开发控制台
```

---

## 步骤 2: 创建存储桶（1分钟）

### 2.1 打开云存储
```
在云开发控制台中
→ 点击左侧菜单「云存储」
→ 点击「新建文件夹」
→ 文件夹名称：images
→ 点击「确定」
```

---

## 步骤 3: 上传图片（3分钟）

### 3.1 准备图片
图片位置：
```
/workspace/projects/src/package-detail/assets/images/
```

需要上传的 8 张图片：
```
DSCF5976.jpg
DSCF6548.jpg
IMG_8134.jpg
微信图片_20260312035527_5_87.jpg
微信图片_20260312004502.jpg
微信图片_20260312004510.jpg
微信图片_20260312004514.jpg
微信图片_20260312004518.jpg
```

### 3.2 上传图片
```
在「云存储」页面
→ 点击「images」文件夹
→ 点击「上传文件」
→ 选择上述 8 张图片
→ 点击「确定」
→ 等待上传完成
```

---

## 步骤 4: 获取图片访问 URL（2分钟）

### 4.1 获取文件地址
```
在「云存储」页面
→ 点击「images」文件夹
→ 点击第一张图片（DSCF5976.jpg）
→ 在右侧面板中找到「文件地址」
→ 复制完整的 URL

格式类似：
https://xxxxx.tcb.qcloud.la/images/DSCF5976.jpg
```

### 4.2 记录所有图片 URL
为所有 8 张图片复制访问 URL，格式如下：

```typescript
DSCF5976.jpg: https://xxxxx.tcb.qcloud.la/images/DSCF5976.jpg
DSCF6548.jpg: https://xxxxx.tcb.qcloud.la/images/DSCF6548.jpg
IMG_8134.jpg: https://xxxxx.tcb.qcloud.la/images/IMG_8134.jpg
微信图片_20260312035527_5_87.jpg: https://xxxxx.tcb.qcloud.la/images/微信图片_20260312035527_5_87.jpg
微信图片_20260312004502.jpg: https://xxxxx.tcb.qcloud.la/images/微信图片_20260312004502.jpg
微信图片_20260312004510.jpg: https://xxxxx.tcb.qcloud.la/images/微信图片_20260312004510.jpg
微信图片_20260312004514.jpg: https://xxxxx.tcb.qcloud.la/images/微信图片_20260312004514.jpg
微信图片_20260312004518.jpg: https://xxxxx.tcb.qcloud.la/images/微信图片_20260312004518.jpg
```

---

## 步骤 5: 更新配置文件（1分钟）

### 5.1 修改图片配置
打开文件：`src/config/images.ts`

替换为：

```typescript
// 图片配置文件
// 使用微信云开发存储

export const IMAGE_CONFIG = {
  // 线路页面图片
  HUTIAOXIA_CARD: 'https://xxxxx.tcb.qcloud.la/images/DSCF5976.jpg',
  YUBENG_CARD: 'https://xxxxx.tcb.qcloud.la/images/微信图片_20260312035527_5_87.jpg',
  NANLU_CARD: 'https://xxxxx.tcb.qcloud.la/images/IMG_8134.jpg',

  // 虎跳峡详情页图片
  HUTIAOXIA_DETAIL_BG: 'https://xxxxx.tcb.qcloud.la/images/DSCF6548.jpg',

  // 雨崩详情页图片（4张）
  YUBENG_POSTER_1: 'https://xxxxx.tcb.qcloud.la/images/微信图片_20260312004502.jpg',
  YUBENG_POSTER_2: 'https://xxxxx.tcb.qcloud.la/images/微信图片_20260312004510.jpg',
  YUBENG_POSTER_3: 'https://xxxxx.tcb.qcloud.la/images/微信图片_20260312004514.jpg',
  YUBENG_POSTER_4: 'https://xxxxx.tcb.qcloud.la/images/微信图片_20260312004518.jpg',

  // 南极洛详情页图片
  NANLU_IMAGE: 'https://xxxxx.tcb.qcloud.la/images/IMG_8134.jpg',
};
```

**重要**：将 `xxxxx.tcb.qcloud.la` 替换为你实际的云开发环境地址。

### 5.2 移除本地图片复制
打开文件：`config/index.ts`

找到 `copy.patterns` 部分，删除所有图片相关的配置，只保留 TabBar：

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

---

## 步骤 6: 验证（1分钟）

### 6.1 重新编译
```bash
cd /workspace/projects
pnpm build:weapp
```

### 6.2 检查分包大小
```bash
du -sh dist/
du -sh dist/package-detail/
```

预期结果：
```
dist/ ≈ 500KB (主包)
dist/package-detail/ ≈ 100KB (分包)
```

### 6.3 预览小程序
```
在微信开发者工具中
→ 点击「预览」按钮
→ 生成二维码
→ 使用微信扫码
→ 验证图片是否正常加载
```

---

## 常见问题

### Q1: 图片上传失败？
**A**: 检查文件大小是否超过 10MB（单文件限制），你的图片都不超过 2MB，没问题。

### Q2: 图片加载失败？
**A**:
1. 检查云存储是否配置了「安全规则」
2. 在云存储 → 设置 → 安全规则中，设置为：
   ```
   {
     "read": true,
     "write": true
   }
   ```

### Q3: 额度用完了怎么办？
**A**: 基础版永久免费 5GB，你的图片只有 30MB，完全够用，不用担心。

### Q4: 如何查看使用量？
**A**: 云开发控制台 → 统计分析 → 存储

---

## 完成后的效果

```
主包大小：480KB ✅ (符合 2MB 限制)
分包大小：88KB ✅ (符合 2MB 限制)
图片加载：通过微信云开发 CDN ✅
存储成本：0 元（免费额度）✅
```

---

## 总结

整个配置过程：
1. 开通云开发：2 分钟
2. 创建存储桶：1 分钟
3. 上传图片：3 分钟
4. 获取 URL：2 分钟
5. 更新配置：1 分钟
6. 验证：1 分钟

**总计：10 分钟，完全免费！**

---

## 需要帮助？

如果遇到问题，请告诉我：
1. 当前在哪一步卡住了
2. 具体的错误信息
3. 截图（如果可以）

我会继续帮你解决！
