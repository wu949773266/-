export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '南极洛' })
  : { navigationBarTitleText: '南极洛' }
