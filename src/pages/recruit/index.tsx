import { View, Text } from '@tarojs/components'
import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import type { FC } from 'react'
import { ArrowLeft } from 'lucide-react-taro'
import './index.css'

const RecruitPage: FC = () => {
  // 配置分享给朋友（自动截取当前页面）
  useShareAppMessage(() => {
    return {
      title: '山渡户外招助理了！',
      path: '/pages/recruit/index'
    }
  })

  // 配置分享到朋友圈（自动截取当前页面）
  useShareTimeline(() => {
    return {
      title: '进山去！山渡户外招助理了',
      query: ''
    }
  })

  const handleBack = () => {
    Taro.navigateBack()
  }

  return (
    <View className="recruit-page">
      {/* 返回按钮 */}
      <View className="back-header" onClick={handleBack}>
        <ArrowLeft size={24} color="#2f6f4f" />
        <Text className="back-text">返回</Text>
      </View>

      {/* 主标题 */}
      <View className="recruit-hero">
        <Text className="hero-title">进山去！</Text>
        <Text className="hero-subtitle">山渡户外招助理了</Text>
      </View>

      {/* 招聘内容 */}
      <View className="recruit-content">
        {/* 我们在找你 */}
        <View className="section">
          <Text className="section-title">我们在找你</Text>
          
          <View className="requirement-card">
            <View className="requirement-header">
              <Text className="requirement-role">一名全能型选手（男）</Text>
            </View>
            <Text className="requirement-desc">
              身体里藏着户外魂，能吃苦，执行力强。
            </Text>
          </View>

          <View className="requirement-card">
            <View className="requirement-header">
              <Text className="requirement-role">山路上的掌舵者</Text>
            </View>
            <Text className="requirement-desc">
              熟练驾驶，确保每一次出发的安全。
            </Text>
          </View>

          <View className="requirement-card highlight">
            <View className="requirement-header">
              <Text className="requirement-role">视觉系的捕手</Text>
              <Text className="priority-tag">优先</Text>
            </View>
            <Text className="requirement-desc">
              审美水平在线，懂构图、会摄影。我们将优先考虑能拍出高质感影像的伙伴。
            </Text>
          </View>
        </View>

        {/* 关于山渡 */}
        <View className="section about-section">
          <Text className="section-title">关于山渡</Text>
          <View className="about-content">
            <Text className="about-text">
              我们是一群在云南深耕线路的年轻人。
            </Text>
            <Text className="about-text">
              这里薪酬透明、管理人性，拒绝无效内耗。
            </Text>
            <View className="about-highlight">
              <Text className="highlight-text">
                与其在城市里远眺，{'\n'}不如来山里和我们一起设计风景。
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default RecruitPage
