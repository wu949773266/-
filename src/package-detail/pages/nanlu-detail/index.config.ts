export default typeof definePageConfig === 'function'
  ? definePageConfig({ 
      navigationBarTitleText: '南极洛',
      enableShareAppMessage: true
    })
  : { 
      navigationBarTitleText: '南极洛',
      enableShareAppMessage: true
    }
