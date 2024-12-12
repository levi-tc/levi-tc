<template>
  <div>
    <!-- Scroll content -->
    <div class="scroll-container">
      <slot></slot>
    </div>

    <!-- Scroll indicator -->
    <div class="fixed h-[60vh] w-[2px] right-8 top-1/2 -translate-y-1/2 z-50" :class="isDark ? 'bg-white/5' : 'bg-black/5'">
      <!-- Top circle -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full" :class="isDark ? 'bg-white/90' : 'bg-black/90'"></div>
      
      <!-- Scroll progress bar -->
      <div 
        class="absolute w-[2px] transition-all duration-150"
        :class="isDark ? 'bg-white/90' : 'bg-black/90'"
        :style="{ 
          top: '0',
          height: `${scrollProgress}%`
        }"
        ref="scrollIndicator"
      ></div>
      
      <!-- Bottom circle -->
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full" :class="isDark ? 'bg-white/90' : 'bg-black/90'"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'

const { isDark } = inject('theme', { isDark: ref(true) })
const scrollProgress = ref(0)
const scrollIndicator = ref<HTMLElement | null>(null)

const updateScroll = () => {
  const winScroll = window.scrollY
  const height = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = (winScroll / height) * 100
}

onMounted(() => {
  window.addEventListener('scroll', updateScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
})
</script>

<style scoped>
.scroll-container {
  position: relative;
  width: 100%;
}

/* Make the scroll indicator non-interactive */
.fixed {
  pointer-events: none;
}
</style>
