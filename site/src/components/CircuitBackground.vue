<template>
  <div 
    class="circuit-background relative" 
    :class="{ 
      'hover-active': isHovered,
      'dark': dark,
      'blue': variant === 'blue',
      'green': variant === 'green'
    }"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    @mouseenter="handleMouseEnter"
    ref="background"
    :style="isMobile ? {} : combinedStyle"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

interface Props {
  dark?: boolean
  variant?: 'default' | 'blue' | 'green'
}

const props = withDefaults(defineProps<Props>(), {
  dark: false,
  variant: 'default'
})

const background = ref<HTMLElement | null>(null)
const isHovered = ref(false)
const mousePosition = ref({ x: '50%', y: '50%' })
const distortion = ref({ scaleX: 1, scaleY: 1, skewX: 0, skewY: 0 })
const isMobile = ref(false)

const checkMobile = () => {
  const wasMobile = isMobile.value
  isMobile.value = window.matchMedia('(max-width: 768px)').matches

  if (wasMobile && !isMobile.value && background.value) {
    gsap.set(background.value, {
      '--mask-size': '0'
    })
    gsap.set(distortion.value, {
      scaleX: 1,
      scaleY: 1,
      skewX: 0,
      skewY: 0
    })
    isHovered.value = false
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const maskPosition = computed(() => ({
  '--mouse-x': mousePosition.value.x,
  '--mouse-y': mousePosition.value.y,
}))

const distortionStyle = computed(() => ({
  '--scale-x': distortion.value.scaleX,
  '--scale-y': distortion.value.scaleY,
  '--skew-x': `${distortion.value.skewX}deg`,
  '--skew-y': `${distortion.value.skewY}deg`,
}))

const combinedStyle = computed(() => ({
  ...maskPosition.value,
  ...distortionStyle.value,
}))

const handleMouseMove = (e: MouseEvent) => {
  if (isMobile.value || !background.value) return
  
  const rect = background.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const distanceX = (x - centerX) / centerX
  const distanceY = (y - centerY) / centerY
  
  const newDistortion = {
    scaleX: 1 + distanceX * 0.1,
    scaleY: 1 + distanceY * 0.1,
    skewX: distanceY * 5,
    skewY: distanceX * 5
  }

  mousePosition.value = {
    x: `${x}px`,
    y: `${y}px`
  }

  gsap.to(distortion.value, {
    scaleX: newDistortion.scaleX,
    scaleY: newDistortion.scaleY,
    skewX: newDistortion.skewX,
    skewY: newDistortion.skewY,
    duration: 0.5,
    ease: "power2.out"
  })
}

const handleMouseEnter = (e: MouseEvent) => {
  if (isMobile.value) return
  isHovered.value = true
  
  if (!background.value) return
  handleMouseMove(e)

  gsap.to(background.value, {
    '--mask-size': '55',
    duration: 0.5,
    ease: "power2.out"
  })
}

const handleMouseLeave = () => {
  if (isMobile.value) return
  isHovered.value = false
  
  if (!background.value) return

  gsap.to(background.value, {
    '--mask-size': '0',
    duration: 0.3,
    ease: "power2.in"
  })

  gsap.to(distortion.value, {
    scaleX: 1,
    scaleY: 1,
    skewX: 0,
    skewY: 0,
    duration: 0.5,
    ease: "power2.out"
  })
}
</script>