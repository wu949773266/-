import { View, Text, ScrollView, Input, Button } from '@tarojs/components'
import { useState, useRef, useEffect } from 'react'
import type { FC } from 'react'
import { Send, Bot, User } from 'lucide-react-taro'
import { Network } from '@/network'
import './index.css'

interface Message {
  id: number
  role: 'user' | 'ai'
  content: string
  timestamp: number
}

const ChatPage: FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'ai',
      content: '您好！我是山渡户外助手，有什么可以帮您的吗？您可以问我关于徒步路线、私人订制、出行注意事项等问题。',
      timestamp: Date.now()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollViewRef = useRef<any>(null)

  // 滚动到底部
  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        scrollTop: 99999,
        duration: 300
      })
    }, 100)
  }

  // 初始化时滚动到底部
  useEffect(() => {
    scrollToBottom()
  }, [])

  // 发送消息
  const handleSend = async () => {
    const text = inputText.trim()
    if (!text || loading) return

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: text,
      timestamp: Date.now()
    }
    setMessages(prev => [...prev, userMessage])
    setInputText('')
    scrollToBottom()

    // 显示加载状态
    setLoading(true)

    try {
      // 调用后端接口
      const response = await Network.request({
        url: '/api/ai/chat',
        method: 'POST',
        data: {
          message: text,
          history: messages.slice(-5) // 保留最近5条历史消息
        }
      })

      // 添加 AI 消息
      const aiMessage: Message = {
        id: Date.now() + 1,
        role: 'ai',
        content: response.data.reply || '抱歉，我暂时无法回答这个问题。您可以查看联系页面咨询我们的工作人员。',
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, aiMessage])
      scrollToBottom()
    } catch (error) {
      console.error('AI chat error:', error)

      // 添加错误消息
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: 'ai',
        content: '抱歉，服务暂时不可用。您可以稍后再试，或通过联系页面咨询我们。',
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, errorMessage])
      scrollToBottom()
    } finally {
      setLoading(false)
    }
  }

  // 输入框回车发送
  const handleConfirm = (e: any) => {
    if (e.detail.value) {
      handleSend()
    }
  }

  return (
    <View className="chat-page">
      {/* 消息列表 */}
      <ScrollView
        className="message-list"
        scrollY
        ref={scrollViewRef}
        enhanced
        showScrollbar={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            className={`message-item message-${message.role}`}
          >
            <View className="message-avatar">
              {message.role === 'ai' ? (
                <Bot size={20} color="#2f6f4f" />
              ) : (
                <User size={20} color="#666666" />
              )}
            </View>
            <View className="message-content">
              <Text className="message-text">{message.content}</Text>
            </View>
          </View>
        ))}

        {/* 加载状态 */}
        {loading && (
          <View className="message-item message-ai">
            <View className="message-avatar">
              <Bot size={20} color="#2f6f4f" />
            </View>
            <View className="message-content message-loading">
              <Text className="loading-text">AI 正在思考...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* 输入框 */}
      <View className="input-bar">
        <View className="input-wrapper">
          <Input
            className="message-input"
            placeholder="输入您的问题..."
            value={inputText}
            onInput={(e) => setInputText(e.detail.value)}
            onConfirm={handleConfirm}
            confirmType="send"
            disabled={loading}
          />
          <Button
            className={`send-button ${!inputText.trim() || loading ? 'disabled' : ''}`}
            onClick={handleSend}
            disabled={!inputText.trim() || loading}
          >
            <Send size={20} color="#ffffff" />
          </Button>
        </View>
      </View>
    </View>
  )
}

export default ChatPage
