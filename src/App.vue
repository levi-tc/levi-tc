<template>
  <div :class="{ 'dark': isDark }" class="min-h-screen">
    <div style="background-color: var(--bg-primary); color: var(--text-primary)" class="min-h-screen overflow-x-hidden">
      <Scroll />
      <div class="relative">
        <Hero />
        <AboutMe />
        <Stats />
        <ProjectsPipeline :projects="projects" />
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

interface Project {
  title: string
  description: string
  technologies: string[]
}

const isDark = ref(localStorage.getItem('theme') === 'dark')

const projects: Project[] = [
  {
    title: "Data & ML Projects",
    description: "Advanced anomaly detection and prediction models implemented using MATLAB, focusing on data analysis and machine learning algorithms.",
    technologies: ["MATLAB", "Python", "Data Analysis", "Machine Learning"]
  },
  {
    title: "Interactive Image Processor",
    description: "Developed efficient image editing tools in C, achieving a 30% reduction in memory usage while maintaining high performance.",
    technologies: ["C", "Image Processing", "Memory Optimization", "Algorithms"]
  },
  {
    title: "Leave Management System",
    description: "Automated leave request system built with Django, reducing processing time by 40% and streamlining HR operations.",
    technologies: ["Django", "Python", "PostgreSQL", "HTML/CSS"]
  }
]

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
