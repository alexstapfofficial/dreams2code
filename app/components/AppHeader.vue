<script setup lang="ts">
const nuxtApp = useNuxtApp()
const { activeHeadings, updateHeadings } = useScrollspy()

const items = computed(() => [{
  label: 'Über mich',
  to: '#about',
  active: activeHeadings.value.includes('about') && !activeHeadings.value.includes('features')
},{
  label: 'Leistungen',
  to: '#features',
  active: activeHeadings.value.includes('features') && !activeHeadings.value.includes('pricing')
}, {
  label: 'Preisgestaltung',
  to: '#pricing',
  active: activeHeadings.value.includes('pricing')
}, {
  label: 'Kundenstimmen',
  to: '#testimonials',
  active: activeHeadings.value.includes('testimonials') && !activeHeadings.value.includes('pricing')
}, {
  label: 'Kontakt',
  to: '#contact',
  active: activeHeadings.value.includes('contact')
}])

nuxtApp.hooks.hookOnce('page:finish', () => {
  updateHeadings([
    document.querySelector('#about'),
    document.querySelector('#features'),
    document.querySelector('#pricing'),
    document.querySelector('#testimonials'),
    document.querySelector('#contact')
  ].filter(Boolean) as Element[])
})
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <Logo class="text-xl w-auto h-6 shrink-0" />
      </NuxtLink>
    </template>

    <template #right>
      <UNavigationMenu
        :items="items"
        variant="link"
        class="hidden lg:block"
      />

      <UButton
        label="Kontakt"
        variant="subtle"
        class="hidden lg:block"
        to="#contact"
      />

    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
      <UButton
        class="mt-4"
        label="Kontakt"
        variant="subtle"
        block
        to="#contact"
      />
    </template>
  </UHeader>
</template>
