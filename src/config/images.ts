// 图片配置文件
// 所有图片 URL 的集中管理
// 图片已转换为 WebP 格式，上传到对象存储后替换这些 URL

export const IMAGE_CONFIG = {
  // 线路页面图片
  HUTIAOXIA_CARD: '/assets/images/DSCF5976.webp',
  YUBENG_CARD: '/assets/images/微信图片_20260312035527_5_87.webp',
  NANLU_CARD: '/assets/images/IMG_8134.webp',
  
  // 虎跳峡详情页图片
  HUTIAOXIA_DETAIL_BG: '/assets/images/DSCF6548.webp',
  
  // 雨崩详情页图片（4张）
  YUBENG_POSTER_1: '/assets/images/微信图片_20260312004502.webp',
  YUBENG_POSTER_2: '/assets/images/微信图片_20260312004510.webp',
  YUBENG_POSTER_3: '/assets/images/微信图片_20260312004514.webp',
  YUBENG_POSTER_4: '/assets/images/微信图片_20260312004518.webp',
  
  // 南极洛详情页图片
  NANLU_IMAGE: '/assets/images/IMG_8134.webp',
};

// 替换指南：
// 1. 将本地 WebP 图片上传到对象存储（阿里云 OSS、腾讯云 COS 等）
// 2. 获取图片的访问 URL
// 3. 替换上面配置中的 URL
// 4. 重新编译和预览

// WebP 优化效果：
// - DSCF5976: 2.2MB → 563KB (减少 74.4%)
// - DSCF6548: 11MB → 1.7MB (减少 84.5%)
// - IMG_8134: 349KB → 186KB (减少 46.7%)
// - 微信图片_20260312004502: 549KB → 413KB (减少 24.8%)
// - 微信图片_20260312004510: 696KB → 626KB (减少 10.1%)
// - 微信图片_20260312004514: 502KB → 391KB (减少 22.1%)
// - 微信图片_20260312004518: 516KB → 400KB (减少 22.5%)
// - 微信图片_20260312035527_5_87: 4.3MB → 1.3MB (减少 69.8%)
// 总计: 20.1MB → 5.6MB (减少 72.1%)
