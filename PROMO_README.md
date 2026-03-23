# 推广版本构建说明

## 快速使用

### 1. 修改你的推广信息

编辑 `src/config/contact.ts` 文件，修改 `PROMO_CONFIG` 中的联系方式：

```typescript
const PROMO_CONFIG = {
  wechat: 'YOUR_WECHAT',        // ← 改成你的微信号
  phone: 'YOUR_PHONE',          // ← 改成你的电话
  location: '丽江 · 束河古镇',
  name: '户外领队'               // ← 改成你的推广名称
}
```

### 2. 构建推广版本

**方法一：临时修改环境变量**

```bash
# 在 .env.local 中添加
TARO_APP_PROMO_MODE=true

# 然后构建
pnpm build:weapp
```

**方法二：使用 .env.promo 文件**

```bash
# 复制推广配置
cp .env.promo .env.local

# 构建
pnpm build:weapp
```

### 3. 构建正式版本

确保 `.env.local` 中没有 `TARO_APP_PROMO_MODE=true`，或者设置为空：

```bash
# 正式版本
TARO_APP_PROMO_MODE= pnpm build:weapp
```

## 效果对比

| 版本 | 联系方式 | 推荐人卡片 |
|------|----------|-----------|
| 正式版 | 公司联系方式（SDHW008 / 18623355672） | 不显示 |
| 推广版 | 你配置的个人联系方式 | 显示橙色推荐人卡片 |

## 文件说明

- `src/config/contact.ts` - 联系方式配置文件（修改这里设置你的信息）
- `.env.promo` - 推广模式环境变量模板
- `.env.local` - 本地环境变量（不提交到 git）
