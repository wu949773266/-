import { View, Text, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Phone, Mail, MapPin } from 'lucide-react-taro'
import './index.css'

const CustomPage = () => {
  // 拨打电话
  const handleCall = () => {
    Taro.makePhoneCall({
      phoneNumber: '13800138000', // 替换为实际电话号码
    })
  }

  return (
    <View className="custom-page">
      {/* 头部图片 */}
      <View className="header-image">
        <Image
          src="https://in-1410277589.cos.ap-chongqing.myqcloud.com/images/%E5%8D%97%E6%9E%81%E6%B4%9B.jpg"
          mode="aspectFill"
          className="image"
        />
        <View className="header-overlay" />
        <Text className="header-title">私人订制</Text>
      </View>

      {/* 主要内容 */}
      <View className="content">
        <View className="intro-section">
          <Text className="intro-text">
            每一次旅行都是一场心灵的修行，每一段旅程都值得被精心雕琢。我们深信，真正的奢华不在于繁复的铺陈，而在于为您量身定制的独一无二。
          </Text>

          <Text className="intro-text intro-text-space">
            无论您向往高山峡谷的壮阔，还是渴望隐世秘境的静谧，我们将以专业的态度和贴心的服务，为您打造专属的户外体验。
          </Text>

          <Text className="intro-text intro-text-highlight">
            联系我们，开启只属于您的非凡旅程。
          </Text>
        </View>

        {/* 服务特色 */}
        <View className="features-section">
          <View className="feature-item">
            <View className="feature-icon">🎯</View>
            <Text className="feature-title">量身定制</Text>
            <Text className="feature-desc">根据您的需求，设计专属行程</Text>
          </View>

          <View className="feature-item">
            <View className="feature-icon">🏔️</View>
            <Text className="feature-title">专业向导</Text>
            <Text className="feature-desc">经验丰富的户外领队全程陪伴</Text>
          </View>

          <View className="feature-item">
            <View className="feature-icon">⭐</View>
            <Text className="feature-title">品质保障</Text>
            <Text className="feature-desc">精选路线，贴心服务，安全无忧</Text>
          </View>
        </View>

        {/* 联系方式 */}
        <View className="contact-section">
          <Text className="section-title">联系我们</Text>

          <View className="contact-item" onClick={handleCall}>
            <Phone size={20} color="#2f6f4f" />
            <Text className="contact-text">13800138000</Text>
          </View>

          <View className="contact-item">
            <Mail size={20} color="#2f6f4f" />
            <Text className="contact-text">contact@shandu.com</Text>
          </View>

          <View className="contact-item">
            <MapPin size={20} color="#2f6f4f" />
            <Text className="contact-text">云南省丽江市古城区</Text>
          </View>
        </View>

        {/* 联系按钮 */}
        <View className="button-section">
          <Button className="contact-button" onClick={handleCall}>
            立即咨询
          </Button>
        </View>
      </View>
    </View>
  )
}

export default CustomPage
