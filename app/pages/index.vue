<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { NuxtImg } from '#components'
import { useTypewriter } from '~/composables/useTypewriter'

const visible = ref(false)
const heroTitleRef = ref<HTMLElement | null>(null)

interface ContactFormState {
  name: string
  email: string
  company: string
  message: string
}

interface ContactFormErrors {
  name: string | null
  email: string | null
  company: string | null
  message: string | null
}

const contactForm = reactive<ContactFormState>({
  name: '',
  email: '',
  company: '',
  message: ''
})

const contactErrors = reactive<ContactFormErrors>({
  name: null,
  email: null,
  company: null,
  message: null
})

const isContactSubmitting = ref(false)
const contactSuccess = ref(false)
const isResettingContactForm = ref(false)

const resetContactErrors = () => {
  (Object.keys(contactErrors) as Array<keyof ContactFormErrors>).forEach((key) => {
    contactErrors[key] = null
  })
}

const validateContactForm = (formData: ContactFormState) => {
  let isValid = true
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!formData.name.trim()) {
    contactErrors.name = 'Bitte gib deinen Namen an.'
    isValid = false
  }

  if (!formData.email.trim()) {
    contactErrors.email = 'Bitte gib deine E-Mail-Adresse an.'
    isValid = false
  } else if (!emailPattern.test(formData.email)) {
    contactErrors.email = 'Bitte gib eine gültige E-Mail-Adresse ein.'
    isValid = false
  }

  if (!formData.message.trim()) {
    contactErrors.message = 'Bitte formuliere dein Anliegen.'
    isValid = false
  } else if (formData.message.trim().length < 10) {
    contactErrors.message = 'Deine Nachricht sollte mindestens 10 Zeichen enthalten.'
    isValid = false
  }

  return isValid
}

const submitContactForm = async (event: FormSubmitEvent<ContactFormState>) => {
  contactSuccess.value = false
  resetContactErrors()

  if (!validateContactForm(event.data)) {
    return
  }

  isContactSubmitting.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 600))
    contactSuccess.value = true
    isResettingContactForm.value = true
    Object.assign(contactForm, {
      name: '',
      email: '',
      company: '',
      message: ''
    })
    await nextTick()
    isResettingContactForm.value = false
  } finally {
    isContactSubmitting.value = false
  }
}

const clearFieldState = (field: keyof ContactFormErrors) => {
  if (contactErrors[field]) {
    contactErrors[field] = null
  }

  if (!isResettingContactForm.value) {
    contactSuccess.value = false
  }
}

