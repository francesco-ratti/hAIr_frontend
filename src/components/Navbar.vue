<script setup>
import { RouterLink, useRoute } from 'vue-router';

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};
</script>

<template>
  <nav class="bg-master border-b border-accent">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
        >
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <!--img class="h-10 w-auto" :src="logo" alt="hAIr" /-->
            <span class="hidden md:block text-black text-2xl font-bold ml-2"
              >hAIr</span
            >
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                :class="[
                  isActiveLink('/')
                    ? 'bg-accent text-white'
                    : 'hover:bg-accent hover:text-white',
                  'text-black',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >Candidates</RouterLink
              >

              <RouterLink
                  to="/questions"
                  :class="[
                    isActiveLink('/questions')
                      ? 'bg-accent text-white'
                      : 'hover:bg-accent hover:text-white',
                    'text-black',
                    'px-3',
                    'py-2',
                    'rounded-md',
                  ]"
                  >Questions</RouterLink
                >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
