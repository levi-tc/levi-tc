<template>
  <div class="relative w-full">
    <CircuitBackground dark class="absolute inset-0">
      <div class="absolute inset-0 bg-black/90 z-[1]"></div>
    </CircuitBackground>
    <div class="hero-container relative min-h-screen flex flex-col items-start justify-start px-4 sm:px-6 lg:px-8 pt-[40vh]">
      <div class="max-w-7xl text-left relative z-[2] ml-[5%]">
        <h1 class="archivo text-white text-5xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 tracking-wider">
          I'm a student, developer, creator <br>
          and <span class="text-purple-700">{{ displayText }}<span v-if="showCursor" class="animate-blink">|</span></span>
        </h1>
      </div>
      
      <!-- Scroll Arrow -->
      <div 
        class="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-[2] cursor-pointer"
        @mouseenter="triggerArrowAnimation"
        @click="scrollToNextSection"
      >
        <ChevronDownIcon
          :class="['text-purple-500 w-10 h-10 transition-all duration-300', 
                   { 'animate-bounce-limited': isArrowAnimating }]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CircuitBackground from './CircuitBackground.vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'

const displayText = ref('')
const showCursor = ref(true)
const isArrowAnimating = ref(false)

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const typeWord = async () => {
  const word = 'freelancer'
  for (let i = 0; i <= word.length; i++) {
    displayText.value = word.substring(0, i)
    await sleep(150)
  }
  await sleep(500)
  showCursor.value = false
}

const triggerArrowAnimation = () => {
  if (isArrowAnimating.value) return
  
  isArrowAnimating.value = true
  setTimeout(() => {
    isArrowAnimating.value = false
  }, 1500) // Duration for 3 bounces
}

const scrollToNextSection = () => {
  const nextSection = document.querySelector('#about-me') // Add this ID to your next section
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  typeWord()
})
</script>

<style scoped>
.animate-blink {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}

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
