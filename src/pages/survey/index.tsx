import { useState, useEffect } from 'react'
import { View, Text, Input, Radio, RadioGroup, Checkbox, CheckboxGroup, Button, Textarea } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Network } from '@/network'
import './index.css'

interface Question {
  id: number
  question_text: string
  question_type: 'rating' | 'single_choice' | 'multi_choice' | 'text'
  options: string[] | null
  required: boolean
}

interface Survey {
  id: number
  title: string
  description: string
  questions: Question[]
}

export default function SurveyPage() {
  const [survey, setSurvey] = useState<Survey | null>(null)
  const [userName, setUserName] = useState('')
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // 获取用户昵称
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await Taro.getUserProfile({
          desc: '用于填写问卷调查',
        })
        if (res.userInfo?.nickName) {
          setUserName(res.userInfo.nickName)
        }
      } catch (e) {
        console.log('获取用户信息失败，使用默认昵称')
      }
    }
    getUserInfo()
  }, [])

  // 加载问卷
  useEffect(() => {
    loadSurvey()
  }, [])

  const loadSurvey = async () => {
    try {
      setLoading(true)
      const res = await Network.request({
        url: '/api/survey',
        method: 'GET',
      })
      console.log('获取问卷:', res)
      if (res.data?.data) {
        setSurvey(res.data.data)
      }
    } catch (e) {
      console.error('加载问卷失败:', e)
      Taro.showToast({ title: '加载问卷失败', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = (questionId: number | string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [String(questionId)]: value,
    }))
  }

  const validateForm = (): boolean => {
    if (!survey) return false
    for (const q of survey.questions) {
      if (q.required) {
        const answer = answers[String(q.id)]
        if (answer === undefined || answer === '' || answer === null) {
          Taro.showToast({
            title: `请回答: ${q.question_text}`,
            icon: 'none',
          })
          return false
        }
        if (Array.isArray(answer) && answer.length === 0) {
          Taro.showToast({
            title: `请回答: ${q.question_text}`,
            icon: 'none',
          })
          return false
        }
      }
    }
    return true
  }

  const handleSubmit = async () => {
    if (!userName.trim()) {
      Taro.showToast({ title: '请输入您的称呼', icon: 'none' })
      return
    }
    if (!validateForm()) return

    try {
      setSubmitting(true)
      const res = await Network.request({
        url: '/api/survey/response',
        method: 'POST',
        data: {
          userName: userName.trim(),
          answers,
        },
      })
      console.log('提交评价:', res)
      if (res.data?.status === 'success') {
        setSubmitted(true)
        Taro.showToast({ title: '提交成功，感谢您的反馈！', icon: 'success' })
      } else {
        Taro.showToast({ title: res.data?.message || '提交失败', icon: 'none' })
      }
    } catch (e) {
      console.error('提交失败:', e)
      Taro.showToast({ title: '提交失败，请重试', icon: 'none' })
    } finally {
      setSubmitting(false)
    }
  }

  const renderRating = (question: Question) => {
    const currentValue = answers[String(question.id)] || 0
    const options = question.options || ['1分', '2分', '3分', '4分', '5分']

    return (
      <View className="rating-container">
        {options.map((opt, index) => {
          const score = index + 1
          const isSelected = currentValue === score
          return (
            <View
              key={index}
              className={`rating-item ${isSelected ? 'selected' : ''}`}
              onClick={() => handleAnswer(question.id, score)}
            >
              <Text className="rating-score">{score}</Text>
              <Text className="rating-label">{opt}</Text>
            </View>
          )
        })}
      </View>
    )
  }

  const renderSingleChoice = (question: Question) => {
    const options = question.options || []
    const currentValue = answers[String(question.id)] || ''

    return (
      <RadioGroup onChange={(e) => handleAnswer(question.id, e.detail.value)}>
        <View className="choice-list">
          {options.map((opt, index) => (
            <View key={index} className="choice-item">
              <Radio
                value={opt}
                checked={currentValue === opt}
                color="#2f6f4f"
              />
              <Text className="choice-text ml-2">{opt}</Text>
            </View>
          ))}
        </View>
      </RadioGroup>
    )
  }

  const renderMultiChoice = (question: Question) => {
    const options = question.options || []
    const currentValue = answers[String(question.id)] || []

    return (
      <CheckboxGroup onChange={(e) => handleAnswer(question.id, e.detail.value)}>
        <View className="choice-list">
          {options.map((opt, index) => (
            <View key={index} className="choice-item">
              <Checkbox
                value={opt}
                checked={currentValue.includes(opt)}
                color="#2f6f4f"
              />
              <Text className="choice-text ml-2">{opt}</Text>
            </View>
          ))}
        </View>
      </CheckboxGroup>
    )
  }

  const renderText = (question: Question) => {
    return (
      <View className="text-input-wrapper">
        <Textarea
          className="text-input"
          placeholder={`请输入您的${question.question_text.replace(/^您/, '')}`}
          value={answers[String(question.id)] || ''}
          onInput={(e) => handleAnswer(question.id, e.detail.value)}
          maxlength={500}
        />
      </View>
    )
  }

  const renderQuestion = (question: Question, index: number) => {
    return (
      <View key={question.id} className="question-card">
        <View className="question-header">
          <Text className="question-number">Q{index + 1}</Text>
          <Text className="question-text">{question.question_text}</Text>
          {question.required && <Text className="required-mark">*</Text>}
        </View>
        <View className="question-body">
          {question.question_type === 'rating' && renderRating(question)}
          {question.question_type === 'single_choice' && renderSingleChoice(question)}
          {question.question_type === 'multi_choice' && renderMultiChoice(question)}
          {question.question_type === 'text' && renderText(question)}
        </View>
      </View>
    )
  }

  if (loading) {
    return (
      <View className="container loading-container">
        <Text className="loading-text">加载中...</Text>
      </View>
    )
  }

  if (!survey) {
    return (
      <View className="container empty-container">
        <Text className="empty-text">暂无问卷</Text>
        <Text className="empty-subtext">敬请期待后续活动</Text>
        <Button className="back-btn" onClick={() => Taro.navigateBack()}>
          返回首页
        </Button>
      </View>
    )
  }

  if (submitted) {
    return (
      <View className="container success-container">
        <View className="success-icon">✓</View>
        <Text className="success-title">提交成功</Text>
        <Text className="success-text">感谢您的反馈，我们将不断改进</Text>
        <Button className="back-btn" onClick={() => Taro.navigateBack()}>
          返回首页
        </Button>
      </View>
    )
  }

  return (
    <View className="container">
      <View className="survey-header">
        <Text className="survey-title">{survey.title}</Text>
        {survey.description && (
          <Text className="survey-desc">{survey.description}</Text>
        )}
      </View>

      <View className="user-name-section">
        <Text className="section-label">您的称呼</Text>
        <View className="name-input-wrapper">
          <Input
            className="name-input"
            placeholder="请输入您的称呼（用于统计分析）"
            value={userName}
            onInput={(e) => setUserName(e.detail.value)}
            maxlength={20}
          />
        </View>
      </View>

      <View className="questions-section">
        <Text className="section-label">问卷内容</Text>
        {survey.questions.map((q, index) => renderQuestion(q, index))}
      </View>

      <View className="submit-section">
        <Button
          className="submit-btn"
          onClick={handleSubmit}
          loading={submitting}
          disabled={submitting}
        >
          {submitting ? '提交中...' : '提交评价'}
        </Button>
      </View>
    </View>
  )
}
