import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import type { FC } from 'react'
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
      image: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 1,
      name: '雨崩徒步',
      description: '云南梅里秘境 · 4天摄影徒步',
      difficulty: '难度 ⭐⭐',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      name: '南极洛徒步',
      description: '秘境湖泊群 · 3天徒步',
      difficulty: '难度 ⭐⭐',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ])

  const handleRouteDetail = (id: number) => {
    if (id === 1) {
      Taro.navigateTo({
        url: '/pages/yubeng-detail/index'
      })
    } else if (id === 2) {
      Taro.navigateTo({
        url: '/pages/hutiaoxia-detail/index'
      })
    } else if (id === 3) {
      Taro.navigateTo({
        url: '/pages/nanlu-detail/index'
      })
    }
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
            key={route.id}
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
    </View>
  )
}

export default RoutesPage
