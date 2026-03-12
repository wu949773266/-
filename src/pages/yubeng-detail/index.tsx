import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import type { FC } from 'react'
import './index.css'

const YubengDetailPage: FC = () => {
  const posterImages = [
    'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260312004502.jpg&nonce=14dec248-9820-48d5-95e9-8f2fac1a9c4e&project_id=7616065616637886464&sign=4ba5f8f04852d006c59e8bfaa72788158c542097bea82fc20b45475b9b5e565b',
    'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260312004510.jpg&nonce=e8f9c1dc-0c87-43ad-9d9f-f60e066e9a57&project_id=7616065616637886464&sign=a0f7dc5fb33386659850edcb9d3621c4d593f4dbebd03933ec50853100dad89c',
    'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260312004514.jpg&nonce=83b86d5e-fdac-44c5-9a69-838fb36e5fe9&project_id=7616065616637886464&sign=42f70dcf5d5f285583dbab312af5a1274664194326ba4d540e3bb068cf1dc5c7',
    'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260312004518.jpg&nonce=86b88c98-7e58-47d3-8e62-e5a005867848&project_id=7616065616637886464&sign=a5f87a3d5acda7cad46ab6a702f391c26f5cf5da53e6e40eff20d0f4c3877347'
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
