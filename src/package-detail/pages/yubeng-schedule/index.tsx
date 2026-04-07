import { Network } from '@/network'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import type { FC } from 'react'
import './index.css'

// Q&A 数据
interface FAQItem {
  question: string
  answer: string
  icon: string
  image?: string
}

const YubengSchedulePage: FC = () => {
  // 配置分享给朋友
  useShareAppMessage(() => {
    return {
      title: '雨崩徒步摄影4日游 - 山渡户外',
      path: '/package-detail/pages/yubeng-schedule/index'
    }
  })

  // 配置分享到朋友圈
  useShareTimeline(() => {
    return {
      title: '雨崩徒步摄影4日游 - 香格里拉秘境',
      query: ''
    }
  })

  const [expandedSection, setExpandedSection] = useState<Record<string, boolean>>({
    schedule: true,
    price: true,
    gear: true
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

  const toggleSection = (section: string) => {
    setExpandedSection(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index)
  }

  // 住宿说明
  const hotelInfo = [
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

  const dailySchedule = [
    {
      day: 'D0',
      title: '丽江集合',
      time: 'Day 0',
      highlights: ['丽江机场接机', '入住丽江酒店'],
      desc: '出发前一晚买丽江三义国际机场机票，机场接机到酒店入住。酒店离丽江古城和束河古镇车程10分钟左右。'
    },
    {
      day: 'D1',
      title: '丽江 → 雨崩',
      time: 'Day 1',
      highlights: ['尼农峡谷徒步', '乘坐越野车进村'],
      desc: '早上7点丽江酒店用完早餐后集合出发 → 12点左右奔子栏用午餐 → 2点左右尼龙徒步起点 → 7-8点到达下雨崩乘坐越野车到上雨崩酒店用餐休息。尼龙线徒步12.5KM，用时5H左右。'
    },
    {
      day: 'D2',
      title: '冰湖线',
      time: 'Day 2',
      highlights: ['笑农大本营', '冰湖冲顶'],
      desc: '8点下楼用餐集合出发冰湖线 → 到达笑农大本营（有泡面炒饭水等补给） → 用完餐冲顶冰湖 - 下撤 → 到达酒店用晚餐休息。往返13KM，用时7-9小时。'
    },
    {
      day: 'D3',
      title: '神瀑线 → 出村',
      time: 'Day 3',
      highlights: ['神瀑大本营', '出村徒步'],
      desc: '8点下楼用餐集合乘坐越野车到下雨崩出发神瀑线 → 到达神瀑大本营 → 休息冲顶神瀑 - 下撤 → 到达下雨崩可在咖啡店内用餐 → 出村 → 尼农徒步起点 → 德钦酒店。神瀑往返11KM，用时5小时。'
    },
    {
      day: 'D4',
      title: '德钦 → 丽江解散',
      time: 'Day 4',
      highlights: ['梅里雪山日照金山', '香格里拉独克宗古城'],
      desc: '根据当季时段起床观梅里雪山日照金山。日照金山结束前往香格里拉独克宗古城，可去世界上最大的转经筒或自由活动，用完午餐返回丽江。'
    }
  ]

  return (
    <ScrollView scrollY className="detail-page">
      {/* 头部展示区 */}
      <View className="page-header-section">
        <View className="header-bg-gradient" />
        <View className="header-overlay" />
        <View className="header-content">
          <View className="tag">
            <Text className="tag-text">4天4晚</Text>
          </View>
          <Text className="page-title">雨崩徒步摄影4日游</Text>
          <View className="tag-container">
            <View className="tag-small">
              <Text className="tag-small-text">2-6人小团</Text>
            </View>
            <View className="tag-small">
              <Text className="tag-small-text">全程拍摄</Text>
            </View>
            <View className="tag-small">
              <Text className="tag-small-text">难度 ⭐⭐</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 主内容区域 */}
      <View className="content-section">
        {/* 服务亮点 */}
        <View className="info-card card-fade-in-1">
          <View className="card-header">
            <View className="card-icon">✨</View>
            <View className="card-title-box">
              <Text className="card-title">服务内容</Text>
            </View>
          </View>
          <View className="card-divider" />
          <View className="service-list">
            <View className="service-item">
              <Text className="service-icon">📷</Text>
              <Text className="service-text">2-6人配备一位摄影领队（富士xh2/xt5）</Text>
            </View>
            <View className="service-item">
              <Text className="service-icon">🏨</Text>
              <Text className="service-text">4天4晚住宿</Text>
            </View>
            <View className="service-item">
              <Text className="service-icon">🛡️</Text>
              <Text className="service-text">高原户外意外险（保额50万）</Text>
            </View>
            <View className="service-item">
              <Text className="service-icon">🎽</Text>
              <Text className="service-text">提供：冲锋衣、登山杖、雨衣</Text>
            </View>
            <View className="service-item">
              <Text className="service-icon">🚗</Text>
              <Text className="service-text">2-4人5座车 / 5-6人7座商务车</Text>
            </View>
            <View className="service-item">
              <Text className="service-icon">🎫</Text>
              <Text className="service-text">门票+上下雨崩越野车</Text>
            </View>
          </View>
        </View>

        {/* 每日行程 */}
        <View
          className={`info-card card-fade-in-2 ${expandedSection.schedule ? 'expanded' : ''}`}
          onClick={() => toggleSection('schedule')}
        >
          <View className="card-header">
            <View className="card-icon">📅</View>
            <View className="card-title-box">
              <Text className="card-title">每日行程</Text>
            </View>
            <Text className="expand-icon">{expandedSection.schedule ? '▲' : '▼'}</Text>
          </View>
          <View className="card-divider" />
          {expandedSection.schedule && (
            <View className="schedule-timeline">
              {dailySchedule.map((day, index) => (
                <View key={index} className="schedule-day">
                  <View className="day-marker">
                    <View className="day-badge">{day.day}</View>
                    <View className="day-line" />
                  </View>
                  <View className="day-content">
                    <View className="day-header">
                      <Text className="day-title">{day.title}</Text>
                      <Text className="day-time">{day.time}</Text>
                    </View>
                    <View className="day-highlights">
                      {day.highlights.map((h, i) => (
                        <View key={i} className="highlight-tag">
                          <Text className="highlight-text">{h}</Text>
                        </View>
                      ))}
                    </View>
                    <Text className="day-desc">{day.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* 费用说明 */}
        <View
          className={`info-card card-fade-in-3 ${expandedSection.price ? 'expanded' : ''}`}
          onClick={() => toggleSection('price')}
        >
          <View className="card-header">
            <View className="card-icon">💰</View>
            <View className="card-title-box">
              <Text className="card-title">费用说明</Text>
            </View>
            <Text className="expand-icon">{expandedSection.price ? '▲' : '▼'}</Text>
          </View>
          <View className="card-divider" />
          {expandedSection.price && (
            <View className="price-section">
              <View className="price-main">
                <Text className="price-label">总费用</Text>
                <Text className="price-value">¥3280</Text>
              </View>
              <View className="price-divider" />
              <View className="price-detail">
                <View className="price-row">
                  <Text className="price-item">首付款定金</Text>
                  <Text className="price-amount">¥1000</Text>
                </View>
                <View className="price-row">
                  <Text className="price-item">尾款</Text>
                  <Text className="price-amount">出发当日支付</Text>
                </View>
              </View>
              <View className="price-divider" />
              <View className="refund-rules">
                <Text className="refund-title">退款规则</Text>
                <View className="refund-item">
                  <Text className="refund-icon">✓</Text>
                  <Text className="refund-text">出发前15日取消，退全款</Text>
                </View>
                <View className="refund-item">
                  <Text className="refund-icon">✗</Text>
                  <Text className="refund-text">出发前7日取消，不退费可改期</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* 装备清单 */}
        <View
          className={`info-card card-fade-in-4 ${expandedSection.gear ? 'expanded' : ''}`}
          onClick={() => toggleSection('gear')}
        >
          <View className="card-header">
            <View className="card-icon">🎒</View>
            <View className="card-title-box">
              <Text className="card-title">装备建议</Text>
            </View>
            <Text className="expand-icon">{expandedSection.gear ? '▲' : '▼'}</Text>
          </View>
          <View className="card-divider" />
          {expandedSection.gear && (
            <View className="gear-section">
              <Text className="gear-subtitle">需自备</Text>
              <View className="gear-grid">
                <View className="gear-item">
                  <Text className="gear-icon">👟</Text>
                  <Text className="gear-text">登山鞋</Text>
                </View>
                <View className="gear-item">
                  <Text className="gear-icon">👕</Text>
                  <Text className="gear-text">速干衣</Text>
                </View>
                <View className="gear-item">
                  <Text className="gear-icon">🧥</Text>
                  <Text className="gear-text">抓绒/羽绒</Text>
                </View>
                <View className="gear-item">
                  <Text className="gear-icon">🎿</Text>
                  <Text className="gear-text">冲锋裤</Text>
                </View>
                <View className="gear-item">
                  <Text className="gear-icon">🎒</Text>
                  <Text className="gear-text">背包30L</Text>
                </View>
                <View className="gear-item">
                  <Text className="gear-icon">🧢</Text>
                  <Text className="gear-text">帽子/墨镜</Text>
                </View>
              </View>
              <View className="gear-divider" />
              <Text className="gear-subtitle">可选提供</Text>
              <View className="gear-grid">
                <View className="gear-item provide">
                  <Text className="gear-icon">🧥</Text>
                  <Text className="gear-text">冲锋衣</Text>
                </View>
                <View className="gear-item provide">
                  <Text className="gear-icon">🦯</Text>
                  <Text className="gear-text">登山杖</Text>
                </View>
                <View className="gear-item provide">
                  <Text className="gear-icon">🦶</Text>
                  <Text className="gear-text">冰爪</Text>
                </View>
                <View className="gear-item provide">
                  <Text className="gear-icon">🧦</Text>
                  <Text className="gear-text">雪套</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* FAQ 问答区 */}
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
                        {hotelInfo.map((hotel, hIndex) => (
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

export default YubengSchedulePage
