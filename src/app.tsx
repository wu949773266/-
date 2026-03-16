import { PropsWithChildren, useState, useCallback, useEffect } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import PrivacyModal from '@/components/privacy-modal'
import '@/app.css'
import { Preset } from './presets'

// 声明全局类型
declare global {
  interface Window {
    resolvePrivacyAuthorization?: (params: { event: 'agree' | 'disagree' }) => void
  }
}

const App = ({ children }: PropsWithChildren) => {
  const [showPrivacy, setShowPrivacy] = useState(false)

  // 处理隐私授权
  useEffect(() => {
    // 检查是否需要隐私授权
    Taro.getPrivacySetting?.({
      success: (res) => {
        console.log('隐私设置:', res)
        if (res.needAuthorization) {
          // 需要授权，但等待用户触发需要隐私接口时才弹出
          console.log('需要隐私授权')
        }
      },
      fail: (err) => {
        console.log('获取隐私设置失败:', err)
      }
    })

    // 监听需要隐私授权的事件
    if (Taro.onNeedPrivacyAuthorization) {
      Taro.onNeedPrivacyAuthorization((resolve) => {
        console.log('触发隐私授权')
        // 保存 resolve 函数，用户点击同意/拒绝后调用
        window.resolvePrivacyAuthorization = resolve
        setShowPrivacy(true)
      })
    }
  }, [])

  // 用户同意隐私协议
  const handleAgree = useCallback(() => {
    setShowPrivacy(false)
    if (window.resolvePrivacyAuthorization) {
      window.resolvePrivacyAuthorization({ event: 'agree' })
      window.resolvePrivacyAuthorization = undefined
    }
  }, [])

  // 用户拒绝隐私协议
  const handleDisagree = useCallback(() => {
    setShowPrivacy(false)
    if (window.resolvePrivacyAuthorization) {
      window.resolvePrivacyAuthorization({ event: 'disagree' })
      window.resolvePrivacyAuthorization = undefined
    }
    Taro.showToast({
      title: '您拒绝了隐私协议，部分功能可能无法使用',
      icon: 'none'
    })
  }, [])

  return (
    <Preset>
      <View style={{ height: '100%' }}>
        {children}
        <PrivacyModal
          visible={showPrivacy}
          onAgree={handleAgree}
          onDisagree={handleDisagree}
        />
      </View>
    </Preset>
  )
}

export default App
