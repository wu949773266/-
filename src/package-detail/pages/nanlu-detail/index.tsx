import { View, Text, Image } from '@tarojs/components'
import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import { NANLU_IMAGE } from '../../config/nanlu-image'
import './index.css'

const NanluDetailPage = () => {
  // 配置分享给朋友（自动截取当前页面）
  useShareAppMessage(() => {
    return {
      title: '南极洛徒步 - 山渡户外',
      path: '/package-detail/pages/nanlu-detail/index'
    }
  })

  // 配置分享到朋友圈（自动截取当前页面）
  useShareTimeline(() => {
    return {
      title: '南极洛徒步 - 云南最后的秘境',
      query: ''
    }
  })

  return (
    <View className="nanlu-detail-page">
      <View className="content-container">
        {/* 敬请期待提示 */}
        <View className="coming-soon-container">
          <View className="coming-soon-icon">🎉</View>
          <Text className="coming-soon-title">敬请期待</Text>
        </View>

        {/* 预计五月与大家见面 */}
        <View className="time-notice">
          <Text className="time-notice-text">预计五月与大家见面</Text>
        </View>

        {/* 底部图片 */}
        <View className="image-container">
          <Image
            className="nanlu-image"
            mode="widthFix"
            src={NANLU_IMAGE}
          />
        </View>

        {/* 咨询提示 */}
        <View className="consult-notice">
          <Text className="consult-text">行程可以预约</Text>
          <Text className="consult-text">详情请咨询我们</Text>
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
      </View>
    </View>
  )
}

export default NanluDetailPage
