<template>
  <section id="about-me" class="min-h-screen bg-black relative flex flex-col lg:flex-row items-center px-4 sm:px-6 lg:px-8 py-16 lg:py-0" style="background-color: var(--bg-primary)">
    <!-- Left side - Image -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 mb-8 lg:mb-0">
      <div 
        ref="imageContainer"
        class="relative w-[250px] sm:w-[280px] md:w-[350px] lg:w-[400px] h-[320px] sm:h-[350px] md:h-[440px] lg:h-[500px] overflow-visible rounded-2xl image-container cursor-pointer"
        :class="{
          'hover-animation': isHovered && !isLightOn,
          'light-on': isLightOn,
          'turn-on-animation': isAnimatingOn
        }"
        @mouseenter="handleHover"
        @mouseleave="handleMouseLeave"
        @click="handleClick"
      >
        <img 
          :src="new URL('@/assets/images/aboutme.png' import.meta.url).href" 
          alt="Profile picture" 
          class="w-full h-full object-cover rounded-2xl"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-black/80 overlay-effect rounded-2xl"></div>
      </div>
    </div>

    <!-- Right side - Content -->
    <div class="w-full lg:w-1/2 px-4 lg:pr-[5%] lg:pl-0 mb-20 sm:mb-24 lg:mb-0" style="color: var(--text-primary)">
      <div class="text-center lg:text-left mb-8">
        <h2 class="archivo-black text-2xl sm:text-3xl lg:text-4xl mb-2 fade-in-slide visible" ref="title">
          About Me
        </h2>
        <span style="color: var(--accent-color)" class="archivo-narrow text-sm tracking-wider uppercase mb-6 block fade-in-slide visible" ref="subtitle">
          Introduction
        </span>
      </div>

      <div class="space-y-4 sm:space-y-6 text-left">
        <p style="color: var(--text-secondary)" class="archivo text-base sm:text-lg leading-relaxed fade-in-slide" ref="text1">
          Hey there! I'm <strong>Petrișor Huzum</strong>, a driven <strong>Software Engineer</strong> and 
          <strong>Computer Science student</strong> at POLITEHNICA University, Bucharest. I'm all about 
          crafting digital experiences that are both seamless and impactful—whether it's building a 
          high-performing web application, streamlining data analysis, or experimenting with machine 
          learning models.
        </p>

        <p style="color: var(--text-secondary)" class="archivo text-base sm:text-lg leading-relaxed fade-in-slide" ref="text2">
          From pushing code in <strong>Django</strong> and <strong>React.js/Vue.js</strong> to optimizing workflows 
          with <strong>Docker</strong> and championing web accessibility, my mission is to deliver 
          solutions that don't just meet user needs—they redefine what's possible. I've used my skills 
          to boost productivity, refine predictive models, and reshape the online shopping experience 
          with SEO enhancements. In short, I love turning big ideas into robust, efficient, and 
          human-centered technologies.
        </p>
      </div>
    </div>

    <!-- Arrow - Only show when content is visible -->
    <ScrollArrow 
      v-if="showArrow"
      target-section="#stats" 
      previous-section="#hero"
      class="bottom-6 sm:bottom-12"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ScrollArrow from './ScrollArrow.vue'


const imageContainer = ref<HTMLElement | null>(null)
const isImageRevealed = ref(false)
const isHovered = ref(false)
const isLightOn = ref(false)
const isAnimatingOn = ref(false)

// Refs for scroll animations
const title = ref<HTMLElement | null>(null)
const subtitle = ref<HTMLElement | null>(null)
const text1 = ref<HTMLElement | null>(null)
const text2 = ref<HTMLElement | null>(null)
const showArrow = ref(false)
let visibleElements = 0
const totalElements = 4 // title, subtitle, text1, text2

const handleHover = () => {
  if (!isLightOn.value) {
    isHovered.value = true
  }
}

const handleMouseLeave = () => {
  isHovered.value = false
}

const handleClick = () => {
  if (isLightOn.value || isAnimatingOn.value) return
  isAnimatingOn.value = true
  
  setTimeout(() => {
    isLightOn.value = true
    isAnimatingOn.value = false
  }, 1000)
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
        visibleElements++

        // Show arrow when all elements are visible
        if (visibleElements === totalElements) {
          setTimeout(() => {
            showArrow.value = true
          }, 500) // Wait a bit after last element fades in
        }
      }
    })
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  })

  // Observe all elements with fade-in-slide class
  ;[title.value, subtitle.value, text1.value, text2.value].forEach(el => {
    if (el) observer.observe(el)
  })

  // Start the reveal animation after a short delay
  setTimeout(() => {
    isImageRevealed.value = true
  }, 500)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Archivo+Narrow:ital,wght@0,400..800;1,400..800&family=Archivo+Black:wght@400&display=swap');

