# 快速修复真机预览问题

## 问题原因

真机无法访问开发电脑的 `localhost:3000`，需要配置公网或局域网可访问的地址。

## 最简单的解决方案（3步完成）

### 第 1 步：查看电脑 IP 地址

```bash
# macOS
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig

# Linux
ip addr show | grep "inet " | grep -v 127.0.0.1
```

找到类似 `192.168.1.x` 或 `192.168.0.x` 的地址

### 第 2 步：配置 PROJECT_DOMAIN

编辑项目根目录的 `.env.local` 文件：

```env
PROJECT_DOMAIN=http://192.168.1.100:3000
```

把 `192.168.1.100` 替换为你电脑的实际 IP 地址

### 第 3 步：重启并重新编译

```bash
# 重启开发服务
pnpm dev

# 等待服务启动后，重新编译小程序
pnpm build:weapp
```

## 微信开发者工具设置

1. 打开微信开发者工具
2. 点击右上角"详情"按钮
3. 切换到"本地设置"标签
4. 勾选"✓ 不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书"

## 验证

1. 在微信开发者工具中点击"预览"
2. 用手机扫码预览
3. 测试 AI 聊天功能

## 常见问题

### Q: 配置后还是不行？

**A**: 请按顺序检查：

1. **手机和电脑在同一 Wi-Fi**（必须！）
2. **后端服务在运行**（访问 http://localhost:3000/api/health 测试）
3. **PROJECT_DOMAIN 配置正确**（IP 地址要准确）
4. **微信开发者工具开启了"不校验合法域名"**
5. **小程序已重新编译**

### Q: 测试接口返回错误？

**A**: 运行诊断脚本查看详细错误：

```bash
./scripts/diagnose-preview.sh
```

### Q: 想用更专业的方案？

**A**: 使用 ngrok 内网穿透（推荐用于多人协作测试）：

```bash
# 1. 安装 ngrok
brew install ngrok  # macOS

# 2. 启动 ngrok
ngrok http 3000

# 3. 复制显示的公网地址（如 https://xxxx.ngrok-free.app）

# 4. 配置 .env.local
PROJECT_DOMAIN=https://xxxx.ngrok-free.app

# 5. 重启服务并重新编译
pnpm dev
pnpm build:weapp
```

## 快速测试命令

```bash
# 测试本地服务
curl http://localhost:3000/api/health

# 测试 AI 聊天
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"你好"}'
```

## 注意事项

⚠️ **重要提醒**：
- 局域网 IP 方案仅限开发测试
- 生产环境必须使用 HTTPS + 公网服务器
- 手机和电脑必须连接同一 Wi-Fi
- ngrok 的公网地址每次启动会变化，需要重新配置

## 需要帮助？

运行诊断脚本获取更多信息：

```bash
./scripts/diagnose-preview.sh
```

查看详细配置指南：

```bash
cat PREVIEW_GUIDE.md
```
