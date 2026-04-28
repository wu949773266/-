const questions = [
  {
    id: 'q1',
    axis: 'EI',
    title: '刚到徒步集合点，你更自然的状态是？',
    options: [
      { text: '主动认识队友，先把气氛热起来', side: 'E' },
      { text: '安静观察队伍节奏，等熟悉后再打开话匣子', side: 'I' }
    ]
  },
  {
    id: 'q2',
    axis: 'SN',
    title: '看一条新路线时，你第一眼会关注？',
    options: [
      { text: '爬升、补给点、路况、天气窗口', side: 'S' },
      { text: '这条线的故事感、风景变化和探索感', side: 'N' }
    ]
  },
  {
    id: 'q3',
    axis: 'TF',
    title: '队友明显体力掉线，你通常会？',
    options: [
      { text: '先判断距离、海拔和撤退方案，再分配负重', side: 'T' },
      { text: '先稳住对方情绪，陪他把节奏找回来', side: 'F' }
    ]
  },
  {
    id: 'q4',
    axis: 'JP',
    title: '你理想中的周末徒步更像？',
    options: [
      { text: '路线、时间、装备清单提前确认', side: 'J' },
      { text: '大方向定好，现场根据状态和天气调整', side: 'P' }
    ]
  },
  {
    id: 'q5',
    axis: 'EI',
    title: '走到风景很炸的垭口时，你会？',
    options: [
      { text: '招呼大家拍照、欢呼、分享当下', side: 'E' },
      { text: '先自己站一会儿，把这一刻收进心里', side: 'I' }
    ]
  },
  {
    id: 'q6',
    axis: 'SN',
    title: '准备装备时，你更相信？',
    options: [
      { text: '经过验证的清单和真实使用反馈', side: 'S' },
      { text: '轻量化思路、新装备组合和自己的改法', side: 'N' }
    ]
  },
  {
    id: 'q7',
    axis: 'TF',
    title: '队伍对是否继续冲顶意见不一，你会倾向？',
    options: [
      { text: '用天气、时间和体能数据做决策', side: 'T' },
      { text: '照顾多数人的安全感和体验完整度', side: 'F' }
    ]
  },
  {
    id: 'q8',
    axis: 'JP',
    title: '遇到临时封路，你的第一反应是？',
    options: [
      { text: '立刻查备用路线，重新安排节点', side: 'J' },
      { text: '把它当成支线剧情，边走边找新玩法', side: 'P' }
    ]
  },
  {
    id: 'q9',
    axis: 'EI',
    title: '长距离徒步中，你恢复能量的方式是？',
    options: [
      { text: '和队友聊天、互相打气、交换零食', side: 'E' },
      { text: '保持自己的步频，听风声和脚步声', side: 'I' }
    ]
  },
  {
    id: 'q10',
    axis: 'SN',
    title: '你最容易被哪种路线吸引？',
    options: [
      { text: '成熟、安全、信息充分的经典路线', side: 'S' },
      { text: '小众、变化大、带一点未知感的路线', side: 'N' }
    ]
  },
  {
    id: 'q11',
    axis: 'TF',
    title: '复盘一次徒步，你更在意？',
    options: [
      { text: '配速、装备、补给和决策有没有优化空间', side: 'T' },
      { text: '队伍氛围、彼此照应和记忆点够不够好', side: 'F' }
    ]
  },
  {
    id: 'q12',
    axis: 'JP',
    title: '你的背包状态更接近？',
    options: [
      { text: '分区清楚，常用物品固定位置', side: 'J' },
      { text: '核心装备齐就行，其他看当天灵感', side: 'P' }
    ]
  }
];

