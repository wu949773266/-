import { View, Text, Image } from '@tarojs/components'
import { useDidShow, useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import { useState } from 'react'
import { IMAGE_CONFIG } from '@/config/images'
import './index.css'

const CustomPage = () => {
  const [animationTrigger, setAnimationTrigger] = useState(0)

  // 每次页面显示时触发动画
  useDidShow(() => {
    setAnimationTrigger(prev => prev + 1)
  })

  // 配置分享给朋友
  useShareAppMessage(() => {
    return {
      title: '山渡户外 - 私人订制',
      path: '/pages/custom/index',
      imageUrl: '/assets/share/nanlu-cover.jpg'
    }
  })

  // 配置分享到朋友圈
  useShareTimeline(() => {
    return {
      title: '山渡户外 - 私人订制',
      query: '',
      imageUrl: '/assets/share/nanlu-cover.jpg'
    }
  })

  return (
    <View className="custom-page">
      {/* 头部图片 */}
      <View className="header-image">
        <Image
          src={IMAGE_CONFIG.NANLU_IMAGE}
          mode="aspectFill"
          className="image"
        />
        <View className="header-overlay" />
        <Text className="header-title">私人订制</Text>
      </View>

      {/* 主要内容 */}
      <View className="content">
        <View className="intro-section">
          <Text className="intro-text">
            每一次旅行都是一场心灵的修行，每一段旅程都值得被精心雕琢。我们深信，真正的奢华不在于繁复的铺陈，而在于为您量身定制的独一无二。
          </Text>

          <Text className="intro-text intro-text-space">
            无论您向往高山峡谷的壮阔，还是渴望隐世秘境的静谧，我们将以专业的态度和贴心的服务，为您打造专属的户外体验。
          </Text>

          <Text className="intro-text intro-text-highlight">
            联系我们，开启只属于您的非凡旅程。
          </Text>
        </View>

        {/* 服务特色 */}
        <View className="features-section">
          <View
            key={`feature-1-${animationTrigger}`}
            className="feature-item"
            style={{ animationDelay: '0.2s' }}
          >
            <View className="feature-icon">🎯</View>
            <Text className="feature-title">量身定制</Text>
            <Text className="feature-desc">根据您的需求，设计专属行程</Text>
          </View>

          <View
            key={`feature-2-${animationTrigger}`}
            className="feature-item"
            style={{ animationDelay: '0.3s' }}
          >
            <View className="feature-icon">🏔️</View>
            <Text className="feature-title">专业向导</Text>
            <Text className="feature-desc">经验丰富的户外领队全程陪伴</Text>
          </View>

          <View
            key={`feature-3-${animationTrigger}`}
            className="feature-item"
            style={{ animationDelay: '0.4s' }}
          >
            <View className="feature-icon">⭐</View>
            <Text className="feature-title">品质保障</Text>
            <Text className="feature-desc">精选路线，贴心服务，安全无忧</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CustomPage
