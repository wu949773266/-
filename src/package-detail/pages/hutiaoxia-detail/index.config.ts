export default typeof definePageConfig === 'function'
  ? definePageConfig({ 
      navigationBarTitleText: '虎跳峡徒步',
      enableShareAppMessage: true
    })
  : { 
      navigationBarTitleText: '虎跳峡徒步',
      enableShareAppMessage: true
    }
