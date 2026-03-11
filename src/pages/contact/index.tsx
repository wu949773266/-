import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import type { FC } from 'react'
import './index.css'

const ContactPage: FC = () => {
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

  return (
    <View className="contact-page">
      <View className="page-header">
        <Text className="page-title">
          报名 / 联系
        </Text>
      </View>
      <View className="contact-container">
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
