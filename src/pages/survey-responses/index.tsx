import { useState, useEffect } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { Network } from '@/network'
import { ChartBarBig, MessageSquare } from 'lucide-react-taro'
import './index.css'

interface Response {
  id: number
  survey_id: number
  answers: Record<string, any>
  created_at: string
}

interface Stats {
  activity_name: string
  survey_title: string
  total_responses: number
  question_stats: Record<string, {
    question_text: string
    type: string
    average?: number
    count?: number
    options?: Record<string, number>
    total?: number
    responses?: string[]
  }>
}

export default function SurveyResponsesPage() {
  const router = useRouter()
  const activityId = router.params.activityId
  const activityName = decodeURIComponent(router.params.name || '')

  const [responses, setResponses] = useState<Response[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'stats' | 'list'>('stats')

  useEffect(() => {
    loadData()
  }, [activityId])

  const loadData = async () => {
    try {
      setLoading(true)
      // 并行加载统计数据和回答列表
      const [statsRes, responsesRes] = await Promise.all([
        Network.request({
          url: `/api/activity-survey/stats/activity/${activityId}`,
          method: 'GET',
        }),
        Network.request({
          url: `/api/activity-survey/responses/activity/${activityId}`,
          method: 'GET',
        }),
      ])

      console.log('统计数据:', statsRes)
      console.log('回答列表:', responsesRes)

      if (statsRes.data?.data) {
        setStats(statsRes.data.data)
      }
      if (responsesRes.data?.data) {
        setResponses(responsesRes.data.data)
      }
    } catch (e) {
      console.error('加载数据失败:', e)
      Taro.showToast({ title: '加载失败', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  const renderRatingBar = (value: number, max: number = 5) => {
    const percentage = (value / max) * 100
    return (
      <View className="rating-bar-container">
        <View className="rating-bar" style={{ width: `${percentage}%` }} />
      </View>
    )
  }

  const renderStats = () => {
    if (!stats) return null

    return (
      <View className="stats-content">
        <View className="total-card">
          <Text className="total-num">{stats.total_responses}</Text>
          <Text className="total-label">总评价数</Text>
        </View>

        <View className="questions-stats">
          {Object.entries(stats.question_stats).map(([qId, qStats]) => (
            <View key={qId} className="question-stat-card">
              <Text className="q-stat-text">{qStats.question_text}</Text>
              
              {qStats.type === 'rating' && (
                <View className="rating-stat">
                  <View className="rating-score">
                    <Text className="score-num">{qStats.average}</Text>
                    <Text className="score-max">/{qStats.count}人评分</Text>
                  </View>
                  {renderRatingBar(qStats.average || 0)}
                </View>
              )}

              {(qStats.type === 'single_choice' || qStats.type === 'multi_choice') && qStats.options && (
                <View className="options-stat">
                  {Object.entries(qStats.options).map(([option, count]) => (
                    <View key={option} className="option-row">
                      <Text className="option-name">{option}</Text>
                      <View className="option-bar-container">
                        <View 
                          className="option-bar" 
                          style={{ width: `${(count / (qStats.total || 1)) * 100}%` }} 
                        />
                      </View>
                      <Text className="option-count">{count}人</Text>
                    </View>
                  ))}
                </View>
              )}

              {qStats.type === 'text' && qStats.responses && (
                <View className="text-responses">
                  {qStats.responses.map((resp, i) => (
                    <View key={i} className="text-item">
                      <Text className="text-content">{resp}</Text>
                    </View>
                  ))}
                  {qStats.responses.length === 0 && (
                    <Text className="no-text">暂无文本回复</Text>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    )
  }

  const renderList = () => {
    if (responses.length === 0) {
      return (
        <View className="empty-list">
          <Text className="empty-text">暂无评价</Text>
        </View>
      )
    }

    return (
      <View className="list-content">
        {responses.map((response, index) => (
          <View key={response.id} className="response-card">
            <View className="response-header">
              <Text className="response-num">#{index + 1}</Text>
              <Text className="response-time">
                {new Date(response.created_at).toLocaleString('zh-CN')}
              </Text>
            </View>
            <View className="response-answers">
              {Object.entries(response.answers).map(([qId, answer]) => (
                <View key={qId} className="answer-item">
                  <Text className="answer-text">
                    {String(answer)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    )
  }

  return (
    <View className="container">
      {/* 头部 */}
      <View className="header">
        <Text className="header-title">{activityName}</Text>
        <Text className="header-sub">评价数据</Text>
      </View>

      {/* Tab切换 */}
      <View className="tab-bar">
        <View 
          className={`tab-item ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          <ChartBarBig size={18} />
          <Text>统计</Text>
        </View>
        <View 
          className={`tab-item ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          <MessageSquare size={18} />
          <Text>原始数据</Text>
        </View>
      </View>

      {/* 内容 */}
      <ScrollView scrollY className="content" enableBackToTop>
        {loading ? (
          <View className="loading">
            <Text>加载中...</Text>
          </View>
        ) : (
          activeTab === 'stats' ? renderStats() : renderList()
        )}
      </ScrollView>
    </View>
  )
}
