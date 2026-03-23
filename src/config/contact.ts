// 联系方式配置
// 通过环境变量 TARO_APP_PROMO_MODE 控制是否为推广模式

// 推广模式下的联系方式（你的个人联系方式）
// ★★★ 修改这里来设置你的个人推广信息 ★★★
const PROMO_CONFIG = {
  wechat: 'YOUR_WECHAT',           // 你的微信号
  phone: 'YOUR_PHONE',             // 你的电话
  location: '丽江 · 束河古镇',      // 地址（可保持不变）
  name: '户外领队'                  // 你的推广名称
}

// 正式版本的联系方式（公司联系方式）
const OFFICIAL_CONFIG = {
  wechat: 'SDHW008',
  phone: '18623355672',
  location: '丽江 · 束河古镇'
}

// 根据环境变量判断是否为推广模式
// TARO_APP_PROMO_MODE 在编译时会通过 defineConstants 注入
declare const TARO_APP_PROMO_MODE: string
export const isPromoMode = typeof TARO_APP_PROMO_MODE !== 'undefined' && TARO_APP_PROMO_MODE === 'true'

// 导出当前配置
export const CONTACT_CONFIG = isPromoMode ? PROMO_CONFIG : OFFICIAL_CONFIG

// 获取推广者信息（仅在推广模式下有效）
export const getPromoterInfo = () => {
  if (!isPromoMode) return null
  return {
    name: PROMO_CONFIG.name,
    wechat: PROMO_CONFIG.wechat
  }
}
