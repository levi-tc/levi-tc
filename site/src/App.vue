<script setup lang="ts">
import Hero from '@/components/hero.vue'
import CircuitBackground from './components/CircuitBackground.vue';
import Scroll from './components/scroll.vue';
import AboutMe from './components/aboutMe.vue';
</script>

<template>
<CircuitBackground class="w-full h-full">
<Scroll />
    <Hero />
</CircuitBackground>
<CircuitBackground>
<AboutMe />
</CircuitBackground>
</template>

<style scoped>

</style>