watch(() => contactForm.name, () => clearFieldState('name'))
watch(() => contactForm.email, () => clearFieldState('email'))
watch(() => contactForm.company, () => clearFieldState('company'))
watch(() => contactForm.message, () => clearFieldState('message'))


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

      <UPageHero :links="page.hero.links" :ui="{ container: 'md:pt-18 lg:pt-20 lg:h-full' }">
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
        <NuxtImg
            src="/images/circuit-board.svg"
            alt="background"
            class="absolute inset-0 w-full h-full object-cover bg-repeat pointer-events-none -z-10"
            decoding="async"
            preload
          />
      </UPageHero>

    <UPageSection id="about" :title="page.about.title" :description="page.about.description"
      :ui="{ title: 'text-left', description: 'text-left' }" class="relative overflow-hidden">
      <template #title>
        <MDC :value="page.about.title" class="sm:*:leading-11 w-full max-w-2xl" />
      </template>
      <template #description>
        <div class="sm:flex">
          <div class="sm:w-1/2">
            <MDC :value="page.about.part1" class="text-left font-robotoslab" />
            <MDC :value="page.about.part2" class="font-bold text-primary text-xl" />
            <MDC :value="page.about.part3" class="text-left font-robotoslab" />
            <MDC :value="page.about.part4" class="font-bold text-gray-900 text-xl" />
          </div>
          <div class="h-[300px] xl:h-[200px]">
            <NuxtImg :src="page.about.image.src" :alt="page.about.image.alt" loading="lazy"  width="400" height="400"
                    class="object-contain absolute right-0 bottom-0 sm:bottom-20 sm:w-1/3 " />
          </div>
        </div>
      </template>

    </UPageSection>

        

    <UPageSection :description="page.section.description" :features="page.section.features"
      :ui="{
        container: 'mx-0 sm:mx-auto w-full md:mr-10',
        description: 'text-left',
        title: 'text-left',
        features: 'gap-4'
      }" reverse>
      <template #title>
        <MDC :value="page.section.title" class="sm:*:leading-11 text-2xl sm:text-5xl" />
      </template>
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
      </template>
    </UPageSection>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageSection id="steps" :description="page.steps.description" class="relative overflow-hidden">
      <template #headline>
        <NuxtImg src="/images/light/line-3.svg" alt="decoration"
          loading="lazy"
          class="absolute -top-10 sm:top-0 right-1/2 h-24" />
      </template>
      <template #title>
        <MDC :value="page.steps.title" />
      </template>

      <template #features>
        <UPageCard v-for="(step, index) in page.steps.items" :key="index" orientation="vertical" :reverse="true"
          :ui="{ container: 'p-4 sm:p-4', title: 'flex items-center gap-1' }">
         
         
            <NuxtImg v-if="step.image" :src="step.image?.src" loading="lazy" width="640" height="480" :alt="step.title" format="webp"
              class="object-contain rounded-lg" />
         

        <template #title>
          <span class="text-lg font-semibold">
              {{ step.title }}
            </span>
        </template>

        <template #description>
          <span class="text-sm text-muted">
              {{ step.description }}
            </span>
        </template>
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
            alt="decoration"
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
          alt="decoration"
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

    <UPageSection
      id="contact"
      :title="page.contact?.title"
      :description="page.contact?.description"
      :ui="{ title: 'text-left', description: 'text-left' }"
      class="relative"
    >
      <template #title>
        <MDC v-if="page.contact?.title" :value="page.contact.title" class="sm:*:leading-11" />
      </template>

      <template #description>
        <div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-start">
          <div class="space-y-6 text-left">
            <MDC
              v-if="page.contact?.description"
              :value="page.contact.description"
              class="font-robotoslab text-base sm:text-lg space-y-4"
            />

            <UAlert
              v-if="page.contact?.highlight"
              icon="i-lucide-message-circle"
              variant="soft"
              color="primary"
              :description="page.contact.highlight"
              class="max-w-xl"
            />
          </div>

          <UCard :ui="{ body: 'space-y-6 p-6 sm:p-8' }" class="shadow-lg shadow-primary/10 border border-primary/10">
            <div class="space-y-2">
              <h3 class="text-2xl font-semibold">Schreib mir eine Nachricht</h3>
              <p class="text-sm text-muted">Ich melde mich innerhalb von 24 Stunden persönlich bei dir.</p>
            </div>

            <UAlert
              v-if="contactSuccess"
              title="Vielen Dank für deine Anfrage!"
              description="Ich habe deine Nachricht erhalten und melde mich in Kürze."
              icon="i-lucide-party-popper"
              color="primary"
              variant="soft"
            />

            <UForm :state="contactForm" class="space-y-5" @submit="submitContactForm">
              <UFormGroup label="Name" name="name" required :error="contactErrors.name">
                <UInput
                  v-model="contactForm.name"
                  placeholder="Max Mustermann"
                  autocomplete="name"
                />
              </UFormGroup>

              <UFormGroup label="E-Mail" name="email" required :error="contactErrors.email">
                <UInput
                  v-model="contactForm.email"
                  type="email"
                  placeholder="beispiel@unternehmen.de"
                  autocomplete="email"
                />
              </UFormGroup>

              <UFormGroup label="Unternehmen" name="company">
                <UInput
                  v-model="contactForm.company"
                  placeholder="Ihr Firmenname (optional)"
                  autocomplete="organization"
                />
              </UFormGroup>

              <UFormGroup label="Nachricht" name="message" required :error="contactErrors.message">
                <UTextarea
                  v-model="contactForm.message"
                  :rows="6"
                  placeholder="Beschreibe kurz dein Projekt oder deine Frage."
                />
              </UFormGroup>

              <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p class="text-xs text-muted">
                  Mit dem Absenden akzeptierst du die Verarbeitung deiner Angaben zur Kontaktaufnahme.
                </p>
                <UButton
                  type="submit"
                  size="lg"
                  icon="i-lucide-send"
                  :loading="isContactSubmitting"
                  label="Nachricht senden"
                  class="sm:shrink-0"
                />
              </div>
            </UForm>
          </UCard>
        </div>
      </template>
    </UPageSection>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageCTA v-bind="page.cta" variant="naked" class="overflow-hidden @container">
      <template #title>
        <MDC :value="page.cta.title" />

        <div class="@max-[1280px]:hidden">
          <NuxtImg src="/images/light/line-6.svg"
            loading="lazy"
            alt="decoration"
            class="absolute left-10 -top-10 sm:top-0 h-full" />
          <NuxtImg src="/images/light/line-7.svg"
            loading="lazy"
            alt="decoration"
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
