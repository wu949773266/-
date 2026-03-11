export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '山渡户外' })
  : { navigationBarTitleText: '山渡户外' }
