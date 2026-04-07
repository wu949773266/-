import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import { useState } from 'react'
import type { FC } from 'react'
import { YUBENG_IMAGES } from '../../config/images'
import './index.css'

// 住宿环境图片（来自 TOS 对象存储）
const HOTEL_IMAGES = [
  'https://coze-coding-project.tos.coze.site/coze_storage_7616074772820262912/hotel/yubeng-1_ce2f7647.jpg?sign=1778178617-382f625685-0-89f3a9d824ab685bf000ea1a907444eb04e4a49e8a8365428a2209b7bc4bb07e',
  'https://coze-coding-project.tos.coze.site/coze_storage_7616074772820262912/hotel/yubeng-2_b05f149a.jpg?sign=1778178617-eed4933e52-0-3c0173d194927c383de045deadfe82ea8cbdd0a6c3eba7e70113fcfba21982a7',
  'https://coze-coding-project.tos.coze.site/coze_storage_7616074772820262912/hotel/yubeng-3_f64706a7.jpg?sign=1778178618-ffa3ece8fd-0-fec6bc46f0203c832700e7e329ab08b780fc2f00e340a157c7a7e45d73505a3b',
  'https://coze-coding-project.tos.coze.site/coze_storage_7616074772820262912/hotel/yubeng-4_b55fa8b6.jpg?sign=1778178618-7afadb98d7-0-daf325aefdbbb46d5d83f3a5c3fe967592e9653beb290055320b3e6763b63a2d',
  'https://coze-coding-project.tos.coze.site/coze_storage_7616074772820262912/hotel/yubeng-5_265bf4a3.jpg?sign=1778178618-8fab67d214-0-ab255910912d15cafc47fd6393229fc6b3c9d4c65921f42f410e0698972cac0d',
  'https://coze-coding-project.tos.coze.site/coze_storage_7616074772820262912/hotel/yubeng-6_689981cb.jpg?sign=1778178618-4b3a09aba9-0-cc47e7ebf7c1be7182aaa9a0509e577323bcdb60e60300452efedcb4124760d8',
  'https://coze-coding-project.tos.coze.site/coze_storage_7616074772820262912/hotel/yubeng-7_572cc2d8.jpg?sign=1778178618-ae735d6552-0-7e00df4faa957f9eef86a239c76a3ec529f53313c0cf682054aba318ba5645ab',
  'https://coze-coding-project.tos.coze.site/coze_storage_7616074772820262912/hotel/yubeng-8_43234894.jpg?sign=1778178619-1d1a261063-0-f96cceac61bd6b4d800dd707f14ff282b82d7d1376b68d42afc5eb6c119ca4d5',
  'https://coze-coding-project.tos.coze.site/coze_storage_7616074772820262912/hotel/yubeng-9_03c2c983.jpg?sign=1778178619-ba2764b412-0-b10b03b1c894b6e421db6a28d82ad31b2d4c0638370a8e141513f5dd46694521',
]

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
                  {HOTEL_IMAGES.slice(hIndex * 3, hIndex * 3 + 3).map((img, i) => (
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
