const { questions, results } = require('../../data/outdoor-mbti');

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
      const currentQuestion = questions[this.data.current];
      const answers = this.data.answers.concat({
        id: currentQuestion.id,
        axis: currentQuestion.axis,
        side
      });

      if (answers.length === questions.length) {
        this.finish(answers);
        return;
      }

      const next = this.data.current + 1;
      this.setData({
        answers,
        current: next,
        progressText: `${next + 1} / ${questions.length}`,
        progressPercent: Math.round(((next + 1) / questions.length) * 100)
      });
    },

    goBack() {
      if (this.data.current === 0 || this.data.result) return;

      const answers = this.data.answers.slice(0, -1);
      const current = this.data.current - 1;
      this.setData({
        answers,
        current,
        progressText: `${current + 1} / ${questions.length}`,
        progressPercent: Math.round(((current + 1) / questions.length) * 100)
      });
    },

    finish(answers) {
      const score = {
        E: 0,
        I: 0,
        S: 0,
        N: 0,
        T: 0,
        F: 0,
        J: 0,
        P: 0
      };

      answers.forEach((answer) => {
        score[answer.side] += 1;
      });

      const typeCode = [
        score.E >= score.I ? 'E' : 'I',
        score.S >= score.N ? 'S' : 'N',
        score.T >= score.F ? 'T' : 'F',
        score.J >= score.P ? 'J' : 'P'
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
        score
      });
    },

    restart() {
      this.setData({
        current: 0,
        answers: [],
        result: null,
        typeCode: '',
        progressText: `1 / ${questions.length}`,
        progressPercent: Math.round((1 / questions.length) * 100)
      });
      this.triggerEvent('restart');
    }
  }
});
