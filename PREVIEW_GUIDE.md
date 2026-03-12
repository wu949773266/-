# 真机预览配置指南

## 问题描述

在真机预览小程序时，网络请求失败，无法调用后端接口。

## 原因分析

真机预览时，小程序无法访问 `localhost:3000`，因为：
- `localhost` 指向的是真机设备本身，而不是开发电脑
- 小程序有网络请求域名限制（开发模式下可忽略）

## 解决方案

### 方案一：使用内网穿透（推荐用于开发测试）

使用 ngrok 或类似工具将本地服务器暴露到公网：

#### 1. 安装 ngrok
```bash
# macOS (Homebrew)
brew install ngrok

# Linux
# 下载 https://ngrok.com/download
```

#### 2. 启动内网穿透
```bash
# 将本地 3000 端口映射到公网
ngrok http 3000
```

#### 3. 获取公网地址
ngrok 会显示类似这样的地址：
```
Forwarding  https://xxxx-xx-xx-xx-xx.ngrok-free.app -> http://localhost:3000
```

#### 4. 配置 PROJECT_DOMAIN
编辑 `.env.local` 文件：
```env
PROJECT_DOMAIN=https://xxxx-xx-xx-xx-xx.ngrok-free.app
```

#### 5. 重启开发服务
```bash
# 停止当前服务（Ctrl+C）
# 重新启动
coze dev
```

#### 6. 重新编译小程序
```bash
pnpm build:weapp
```

### 方案二：使用本地局域网 IP（仅限同一 Wi-Fi）

如果真机和开发电脑在同一局域网内：

#### 1. 查看开发电脑 IP 地址
```bash
# macOS
ifconfig | grep "inet " | grep -v 127.0.0.1

# Linux
ip addr show | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig
```

#### 2. 配置 PROJECT_DOMAIN
```env
PROJECT_DOMAIN=http://192.168.x.x:3000
```

#### 3. 在微信开发者工具中配置
- 打开微信开发者工具
- 点击右上角"详情"
- 在"本地设置"中勾选"不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书"

**注意**：此方案仅适用于开发阶段，生产环境必须使用 HTTPS。

### 方案三：部署到云服务器（生产环境推荐）

将后端服务部署到云服务器（腾讯云、阿里云等）：

#### 1. 服务器要求
- Node.js 环境
- 可访问的公网 IP
- 配置好防火墙规则（开放 3000 端口）
- 配置 HTTPS 证书（小程序强制要求）

#### 2. 配置 PROJECT_DOMAIN
```env
PROJECT_DOMAIN=https://your-domain.com
```

## 微信小程序合法域名配置

**生产环境必须配置合法域名**，否则无法上线。

### 配置步骤

1. 登录 [微信公众平台](https://mp.weixin.qq.com/)
2. 进入"开发" → "开发管理" → "开发设置"
3. 在"服务器域名"中配置：
   - request 合法域名：`https://your-domain.com/api`
   - uploadFile 合法域名：`https://your-domain.com/api`
   - downloadFile 合法域名：`https://your-domain.com/api`

### 注意事项

- 域名必须是 HTTPS
- 域名必须通过 ICP 备案
- 不能使用 IP 地址
- 不能使用端口号（默认 443）
- 域名必须支持 TLS 1.2+

## 开发调试建议

### 开发阶段（推荐）

使用**方案一**（ngrok 内网穿透）：
- ✅ 无需配置服务器
- ✅ 无需 HTTPS 证书
- ✅ 支持真机调试
- ✅ 支持多人协作查看

### 测试阶段

使用**方案二**（局域网 IP）：
- ⚠️ 仅限同一 Wi-Fi
- ⚠️ 需要开启"不校验合法域名"
- ⚠️ 仅适合快速测试

### 生产阶段

使用**方案三**（云服务器）：
- ✅ 稳定可靠
- ✅ 支持正式上线
- ✅ 符合小程序规范

## 常见问题

### Q1: 真机预览提示"request:fail url not in domain list"

**A**: 在微信开发者工具中开启"不校验合法域名"（仅限开发环境）

### Q2: ngrok 访问太慢

**A**:
- 使用国内内网穿透工具（如花生壳、natapp）
- 或使用云服务器部署

### Q3: 配置后仍然无法访问

**A**: 检查以下几点：
1. PROJECT_DOMAIN 是否正确配置
2. 后端服务是否正常运行（访问 http://localhost:3000/api/health）
3. 真机是否连接到互联网
4. 防火墙是否阻止了端口访问

### Q4: 小程序提示 "不在以下 request 合法域名列表中"

**A**: 生产环境必须在微信公众平台配置合法域名，开发环境可开启"不校验合法域名"选项。

## 快速测试命令

### 测试后端服务是否正常
```bash
curl http://localhost:3000/api/health
```

### 测试内网穿透是否正常
```bash
curl https://your-ngrok-url.ngrok-free.app/api/health
```

### 测试 AI 聊天接口
```bash
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"你好"}'
```

## 相关文档

- [微信小程序网络请求](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html)
- [微信小程序服务器域名配置](https://developers.weixin.qq.com/miniprogram/dev/framework/server-ability/network.html)
- [ngrok 官方文档](https://ngrok.com/docs)
