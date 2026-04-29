import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'

const ROUTES = [
  {
    id: 'yubeng',
    name: '雨崩徒步',
    desc: '梅里雪山脚下，藏地圣境',
    days: '6天5晚',
    difficulty: '中等',
    tag: '经典',
    path: '/package-detail/pages/yubeng-schedule/index'
  },
  {
    id: 'hutiaoxia',
    name: '虎跳峡徒步',
    desc: '世界最深峡谷，金沙江怒吼',
    days: '3天2晚',
    difficulty: '挑战',
    tag: '挑战',
    path: '/package-detail/pages/hutiaoxia-detail/index'
  },
  {
    id: 'nanlu',
    name: '南极洛徒步',
    desc: '碧湖群山，最后的秘境',
    days: '4天3晚',
    difficulty: '中等',
    tag: '秘境',
    path: '/package-detail/pages/nanlu-detail/index'
  }
]

const CATEGORIES = ['全部', '经典', '挑战', '秘境']

export default function Routes() {
  const handleRouteClick = (route: typeof ROUTES[0]) => {
    Taro.navigateTo({ url: route.path })
  }

  return (
    <ScrollView scrollY className="routes-page">
      <View className="page-header">
        <Text className="page-eyebrow">ROUTES</Text>
        <Text className="page-title">徒步线路</Text>
      </View>

      <View className="category-bar">
        {CATEGORIES.map((cat) => (
          <View key={cat} className={`category-chip ${cat === '全部' ? 'active' : ''}`}>
            <Text className={`category-chip-text ${cat === '全部' ? 'active' : ''}`}>{cat}</Text>
          </View>
        ))}
      </View>

      <View className="route-list">
        {ROUTES.map((route) => (
          <View key={route.id} className="route-card" onClick={() => handleRouteClick(route)}>
            <View className="route-card-top">
              <View className="route-tag">
                <Text className="route-tag-text">{route.tag}</Text>
              </View>
              <View className="route-meta">
                <Text className="route-meta-text">{route.days}</Text>
                <Text className="route-meta-dot">·</Text>
                <Text className="route-meta-text">{route.difficulty}</Text>
              </View>
            </View>
            <Text className="route-name">{route.name}</Text>
            <Text className="route-desc">{route.desc}</Text>
            <View className="route-bottom">
              <Text className="route-cta">查看详情 →</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
