import { View, Text, Image, Button } from '@tarojs/components'
import Taro, { useDidShow, useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import { useState } from 'react'
import type { FC } from 'react'
import './index.css'

const IndexPage: FC = () => {
  const [animationTrigger, setAnimationTrigger] = useState(0)

  // 每次页面显示时触发动画
  useDidShow(() => {
    setAnimationTrigger(prev => prev + 1)
  })

  // 配置分享给朋友（自动截取当前页面）
  useShareAppMessage(() => {
    return {
      title: '山渡户外 - 走山渡心，走进真正的山野',
      path: '/pages/index/index'
    }
  })

  // 配置分享到朋友圈（自动截取当前页面）
  useShareTimeline(() => {
    return {
      title: '山渡户外 - 走山渡心，走进真正的山野',
      query: ''
    }
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
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=1200&q=80"
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
