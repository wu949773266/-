import { useState, useEffect } from 'react'
import { View, Text, Input, Button, Textarea } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Network } from '@/network'
import { Plus, Trash2, ClipboardList, ChevronRight } from 'lucide-react-taro'
import './index.css'

interface Activity {
  id: number
  name: string
  date: string | null
  description: string | null
  is_active: boolean
  created_at: string
  admin_password?: string
}

interface Question {
  question_text: string
  question_type: 'rating' | 'single_choice' | 'multi_choice' | 'text'
  options?: string[]
  required?: boolean
}

export default function SurveyAdminPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordActivity, setPasswordActivity] = useState<Activity | null>(null)
  const [passwordInput, setPasswordInput] = useState('')
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  
  // 表单状态
  const [formName, setFormName] = useState('')
  const [formDate, setFormDate] = useState('')
  const [formDesc, setFormDesc] = useState('')
  
  // 问卷表单
  const [surveyTitle, setSurveyTitle] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    loadActivities()
  }, [])

  const loadActivities = async () => {
    try {
      setLoading(true)
      const res = await Network.request({
        url: '/api/activity-survey/activities',
        method: 'GET',
      })
      console.log('活动列表:', res)
      if (res.data?.data) {
        setActivities(res.data.data)
      }
    } catch (e) {
      console.error('加载活动失败:', e)
      Taro.showToast({ title: '加载失败', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateActivity = async () => {
    if (!formName.trim()) {
      Taro.showToast({ title: '请输入活动名称', icon: 'none' })
      return
    }
    try {
      const res = await Network.request({
        url: '/api/activity-survey/activity',
        method: 'POST',
        data: {
          name: formName.trim(),
          date: formDate || undefined,
          description: formDesc || undefined,
        },
      })
      if (res.data?.status === 'success') {
        Taro.showToast({ title: '创建成功', icon: 'success' })
        setShowModal(false)
        resetForm()
        loadActivities()
      }
    } catch (e) {
      console.error('创建失败:', e)
      Taro.showToast({ title: '创建失败', icon: 'none' })
    }
  }

  const handleDeleteActivity = async (id: number) => {
    Taro.showModal({
      title: '确认删除',
      content: '删除后无法恢复，确定要删除吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            await Network.request({
              url: `/api/activity-survey/activity/${id}`,
              method: 'DELETE',
            })
            Taro.showToast({ title: '删除成功', icon: 'success' })
            loadActivities()
          } catch (e) {
            Taro.showToast({ title: '删除失败', icon: 'none' })
          }
        }
      }
    })
  }

  const handleToggleActive = async (activity: Activity) => {
    try {
      await Network.request({
        url: `/api/activity-survey/activity/${activity.id}`,
        method: 'PUT',
        data: { is_active: !activity.is_active },
      })
      loadActivities()
    } catch (e) {
      Taro.showToast({ title: '操作失败', icon: 'none' })
    }
  }

  const handleSetupSurvey = async (activity: Activity) => {
    if (!activity.is_active) {
      Taro.showToast({ title: '请先启用活动', icon: 'none' })
      return
    }
    setSelectedActivity(activity)
    setSurveyTitle(`${activity.name} - 满意度调查`)
    setQuestions([
      { question_text: '您对本次活动的整体体验满意度如何？', question_type: 'rating', options: ['1分', '2分', '3分', '4分', '5分'], required: true },
      { question_text: '您对领队的服务满意吗？', question_type: 'rating', options: ['1分', '2分', '3分', '4分', '5分'], required: true },
      { question_text: '您有什么建议或想法？', question_type: 'text', required: false },
    ])
    setShowQuestionModal(true)
  }

  const handleSaveSurvey = async () => {
    if (!selectedActivity || !surveyTitle.trim()) {
      Taro.showToast({ title: '请填写问卷标题', icon: 'none' })
      return
    }
    try {
      // 创建问卷
      const surveyRes = await Network.request({
        url: '/api/activity-survey/survey',
        method: 'POST',
        data: {
          activityId: selectedActivity.id,
          title: surveyTitle.trim(),
        },
      })
      
      if (surveyRes.data?.data?.id) {
        const surveyId = surveyRes.data.data.id
        // 添加问题
        if (questions.length > 0) {
          await Network.request({
            url: '/api/activity-survey/questions',
            method: 'POST',
            data: {
              surveyId,
              questions: questions.map((q, index) => ({
                question_text: q.question_text,
                question_type: q.question_type,
                options: q.options || null,
                required: q.required ?? true,
                order_index: index,
              })),
            },
          })
        }
      }
      
      Taro.showToast({ title: '保存成功', icon: 'success' })
      setShowQuestionModal(false)
    } catch (e: any) {
      console.error('保存失败:', e)
      Taro.showToast({ title: e.message || '保存失败', icon: 'none' })
    }
  }

  const handleViewResponses = (activity: Activity) => {
    Taro.navigateTo({
      url: `/pages/survey-responses/index?activityId=${activity.id}&name=${encodeURIComponent(activity.name)}`
    })
  }

  const handleSetPassword = (activity: Activity) => {
    setPasswordActivity(activity)
    setPasswordInput('')
    setShowPasswordModal(true)
  }

  const handleSavePassword = async () => {
    if (!passwordActivity) return
    if (!passwordInput.trim() || passwordInput.trim().length < 6) {
      Taro.showToast({ title: '密码至少6位', icon: 'none' })
      return
    }
    try {
      await Network.request({
        url: `/api/activity-survey/activity/${passwordActivity.id}/password`,
        method: 'POST',
        data: { password: passwordInput.trim() },
      })
      Taro.showToast({ title: '密码设置成功', icon: 'success' })
      setShowPasswordModal(false)
      loadActivities()
    } catch (e) {
      Taro.showToast({ title: '设置失败', icon: 'none' })
    }
  }

  const resetForm = () => {
    setFormName('')
    setFormDate('')
    setFormDesc('')
  }

  const addQuestion = (type: 'single_choice' | 'multi_choice' | 'rating' | 'text' = 'rating') => {
    const templates: Record<string, any> = {
      single_choice: {
        question_text: '',
        question_type: 'single_choice',
        options: ['选项1', '选项2', '选项3'],
        required: true,
      },
      multi_choice: {
        question_text: '',
        question_type: 'multi_choice',
        options: ['选项1', '选项2', '选项3'],
        required: true,
      },
      rating: {
        question_text: '',
        question_type: 'rating',
        options: ['非常满意', '满意', '一般', '不满意'],
        required: true,
      },
      text: {
        question_text: '',
        question_type: 'text',
        required: false,
      },
    }
    setQuestions([...questions, templates[type]])
  }

  // 一键使用默认问卷模板
  const useDefaultTemplate = () => {
    setQuestions([
      {
        question_text: '您对本次活动的整体满意度如何？',
        question_type: 'rating',
        options: ['非常满意', '满意', '一般', '不满意'],
        required: true,
      },
      {
        question_text: '您对领队的服务满意吗？',
        question_type: 'rating',
        options: ['非常满意', '满意', '一般', '不满意'],
        required: true,
      },
      {
        question_text: '您有什么建议或想法？',
        question_type: 'text',
        required: false,
      },
    ])
  }

  const updateQuestion = (index: number, updates: Partial<Question>) => {
    const newQuestions = [...questions]
    newQuestions[index] = { ...newQuestions[index], ...updates }
    setQuestions(newQuestions)
  }

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  return (
    <View className="container">
      {/* 头部 */}
      <View className="header">
        <Text className="header-title">活动管理</Text>
        <Text className="header-desc">创建活动并设置问卷，发给团员填写</Text>
      </View>

      {/* 活动列表 */}
      <View className="list-section">
        <View className="section-header">
          <Text className="section-title">活动列表</Text>
          <Button className="add-btn" onClick={() => setShowModal(true)}>
            <Plus size={16} color="#fff" />
            <Text className="add-btn-text">新建活动</Text>
          </Button>
        </View>

        {loading ? (
          <View className="loading">
            <Text>加载中...</Text>
          </View>
        ) : activities.length === 0 ? (
          <View className="empty">
            <Text className="empty-text">暂无活动</Text>
            <Text className="empty-sub">点击上方按钮创建活动</Text>
          </View>
        ) : (
          activities.map((activity) => (
            <View key={activity.id} className="activity-card">
              <View className="activity-info">
                <View className="activity-header-row">
                  <Text className="activity-name">{activity.name}</Text>
                  <View 
                    className={`status-badge ${activity.is_active ? 'active' : 'inactive'}`}
                    onClick={() => handleToggleActive(activity)}
                  >
                    <Text>{activity.is_active ? '已启用' : '已禁用'}</Text>
                  </View>
                </View>
                {activity.date && (
                  <Text className="activity-date">{activity.date}</Text>
                )}
                {activity.description && (
                  <Text className="activity-desc">{activity.description}</Text>
                )}
              </View>
              <View className="activity-actions">
                <View 
                  className="action-btn"
                  onClick={() => handleSetupSurvey(activity)}
                >
                  <ClipboardList size={20} color="#2f6f4f" />
                  <Text className="action-text">设置问卷</Text>
                </View>
                <View 
                  className="action-btn"
                  onClick={() => handleViewResponses(activity)}
                >
                  <Text className="action-text">查看评价</Text>
                  <ChevronRight size={16} color="#999" />
                </View>
                <View 
                  className="action-btn"
                  onClick={() => handleSetPassword(activity)}
                >
                  <Text className="action-text text-sm">{activity.admin_password ? '改密码' : '设密码'}</Text>
                </View>
                <View 
                  className="action-btn delete"
                  onClick={() => handleDeleteActivity(activity.id)}
                >
                  <Trash2 size={18} color="#e74c3c" />
                </View>
              </View>
            </View>
          ))
        )}
      </View>

      {/* 创建活动弹窗 */}
      {showModal && (
        <View className="modal-overlay" onClick={() => setShowModal(false)}>
          <View className="modal" onClick={(e) => e.stopPropagation()}>
            <Text className="modal-title">新建活动</Text>
            <View className="form-item">
              <Text className="form-label">活动名称 *</Text>
              <Input
                className="form-input"
                placeholder="如：雨崩徒步第12期"
                value={formName}
                onInput={(e) => setFormName(e.detail.value)}
              />
            </View>
            <View className="form-item">
              <Text className="form-label">活动日期</Text>
              <Input
                className="form-input"
                placeholder="如：2024年5月1日"
                value={formDate}
                onInput={(e) => setFormDate(e.detail.value)}
              />
            </View>
            <View className="form-item">
              <Text className="form-label">备注</Text>
              <Textarea
                className="form-textarea"
                placeholder="可选填写备注信息"
                value={formDesc}
                onInput={(e) => setFormDesc(e.detail.value)}
              />
            </View>
            <View className="modal-actions">
              <Button className="cancel-btn" onClick={() => { setShowModal(false); resetForm() }}>
                取消
              </Button>
              <Button className="confirm-btn" onClick={handleCreateActivity}>
                创建
              </Button>
            </View>
          </View>
        </View>
      )}

      {/* 设置密码弹窗 */}
      {showPasswordModal && (
        <View className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <View className="modal" onClick={(e) => e.stopPropagation()}>
            <Text className="modal-title">设置管理密码</Text>
            <Text className="modal-subtitle">{passwordActivity?.name}</Text>
            <View className="form-item">
              <Text className="form-label">新密码（至少6位）</Text>
              <Input
                className="form-input"
                type={'password' as any}
                placeholder="请输入新密码"
                value={passwordInput}
                onInput={(e) => setPasswordInput(e.detail.value)}
              />
            </View>
            <View className="modal-actions">
              <Button className="cancel-btn" onClick={() => setShowPasswordModal(false)}>
                取消
              </Button>
              <Button className="confirm-btn" onClick={handleSavePassword}>
                保存
              </Button>
            </View>
          </View>
        </View>
      )}

      {/* 设置问卷弹窗 */}
      {showQuestionModal && (
        <View className="modal-overlay" onClick={() => setShowQuestionModal(false)}>
          <View className="modal survey-modal" onClick={(e) => e.stopPropagation()}>
            <Text className="modal-title">设置问卷</Text>
            <Text className="modal-subtitle">{selectedActivity?.name}</Text>
            
            <View className="form-item">
              <Text className="form-label">问卷标题 *</Text>
              <Input
                className="form-input"
                placeholder="如：满意度调查"
                value={surveyTitle}
                onInput={(e) => setSurveyTitle(e.detail.value)}
              />
            </View>

            <View className="questions-section">
              <View className="questions-header">
                <Text className="form-label">问题列表</Text>
              </View>

              {/* 快捷操作 */}
              <View className="quick-actions">
                <Button className="template-btn" onClick={useDefaultTemplate}>
                  使用默认问卷
                </Button>
                <View className="add-type-btns">
                  <Button className="type-add-btn" onClick={() => addQuestion('single_choice')}>+ 单选</Button>
                  <Button className="type-add-btn" onClick={() => addQuestion('multi_choice')}>+ 多选</Button>
                  <Button className="type-add-btn" onClick={() => addQuestion('rating')}>+ 评分</Button>
                  <Button className="type-add-btn" onClick={() => addQuestion('text')}>+ 文本</Button>
                </View>
              </View>
              
              {questions.length === 0 ? (
                <View className="empty-questions">
                  <Text className="empty-tip">点击上方按钮添加题目</Text>
                  <Text className="empty-tip-sub">或直接使用「默认问卷」快速创建</Text>
                </View>
              ) : (
                questions.map((q, index) => (
                  <View key={index} className="question-item">
                    <View className="question-header">
                      <Text className="question-num">Q{index + 1}</Text>
                      <View className="question-type-select">
                        <Text 
                          className={`type-tag ${q.question_type === 'single_choice' ? 'active' : ''}`}
                          onClick={() => updateQuestion(index, { question_type: 'single_choice', options: ['选项1', '选项2', '选项3'] })}
                        >
                          单选
                        </Text>
                        <Text 
                          className={`type-tag ${q.question_type === 'multi_choice' ? 'active' : ''}`}
                          onClick={() => updateQuestion(index, { question_type: 'multi_choice', options: ['选项1', '选项2', '选项3'] })}
                        >
                          多选
                        </Text>
                        <Text 
                          className={`type-tag ${q.question_type === 'rating' ? 'active' : ''}`}
                          onClick={() => updateQuestion(index, { question_type: 'rating', options: ['非常满意', '满意', '一般', '不满意'] })}
                        >
                          评分
                        </Text>
                        <Text 
                          className={`type-tag ${q.question_type === 'text' ? 'active' : ''}`}
                          onClick={() => updateQuestion(index, { question_type: 'text' })}
                        >
                          文本
                        </Text>
                      </View>
                      <Text className="remove-btn" onClick={() => removeQuestion(index)}>删除</Text>
                    </View>
                    <Input
                      className="question-input"
                      placeholder="输入问题内容"
                      value={q.question_text}
                      onInput={(e) => updateQuestion(index, { question_text: e.detail.value })}
                    />
                    {q.question_type !== 'text' && (
                      <View className="rating-options">
                        <Input
                          className="option-input"
                          placeholder="选项（逗号分隔），如: 非常满意,满意,一般,不满意"
                          value={(q.options || []).join(',')}
                          onInput={(e) => updateQuestion(index, { 
                            options: e.detail.value.split(',').map(s => s.trim()).filter(Boolean)
                          })}
                        />
                      </View>
                    )}
                    {/* 必答开关 */}
                    {q.question_type !== 'text' && (
                      <View className="required-row">
                        <Text 
                          className={`required-toggle ${q.required ? 'active' : ''}`}
                          onClick={() => updateQuestion(index, { required: !q.required })}
                        >
                          {q.required ? '✓ 必答' : '○ 选答'}
                        </Text>
                      </View>
                    )}
                  </View>
                ))
              )}
            </View>

            <View className="modal-actions">
              <Button className="cancel-btn" onClick={() => setShowQuestionModal(false)}>
                取消
              </Button>
              <Button className="confirm-btn" onClick={handleSaveSurvey}>
                保存问卷
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}
