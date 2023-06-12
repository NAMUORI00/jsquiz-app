<template>
  <div>
    <div v-if="showTitle" class="quiz-start">
    <h2>10문제의 퀴즈를 풀어보세요!</h2>
    <button @click="start">퀴즈시작</button>
    </div>

    
    <div v-if="showResult" class="quiz-result">
    <h2>결과 : {{ questions.length }}점 만점에 {{ correctAnswers }}점!</h2>
    <button @click="restart">퀴즈 재시작</button>
    <p v-if= "showQuiz">틀린 문제를 선택하고 오답풀이를 시작해보세요. 오답풀이까지 {{ incorrectAnswers.length }} 문제 남았습니다</p>
    </div>

    <div v-if="showQuiz && !showTitle" class="quiz-header">
      <span class="quiz-progress">{{ currentQuestionIndex + 1 }} / {{ questions.length }}</span>
      <h1 v-if="currentQuestion">{{ currentQuestion.question }}</h1>
    </div>
    
    <ul v-if="(currentQuestion && showQuiz && !showTitle)" class="quiz-answers">
      <li
        v-for="(answer, index) in currentQuestion.answers"
        :key="index"
        @click="checkAnswer(index)"
        :class="{ 'selected': isAnswerSelected(index) }"
      >
        {{ answer }}
      </li>
    </ul>

    <div v-if="showResult" class="quiz-result">
        <div v-if="incorrectAnswers.length > 0">
        <h3>틀린문제:</h3>
            <table>
                <thead>
                <tr>
                    <th>문제번호</th>
                    <th>문제</th>
                    <th>정답</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(index, i) in incorrectAnswers" :key="index">
                    <td>
                        <button @click="currentQuestionIndex = index">{{ index + 1 }}</button>
                    </td>
                    <td>
                        {{ questions[index].question }}
                    </td>
                    <td>
                        <p class="spoiler">{{ questions[index].correct + 1}}</p>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>


  </div>
</template>


<style>
.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.quiz-progress {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
}

.quiz-answers {
  list-style: none;
  margin: 0;
  padding: 0;
}

.quiz-answers li {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.quiz-answers li.selected {
  border-color: #007aff;
}

.quiz-result {
  margin-top: 20px;
}

.quiz-start {
  margin-top: 20px;
}

.spoiler {
    background-color: #000;
    color: #000;
}
.spoiler:hover {
    color: #fff;
}
</style>


<script>
import axios from 'axios';

export default {
  name: 'Quiz',
    data() {
        return {
            questions: [],
            currentQuestionIndex: 0,
            correctAnswers: 0,
            incorrectAnswers: [],
            showResult: false,
            showQuiz: true,
            showTitle: true,
            selectedAnswerIndex: null,
        };
    },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
  },
  methods: {
    async getQuestions() {
      try {
        const response = await axios.get('/quiz.json');
        this.questions = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async checkAnswer(index) {
        this.selectedAnswerIndex = index;
        if (index === this.currentQuestion.correct) {
            if(!this.showResult){
                this.correctAnswers++;
            } else{
                this.$notify("정답입니다!");
                const index = this.incorrectAnswers.indexOf(this.currentQuestionIndex);
                if (index !== -1) {
                    this.incorrectAnswers.splice(index, 1);
                    if (this.incorrectAnswers.length > 0) {
                        this.currentQuestionIndex = this.incorrectAnswers[0];
                    } else{
                        this.$notify("오답풀이가 끝났습니다");
                        this.showQuiz = false;
                    }
                }
            }
        } else if (!this.incorrectAnswers.includes(this.currentQuestionIndex)) {
            this.incorrectAnswers.push(this.currentQuestionIndex);
        } else{
          if(this.showResult){
                this.$notify({ type: "warn", text: "오답입니다. 다시 풀이해보세요" });
          }
        }
        if (this.currentQuestionIndex < this.questions.length - 1) {
            await this.$nextTick();
            if(!this.showResult){
                this.currentQuestionIndex++;
            }
            this.selectedAnswerIndex = null;
        } else {
            await this.$nextTick();
            this.currentQuestionIndex = this.incorrectAnswers[0];
            this.showResult = true;
        }
    },
    isAnswerSelected(index) {
        return index === this.selectedAnswerIndex;
    },
    restart() {
        this.currentQuestionIndex = 0;
        this.correctAnswers = 0;
        this.showResult = false;
        this.showQuiz = true;
        this.selectedAnswerIndex = null;
        this.incorrectAnswers =[];
        this.showTitle=true;
    },
    start() {
        this.currentQuestionIndex = 0;
        this.correctAnswers = 0;
        this.showResult = false;
        this.showQuiz = true;
        this.selectedAnswerIndex = null;
        this.incorrectAnswers =[];
        this.showTitle=false;
    },
  },
  created() {
    this.getQuestions();
  },
};
</script>

