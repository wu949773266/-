export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '私人订制',
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: false,
      enableShareAppMessage: true
    })
  : {
      navigationBarTitleText: '私人订制',
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: false,
      enableShareAppMessage: true
    }
