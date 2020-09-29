<template>
  <div class="app__about">
    <div class="module module__hero content h-md-100 pt-0 pb-0">
        <b-container fluid>
            <b-row class="h-md-100 pt-0 pb-6 py-md-8" align-v="start">
                <!-- <glitch-image
                    :src="require('~/assets/images/flinbu-poster.jpg')"
                    :src-mobile="require('~/assets/images/flinbu-poster-mobile.jpg')"
                    :src-dark="require('~/assets/images/flinbu-poster-dark.jpg')"
                    :src-dark-mobile="require('~/assets/images/flinbu-poster-dark-mobile.jpg')"
                    :slices="3"
                    :alt="$t('site.title')"
                    class="about__image"
                /> -->
                <b-col
                  cols="12"
                  md="6"
                  lg="7"
                  class="about__media--wrapper"
                >
                  <b-row>
                    <hero-2 hide-buttons class="about__media w-100" />
                  </b-row>
                </b-col>
                <b-col
                  cols="12"
                  md="6"
                  offset-md="6"
                  lg="5"
                  offset-lg="7"
                  class="about__content"
                >
                  <div class="mb-6 about__hello">
                    <div class="about__title--emoji">🖖</div>
                    <h2 class="about__title mb-4">{{ $t('pages.about.title') }}</h2>
                    <div class="about__section--content" v-html="$t('pages.about.bio.content')"/>
                  </div>

                  <!-- Skills -->
                  <div class="about__section mb-6">
                    <h3 class="about__section--title">{{ $t('pages.about.skills.title') }}</h3>
                    <ul class="about__skills">
                      <li v-for="skill in 8" :key="`skill-${skill}`">{{ $t(`pages.about.skills.options.${skill}`) }}</li>
                    </ul>
                  </div>

                  <!-- Experience -->
                  <div class="about__section mb-6">
                    <h3 class="about__section--title">{{ $t('pages.about.experience.title') }}</h3>
                    <timeline class="about__timeline" :timeline="experience" />
                  </div>

                  <!-- More -->
                  <div class="about__section">
                    <h3 class="about__section--title">{{ $t('pages.about.more') }}</h3>
                    <b-row align-v="stretch">
                      <b-col 
                        v-for="(button, i) in buttons"
                        :key="`button-${i}`"
                        class="about__more--wrapper"
                        cols="12" 
                        md="4"
                      >
                        <button class="about__more--button" @click="open(button.type, button.target)">
                          <img
                            v-if="button.image"
                            :src="require(`~/assets/images/${button.image}`)"
                            class="about__more--image"
                          />
                          <div class="about__more--icon-wrapper">
                            <icon
                              :name="button.icon"
                              size="md"
                              class="about__more--icon"
                            />
                          </div>
                          <span class="about__more--label">{{ button.label }}</span>
                        </button>
                      </b-col>
                    </b-row>
                  </div>

                  <!-- CTA -->
                  <h3 class="about__cta" @click="contact" v-html="$t('pages.about.contact')"/>
                </b-col>
            </b-row>
        </b-container>
    </div>
  </div>
</template>
<script>

import Hero2 from '~/components/modules/Hero2'
import Timeline from '~/components/Timeline'

const YEAR = new Date().getFullYear()

export default {
  hideFooter: true,
  components: {
    Hero2,
    Timeline
  },
  computed: {
    buttons() {
      return [
        {
          type: 'modal',
          label: this.$t('pages.about.process'),
          target: 'showProcess',
          icon: 'brain'
          // image: 'creation-process.png'
        },
        {
          type: 'link',
          label: this.$t('pages.about.work'),
          target: '/portfolio',
          icon: 'coffee'
          // image: 'my-work.png'
        },
        {
            type: "external",
            label: this.$t('pages.about.resume'),
            target: process.env.RESUME_URL,
            theme: "white",
            icon: 'briefcase-alt'
          // image: 'resume.png'
        }
      ]
    },
    experience() {
      let timeline = []
      for (let i = 0; i < 4; i++) {
        timeline.push({
          title: this.$t(`pages.about.experience.timeline.${i + 1}.title`),
          company: this.$t(`pages.about.experience.timeline.${i + 1}.company`),
          description: this.$t(`pages.about.experience.timeline.${i + 1}.description`),
          date: this.$t(`pages.about.experience.timeline.${i + 1}.date`, {year: YEAR})
        })
      }
      return timeline
    }
  },
  methods: {
    contact() {
      this.$root.$emit('showContact')
    },
    open(type, url) {
      switch (type) {
        case 'link':
          return this.$router.push(url)
        case 'external':
          return window.open(url)
        case 'modal':
          return this.$root.$emit(url)
      }
    }
  },
  async fetch() {
    if (!this.$store.state.cockpit.fetched) {
      this.$root.$emit('loading', true)
      await this.$store.dispatch('cockpit/fetch')
      this.$root.$emit('loading', false)
    }
  }
}

</script>