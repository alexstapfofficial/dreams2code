<script setup lang="ts">
const columns = [ {
  label: 'Rechtliches',
  children: [{
    label: 'Impressum'
  }, {
    label: 'Datenschutz'
  }]
}]

</script>

<template>
  <USeparator
    class="h-px"
  />

  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer>
        <UFooterColumns :columns="columns">
          <template #right>
            <div class="flex justify-center xl:justify-end items-center w-full h-full">
              <Logo class="text-3xl"/>
            </div>
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-sm text-muted">
        Copyright © {{ new Date().getFullYear() }}. Alle Rechte vorbehalten.
      </p>
    </template>

    <template #right>
      <UButton
        to="https://github.com/nuxt-ui-pro/landing"
        target="_blank"
        icon="i-simple-icons-instagram"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
