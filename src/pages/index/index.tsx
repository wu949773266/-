import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'

const ROUTES = [
  {
    id: 'yubeng',
    name: '雨崩徒步',
    desc: '梅里雪山脚下，藏地圣境',
    tag: '经典',
    path: '/package-detail/pages/yubeng-schedule/index'
  },
  {
    id: 'hutiaoxia',
    name: '虎跳峡徒步',
    desc: '世界最深峡谷，金沙江怒吼',
    tag: '挑战',
    path: '/package-detail/pages/hutiaoxia-detail/index'
  },
  {
    id: 'nanlu',
    name: '南极洛徒步',
    desc: '碧湖群山，最后的秘境',
    tag: '秘境',
    path: '/package-detail/pages/nanlu-detail/index'
  }
]

const FEATURES = [
  { icon: '⛰', title: '专业领队', desc: '持证高山向导全程护航' },
  { icon: '🏕', title: '轻装徒步', desc: '营地装备专人运输' },
  { icon: '📸', title: '旅拍跟拍', desc: '记录山野高光时刻' },
  { icon: '🛡', title: '安全保障', desc: '高原急救 + 户外保险' }
]

export default function Index() {
  const handleViewRoutes = () => {
    Taro.switchTab({ url: '/pages/routes/index' })
  }

  const handleRouteClick = (route: typeof ROUTES[0]) => {
    Taro.navigateTo({ url: route.path })
  }

  return (
    <ScrollView scrollY className="home-page">
      {/* Hero */}
      <View className="hero">
        <Image
          className="hero-bg"
          src="https://coze-coding-project.tos.coze.site/coze_storage_7616074772820262912/proxy_a91632b3?sign=2092815157-fe826f0621-0-bbed33005e555c08ab1bd71537a87b9651d9043d74ec53bb379518bb4d5f7d8a"
          mode="aspectFill"
        />
        <View className="hero-overlay" />
        <View className="hero-content">
          <Text className="hero-eyebrow">SHANDU OUTDOOR</Text>
          <Text className="hero-title">走山渡心</Text>
          <Text className="hero-subtitle">走进滇西北真正的山野</Text>
          <View className="hero-actions">
            <View className="hero-btn-primary" onClick={handleViewRoutes}>
              <Text className="hero-btn-text">探索线路</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 精选线路 */}
      <View className="section">
        <View className="section-header">
          <Text className="section-eyebrow">FEATURED ROUTES</Text>
          <Text className="section-title">精选徒步线路</Text>
        </View>
        <View className="route-list">
          {ROUTES.map((route) => (
            <View key={route.id} className="route-card" onClick={() => handleRouteClick(route)}>
              <View className="route-tag">
                <Text className="route-tag-text">{route.tag}</Text>
              </View>
              <Text className="route-name">{route.name}</Text>
              <Text className="route-desc">{route.desc}</Text>
              <View className="route-arrow">
                <Text className="route-arrow-text">→</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 服务亮点 */}
      <View className="section section-dark">
        <View className="section-header">
          <Text className="section-eyebrow light">WHY SHANDU</Text>
          <Text className="section-title light">山渡之选</Text>
        </View>
        <View className="feature-grid">
          {FEATURES.map((f, i) => (
            <View key={i} className="feature-item">
              <Text className="feature-icon">{f.icon}</Text>
              <Text className="feature-title">{f.title}</Text>
              <Text className="feature-desc">{f.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 品牌主张 */}
      <View className="brand-banner">
        <Text className="brand-quote">「 不是征服山，而是被山接纳 」</Text>
        <Text className="brand-author">— 山渡户外</Text>
      </View>

      {/* 底部 */}
      <View className="footer">
        <Text className="footer-text">山渡户外 · 走山渡心</Text>
        <Text className="footer-sub">滇西北高端户外徒步品牌</Text>
      </View>
    </ScrollView>
  )
}
