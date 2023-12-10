<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuth } from '@/stores/auth'
import {onMounted, ref, watchEffect} from 'vue'
import http from "@/services/http";

const auth = useAuth()
const router = useRouter()
const userName = ref('')
const getUser = async () =>{
  try {
    const tokenAuth = 'Bearer ' + auth.token
    const id = auth.user
    const {data} = await http.get(`/users/${id}`,{
      headers: {
        Authorization: tokenAuth,
      }
    })
    userName.value = data.name
  }catch (error){
    console.error('error',error.response.data)
  }
}
onMounted(getUser)
watchEffect(() => {
  getUser()
})
function Home(){
  router.push('/')
}
function logout() {
  auth.clear()
  router.push('/login')
}
</script>

<template>
  <template v-if="!auth.isAuth">
    <div class="w-full h-[80px] mx-0 my-auto px-3 bg-zinc-900">
      <header class="h-full flex items-center">
        <div class="w-full flex items-center justify-between">
          <div class="flex items-center justify-center">
            <button @click="Home">
              <img class="w-[50px] h-[50px]" src="./assets/laptop.png" alt="logo" />
            </button>
            <h1 class="text-2xl font-bold text-white ml-4">Quizz Tech</h1>
          </div>
          <nav>
            <RouterLink class="font-bold text-white pointer hover:bg-purple-500 p-2 rounded text-lg" to="/">Home</RouterLink>
            <RouterLink class="ml-2 font-bold text-white pointer hover:bg-purple-500 p-2 rounded text-lg" to="/login">Login</RouterLink>
          </nav>
        </div>
      </header>
    </div>
  </template>
  <template v-else>
    <div class="w-full h-[80px] mx-0 my-auto px-3 bg-zinc-900">
      <header class="h-full flex items-center">
        <div class="w-full flex items-center justify-between">
          <div class="flex items-center justify-center">
              <button @click="Home">
                <img class="w-[50px] h-[50px]" src="./assets/laptop.png" alt="logo" />
              </button>
              <h1 class="text-2xl font-bold text-white ml-4">Quizz Tech</h1>
          </div>
          <nav class="flex">
            <h1 class="font-bold text-white p-2 rounded text-lg">{{userName}}</h1>
            <RouterLink class="ml-2 font-bold text-white pointer hover:bg-purple-500 p-2 rounded text-lg" to="/questions">Quizz</RouterLink>
            <button class="ml-2 font-bold text-white pointer hover:bg-purple-500 p-2 rounded text-lg" @click="logout">Logout</button>
          </nav>
        </div>
      </header>
    </div>
  </template>
  <RouterView />
</template>

<style scoped>
 
</style>
