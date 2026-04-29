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
      root: 'package-detail',
      pages: [
        'pages/yubeng-schedule/index',
        'pages/hutiaoxia-detail/index',
        'pages/nanlu-detail/index'
      ],
      name: 'detail'
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#f5f2ed',
    navigationBarTitleText: '山渡户外',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#8a9990',
    selectedColor: '#2c5f45',
    backgroundColor: '#faf8f5',
    borderStyle: 'white',
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
        iconPath: './assets/tabbar/mountain.png',
        selectedIconPath: './assets/tabbar/mountain-active.png',
      },
      {
        pagePath: 'pages/about/index',
        text: '关于',
        iconPath: './assets/tabbar/user.png',
        selectedIconPath: './assets/tabbar/user-active.png',
      },
    ]
  }
}
