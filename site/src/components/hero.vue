<template>
  <div id="hero" class="relative w-full">
    <div class="absolute inset-0 z-[1]" :class="isDark ? 'bg-black/90' : 'bg-white/90'"></div>

    <!-- Navbar -->
    <nav class="fixed top-0 left-0 right-0 z-50 px-8 py-6">
      <div class="max-w-7xl mx-auto flex items-center">
        <div class="flex items-center gap-6">
          <button 
            @click="toggleTheme"
            class="p-2 rounded-full transition-all duration-300 hover:scale-110"
            :class="isDark ? 'bg-white text-black' : 'bg-black text-white'"
          >
            <SunIcon v-if="isDark" class="w-5 h-5" />
            <MoonIcon v-else class="w-5 h-5" />
          </button>

          <div class="w-px h-5" :class="isDark ? 'bg-white/20' : 'bg-black/20'"></div>
        </div>

        <div class="ml-auto flex items-center gap-6">
          <a href="https://linkedin.com/in/petrisor-huzum" target="_blank" rel="noopener noreferrer"
            class="transition-all duration-300 hover:-translate-y-1"
            :class="isDark ? 'text-white/70 hover:text-purple-500' : 'text-black/70 hover:text-blue-500'">
            <LinkedinIcon class="w-5 h-5" />
          </a>
          <a href="https://github.com/levi-tc" target="_blank" rel="noopener noreferrer"
            class="transition-all duration-300 hover:-translate-y-1"
            :class="isDark ? 'text-white/70 hover:text-purple-500' : 'text-black/70 hover:text-blue-500'">
            <GithubIcon class="w-5 h-5" />
          </a>
          <a href="https://whozoom.tech" target="_blank" rel="noopener noreferrer"
            class="transition-all duration-300 hover:-translate-y-1"
            :class="isDark ? 'text-white/70 hover:text-purple-500' : 'text-black/70 hover:text-blue-500'">
            <GlobeIcon class="w-5 h-5" />
          </a>
        </div>
      </div>
    </nav>

    <div class="hero-container relative min-h-screen flex flex-col items-start justify-start px-4 sm:px-6 lg:px-8 pt-[30vh] sm:pt-[40vh]">
      <div class="max-w-7xl w-full text-left relative z-[2] ml-[5%] sm:ml-[5%]">
        <h1 class="archivo text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 tracking-wider" style="color: var(--text-primary)">
          I'm a student, developer, creator <br class="hidden sm:block" />
          and <span style="color: var(--accent-color)">{{ displayText }}<span v-if="showCursor" class="animate-blink">|</span></span>
        </h1>
      </div>

      <!-- Arrow -->
      <div 
        v-if="showArrow"
        class="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer opacity-0 animate-fade-in z-[2]"
        @mouseenter="triggerArrowAnimation"
        @click="scrollToNextSection"
      >
        <ChevronDownIcon
          class="w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300"
          :class="{ 'animate-bounce-limited': isArrowAnimating }"
          style="color: var(--accent-color)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import { 
  LinkedinIcon, 
  GithubIcon, 
  GlobeIcon,
  SunIcon,
  MoonIcon
} from 'lucide-vue-next'

const { isDark, toggleTheme } = inject('theme', {
  isDark: ref(true),
  toggleTheme: () => {}
})


const displayText = ref('')
const showCursor = ref(true)
const isArrowAnimating = ref(false)
const showArrow = ref(false)

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const typeWord = async () => {
  const word = 'freelancer'
  for (let i = 0; i <= word.length; i++) {
    displayText.value = word.substring(0, i)
    await sleep(150)
  }
  await sleep(500)
  showCursor.value = false
  await sleep(500)
  showArrow.value = true
}

const triggerArrowAnimation = () => {
  if (isArrowAnimating.value) return
  
  isArrowAnimating.value = true
  setTimeout(() => {
    isArrowAnimating.value = false
  }, 1500)
}

const scrollToNextSection = () => {
  const nextSection = document.querySelector('#about-me')
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  console.log('Current theme:', isDark.value ? 'dark' : 'light')
  typeWord()
})
</script>

<style scoped>
.archivo-narrow {
  font-family: "Archivo Narrow", sans-serif;
}

.theme-toggle {
  background-color: var(--text-primary);
  color: var(--bg-primary);
  transition: all 0.3s;
}

.theme-toggle:hover {
  transform: scale(1.1);
}

.social-icon {
  color: var(--text-secondary);
}

.social-icon:hover {
  color: var(--accent-color);
}

.arrow-icon {
  color: var(--accent-color);
}

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

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

:deep(.tabs-trigger) {
  padding: 0.5rem;
  border-radius: 9999px;
  transition: all 0.3s ease;
  background: transparent;
  border: none;
  opacity: 0.7;
  color: v-bind('isDark ? "#ffffff" : "#000000"');
}

:deep(.tabs-trigger:hover) {
  opacity: 1;
  transform: translateY(-2px);
  color: v-bind('isDark ? "rgb(168 85 247)" : "rgb(59 130 246)"');
}

:deep(.tabs-trigger[data-state=active]) {
  opacity: 1;
  color: v-bind('isDark ? "rgb(168 85 247)" : "rgb(59 130 246)"');
  background: transparent;
}

:deep(.tabs-list) {
  padding: 2px;
  border-radius: 9999px;
  background: transparent;
  border: none;
}
</style>
