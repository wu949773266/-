import { View, Text } from '@tarojs/components'
import Taro, { useDidShow, useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import { useState } from 'react'
import type { FC } from 'react'
import { LogOut, Mountain, ClipboardList } from 'lucide-react-taro'
import './index.css'

const AboutPage: FC = () => {
  const [animationTrigger, setAnimationTrigger] = useState(0)

  // 每次页面显示时触发动画
  useDidShow(() => {
    setAnimationTrigger(prev => prev + 1)
  })

  // 配置分享给朋友（自动截取当前页面）
  useShareAppMessage(() => {
    return {
      title: '山渡户外 - 关于我们',
      path: '/pages/about/index'
    }
  })

  // 配置分享到朋友圈（自动截取当前页面）
  useShareTimeline(() => {
    return {
      title: '山渡户外 - 走山渡心，走进真正的山野',
      query: ''
    }
  })

  // 关闭小程序
  const handleCloseMiniProgram = () => {
    Taro.exitMiniProgram({
      success: () => {
        console.log('小程序已关闭')
      }
    })
  }

  // 跳转到招聘页面
  const handleGoToRecruit = () => {
    Taro.navigateTo({
      url: '/pages/recruit/index'
    })
  }

  // 跳转到评价问卷（活动管理后台）
  const handleGoToSurveyAdmin = () => {
    Taro.navigateTo({
      url: '/pages/survey-admin/index'
    })
  }

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

      {/* 招贤纳士入口 */}
      <View 
        className="recruit-entry-section"
        onClick={handleGoToRecruit}
      >
        <View className="recruit-entry-card">
          <View className="recruit-entry-icon">
            <Mountain size={40} color="#2f6f4f" />
          </View>
          <View className="recruit-entry-content">
            <Text className="recruit-entry-title">招贤纳士</Text>
            <Text className="recruit-entry-desc">年轻人的团队 · 透明化 · 人性化</Text>
          </View>
          <View className="recruit-entry-arrow">→</View>
        </View>
      </View>

      {/* 满意度调查管理入口 */}
      <View 
        className="recruit-entry-section"
        onClick={handleGoToSurveyAdmin}
      >
        <View className="recruit-entry-card">
          <View className="recruit-entry-icon">
            <ClipboardList size={40} color="#2f6f4f" />
          </View>
          <View className="recruit-entry-content">
            <Text className="recruit-entry-title">满意度调查管理</Text>
            <Text className="recruit-entry-desc">创建活动问卷 · 查看评价数据</Text>
          </View>
          <View className="recruit-entry-arrow">→</View>
        </View>
      </View>

      {/* 关闭小程序按钮 */}
      <View
        key={`close-btn-${animationTrigger}`}
        className="close-mini-btn ai-enter-1"
        onClick={handleCloseMiniProgram}
      >
        <View className="close-btn-content">
          <View className="close-icon-wrapper">
            <LogOut size={48} color="#2f6f4f" />
          </View>
          <View className="close-text-content">
            <Text className="close-title">关闭小程序</Text>
            <Text className="close-desc">点击返回微信</Text>
          </View>
          <View className="close-arrow">→</View>
        </View>
      </View>
    </View>
  )
}

export default AboutPage
