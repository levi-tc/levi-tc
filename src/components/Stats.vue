<template>
  <section id="stats" class="min-h-screen relative flex flex-col items-center justify-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8" style="background-color: var(--bg-primary)">
    <div class="w-full -translate-y-[5vh] sm:-translate-y-[10vh]">
      <!-- Section Title -->
      <div class="text-center mb-16 sm:mb-24 lg:mb-32 fade-in" ref="title">
        <h2 class="archivo-black text-2xl sm:text-3xl" style="color: var(--text-primary)">
          My Journey
        </h2>
        <span class="archivo-narrow text-sm tracking-wider uppercase mb-2 block" style="color: var(--accent-color)">Statistics</span>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16 lg:gap-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div v-for="(stat, index) in stats" :key="index" 
          class="text-center fade-in-slide stat-container hover-glow-group"
          :ref="(el) => { if (el) statRefs[index] = el as HTMLElement }"
        >
          <div class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 archivo stat-content" style="color: var(--accent-color)">
            <span>{{ stat.current }}</span>{{ stat.suffix }}
          </div>
          <div class="text-base sm:text-lg lg:text-xl archivo-narrow stat-content" style="color: var(--text-primary)">{{ stat.label }}</div>
        </div>
      </div>
    </div>


<ScrollArrow class="absolute bottom-6 sm:bottom-12" target-section="#projects" previous-section="#about-me" />
  
    </section>

    <!-- ScrollArrow component at the bottom of the page -->

  
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ScrollArrow from './ScrollArrow.vue'

interface Stat {
  target: number
  current: number
  suffix: string
  label: string
  increment: number
}

const stats = ref<Stat[]>([
  {
    target: 10,
    current: 0,
    suffix: '+',
    label: 'Projects Completed',
    increment: 1
  },
  {
    target: 1500,
    current: 0,
    suffix: '+',
    label: 'Hours of Coding',
    increment: 50
  },
  {
    target: 99.99,
    current: 0,
    suffix: '%',
    label: 'Client Satisfaction',
    increment: 3.33
  },
  {
    target: 3,
    current: 0,
    suffix: '+',
    label: 'Years Experience',
    increment: 1
  },
  {
    target: 15,
    current: 0,
    suffix: '+',
    label: 'Clients Worked With',
    increment: 1
  }
])

const title = ref<HTMLElement | null>(null)
const statRefs = ref<HTMLElement[]>([])
const showArrow = ref(false)
let visibleElements = 0
const totalElements = stats.value.length + 1 // stats + title

const animateNumber = (index: number) => {
  const stat = stats.value[index]
  if (stat.current < stat.target) {
    stat.current += stat.increment
    if (stat.current > stat.target) {
      stat.current = stat.target
    } else {
      requestAnimationFrame(() => animateNumber(index))
    }
  }
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
        visibleElements++

        // Start number animation for stats
        const index = statRefs.value.indexOf(entry.target as HTMLElement)
        if (index !== -1) {
          setTimeout(() => {
            animateNumber(index)
          }, 500) // Delay start of counting animation
        }

        // Show arrow when all elements are visible
        if (visibleElements === totalElements) {
          setTimeout(() => {
            showArrow.value = true
          }, 1000)
        }
      }
    })
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  })

  // Observe title and stats
  if (title.value) observer.observe(title.value)
  statRefs.value.forEach(el => {
    if (el) observer.observe(el)
  })
})
</script>

<style scoped>
.fade-in {
  opacity: 0;
  transition: opacity 0.8s ease-out;
}

.fade-in.visible {
  opacity: 1;
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

/* Add staggered delays for stats */
.fade-in-slide:nth-child(1) { transition-delay: 0.1s; }
.fade-in-slide:nth-child(2) { transition-delay: 0.2s; }
.fade-in-slide:nth-child(3) { transition-delay: 0.3s; }
.fade-in-slide:nth-child(4) { transition-delay: 0.4s; }
.fade-in-slide:nth-child(5) { transition-delay: 0.5s; }

.stat-container {
  position: relative;
  padding: 1rem;
  border-radius: 1rem;
  transition: transform 0.3s ease;
}

.hover-glow-group {
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
}

.stat-content {
  transition: all 0.3s ease;
}

.hover-glow-group:hover .stat-content {
  text-shadow: 0 0 20px var(--text-secondary);
  transform: translateY(-2px);
}

.hover-glow-group:hover::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 4px;
  background: radial-gradient(circle, var(--text-secondary) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(3px);
}

/* Update spacing */
.mb-32 {
  margin-bottom: 8rem;
}

.gap-20 {
  gap: 5rem;
}

/* Update grid layout for 5 items */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  /* Center the last two items */
  .stat-container:nth-child(4) {
    grid-column: 1 / 2;
    transform: translateX(50%);
  }
  
  .stat-container:nth-child(5) {
    grid-column: 3 / 4;
    transform: translateX(-50%);
  }
}

.archivo-black {
  font-family: 'Archivo Black', sans-serif;
}

@media (max-width: 1023px) {
  .stat-container:nth-child(4),
  .stat-container:nth-child(5) {
    grid-column: auto;
    transform: none;
  }
}
</style> 