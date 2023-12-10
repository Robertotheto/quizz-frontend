<template>
  <div
      class="w-full h-full mx-0 my-auto bg-zinc-700 p-4"
  >
    <form
        @submit.prevent="submitForm"
        class="flex flex-col items-center justify-center mx-0 my-auto"
    >
      <div
         class="mt-4 flex flex-col w-[800px] p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 "
         v-for="question in questions"
         :key="question.id"
      >
        <h5
            class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >{{question.title}}</h5>
        <p
            class="font-normal mb-2 text-gray-700 dark:text-gray-400">
          {{question.body}}
        </p>
        <ul class="flex flex-col">
          <li
              v-for="answer in question.answers"
              :key="answer.id"
              class="font-normal text-gray-700 dark:text-gray-400"
          >
            <input
                type="radio"
                :name="`question-${question.id}`"
                :value="answer.id"
                v-model="selectedAnswers[question.id]"
            />
            {{ answer.body }}
          </li>
        </ul>
      </div>
      <button
          type="submit"
          class="bg-green-500 w-[800px] rounded mt-2 p-4 text-white font-bold hover:bg-green-600 text-2xl"
      >
        Enviar
      </button>
    </form>

  </div>
</template>

<script setup>

import {onMounted , ref} from "vue";
import http from "@/services/http";
import {useAuth} from "@/stores/auth";
import {useRouter} from 'vue-router'

const auth = useAuth()
const questions = ref([])
const selectedAnswers = ref({});
const router = useRouter()

onMounted(async () => {
  try {
    const tokenAuth = 'Bearer ' + auth.token
    const {data} = await http.get('/questions',{
      headers: {
        Authorization: tokenAuth,
      }
    })
    const response = data
    const array = []
    for (let key in response){
      const question = {
        id: response[key].id,
        title: response[key].title,
        body: response[key].body,
        user_id: response[key].user_id,
        answers: [],
      }
      for (let answerKey in response[key].answers){
        const answer = {
          id: response[key].answers[answerKey].id,
          body: response[key].answers[answerKey].body,
          isCorrect: response[key].answers[answerKey].isCorrect,
          question_id: response[key].answers[answerKey].question_id,
        }
        question.answers.push(answer)
      }
      array.push(question)

    }
    questions.value = array
  }catch (error){
    console.error('error',error.response.data)
  }
})
const submitForm = async () => {
  const answersArray = Object.entries(selectedAnswers.value).map(([questionId, answerId]) => ({
    questionId,
    answerId,
  }));
  const dataToSave = {
    userId: auth.user,
    answers: answersArray,
  };
  localStorage.setItem('userAnswers', JSON.stringify(dataToSave));
  await router.push('/result')
};
</script>