import { Network } from '@/network'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import type { FC } from 'react'
import { YUBENG_IMAGES } from '../../config/images'
import './index.css'

// 住宿说明
const HOTEL_INFO = [
  {
    title: '雨崩酒店环境',
    note: '（楼层不一样可能会没有顶上玻璃）\n（独立入住+400/晚）\n（如没房安排同等酒店住宿）',
  },
  {
    title: '德钦酒店环境',
    note: '（独立入住+200/晚）',
  },
  {
    title: '丽江酒店环境',
    note: '（独立入住+200/晚）',
  },
]

// Q&A 数据
interface FAQItem {
  question: string
  answer: string
  icon: string
  image?: string
}

const YubengDetailPage: FC = () => {
  // 配置分享给朋友（自动截取当前页面）
  useShareAppMessage(() => {
    return {
      title: '雨崩徒步 - 山渡户外',
      path: '/package-detail/pages/yubeng-detail/index'
    }
  })

  // 配置分享到朋友圈（自动截取当前页面）
  useShareTimeline(() => {
    return {
      title: '雨崩徒步 - 香格里拉秘境',
      query: ''
    }
  })

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [hotelImages, setHotelImages] = useState<string[]>([])

  // 页面加载时获取住宿图片 URL
  useEffect(() => {
    const fetchHotelImages = async () => {
      try {
        const res = await Network.request({
          url: '/api/hotel/images',
          method: 'GET'
        })
        console.log('住宿图片响应:', res)
        if (res.data?.code === 200 && res.data?.data?.images) {
          setHotelImages(res.data.data.images)
        }
      } catch (error) {
        console.error('获取住宿图片失败:', error)
      }
    }
    fetchHotelImages()
  }, [])

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index)
  }

  const faqs: FAQItem[] = [
    {
      question: '什么时候适合去雨崩？',
      answer: '',
      icon: '📅',
      image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616074772820262912/yubeng/season_19cb5353.jpg?sign=1778179241-03f48782c1-0-8383bf5627bc5f01882ee3829e2c2f6124170a92312a91a7ad9bd7142c19e335'
    },
    {
      question: '雨崩住宿环境怎么样？',
      answer: '',
      icon: '🏨'
    }
  ]

  const posterImages = [
    YUBENG_IMAGES.YUBENG_POSTER_1,
    YUBENG_IMAGES.YUBENG_POSTER_2,
    YUBENG_IMAGES.YUBENG_POSTER_3,
    YUBENG_IMAGES.YUBENG_POSTER_4
  ]

  // 每日行程数据
  const dailySchedule = [
    {
      day: 'D0',
      title: '丽江集合',
      desc: '丽江机场接机，入住丽江酒店'
    },
    {
      day: 'D1',
      title: '丽江 → 雨崩',
      desc: '尼农峡谷徒步12.5KM，乘坐越野车进村'
    },
    {
      day: 'D2',
      title: '冰湖线',
      desc: '笑农大本营 → 冰湖冲顶，往返13KM'
    },
    {
      day: 'D3',
      title: '神瀑线',
      desc: '神瀑大本营 → 神瀑冲顶，11KM'
    },
    {
      day: 'D4',
      title: '德钦 → 丽江',
      desc: '观梅里雪山日照金山，返回丽江解散'
    }
  ]

  // 装备数据
  const gearItems = [
    { icon: '👟', text: '登山鞋' },
    { icon: '👕', text: '速干衣' },
    { icon: '🧥', text: '抓绒/羽绒' },
    { icon: '🎿', text: '冲锋裤' },
    { icon: '🎒', text: '背包30L' },
    { icon: '🧢', text: '帽子/墨镜' },
  ]

  return (
    <ScrollView scrollY className="detail-page">
      <View className="page-header">
        <Text className="page-title">雨崩徒步</Text>
        <Text className="page-subtitle">香格里拉秘境 · 四天四晚轻奢小团</Text>
      </View>

      <View className="posters-container">
        {posterImages.map((image, index) => (
          <View
            key={index}
            className={`poster-item poster-fade-in-${index + 1}`}
          >
            <Image
              className="poster-image"
              mode="widthFix"
              src={image}
              lazyLoad
              showMenuByLongpress
            />
            
            {/* 第一张图片下面添加行程和装备 */}
            {index === 0 && (
              <View className="poster-info-section">
                {/* 行程概览 */}
                <View className="info-block">
                  <View className="info-block-header">
                    <Text className="info-block-icon">📅</Text>
                    <Text className="info-block-title">行程概览</Text>
                  </View>
                  <View className="schedule-mini">
                    {dailySchedule.map((day, dIndex) => (
                      <View key={dIndex} className="schedule-mini-item">
                        <View className="schedule-mini-badge">{day.day}</View>
                        <View className="schedule-mini-content">
                          <Text className="schedule-mini-title">{day.title}</Text>
                          <Text className="schedule-mini-desc">{day.desc}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>

                {/* 装备清单 */}
                <View className="info-block">
                  <View className="info-block-header">
                    <Text className="info-block-icon">🎒</Text>
                    <Text className="info-block-title">装备建议</Text>
                  </View>
                  <View className="gear-mini">
                    {gearItems.map((gear, gIndex) => (
                      <View key={gIndex} className="gear-mini-item">
                        <Text className="gear-mini-icon">{gear.icon}</Text>
                        <Text className="gear-mini-text">{gear.text}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* 费用提示 */}
                <View className="info-block price-block">
                  <Text className="price-main">¥3280</Text>
                  <Text className="price-sub">/ 人 · 4天4晚 · 含摄影</Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Q&A 问答区 */}
      <View className="faq-section">
        <View className="section-header">
          <Text className="section-title">常见问题</Text>
          <Text className="section-subtitle">Q & A</Text>
        </View>

        <View className="faq-list">
          {faqs.map((faq, index) => (
            <View
              key={index}
              className={`faq-card card-fade-in-${(index % 3) + 1} ${expandedFAQ === index ? 'expanded' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <View className="faq-header">
                <View className="faq-icon">{faq.icon}</View>
                <View className="faq-question-box">
                  <Text className="faq-question">{faq.question}</Text>
                </View>
                <Text className="expand-icon">{expandedFAQ === index ? '▲' : '▼'}</Text>
              </View>
              {expandedFAQ === index && (
                <>
                  {(faq.answer || faq.image) && <View className="faq-divider" />}
                  <View className="faq-answer-box">
                    {faq.answer && <Text className="faq-answer">{faq.answer}</Text>}
                    {faq.image && (
                      <Image
                        className="faq-image"
                        mode="widthFix"
                        src={faq.image}
                        lazyLoad
                        showMenuByLongpress
                      />
                    )}
                  </View>
                  {/* 酒店环境内容 */}
                  {index === 1 && (
                    <View className="hotel-content">
                      {HOTEL_INFO.map((hotel, hIndex) => (
                        <View key={hIndex} className="hotel-card">
                          <Text className="hotel-title">{hotel.title}</Text>
                          <Text className="hotel-note">{hotel.note}</Text>
                          <View className="hotel-images">
                            {hotelImages.slice(hIndex * 3, hIndex * 3 + 3).map((img, i) => (
                              <Image
                                key={i}
                                className="hotel-image"
                                mode="widthFix"
                                src={img}
                                lazyLoad
                                showMenuByLongpress
                              />
                            ))}
                          </View>
                        </View>
                      ))}
                    </View>
                  )}
                </>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* 返回按钮 */}
      <View className="back-button-container">
        <View
          className="back-button"
          onClick={() => Taro.switchTab({ url: '/pages/routes/index' })}
        >
          <Text className="back-button-text">← 返回线路列表</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default YubengDetailPage
