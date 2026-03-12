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
      image: 'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2FDSCF5976.jpg&nonce=48990956-2185-49cd-ac74-0b332a5535fe&project_id=7616065616637886464&sign=b11028e3175e345d1fac414f7553a6f653bbbc3f99b7fe74859eeddabbccc8fc'
    },
    {
      id: 1,
      name: '雨崩徒步',
      description: '云南梅里秘境 · 4天摄影徒步',
      difficulty: '难度 ⭐⭐',
      image: 'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260312035527_5_87.jpg&nonce=1da479bf-2979-4703-9b93-5e078a1d3841&project_id=7616065616637886464&sign=7410c9ccec960645164cdac0ce5bf89eede0c9aaf965eec1f81927184cfac40a'
    },
    {
      id: 3,
      name: '南极洛徒步',
      description: '秘境湖泊群 · 3天徒步',
      difficulty: '难度 ⭐⭐',
      image: 'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2FIMG_8134.jpg&nonce=88649429-fcd8-40ed-8af3-a3f455db65b3&project_id=7616065616637886464&sign=ea6000fa120c48095e662a844881d5f05660d7f135d8fc61b7b9255411efd0d6'
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
