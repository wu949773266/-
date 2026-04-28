const Taro = require('@tarojs/taro');

Page({
  onComplete(event) {
    const { typeCode, result, score } = event.detail;
    Taro.setStorageSync('outdoorMbtiResult', {
      typeCode,
      result,
      score,
      createdAt: Date.now()
    });
  },

  onShareAppMessage() {
    return {
      title: '测测你的户外徒步人格',
      path: '/pages/outdoor-mbti/outdoor-mbti'
    };
  }
});
