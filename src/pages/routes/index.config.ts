export default typeof definePageConfig === 'function'
  ? definePageConfig({ 
      navigationBarTitleText: '线路',
      enableShareAppMessage: true
    })
  : { 
      navigationBarTitleText: '线路',
      enableShareAppMessage: true
    }
