export default typeof definePageConfig === 'function'
  ? definePageConfig({ 
      navigationBarTitleText: '联系我们',
      enableShareAppMessage: true,
      enableShareTimeline: true
    })
  : { 
      navigationBarTitleText: '联系我们',
      enableShareAppMessage: true,
      enableShareTimeline: true
    }
