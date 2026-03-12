// 图片配置文件
// 所有图片 URL 的集中管理
// 将本地图片上传到对象存储后，替换这些 URL

export const IMAGE_CONFIG = {
  // 临时使用 Unsplash 图片（让小程序预览通过）
  // 后续需要替换为真实的对象存储 URL
  
  // 线路页面图片
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

// 替换指南：
// 1. 将本地图片上传到对象存储（阿里云 OSS、腾讯云 COS 等）
// 2. 获取图片的访问 URL
// 3. 替换上面配置中的 URL
// 4. 重新编译和预览
