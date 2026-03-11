import { View, Text, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import type { FC } from 'react'
import './index.css'

const IndexPage: FC = () => {
  const handleViewRoutes = () => {
    Taro.switchTab({
      url: '/pages/routes/index'
    })
  }

  return (
    <View className="index-page">
      {/* 全屏头部横幅 */}
      <View className="hero-section">
        <Image
          className="hero-bg"
          mode="aspectFill"
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b"
        />
        <View className="hero-overlay" />
        <View className="hero-content">
          <Text className="hero-title">山渡户外</Text>
          <Text className="hero-subtitle">走山渡心 · 走进真正的山野</Text>
          <Button
            className="hero-btn"
            onClick={handleViewRoutes}
          >
            查看徒步线路
          </Button>
        </View>
      </View>
    </View>
  )
}

export default IndexPage
