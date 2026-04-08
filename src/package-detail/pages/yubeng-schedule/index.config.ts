export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '雨崩徒步摄影4日游',
      enableShareAppMessage: true,
      enableShareTimeline: true
    })
  : {
      navigationBarTitleText: '雨崩徒步摄影4日游',
      enableShareAppMessage: true,
      enableShareTimeline: true
    }
