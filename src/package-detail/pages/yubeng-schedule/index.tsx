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
  isHtml?: boolean
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

  // 每日行程文本
  const scheduleText = `D0：丽江集合
丽江机场接机 → 入住丽江酒店
酒店离丽江古城和束河古镇车程10分钟左右

D1：丽江 → 尼农村 → 尼农峡谷 → 雨崩村
早上7点丽江酒店用完早餐后集合出发
12点左右奔子栏用午餐 → 2点左右尼龙徒步起点
7-8点到达下雨崩乘坐越野车到上雨崩酒店用餐休息
尼龙线徒步12.5KM，用时5H左右

D2：雨崩酒店 → 笑农大本营 → 冰湖 → 雨崩村
8点下楼用餐集合出发冰湖线
到达笑农大本营（有泡面炒饭水等补给）
用完餐冲顶冰湖 - 下撤 → 到达酒店用晚餐休息
往返13KM，用时7-9小时
可乘骡子455/往返（体重超85kg需两匹骡子）

D3：雨崩 → 神瀑线 → 出村 → 德钦
8点下楼用餐集合乘坐越野车到下雨崩出发神瀑线
到达神瀑大本营（有泡面水等补给）
休息冲顶神瀑 - 下撤 → 到达下雨崩咖啡店内用餐
出村 → 尼农徒步起点 → 德钦酒店
神瀑往返11KM，用时5小时；出村徒步约3小时

D4:德钦 → 飞来寺观景台 → 香格里拉独克宗古城 → 丽江解散
根据当季时段起床观梅里雪山日照金山
日照金山结束前往香格里拉独克宗古城
可去世界上最大的转经筒或自由活动
用完午餐返回丽江，途径纳帕海观景平台等`

  // 装备文本
  const gearText = `需自备：
· 登山鞋（中帮防水最佳）
· 速干衣、抓绒衣、羽绒内胆
· 冲锋裤、背包30升左右
· 帽子、护目镜、防晒用品

可选提供：
· 冲锋衣
· 登山杖
· 冰爪、雪套`

  // 费用文本
  const priceText = `总费用：人民币3280元

付款方式：
· 首付款定金1000元
· 尾款需在出发当日支付完成

退款规则：
· 出发前15日取消，退全款
· 出发前7日取消，不退费可改期`

  const faqs: FAQItem[] = [
    {
      question: '什么时候适合去雨崩？',
      answer: '',
      icon: '📅',
      image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616074772820262912/yubeng/season_19cb5353.jpg?sign=1778179241-03f48782c1-0-8383bf5627bc5f01882ee3829e2c2f6124170a92312a91a7ad9bd7142c19e335'
    },
    {
      question: '每日行程怎么安排？',
      answer: scheduleText,
      icon: '📅'
    },
    {
      question: '费用怎么算？',
      answer: priceText,
      icon: '💰'
    },
    {
      question: '需要准备什么装备？',
      answer: gearText,
      icon: '🎒'
    },
    {
      question: '住宿环境',
      answer: '',
      icon: '🏨'
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
                    {/* 住宿环境内容 */}
                    {index === 4 && (
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
