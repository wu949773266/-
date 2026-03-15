import { View, Text, Image, Button } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import type { FC } from 'react'
import { IMAGE_CONFIG } from '@/config/images'
import './index.css'

const IndexPage: FC = () => {
  const [animationTrigger, setAnimationTrigger] = useState(0)

  // 每次页面显示时触发动画
  useDidShow(() => {
    setAnimationTrigger(prev => prev + 1)
  })

  const handleViewRoutes = () => {
    Taro.switchTab({
      url: '/pages/routes/index'
    })
  }

  return (
    <View key={`index-${animationTrigger}`} className="index-page">
      {/* 全屏头部横幅 */}
      <View className="hero-section">
        <Image
          className="hero-bg"
          mode="aspectFill"
          src={IMAGE_CONFIG.HUTIAOXIA_DETAIL_BG}
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
