<template>
  <div :class="{ 'dark': isDark }" class="min-h-screen">
    <div style="background-color: var(--bg-primary); color: var(--text-primary)" class="min-h-screen overflow-x-hidden">
      <Scroll />
      <div class="relative">
        <Hero />
        <AboutMe />
        <Stats />
        <ProjectsPipeline />
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Hero from './components/hero.vue'
import Scroll from './components/scroll.vue'
import AboutMe from './components/aboutMe.vue'
import Stats from './components/Stats.vue'
import ProjectsPipeline from './components/ProjectsPipeline.vue'
import Footer from './components/Footer.vue'
import { provide, ref, onMounted } from 'vue'

// Initialize theme from localStorage or default to dark
const isDark = ref(localStorage.getItem('theme') === 'dark')

const toggleTheme = () => {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  updateTheme()
}

const updateTheme = () => {
  // Update DOM
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    document.documentElement.style.backgroundColor = '#000000'
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.style.backgroundColor = '#ffffff'
  }
}

// Initialize theme on mount
onMounted(() => {
  updateTheme()
})

provide('theme', {
  isDark,
  toggleTheme
})
</script>

<style>
:root {
  --bg-primary: #ffffff;
  --text-primary: #000000;
  --text-secondary: rgba(0, 0, 0, 0.7);
  --accent-color: rgb(59 130 246); /* blue-500 */
}

:root.dark {
  --bg-primary: #000000;
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --accent-color: rgb(168 85 247); /* purple-500 */
}

/* Apply transition to color changes */
* {
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Ensure body background matches theme */
body {
  background-color: var(--bg-primary);
}
</style>
