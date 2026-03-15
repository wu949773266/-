export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: 'AI 助手',
      navigationBarBackgroundColor: '#2f6f4f',
      navigationBarTextStyle: 'white'
    })
  : {
      navigationBarTitleText: 'AI 助手',
      navigationBarBackgroundColor: '#2f6f4f',
      navigationBarTextStyle: 'white'
    }
