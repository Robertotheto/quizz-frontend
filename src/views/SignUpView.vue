<template>
  <div class="w-full h-screen mx-auto my-0 bg-zinc-600 flex items-center justify-center">
    <div class="w-[450px] flex flex-col mx-auto my-0">
      <h1 class="text-5xl font-bold text-white text-center">Cadastro</h1>
      <form class="flex flex-col" @submit.prevent="signup">
        <label class="text-white">Name</label>
        <input
            class="bg-white rounded p-2"
            type="text"
            placeholder="Digite seu nome"
            v-model="name"
        />
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
import { useRouter} from 'vue-router'
import http from '../services/http.js'
import { ref } from 'vue'
import {useAuth} from '@/stores/auth'

const name = ref('')
const email = ref('')
const password = ref('')

const auth = useAuth()
const router = useRouter()
async function signup (){
  try {
    const user = {
      name: name.value,
      email: email.value,
      password: password.value
    }
    const {data} = await http.post('/users', user)
    auth.setToken(data.token)
    auth.setUser(data.user.id)
    auth.setIsAuth(true)
    await router.push('/login')
  }catch (error) {
    console.log(error?.response?.data);
  }
}


</script>