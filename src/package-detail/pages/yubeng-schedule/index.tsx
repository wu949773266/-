import { Network } from '@/network'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import type { FC } from 'react'
import { YUBENG_IMAGES } from '../../config/images'
import './index.css'

const YubengSchedulePage: FC = () => {
  useShareAppMessage(() => ({
    title: '雨崩徒步摄影4日游 - 山渡户外',
    path: '/package-detail/pages/yubeng-schedule/index'
  }))

  useShareTimeline(() => ({
    title: '雨崩徒步摄影4日游 - 香格里拉秘境',
    query: ''
  }))

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    schedule: true,
    fee: true,
    gear: true,
    hotel: false,
    tips: true
  })
  const [hotelImages, setHotelImages] = useState<string[]>([])

  useEffect(() => {
    const fetchHotelImages = async () => {
      try {
        const res = await Network.request({ url: '/api/hotel/images', method: 'GET' })
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
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const dailySchedule = [
    { day: 'D0', title: '丽江集合', highlights: ['丽江机场接机', '入住丽江酒店'], desc: '出发前一晚买丽江三义国际机场机票，机场接机到酒店入住。酒店离丽江古城和束河古镇车程10分钟左右。' },
    { day: 'D1', title: '丽江 → 雨崩', highlights: ['尼农峡谷徒步12.5KM', '乘坐越野车进村'], desc: '早上7点丽江酒店用完早餐后集合出发 → 12点左右奔子栏用午餐 → 2点左右尼龙徒步起点 → 7-8点到达下雨崩乘坐越野车到上雨崩酒店用餐休息。' },
    { day: 'D2', title: '冰湖线', highlights: ['笑农大本营', '冰湖冲顶'], desc: '8点下楼用餐集合出发冰湖线 → 到达笑农大本营（有泡面炒饭水等补给） → 用完餐冲顶冰湖 - 下撤 → 到达酒店用晚餐休息。往返13KM，用时7-9小时。' },
    { day: 'D3', title: '神瀑线 → 出村', highlights: ['神瀑大本营', '出村徒步'], desc: '8点下楼用餐集合乘坐越野车到下雨崩出发神瀑线 → 到达神瀑大本营 → 休息冲顶神瀑 - 下撤 → 到达下雨崩可在咖啡店内用餐 → 出村 → 尼农徒步起点 → 德钦酒店。神瀑往返11KM，用时5小时。' },
    { day: 'D4', title: '德钦 → 丽江解散', highlights: ['梅里雪山日照金山', '香格里拉独克宗古城'], desc: '根据当季时段起床观梅里雪山日照金山。日照金山结束前往香格里拉独克宗古城，可去世界上最大的转经筒或自由活动，用完午餐返回丽江。' }
  ]

  const tipsList = [
    '徒步日不用携带大件行李，徒步起点和终点是同一地点，仅携带徒步过程中的一些补充能量的零食及饮用水和干餐路餐即可。',
    '如遇人力不可抗因素，如塌方、路阻、车辆故障、当地政府行为等造成行程延误，或不能完成完整线路游玩，领队有权取消行程或调整行程，领队不承担赔偿责任，由此产生的超支费用由游客自理。',
    '注意安全，听从领队安排，遵守团队纪律，集合啦动，不稿离开队伍，违反纪律，后果自负。',
    '迪庆州境内是藏民聚居区，要尊重藏族的宗教信仰和生活习惯，绝对不要与藏族同胞发生冲突，如因个人原因与当地居民发生冲突造成后果的，领队概不负责。'
  ]

  const feeList = [
    '住宿：丽江/雨崩/雨崩/德钦 共4晚',
    '用车：2-4人安排5座SUV/轿车，5-6人安排7座商务车',
    '门票：雨崩景区门票费',
    '领队：2-6人配备一位全职向导领队',
    '保险：50万元保额旅游意外险',
    '拍摄：相机、手机、无人机',
    '接机：丽江三义机场免费接机',
    '礼品：山渡户外俱乐部雨崩定制奖牌一枚',
    '装备：免费提供冲锋衣、登山杖、护目镜（雨雪天免费提供雨衣、冰爪、雪套）'
  ]

  const hotelInfo = [
    { title: '雨崩酒店', note: '（楼层不一样可能会没有顶上玻璃）（独立入住+400/晚）（如没房安排同等酒店住宿）' },
    { title: '德钦酒店', note: '（独立入住+200/晚）' },
    { title: '丽江酒店', note: '（独立入住+200/晚）' }
  ]

  return (
    <ScrollView scrollY className="detail-page">
      {/* 头部 */}
      <View className="page-header">
        <Text className="page-title">雨崩徒步</Text>
        <Text className="page-subtitle">香格里拉秘境 · 四天四晚轻奢小团</Text>
      </View>

      {/* 海报 */}
      <View className="poster-section">
        <Image className="poster-image" mode="widthFix" src={YUBENG_IMAGES.YUBENG_POSTER_1} lazyLoad showMenuByLongpress />
      </View>

      {/* 每日行程 */}
      <View className="section">
        <View className={`section-card ${expanded.schedule ? 'expanded' : ''}`} onClick={() => toggleSection('schedule')}>
          <View className="section-header">
            <Text className="section-icon">📅</Text>
            <Text className="section-title">每日行程</Text>
            <Text className="section-arrow">{expanded.schedule ? '▲' : '▼'}</Text>
          </View>
          {expanded.schedule && (
            <View className="schedule-list">
              {dailySchedule.map((item, index) => (
                <View key={index} className="schedule-item">
                  <View className="schedule-badge">{item.day}</View>
                  <View className="schedule-body">
                    <Text className="schedule-title">{item.title}</Text>
                    <View className="schedule-tags">
                      {item.highlights.map((h, i) => <Text key={i} className="schedule-tag">{h}</Text>)}
                    </View>
                    <Text className="schedule-desc">{item.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* 费用说明 */}
      <View className="section">
        <View className={`section-card ${expanded.fee ? 'expanded' : ''}`} onClick={() => toggleSection('fee')}>
          <View className="section-header">
            <Text className="section-icon">💰</Text>
            <Text className="section-title">费用说明</Text>
            <Text className="section-price">¥3280</Text>
            <Text className="section-arrow">{expanded.fee ? '▲' : '▼'}</Text>
          </View>
          {expanded.fee && (
            <View className="fee-content">
              <View className="fee-list">
                {feeList.map((item, index) => (
                  <View key={index} className="fee-item">
                    <Text className="fee-dot">·</Text>
                    <Text className="fee-text">{item}</Text>
                  </View>
                ))}
              </View>
              <View className="refund-box">
                <Text className="refund-title">退款规则</Text>
                <View className="refund-item">
                  <Text className="refund-ok">✓</Text>
                  <Text className="refund-text">出发前15日取消，退全款</Text>
                </View>
                <View className="refund-item">
                  <Text className="refund-no">✗</Text>
                  <Text className="refund-text">出发前7日取消，不退费可改期</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* 装备建议 */}
      <View className="section">
        <View className={`section-card ${expanded.gear ? 'expanded' : ''}`} onClick={() => toggleSection('gear')}>
          <View className="section-header">
            <Text className="section-icon">🎒</Text>
            <Text className="section-title">装备建议</Text>
            <Text className="section-arrow">{expanded.gear ? '▲' : '▼'}</Text>
          </View>
          {expanded.gear && (
            <View className="gear-content">
              <Text className="gear-label">需自备</Text>
              <View className="gear-grid">
                <View className="gear-item"><Text className="gear-icon">👟</Text><Text className="gear-text">登山鞋</Text></View>
                <View className="gear-item"><Text className="gear-icon">👕</Text><Text className="gear-text">速干衣</Text></View>
                <View className="gear-item"><Text className="gear-icon">🧥</Text><Text className="gear-text">抓绒/羽绒</Text></View>
                <View className="gear-item"><Text className="gear-icon">🎿</Text><Text className="gear-text">冲锋裤</Text></View>
                <View className="gear-item"><Text className="gear-icon">🎒</Text><Text className="gear-text">背包30L</Text></View>
                <View className="gear-item"><Text className="gear-icon">🧢</Text><Text className="gear-text">帽子/墨镜</Text></View>
              </View>
              <Text className="gear-label">免费提供</Text>
              <View className="gear-grid">
                <View className="gear-item"><Text className="gear-icon">🧥</Text><Text className="gear-text">冲锋衣</Text></View>
                <View className="gear-item"><Text className="gear-icon">🦯</Text><Text className="gear-text">登山杖</Text></View>
                <View className="gear-item"><Text className="gear-icon">🦶</Text><Text className="gear-text">冰爪</Text></View>
                <View className="gear-item"><Text className="gear-icon">🧦</Text><Text className="gear-text">雪套</Text></View>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* 住宿环境 */}
      <View className="section">
        <View className={`section-card ${expanded.hotel ? 'expanded' : ''}`} onClick={() => toggleSection('hotel')}>
          <View className="section-header">
            <Text className="section-icon">🏨</Text>
            <Text className="section-title">住宿环境</Text>
            <Text className="section-arrow">{expanded.hotel ? '▲' : '▼'}</Text>
          </View>
          {expanded.hotel && (
            <View className="hotel-content">
              {hotelInfo.map((item, index) => (
                <View key={index} className="hotel-item">
                  <Text className="hotel-title">{item.title}</Text>
                  <Text className="hotel-note">{item.note}</Text>
                  <View className="hotel-images">
                    {hotelImages.slice(index * 3, index * 3 + 3).map((img, i) => (
                      <Image key={i} className="hotel-image" mode="widthFix" src={img} lazyLoad showMenuByLongpress />
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* 温馨提示 */}
      <View className="section">
        <View className={`section-card ${expanded.tips ? 'expanded' : ''}`} onClick={() => toggleSection('tips')}>
          <View className="section-header">
            <Text className="section-icon">📋</Text>
            <Text className="section-title">温馨提示</Text>
            <Text className="section-arrow">{expanded.tips ? '▲' : '▼'}</Text>
          </View>
          {expanded.tips && (
            <View className="tips-content">
              {tipsList.map((item, index) => (
                <View key={index} className="tips-item">
                  <Text className="tips-num">{index + 1}</Text>
                  <Text className="tips-text">{item}</Text>
                </View>
              ))}
            </View>
          )}
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