const results = {
  ISTJ: {
    name: '山径守序官',
    role: '可靠领队 / 行程管家',
    summary: '你是队伍里的稳定器，擅长把路线、天气、装备和时间拆成可执行的计划。',
    route: '成熟长线、海拔变化明确、补给信息完整的路线',
    strength: '纪律感强、风险意识高、靠谱到让人安心',
    watch: '别让计划感压过体验感，给队友留一点自由呼吸的空间。',
    gear: '离线地图、头灯备电、急救包、分层收纳袋'
  },
  ISFJ: {
    name: '林间照护者',
    role: '后勤照应 / 氛围稳定器',
    summary: '你会记得谁怕冷、谁需要补糖，也会在别人还没开口前递上帮助。',
    route: '风景温柔、强度适中、适合慢慢走的森林或湖泊路线',
    strength: '细腻、耐心、照顾团队体验',
    watch: '不要把所有人的状态都扛到自己身上，你也需要被照顾。',
    gear: '能量胶、保温层、创可贴、分享装零食'
  },
  INFJ: {
    name: '秘境叙事者',
    role: '路线策划 / 深度体验官',
    summary: '你寻找的不只是风景，而是一条路线背后的情绪、故事和抵达感。',
    route: '寺庙古道、雪山转山、带文化线索的目的地',
    strength: '洞察队伍情绪，能把一次徒步变成一次有意义的旅程',
    watch: '理想路线也要落到天气、交通和体能上。',
    gear: '轻便相机、防水笔记本、稳定保暖层'
  },
  INTJ: {
    name: '高线战略家',
    role: '路线架构师 / 风险推演师',
    summary: '你喜欢从地图上搭建一套完整方案，预判变量，再优雅地完成它。',
    route: '多日穿越、高海拔路线、需要策略规划的高线徒步',
    strength: '判断冷静、目标清晰、擅长备用方案',
    watch: '不是所有队友都能跟上你的脑内推演，关键节点要说出来。',
    gear: '卫星通信设备、GPS 轨迹、轻量化系统装备'
  },
  ISTP: {
    name: '岩壁实干家',
    role: '技术担当 / 现场修复师',
    summary: '你不爱废话，但遇到装备故障、复杂地形和突发状况时会立刻上线。',
    route: '碎石坡、岩线、溯溪、需要动手能力的路线',
    strength: '冷静、灵活、解决实际问题很快',
    watch: '你觉得简单的操作，别人可能需要明确提醒。',
    gear: '多功能工具、手套、绳环、耐磨外壳'
  },
  ISFP: {
    name: '风景采集师',
    role: '美感发现者 / 慢行体验官',
    summary: '你对光线、植物、溪流和风的变化特别敏感，能发现别人错过的美。',
    route: '花海、湖泊、森林、季节变化明显的路线',
    strength: '审美在线、节奏柔软、很会享受当下',
    watch: '沉浸拍照时别忘了队伍距离和返程时间。',
    gear: '轻相机、防晒帽、坐垫、色彩舒服的功能外套'
  },
  INFP: {
    name: '旷野理想派',
    role: '精神补给员 / 小众路线收藏家',
    summary: '你会被远方、孤独感和自由吸引，徒步对你像一次自我校准。',
    route: '人少、有留白、适合独处思考的山谷或草甸路线',
    strength: '共情力强，能给队伍带来温柔而坚定的能量',
    watch: '浪漫很珍贵，但安全边界要提前写清楚。',
    gear: '防水外套、轻量热饮杯、纸质地图、舒适中帮鞋'
  },
  INTP: {
    name: '地形研究员',
    role: '信息分析 / 装备实验室',
    summary: '你享受研究路线数据、装备参数和奇怪但有效的轻量化方案。',
    route: '地貌复杂、信息可挖、适合验证想法的路线',
    strength: '分析深入，能找到别人没注意到的变量',
    watch: '别在出发前一晚还沉迷优化，够用有时比完美更重要。',
    gear: '轨迹软件、轻量炉具、模块化收纳、实验型小装备'
  },
  ESTP: {
    name: '山野冲锋手',
    role: '开路先锋 / 现场气氛组',
    summary: '你行动快、胆子大，喜欢把路线走出速度、爽感和一点挑战。',
    route: '攀爬感强、节奏紧凑、反馈直接的路线',
    strength: '反应快、执行力强、能带动队伍士气',
    watch: '兴奋时更要守住天气、落石和队友体能的红线。',
    gear: '抓地力强的鞋、速干层、运动相机、应急毯'
  },
  ESFP: {
    name: '营地快乐发生器',
    role: '体验制造者 / 队伍能量源',
    summary: '只要有你在，休息点也能变成小型庆祝现场。',
    route: '风景出片、营地舒适、适合朋友同行的路线',
    strength: '感染力强，擅长把疲惫变成好玩的记忆',
    watch: '开心之外，也要尊重安静队友的恢复节奏。',
    gear: '轻便野餐垫、分享零食、防晒装备、好看的头巾'
  },
  ENFP: {
    name: '岔路探险家',
    role: '灵感发动机 / 新路线发现者',
    summary: '你总能提出"要不要去看看那边"，让一次徒步长出新的故事。',
    route: '小众、自由度高、能临时发现惊喜的路线',
    strength: '热情、有创造力，让队伍保持新鲜感',
    watch: '发散之前先确认返程时间和安全边界。',
    gear: '大容量充电宝、轻雨衣、地图标记工具、备用袜'
  },
  ENTP: {
    name: '越野点子王',
    role: '玩法设计 / 方案挑战者',
    summary: '你喜欢打破常规路线，把徒步设计成一场有趣的策略游戏。',
    route: '可组合、多分支、有探索空间的路线',
    strength: '脑洞大、应变快，能让普通路线变得有意思',
    watch: '别为了好玩低估路线难度，队伍共识比赢更重要。',
    gear: '离线地图、多用途头巾、轻量背包、备用导航'
  },
  ESTJ: {
    name: '山队总指挥',
    role: '领队 / 节奏控制者',
    summary: '你擅长组织人、定规则、控时间，是队伍顺利完成路线的关键人物。',
    route: '目标明确、强度可控、适合团队协作完成的路线',
    strength: '执行力强、责任感足、能把混乱变成秩序',
    watch: '效率之外，也给队友一点表达感受的时间。',
    gear: '对讲机、行程表、急救包、备用能量补给'
  },
  ESFJ: {
    name: '山野召集人',
    role: '组局达人 / 团队照明灯',
    summary: '你会把人聚起来，也会让每个人在队伍里感到被欢迎。',
    route: '交通便利、补给友好、适合多人轻徒步的路线',
    strength: '组织温暖，擅长照顾团队关系',
    watch: '别为了照顾所有人，把路线选得失去你自己的期待。',
    gear: '共享药包、拍照支架、保温杯、多人份湿巾'
  },
  ENFJ: {
    name: '远山带队者',
    role: '愿景领队 / 成长型伙伴',
    summary: '你能看见每个人的潜力，并把一次徒步变成共同完成的成就。',
    route: '有挑战但可达成、适合团队一起突破的路线',
    strength: '鼓舞人心，擅长把目标讲得清楚又动人',
    watch: '鼓励别人时，也要允许他们选择停下。',
    gear: '队旗或识别物、能量补给、备用保暖、路线卡片'
  },
  ENTJ: {
    name: '峰顶规划者',
    role: '目标领袖 / 高效决策者',
    summary: '你天然会把目的地、资源和队伍能力组织成一套冲顶方案。',
    route: '高目标、高执行、需要统筹能力的进阶路线',
    strength: '目标感强，关键时刻敢决策',
    watch: '山不需要被征服，队友也不是项目资源。',
    gear: '专业硬壳、卫星通信、路线分段表、轻量急救系统'
  }
};

