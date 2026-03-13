import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import type { FC } from 'react'
import { IMAGE_CONFIG } from '@/config/images'
import './index.css'

const YubengDetailPage: FC = () => {
  const posterImages = [
    IMAGE_CONFIG.YUBENG_POSTER_1,
    IMAGE_CONFIG.YUBENG_POSTER_2,
    IMAGE_CONFIG.YUBENG_POSTER_3,
    IMAGE_CONFIG.YUBENG_POSTER_4
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
