# 🚀 真机预览快速入门

## 问题描述
在微信开发者工具中扫码真机预览时，AI 聊天功能无法调用接口。

## 根本原因
**真机无法访问开发电脑的 localhost**，需要配置真机可以访问的地址。

## ⚡ 最快解决方案（3 步搞定）

### 第 1 步：查看电脑 IP

```bash
# macOS
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig

# Linux
ip addr show | grep "inet " | grep -v 127.0.0.1
```

**输出示例**：`192.168.1.100`

### 第 2 步：配置 .env.local

编辑项目根目录的 `.env.local` 文件，添加：

```env
PROJECT_DOMAIN=http://192.168.1.100:3000
```

> 把 `192.168.1.100` 替换为你电脑的实际 IP 地址

### 第 3 步：微信开发者工具设置

1. 打开微信开发者工具
2. 点击右上角 **"详情"**
3. 切换到 **"本地设置"** 标签
4. ✅ 勾选 **"不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书"**

### 第 4 步：重新编译并预览

```bash
# 重新编译小程序
pnpm build:weapp

# 在微信开发者工具中点击"预览"
# 扫码真机预览
```

---

## 🛠️ 自动化工具

### 方案 A：一键配置（推荐）

```bash
./scripts/setup-lan.sh
```

这个脚本会自动：
- ✅ 检测你的电脑 IP 地址
- ✅ 自动配置 .env.local
- ✅ 备份原配置

### 方案 B：诊断问题

```bash
./scripts/diagnose-preview.sh
```

这个脚本会检查：
- ✅ 后端服务是否运行
- ✅ PROJECT_DOMAIN 是否配置
- ✅ 配置是否正确
- ✅ 提供解决方案

### 方案 C：使用 ngrok（高级）

```bash
./scripts/setup-preview.sh
```

适合需要：
- 多人协作测试
- 非局域网环境
- 更稳定的公网访问

---

## ✅ 验证步骤

配置完成后，按以下步骤验证：

1. **测试本地服务**
   ```bash
   curl http://localhost:3000/api/health
   ```
   应返回：`{"status":"success","data":"..."}`

2. **测试 AI 聊天**
   ```bash
   curl -X POST http://localhost:3000/api/ai/chat \
     -H "Content-Type: application/json" \
     -d '{"message":"你好"}'
   ```
   应返回 AI 的回复

3. **真机测试**
   - 打开微信开发者工具
   - 点击"预览"
   - 扫码
   - 进入"关于"页面
   - 点击"AI 智能助手"
   - 输入问题测试

---

## ❓ 常见问题

### Q1: 配置后还是不行？

**检查清单**：
- [ ] 手机和电脑在同一 Wi-Fi（必须！）
- [ ] 后端服务在运行（访问 http://localhost:3000/api/health）
- [ ] PROJECT_DOMAIN 配置的 IP 正确
- [ ] 微信开发者工具开启"不校验合法域名"
- [ ] 小程序已重新编译

### Q2: 提示 "request:fail url not in domain list"

**解决**：在微信开发者工具中开启"不校验合法域名"

### Q3: 提示 "request:fail net::ERR_CONNECTION_REFUSED"

**解决**：
1. 检查后端服务是否运行
2. 检查 IP 地址是否正确
3. 检查端口是否被占用

### Q4: IP 地址经常变化怎么办？

**解决**：使用 ngrok 内网穿透（见方案 C）

### Q5: 想给其他人测试怎么办？

**解决**：使用 ngrok 或部署到云服务器

---

## 📋 完整配置示例

### .env.local 配置

```env
# 本地开发（H5 可以为空）
PROJECT_DOMAIN=

# 真机预览（局域网）
PROJECT_DOMAIN=http://192.168.1.100:3000

# 真机预览（ngrok）
PROJECT_DOMAIN=https://xxxx.ngrok-free.app

# 生产环境
PROJECT_DOMAIN=https://your-domain.com
```

### 不同环境切换

**开发 H5**：
```bash
# PROJECT_DOMAIN= 或注释掉
pnpm dev
```

**真机预览（局域网）**：
```bash
# PROJECT_DOMAIN=http://192.168.x.x:3000
pnpm build:weapp
```

**真机预览（ngrok）**：
```bash
# PROJECT_DOMAIN=https://xxxx.ngrok-free.app
pnpm build:weapp
```

---

## 📚 相关文档

- **详细配置指南**：`PREVIEW_GUIDE.md`
- **快速修复指南**：`QUICK_FIX.md`
- **项目 README**：`README.md`

---

## 🔧 常用命令

```bash
# 开发
pnpm dev                    # 启动开发服务
pnpm dev:web               # 仅 H5 前端
pnpm dev:server            # 仅后端服务

# 构建
pnpm build:weapp           # 构建微信小程序
pnpm build                 # 构建所有

# 工具
./scripts/setup-lan.sh           # 一键配置局域网 IP
./scripts/diagnose-preview.sh    # 诊断问题
./scripts/setup-preview.sh       # 配置 ngrok

# 测试
curl http://localhost:3000/api/health
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"你好"}'
```

---

## 💡 提示

⚠️ **重要**：
- 局域网 IP 方案仅限开发测试
- 生产环境必须使用 HTTPS + 公网服务器
- 手机和电脑必须连接同一 Wi-Fi
- 确保 IP 地址没有被其他设备占用

✅ **推荐流程**：
1. 开发阶段：局域网 IP 方案
2. 测试阶段：ngrok 内网穿透
3. 生产环境：云服务器部署

---

## 🆘 遇到问题？

1. 运行诊断脚本：`./scripts/diagnose-preview.sh`
2. 查看快速修复指南：`cat QUICK_FIX.md`
3. 查看详细配置指南：`cat PREVIEW_GUIDE.md`

---

**祝你使用愉快！🎉**
