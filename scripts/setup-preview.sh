#!/bin/bash

# 快速配置真机预览脚本
# 这个脚本会帮助您快速配置 ngrok 并更新 .env.local

echo "=========================================="
echo "真机预览快速配置脚本"
echo "=========================================="
echo ""

# 检查是否安装了 ngrok
if ! command -v ngrok &> /dev/null; then
    echo "❌ 未检测到 ngrok"
    echo ""
    echo "请先安装 ngrok："
    echo ""
    echo "macOS (Homebrew):"
    echo "  brew install ngrok"
    echo ""
    echo "Linux:"
    echo "  访问 https://ngrok.com/download 下载"
    echo ""
    exit 1
fi

echo "✅ 检测到 ngrok"
echo ""

# 检查后端服务是否运行
if ! curl -s -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "❌ 后端服务未运行"
    echo ""
    echo "请先启动后端服务："
    echo "  pnpm dev"
    echo "  或"
    echo "  pnpm dev:server"
    echo ""
    exit 1
fi

echo "✅ 后端服务正常运行"
echo ""

# 询问用户是否继续
echo "即将启动 ngrok 内网穿透..."
echo "这将把本地 3000 端口暴露到公网"
echo ""
read -p "是否继续? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "已取消"
    exit 0
fi

echo ""
echo "🚀 启动 ngrok..."
echo ""

# 启动 ngrok 并获取公网地址
NGROK_URL=$(ngrok http 3000 --log=stdout 2>/dev/null | grep -o 'https://[^"]*\.ngrok[^"]*' | head -1 &)

# 等待 ngrok 启动
sleep 3

# 尝试获取 ngrok URL
for i in {1..10}; do
    NGROK_URL=$(ngrok http 3000 --log=stdout 2>/dev/null | grep -o 'https://[^"]*\.ngrok[^"]*' | head -1 &)
    sleep 1
    if [ -n "$NGROK_URL" ]; then
        break
    fi
done

# 备用方案：从 ngrok API 获取
if [ -z "$NGROK_URL" ]; then
    echo "正在尝试从 API 获取 ngrok URL..."
    sleep 5
    # ngrok 通常在 4040 端口提供 API
    if curl -s http://localhost:4040/api/tunnels > /dev/null 2>&1; then
        NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | grep -o 'https://[^"]*' | head -1)
    fi
fi

if [ -z "$NGROK_URL" ]; then
    echo ""
    echo "⚠️  无法自动获取 ngrok URL"
    echo ""
    echo "请手动执行以下步骤："
    echo ""
    echo "1. 在新终端窗口运行："
    echo "   ngrok http 3000"
    echo ""
    echo "2. 等待 ngrok 启动后，复制显示的公网地址"
    echo "   格式类似：https://xxxx-xxxx-xxxx.ngrok-free.app"
    echo ""
    echo "3. 手动编辑 .env.local 文件："
    echo "   PROJECT_DOMAIN=https://你的ngrok地址"
    echo ""
    echo "4. 重启开发服务："
    echo "   pnpm dev"
    echo ""
    exit 1
fi

echo "✅ 获取到 ngrok URL: $NGROK_URL"
echo ""

# 备份原配置文件
if [ -f ".env.local" ]; then
    cp .env.local .env.local.backup
    echo "✅ 已备份原配置到 .env.local.backup"
fi

# 更新 .env.local
if grep -q "^PROJECT_DOMAIN=" .env.local 2>/dev/null; then
    # 替换现有的 PROJECT_DOMAIN
    sed -i.bak "s|^PROJECT_DOMAIN=.*|PROJECT_DOMAIN=$NGROK_URL|" .env.local
    rm -f .env.local.bak
else
    # 添加新的 PROJECT_DOMAIN
    echo "PROJECT_DOMAIN=$NGROK_URL" >> .env.local
fi

echo "✅ 已更新 .env.local"
echo ""

# 显示当前配置
echo "当前配置："
echo "  PROJECT_DOMAIN=$NGROK_URL"
echo ""

# 测试配置
echo "📝 测试配置..."
sleep 2
if curl -s -f "$NGROK_URL/api/health" > /dev/null 2>&1; then
    echo "✅ 配置成功！公网地址可访问"
else
    echo "⚠️  公网地址暂时无法访问，可能需要等待几秒"
fi

echo ""
echo "=========================================="
echo "配置完成！"
echo "=========================================="
echo ""
echo "接下来的步骤："
echo ""
echo "1. 重新编译小程序："
echo "   pnpm build:weapp"
echo ""
echo "2. 在微信开发者工具中重新预览"
echo ""
echo "3. 扫码真机预览"
echo ""
echo "注意：ngrok 需要保持运行状态"
echo ""
