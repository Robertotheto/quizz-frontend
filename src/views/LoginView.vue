<template>
  <div class="w-full h-screen mx-auto my-0 bg-zinc-600 flex items-center justify-center">
    <div class="w-[450px] flex flex-col mx-auto my-0">
      <h1 class="text-5xl font-bold text-white text-center">Login</h1>
      <form class="flex flex-col" @submit.prevent="login">
        <label class="text-white">Email</label>
        <input
            class="bg-white rounded p-2"
            type="email"
            placeholder="Digite seu email"
            v-model="email"
        />
        <label class="text-white">Password</label>
        <input
            class="bg-white rounded p-2"
            type="password"
            placeholder="Digite sua senha"
            v-model="password"
        />
        <RouterLink class="text-white p-2 text-right font-bold hover:text-green-500" to="/signup">Cadastrar</RouterLink>
        <button
            class="bg-purple-500 text-white rounded p-2 mt-2 hover:bg-purple-600 font-bold"
            type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { RouterLink, useRouter} from 'vue-router'
import http from '../services/http.js'
import { ref } from 'vue'
import {useAuth} from '@/stores/auth'


const email = ref('')
const password = ref('')

const auth = useAuth()
const router = useRouter()
async function login (){
  try {
    const user = {
      email: email.value,
      password: password.value
    }
    const {data} = await http.post('/signin', user)
    auth.setToken(data.token)
    auth.setUser(data.user.id)
    auth.setIsAuth(true)
    await router.push('/')
  }catch (error) {
    console.log(error?.response?.data);
  }
}


</script>