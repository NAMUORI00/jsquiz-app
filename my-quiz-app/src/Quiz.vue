<template>
  <div>
    <div class="quiz-header">
      <span class="quiz-progress">{{ currentQuestionIndex + 1 }} / {{ questions.length }}</span>
      <h1 v-if="currentQuestion">{{ currentQuestion.question }}</h1>
    </div>
    <ul v-if="currentQuestion" class="quiz-answers">
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
    <h2>You got {{ correctAnswers }} out of {{ questions.length }} questions correct!</h2>
    <button @click="restart">Restart Quiz</button>
    <div v-if="incorrectAnswers.length > 0">
        <h3>Incorrect answers:</h3>
        <table>
        <thead>
            <tr>
            <th>Question</th>
            <th>Answer</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="index in incorrectAnswers" :key="index">
            <td>
                <button @click="currentQuestionIndex = index">{{ index + 1 }}</button>
            </td>
            <td>
                {{ questions[index].question }}
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
            this.correctAnswers++;
        } else {
            this.incorrectAnswers.push(this.currentQuestionIndex);
        }
        if (this.currentQuestionIndex < this.questions.length - 1) {
            await this.$nextTick();
            this.currentQuestionIndex++;
            this.selectedAnswerIndex = null;
        } else {
            await this.$nextTick();
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
        this.selectedAnswerIndex = null;
    },
  },
  created() {
    this.getQuestions();
  },
};
</script>

