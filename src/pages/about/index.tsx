import { View, Text } from '@tarojs/components'
import { useDidShow, navigateTo } from '@tarojs/taro'
import { useState } from 'react'
import type { FC } from 'react'
import { Bot } from 'lucide-react-taro'
import './index.css'

const AboutPage: FC = () => {
  const [animationTrigger, setAnimationTrigger] = useState(0)

  // 每次页面显示时触发动画
  useDidShow(() => {
    setAnimationTrigger(prev => prev + 1)
  })

  const stats = [
    { value: '3000+', label: '累计带队', icon: '👥' },
    { value: '2023', label: '成立年份', icon: '🎯' },
    { value: '100%', label: '安全出行', icon: '✅' }
  ]

  const values = [
    {
      icon: '🏔️',
      title: '专业探索',
      desc: '专注户外探索与徒步摄影，每条路线都经过精心设计'
    },
    {
      icon: '💪',
      title: '全程陪伴',
      desc: '经验丰富的领队全程陪伴，确保您的安全与体验'
    },
    {
      icon: '✨',
      title: '品质服务',
      desc: '最多6人小团，摄影服务，让您的旅行更加难忘'
    }
  ]

  return (
    <View key={`about-${animationTrigger}`} className="about-page">
      {/* 页面头部 */}
      <View className="page-header">
        <View className="header-decoration" />
        <View className="header-content">
          <Text className="page-subtitle">ABOUT US</Text>
          <Text className="page-title">关于山渡</Text>
          <Text className="page-desc">走进山野，也找回自己</Text>
        </View>
        <View className="header-gradient" />
      </View>

      {/* 数据统计卡片 */}
      <View className="stats-container">
        <View className="stats-card">
          <View className="stats-grid">
            {stats.map((stat, index) => (
              <View
                key={`stat-${index}-${animationTrigger}`}
                className={`stat-item stat-enter-${index + 1}`}
              >
                <View className="stat-icon">{stat.icon}</View>
                <Text className="stat-value">{stat.value}</Text>
                <Text className="stat-label">{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* 品牌理念 */}
      <View className="philosophy-section">
        <Text className="section-title">品牌理念</Text>
        <Text className="philosophy-text">
          山渡户外成立于2023年，我们相信真正的旅行不是逃离城市，而是走进山野，重新认识自己。
        </Text>
        <View className="philosophy-decoration">
          <Text className="quote-mark">&ldquo;</Text>
          <Text className="quote-text">走山渡心</Text>
          <Text className="quote-mark">&rdquo;</Text>
        </View>
      </View>

      {/* 核心价值 */}
      <View className="values-section">
        <Text className="section-title">核心价值</Text>
        <View className="values-container">
          {values.map((value, index) => (
            <View
              key={`value-${index}-${animationTrigger}`}
              className={`value-card value-enter-${index + 1}`}
            >
              <View className="value-icon-wrapper">
                <Text className="value-icon">{value.icon}</Text>
              </View>
              <Text className="value-title">{value.title}</Text>
              <Text className="value-desc">{value.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* AI 助手入口 */}
      <View
        key={`ai-assistant-${animationTrigger}`}
        className="ai-assistant-entry ai-enter-1"
        onClick={() => navigateTo({ url: '/pages/chat/index' })}
      >
        <View className="ai-assistant-content">
          <View className="ai-icon-wrapper">
            <Bot size={48} color="#52c41a" />
          </View>
          <View className="ai-text-content">
            <Text className="ai-title">AI 智能助手</Text>
            <Text className="ai-desc">专业户外知识问答，为您提供路线推荐、装备建议</Text>
          </View>
          <View className="ai-arrow">→</View>
        </View>
      </View>
    </View>
  )
}

export default AboutPage
