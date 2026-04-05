export default typeof definePageConfig === 'function'
  ? definePageConfig({ 
      navigationBarTitleText: '招贤纳士',
      navigationBarBackgroundColor: '#f8faf8',
      enableShareAppMessage: true,
      enableShareTimeline: true
    })
  : { 
      navigationBarTitleText: '招贤纳士',
      navigationBarBackgroundColor: '#f8faf8',
      enableShareAppMessage: true,
      enableShareTimeline: true
    }
