export default typeof definePageConfig === 'function'
  ? definePageConfig({ 
      navigationBarTitleText: '关于我们',
      enableShareAppMessage: true,
      enableShareTimeline: true
    })
  : { 
      navigationBarTitleText: '关于我们',
      enableShareAppMessage: true,
      enableShareTimeline: true
    }
