<template>
  <section id="projects" class="min-h-screen relative flex flex-col px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
    <!-- Title -->
    <div class="text-center mb-12">
      <h2 ref="title" class="archivo-black text-2xl sm:text-3xl lg:text-4xl mb-2 fade-in-slide">
        Projects
      </h2>
      <span style="color: var(--accent-color)" class="archivo-narrow text-sm tracking-wider uppercase fade-in-slide">
        What I've Built
      </span>
    </div>

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
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Project {
  title: string
  description: string
  technologies: string[]
}

const { isDark } = inject('theme', { isDark: ref(true) })

const title = ref<HTMLElement | null>(null)
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
const checkWindowWidth = () => {
  isDesktop.value = window.innerWidth >= 640
}

onMounted(() => {
  checkWindowWidth()
  window.addEventListener('resize', checkWindowWidth)

  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  // Observe project elements
  projectRefs.value.forEach(el => {
    if (el) {
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      el.style.transform = 'translateY(20px)'
      observer.observe(el)
    }
  })
})
</script>

<style scoped>
.shine-effect {
  position: relative;
  overflow: hidden;
}

.shine-effect::before {
  content: '';
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.shine-effect:hover::before {
  transform: translateX(100%);
}

.fade-in-slide {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in-slide.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Add staggered delays for text elements */
h2.fade-in-slide { transition-delay: 0.1s; }
span.fade-in-slide { transition-delay: 0.2s; }

/* Make sure elements are visible by default on mobile */
@media (max-width: 640px) {
  .fade-in-slide {
    opacity: 1;
    transform: translateY(0);
  }
}

.archivo-narrow {
  font-family: "Archivo Narrow", sans-serif;
}

.archivo-black {
  font-family: "Archivo Black", sans-serif;
}
</style> 