export default {
  pages: [
    'pages/index/index',
    'pages/routes/index',
    'pages/custom/index',
    'pages/contact/index',
    'pages/about/index',
    'pages/recruit/index',
    'pages/survey/index',
    'pages/survey-admin/index',
    'pages/survey-responses/index'
  ],
  subpackages: [
    {
      root: 'package-yubeng',
      pages: [
        'pages/yubeng-schedule/index'
      ],
      name: 'yubeng'
    },
    {
      root: 'package-detail',
      pages: [
        'pages/hutiaoxia-detail/index',
        'pages/nanlu-detail/index'
      ],
      name: 'detail'
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: '山渡户外',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#6b7f76',
    selectedColor: '#2f6f4f',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/tabbar/house.png',
        selectedIconPath: './assets/tabbar/house-active.png',
      },
      {
        pagePath: 'pages/routes/index',
        text: '线路',
        iconPath: './assets/tabbar/map.png',
        selectedIconPath: './assets/tabbar/map-active.png',
      },
      {
        pagePath: 'pages/about/index',
        text: '关于',
        iconPath: './assets/tabbar/info.png',
        selectedIconPath: './assets/tabbar/info-active.png',
      },
    ]
  }
}
