<script setup>
import http from "@/services/http";
import {onMounted, watchEffect, ref} from "vue";
import {useAuth} from "@/stores/auth";

const auth = useAuth()
const correctCount = ref(0)
const getResult = async () =>{
  try {
    const tokenAuth = 'Bearer ' + auth.token
    const Answers = localStorage.getItem('userAnswers')
    const {data} = await http.post('/answer',Answers,{
      headers: {
        Authorization: tokenAuth,
      }
    })

    correctCount.value = data.correctAnswersCount
    localStorage.removeItem('userAnswers');
  }catch (error){
    console.error('error',error.response.data)
  }
}
onMounted(getResult)
watchEffect(() => {
  getResult()
})
</script>

<template>
<div class="w-full h-screen mx-0 my-auto bg-zinc-700 pt-4">
  <div class="flex flex-col items-center justify-center">
      <h1 class="text-4xl text-white">Seu resultado</h1>
      <h5 class="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Você tem {{correctCount}} respostas corretas</h5>
  </div>
</div>
</template>

<style scoped>

</style>