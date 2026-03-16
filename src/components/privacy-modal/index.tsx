import { View, Text, Button } from '@tarojs/components'
import type { FC } from 'react'
import './index.css'

interface PrivacyModalProps {
  visible: boolean
  onAgree: () => void
  onDisagree: () => void
}

const PrivacyModal: FC<PrivacyModalProps> = ({ visible, onAgree, onDisagree }) => {
  if (!visible) return null

  return (
    <View className="privacy-mask">
      <View className="privacy-modal">
        <View className="privacy-header">
          <Text className="privacy-title">用户隐私保护提示</Text>
        </View>
        <View className="privacy-content">
          <Text className="privacy-text">
            感谢您使用山渡户外小程序。为了更好地保障您的合法权益，请您在使用前仔细阅读并充分理解
            <Text className="privacy-link">《用户隐私协议》</Text>。
          </Text>
          <Text className="privacy-text">
            我们将严格遵守相关法律法规，保护您的个人信息安全。
          </Text>
        </View>
        <View className="privacy-buttons">
          <Button className="privacy-btn reject-btn" onClick={onDisagree}>
            拒绝
          </Button>
          <Button className="privacy-btn agree-btn" onClick={onAgree}>
            同意
          </Button>
        </View>
      </View>
    </View>
  )
}

export default PrivacyModal