Component({
  properties: {
    title: {
      type: String,
      value: '你的户外徒步人格'
    },
    subtitle: {
      type: String,
      value: '12 个山野场景，生成你的徒步 MBTI'
    },
    restartText: {
      type: String,
      value: '重新测试'
    }
  },

  data: {
    questions,
    current: 0,
    answers: [],
    result: null,
    typeCode: '',
    progressText: '1 / 12',
    progressPercent: 8
  },

  methods: {
    chooseOption(event) {
      const { side } = event.currentTarget.dataset;
      const question = questions[this.data.current];
      const newAnswers = this.data.answers.concat({
        id: question.id,
        axis: question.axis,
        side
      });

      if (newAnswers.length === questions.length) {
        this.finish(newAnswers);
        return;
      }

      const next = this.data.current + 1;
      this.setData({
        answers: newAnswers,
        current: next,
        progressText: `${next + 1} / ${questions.length}`,
        progressPercent: Math.round((next + 1) / questions.length * 100)
      });
    },

    goBack() {
      if (this.data.current === 0 || this.data.result) return;

      const newAnswers = this.data.answers.slice(0, -1);
      const prev = this.data.current - 1;
      this.setData({
        answers: newAnswers,
        current: prev,
        progressText: `${prev + 1} / ${questions.length}`,
        progressPercent: Math.round((prev + 1) / questions.length * 100)
      });
    },

    finish(answers) {
      const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
      answers.forEach(answer => {
        scores[answer.side]++;
      });

      const typeCode = [
        scores.E >= scores.I ? 'E' : 'I',
        scores.S >= scores.N ? 'S' : 'N',
        scores.T >= scores.F ? 'T' : 'F',
        scores.J >= scores.P ? 'J' : 'P'
      ].join('');

      const result = results[typeCode];

      this.setData({
        answers,
        result,
        typeCode,
        progressText: `${questions.length} / ${questions.length}`,
        progressPercent: 100
      });

      this.triggerEvent('complete', {
        typeCode,
        result,
        answers,
        score: scores
      });
    },

    restart() {
      this.setData({
        current: 0,
        answers: [],
        result: null,
        typeCode: '',
        progressText: '1 / 12',
        progressPercent: Math.round(1 / questions.length * 100)
      });
      this.triggerEvent('restart');
    }
  }
});
