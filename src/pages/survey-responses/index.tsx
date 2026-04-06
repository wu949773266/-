import { useState, useEffect } from 'react'
import { View, Text, ScrollView, Input, Button } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { Network } from '@/network'
import { ChartBarBig, MessageSquare, Lock } from 'lucide-react-taro'
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

interface MyResponse {
  id: number
  answers: Record<string, any>
  created_at: string
}

export default function SurveyResponsesPage() {
  const router = useRouter()
  const activityId = router.params.activityId
  const activityName = decodeURIComponent(router.params.name || '')

  const [responses, setResponses] = useState<Response[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'stats' | 'list'>('stats')
  
  // 管理员密码
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authError, setAuthError] = useState('')
  
  // 查询码
  const [queryCode, setQueryCode] = useState('')
  const [myResponse, setMyResponse] = useState<MyResponse | null>(null)
  const [showQueryModal, setShowQueryModal] = useState(false)

  useEffect(() => {
    // 检查是否已保存的密码
    const savedPassword = Taro.getStorageSync('survey_admin_pwd_' + activityId)
    if (savedPassword) {
      setPassword(savedPassword)
      handleAuth(savedPassword)
    }
  }, [activityId])

  const handleAuth = async (pwd: string) => {
    try {
      setLoading(true)
      setAuthError('')
      const res = await Network.request({
        url: `/api/activity-survey/stats/activity/${activityId}?password=${encodeURIComponent(pwd)}`,
        method: 'GET',
      })
      console.log('验证结果:', res)
      if (res.data?.status === 'success') {
        setIsAuthenticated(true)
        setStats(res.data.data)
        Taro.setStorageSync('survey_admin_pwd_' + activityId, pwd)
        // 同时获取列表数据
        loadResponses(pwd)
      } else {
        setAuthError(res.data?.message || '密码错误')
      }
    } catch (e: any) {
      console.error('验证失败:', e)
      setAuthError('验证失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const loadResponses = async (pwd: string) => {
    try {
      const res = await Network.request({
        url: `/api/activity-survey/responses/activity/${activityId}?password=${encodeURIComponent(pwd)}`,
        method: 'GET',
      })
      console.log('回答列表:', res)
      if (res.data?.data) {
        setResponses(res.data.data)
      }
    } catch (e) {
      console.error('加载回答失败:', e)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword('')
    setStats(null)
    setResponses([])
    Taro.removeStorageSync('survey_admin_pwd_' + activityId)
  }

  const handleQueryMyResponse = async () => {
    if (!queryCode.trim()) {
      Taro.showToast({ title: '请输入查询码', icon: 'none' })
      return
    }
    try {
      const res = await Network.request({
        url: `/api/activity-survey/my-response?activityId=${activityId}&code=${encodeURIComponent(queryCode.trim())}`,
        method: 'GET',
      })
      console.log('我的回答:', res)
      if (res.data?.status === 'success' && res.data?.data) {
        setMyResponse(res.data.data)
        setShowQueryModal(false)
        Taro.showToast({ title: '查询成功', icon: 'success' })
      } else {
        Taro.showToast({ title: res.data?.message || '未找到', icon: 'none' })
      }
    } catch (e) {
      Taro.showToast({ title: '查询失败', icon: 'none' })
    }
  }

  const renderRatingBar = (value: number, max: number = 4) => {
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
                    <Text className="score-max">/{qStats.count}人</Text>
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

  // 未登录界面
  if (!isAuthenticated) {
    return (
      <View className="container">
        <View className="header">
          <Text className="header-title">{activityName}</Text>
          <Text className="header-sub">评价数据</Text>
        </View>

        <View className="auth-section">
          <Lock size={48} color="#2f6f4f" />
          <Text className="auth-title">管理员验证</Text>
          <Text className="auth-desc">请输入管理员密码查看评价数据</Text>
          
          <View className="auth-input-wrapper">
            <Input
              className="auth-input"
              type={'password' as any}
              placeholder="请输入管理员密码"
              value={password}
              onInput={(e) => setPassword(e.detail.value)}
            />
          </View>
          
          {authError && <Text className="auth-error">{authError}</Text>}
          
          <Button 
            className="auth-btn" 
            onClick={() => handleAuth(password)}
            loading={loading}
          >
            验证
          </Button>
          
          <Button 
            className="query-btn"
            onClick={() => setShowQueryModal(true)}
          >
            查询我的回答
          </Button>
        </View>

        {/* 查询我的回答弹窗 */}
        {showQueryModal && (
          <View className="modal-overlay" onClick={() => setShowQueryModal(false)}>
            <View className="modal" onClick={(e) => e.stopPropagation()}>
              <Text className="modal-title">查询我的回答</Text>
              <Text className="modal-desc">请输入提交后获得的查询码</Text>
              <Input
                className="modal-input"
                placeholder="请输入查询码"
                value={queryCode}
                onInput={(e) => setQueryCode(e.detail.value)}
              />
              <View className="modal-actions">
                <Button className="cancel-btn" onClick={() => setShowQueryModal(false)}>取消</Button>
                <Button className="confirm-btn" onClick={handleQueryMyResponse}>查询</Button>
              </View>
            </View>
          </View>
        )}

        {/* 显示我的回答 */}
        {myResponse && (
          <View className="modal-overlay" onClick={() => setMyResponse(null)}>
            <View className="modal" onClick={(e) => e.stopPropagation()}>
              <Text className="modal-title">我的回答</Text>
              <View className="my-response-content">
                {Object.entries(myResponse.answers).map(([qId, answer]) => (
                  <View key={qId} className="my-answer-item">
                    <Text className="my-answer-text">{String(answer)}</Text>
                  </View>
                ))}
              </View>
              <Text className="my-time">
                提交时间: {new Date(myResponse.created_at).toLocaleString('zh-CN')}
              </Text>
              <Button className="confirm-btn" onClick={() => setMyResponse(null)}>关闭</Button>
            </View>
          </View>
        )}
      </View>
    )
  }

  return (
    <View className="container">
      {/* 头部 */}
      <View className="header">
        <View className="header-row">
          <View>
            <Text className="header-title">{activityName}</Text>
            <Text className="header-sub">评价数据</Text>
          </View>
          <Button className="logout-btn" onClick={handleLogout}>退出</Button>
        </View>
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