.shadow-transition {
  transition: all 0.3s ease;
}

/* Optional: Add this if you want to prevent image selection during interaction */
img {
  user-select: none;
  -webkit-user-drag: none;
}

/* Separate animation for image */
.fade-in-slide-image {
  opacity: 1; /* Start visible */
  transform: translateX(-20px);
  transition: transform 0.8s ease;
}

.fade-in-slide-image.visible {
  transform: translateX(0);
}

/* Text animations remain the same */
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
p.fade-in-slide:nth-of-type(1) { transition-delay: 0.2s; }
p.fade-in-slide:nth-of-type(2) { transition-delay: 0.3s; }
div.fade-in-slide:nth-of-type(1) { transition-delay: 0.4s; }
div.fade-in-slide:nth-of-type(2) { transition-delay: 0.5s; }

@media (max-width: 1024px) {
  .fade-in-slide-image {
    transform: translateY(-20px);
  }
  
  .fade-in-slide-image.visible {
    transform: translateY(0);
  }
}

/* Archivo Narrow font styles */
.archivo-narrow {
  font-family: "Archivo Narrow";
  font-optical-sizing: auto;
  font-style: normal;
}

/* Archivo Black font style */
.archivo-black {
  font-family: "Archivo Black";
  font-weight: 400;
  font-style: bold;
}

.overlay-effect {
  opacity: 0.8;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.hover-animation .overlay-effect {
  animation: flickerOpacity 0.8s infinite;
}

.turn-on-animation .overlay-effect {
  animation: turnOnOpacity 1s forwards;
}

.light-on .overlay-effect {
  opacity: 0.3;
}

.hover-animation {
  animation: flickerEffect 0.8s infinite;
}

.turn-on-animation {
  animation: turnOnEffect 1s forwards;
}

.light-on {
  box-shadow: 0 0 60px var(--accent-color);
}

@keyframes flickerOpacity {
  0% { opacity: 0.8; }
  25% { opacity: 0.4; }
  50% { opacity: 0.8; }
  75% { opacity: 0.4; }
  100% { opacity: 0.8; }
}

@keyframes turnOnOpacity {
  0% { opacity: 0.8; }
  20% { opacity: 0.3; }
  40% { opacity: 0.7; }
  60% { opacity: 0.4; }
  80% { opacity: 0.6; }
  100% { opacity: 0.3; }
}

@keyframes flickerEffect {
  0% { 
    box-shadow: 0 0 50px var(--accent-color);
    opacity: 0.2;
  }
  25% { 
    box-shadow: 0 0 50px var(--accent-color);
    opacity: 0.9;
  }
  50% { 
    box-shadow: 0 0 50px var(--accent-color);
    opacity: 0.3;
  }
  75% { 
    box-shadow: 0 0 50px var(--accent-color);
    opacity: 0.9;
  }
  100% { 
    box-shadow: 0 0 50px var(--accent-color);
    opacity: 0.2;
  }
}

@keyframes turnOnEffect {
  0% { 
    box-shadow: 0 0 50px var(--accent-color);
    opacity: 0.2;
  }
  20% { 
    box-shadow: 0 0 70px var(--accent-color);
    opacity: 1;
  }
  40% { 
    box-shadow: 0 0 60px var(--accent-color);
    opacity: 0.8;
  }
  60% { 
    box-shadow: 0 0 65px var(--accent-color);
    opacity: 0.9;
  }
  80% { 
    box-shadow: 0 0 55px var(--accent-color);
    opacity: 0.7;
  }
  100% { 
    box-shadow: 0 0 60px var(--accent-color);
    opacity: 0.6;
  }
}

.image-container {
  transition: all 0.3s ease;
  position: relative;
  isolation: isolate;
}

.image-container:active {
  transform: scale(0.98);
}

/* Add specific delay for subtitle */
span.fade-in-slide { transition-delay: 0.15s; }

.archivo-narrow {
  font-family: "Archivo Narrow", sans-serif;
}

/* Add fade in for arrow */
.fade-in {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.fade-in.visible {
  opacity: 1;
}

/* Make sure elements are visible by default on mobile */
@media (max-width: 1024px) {
  .fade-in-slide {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
