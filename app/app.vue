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

useSeoMeta({
  ogImage: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2xhbmRpbmctdGVtcGxhdGUubnV4dC5kZXYiLCJpYXQiOjE3Mzk0NjMzNzV9.ja2nUDVOoIFvyaMmg9Jn51uNMoYYt4WA1KWUQBWwUPo.jpg?theme=light',
  twitterImage: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2xhbmRpbmctdGVtcGxhdGUubnV4dC5kZXYiLCJpYXQiOjE3Mzk0NjMzNzV9.ja2nUDVOoIFvyaMmg9Jn51uNMoYYt4WA1KWUQBWwUPo.jpg?theme=light',
  twitterCard: 'summary_large_image'
})

onMounted(() => {
  setTimeout(() => {
    appear.value = true
    setTimeout(() => {
      appeared.value = true
    }, 1000)
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
