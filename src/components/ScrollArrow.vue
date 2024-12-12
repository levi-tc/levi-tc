<template>
  <div 
    class="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-[2] cursor-pointer opacity-80 hover:opacity-100"
    @mouseenter="triggerArrowAnimation"
    @click="scrollToSection"
  >
    <ChevronUpIcon
      v-if="isScrollingUp"
      :class="[' w-10 h-10 transition-all duration-300 transform', 
               { 'animate-bounce-limited': isArrowAnimating }]"
      style="color: var(--accent-color)"
    />
    <ChevronDownIcon
      v-else
      :class="[' w-10 h-10 transition-all duration-300 transform', 
               { 'animate-bounce-limited': isArrowAnimating }]"
    style="color: var(--accent-color)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/solid'

const props = defineProps<{
  targetSection: string
  previousSection?: string
}>()

const isArrowAnimating = ref(false)
const isScrollingUp = ref(false)
let lastScrollY = window.scrollY

const triggerArrowAnimation = () => {
  if (isArrowAnimating.value) return
  isArrowAnimating.value = true
  setTimeout(() => {
    isArrowAnimating.value = false
  }, 1500)
}

const handleScroll = () => {
  const currentScrollY = window.scrollY
  isScrollingUp.value = currentScrollY < lastScrollY && currentScrollY > 100
  lastScrollY = currentScrollY
}

const scrollToSection = () => {
  if (isScrollingUp.value && props.previousSection) {
    const previousElement = document.querySelector(props.previousSection)
    if (previousElement) {
      previousElement.scrollIntoView({ behavior: 'smooth' })
    }
  } else {
    const nextElement = document.querySelector(props.targetSection)
    if (nextElement) {
      nextElement.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.animate-bounce-limited {
  animation: bounce 0.5s cubic-bezier(0.4, 0, 0.2, 1) 3;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}
</style> 