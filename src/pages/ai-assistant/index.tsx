import { View, Text, Input, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState, useRef, useEffect } from 'react'
import type { FC } from 'react'
import { Network } from '@/network'
import { Send, Bot, User } from 'lucide-react-taro'
import './index.css'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const AiAssistantPage: FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是山渡户外智能助手 🏔️\n\n我可以帮你：\n• 介绍徒步线路（虎跳峡、雨崩、南极洛）\n• 解答徒步装备、路线问题\n• 推荐适合你的徒步线路\n• 提供户外安全建议\n\n有什么可以帮到你的吗？'
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollViewRef = useRef<string>('')

  // 滚动到底部
  const scrollToBottom = () => {
    scrollViewRef.current = `scroll-${Date.now()}`
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 发送消息
  const handleSend = async () => {
    const message = inputValue.trim()
    if (!message || isLoading) return

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // 构建历史消息
      const history = messages.map(m => ({
        role: m.role,
        content: m.content
      }))

      // 调用后端 API
      const res = await Network.request({
        url: '/api/ai/chat',
        method: 'POST',
        data: { message, history }
      })

      console.log('AI response:', res.data)

      // 添加助手回复
      if (res.data?.code === 200 && res.data?.data?.content) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: res.data.data.content
        }
        setMessages(prev => [...prev, assistantMessage])
      } else {
        throw new Error(res.data?.msg || '请求失败')
      }
    } catch (error) {
      console.error('Chat error:', error)
      Taro.showToast({
        title: '发送失败，请重试',
        icon: 'none'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className="ai-assistant-page">
      {/* 头部 */}
      <View className="header">
        <Text className="header-title">AI 徒步助手</Text>
        <Text className="header-subtitle">山渡户外智能客服</Text>
      </View>

      {/* 消息列表 */}
      <ScrollView
        className="message-list"
        scrollY
        scrollIntoView={scrollViewRef.current}
        scrollWithAnimation
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            id={msg.id}
            className={`message-item ${msg.role === 'user' ? 'message-user' : 'message-assistant'}`}
          >
            {msg.role === 'assistant' && (
              <View className="avatar avatar-bot">
                <Bot size={20} color="#fff" />
              </View>
            )}
            <View className="message-content">
              <Text className="message-text">{msg.content}</Text>
            </View>
            {msg.role === 'user' && (
              <View className="avatar avatar-user">
                <User size={20} color="#fff" />
              </View>
            )}
          </View>
        ))}
        {isLoading && (
          <View className="message-item message-assistant">
            <View className="avatar avatar-bot">
              <Bot size={20} color="#fff" />
            </View>
            <View className="message-content">
              <Text className="message-text">正在思考中...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* 输入区域 */}
      <View className="input-area">
        <View className="input-wrapper">
          <Input
            className="message-input"
            placeholder="输入你的问题..."
            value={inputValue}
            onInput={(e) => setInputValue(e.detail.value)}
            onConfirm={handleSend}
            confirmType="send"
          />
          <View
            className={`send-btn ${inputValue.trim() && !isLoading ? 'active' : ''}`}
            onClick={handleSend}
          >
            <Send size={20} color={inputValue.trim() && !isLoading ? '#fff' : '#999'} />
          </View>
        </View>
      </View>
    </View>
  )
}

export default AiAssistantPage
