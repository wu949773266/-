import { View, Text } from '@tarojs/components'
import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import type { FC } from 'react'
import { ArrowLeft, Camera, Car, Mountain, Sparkles } from 'lucide-react-taro'
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

  const requirements = [
    {
      icon: Mountain,
      title: '户外魂',
      desc: '能吃苦，执行力强，身体里藏着对山野的热爱'
    },
    {
      icon: Car,
      title: '会驾驶',
      desc: '山路上的掌舵者，确保每一次出发的安全'
    },
    {
      icon: Camera,
      title: '懂摄影',
      desc: '审美在线，能捕捉旅途中的高光时刻',
      highlight: true
    }
  ]

  return (
    <View className="recruit-page">
      {/* 背景图 */}
      <View className="bg-container">
        <View 
          className="bg-image"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&q=80)' }}
        />
        <View className="bg-gradient" />
      </View>

      {/* 返回按钮 */}
      <View className="back-btn" onClick={handleBack}>
        <ArrowLeft size={20} color="rgba(255,255,255,0.9)" />
      </View>

      {/* 主视觉区 */}
      <View className="hero-section">
        <View className="hero-badge">
          <Sparkles size={14} color="#2f6f4f" />
          <Text className="badge-text">RECRUITING</Text>
        </View>
        <Text className="hero-title">进山去</Text>
        <Text className="hero-subtitle">山渡户外招募同行者</Text>
      </View>

      {/* 内容区 */}
      <View className="content-section">
        {/* 我们在找谁 */}
        <View className="section">
          <Text className="section-label">WHO WE NEED</Text>
          <Text className="section-title">我们在找谁</Text>
          <Text className="section-intro">
            一名全能型伙伴（男），一起在山野间创造风景。
          </Text>

          <View className="requirement-list">
            {requirements.map((item, index) => (
              <View key={index} className={`requirement-item ${item.highlight ? 'highlight' : ''}`}>
                <View className="req-icon-wrap">
                  <item.icon size={22} color={item.highlight ? '#2f6f4f' : '#5a6b61'} />
                </View>
                <View className="req-content">
                  <View className="req-header">
                    <Text className="req-title">{item.title}</Text>
                    {item.highlight && <Text className="req-tag">优先</Text>}
                  </View>
                  <Text className="req-desc">{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 关于山渡 */}
        <View className="section about-section">
          <Text className="section-label">ABOUT US</Text>
          <Text className="section-title">关于山渡</Text>
          
          <View className="about-card">
            <View className="about-point">
              <View className="point-dot" />
              <Text className="point-text">一群在云南深耕线路的年轻人</Text>
            </View>
            <View className="about-point">
              <View className="point-dot" />
              <Text className="point-text">薪酬透明，管理人性</Text>
            </View>
            <View className="about-point">
              <View className="point-dot" />
              <Text className="point-text">拒绝无效内耗，专注品质出行</Text>
            </View>
          </View>

          <View className="quote-card">
            <Text className="quote-text">
              与其在城市远眺{'\n'}不如来山里设计风景
            </Text>
          </View>
        </View>

        {/* 底部 */}
        <View className="footer-section">
          <Text className="footer-hint">期待与你同行</Text>
        </View>
      </View>
    </View>
  )
}

export default RecruitPage
