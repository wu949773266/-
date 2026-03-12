#!/bin/bash

# API 测试脚本
# 用于测试后端接口是否正常工作

echo "=========================================="
echo "后端接口测试脚本"
echo "=========================================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 获取 PROJECT_DOMAIN
if [ -f ".env.local" ]; then
    PROJECT_DOMAIN=$(grep "^PROJECT_DOMAIN=" .env.local | cut -d '=' -f2)
else
    PROJECT_DOMAIN=""
fi

echo "当前配置："
echo "  PROJECT_DOMAIN: ${PROJECT_DOMAIN:-未配置}"
echo ""

# 测试 1: 本地健康检查
echo "📝 测试 1: 本地健康检查"
echo "   URL: http://localhost:3000/api/health"
echo ""

if curl -s -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ 本地服务正常${NC}"
    curl -s http://localhost:3000/api/health | jq '.' 2>/dev/null || curl -s http://localhost:3000/api/health
else
    echo -e "${RED}❌ 本地服务未运行，请先启动后端服务${NC}"
    echo "   运行: pnpm dev:server 或 coze dev"
fi

echo ""
echo "=========================================="
echo ""

# 测试 2: AI 聊天接口（本地）
echo "📝 测试 2: AI 聊天接口（本地）"
echo "   URL: http://localhost:3000/api/ai/chat"
echo ""

echo "   发送测试请求..."
RESPONSE=$(curl -s -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"你好，简单介绍一下雨崩"}' \
  -w "\n%{http_code}" 2>/dev/null)

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ AI 聊天接口正常${NC}"
    echo ""
    echo "   响应内容（前 200 字）："
    echo "$BODY" | jq -r '.data.content' 2>/dev/null | head -c 200
    echo "..."
else
    echo -e "${RED}❌ AI 聊天接口返回错误${NC}"
    echo "   HTTP 状态码: $HTTP_CODE"
    echo "   响应: $BODY"
fi

echo ""
echo "=========================================="
echo ""

# 测试 3: 配置的域名（如果已配置）
if [ -n "$PROJECT_DOMAIN" ]; then
    echo "📝 测试 3: 测试配置的 PROJECT_DOMAIN"
    echo "   URL: $PROJECT_DOMAIN/api/health"
    echo ""

    if curl -s -f "$PROJECT_DOMAIN/api/health" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PROJECT_DOMAIN 可访问${NC}"
        curl -s "$PROJECT_DOMAIN/api/health" | jq '.' 2>/dev/null || curl -s "$PROJECT_DOMAIN/api/health"
    else
        echo -e "${RED}❌ PROJECT_DOMAIN 无法访问${NC}"
        echo "   请检查："
        echo "   1. 内网穿透工具是否正常运行"
        echo "   2. 域名是否正确"
        echo "   3. 防火墙是否阻止了连接"
    fi
else
    echo "📝 测试 3: PROJECT_DOMAIN 未配置"
    echo ""
    echo -e "${YELLOW}⚠️  要在真机预览中测试接口，需要配置 PROJECT_DOMAIN${NC}"
    echo ""
    echo "   配置方法："
    echo "   1. 使用 ngrok 等内网穿透工具"
    echo "   2. 在 .env.local 中设置 PROJECT_DOMAIN"
    echo ""
    echo "   示例："
    echo "   PROJECT_DOMAIN=https://xxxx.ngrok-free.app"
fi

echo ""
echo "=========================================="
echo ""
echo "测试完成！"
