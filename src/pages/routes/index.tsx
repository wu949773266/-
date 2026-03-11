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
      image: 'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2FDSCF5976.jpg&nonce=cc78e6aa-0339-4c1d-a127-721cca0ccfa1&project_id=7616028140170690575&sign=f61073619595cb6cd3dd41862314e988921869d99e3ae3d33b9863821300dfe7'
    },
    {
      id: 1,
      name: '雨崩徒步',
      description: '云南梅里秘境 · 4天摄影徒步',
      difficulty: '难度 ⭐⭐',
      image: 'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260312035527_5_87.jpg&nonce=654a58b8-f975-47fe-8863-c18a7e47117a&project_id=7616028140170690575&sign=a8f0cdf46715746a40f9ede43cdfda437f1d2efa1c732275fa5da2fab9565a99'
    },
    {
      id: 3,
      name: '南极洛徒步',
      description: '秘境湖泊群 · 3天徒步',
      difficulty: '难度 ⭐⭐',
      image: 'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2FIMG_8134.jpg&nonce=cbe446e6-1c3d-435f-b3ba-b0049b8735fc&project_id=7616028140170690575&sign=88a8d1bc40f712b464ade6fd63bd718b1f7a16d0c95db190db01a88a41eb3b85'
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
