import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import type { FC } from 'react'
import { YUBENG_IMAGES } from '../../config/images'
import './index.css'

const YubengDetailPage: FC = () => {
  // 配置分享给朋友
  useShareAppMessage(() => {
    return {
      title: '雨崩徒步 - 山渡户外',
      path: '/package-detail/pages/yubeng-detail/index',
      imageUrl: YUBENG_IMAGES.YUBENG_POSTER_1
    }
  })

  // 配置分享到朋友圈
  useShareTimeline(() => {
    return {
      title: '雨崩徒步 - 香格里拉秘境',
      query: '',
      imageUrl: YUBENG_IMAGES.YUBENG_POSTER_1
    }
  })

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

export default YubengDetailPage
