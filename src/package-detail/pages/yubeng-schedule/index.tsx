import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import { useState } from 'react'
import type { FC } from 'react'
import { YUBENG_IMAGES } from '../../config/images'
import imgData from '../../config/hotel_images'
import './index.css'

// 住宿图片直接使用本地 Base64
const hotelImages = [
  imgData.HOTEL_1,
  imgData.HOTEL_2,
  imgData.HOTEL_3,
  imgData.HOTEL_4,
  imgData.HOTEL_5,
  imgData.HOTEL_6,
  imgData.HOTEL_7,
  imgData.HOTEL_8,
  imgData.HOTEL_9,
]

const YubengSchedulePage: FC = () => {
  useShareAppMessage(() => ({
    title: '雨崩徒步摄影4日游 - 山渡户外',
    path: '/package-detail/pages/yubeng-schedule/index'
  }))

  useShareTimeline(() => ({
    title: '雨崩徒步摄影4日游 - 香格里拉秘境',
    query: ''
  }))

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index)
  }

  const hotelInfo = [
    { title: '雨崩酒店环境', note: '（楼层不一样可能会没有顶上玻璃）（独立入住+400/晚）（如没房安排同等酒店住宿）' },
    { title: '德钦酒店环境', note: '（独立入住+200/晚）' },
    { title: '丽江酒店环境', note: '（独立入住+200/晚）' }
  ]

  const faqs = [
    {
      question: '住宿环境',
      icon: '🏨'
    },
    {
      question: '什么时候适合去雨崩？',
      icon: '📅',
      image: imgData.SEASON
    }
  ]

  const posterImages = [
    YUBENG_IMAGES.YUBENG_POSTER_1,
    YUBENG_IMAGES.YUBENG_POSTER_2,
    YUBENG_IMAGES.YUBENG_POSTER_3,
    YUBENG_IMAGES.YUBENG_POSTER_4
  ]

  return (
    <ScrollView scrollY className="detail-page">
      {/* 头部 - 白色透明打底 */}
      <View className="page-header">
        <Text className="page-title">雨崩徒步</Text>
        <Text className="page-subtitle">香格里拉秘境 · 四天四晚轻奢小团</Text>
      </View>

      {/* 海报 */}
      <View className="posters-container">
        {posterImages.map((image, index) => (
          <View key={index} className={`poster-item poster-fade-in-${index + 1}`}>
            <Image className="poster-image" mode="widthFix" src={image} lazyLoad showMenuByLongpress />
          </View>
        ))}
      </View>

      {/* Q&A */}
      <View className="faq-section">
        <View className="section-header">
          <Text className="section-title">常见问题</Text>
          <Text className="section-subtitle">Q & A</Text>
        </View>

        <View className="faq-list">
          {faqs.map((faq, index) => (
            <View
              key={index}
              className={`faq-card ${expandedFAQ === index ? 'expanded' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <View className="faq-header">
                <View className="faq-icon">{faq.icon}</View>
                <Text className="faq-question">{faq.question}</Text>
                <Text className="faq-arrow">{expandedFAQ === index ? '▲' : '▼'}</Text>
              </View>
              {expandedFAQ === index && (
                <>
                  <View className="faq-divider" />
                  {index === 0 && (
                    <View className="hotel-content">
                      {hotelInfo.map((hotel, hIndex) => (
                        <View key={hIndex} className="hotel-card">
                          <Text className="hotel-title">{hotel.title}</Text>
                          <Text className="hotel-note">{hotel.note}</Text>
                          <View className="hotel-images">
                            {hotelImages.slice(hIndex * 3, hIndex * 3 + 3).map((img, i) => (
                              <Image key={i} className="hotel-image" mode="widthFix" src={img} lazyLoad showMenuByLongpress />
                            ))}
                          </View>
                        </View>
                      ))}
                    </View>
                  )}
                  {faq.image && (
                    <Image className="faq-image" mode="widthFix" src={faq.image} lazyLoad showMenuByLongpress />
                  )}
                </>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* 返回按钮 */}
      <View className="back-button-container">
        <View className="back-button" onClick={() => Taro.switchTab({ url: '/pages/routes/index' })}>
          <Text className="back-button-text">← 返回线路列表</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default YubengSchedulePage
