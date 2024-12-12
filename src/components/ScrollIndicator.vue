<template>
  <div class="scroll-indicator fixed right-0 top-0 h-screen w-[2px] z-50">
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
  const documentHeight = document.documentElement.scrollHeight
  const windowHeight = window.innerHeight
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  
  // Prevent division by zero
  if (documentHeight === windowHeight) {
    scrollPercentage.value = 0
    return
  }
  
  scrollPercentage.value = (scrollTop / (documentHeight - windowHeight)) * 100
}

onMounted(() => {
  calculateScrollPercentage() // Initial calculation
  window.addEventListener('scroll', calculateScrollPercentage)
  window.addEventListener('resize', calculateScrollPercentage)
})

onUnmounted(() => {
  window.removeEventListener('scroll', calculateScrollPercentage)
  window.removeEventListener('resize', calculateScrollPercentage)
})
</script>

<style scoped>
@media (max-width: 768px) {
  .scroll-indicator {
    display: none !important;
  }
}
</style>