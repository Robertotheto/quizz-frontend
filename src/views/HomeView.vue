<script setup>

import {RouterLink} from "vue-router";
</script>

<template>
  <div class="w-full h-screen mx-0 my-auto bg-zinc-700">
    <div class="h-full flex items-center">
      <div class="w-full flex items-center justify-center">
        <div class="flex flex-col items-center justify-center">
          <h1 class="text-5xl font-bold text-white mb-2 p-2">Quizz Tech</h1>
          <RouterLink
              class="text-xl font-bold text-zinc-100 hover:text-zinc-300 p-2 hover:bg-zinc-800 rounded"
              to="/questions"
          >
            Confira nosso Quizz
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
