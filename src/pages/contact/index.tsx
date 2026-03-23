import { View, Text, Button } from '@tarojs/components'
import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import type { FC } from 'react'
import { MessageCircle, Sparkles, User } from 'lucide-react-taro'
import { CONTACT_CONFIG, isPromoMode, getPromoterInfo } from '@/config/contact'
import './index.css'

const ContactPage: FC = () => {
  // 配置分享给朋友（自动截取当前页面）
  useShareAppMessage(() => {
    return {
      title: '山渡户外 - 联系我们',
      path: '/pages/contact/index'
    }
  })

  // 配置分享到朋友圈（自动截取当前页面）
  useShareTimeline(() => {
    return {
      title: '山渡户外 - 联系我们',
      query: ''
    }
  })

  const promoterInfo = getPromoterInfo()

  const handleCopyWechat = () => {
    Taro.setClipboardData({
      data: CONTACT_CONFIG.wechat,
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
      phoneNumber: CONTACT_CONFIG.phone
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
        {/* 推广者信息卡片（仅在推广模式下显示） */}
        {isPromoMode && promoterInfo && (
          <View className="promoter-card">
            <View className="promoter-icon">
              <User size={24} color="#ff6b35" />
            </View>
            <View className="promoter-info">
              <Text className="promoter-label">推荐人</Text>
              <Text className="promoter-name">{promoterInfo.name}</Text>
            </View>
          </View>
        )}

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
            <Text className="contact-value">{CONTACT_CONFIG.phone}</Text>
          </View>
          <View className="contact-divider" />
          <View className="contact-item">
            <Text className="contact-label">💬 微信</Text>
            <Text className="contact-value">{CONTACT_CONFIG.wechat}</Text>
          </View>
          <View className="contact-divider" />
          <View className="contact-item">
            <Text className="contact-label">📍 地址</Text>
            <Text className="contact-value">{CONTACT_CONFIG.location}</Text>
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
