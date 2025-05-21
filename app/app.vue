<script setup lang="ts">
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    class: '',
    lang: 'de'
  }
})
const { isLoading } = useLoadingIndicator()
const appear = ref(false)
const appeared = ref(false)


onMounted(() => {
  setTimeout(() => {
    appear.value = true
    setTimeout(() => {
      appeared.value = true
    },0)
  }, 0)
})
</script>

<template>
  <UApp :toaster="{ expand: false }">
    <AppHeader />

    <UMain class="relative">
      <NuxtPage />
    </UMain>

    <AppFooter />
  </UApp>
</template>
