export default typeof definePageConfig === 'function'
  ? definePageConfig({ 
      navigationBarTitleText: '联系我们',
      enableShareAppMessage: true
    })
  : { 
      navigationBarTitleText: '联系我们',
      enableShareAppMessage: true
    }
