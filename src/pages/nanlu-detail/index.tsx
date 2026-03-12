import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'

const NanluDetailPage = () => {
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
            src="https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2FIMG_8134.jpg&nonce=88649429-fcd8-40ed-8af3-a3f455db65b3&project_id=7616065616637886464&sign=ea6000fa120c48095e662a844881d5f05660d7f135d8fc61b7b9255411efd0d6"
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
