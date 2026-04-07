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

  const [showHotel, setShowHotel] = useState(false)
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

  const posterImages = [
    YUBENG_IMAGES.YUBENG_POSTER_1,
    YUBENG_IMAGES.YUBENG_POSTER_2,
    YUBENG_IMAGES.YUBENG_POSTER_3,
    YUBENG_IMAGES.YUBENG_POSTER_4
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
          </View>
        ))}
      </View>

      {/* 住宿环境按钮 */}
      <View className="hotel-section">
        <View 
          className="hotel-btn"
          onClick={() => setShowHotel(!showHotel)}
        >
          <Text className="hotel-btn-text">{showHotel ? '收起住宿环境' : '查看住宿环境'}</Text>
        </View>

        {/* 住宿环境内容 */}
        {showHotel && (
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
