<template>
  <section id="about-me" class="min-h-screen bg-black relative flex flex-col lg:flex-row items-center px-4 sm:px-6 lg:px-8 py-16 lg:py-0">
    <!-- Left side - Image -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 mb-8 lg:mb-0">
      <div 
        ref="imageContainer"
        class="relative w-[280px] sm:w-[350px] lg:w-[400px] h-[350px] sm:h-[440px] lg:h-[500px] overflow-hidden rounded-lg transition-all duration-300 ease-out fade-in-slide-image"
        :style="containerStyle"
        @mousemove="handleTilt"
        @mouseleave="resetTilt"
      >
        <img 
          src="/src/assets/images/aboutme.png" 
          alt="Profile picture" 
          class="object-cover w-full h-full transition-transform duration-300"
          :style="transformStyle"
        />
      </div>
    </div>

    <!-- Right side - Content -->
    <div class="w-full lg:w-1/2 text-white px-4 lg:pr-[5%] lg:pl-0">
      <h2 class="archivo-black text-3xl sm:text-4xl mb-6 fade-in-slide" ref="title">
        About Me
      </h2>
      
      <div class="space-y-4 sm:space-y-6">
        <p class="archivo text-base sm:text-lg text-gray-300 leading-relaxed fade-in-slide" ref="text1">
          Hello! I'm [Your Name], a passionate developer and creator with a keen interest in building 
          digital experiences that make a difference.
        </p>

        <p class="archivo text-base sm:text-lg text-gray-300 leading-relaxed fade-in-slide" ref="text2">
          I specialize in full-stack development, with a particular focus on creating intuitive and 
          performant web applications. My journey in tech started with [your story here].
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const imageContainer = ref<HTMLElement | null>(null)
const tiltX = ref(0)
const tiltY = ref(0)
const shadowOffset = ref({ x: 0, y: 0 })

const transformStyle = computed(() => ({
  transform: `perspective(1000px) rotateX(${tiltY.value}deg) rotateY(${tiltX.value}deg)`
}))

const containerStyle = computed(() => {
  const baseBlur = 30
  const maxOffset = 20
  const xOffset = -shadowOffset.value.x * maxOffset
  const yOffset = -shadowOffset.value.y * maxOffset
  
  return {
    transform: `perspective(1000px) rotateX(${tiltY.value}deg) rotateY(${tiltX.value}deg)`,
    boxShadow: `
      ${xOffset}px ${yOffset}px ${baseBlur}px rgba(167, 71, 254, 0.3),
      ${xOffset * 1.5}px ${yOffset * 1.5}px ${baseBlur * 2}px rgba(167, 71, 254, 0.2)
    `
  }
})

const handleTilt = (e: MouseEvent) => {
  if (!imageContainer.value) return

  const rect = imageContainer.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const maxTilt = 10
  
  // Calculate tilt angles
  tiltX.value = ((x - centerX) / centerX) * maxTilt
  tiltY.value = ((centerY - y) / centerY) * maxTilt
  
  // Calculate shadow offset (inverse of tilt)
  shadowOffset.value = {
    x: (x - centerX) / centerX,
    y: (y - centerY) / centerY
  }
}

const resetTilt = () => {
  tiltX.value = 0
  tiltY.value = 0
  shadowOffset.value = { x: 0, y: 0 }
}

// Refs for scroll animations
const title = ref<HTMLElement | null>(null)
const text1 = ref<HTMLElement | null>(null)
const text2 = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target) // Stop observing once visible
      }
    })
  }, {
    threshold: 0.2, // 20% of element must be visible
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element comes into view
  })

  // Observe all elements with fade-in-slide class
  ;[title.value, text1.value, text2.value].forEach(el => {
    if (el) observer.observe(el)
  })
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

</style>
