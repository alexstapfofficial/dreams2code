<script setup lang="ts">
const visible = ref(false)


import { NuxtImg } from '#components'
import { useTypewriter } from '~/composables/useTypewriter'
const heroTitleRef = ref<HTMLElement | null>(null)


const { data: page } = await useAsyncData('index', () => queryCollection('content').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value.seo?.title || page.value.title,
  ogTitle: page.value.seo?.title || page.value.title,
  description: page.value.seo?.description || page.value.description,
  ogDescription: page.value.seo?.description || page.value.description
})

useTypewriter(heroTitleRef, 'h1', 25)

onMounted(() => {
  setTimeout(() => {
    visible.value = true
  }, 450) // kleiner Delay für eleganten Effekt
})
</script>

<template>
  <div v-if="page" class="relative">
    <UBanner title="Diese Seite befindet sich nur zu Testzwecken online" class="font-robotoslab" />


    <UPageHero :links="page.hero.links" :ui="{ container: 'md:pt-18 lg:pt-20 lg:h-full' }" class="hero-background">
      <template #title>
        <div class="transition-opacity duration-2000 ease-out"
          :class="{ 'opacity-0': !visible, 'opacity-100': visible }">
          <MDC :value="page.title" class="*:leading-11 sm:*:leading-19 max-w-3xl mx-auto" />
        </div>
      </template>
      <template #description>
        <div ref="heroTitleRef" v-show="visible">
          <h1>{{ page.description }}</h1>
        </div>

      </template>
    </UPageHero>

    <UPageSection id="about" :title="page.about.title" :description="page.about.description"
      :ui="{ title: 'text-left', description: 'text-left' }" class="relative overflow-hidden">
      <template #title>
        <MDC :value="page.about.title" class="sm:*:leading-11 w-full max-w-2xl" />
      </template>
      <template #description>
          <div class="font-robotoslab">
            <MDC :value="page.about.part1" class="text-left" />
            <MDC :value="page.about.part2" class="text-left" />
            <MDC :value="page.about.part3" class="text-left" />
            <MDC :value="page.about.part4" class="text-left" />
          </div>
      </template>

    <div class="h-[300px] xl:h-[200px]">
      <NuxtImg :src="page.about.image.src" :alt="page.about.image.alt" loading="lazy" format="webp"  width="400" height="400"
              class="object-contain absolute left-0 bottom-0 " />
    </div>
    </UPageSection>

        

    <UPageSection :description="page.section.description" :features="page.section.features" orientation="horizontal"
      :ui="{
        container: 'lg:px-0 2xl:px-20 mx-0 max-w-none md:mr-10',
        features: 'gap-0'
      }" reverse>
      <template #title>
        <MDC :value="page.section.title" class="sm:*:leading-11" />
      </template>
      <NuxtImg format="webp" :src="page.section.images.desktop" :alt="page.section.title" width="640" height="480"
        class="left-0 w-full max-w-2xl soft" />
    </UPageSection>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageSection id="features" :description="page.features.description" :features="page.features.features" :ui="{
      title: 'text-left @container relative flex',
      description: 'text-left'
    }" class="relative overflow-hidden">
      <div class="absolute rounded-full -left-10 top-10 size-[300px] z-10 bg-primary opacity-30 blur-[200px]" />
      <div class="absolute rounded-full -right-10 -bottom-10 size-[300px] z-10 bg-primary opacity-30 blur-[200px]" />
      <template #title>
        <MDC :value="page.features.title" class="*:leading-9" />
        <div class="hidden @min-[1020px]:block">
          <NuxtImg src="/images/light/line-2.svg"
            class="absolute top-0 right-0 size-full transform scale-95 translate-x-[70%]" />
        </div>
      </template>
    </UPageSection>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageSection id="steps" :description="page.steps.description" class="relative overflow-hidden">
      <template #headline>
        <NuxtImg src="/images/light/line-3.svg" 
          class="absolute -top-10 sm:top-0 right-1/2 h-24" />
      </template>
      <template #title>
        <MDC :value="page.steps.title" />
      </template>

      <template #features>
        <UPageCard v-for="(step, index) in page.steps.items" :key="index" class="group"
          :ui="{ container: 'p-4 sm:p-4', title: 'flex items-center gap-1' }">
          <NuxtImg v-if="step.image" :src="step.image?.src" loading="lazy" width="640" height="480" :alt="step.title"
            class="object-contain rounded-lg" />

          <div class="flex flex-col gap-2">
            <span class="text-lg font-semibold">
              {{ step.title }}
            </span>
            <span class="text-sm text-muted">
              {{ step.description }}
            </span>
          </div>
        </UPageCard>
      </template>
    </UPageSection>

    <UPageSection id="pricing" class="mb-32 overflow-hidden" :title="page.pricing.title"
      :description="page.pricing.description" :plans="page.pricing.plans"
      :ui="{ title: 'text-left @container relative', description: 'text-left' }">
      <template #title>
        <MDC :value="page.pricing.title" />

        <div class="hidden @min-[1120px]:block">
          <NuxtImg src="/images/light/line-4.svg" 
            loading="lazy"
            class="absolute top-0 right-0 size-full transform translate-x-[60%]" />
        </div>
      </template>

      <UPricingPlans scale>
        <UPricingPlan v-for="(plan, index) in page.pricing.plans" :key="index" :title="plan.title"
          :description="plan.description" :price="plan.price" :billing-period="plan.billing_period"
          :billing-cycle="plan.billing_cycle" :highlight="plan.highlight" :scale="plan.highlight" variant="soft"
          :features="plan.features" :button="plan.button" />
      </UPricingPlans>
    </UPageSection>

    <UPageSection id="testimonials" :title="page.testimonials.title" :description="page.testimonials.description"
      :items="page.testimonials.items">
      <template #headline>
        <NuxtImg src="/images/light/line-5.svg"
          loading="lazy"
          class="absolute -top-10 sm:top-0 right-1/2 h-24" />
      </template>
      <template #title>
        <MDC :value="page.testimonials.title" />
      </template>

      <UContainer>
        <UPageColumns class="xl:columns-3">
          <UPageCard v-for="(testimonial, index) in page.testimonials.items" :key="index" variant="subtle"
            :description="testimonial.quote"
            :ui="{ description: 'before:content-[open-quote] after:content-[close-quote]' }">
            <template #footer>
              <UUser v-bind="testimonial.user" size="xl" />
            </template>
          </UPageCard>
        </UPageColumns>
      </UContainer>
    </UPageSection>

    <USeparator />

    <UPageCTA v-bind="page.cta" variant="naked" class="overflow-hidden @container">
      <template #title>
        <MDC :value="page.cta.title" />

        <div class="@max-[1280px]:hidden">
          <NuxtImg src="/images/light/line-6.svg"
            loading="lazy"
            class="absolute left-10 -top-10 sm:top-0 h-full" />
          <NuxtImg src="/images/light/line-7.svg"
            loading="lazy"
            class="absolute right-0 bottom-0 h-full" />
        </div>
      </template>

      <div
        class="absolute rounded-full dark:bg-primary blur-[250px] size-40 sm:size-50 transform -translate-x-1/2 left-1/2 -translate-y-80" />

      <LazyStarsBg />
    </UPageCTA>
  </div>
</template>


<style scoped>
h1::after {
  content: '|';
  animation: blink 1s step-end infinite;
  margin-left: 4px;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.soft {
  width: 100%;
  height: auto;

  /* Rechteckiger Maskenverlauf */
  mask-image:
    linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%),
    linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%);
  mask-composite: intersect;

  -webkit-mask-image:
    linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%),
    linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%);
  -webkit-mask-composite: destination-in;

  /* Fallback-Hintergrund für debugging */
  background: white;
}

.hero-background {
  background: url('/images/circuit-board.svg');
  background-size: contain;
  background-position: center;
}
</style>
