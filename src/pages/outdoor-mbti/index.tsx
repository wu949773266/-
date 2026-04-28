import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
// @ts-ignore
const OutdoorMbti = require('../../components/outdoor-mbti/outdoor-mbti').default
import './index.css'

const OutdoorMbtiPage: React.FC = () => {
  const handleComplete = (event: any) => {
    const { typeCode, result, score } = event.detail
    Taro.setStorageSync('outdoorMbtiResult', {
      typeCode,
      result,
      score,
      createdAt: Date.now()
    })
  }

  return (
    <View className="outdoor-mbti-page">
      <OutdoorMbti onComplete={handleComplete} />
    </View>
  )
}

export default OutdoorMbtiPage
