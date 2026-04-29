import { View, Text, ScrollView } from '@tarojs/components'
import './index.css'

const VALUES = [
  { title: '敬畏自然', desc: '每一次出发，都是对山的朝圣' },
  { title: '专业护航', desc: '持证领队 + 完善安全体系' },
  { title: '深度体验', desc: '不走马观花，只做沉浸式徒步' },
  { title: '品质服务', desc: '精选住宿与餐饮，山野不将就' }
]

const TEAM = [
  { name: '阿旺', role: '高山领队', exp: '12年高海拔经验' },
  { name: '小舟', role: '户外摄影师', exp: '国家地理签约' },
  { name: '卓玛', role: '后勤管家', exp: '8年营地管理' }
]

export default function About() {
  return (
    <ScrollView scrollY className="about-page">
      {/* 头部 */}
      <View className="about-hero">
        <Text className="about-eyebrow">ABOUT SHANDU</Text>
        <Text className="about-title">关于山渡</Text>
        <Text className="about-desc">
          山渡户外扎根滇西北，专注梅里雪山、虎跳峡、南极洛等经典徒步线路。
          我们相信，真正的户外不是征服，而是被山接纳。
        </Text>
      </View>

      {/* 价值观 */}
      <View className="section">
        <View className="section-header">
          <Text className="section-eyebrow">OUR VALUES</Text>
          <Text className="section-title">山渡理念</Text>
        </View>
        <View className="value-list">
          {VALUES.map((v, i) => (
            <View key={i} className="value-item">
              <Text className="value-num">{String(i + 1).padStart(2, '0')}</Text>
              <View className="value-text">
                <Text className="value-title">{v.title}</Text>
                <Text className="value-desc">{v.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 团队 */}
      <View className="section section-dark">
        <View className="section-header">
          <Text className="section-eyebrow light">OUR TEAM</Text>
          <Text className="section-title light">核心团队</Text>
        </View>
        <View className="team-grid">
          {TEAM.map((t) => (
            <View key={t.name} className="team-item">
              <Text className="team-name">{t.name}</Text>
              <Text className="team-role">{t.role}</Text>
              <Text className="team-exp">{t.exp}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 联系 */}
      <View className="contact-banner">
        <Text className="contact-title">与我们同行</Text>
        <Text className="contact-desc">每一次出发，都是与山的约定</Text>
      </View>

      <View className="footer">
        <Text className="footer-text">山渡户外 · 走山渡心</Text>
        <Text className="footer-sub">滇西北高端户外徒步品牌</Text>
      </View>
    </ScrollView>
  )
}
