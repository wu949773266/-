import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import { useState } from 'react'
import type { FC } from 'react'
import { YUBENG_IMAGES } from '../../config/images'
import './index.css'

// 住宿环境图片
const HOTEL_IMAGES = [
  'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260408021401_340.jpg&nonce=b3ee52aa-9d25-45c6-811c-449bb02edec9&project_id=7616065616637886464&sign=cec66a812168a8c0bf4ec0a44397a8110457c1f8f38171a10c73237fd47f0d7c',
  'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260408021401_342.jpg&nonce=7d92fd1a-44bf-4b96-b03b-6c391ea96262&project_id=7616065616637886464&sign=fc1e2e42dc62e233aecd130d18da0dd4fee55b1a1fa69d8ed0b7c19325335637',
  'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260408021401_344.jpg&nonce=10b6e7e9-8125-4dc1-b5d5-1bcf510880c1&project_id=7616065616637886464&sign=e7a4f5989a3bba32c4b45902e50d99b9e79322895c820232296197293680194c',
  'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260408021633_401.jpg&nonce=5681bd62-f39b-48d7-a152-3d22b1d67f12&project_id=7616065616637886464&sign=917ae30c32dfdf2f27c2fdb8040e60790cd3d3f24d013dffb96bebc9442702ff',
  'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260408021723_414.jpg&nonce=fcf4a5f1-6784-4980-ab8d-98f71b15fd24&project_id=7616065616637886464&sign=cb6a3db321c0c6337816f97332b288d3ea7fa1305221537717e4445f09e2af7f',
  'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260408021633_395.jpg&nonce=53268dd9-1c4b-4e13-9273-c38cfdcf24d7&project_id=7616065616637886464&sign=9af2204bac1898e5fa9ed24ecd99b83a5b6b04e0f6f26b471cb01150d15cecdc',
  'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260408021401_350.jpg&nonce=c7c875f4-1444-4c09-a84e-093467680f64&project_id=7616065616637886464&sign=a21600c62302d737701a011752eebb2c86bb63a6398d7e4f52df5d5a58952335',
  'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260408021401_352.jpg&nonce=d7025031-3570-4b6b-a93f-355b670bfe33&project_id=7616065616637886464&sign=33659910ee75926349550becdfff465b83705efbd2e4ecbbd7dd5ae3a18632c2',
  'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260408021401_354.jpg&nonce=53861942-5a8c-4f1f-b5a9-e0e80339ab93&project_id=7616065616637886464&sign=350d053ea214bb800802725433e5ae1fa43d8019a09f2ce54209e0230686b428',
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
