export default typeof definePageConfig === 'function'
  ? definePageConfig({ 
      navigationBarTitleText: '雨崩徒步详情',
      enableShareAppMessage: true,
      enableShareTimeline: true
    })
  : { 
      navigationBarTitleText: '雨崩徒步详情',
      enableShareAppMessage: true,
      enableShareTimeline: true
    }
