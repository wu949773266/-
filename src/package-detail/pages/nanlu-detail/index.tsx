import { View, Text, Image, Button } from '@tarojs/components'
import Taro, { useShareAppMessage } from '@tarojs/taro'
import { IMAGE_CONFIG } from '@/config/images'
import './index.css'

const NanluDetailPage = () => {
  // 配置微信分享功能
  useShareAppMessage(() => {
    return {
      title: '南糯山徒步 - 山渡户外',
      path: '/pages/package-detail/pages/nanlu-detail/index?route=nanlu',
      imageUrl: IMAGE_CONFIG.NANLU_IMAGE
    }
  })

  return (
    <View className="nanlu-detail-page">
      <View className="content-container">
        {/* 分享按钮 */}
        <Button className="share-button" openType="share">
          <Text className="share-icon">📤</Text>
        </Button>

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
            src={IMAGE_CONFIG.NANLU_IMAGE}
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
            onClick={() => Taro.navigateBack()}
          >
            <Text className="back-button-text">← 返回线路列表</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default NanluDetailPage
