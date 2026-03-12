#!/bin/bash

# 交互式配置脚本 - 最简单的真机预览配置方案

echo "=========================================="
echo "真机预览一键配置（局域网 IP 方案）"
echo "=========================================="
echo ""

# 获取本机 IP 地址
echo "正在获取电脑 IP 地址..."
echo ""

# 检测操作系统并获取 IP
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n 1)
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    LOCAL_IP=$(ip addr show | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | cut -d/ -f1 | head -n 1)
else
    # Windows (Git Bash)
    LOCAL_IP=$(ipconfig | grep -A 1 "IPv4" | grep -v "IPv4" | awk '{print $NF}')
fi

if [ -z "$LOCAL_IP" ]; then
    echo "❌ 无法自动获取 IP 地址"
    echo ""
    echo "请手动查看并输入您的电脑 IP 地址："
    echo ""
    echo "macOS: ifconfig | grep inet"
    echo "Linux: ip addr show"
    echo "Windows: ipconfig"
    echo ""
    read -p "请输入 IP 地址 (如 192.168.1.100): " LOCAL_IP
fi

if [ -z "$LOCAL_IP" ]; then
    echo "❌ IP 地址不能为空"
    exit 1
fi

echo "✅ 检测到 IP 地址: $LOCAL_IP"
echo ""

# 验证后端服务是否运行
echo "检查后端服务..."
if curl -s -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "✅ 后端服务正常运行"
else
    echo "⚠️  后端服务未运行，请先运行: pnpm dev"
    echo ""
    read -p "是否继续配置? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 0
    fi
fi

echo ""

# 配置 PROJECT_DOMAIN
PROJECT_DOMAIN="http://$LOCAL_IP:3000"

echo "即将配置："
echo "  PROJECT_DOMAIN = $PROJECT_DOMAIN"
echo ""
read -p "确认配置? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "已取消"
    exit 0
fi

echo ""

# 备份原配置
if [ -f ".env.local" ]; then
    cp .env.local .env.local.backup
    echo "✅ 已备份原配置到 .env.local.backup"
fi

# 更新 .env.local
if grep -q "^PROJECT_DOMAIN=" .env.local 2>/dev/null; then
    sed -i.bak "s|^PROJECT_DOMAIN=.*|PROJECT_DOMAIN=$PROJECT_DOMAIN|" .env.local
    rm -f .env.local.bak
else
    echo "PROJECT_DOMAIN=$PROJECT_DOMAIN" >> .env.local
fi

echo "✅ 已更新 .env.local"
echo ""

# 显示配置
echo "=========================================="
echo "配置完成！"
echo "=========================================="
echo ""
echo "当前配置："
echo "  PROJECT_DOMAIN = $PROJECT_DOMAIN"
echo ""
echo "接下来的步骤："
echo ""
echo "1. 确保手机和电脑连接同一 Wi-Fi"
echo ""
echo "2. 在微信开发者工具中开启\"不校验合法域名\""
echo "   - 点击右上角\"详情\""
echo "   - 切换到\"本地设置\""
echo "   - 勾选\"不校验合法域名\""
echo ""
echo "3. 重新编译小程序："
echo "   pnpm build:weapp"
echo ""
echo "4. 重新预览："
echo "   - 在微信开发者工具中点击\"预览\""
echo "   - 扫码真机预览"
echo ""
echo "注意：如果 IP 地址变化，需要重新配置"
echo ""
