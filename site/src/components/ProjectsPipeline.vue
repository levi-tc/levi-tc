<template>
  <section id="projects" class="min-h-screen relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8" :class="isDark ? 'bg-black' : 'bg-white'">
    <!-- Section Title -->
    <div class="text-center mb-16 sm:mb-24" ref="title">
      <h2 class="archivo-black text-2xl sm:text-3xl" :class="isDark ? 'text-white' : 'text-black'">
        My Projects
      </h2>
      <span :class="isDark ? 'text-purple-500' : 'text-blue-500'" class="archivo-narrow text-sm tracking-wider uppercase mb-2 block">Portfolio</span>
    </div>

    <div class="max-w-6xl mx-auto relative">
      <!-- Pipeline Path - Hidden on mobile -->
      <div class="absolute left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2 hidden sm:block" :class="isDark ? 'bg-purple-500/20' : 'bg-blue-500/20'"></div>
      
      <!-- Projects -->
      <div class="space-y-8 sm:space-y-16 lg:space-y-20">
        <div v-for="(project, index) in projects" :key="project.title" 
          class="relative flex flex-col sm:flex-row items-center opacity-0 gap-8 sm:gap-0"
          :class="{ 'sm:flex-row-reverse': index % 2 !== 0 }"
          :ref="(el) => { if (el) projectRefs[index] = el as HTMLElement }"
        >
          <!-- Project Content -->
          <div class="w-full sm:w-[50%] group sm:pl-16 sm:pr-8" 
            :class="{ 
              'text-right sm:pl-8 sm:pr-16': index % 2 !== 0 && isDesktop,
              'sm:ml-auto': index % 2 !== 0
            }"
          >
            <Card :class="[
              'shine-effect backdrop-blur rounded-xl sm:rounded-2xl border',
              isDark ? 'bg-black/90 border-purple-500/20 hover:border-purple-500/50' : 'bg-white/90 border-blue-500/20 hover:border-blue-500/50'
            ]">
              <CardHeader class="rounded-xl sm:rounded-2xl p-4 sm:p-5">
                <CardTitle :class="[
                  'archivo-black text-sm sm:text-base',
                  isDark ? 'text-purple-500' : 'text-blue-500'
                ]">
                  {{ project.title }}
                </CardTitle>
                <CardDescription :class="isDark ? 'text-gray-300' : 'text-gray-700'" class="archivo-narrow text-xs sm:text-sm">
                  {{ project.description }}
                </CardDescription>
              </CardHeader>
              <CardContent class="rounded-xl sm:rounded-2xl p-4 sm:p-5">
                <div class="flex gap-1 flex-wrap" :class="{ 'justify-end': index % 2 !== 0 && isDesktop }">
                  <Badge 
                    v-for="tech in project.technologies" 
                    :key="tech"
                    variant="outline"
                    :class="[
                      'rounded-lg text-[10px] sm:text-xs px-2 py-0.5',
                      isDark ? 'bg-purple-500/10 text-white border-purple-500/20' : 'bg-blue-500/10 text-black border-blue-500/20'
                    ]"
                  >
                    {{ tech }}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- Pipeline Node - Hidden on mobile -->
          <div class="absolute left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 hidden sm:block">
            <div class="w-2.5 h-2.5 rounded-full relative" :class="isDark ? 'bg-purple-500' : 'bg-blue-500'">
              <div class="absolute inset-0 rounded-full animate-ping opacity-25" :class="isDark ? 'bg-purple-500' : 'bg-blue-500'"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Project {
  title: string
  description: string
  technologies: string[]
}

const props = defineProps<{
  projects: Project[]
}>()

const { isDark } = inject('theme', { isDark: ref(true) })

const title = ref<HTMLElement | null>(null)
const pipeline = ref<HTMLElement | null>(null)
const projectRefs = ref<HTMLElement[]>([])
const isDesktop = ref(false)

const projects = [
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

// Check window width on mount and resize
const checkWidth = () => {
  isDesktop.value = window.innerWidth >= 640
}

onMounted(() => {
  checkWidth()
  window.addEventListener('resize', checkWidth)

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')

        // If it's a project element, trigger animation
        if (projectRefs.value.includes(entry.target as HTMLElement)) {
          const index = projectRefs.value.indexOf(entry.target as HTMLElement)
          setTimeout(() => {
            entry.target.classList.add('slide-in', index % 2 === 0 ? 'from-left' : 'from-right')
          }, index * 300)
        }
      }
    })
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  })

  // Observe title and projects
  if (title.value) observer.observe(title.value)
  projectRefs.value.forEach(el => {
    if (el) observer.observe(el)
  })
})
</script>

<style scoped>
.archivo-black {
  font-family: "Archivo Black", sans-serif;
}

.shine-effect {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.shine-effect::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: v-bind('isDark ? `linear-gradient(45deg, transparent, transparent 35%, rgba(168, 85, 247, 0.1) 40%, rgba(255, 255, 255, 0.2) 45%, rgba(168, 85, 247, 0.1) 50%, transparent 55%, transparent)` : `linear-gradient(45deg, transparent, transparent 35%, rgba(59, 130, 246, 0.1) 40%, rgba(0, 0, 0, 0.2) 45%, rgba(59, 130, 246, 0.1) 50%, transparent 55%, transparent)`');
  transform: translateX(-100%) rotate(45deg);
  transition: all 0.5s ease;
  z-index: 1;
  filter: blur(3px);
}

.shine-effect:hover::before {
  transform: translateX(100%) rotate(45deg);
}

.shine-effect:hover {
  box-shadow: v-bind('isDark ? "0 0 20px rgba(168, 85, 247, 0.3)" : "0 0 20px rgba(59, 130, 246, 0.3)"');
  border-color: v-bind('isDark ? "rgba(168, 85, 247, 0.5)" : "rgba(59, 130, 246, 0.5)"');
}

.shine-effect > * {
  position: relative;
  z-index: 2;
}

.text-center {
  opacity: 1;
}

.pipeline {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: top;
  transition: all 1s ease-out;
}

.pipeline.visible {
  opacity: 1;
  transform: scaleY(1);
}

.slide-in {
  opacity: 1 !important;
}

.from-left {
  animation: slideInLeft 0.8s ease-out forwards;
}

.from-right {
  animation: slideInRight 0.8s ease-out forwards;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
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