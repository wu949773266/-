import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import { useState } from 'react'
import type { FC } from 'react'
import { IMAGE_CONFIG } from '@/config/images'
import './index.css'

interface CheckPoint {
  name: string
  icon: string
  description: string
}

interface FAQItem {
  question: string
  answer: string
  icon: string
}

const HutiaoxiaDetailPage: FC = () => {
  // 配置分享给朋友
  useShareAppMessage(() => {
    return {
      title: '虎跳峡徒步 - 山渡户外',
      path: '/package-detail/pages/hutiaoxia-detail/index',
      imageUrl: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=500&q=80'
    }
  })

  // 配置分享到朋友圈
  useShareTimeline(() => {
    return {
      title: '虎跳峡徒步 - 人生照片打卡',
      query: '',
      imageUrl: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=500&q=80'
    }
  })
  const [expandedSection, setExpandedSection] = useState<Record<string, boolean>>({
    checkpoint: true,
    schedule: true,
    price: true
  })
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index)
  }

  const checkPoints: CheckPoint[] = [
    {
      name: '虎跳峡江边',
      icon: '🌊',
      description: '人生照片打卡点'
    },
    {
      name: 'Half Way中途客栈',
      icon: '🏨',
      description: '爽死你阳台'
    },
    {
      name: '龙洞瀑布',
      icon: '💧',
      description: '虎跳峡最美高路'
    }
  ]

  const faqs: FAQItem[] = [
    {
      question: '一日虎跳峡能拍多少张照片？',
      answer: '一天下来能拍百来张照片📸，富士相机自带滤镜，还可以自己修修脸～照片全给！',
      icon: '📸'
    },
    {
      question: '需要准备什么装备？',
      answer: '我们可以免费提供冲锋衣、登山杖（自带最佳）🧥，你自己只需要准备一双运动鞋或徒步鞋（中帮最佳）👟，背包可背可不背🎒。',
      icon: '🧥'
    },
    {
      question: '新手小白可以参加吗？',
      answer: '完全没问题！我们带的人里，十个有八个都是第一次徒步的小白～虎跳峡很简单，放心冲！💪',
      icon: '💪'
    },
    {
      question: '大概要走多久？',
      answer: '纯徒步时间3小时左右🚶‍♂️，早上8-9点出发，返程到达丽江大概是傍晚6-7点🌆。',
      icon: '⏱️'
    },
    {
      question: '可能会产生的消费？',
      answer: '吃饭会带大家吃正餐，费用AA🍚，其他没有什么额外消费啦～',
      icon: '💰'
    },
    {
      question: '我们自己开车，可以只拍江边照片？',
      answer: '不太行哦～我们是全程服务小团（2-6人）的，所以暂时不接行程以外的拍摄，还请谅解！🙏',
      icon: '🚗'
    },
    {
      question: '什么时候最适合去？',
      answer: '虎跳峡5-10月是汛期，江水黄、波涛汹涌🌊，山也绿绿的🌿；11月到次年5月江水是绿的，水流虽然小一些，但角度找好也很壮观！山色偏黄🏜️。主要还是看你喜欢哪种风格。',
      icon: '🌊'
    },
    {
      question: '需要提前多久预约？',
      answer: '您这边时间确认就可以预约了，因为咱们是最多六人小团～',
      icon: '📅'
    },
    {
      question: '江边还能去吗？',
      answer: '江边可以去噢～',
      icon: '🌊'
    }
  ]

  return (
    <ScrollView scrollY className="detail-page">
      {/* 头部展示区 */}
      <View className="page-header-section">
        <Image
          className="header-bg"
          mode="aspectFill"
          src={IMAGE_CONFIG.HUTIAOXIA_DETAIL_BG}
        />
        <View className="header-overlay" />
        <View className="header-content">
          <View className="tag">
            <Text className="tag-text">一日精华版</Text>
          </View>
          <Text className="page-title">虎跳峡人生照片徒步</Text>
          <View className="tag-container">
            <View className="tag-small">
              <Text className="tag-small-text">2-6人小团</Text>
            </View>
            <View className="tag-small">
              <Text className="tag-small-text">全程拍摄</Text>
            </View>
            <View className="tag-small">
              <Text className="tag-small-text">难度 ⭐</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 主内容区域 */}
      <View className="content-section">
        {/* 打卡点 */}
        <View
          className={`info-card card-fade-in-1 ${expandedSection.checkpoint ? 'expanded' : ''}`}
          onClick={() => toggleSection('checkpoint')}
        >
          <View className="card-header">
            <View className="card-icon">📈</View>
            <View className="card-title-box">
              <Text className="card-title">打卡点</Text>
              <Text className="card-subtitle">全程7-8km</Text>
            </View>
            <Text className="expand-icon">{expandedSection.checkpoint ? '▲' : '▼'}</Text>
          </View>

          <View className="card-divider" />

          {expandedSection.checkpoint && (
            <View className="check-points">
              {checkPoints.map((point, index) => (
                <View key={index} className="check-point-item">
                  <View className="check-point-icon">{point.icon}</View>
                  <View className="check-point-info">
                    <Text className="check-point-name">{point.name}</Text>
                    <Text className="check-point-desc">{point.description}</Text>
                  </View>
                  <Text className="arrow">→</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* 行程安排 */}
        <View
          className={`info-card card-fade-in-2 ${expandedSection.schedule ? 'expanded' : ''}`}
          onClick={() => toggleSection('schedule')}
        >
          <View className="card-header">
            <View className="card-icon">📅</View>
            <View className="card-title-box">
              <Text className="card-title">行程安排</Text>
            </View>
            <Text className="expand-icon">{expandedSection.schedule ? '▲' : '▼'}</Text>
          </View>

          <View className="card-divider" />

          {expandedSection.schedule && (
            <View className="schedule-timeline">
              <View className="timeline-item">
                <View className="timeline-dot">9:00</View>
                <Text className="timeline-text">丽江出发</Text>
              </View>
              <View className="timeline-item">
                <View className="timeline-dot">🚗</View>
                <Text className="timeline-text">开车到Half Way中途客栈（爽死你阳台）</Text>
              </View>
              <View className="timeline-item">
                <View className="timeline-dot">🚶</View>
                <Text className="timeline-text">徒步虎跳峡最美高路至龙洞瀑布</Text>
              </View>
              <View className="timeline-item">
                <View className="timeline-dot">🚗</View>
                <Text className="timeline-text">开车到中虎跳峡徒步至江边打卡人生照片</Text>
              </View>
              <View className="timeline-item">
                <View className="timeline-dot">🚗</View>
                <Text className="timeline-text">开车返回丽江市区解散</Text>
              </View>
            </View>
          )}
        </View>

        {/* 费用信息 */}
        <View
          className={`info-card card-fade-in-3 ${expandedSection.price ? 'expanded' : ''}`}
          onClick={() => toggleSection('price')}
        >
          <View className="card-header">
            <View className="card-icon">💰</View>
            <View className="card-title-box">
              <Text className="card-title">费用说明</Text>
              <Text className="card-price">680/人</Text>
            </View>
            <Text className="expand-icon">{expandedSection.price ? '▲' : '▼'}</Text>
          </View>

          <View className="card-divider" />

          {expandedSection.price && (
            <View className="price-details">
              <View className="price-includes">
                <Text className="price-label">费用包含：</Text>
                <View className="include-list">
                  <Text className="include-item">• 虎跳峡往返丽江交通（5座或7座车）</Text>
                  <Text className="include-item">• 50w保险</Text>
                  <Text className="include-item">• 领队费</Text>
                  <Text className="include-item">• 全程拍摄费</Text>
                </View>
              </View>
              <View className="price-note">
                <Text className="note-text">
                  💡 结束如果不和我们不返回丽江，要去香格里拉帮约车+80/位
                </Text>
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
                className={`faq-card card-fade-in-${(index % 5) + 1} ${expandedFAQ === index ? 'expanded' : ''}`}
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
                    <View className="faq-divider" />
                    <View className="faq-answer-box">
                      <Text className="faq-answer">{faq.answer}</Text>
                    </View>
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
          onClick={() => Taro.navigateBack()}
        >
          <Text className="back-button-text">← 返回线路列表</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default HutiaoxiaDetailPage
