import { View, Text, Image } from '@tarojs/components'
import Taro, { useDidShow, useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import { useState } from 'react'
import type { FC } from 'react'
import { IMAGE_CONFIG } from '@/config/images'
import './index.css'

interface RouteItem {
  id: number
  name: string
  description: string
  difficulty: string
  image: string
}

const RoutesPage: FC = () => {
  const [routes] = useState<RouteItem[]>([
    {
      id: 2,
      name: '虎跳峡徒步',
      description: '云南虎跳峡经典路线 · 1天摄影徒步',
      difficulty: '难度 ⭐',
      image: IMAGE_CONFIG.HUTIAOXIA_CARD
    },
    {
      id: 1,
      name: '雨崩徒步',
      description: '云南梅里秘境 · 4天摄影徒步',
      difficulty: '难度 ⭐⭐',
      image: IMAGE_CONFIG.YUBENG_CARD
    },
    {
      id: 3,
      name: '南极洛徒步',
      description: '秘境湖泊群 · 3天徒步',
      difficulty: '难度 ⭐⭐',
      image: IMAGE_CONFIG.NANLU_CARD
    }
  ])

  const [animationTrigger, setAnimationTrigger] = useState(0)

  // 每次页面显示时触发动画
  useDidShow(() => {
    setAnimationTrigger(prev => prev + 1)
  })

  // 配置分享给朋友
  useShareAppMessage(() => {
    return {
      title: '山渡户外 - 热门徒步线路',
      path: '/pages/routes/index',
      imageUrl: IMAGE_CONFIG.HUTIAOXIA_CARD
    }
  })

  // 配置分享到朋友圈
  useShareTimeline(() => {
    return {
      title: '山渡户外 - 热门徒步线路',
      query: '',
      imageUrl: IMAGE_CONFIG.HUTIAOXIA_CARD
    }
  })

  const handleRouteDetail = (id: number) => {
    if (id === 1) {
      Taro.navigateTo({
        url: '/package-detail/pages/yubeng-detail/index'
      })
    } else if (id === 2) {
      Taro.navigateTo({
        url: '/package-detail/pages/hutiaoxia-detail/index'
      })
    } else if (id === 3) {
      Taro.navigateTo({
        url: '/package-detail/pages/nanlu-detail/index'
      })
    }
  }

  const handleCustomPage = () => {
    Taro.navigateTo({
      url: '/pages/custom/index'
    })
  }

  return (
    <View className="routes-page">
      {/* 页面标题 */}
      <View className="page-title-wrapper">
        <Text className="page-title">热门徒步线路</Text>
      </View>

      {/* 线路列表 */}
      <View className="routes-container">
        {routes.map((route, index) => (
          <View
            key={`${route.id}-${animationTrigger}`}
            className={`route-card card-enter-${index + 1}`}
            onTap={() => handleRouteDetail(route.id)}
          >
            <View className="image-wrapper">
              <Image
                className="route-image"
                mode="aspectFill"
                src={route.image}
                lazyLoad
              />
            </View>

            <View className="route-content">
              <Text className="route-name">{route.name}</Text>
              <Text className="route-desc">{route.description}</Text>
              <View className="difficulty-badge">
                <Text className="difficulty-text">{route.difficulty}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* 私人订制入口 */}
      <View key={`custom-${animationTrigger}`} className="custom-section">
        <Text className="custom-title">私人订制</Text>
        <Text className="custom-subtitle">为您量身定制专属旅行体验</Text>

        <View className="custom-card" onTap={handleCustomPage}>
          <View className="custom-content">
            <View className="custom-icon">✨</View>
            <Text className="custom-main-text">专属行程定制</Text>
            <Text className="custom-desc-text">根据您的需求，设计独一无二的外旅行计划</Text>
            <View className="custom-arrow">→</View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default RoutesPage
