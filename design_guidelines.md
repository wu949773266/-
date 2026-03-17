# FLY户外小程序设计指南

## 品牌定位
**应用类型**：户外徒步俱乐部
**设计风格**：自然、活力、专业
**目标用户**：户外徒步爱好者、旅行者
**核心价值**：安全、专业、探索自然

## 配色方案

### 主色系 - 自然绿色
- 主色：`#2f6f4f` - 深绿色（品牌色，体现自然与专业）
- 主色浅色：`#3d8c64` - 点击态
- 主色极浅：`#e7f3eb` - 背景/标签色
- Tailwind 类名：`bg-[#2f6f4f]`, `text-[#2f6f4f]`

### 辅助色系 - 中性色
- 文字主色：`#1e2e28` - 深灰绿
- 文字辅色：`#6b7f76` - 灰绿
- 背景色：`#f8faf8` - 浅灰绿背景
- 分割线：`rgba(0, 0, 0, 0.05)`
- Tailwind 类名：`text-[#1e2e28]`, `bg-[#f8faf8]`

### 语义色
- 难度星级：`#2f6f4f` - 主绿色
- 卡片阴影：`rgba(0, 0, 0, 0.08)`

## 字体规范

### 标题层级
- H1（主标题）：`text-3xl font-bold` - 头部大标题
- H2（区块标题）：`text-2xl font-medium` - 各板块标题
- H3（卡片标题）：`text-xl font-semibold` - 线路名称
- Body（正文）：`text-base` - 普通文字
- Caption（小字）：`text-sm` - 辅助信息

### 字重
- Bold：`font-bold` - 主标题
- Semibold：`font-semibold` - 卡片标题
- Medium：`font-medium` - 区块标题
- Normal：`font-normal` - 正文

## 间距系统

### 页面级间距
- 页面边距：`p-4` (16px)
- 区块间距：`gap-6` (24px) 或 `py-12` (48px)

### 组件级间距
- 卡片内边距：`p-5` (20px)
- 卡片间距：`gap-5` (20px)
- 按钮内边距：`px-6 py-4` (水平 24px，垂直 16px)

## 组件规范

### 1. 按钮（主按钮）

```tsx
<Button className="w-full bg-[#2f6f4f] text-white rounded-full py-4 text-base font-medium">
  按钮文字
</Button>
```

### 2. 卡片（线路卡片）

```tsx
<View className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
  <Image
    className="w-full h-50"
    mode="aspectFill"
    src="https://images.unsplash.com/photo-xxx"
  />
  <View className="p-5">
    <Text className="block text-xl font-semibold text-[#1f4a2e] mb-2">
      线路名称
    </Text>
    <Text className="block text-base text-[#2f4a3d] mb-3">
      线路描述
    </Text>
    <View className="inline-block bg-[#e7f3eb] px-4 py-2 rounded-full">
      <Text className="text-sm font-medium text-[#2f6f4f]">
        难度 ⭐⭐⭐
      </Text>
    </View>
  </View>
</View>
```

### 3. 输入框（如有）

```tsx
<View className="bg-gray-50 rounded-xl px-4 py-3">
  <Input className="w-full bg-transparent text-base" placeholder="请输入内容" />
</View>
```

### 4. 空状态

```tsx
<View className="flex flex-col items-center justify-center py-12">
  <Text className="text-gray-400 text-base">暂无数据</Text>
</View>
```

### 5. 加载状态

```tsx
<View className="flex flex-col items-center justify-center py-12">
  <Text className="text-gray-400 text-base">加载中...</Text>
</View>
```

## 导航结构

### TabBar 配置

```typescript
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
      pagePath: 'pages/contact/index',
      text: '联系',
      iconPath: './assets/tabbar/message-circle.png',
      selectedIconPath: './assets/tabbar/message-circle-active.png',
    },
    {
      pagePath: 'pages/about/index',
      text: '关于',
      iconPath: './assets/tabbar/info.png',
      selectedIconPath: './assets/tabbar/info-active.png',
    },
  ]
}
```

### 页面跳转规范
- TabBar 页面：使用 `Taro.switchTab()`
- 普通页面：使用 `Taro.navigateTo()`

## 图片资源规范

### 图片格式
- 支持格式：JPG, PNG, WEBP
- 建议压缩：图片大小控制在 200KB 以内

### 图片尺寸
- 横幅背景：`85vh` 高度，覆盖模式
- 线路卡片：`200px` 高度，`aspectFill` 模式

### 图片来源
- 优先使用 Unsplash 免费图库
- 图片链接必须真实可访问

## 小程序约束

### 包体积限制
- 主包大小：≤ 2MB
- 总大小：≤ 20MB

### 性能优化
- 首屏渲染：控制首屏数据加载
- 图片懒加载：使用 `lazyLoad` 属性
- 分包加载：独立页面可分包

### 兼容性要求
- 微信小程序：基础库 2.0+
- H5：现代浏览器（Chrome, Safari, Edge）

## 特殊组件

### 头部横幅
```tsx
<View className="h-[85vh] relative">
  <Image
    className="w-full h-full"
    mode="aspectFill"
    src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b"
  />
  <View className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
  <View className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
    <Text className="block text-5xl font-bold mb-4">FLY户外</Text>
    <Text className="block text-2xl font-light mb-8">放飞心野 · 走进真正的山野</Text>
    <Button className="bg-[#2f6f4f] text-white rounded-full px-12 py-4 text-base font-medium">
      查看徒步线路
    </Button>
  </View>
</View>
```

### 联系方式列表
```tsx
<View className="bg-white rounded-3xl border border-[#2f6f4f]/10 overflow-hidden">
  <View className="flex items-center justify-center p-6 border-b border-black/[0.05]">
    <Text className="text-lg text-[#1e2e28]">微信：SDHW008</Text>
  </View>
  <View className="flex items-center justify-center p-6">
    <Text className="text-lg text-[#1e2e28]">地址：丽江 · 束河古镇</Text>
  </View>
</View>
```

## 品牌色彩应用总结

| 场景 | 颜色值 | Tailwind 类名 |
|------|--------|---------------|
| 主按钮背景 | #2f6f4f | bg-[#2f6f4f] |
| 主按钮点击态 | #3d8c64 | active:bg-[#3d8c64] |
| 标签背景 | #e7f3eb | bg-[#e7f3eb] |
| TabBar 选中态 | #2f6f4f | (配置) |
| 文字主色 | #1e2e28 | text-[#1e2e28] |
| TabBar 未选中 | #6b7f76 | (配置) |
| 页面背景 | #f8faf8 | bg-[#f8faf8] |
