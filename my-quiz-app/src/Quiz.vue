<template>
  <div>
    <h1 v-if="currentQuestion">{{ currentQuestion.question }}</h1>
    <ul v-if="currentQuestion">
      <li
        v-for="(answer, index) in currentQuestion.answers"
        :key="index"
        @click="checkAnswer(index)"
      >
        {{ answer }}
      </li>
    </ul>
    <div v-if="showResult">
      <h2>You got {{ correctAnswers }} out of {{ questions.length }} questions correct!</h2>
      <button @click="restart">Restart Quiz</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Quiz',
  data() {
    return {
      questions: [],
      currentQuestionIndex: 0,
      correctAnswers: 0,
      showResult: false,
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
    checkAnswer(index) {
      if (index === this.currentQuestion.correct) {
        this.correctAnswers++;
      }
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        this.showResult = true;
      }
    },
    restart() {
      this.currentQuestionIndex = 0;
      this.correctAnswers = 0;
      this.showResult = false;
    },
  },
  created() {
    this.getQuestions();
  },
};
</script>