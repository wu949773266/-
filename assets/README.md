# 户外徒步 MBTI 小程序组件

这是一个可接入微信小程序的“户外徒步人格测试”组件，包含 12 道场景题、MBTI 四维计分、16 种户外人格结果和结果页展示。

## 接入方式

1. 把 `data/outdoor-mbti.js` 放到你的小程序 `data/` 目录。
2. 把 `components/outdoor-mbti/` 放到你的小程序 `components/` 目录。
3. 在需要使用的页面 JSON 中注册组件：

```json
{
  "usingComponents": {
    "outdoor-mbti": "/components/outdoor-mbti/outdoor-mbti"
  }
}
```

4. 在页面 WXML 中使用：

```xml
<outdoor-mbti bind:complete="onOutdoorMbtiComplete" />
```

5. 在页面 JS 中接收结果：

```js
Page({
  onOutdoorMbtiComplete(event) {
    const { typeCode, result, score } = event.detail;
    wx.setStorageSync('outdoorMbtiResult', {
      typeCode,
      result,
      score,
      createdAt: Date.now()
    });
  }
});
```

## 直接作为页面使用

如果你想先快速预览，可以把 `pages/outdoor-mbti/` 复制进小程序，并在 `app.json` 的 `pages` 里加入：

```json
"pages/outdoor-mbti/outdoor-mbti"
```

## 可配置项

```xml
<outdoor-mbti
  title="你的户外徒步人格"
  subtitle="12 个山野场景，生成你的徒步 MBTI"
  restart-text="再测一次"
  bind:complete="onOutdoorMbtiComplete"
/>
```

## 结果内容方向

每个结果包含：

- `name`：户外人格名，例如“山径守序官”
- `role`：队伍角色，例如“可靠领队 / 行程管家”
- `summary`：人格总结
- `route`：适合路线
- `strength`：户外优势
- `watch`：风险提醒
- `gear`：装备灵感

后续可以继续扩展成“生成分享海报”“推荐路线/装备”“匹配同行队友”等玩法。
