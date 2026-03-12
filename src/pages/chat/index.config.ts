export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: 'AI 助手',
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: false,
    })
  : {
      navigationBarTitleText: 'AI 助手',
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: false,
    }
