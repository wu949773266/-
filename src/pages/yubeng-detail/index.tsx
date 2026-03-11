import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import type { FC } from 'react'
import './index.css'

const YubengDetailPage: FC = () => {
  const posterImages = [
    'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260312004502.jpg.jpg%3B&nonce=2ae2b080-ae4a-4c9c-9059-65a705bf9acc&project_id=7616028140170690575&sign=aefdb8da361df1e3161baeffd4bc3fd28db6c8ed87d7b5e258fb96143918925c',
    'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260312004510.jpg.jpg%3B&nonce=feaf8b64-1309-487d-85e4-0d68d2d22761&project_id=7616028140170690575&sign=1d23f4bc1980eb68760530120b2583bcacc89fe5719e9cb21568a4a857b955e8',
    'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260312004514.jpg.jpg%3B&nonce=bbb7826a-3771-4d8d-b7cd-1cbdd6202bb6&project_id=7616028140170690575&sign=ff102935318e49d8128c9813b72f656b8554caf9d52163c6006046dc2e5aded1',
    'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260312004518.jpg.jpg%3B&nonce=8c4bed7c-e13d-4ec3-97ab-91e4956eaf17&project_id=7616028140170690575&sign=abf9c0d318324fd3c5cf90ec79fad5128778d63815e97908bd318c2e5e84558f'
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
