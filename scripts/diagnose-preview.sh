#!/bin/bash

# 真机预览诊断脚本
# 帮助快速定位真机预览无法访问接口的问题

echo "=========================================="
echo "真机预览诊断工具"
echo "=========================================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 问题列表
ISSUES=()

# 检查 1: 后端服务是否运行
echo "📝 检查 1: 后端服务状态"
if curl -s -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo -e "   ${GREEN}✅${NC} 后端服务正常运行 (http://localhost:3000)"
else
    echo -e "   ${RED}❌${NC} 后端服务未运行"
    ISSUES+=("后端服务未运行")
fi
echo ""

# 检查 2: PROJECT_DOMAIN 配置
echo "📝 检查 2: PROJECT_DOMAIN 配置"
if [ -f ".env.local" ]; then
    PROJECT_DOMAIN=$(grep "^PROJECT_DOMAIN=" .env.local | cut -d '=' -f2)
    if [ -n "$PROJECT_DOMAIN" ]; then
        echo -e "   ${GREEN}✅${NC} PROJECT_DOMAIN 已配置: $PROJECT_DOMAIN"
    else
        echo -e "   ${RED}❌${NC} PROJECT_DOMAIN 未配置"
        echo -e "   ${YELLOW}   原因：真机无法访问 localhost${NC}"
        ISSUES+=("PROJECT_DOMAIN 未配置")
    fi
else
    echo -e "   ${RED}❌${NC} .env.local 文件不存在"
    ISSUES+=(".env.local 文件不存在")
fi
echo ""

# 检查 3: ngrok 是否安装
echo "📝 检查 3: ngrok 工具"
if command -v ngrok &> /dev/null; then
    echo -e "   ${GREEN}✅${NC} ngrok 已安装"
    NGROK_VERSION=$(ngrok version 2>/dev/null)
    echo -e "   版本: $NGROK_VERSION"
else
    echo -e "   ${YELLOW}⚠️${NC} ngrok 未安装（可选，用于内网穿透）"
    echo -e "   ${BLUE}ℹ️${NC} 安装命令: brew install ngrok"
fi
echo ""

# 检查 4: 小程序配置
echo "📝 检查 4: 微信开发者工具配置"
echo -e "   ${BLUE}ℹ️${NC} 请检查以下设置："
echo "   - 是否开启\"不校验合法域名\"？"
echo "   - 小程序是否重新编译？"
echo "   - 真机是否连接到互联网？"
echo ""

# 检查 5: 当前环境
echo "📝 检查 5: 当前环境"
echo -e "   ${BLUE}操作系统:${NC} $(uname -s)"
echo -e "   ${BLUE}开发环境:${NC} 本地开发"
echo -e "   ${BLUE}后端地址:${NC} http://localhost:3000"
echo ""

# 汇总结果
echo "=========================================="
echo "诊断结果"
echo "=========================================="
echo ""

if [ ${#ISSUES[@]} -eq 0 ]; then
    echo -e "${GREEN}✅ 所有检查通过！${NC}"
    echo ""
    echo "如果仍然无法访问，可能的原因："
    echo "1. 微信开发者工具未开启\"不校验合法域名\""
    echo "2. 小程序未重新编译"
    echo "3. 真机网络问题"
    echo ""
else
    echo -e "${RED}❌ 发现 ${#ISSUES[@]} 个问题：${NC}"
    echo ""
    for i in "${!ISSUES[@]}"; do
        echo "  $((i+1)). ${ISSUES[$i]}"
    done
    echo ""
fi

# 解决方案
echo "=========================================="
echo "解决方案"
echo "=========================================="
echo ""

if [ ${#ISSUES[@]} -gt 0 ]; then
    echo -e "${YELLOW}快速修复方案：${NC}"
    echo ""
    echo "1. 启动后端服务（如果未运行）："
    echo "   pnpm dev"
    echo ""
    echo "2. 配置 PROJECT_DOMAIN："
    echo ""
    echo "   方案 A - 使用 ngrok（推荐）："
    echo "   - 运行: ./scripts/setup-preview.sh"
    echo "   - 或手动执行:"
    echo "     a) ngrok http 3000"
    echo "     b) 复制显示的公网地址"
    echo "     c) 编辑 .env.local: PROJECT_DOMAIN=https://xxxx.ngrok-free.app"
    echo ""
    echo "   方案 B - 使用局域网 IP（同一 Wi-Fi）："
    echo "   - 查看电脑 IP: ifconfig | grep inet"
    echo "   - 编辑 .env.local: PROJECT_DOMAIN=http://192.168.x.x:3000"
    echo "   - 微信开发者工具中开启\"不校验合法域名\""
    echo ""
    echo "3. 重新编译小程序："
    echo "   pnpm build:weapp"
    echo ""
    echo "4. 重新预览："
    echo "   - 在微信开发者工具中点击\"预览\""
    echo "   - 扫码真机预览"
    echo ""
else
    echo -e "${GREEN}配置看起来正常！${NC}"
    echo ""
    echo "如果仍然无法访问，请检查："
    echo "1. 微信开发者工具是否开启\"不校验合法域名\""
    echo "2. 小程序是否重新编译"
    echo "3. 真机网络连接"
    echo "4. 查看微信开发者工具控制台的错误信息"
    echo ""
fi

# 手动测试指南
echo "=========================================="
echo "手动测试步骤"
echo "=========================================="
echo ""
echo "1. 测试本地服务："
echo "   curl http://localhost:3000/api/health"
echo ""
echo "2. 如果配置了 PROJECT_DOMAIN，测试公网访问："
echo "   curl \$PROJECT_DOMAIN/api/health"
echo ""
echo "3. 测试 AI 聊天接口："
echo '   curl -X POST http://localhost:3000/api/ai/chat \'
echo '     -H "Content-Type: application/json" \'
echo '     -d '"'"'{"message":"你好"}'"'"''
echo ""

echo "=========================================="
echo ""
