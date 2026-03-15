import { View, Text, Textarea, ScrollView } from '@tarojs/components'
import Taro, { useReady } from '@tarojs/taro'
import { useState, useRef } from 'react'
import type { FC } from 'react'
import { Network } from '@/network'
import { Send, Bot, User, Mountain, Sparkles } from 'lucide-react-taro'
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
  const scrollTop = useRef(0)

  // 滚动到底部
  useReady(() => {
    scrollToBottom()
  })

  const scrollToBottom = () => {
    scrollTop.current = 99999
  }

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
    scrollToBottom()

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
        scrollToBottom()
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

  // 快捷问题
  const quickQuestions = [
    '虎跳峡需要什么装备？',
    '雨崩徒步几天合适？',
    '哪个线路适合新手？'
  ]

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
  }

  return (
    <View className="ai-page">
      {/* 头部 */}
      <View className="ai-header">
        <View className="header-bg" />
        <View className="header-content">
          <View className="header-icon">
            <Mountain size={24} color="#fff" />
          </View>
          <View className="header-text">
            <Text className="header-title">AI 徒步助手</Text>
            <Text className="header-subtitle">山渡户外智能客服</Text>
          </View>
        </View>
      </View>

      {/* 消息列表 */}
      <ScrollView
        className="message-list"
        scrollY
        scrollTop={scrollTop.current}
        scrollWithAnimation
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            className={`msg-wrap ${msg.role === 'user' ? 'msg-user' : 'msg-bot'}`}
          >
            {msg.role === 'assistant' && (
              <View className="avatar bot-avatar">
                <Bot size={18} color="#fff" />
              </View>
            )}
            <View className={`msg-bubble ${msg.role === 'user' ? 'bubble-user' : 'bubble-bot'}`}>
              <Text className="msg-text">{msg.content}</Text>
            </View>
            {msg.role === 'user' && (
              <View className="avatar user-avatar">
                <User size={18} color="#fff" />
              </View>
            )}
          </View>
        ))}
        
        {isLoading && (
          <View className="msg-wrap msg-bot">
            <View className="avatar bot-avatar">
              <Bot size={18} color="#fff" />
            </View>
            <View className="msg-bubble bubble-bot">
              <View className="typing-indicator">
                <View className="dot" />
                <View className="dot" />
                <View className="dot" />
              </View>
            </View>
          </View>
        )}

        <View style={{ height: '20px' }} />
      </ScrollView>

      {/* 快捷问题 */}
      {messages.length === 1 && (
        <View className="quick-questions">
          <View className="quick-title">
            <Sparkles size={14} color="#2f6f4f" />
            <Text className="quick-title-text">试试问我</Text>
          </View>
          <View className="quick-list">
            {quickQuestions.map((q, i) => (
              <View
                key={i}
                className="quick-item"
                onClick={() => handleQuickQuestion(q)}
              >
                <Text className="quick-item-text">{q}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* 输入区域 */}
      <View className="input-area">
        <View className="input-box">
          <Textarea
            className="input-field"
            placeholder="输入你的问题..."
            value={inputValue}
            onInput={(e) => setInputValue(e.detail.value)}
            autoHeight
            maxlength={500}
            showCount={false}
            cursorSpacing={20}
          />
          <View
            className={`send-btn ${inputValue.trim() && !isLoading ? 'can-send' : ''}`}
            onClick={handleSend}
          >
            <Send size={18} color={inputValue.trim() && !isLoading ? '#fff' : '#bbb'} />
          </View>
        </View>
        <View className="input-safe" />
      </View>
    </View>
  )
}

export default AiAssistantPage
