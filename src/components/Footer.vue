<template>
  <footer :class="isDark ? 'bg-black' : 'bg-white'" class="py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto flex flex-col items-center gap-4">
      <!-- Contact Text -->
      <h3 :class="isDark ? 'text-white' : 'text-black'" class="text-2xl font-black arrow-black mb-4 tracking-wider">LET'S GET IN CONTACT!</h3>

      <!-- Social Icons -->
      <div class="flex gap-6 items-center">
        <a href="https://linkedin.com/in/petrisor-huzum" target="_blank" rel="noopener noreferrer"
          :class="isDark ? 'text-white/70 hover:text-purple-500' : 'text-black/70 hover:text-blue-500'"
          class="transition-all duration-300 hover:-translate-y-1">
          <LinkedinIcon class="w-5 h-5" />
        </a>
        <a href="https://github.com/levi-tc" target="_blank" rel="noopener noreferrer"
          :class="isDark ? 'text-white/70 hover:text-purple-500' : 'text-black/70 hover:text-blue-500'"
          class="transition-all duration-300 hover:-translate-y-1">
          <GithubIcon class="w-5 h-5" />
        </a>
        <a href="https://whozoom.tech" target="_blank" rel="noopener noreferrer"
          :class="isDark ? 'text-white/70 hover:text-purple-500' : 'text-black/70 hover:text-blue-500'"
          class="transition-all duration-300 hover:-translate-y-1">
          <GlobeIcon class="w-5 h-5" />
        </a>
      </div>

      <!-- Copyright Text -->
      <p :class="isDark ? 'text-gray-400' : 'text-gray-600'" class="archivo-narrow text-sm text-center">
        © {{ new Date().getFullYear() }} Petrișor Huzum. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { 
  LinkedinIcon, 
  GithubIcon, 
  GlobeIcon 
} from 'lucide-vue-next'
import { inject, ref } from 'vue'

const { isDark } = inject('theme', { isDark: ref(true) })
</script>

<style scoped>
.archivo-narrow {
  font-family: "Archivo Narrow", sans-serif;
}

.arrow-black {
  font-family: "Archivo Black", sans-serif;
}
</style> 