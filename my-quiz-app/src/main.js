import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Quiz from './Quiz.vue'; // Quiz.vue 파일을 가져옵니다.
import Notifications from '@kyvg/vue3-notification'


const app = createApp(App);
app.use(Notifications)
app.component('Quiz', Quiz); // Quiz 컴포넌트를 등록합니다.
app.mount('#app');
