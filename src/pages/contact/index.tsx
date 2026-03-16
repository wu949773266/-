import { View, Text, Button } from '@tarojs/components'
import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import type { FC } from 'react'
import { MessageCircle, Sparkles } from 'lucide-react-taro'
import './index.css'

const ContactPage: FC = () => {
  // 配置分享给朋友
  useShareAppMessage(() => {
    return {
      title: '山渡户外 - 联系我们',
      path: '/pages/contact/index',
      imageUrl: '/assets/share/share-cover.jpg'
    }
  })

  // 配置分享到朋友圈
  useShareTimeline(() => {
    return {
      title: '山渡户外 - 联系我们',
      query: '',
      imageUrl: '/assets/share/share-cover.jpg'
    }
  })

  const handleCopyWechat = () => {
    Taro.setClipboardData({
      data: 'SDHW008',
      success: () => {
        Taro.showToast({
          title: '微信号已复制',
          icon: 'success'
        })
      }
    })
  }

  const handleCall = () => {
    Taro.makePhoneCall({
      phoneNumber: '18623355672'
    })
  }

  const handleChatAI = () => {
    Taro.navigateTo({
      url: '/pages/chat/index'
    })
  }

  return (
    <View className="contact-page">
      <View className="page-header">
        <Text className="page-title">
          报名 / 联系
        </Text>
      </View>
      <View className="contact-container">
        {/* AI 助手卡片 */}
        <View className="ai-assistant-card" onClick={handleChatAI}>
          <View className="ai-assistant-content">
            <View className="ai-assistant-icon">
              <Sparkles size={32} color="#2f6f4f" />
            </View>
            <View className="ai-assistant-text">
              <Text className="ai-assistant-title">智能助手</Text>
              <Text className="ai-assistant-desc">24小时在线，随时回答您的问题</Text>
            </View>
            <MessageCircle size={24} color="#2f6f4f" />
          </View>
        </View>

        <View className="contact-card card-fade-in">
          <View className="contact-item" onClick={handleCall}>
            <Text className="contact-label">📞 电话</Text>
            <Text className="contact-value">18623355672</Text>
          </View>
          <View className="contact-divider" />
          <View className="contact-item">
            <Text className="contact-label">💬 微信</Text>
            <Text className="contact-value">SDHW008</Text>
          </View>
          <View className="contact-divider" />
          <View className="contact-item">
            <Text className="contact-label">📍 地址</Text>
            <Text className="contact-value">丽江 · 束河古镇</Text>
          </View>
        </View>
        <Button
          className="copy-btn"
          onClick={handleCopyWechat}
        >
          复制微信号
        </Button>
      </View>
    </View>
  )
}

export default ContactPage
