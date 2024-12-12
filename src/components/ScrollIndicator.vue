<template>
  <div class="fixed right-0 top-0 h-screen w-[2px] z-50">
    <div 
      :class="isDark ? 'bg-white/20' : 'bg-black/30'" 
      class="h-full w-full">
      <div 
        :class="isDark ? 'bg-white' : 'bg-black/70'" 
        class="w-full transition-all duration-200"
        :style="{ height: `${scrollPercentage}%` }">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'

const scrollPercentage = ref(0)
const { isDark } = inject('theme', { isDark: ref(true) })

const calculateScrollPercentage = () => {
  const windowHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrolled = window.scrollY
  scrollPercentage.value = (scrolled / windowHeight) * 100
}

onMounted(() => {
  window.addEventListener('scroll', calculateScrollPercentage)
})

onUnmounted(() => {
  window.removeEventListener('scroll', calculateScrollPercentage)
})
</script> 