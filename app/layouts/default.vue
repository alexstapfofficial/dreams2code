<template>
  <UApp :toaster="{ expand: false }">
    <AppHeader />

    <UMain class="relative">
      <slot />
    </UMain>

    <AppFooter />
  </UApp>
</template>
