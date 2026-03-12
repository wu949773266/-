// 图片配置文件
// 所有图片 URL 的集中管理
// 图片已移至 package-detail 分包，避免主包超限

export const IMAGE_CONFIG = {
  // 线路页面图片
  HUTIAOXIA_CARD: '/package-detail/assets/images/DSCF5976.jpg',
  YUBENG_CARD: '/package-detail/assets/images/微信图片_20260312035527_5_87.jpg',
  NANLU_CARD: '/package-detail/assets/images/IMG_8134.jpg',

  // 虎跳峡详情页图片
  HUTIAOXIA_DETAIL_BG: '/package-detail/assets/images/DSCF6548.jpg',

  // 雨崩详情页图片（4张）
  YUBENG_POSTER_1: '/package-detail/assets/images/微信图片_20260312004502.jpg',
  YUBENG_POSTER_2: '/package-detail/assets/images/微信图片_20260312004510.jpg',
  YUBENG_POSTER_3: '/package-detail/assets/images/微信图片_20260312004514.jpg',
  YUBENG_POSTER_4: '/package-detail/assets/images/微信图片_20260312004518.jpg',

  // 南极洛详情页图片
  NANLU_IMAGE: '/package-detail/assets/images/IMG_8134.jpg',
};

// 当前使用分包中的图片，主包大小将降至 480KB
// 后续可上传到对象存储后替换 URL 为外部地址，进一步提升性能
