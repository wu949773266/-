export default typeof definePageConfig === 'function'
  ? definePageConfig({ 
      navigationBarTitleText: '关于我们',
      enableShareAppMessage: true
    })
  : { 
      navigationBarTitleText: '关于我们',
      enableShareAppMessage: true
    }
